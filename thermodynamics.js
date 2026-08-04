const R_BAR_M3_MOL_K = 8.314462618e-5;

export const THERMODYNAMIC_COMPONENTS = Object.freeze({
  water: { label: "Water", formula: "H2O", tcK: 647.096, pcBar: 220.64, omega: 0.344, normalBoilingK: 373.15 },
  ethanol: { label: "Ethanol", formula: "C2H6O", tcK: 514.0, pcBar: 61.4, omega: 0.644, normalBoilingK: 351.44 },
  methanol: { label: "Methanol", formula: "CH4O", tcK: 512.6, pcBar: 80.9, omega: 0.565, normalBoilingK: 337.85 },
  acetone: { label: "Acetone", formula: "C3H6O", tcK: 508.1, pcBar: 47.0, omega: 0.307, normalBoilingK: 329.22 },
  carbonDioxide: { label: "Carbon dioxide", formula: "CO2", tcK: 304.13, pcBar: 73.77, omega: 0.224, normalBoilingK: 194.67 },
  oxygen: { label: "Oxygen", formula: "O2", tcK: 154.58, pcBar: 50.43, omega: 0.022, normalBoilingK: 90.19 },
  nitrogen: { label: "Nitrogen", formula: "N2", tcK: 126.19, pcBar: 33.98, omega: 0.037, normalBoilingK: 77.36 },
  ammonia: { label: "Ammonia", formula: "NH3", tcK: 405.4, pcBar: 113.5, omega: 0.253, normalBoilingK: 239.82 },
});

export function wilsonKValue(component, temperatureK, pressureBar) {
  const temperature = Math.max(1, Number(temperatureK));
  const pressure = Math.max(1e-8, Number(pressureBar));
  const pc = Math.max(1e-8, Number(component.pcBar));
  const tc = Math.max(1, Number(component.tcK));
  const omega = Number(component.omega) || 0;
  return pc / pressure * Math.exp(5.373 * (1 + omega) * (1 - tc / temperature));
}

export function solveRachfordRice(zValues, kValues, { tolerance = 1e-10, maxIterations = 120 } = {}) {
  if (!Array.isArray(zValues) || zValues.length < 2 || zValues.length !== kValues.length) {
    throw new Error("Rachford-Rice requires matching composition and K-value arrays with at least two components.");
  }
  const total = zValues.reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
  if (total <= 0) throw new Error("Overall composition must contain a positive fraction.");
  const z = zValues.map((value) => Math.max(0, Number(value) || 0) / total);
  const k = kValues.map((value) => Math.max(1e-12, Number(value) || 0));
  const residual = (vaporFraction) => z.reduce((sum, zi, index) => (
    sum + zi * (k[index] - 1) / Math.max(1e-12, 1 + vaporFraction * (k[index] - 1))
  ), 0);
  const atLiquid = residual(0);
  const atVapor = residual(1);
  if (atLiquid <= 0) return { vaporFraction: 0, phase: "liquid", residual: atLiquid, iterations: 0 };
  if (atVapor >= 0) return { vaporFraction: 1, phase: "vapor", residual: atVapor, iterations: 0 };
  let low = 0;
  let high = 1;
  let vaporFraction = 0.5;
  let currentResidual = residual(vaporFraction);
  let iterations = 0;
  for (; iterations < maxIterations; iterations += 1) {
    vaporFraction = (low + high) / 2;
    currentResidual = residual(vaporFraction);
    if (Math.abs(currentResidual) <= tolerance || high - low <= tolerance) break;
    if (currentResidual > 0) low = vaporFraction;
    else high = vaporFraction;
  }
  return { vaporFraction, phase: "two-phase", residual: currentResidual, iterations: iterations + 1 };
}

