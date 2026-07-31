const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, Number(value) || 0));

const CORE_STATE_KEYS = [
  "biomassMCellsMl",
  "deadCellsMCellsMl",
  "substrateGL",
  "glutamineMm",
  "productGL",
  "dissolvedOxygenPct",
  "lactateGL",
  "ammoniaMm",
  "volumeL",
];

function addScaled(state, derivative, scale) {
  return Object.fromEntries(Object.keys(state).map((key) => [key, state[key] + derivative[key] * scale]));
}

function rk4Step(state, timeH, stepH, derivative) {
  const k1 = derivative(state, timeH);
  const k2 = derivative(addScaled(state, k1, stepH / 2), timeH + stepH / 2);
  const k3 = derivative(addScaled(state, k2, stepH / 2), timeH + stepH / 2);
  const k4 = derivative(addScaled(state, k3, stepH), timeH + stepH);
  return Object.fromEntries(Object.keys(state).map((key) => [
    key,
    state[key] + stepH / 6 * (k1[key] + 2 * k2[key] + 2 * k3[key] + k4[key]),
  ]));
}

function modeFlows({
  mode,
  state,
  timeH,
  durationH,
  maximumVolumeL,
  feedRateLph,
  feedStartH,
  feedStrategy,
  feedRampPerH,
  perfusionRateVvd,
  bleedFraction,
  perfusionStartH,
}) {
  if (mode === "fedBatch") {
    if (timeH < feedStartH || state.volumeL >= maximumVolumeL - 1e-6) {
      return { feedLph: 0, harvestLph: 0, bleedLph: 0 };
    }
    const elapsedFeedH = Math.max(0, timeH - feedStartH);
    let requestedFeedLph = feedRateLph;
    if (feedStrategy === "exponential") requestedFeedLph *= Math.exp(feedRampPerH * elapsedFeedH);
    if (feedStrategy === "feedback") {
      const substrateError = Math.max(-0.75, Math.min(2, (1.2 - state.substrateGL) / 1.2));
      requestedFeedLph *= 1 + 0.65 * substrateError;
    }
    const remainingL = Math.max(0, maximumVolumeL - state.volumeL);
    const remainingH = Math.max(0.05, durationH - timeH);
    return { feedLph: Math.min(Math.max(0, requestedFeedLph), remainingL / remainingH * 1.4), harvestLph: 0, bleedLph: 0 };
  }

  if (mode === "perfusion" && timeH >= perfusionStartH) {
    const feedLph = state.volumeL * perfusionRateVvd / 24;
    const bleedLph = feedLph * bleedFraction;
    return { feedLph, harvestLph: Math.max(0, feedLph - bleedLph), bleedLph };
  }

  return { feedLph: 0, harvestLph: 0, bleedLph: 0 };
}

