import assert from "node:assert/strict";
import test from "node:test";

import {
  aspenCapabilityMatrix,
  fenskeMinimumStages,
  phaseEnvelopeRows,
  pinchUtilityTargets,
  solveIsothermalFlash,
  solveRachfordRice,
} from "../thermodynamics.js";

const closeTo = (actual, expected, tolerance = 1e-8) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);
};

test("Rachford-Rice closes two-phase compositions and detects phase limits", () => {
  const solved = solveRachfordRice([0.5, 0.5], [2.0, 0.5]);
  assert.equal(solved.phase, "two-phase");
  closeTo(solved.vaporFraction, 0.5, 1e-7);

  assert.equal(solveRachfordRice([0.5, 0.5], [0.4, 0.7]).phase, "liquid");
  assert.equal(solveRachfordRice([0.5, 0.5], [1.4, 2.1]).phase, "vapor");
});

test("isothermal flash produces normalized liquid and vapor compositions", () => {
  const flash = solveIsothermalFlash({
    componentIds: ["water", "ethanol", "carbonDioxide"],
    composition: [0.88, 0.1, 0.02],
    temperatureC: 37,
    pressureBar: 1.2,
  });
  assert.ok(flash.vaporFraction >= 0 && flash.vaporFraction <= 1);
  closeTo(flash.components.reduce((sum, row) => sum + row.z, 0), 1);
  closeTo(flash.components.reduce((sum, row) => sum + row.xLiquid, 0), 1);
  closeTo(flash.components.reduce((sum, row) => sum + row.yVapor, 0), 1);
  assert.ok(flash.components.every((row) => Number.isFinite(row.kValue) && row.kValue > 0));
});

test("phase, distillation and pinch screening expose deterministic engineering outputs", () => {
  const envelope = phaseEnvelopeRows({
    componentIds: ["water", "ethanol"],
    composition: [0.7, 0.3],
    pressureBar: 1.013,
  }, { minimumC: 20, maximumC: 120, points: 11 });
  assert.equal(envelope.length, 11);
  assert.equal(envelope[0].temperatureC, 20);
  assert.equal(envelope.at(-1).temperatureC, 120);

  const stages = fenskeMinimumStages({ lightKeyTop: 0.95, lightKeyBottom: 0.05, relativeVolatility: 2.3 });
  assert.ok(stages > 0 && Number.isFinite(stages));

  const pinch = pinchUtilityTargets([
    { kind: "hot", supplyC: 150, targetC: 50, cpFlowKwK: 2 },
    { kind: "cold", supplyC: 20, targetC: 120, cpFlowKwK: 1.2 },
  ], { deltaTminC: 10 });
  assert.ok(pinch.intervals.length > 0);
  assert.ok(pinch.minimumHotUtilityKw >= 0);
  assert.ok(pinch.minimumColdUtilityKw >= 0);
  assert.ok(pinch.intervals.every((row) => Number.isFinite(row.adjustedCascadeKw)));
});

test("simulator capability map distinguishes executable features from specialist gaps", () => {
  const matrix = aspenCapabilityMatrix();
  assert.ok(matrix.some((item) => item.capability === "VLE flash" && item.status === "Executable native"));
  assert.ok(matrix.some((item) => item.status === "Specialist solver required"));
  assert.ok(matrix.every((item) => item.capability && item.status && item.scope));
});
