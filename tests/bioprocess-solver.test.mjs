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
    assert.equal(result.equations, 9);
    assert.ok(result.bookkeepingStates >= 8);
    assert.ok(result.maxBalanceResidualPct < 0.01);
    assert.ok(result.points.length >= 12);
    result.points.forEach((row) => {
      Object.entries(row).filter(([, value]) => typeof value === "number").forEach(([key, value]) => {
        assert.ok(Number.isFinite(value));
        if (!key.toLowerCase().includes("residual")) assert.ok(value >= 0);
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
  assert.equal(batch.points.at(-1).cumulativeFeedL, 0);
  assert.equal(batch.points.at(-1).cumulativeHarvestL, 0);
  assert.ok(fedBatch.points.at(-1).volumeL > fedBatch.points[0].volumeL);
  assert.ok(Math.abs(fedBatch.points.at(-1).volumeL - 1000) < 0.1);
  assert.ok(Math.abs(fedBatch.points.at(-1).cumulativeFeedL - 300) < 0.1);
  assert.equal(fedBatch.points.at(-1).cumulativeHarvestL, 0);
  assert.equal(perfusion.points[0].volumeL, perfusion.points.at(-1).volumeL);
  assert.ok(perfusion.points.at(-1).cumulativeFeedL > 0);
  assert.ok(Math.abs(
    perfusion.points.at(-1).cumulativeFeedL
      - perfusion.points.at(-1).cumulativeHarvestL
      - perfusion.points.at(-1).cumulativeBleedL,
  ) < 0.1);
  assert.ok(perfusion.points.at(-1).harvestProductKg > 0);
});

test("perfusion cell retention changes viable-cell loss without breaking volume closure", () => {
  const retained = solveBioprocessOde({
    mode: "perfusion",
    durationH: 120,
    volumeL: 1000,
    perfusionRateVvd: 1.5,
    bleedFraction: 0,
    cellRetentionEfficiencyPct: 99.9,
  });
  const leaky = solveBioprocessOde({
    mode: "perfusion",
    durationH: 120,
    volumeL: 1000,
    perfusionRateVvd: 1.5,
    bleedFraction: 0,
    cellRetentionEfficiencyPct: 80,
  });

  assert.ok(retained.points.at(-1).biomassMCellsMl > leaky.points.at(-1).biomassMCellsMl);
  assert.ok(Math.abs(retained.points.at(-1).volumeBalanceResidualL) < 0.01);
  assert.ok(Math.abs(leaky.points.at(-1).volumeBalanceResidualL) < 0.01);
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
  assert.ok(result.courant < 0.5);
  assert.ok(result.fourier < 0.5);
  assert.ok(result.massBalanceResidualPct < 0.01);
  assert.ok(result.snapshots.length >= 2);
  assert.equal(result.final.values.length, 48);
  result.final.values.forEach((value) => {
    assert.ok(Number.isFinite(value));
    assert.ok(value >= 0);
  });
});
