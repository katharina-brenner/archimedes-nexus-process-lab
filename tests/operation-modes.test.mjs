import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeOperationMode,
  operationModeProfile,
} from "../operation-modes.js";

const common = {
  batchSize: 1000,
  batchCount: 20,
  annualOperatingTime: 8000,
  equipmentUptime: 90,
  productionResidenceH: 120,
};

test("batch mode uses one closed charge per requested cycle", () => {
  const profile = operationModeProfile({ ...common, mode: "batch", feedRate: 25, perfusionRate: 2 });

  assert.equal(profile.feedFraction, 0);
  assert.equal(profile.dilutionRatePerDay, 0);
  assert.equal(profile.harvestVolumePerCycleL, 1000);
  assert.equal(profile.annualHarvestVolumeL, 20000);
});

test("fed-batch mode raises working volume through controlled feed", () => {
  const profile = operationModeProfile({ ...common, mode: "fedBatch", feedRate: 18 });

  assert.ok(profile.feedFraction > 0);
  assert.ok(profile.startVolumeFraction < profile.endVolumeFraction);
  assert.ok(profile.harvestVolumePerCycleL > common.batchSize);
  assert.equal(profile.annualHarvestVolumeL, profile.harvestVolumePerCycleL * common.batchCount);
});

test("perfusion mode derives annual harvest from dilution and operating time", () => {
  const profile = operationModeProfile({ ...common, mode: "perfusion", perfusionRate: 1.5 });
  const expected = common.batchSize * 1.5 * profile.effectiveAotH / 24;

  assert.equal(profile.dilutionRatePerDay, 1.5);
  assert.ok(profile.bleedFraction > 0);
  assert.equal(profile.annualHarvestVolumeL, expected);
  assert.ok(profile.targetCycles <= profile.requestedCycles);
});

test("unknown operation modes normalize to a valid fallback", () => {
  assert.equal(normalizeOperationMode("continuous", "batch"), "batch");
});
