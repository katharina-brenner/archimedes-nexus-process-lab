import assert from "node:assert/strict";
import test from "node:test";

import {
  buildCrossingAwareRoutePlan,
  countRouteCrossings,
} from "../canvas-router.js";

function unit(id, x, y, width = 120, height = 72) {
  return { id, x, y, width, height };
}

function stream(id, from, to, kind = "main", index = 0) {
  return { id, from, to, kind, index };
}

function segmentIntersectsRect(from, to, rect) {
  if (from.y === to.y) {
    return from.y > rect.top
      && from.y < rect.bottom
      && Math.max(from.x, to.x) > rect.left
      && Math.min(from.x, to.x) < rect.right;
  }
  return from.x > rect.left
    && from.x < rect.right
    && Math.max(from.y, to.y) > rect.top
    && Math.min(from.y, to.y) < rect.bottom;
}

test("global router creates a deterministic orthogonal route", () => {
  const plan = buildCrossingAwareRoutePlan({
    units: [unit("A", 48, 96), unit("B", 520, 96)],
    streams: [stream("S1", "A", "B")],
    width: 900,
    height: 480,
  });

  assert.equal(plan.stats.routed, 1);
  assert.equal(plan.stats.fallback, 0);
  assert.equal(plan.stats.passes, 1);
  assert.deepEqual(plan.routes.S1, buildCrossingAwareRoutePlan({
    units: [unit("A", 48, 96), unit("B", 520, 96)],
    streams: [stream("S1", "A", "B")],
    width: 900,
    height: 480,
  }).routes.S1);
  plan.routes.S1.slice(1).forEach((point, index) => {
    const previous = plan.routes.S1[index];
    assert.ok(previous.x === point.x || previous.y === point.y, "route contains a diagonal segment");
  });
});

test("global router retries conflicted plans with deterministic rerouting passes", () => {
  const plan = buildCrossingAwareRoutePlan({
    units: [unit("A", 48, 96), unit("B", 720, 360)],
    streams: [stream("S1", "A", "B")],
    width: 980,
    height: 560,
    maxIterations: 1,
    maxPasses: 3,
  });

  assert.equal(plan.stats.fallback, 1);
  assert.equal(plan.stats.passes, 3);
  assert.equal(plan.stats.optimized, true);
  assert.ok(Number.isFinite(plan.stats.score));
});

test("global router avoids equipment occupying the direct corridor", () => {
  const blocker = unit("BLOCK", 330, 96, 140, 100);
  const plan = buildCrossingAwareRoutePlan({
    units: [unit("A", 48, 110), blocker, unit("B", 620, 110)],
    streams: [stream("S1", "A", "B")],
    width: 980,
    height: 520,
  });
  const protectedBlocker = {
    left: blocker.x - 8,
    right: blocker.x + blocker.width + 8,
    top: blocker.y - 8,
    bottom: blocker.y + blocker.height + 8,
  };

  assert.equal(plan.stats.fallback, 0);
  plan.routes.S1.slice(1).forEach((point, index) => {
    assert.equal(
      segmentIntersectsRect(plan.routes.S1[index], point, protectedBlocker),
      false,
      "route intersects protected equipment",
    );
  });
});

test("global router removes the obvious crossing between two process streams", () => {
  const units = [
    unit("A", 48, 72),
    unit("B", 600, 312),
    unit("C", 48, 312),
    unit("D", 600, 72),
  ];
  const naiveRoutes = {
    S1: [{ x: 0, y: 50 }, { x: 100, y: 50 }],
    S2: [{ x: 50, y: 0 }, { x: 50, y: 100 }],
  };
  const plan = buildCrossingAwareRoutePlan({
    units,
    streams: [
      stream("S1", "A", "B", "main", 0),
      stream("S2", "C", "D", "main", 1),
    ],
    width: 980,
    height: 560,
  });

  assert.ok(countRouteCrossings(naiveRoutes) > 0);
  assert.equal(plan.stats.crossings, 0);
  assert.equal(plan.stats.fallback, 0);
});