export function solveBioprocessOde({
  mode = "fedBatch",
  durationH = 120,
  points = 97,
  volumeL = 1000,
  startVolumeFraction = 0.7,
  endVolumeFraction = 1,
  feedRatePctPerDay = 18,
  feedStartH = 18,
  feedStrategy = "constant",
  feedRampPctPerDay = 0,
  perfusionRateVvd = 1,
  perfusionStartH = 0,
  bleedFraction = 0.05,
  cellRetentionEfficiencyPct = 99.5,
  muMax = 0.05,
  deathRatePerH = 0.003,
  substrateInitialGL = 4,
  substrateFeedGL = 20,
  glutamineInitialMm = 3,
  glutamineFeedMm = 8,
  biomassInitialMCellsMl = 0.35,
  biomassCapacityMCellsMl = 35,
  doSetpointPct = 40,
  klaPerH = 65,
  oxygenUptake = 4.5,
  lactateLimitGL = 2,
  ammoniaLimitMm = 2,
  targetTiterGL = 12,
  glutamineMm,
} = {}) {
  const normalizedMode = ["batch", "fedBatch", "perfusion"].includes(mode) ? mode : "fedBatch";
  const safeDuration = clamp(durationH, 1, 12000);
  const outputPoints = Math.max(12, Math.round(points));
  const stableStepH = Math.min(0.1, Math.max(0.01, 24 / Math.max(1, klaPerH)));
  const integrationSteps = Math.max(outputPoints - 1, Math.ceil(safeDuration / stableStepH));
  const stepH = safeDuration / integrationSteps;
  const sampleEvery = Math.max(1, Math.floor(integrationSteps / (outputPoints - 1)));
  const initialVolumeL = Math.max(1, volumeL * clamp(startVolumeFraction, 0.2, 1));
  const maximumVolumeL = Math.max(initialVolumeL, volumeL * clamp(endVolumeFraction, startVolumeFraction, 1.5));
  const feedRateLph = normalizedMode === "fedBatch" ? Math.max(0, volumeL * feedRatePctPerDay / 100 / 24) : 0;
  const safePerfusionRateVvd = normalizedMode === "perfusion" ? clamp(perfusionRateVvd, 0.01, 8) : 0;
  const safeBleedFraction = normalizedMode === "perfusion" ? clamp(bleedFraction, 0, 0.5) : 0;
  const cellRetentionFraction = normalizedMode === "perfusion" ? clamp(cellRetentionEfficiencyPct, 0, 100) / 100 : 0;
  const safeGlutamineInitialMm = Math.max(0.01, Number(glutamineInitialMm ?? glutamineMm ?? 3));
  const ksGlucose = Math.max(0.05, substrateInitialGL * 0.12);
  const ksGlutamine = Math.max(0.02, safeGlutamineInitialMm * 0.1);
  const koPct = 8;
  const baseDeathRate = clamp(deathRatePerH, 0.0001, 0.08);
  const lysisRatePerH = 0.012;
  const productAlpha = Math.max(0.001, targetTiterGL / Math.max(1, biomassCapacityMCellsMl) * 0.22);
  const productBeta = Math.max(0.00001, targetTiterGL / Math.max(1, safeDuration * biomassCapacityMCellsMl) * 0.25);
  const initialState = {
    biomassMCellsMl: Math.max(0.01, biomassInitialMCellsMl),
    deadCellsMCellsMl: Math.max(0, biomassInitialMCellsMl * 0.02),
    substrateGL: Math.max(0.01, substrateInitialGL),
    glutamineMm: safeGlutamineInitialMm,
    productGL: 0,
    dissolvedOxygenPct: clamp(doSetpointPct, 1, 100),
    lactateGL: 0,
    ammoniaMm: 0,
    volumeL: initialVolumeL,
    harvestProductKg: 0,
    cumulativeFeedL: 0,
    cumulativeHarvestL: 0,
    cumulativeBleedL: 0,
    cumulativeGlucoseFeedG: 0,
    cumulativeGlucoseOutG: 0,
    cumulativeGlucoseConsumedG: 0,
    cumulativeProductGeneratedG: 0,
    cumulativeProductOutG: 0,
  };

  const evaluate = (rawState, timeH) => {
    const state = Object.fromEntries(Object.entries(rawState).map(([key, value]) => [key, Math.max(0, Number(value) || 0)]));
    const volume = Math.max(1, state.volumeL);
    const viable = state.biomassMCellsMl;
    const dead = state.deadCellsMCellsMl;
    const glucose = state.substrateGL;
    const glutamine = state.glutamineMm;
    const dissolvedOxygen = clamp(state.dissolvedOxygenPct, 0, 100);
    const flows = modeFlows({
      mode: normalizedMode,
      state,
      timeH,
      durationH: safeDuration,
      maximumVolumeL,
      feedRateLph,
      feedStartH: clamp(feedStartH, 0, safeDuration),
      feedStrategy,
      feedRampPerH: Math.max(0, feedRampPctPerDay) / 100 / 24,
      perfusionRateVvd: safePerfusionRateVvd,
      bleedFraction: safeBleedFraction,
      perfusionStartH: clamp(perfusionStartH, 0, safeDuration),
    });
    const totalOutLph = flows.harvestLph + flows.bleedLph;
    const volumeDerivative = flows.feedLph - totalOutLph;
    const glucoseTerm = glucose / (ksGlucose + glucose);
    const glutamineTerm = glutamine / (ksGlutamine + glutamine);
    const oxygenTerm = dissolvedOxygen / (koPct + dissolvedOxygen);
    const densityTerm = Math.max(0, 1 - viable / Math.max(1, biomassCapacityMCellsMl));
    const lactateInhibition = 1 / (1 + Math.pow(state.lactateGL / Math.max(0.2, lactateLimitGL), 2));
    const ammoniaInhibition = 1 / (1 + Math.pow(state.ammoniaMm / Math.max(0.2, ammoniaLimitMm), 2));
    const growthRate = Math.max(0, muMax * glucoseTerm * glutamineTerm * oxygenTerm * densityTerm * lactateInhibition * ammoniaInhibition);
    const lowOxygenDeath = dissolvedOxygen < 15 ? (15 - dissolvedOxygen) / 15 * 0.018 : 0;
    const metaboliteDeath = baseDeathRate * (0.35 * state.lactateGL / Math.max(0.2, lactateLimitGL) + 0.65 * state.ammoniaMm / Math.max(0.2, ammoniaLimitMm));
    const deathRate = Math.min(0.08, baseDeathRate + lowOxygenDeath + metaboliteDeath);
    const glucoseUptakeGLh = Math.max(0, (growthRate / 0.62 + 0.0025) * viable * 0.12);
    const glutamineUptakeMmh = Math.max(0, (growthRate / 0.48 + 0.0015) * viable * 0.055);
    const lactateConsumptionGLh = glucose < 0.8 ? Math.min(state.lactateGL * 0.035, viable * 0.0025) : 0;
    const lactateFormationGLh = Math.max(0, glucoseUptakeGLh * 0.42 - lactateConsumptionGLh);
    const ammoniaFormationMmh = Math.max(0, glutamineUptakeMmh * 0.68 + deathRate * viable * 0.012);
    const productFormationGLh = Math.max(0, productAlpha * growthRate * viable + productBeta * viable);
    const oxygenDemandPctH = Math.max(0, oxygenUptake) * viable / Math.max(1, biomassCapacityMCellsMl) * 0.65;
    const gasSideSaturationPct = Math.min(100, clamp(doSetpointPct, 1, 95) + 100 * oxygenDemandPctH / Math.max(0.5, klaPerH));
    const oxygenTransferPctH = Math.max(0, klaPerH) * (gasSideSaturationPct - dissolvedOxygen) / 100;
    const inletDoPct = clamp(doSetpointPct, 1, 100);
    const solubleBalance = (reaction, inletConcentration, concentration) => reaction
      + (flows.feedLph * inletConcentration - totalOutLph * concentration) / volume
      - concentration * volumeDerivative / volume;
    const harvestCellEscape = flows.harvestLph * (1 - cellRetentionFraction);
    const cellRemovalPerH = (flows.bleedLph + harvestCellEscape) / volume;
    const inletGlucoseGL = normalizedMode === "perfusion" ? Math.max(0, substrateInitialGL) : Math.max(0, substrateFeedGL);
    const inletGlutamineMm = normalizedMode === "perfusion" ? safeGlutamineInitialMm : Math.max(0, glutamineFeedMm);

    return {
      derivative: {
        biomassMCellsMl: (growthRate - deathRate) * viable - cellRemovalPerH * viable - viable * volumeDerivative / volume,
        deadCellsMCellsMl: deathRate * viable - lysisRatePerH * dead - cellRemovalPerH * dead - dead * volumeDerivative / volume,
        substrateGL: solubleBalance(-glucoseUptakeGLh, inletGlucoseGL, glucose),
        glutamineMm: solubleBalance(-glutamineUptakeMmh, inletGlutamineMm, glutamine),
        productGL: solubleBalance(productFormationGLh, 0, state.productGL),
        dissolvedOxygenPct: solubleBalance(oxygenTransferPctH - oxygenDemandPctH, inletDoPct, dissolvedOxygen),
        lactateGL: solubleBalance(lactateFormationGLh, 0, state.lactateGL),
        ammoniaMm: solubleBalance(ammoniaFormationMmh, 0, state.ammoniaMm),
        volumeL: volumeDerivative,
        harvestProductKg: flows.harvestLph * state.productGL / 1000,
        cumulativeFeedL: flows.feedLph,
        cumulativeHarvestL: flows.harvestLph,
        cumulativeBleedL: flows.bleedLph,
        cumulativeGlucoseFeedG: flows.feedLph * inletGlucoseGL,
        cumulativeGlucoseOutG: totalOutLph * glucose,
        cumulativeGlucoseConsumedG: glucoseUptakeGLh * volume,
        cumulativeProductGeneratedG: productFormationGLh * volume,
        cumulativeProductOutG: totalOutLph * state.productGL,
      },
      rates: {
        feedFlowLph: flows.feedLph,
        harvestFlowLph: flows.harvestLph,
        bleedFlowLph: flows.bleedLph,
        dilutionRatePerH: flows.feedLph / volume,
        cellRemovalRatePerH: cellRemovalPerH,
        growthRatePerH: growthRate,
        deathRatePerH: deathRate,
        glucoseUptakeGLh,
        glutamineUptakeMmh,
        productFormationGLh,
        oxygenDemandPctH,
        oxygenTransferPctH,
        cellRetentionEfficiencyPct: cellRetentionFraction * 100,
      },
    };
  };

  const derivative = (state, timeH) => evaluate(state, timeH).derivative;
  let state = { ...initialState };
  const rows = [];
  let maxStepResidual = 0;
  let maxBalanceResidualPct = 0;

  for (let step = 0; step <= integrationSteps; step += 1) {
    const timeH = step * stepH;
    if (step % sampleEvery === 0 || step === integrationSteps) {
      const { rates } = evaluate(state, timeH);
      const viable = Math.max(0, state.biomassMCellsMl);
      const dead = Math.max(0, state.deadCellsMCellsMl);
      const volumeBalanceResidualL = initialVolumeL + state.cumulativeFeedL - state.cumulativeHarvestL - state.cumulativeBleedL - state.volumeL;
      const glucoseBalanceResidualG = initialState.substrateGL * initialVolumeL
        + state.cumulativeGlucoseFeedG
        - state.cumulativeGlucoseOutG
        - state.cumulativeGlucoseConsumedG
        - state.substrateGL * state.volumeL;
      const productBalanceResidualG = state.cumulativeProductGeneratedG
        - state.cumulativeProductOutG
        - state.productGL * state.volumeL;
      const balanceScale = Math.max(1, initialState.substrateGL * initialVolumeL + state.cumulativeGlucoseFeedG + state.cumulativeProductGeneratedG);
      const balanceResidualPct = Math.max(Math.abs(glucoseBalanceResidualG), Math.abs(productBalanceResidualG), Math.abs(volumeBalanceResidualL)) / balanceScale * 100;
      maxBalanceResidualPct = Math.max(maxBalanceResidualPct, balanceResidualPct);
      rows.push({
        timeH,
        ...state,
        ...rates,
        viableCellsMCellsMl: viable,
        totalCellsMCellsMl: viable + dead,
        viabilityPct: viable + dead > 0 ? viable / (viable + dead) * 100 : 0,
        glucoseGL: state.substrateGL,
        productKg: state.productGL * state.volumeL / 1000,
        totalProductKg: state.harvestProductKg + state.productGL * state.volumeL / 1000,
        generatedProductKg: state.cumulativeProductGeneratedG / 1000,
        feedFlowLDay: rates.feedFlowLph * 24,
        harvestFlowLDay: rates.harvestFlowLph * 24,
        bleedFlowLDay: rates.bleedFlowLph * 24,
        volumeBalanceResidualL,
        glucoseBalanceResidualG,
        productBalanceResidualG,
        balanceResidualPct,
      });
    }
    if (step === integrationSteps) break;
    const next = rk4Step(state, timeH, stepH, derivative);
    Object.keys(next).forEach((key) => {
      if (!Number.isFinite(next[key])) next[key] = state[key];
      next[key] = Math.max(0, next[key]);
    });
    next.dissolvedOxygenPct = clamp(next.dissolvedOxygenPct, 0, 100);
    next.volumeL = Math.min(maximumVolumeL, Math.max(1, next.volumeL));
    const residual = Math.max(...CORE_STATE_KEYS.map((key) => Math.abs(next[key] - state[key]) / Math.max(1, Math.abs(state[key]))));
    maxStepResidual = Math.max(maxStepResidual, residual);
    state = next;
  }

  return {
    solver: "RK4",
    model: "mode-specific nonlinear cell-culture mass balances",
    mode: normalizedMode,
    stepH,
    integrationSteps,
    maxStepResidual,
    maxBalanceResidualPct,
    points: rows,
    equations: CORE_STATE_KEYS.length,
    bookkeepingStates: Object.keys(initialState).length - CORE_STATE_KEYS.length,
    assumptions: {
      idealMixing: true,
      constantLiquidDensity: true,
      cellRetentionEfficiencyPct: cellRetentionFraction * 100,
      perfusionVolumeConstraint: normalizedMode === "perfusion" ? "F_feed = F_harvest + F_bleed" : "not active",
      fedBatchVolumeConstraint: normalizedMode === "fedBatch" ? "dV/dt = F_feed until final working volume" : "not active",
    },
  };
}

