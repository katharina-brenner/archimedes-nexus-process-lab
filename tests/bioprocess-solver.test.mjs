import assert from "node:assert/strict";
import test from "node:test";

import {
  solveAxialTransportPde,
  solveBioprocessOde,
} from "../bioprocess-solver.js";

test("ODE solver returns finite non-negative state trajectories for all production modes", () => {
  for (const mode of ["batch", "fedBatch", "perfusion"]) {
    const result = solveBioprocessOde({
      mode,
      durationH: 96,
      volumeL: 1000,
      startVolumeFraction: mode === "fedBatch" ? 0.7 : 1,
      endVolumeFraction: 1,
      feedRatePctPerDay: 18,
      perfusionRateVvd: 1,
    });

    assert.equal(result.solver, "RK4");
    assert.equal(result.equations, 8);
    assert.ok(result.points.length >= 12);
    result.points.forEach((row) => {
      Object.values(row).filter((value) => typeof value === "number").forEach((value) => {
        assert.ok(Number.isFinite(value));
        assert.ok(value >= 0);
      });
    });
  }
});

test("ODE modes preserve their distinct volume and harvest behavior", () => {
  const batch = solveBioprocessOde({ mode: "batch", durationH: 96, volumeL: 1000 });
  const fedBatch = solveBioprocessOde({
    mode: "fedBatch",
    durationH: 96,
    volumeL: 1000,
    startVolumeFraction: 0.7,
    endVolumeFraction: 1,
    feedRatePctPerDay: 18,
  });
  const perfusion = solveBioprocessOde({ mode: "perfusion", durationH: 96, volumeL: 1000, perfusionRateVvd: 1 });

  assert.equal(batch.points[0].volumeL, batch.points.at(-1).volumeL);
  assert.ok(fedBatch.points.at(-1).volumeL > fedBatch.points[0].volumeL);
  assert.equal(perfusion.points[0].volumeL, perfusion.points.at(-1).volumeL);
  assert.ok(perfusion.points.at(-1).harvestProductKg > 0);
});

test("finite-volume PDE solver resolves a stable convective-dispersive field", () => {
  const result = solveAxialTransportPde({
    durationH: 2,
    cells: 48,
    lengthM: 3.2,
    velocityMph: 0.9,
    dispersionM2h: 0.06,
    inletConcentration: 1,
    initialConcentration: 0.2,
    uptakePerH: 0.08,
  });

  assert.equal(result.cells, 48);
  assert.ok(result.steps > 1);
  assert.ok(result.peclet > 0);
  assert.ok(result.snapshots.length >= 2);
  assert.equal(result.final.values.length, 48);
  result.final.values.forEach((value) => {
    assert.ok(Number.isFinite(value));
    assert.ok(value >= 0);
  });
});