export function solveIsothermalFlash({ componentIds, composition, temperatureC, pressureBar }) {
  const components = componentIds.map((id) => {
    const component = THERMODYNAMIC_COMPONENTS[id];
    if (!component) throw new Error(`Unknown thermodynamic component: ${id}`);
    return { id, ...component };
  });
  const temperatureK = Number(temperatureC) + 273.15;
  const kValues = components.map((component) => wilsonKValue(component, temperatureK, pressureBar));
  const solved = solveRachfordRice(composition, kValues);
  const total = composition.reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
  const z = composition.map((value) => Math.max(0, Number(value) || 0) / total);
  const liquid = z.map((zi, index) => zi / Math.max(1e-12, 1 + solved.vaporFraction * (kValues[index] - 1)));
  const vapor = liquid.map((xi, index) => xi * kValues[index]);
  const liquidTotal = liquid.reduce((sum, value) => sum + value, 0) || 1;
  const vaporTotal = vapor.reduce((sum, value) => sum + value, 0) || 1;
  return {
    method: "Wilson K-value screening + Rachford-Rice",
    temperatureC: Number(temperatureC),
    pressureBar: Number(pressureBar),
    ...solved,
    components: components.map((component, index) => ({
      id: component.id,
      component: component.label,
      formula: component.formula,
      z: z[index],
      kValue: kValues[index],
      xLiquid: liquid[index] / liquidTotal,
      yVapor: vapor[index] / vaporTotal,
    })),
  };
}

export function phaseEnvelopeRows(input, { minimumC = -20, maximumC = 180, points = 41 } = {}) {
  return Array.from({ length: Math.max(3, points) }, (_, index) => {
    const temperatureC = minimumC + (maximumC - minimumC) * index / (Math.max(3, points) - 1);
    const flash = solveIsothermalFlash({ ...input, temperatureC });
    return {
      temperatureC,
      pressureBar: input.pressureBar,
      vaporFraction: flash.vaporFraction,
      phase: flash.phase,
      residual: flash.residual,
    };
  });
}

export function fenskeMinimumStages({ lightKeyTop, lightKeyBottom, relativeVolatility }) {
  const xd = Math.min(0.999999, Math.max(0.000001, Number(lightKeyTop)));
  const xb = Math.min(0.999999, Math.max(0.000001, Number(lightKeyBottom)));
  const alpha = Math.max(1.000001, Number(relativeVolatility));
  return Math.log((xd / (1 - xd)) * ((1 - xb) / xb)) / Math.log(alpha);
}

function shiftedTemperature(stream, deltaTminC) {
  const shift = deltaTminC / 2;
  return stream.kind === "hot"
    ? { supply: stream.supplyC - shift, target: stream.targetC - shift }
    : { supply: stream.supplyC + shift, target: stream.targetC + shift };
}

export function pinchUtilityTargets(streams, { deltaTminC = 10 } = {}) {
  const normalized = streams
    .filter((stream) => ["hot", "cold"].includes(stream.kind) && Number(stream.cpFlowKwK) > 0)
    .map((stream) => ({ ...stream, shifted: shiftedTemperature(stream, deltaTminC) }));
  const temperatures = [...new Set(normalized.flatMap((stream) => [stream.shifted.supply, stream.shifted.target]))].sort((a, b) => b - a);
  const intervals = [];
  let cascade = 0;
  let minimumCascade = 0;
  for (let index = 0; index < temperatures.length - 1; index += 1) {
    const highC = temperatures[index];
    const lowC = temperatures[index + 1];
    const midpoint = (highC + lowC) / 2;
    const active = normalized.filter((stream) => {
      const top = Math.max(stream.shifted.supply, stream.shifted.target);
      const bottom = Math.min(stream.shifted.supply, stream.shifted.target);
      return midpoint < top && midpoint > bottom;
    });
    const netCpKwK = active.reduce((sum, stream) => sum + (stream.kind === "hot" ? stream.cpFlowKwK : -stream.cpFlowKwK), 0);
    const enthalpyKw = netCpKwK * (highC - lowC);
    cascade += enthalpyKw;
    minimumCascade = Math.min(minimumCascade, cascade);
    intervals.push({ interval: index + 1, highC, lowC, netCpKwK, enthalpyKw, rawCascadeKw: cascade });
  }
  const minimumHotUtilityKw = Math.max(0, -minimumCascade);
  const adjusted = intervals.map((interval) => ({ ...interval, adjustedCascadeKw: interval.rawCascadeKw + minimumHotUtilityKw }));
  const minimumColdUtilityKw = Math.max(0, adjusted.at(-1)?.adjustedCascadeKw || 0);
  const pinch = adjusted.find((interval) => Math.abs(interval.adjustedCascadeKw) < 1e-7);
  return {
    method: "Problem-table heat cascade",
    deltaTminC,
    minimumHotUtilityKw,
    minimumColdUtilityKw,
    pinchShiftedC: pinch?.lowC ?? null,
    intervals: adjusted,
  };
}

