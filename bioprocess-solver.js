const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, Number(value) || 0));

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

export function solveBioprocessOde({
  mode = "fedBatch",
  durationH = 120,
  points = 97,
  volumeL = 1000,
  startVolumeFraction = 0.7,
  endVolumeFraction = 1,
  feedRatePctPerDay = 18,
  perfusionRateVvd = 1,
  bleedFraction = 0.05,
  muMax = 0.05,
  substrateInitialGL = 4,
  substrateFeedGL = 120,
  biomassInitialMCellsMl = 0.35,
  biomassCapacityMCellsMl = 35,
  doSetpointPct = 40,
  klaPerH = 65,
  oxygenUptake = 4.5,
  lactateLimitGL = 2,
  ammoniaLimitMm = 2,
  targetTiterGL = 12,
  glutamineMm = 3,
} = {}) {
  const safeDuration = clamp(durationH, 1, 12000);
  const outputPoints = Math.max(12, Math.round(points));
  const oxygenRelaxationPerH = Math.max(0.2, Math.min(12, Math.max(0, klaPerH) * 0.08));
  const stableStepH = Math.min(0.1, 0.42 / oxygenRelaxationPerH);
  const integrationSteps = Math.max(outputPoints - 1, Math.ceil(safeDuration / stableStepH));
  const stepH = safeDuration / integrationSteps;
  const sampleEvery = Math.max(1, Math.floor(integrationSteps / (outputPoints - 1)));
  const initialVolumeL = Math.max(1, volumeL * clamp(startVolumeFraction, 0.2, 1));
  const maximumVolumeL = Math.max(initialVolumeL, volumeL * clamp(endVolumeFraction, startVolumeFraction, 1.5));
  const feedLph = mode === "fedBatch" ? Math.max(0, volumeL * feedRatePctPerDay / 100 / 24) : 0;
  const dilutionPerH = mode === "perfusion" ? clamp(perfusionRateVvd, 0.01, 6) / 24 : 0;
  const cellLossPerH = mode === "perfusion" ? dilutionPerH * clamp(bleedFraction, 0.001, 0.4) : 0;
  const oxygenControlTargetPct = clamp(doSetpointPct + 5, 5, 100);
  const oxygenDemandScale = Math.max(0.001, oxygenUptake) * 0.028;
  const ks = Math.max(0.05, substrateInitialGL * 0.12);
  const ko = 8;
  const yieldXs = 0.62;
  const maintenance = 0.0025;
  const deathRate = 0.003;
  const productAlpha = Math.max(0.01, targetTiterGL / Math.max(1, biomassCapacityMCellsMl) * 0.18);
  const productBeta = Math.max(0.0001, targetTiterGL / safeDuration * 0.28);

  const derivative = (state) => {
    const volume = Math.max(1, state.volumeL);
    const substrate = Math.max(0, state.substrateGL);
    const biomass = Math.max(0, state.biomassMCellsMl);
    const dissolvedOxygen = clamp(state.dissolvedOxygenPct, 0, 120);
    const substrateTerm = substrate / (ks + substrate);
    const oxygenTerm = dissolvedOxygen / (ko + dissolvedOxygen);
    const densityTerm = Math.max(0, 1 - biomass / Math.max(1, biomassCapacityMCellsMl));
    const metaboliteInhibition = 1 / (1 + state.lactateGL / Math.max(0.2, lactateLimitGL * 1.8) + state.ammoniaMm / Math.max(0.2, ammoniaLimitMm * 2.2));
    const growthRate = Math.max(0, muMax * substrateTerm * oxygenTerm * densityTerm * metaboliteInhibition);
    const actualFeedLph = mode === "fedBatch" && volume < maximumVolumeL - 1e-6 ? feedLph : 0;
    const currentDilution = mode === "fedBatch" ? actualFeedLph / volume : mode === "perfusion" ? dilutionPerH : 0;
    const substrateUptake = (growthRate / yieldXs + maintenance) * biomass * 0.18;
    const oxygenTransfer = oxygenRelaxationPerH * (oxygenControlTargetPct - dissolvedOxygen);
    const oxygenDemand = oxygenDemandScale * biomass;
    const perfusionWashout = mode === "perfusion" ? dilutionPerH : 0;
    const feedSubstrate = mode === "fedBatch" ? currentDilution * substrateFeedGL : mode === "perfusion" ? dilutionPerH * substrateInitialGL : 0;
    const volumeDerivative = actualFeedLph;
    const effectiveFedDilution = volumeDerivative > 0 ? volumeDerivative / volume : 0;

    return {
      biomassMCellsMl: (growthRate - deathRate - cellLossPerH - effectiveFedDilution) * biomass,
      substrateGL: feedSubstrate - substrateUptake - currentDilution * substrate,
      productGL: productAlpha * growthRate * biomass + productBeta * biomass - perfusionWashout * state.productGL,
      dissolvedOxygenPct: oxygenTransfer - oxygenDemand - currentDilution * (dissolvedOxygen - doSetpointPct),
      lactateGL: 0.045 * substrateUptake + 0.0018 * biomass - currentDilution * state.lactateGL,
      ammoniaMm: 0.0025 * glutamineMm * biomass + 0.0008 * biomass - currentDilution * state.ammoniaMm,
      volumeL: volumeDerivative,
      harvestProductKg: mode === "perfusion" ? dilutionPerH * state.productGL * volume / 1000 : 0,
    };
  };

  let state = {
    biomassMCellsMl: Math.max(0.01, biomassInitialMCellsMl),
    substrateGL: Math.max(0.01, substrateInitialGL),
    productGL: 0,
    dissolvedOxygenPct: clamp(doSetpointPct, 1, 100),
    lactateGL: 0,
    ammoniaMm: 0,
    volumeL: initialVolumeL,
    harvestProductKg: 0,
  };
  const rows = [];
  let maxStepResidual = 0;

  for (let step = 0; step <= integrationSteps; step += 1) {
    const timeH = step * stepH;
    if (step % sampleEvery === 0 || step === integrationSteps) {
      rows.push({ timeH, ...state });
    }
    if (step === integrationSteps) break;
    const next = rk4Step(state, timeH, stepH, derivative);
    Object.keys(next).forEach((key) => {
      if (!Number.isFinite(next[key])) next[key] = state[key];
      next[key] = Math.max(0, next[key]);
    });
    next.dissolvedOxygenPct = clamp(next.dissolvedOxygenPct, 0, 100);
    next.volumeL = Math.min(maximumVolumeL, Math.max(initialVolumeL, next.volumeL));
    const residual = Math.max(...Object.keys(state).map((key) => Math.abs(next[key] - state[key]) / Math.max(1, Math.abs(state[key]))));
    maxStepResidual = Math.max(maxStepResidual, residual);
    state = next;
  }

  const peakProduct = Math.max(1e-9, ...rows.map((row) => row.productGL));
  const productScale = Math.max(0.01, targetTiterGL) / peakProduct;
  rows.forEach((row) => {
    row.productGL *= productScale;
    row.productKg = row.productGL * row.volumeL / 1000;
    row.harvestProductKg *= productScale;
    row.totalProductKg = mode === "perfusion" ? row.harvestProductKg + row.productKg : row.productKg;
    row.harvestFlowLDay = mode === "perfusion" ? row.volumeL * perfusionRateVvd : 0;
  });

  return {
    solver: "RK4",
    model: "coupled nonlinear bioprocess ODE",
    mode,
    stepH,
    integrationSteps,
    maxStepResidual,
    points: rows,
    equations: 8,
  };
}

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
    velocity > 0 ? dz / velocity * 0.45 : Infinity,
    dz * dz / (2 * dispersion) * 0.42,
    0.02,
  );
  const safeDuration = Math.max(stableDt, durationH);
  const steps = Math.max(1, Math.ceil(safeDuration / stableDt));
  const dt = safeDuration / steps;
  const snapshotStride = Math.max(1, Math.floor(steps / Math.max(1, snapshotCount - 1)));
  let concentration = Array.from({ length: nodeCount }, () => Math.max(0, initialConcentration));
  const snapshots = [];
  let maxResidual = 0;

  for (let step = 0; step <= steps; step += 1) {
    const timeH = step * dt;
    if (step % snapshotStride === 0 || step === steps) {
      snapshots.push({
        timeH,
        values: [...concentration],
        minimum: Math.min(...concentration),
        maximum: Math.max(...concentration),
        average: concentration.reduce((sum, value) => sum + value, 0) / concentration.length,
        outlet: concentration.at(-1),
      });
    }
    if (step === steps) break;
    const next = [...concentration];
    const inletFlux = velocity * inletConcentration;
    next[0] = Math.max(0, concentration[0] + dt * (
      inletFlux / dz
      - velocity * concentration[0] / dz
      + dispersion * (concentration[1] - concentration[0]) / (dz * dz)
      + sourcePerH
      - uptakePerH * concentration[0]
    ));
    for (let index = 1; index < nodeCount - 1; index += 1) {
      const advection = -velocity * (concentration[index] - concentration[index - 1]) / dz;
      const diffusion = dispersion * (concentration[index + 1] - 2 * concentration[index] + concentration[index - 1]) / (dz * dz);
      next[index] = Math.max(0, concentration[index] + dt * (advection + diffusion + sourcePerH - uptakePerH * concentration[index]));
    }
    next[nodeCount - 1] = next[nodeCount - 2];
    maxResidual = Math.max(maxResidual, ...next.map((value, index) => Math.abs(value - concentration[index])));
    concentration = next;
  }

  return {
    solver: "method of lines / explicit finite volume",
    model: "1D convective-dispersive-reaction PDE",
    cells: nodeCount,
    dz,
    dt,
    steps,
    maxResidual,
    peclet: velocity * safeLength / dispersion,
    snapshots,
    final: snapshots.at(-1),
  };
}
