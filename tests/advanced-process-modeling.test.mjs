import test from "node:test";
import assert from "node:assert/strict";

import {
  analyzeDesignSpace,
  analyzeModelStructure,
  buildDistributedDomain,
  estimateParameters,
  executeOperatingProcedure,
  fitSurrogate,
  monteCarloAnalysis,
  optimizeDesign,
  runScalarStateEstimator,
} from "../advanced-process-modeling.js";

test("structural analysis identifies well-posed and incomplete models", () => {
  const ready = analyzeModelStructure({
    variables: [{ name: "X", role: "state", initialized: true }, { name: "S" }],
    equations: [{ name: "biomass" }, { name: "substrate" }],
    domains: [{ nodes: 21 }],
    events: [{ condition: { key: "time", operator: ">=", value: 24 } }],
  });
  assert.equal(ready.status, "ready");
  assert.equal(ready.degreesOfFreedom, 0);

  const blocked = analyzeModelStructure({
    variables: [{ name: "X", role: "state", initialized: false }, { name: "S" }],
    equations: [{ name: "biomass" }],
  });
  assert.equal(blocked.status, "blocked");
  assert.equal(blocked.degreesOfFreedom, 1);
  assert.deepEqual(blocked.missingInitialConditions, ["X"]);
});

test("operating procedures execute branches, loops, save, and restore", () => {
  const result = executeOperatingProcedure({
    context: { phase: "charge", volume: 0, cycles: 0 },
    tasks: [
      { type: "save", label: "charged" },
      { type: "sequence", label: "Charge", steps: [{ type: "add", key: "volume", value: 100 }, { type: "switch", key: "phase", value: "culture" }] },
      { type: "while", condition: { key: "cycles", operator: "<", value: 3 }, steps: [{ type: "add", key: "cycles", value: 1 }] },
      { type: "if", condition: { key: "cycles", operator: ">=", value: 3 }, then: [{ type: "set", key: "released", value: true }] },
    ],
  });
  assert.equal(result.context.volume, 100);
  assert.equal(result.context.phase, "culture");
  assert.equal(result.context.cycles, 3);
  assert.equal(result.context.released, true);
  assert.ok(result.log.length >= 8);
});

test("parameter estimation recovers a kinetic coefficient", () => {
  const observations = [0, 1, 2, 3, 4].map((time) => ({ time, observed: 2 + 3 * time }));
  const result = estimateParameters({
    observations,
    parameters: { rate: 1 },
    bounds: { rate: [0, 6] },
    simulate: (parameters, observation) => 2 + parameters.rate * observation.time,
  });
  assert.ok(Math.abs(result.parameters.rate - 3) < 0.02);
  assert.ok(result.rmse < 0.03);
  assert.ok(result.r2 > 0.999);
});

test("bounded optimizer finds a feasible design", () => {
  const result = optimizeDesign({
    variables: [{ key: "feed", initial: 1, low: 0, high: 10 }],
    evaluate: ({ feed }) => ({
      objective: (feed - 6) ** 2,
      constraints: [{ name: "minimum", violation: Math.max(0, 2 - feed) }],
      outputs: { titer: feed * 2 },
    }),
  });
  assert.equal(result.feasible, true);
  assert.ok(Math.abs(result.variables.feed - 6) < 0.02);
});

test("Monte Carlo analysis is deterministic and ranks sensitivity", () => {
  const configuration = {
    samples: 120,
    seed: 42,
    parameters: [
      { key: "titer", low: 8, mode: 10, high: 12 },
      { key: "recovery", low: 0.6, mode: 0.7, high: 0.8 },
    ],
    evaluate: ({ titer, recovery }) => ({ output: titer * recovery }),
  };
  const first = monteCarloAnalysis(configuration);
  const second = monteCarloAnalysis(configuration);
  assert.deepEqual(first.rows, second.rows);
  assert.ok(first.summary.output.p95 > first.summary.output.p05);
  assert.equal(first.sensitivity[0].output, "output");
});

test("surrogate, state estimator, design space, and domain are executable", () => {
  const rows = Array.from({ length: 8 }, (_, index) => ({ x: index, y: index * 2, cost: 5 + 3 * index + index * 2 }));
  const surrogate = fitSurrogate({ rows, features: ["x", "y"], target: "cost" });
  assert.ok(Math.abs(surrogate.predict({ x: 2, y: 4 }) - 15) < 0.01);
  assert.ok(surrogate.r2 > 0.999);

  const estimates = runScalarStateEstimator({
    observations: [1.2, 1.8, 3.1, 3.9].map((measurement) => ({ measurement, input: 1 })),
    initialState: 0,
    measurementVariance: 0.2,
  });
  assert.ok(Math.abs(estimates.at(-1).estimate - 4) < Math.abs(3.9 - 4));

  const designSpace = analyzeDesignSpace({
    factors: [{ key: "temperature", levels: [34, 36, 38] }, { key: "ph", levels: [6.8, 7, 7.2] }],
    evaluate: ({ temperature, ph }) => ({ objective: (temperature - 36) ** 2 + (ph - 7) ** 2, constraints: [{ violation: Math.max(0, temperature - 37) }] }),
  });
  assert.equal(designSpace.rows.length, 9);
  assert.equal(designSpace.best.temperature, 36);
  assert.equal(designSpace.best.ph, 7);

  const domain = buildDistributedDomain({ length: 4, nodes: 9 });
  assert.equal(domain.grid.length, 9);
  assert.equal(domain.spacing, 0.5);
  assert.equal(domain.grid.at(-1).boundary, "outlet");
});