const forcingValue = (value, timeH, index, concentration) => typeof value === "function"
  ? Number(value(timeH, index, concentration)) || 0
  : Number(value) || 0;

export function solveAxialTransportPde({
  durationH = 1,
  cells = 40,
  lengthM = 3,
  velocityMph = 0.8,
  dispersionM2h = 0.05,
  inletConcentration = 1,
  initialConcentration = 0.25,
  uptakePerH = 0.08,
  sourcePerH = 0,
  snapshotCount = 7,
} = {}) {
  const nodeCount = Math.max(12, Math.round(cells));
  const safeLength = Math.max(0.1, lengthM);
  const dz = safeLength / (nodeCount - 1);
  const velocity = Math.max(0, velocityMph);
  const dispersion = Math.max(1e-6, dispersionM2h);
  const stableDt = Math.min(
    velocity > 0 ? dz / velocity * 0.42 : Infinity,
    dz * dz / (2 * dispersion) * 0.4,
    0.01,
  );
  const safeDuration = Math.max(stableDt, durationH);
  const steps = Math.max(1, Math.ceil(safeDuration / stableDt));
  const dt = safeDuration / steps;
  const snapshotStride = Math.max(1, Math.floor(steps / Math.max(1, snapshotCount - 1)));
  let concentration = Array.from({ length: nodeCount }, (_, index) => Math.max(0, forcingValue(initialConcentration, 0, index, [])));
  const snapshots = [];
  let maxResidual = 0;
  let cumulativeIn = 0;
  let cumulativeOut = 0;
  let cumulativeSource = 0;
  let cumulativeSink = 0;
  const initialInventory = concentration.reduce((sum, value) => sum + value * dz, 0);

  for (let step = 0; step <= steps; step += 1) {
    const timeH = step * dt;
    if (step % snapshotStride === 0 || step === steps) {
      const inventory = concentration.reduce((sum, value) => sum + value * dz, 0);
      const massBalanceResidual = inventory - initialInventory - cumulativeIn + cumulativeOut - cumulativeSource + cumulativeSink;
      const massBalanceScale = Math.max(1e-9, initialInventory + cumulativeIn + cumulativeSource);
      snapshots.push({
        timeH,
        values: [...concentration],
        minimum: Math.min(...concentration),
        maximum: Math.max(...concentration),
        average: concentration.reduce((sum, value) => sum + value, 0) / concentration.length,
        inlet: concentration[0],
        outlet: concentration.at(-1),
        inventory,
        massBalanceResidual,
        massBalanceResidualPct: Math.abs(massBalanceResidual) / massBalanceScale * 100,
      });
    }
    if (step === steps) break;
    const next = [...concentration];
    let sourceIntegral = 0;
    let sinkIntegral = 0;
    const inlet = Math.max(0, forcingValue(inletConcentration, timeH, 0, concentration));
    for (let index = 0; index < nodeCount; index += 1) {
      const current = concentration[index];
      const upstream = index === 0 ? inlet : concentration[index - 1];
      const downstream = index === nodeCount - 1 ? current : concentration[index + 1];
      const advection = -velocity * (current - upstream) / dz;
      const diffusion = dispersion * (downstream - 2 * current + upstream) / (dz * dz);
      const source = forcingValue(sourcePerH, timeH, index, concentration);
      const uptake = Math.max(0, forcingValue(uptakePerH, timeH, index, concentration));
      next[index] = Math.max(0, current + dt * (advection + diffusion + source - uptake * current));
      sourceIntegral += source * dz;
      sinkIntegral += uptake * current * dz;
    }
    cumulativeIn += (velocity * inlet + dispersion * (inlet - concentration[0]) / dz) * dt;
    cumulativeOut += velocity * concentration.at(-1) * dt;
    cumulativeSource += sourceIntegral * dt;
    cumulativeSink += sinkIntegral * dt;
    maxResidual = Math.max(maxResidual, ...next.map((value, index) => Math.abs(value - concentration[index])));
    concentration = next;
  }

  return {
    solver: "method of lines / explicit finite volume",
    model: "1D convective-dispersive-reaction PDE",
    boundaryConditions: "Danckwerts-type concentration inlet; zero-gradient dispersive outlet",
    cells: nodeCount,
    dz,
    dt,
    steps,
    maxResidual,
    courant: velocity * dt / dz,
    fourier: dispersion * dt / (dz * dz),
    peclet: velocity * safeLength / dispersion,
    massBalanceResidualPct: snapshots.at(-1)?.massBalanceResidualPct || 0,
    snapshots,
    final: snapshots.at(-1),
  };
}
