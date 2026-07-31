export const OPERATION_MODES = Object.freeze({
  batch: Object.freeze({
    key: "batch",
    label: "Batch",
    cycleLabel: "batch",
    countLabel: "Annual batches",
    description: "Single charge, closed cultivation, harvest, cleaning, and restart.",
    balance: "d(C_i V)/dt = r_i V; F_in = F_out = 0 during cultivation",
  }),
  fedBatch: Object.freeze({
    key: "fedBatch",
    label: "Fed-batch",
    cycleLabel: "batch",
    countLabel: "Annual batches",
    description: "Initial charge plus controlled nutrient feed, rising volume, harvest, and cleaning.",
    balance: "d(C_i V)/dt = F_feed C_i,feed + r_i V; dV/dt = F_feed",
  }),
  perfusion: Object.freeze({
    key: "perfusion",
    label: "Perfusion",
    cycleLabel: "campaign",
    countLabel: "Annual campaigns",
    description: "Continuous medium exchange and harvest with cell retention, bleed, and campaign cleaning.",
    balance: "d(C_i V)/dt = F_in C_i,in - F_h C_i + r_i V; D = F_in/V",
  }),
});

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, Number(value) || 0));

export function normalizeOperationMode(value, fallback = "fedBatch") {
  return OPERATION_MODES[value] ? value : OPERATION_MODES[fallback] ? fallback : "fedBatch";
}

export function operationModeProfile({
  mode = "fedBatch",
  batchSize = 1,
  batchCount = 1,
  feedRate = 0,
  perfusionRate = 0,
  annualOperatingTime = 7920,
  equipmentUptime = 92,
  productionResidenceH = 120,
} = {}) {
  const key = normalizeOperationMode(mode);
  const definition = OPERATION_MODES[key];
  const vesselVolumeL = Math.max(1, Number(batchSize) || 1);
  const requestedCycles = Math.max(1, Math.round(Number(batchCount) || 1));
  const effectiveAotH = Math.max(24, Number(annualOperatingTime || 7920) * clamp(equipmentUptime || 92, 1, 100) / 100);
  const residenceH = Math.max(1, Number(productionResidenceH) || 120);

  if (key === "batch") {
    const productionHours = clamp(residenceH, 24, 168);
    return {
      ...definition,
      productionHours,
      requestedCycles,
      targetCycles: requestedCycles,
      effectiveAotH,
      feedFraction: 0,
      dilutionRatePerDay: 0,
      bleedFraction: 0,
      startVolumeFraction: 1,
      endVolumeFraction: 1,
      harvestVolumePerCycleL: vesselVolumeL,
      annualHarvestVolumeL: vesselVolumeL * requestedCycles,
      annualOperatingHours: productionHours * requestedCycles,
      productivityFactor: 0.88,
      mediaTurnoversPerCycle: 1,
    };
  }

  if (key === "perfusion") {
    const productionHours = clamp(residenceH, 168, Math.max(168, effectiveAotH));
    const dilutionRatePerDay = clamp(perfusionRate || 1, 0.05, 4);
    const bleedFraction = clamp(0.03 + dilutionRatePerDay * 0.018, 0.03, 0.16);
    const campaignCapacity = Math.max(1, Math.floor(effectiveAotH / Math.max(168, productionHours + 16)));
    const targetCycles = Math.max(1, Math.min(requestedCycles, campaignCapacity));
    const annualHarvestVolumeL = vesselVolumeL * dilutionRatePerDay * effectiveAotH / 24;
    return {
      ...definition,
      productionHours,
      requestedCycles,
      targetCycles,
      effectiveAotH,
      feedFraction: 1,
      dilutionRatePerDay,
      bleedFraction,
      startVolumeFraction: 1,
      endVolumeFraction: 1,
      harvestVolumePerCycleL: vesselVolumeL * dilutionRatePerDay * productionHours / 24,
      annualHarvestVolumeL,
      annualOperatingHours: effectiveAotH,
      productivityFactor: 0.8 + Math.min(0.35, dilutionRatePerDay * 0.08),
      mediaTurnoversPerCycle: dilutionRatePerDay * productionHours / 24,
    };
  }

  const productionHours = clamp(residenceH, 48, 336);
  const feedFraction = clamp(Number(feedRate || 0) / 100 * productionHours / 24, 0.05, 0.85);
  const harvestVolumePerCycleL = vesselVolumeL * (1 + feedFraction);
  return {
    ...definition,
    productionHours,
    requestedCycles,
    targetCycles: requestedCycles,
    effectiveAotH,
    feedFraction,
    dilutionRatePerDay: 0,
    bleedFraction: 0,
    startVolumeFraction: Math.max(0.55, 1 - feedFraction),
    endVolumeFraction: 1,
    harvestVolumePerCycleL,
    annualHarvestVolumeL: harvestVolumePerCycleL * requestedCycles,
    annualOperatingHours: productionHours * requestedCycles,
    productivityFactor: 1 + Math.min(0.4, feedFraction * 0.35),
    mediaTurnoversPerCycle: 1 + feedFraction,
  };
}