test("global router protects exact port stubs in a dense parallel-reactor layout", () => {
  const units = [
    unit("BR-201", 790, 265, 206, 112),
    unit("WV-301", 1290, 265, 184, 96),
    unit("FV-401", 540, 450, 184, 96),
    unit("BR-202", 2290, 265, 206, 112),
    unit("BR-203", 2540, 265, 206, 112),
  ];
  const plan = buildCrossingAwareRoutePlan({
    units,
    streams: [
      stream("F-011", "BR-201", "BR-202", "main", 0),
      stream("F-012", "BR-201", "BR-203", "main", 1),
      stream("S-302", "WV-301", "FV-401", "main", 2),
    ],
    width: 3300,
    height: 1300,
  });

  assert.equal(plan.stats.fallback, 0);
  assert.equal(plan.stats.crossings, 0);
});

test("locked stream corridors remain fixed while other streams reroute around them", () => {
  const units = [
    unit("A", 48, 72),
    unit("B", 640, 72),
    unit("C", 48, 300),
    unit("D", 640, 300),
  ];
  const lockedRoute = [
    { x: 168, y: 108 },
    { x: 224, y: 108 },
    { x: 224, y: 236 },
    { x: 584, y: 236 },
    { x: 584, y: 108 },
    { x: 640, y: 108 },
  ];
  const plan = buildCrossingAwareRoutePlan({
    units,
    streams: [
      stream("LOCKED", "A", "B", "main", 0),
      stream("AUTO", "C", "D", "main", 1),
    ],
    lockedRoutes: { LOCKED: lockedRoute },
    width: 980,
    height: 560,
  });

  assert.equal(plan.stats.locked, 1);
  assert.deepEqual(plan.stats.lockedIds, ["LOCKED"]);
  assert.deepEqual(plan.routes.LOCKED, lockedRoute);
  assert.ok(plan.routes.AUTO.length >= 2);
});

test("global router handles a plant-scale graph with more than one hundred streams", () => {
  const units = [];
  for (let row = 0; row < 8; row += 1) {
    for (let column = 0; column < 8; column += 1) {
      units.push(unit(`U-${row}-${column}`, 72 + column * 250, 72 + row * 140, 112, 64));
    }
  }
  const streams = [];
  for (let row = 0; row < 8; row += 1) {
    for (let column = 0; column < 7; column += 1) {
      streams.push(stream(`H-${row}-${column}`, `U-${row}-${column}`, `U-${row}-${column + 1}`, "main", streams.length));
    }
  }
  for (let row = 0; row < 7; row += 1) {
    for (let column = 0; column < 8; column += 1) {
      streams.push(stream(`V-${row}-${column}`, `U-${row}-${column}`, `U-${row + 1}-${column}`, "utility", streams.length));
    }
  }

  const startedAt = performance.now();
  const plan = buildCrossingAwareRoutePlan({
    units,
    streams,
    width: 2100,
    height: 1320,
    maxIterations: 18000,
  });
  const duration = performance.now() - startedAt;

  assert.equal(streams.length, 112);
  assert.equal(plan.stats.routed, streams.length);
  assert.equal(Object.keys(plan.routes).length, streams.length);
  assert.ok(duration < 5000, `large route plan took ${Math.round(duration)} ms`);
});

test("hierarchical router scales to one thousand streams without quadratic crossing scans", () => {
  const units = [
    unit("SOURCE", 48, 96),
    unit("TARGET", 900, 96),
  ];
  const streams = Array.from({ length: 1000 }, (_, index) => (
    stream(`S-${index}`, "SOURCE", "TARGET", index % 5 ? "main" : "utility", index)
  ));
  const startedAt = performance.now();
  const plan = buildCrossingAwareRoutePlan({
    units,
    streams,
    width: 1200,
    height: 480,
    hierarchical: true,
    maxIterations: 1,
    maxPasses: 1,
  });
  const duration = performance.now() - startedAt;

  assert.equal(plan.stats.routed, 1000);
  assert.equal(plan.stats.strategy, "hierarchical");
  assert.ok(plan.stats.zones >= 1);
  assert.ok(duration < 3000, `hierarchical route plan took ${Math.round(duration)} ms`);
});