export function aspenCapabilityMatrix() {
  return [
    ["Physical properties", "Native screening", "Component property register, temperature corrections, Wilson K-values, selectable engineering basis"],
    ["VLE flash", "Executable native", "Isothermal Rachford-Rice flash and phase-fraction sweep"],
    ["Distillation", "Executable shortcut", "Fenske minimum stages plus existing column mass/energy models"],
    ["Heat integration", "Executable native", "Problem-table pinch targets and process heat-reuse accounting"],
    ["Steady-state flowsheets", "Executable native", "Component mass/energy balances, recycles, convergence and equipment sizing"],
    ["Batch and continuous dynamics", "Executable native", "Batch, fed-batch and perfusion ODE systems with PDE transport"],
    ["Optimization and uncertainty", "Executable native", "Parameter estimation, Monte Carlo, sensitivity, surrogate and constrained optimization"],
    ["Scheduling and plant capacity", "Executable native", "Finite-capacity equipment, room, staff, utility, cleaning and campaign scheduling"],
    ["Economics, energy and emissions", "Executable native", "TEA, LCA, CAPEX/OPEX, heat recovery and scenario intervals"],
    ["Plant-data calibration", "Executable native", "CSV/JSON ingestion, schema mapping, state estimation and calibration handoff"],
    ["Electrolytes and rigorous activity coefficients", "Specialist solver required", "Needs validated binary parameters, speciation database and electrolyte property package"],
    ["Rate-based columns, solids and polymers", "Specialist solver required", "Needs vendor-grade correlations, kinetics and validated component databanks"],
    ["Relief, flare and detailed hydraulics", "Specialist solver required", "Needs certified safety methods, line network data and independent design review"],
    ["Operator training and closed-loop control", "Integration ready", "Requires real PLC/SCADA tags, validated control narratives and an OT edge gateway"],
  ].map(([capability, status, scope]) => ({ capability, status, scope }));
}

export function screeningThermodynamicPackage() {
  const flash = solveIsothermalFlash({
    componentIds: ["water", "ethanol", "carbonDioxide"],
    composition: [0.88, 0.1, 0.02],
    temperatureC: 37,
    pressureBar: 1.2,
  });
  const envelope = phaseEnvelopeRows({ componentIds: ["water", "ethanol", "carbonDioxide"], composition: [0.88, 0.1, 0.02], pressureBar: 1.2 });
  const minimumStages = fenskeMinimumStages({ lightKeyTop: 0.95, lightKeyBottom: 0.05, relativeVolatility: 2.3 });
  const pinch = pinchUtilityTargets([
    { id: "fermenter-cooling", kind: "hot", supplyC: 37, targetC: 20, cpFlowKwK: 22 },
    { id: "sip-condensate", kind: "hot", supplyC: 121, targetC: 35, cpFlowKwK: 9 },
    { id: "media-heating", kind: "cold", supplyC: 10, targetC: 37, cpFlowKwK: 18 },
    { id: "cip-heating", kind: "cold", supplyC: 20, targetC: 80, cpFlowKwK: 11 },
  ]);
  return { flash, envelope, minimumStages, pinch, capabilityMatrix: aspenCapabilityMatrix(), gasConstantBarM3MolK: R_BAR_M3_MOL_K };
}
