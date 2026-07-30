const DEFAULT_GRID = 16;
const DEFAULT_CLEARANCE = 8;

class MinHeap {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
    let index = this.items.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.items[parent].priority <= item.priority) break;
      this.items[index] = this.items[parent];
      index = parent;
    }
    this.items[index] = item;
  }

  pop() {
    if (!this.items.length) return null;
    const root = this.items[0];
    const tail = this.items.pop();
    if (!this.items.length) return root;
    let index = 0;
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      if (left >= this.items.length) break;
      const child = right < this.items.length && this.items[right].priority < this.items[left].priority
        ? right
        : left;
      if (this.items[child].priority >= tail.priority) break;
      this.items[index] = this.items[child];
      index = child;
    }
    this.items[index] = tail;
    return root;
  }

  get size() {
    return this.items.length;
  }
}

function pointKey(point) {
  return `${point.x},${point.y}`;
}

function edgeKey(a, b) {
  return a.x < b.x || (a.x === b.x && a.y <= b.y)
    ? `${pointKey(a)}|${pointKey(b)}`
    : `${pointKey(b)}|${pointKey(a)}`;
}

function orientation(a, b) {
  return a.y === b.y ? "h" : "v";
}

function stateKey(point, direction) {
  return `${point.x},${point.y},${direction}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function snap(value, grid) {
  return Math.round(value / grid) * grid;
}

function compactOrthogonalPoints(points) {
  const deduped = points.filter((point, index) => {
    const previous = points[index - 1];
    return !previous || point.x !== previous.x || point.y !== previous.y;
  });
  const orthogonal = [];
  deduped.forEach((point) => {
    const previous = orthogonal[orthogonal.length - 1];
    if (previous && previous.x !== point.x && previous.y !== point.y) {
      orthogonal.push({ x: point.x, y: previous.y });
    }
    orthogonal.push(point);
  });
  return orthogonal.filter((point, index, list) => {
    if (!index || index === list.length - 1) return true;
    const previous = list[index - 1];
    const next = list[index + 1];
    return !((previous.x === point.x && point.x === next.x) || (previous.y === point.y && point.y === next.y));
  });
}

function routeSegments(points) {
  return points.slice(1).map((to, index) => ({ from: points[index], to }));
}

function segmentsCross(left, right) {
  const leftOrientation = orientation(left.from, left.to);
  const rightOrientation = orientation(right.from, right.to);
  if (leftOrientation === rightOrientation) return false;
  const horizontal = leftOrientation === "h" ? left : right;
  const vertical = leftOrientation === "v" ? left : right;
  return between(vertical.from.x, horizontal.from.x, horizontal.to.x, true)
    && between(horizontal.from.y, vertical.from.y, vertical.to.y, true);
}

function between(value, a, b, strict = false) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return strict ? value > min && value < max : value >= min && value <= max;
}

function segmentCells(segment, bucketSize = 256) {
  const minX = Math.floor(Math.min(segment.from.x, segment.to.x) / bucketSize);
  const maxX = Math.floor(Math.max(segment.from.x, segment.to.x) / bucketSize);
  const minY = Math.floor(Math.min(segment.from.y, segment.to.y) / bucketSize);
  const maxY = Math.floor(Math.max(segment.from.y, segment.to.y) / bucketSize);
  const cells = [];
  for (let x = minX; x <= maxX; x += 1) {
    for (let y = minY; y <= maxY; y += 1) cells.push(`${x},${y}`);
  }
  return cells;
}

class SegmentSpatialIndex {
  constructor(bucketSize = 256) {
    this.bucketSize = bucketSize;
    this.horizontal = new Map();
    this.vertical = new Map();
    this.nextId = 1;
  }

  insert(segment, meta = {}) {
    const item = { ...segment, ...meta, spatialId: this.nextId++ };
    const index = orientation(segment.from, segment.to) === "h" ? this.horizontal : this.vertical;
    segmentCells(segment, this.bucketSize).forEach((cell) => {
      const entries = index.get(cell) || [];
      entries.push(item);
      index.set(cell, entries);
    });
  }

  crossingSegments(segment) {
    const opposite = orientation(segment.from, segment.to) === "h" ? this.vertical : this.horizontal;
    const seen = new Set();
    const crossings = [];
    segmentCells(segment, this.bucketSize).forEach((cell) => {
      (opposite.get(cell) || []).forEach((candidate) => {
        if (seen.has(candidate.spatialId)) return;
        seen.add(candidate.spatialId);
        if (segmentsCross(segment, candidate)) crossings.push(candidate);
      });
    });
    return crossings;
  }
}

export function routeCrossingPairs(routes) {
  const index = new SegmentSpatialIndex();
  const pairCounts = new Map();
  Object.entries(routes).forEach(([routeId, points]) => {
    routeSegments(points).forEach((segment, segmentIndex) => {
      index.crossingSegments(segment).forEach((candidate) => {
        if (candidate.routeId === routeId) return;
        const ids = [routeId, candidate.routeId].sort();
        const key = `${ids[0]}\u0000${ids[1]}`;
        pairCounts.set(key, (pairCounts.get(key) || 0) + 1);
      });
      index.insert(segment, { routeId, segmentIndex });
    });
  });
  return [...pairCounts.entries()]
    .map(([key, count]) => {
      const [left, right] = key.split("\u0000");
      return { left, right, count };
    })
    .sort((left, right) => left.left.localeCompare(right.left) || left.right.localeCompare(right.right));
}

export function countRouteCrossings(routes) {
  return routeCrossingPairs(routes).reduce((total, pair) => total + pair.count, 0);
}

function buildBlockedCells(units, grid, clearance, bounds) {
  const blocked = new Set();
  units.forEach((unit) => {
    const left = Math.ceil((unit.x - clearance) / grid) * grid;
    const right = Math.floor((unit.x + unit.width + clearance) / grid) * grid;
    const top = Math.ceil((unit.y - clearance) / grid) * grid;
    const bottom = Math.floor((unit.y + unit.height + clearance) / grid) * grid;
    for (let x = left; x <= right; x += grid) {
      for (let y = top; y <= bottom; y += grid) {
        if (x >= bounds.minX && x <= bounds.maxX && y >= bounds.minY && y <= bounds.maxY) {
          blocked.add(pointKey({ x, y }));
        }
      }
    }
  });
  return blocked;
}

function nearbyObstaclePenalty(point, blocked, grid) {
  let neighbours = 0;
  [
    [grid, 0],
    [-grid, 0],
    [0, grid],
    [0, -grid],
  ].forEach(([dx, dy]) => {
    if (blocked.has(pointKey({ x: point.x + dx, y: point.y + dy }))) neighbours += 1;
  });
  return neighbours * 0.12;
}

function reconstructPath(cameFrom, finalKey, stateByKey) {
  const points = [];
  let cursor = finalKey;
  while (cursor) {
    points.push(stateByKey.get(cursor).point);
    cursor = cameFrom.get(cursor);
  }
  return points.reverse();
}

function findGridPath({
  start,
  goal,
  kind,
  blocked,
  bounds,
  grid,
  edgeUsage,
  nodeUsage,
  reservedSegmentIndex,
  maxIterations,
}) {
  const queue = new MinHeap();
  const startState = stateKey(start, "n");
  const gScore = new Map([[startState, 0]]);
  const cameFrom = new Map();
  const stateByKey = new Map([[startState, { point: start, direction: "n" }]]);
  queue.push({ key: startState, priority: Math.abs(goal.x - start.x) + Math.abs(goal.y - start.y) });
  let iterations = 0;

  while (queue.size && iterations < maxIterations) {
    iterations += 1;
    const currentQueueItem = queue.pop();
    const current = stateByKey.get(currentQueueItem.key);
    const currentScore = gScore.get(currentQueueItem.key);
    if (current.point.x === goal.x && current.point.y === goal.y) {
      return reconstructPath(cameFrom, currentQueueItem.key, stateByKey);
    }

    const neighbours = [
      { x: current.point.x + grid, y: current.point.y, direction: "h" },
      { x: current.point.x - grid, y: current.point.y, direction: "h" },
      { x: current.point.x, y: current.point.y + grid, direction: "v" },
      { x: current.point.x, y: current.point.y - grid, direction: "v" },
    ];

    neighbours.forEach((next) => {
      if (next.x < bounds.minX || next.x > bounds.maxX || next.y < bounds.minY || next.y > bounds.maxY) return;
      if (blocked.has(pointKey(next)) && (next.x !== goal.x || next.y !== goal.y)) return;

      const usedEdge = edgeUsage.get(edgeKey(current.point, next));
      const usedNode = nodeUsage.get(pointKey(next));
      const crossing = usedNode && usedNode.orientations.has(next.direction === "h" ? "v" : "h");
      const exactCrossings = reservedSegmentIndex.crossingSegments({
        from: current.point,
        to: next,
      }).length;
      const sameCorridor = usedEdge?.kinds.has(kind);
      const foreignCorridor = usedEdge && !sameCorridor;
      let moveCost = 1;
      if (current.direction !== "n" && current.direction !== next.direction) moveCost += 0.55;
      if (crossing) moveCost += 140;
      if (exactCrossings) moveCost += exactCrossings * 140;
      if (sameCorridor) moveCost += 0.35 + usedEdge.count * 0.08;
      if (foreignCorridor) moveCost += 9 + usedEdge.count;
      if (usedNode?.orientations.has(next.direction)) moveCost += 0.18;
      moveCost += nearbyObstaclePenalty(next, blocked, grid);

      const nextKey = stateKey(next, next.direction);
      const tentative = currentScore + moveCost;
      if (tentative >= (gScore.get(nextKey) ?? Number.POSITIVE_INFINITY)) return;
      cameFrom.set(nextKey, currentQueueItem.key);
      gScore.set(nextKey, tentative);
      stateByKey.set(nextKey, { point: { x: next.x, y: next.y }, direction: next.direction });
      const heuristic = (Math.abs(goal.x - next.x) + Math.abs(goal.y - next.y)) / grid;
      queue.push({ key: nextKey, priority: tentative + heuristic });
    });
  }

  return null;
}

function reserveRoute(points, kind, edgeUsage, nodeUsage, grid) {
  routeSegments(points).forEach((segment) => {
    const segmentOrientation = orientation(segment.from, segment.to);
    const distance = Math.abs(segment.to.x - segment.from.x) + Math.abs(segment.to.y - segment.from.y);
    const steps = Math.max(1, Math.round(distance / grid));
    let previous = segment.from;
    for (let index = 1; index <= steps; index += 1) {
      const ratio = index / steps;
      const next = {
        x: Math.round(segment.from.x + (segment.to.x - segment.from.x) * ratio),
        y: Math.round(segment.from.y + (segment.to.y - segment.from.y) * ratio),
      };
      const key = edgeKey(previous, next);
      const edge = edgeUsage.get(key) || { count: 0, kinds: new Set() };
      edge.count += 1;
      edge.kinds.add(kind);
      edgeUsage.set(key, edge);
      const nodeKey = pointKey(next);
      const node = nodeUsage.get(nodeKey) || { orientations: new Set() };
      node.orientations.add(segmentOrientation);
      nodeUsage.set(nodeKey, node);
      previous = next;
    }
  });
}

function fallbackRoute(from, to, streamIndex) {
  const start = { x: from.x + from.width, y: from.y + from.height / 2 };
  const end = { x: to.x, y: to.y + to.height / 2 };
  const stub = 24;
  if (end.x > start.x + stub * 2) {
    const elbowX = Math.round((start.x + end.x) / 2) + (streamIndex % 5) * 12;
    return compactOrthogonalPoints([
      start,
      { x: start.x + stub, y: start.y },
      { x: elbowX, y: start.y },
      { x: elbowX, y: end.y },
      { x: end.x - stub, y: end.y },
      end,
    ]);
  }
  const corridorY = Math.max(start.y, end.y) + 72 + (streamIndex % 5) * 16;
  const bypassX = Math.max(start.x, end.x) + 96 + (streamIndex % 4) * 16;
  return compactOrthogonalPoints([
    start,
    { x: bypassX, y: start.y },
    { x: bypassX, y: corridorY },
    { x: end.x - stub, y: corridorY },
    { x: end.x - stub, y: end.y },
    end,
  ]);
}

function routePriority(stream) {
  return {
    main: 0,
    utility: 1,
    waste: 2,
    qc: 3,
  }[stream.kind] ?? 4;
}

function unitZone(unit, zoneSize) {
  return `${Math.floor((unit.x + unit.width / 2) / zoneSize)},${Math.floor((unit.y + unit.height / 2) / zoneSize)}`;
}

function streamHierarchy(stream, unitMap, zoneSize) {
  const from = unitMap.get(stream.from);
  const to = unitMap.get(stream.to);
  if (!from || !to) return { local: true, key: "missing" };
  const fromZone = unitZone(from, zoneSize);
  const toZone = unitZone(to, zoneSize);
  return {
    local: fromZone === toZone,
    key: [fromZone, toZone].sort().join(">"),
  };
}

function lockedRoutePoints(points, from, to) {
  if (!Array.isArray(points) || points.length < 2) return null;
  const numeric = points
    .map((point) => ({ x: Number(point?.x), y: Number(point?.y) }))
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
  if (numeric.length < 2) return null;
  const route = compactOrthogonalPoints(numeric);
  const startPort = { x: from.x + from.width, y: from.y + from.height / 2 };
  const endPort = { x: to.x, y: to.y + to.height / 2 };
  const originalStart = route[0];
  const originalEnd = route[route.length - 1];
  route[0] = startPort;
  route[route.length - 1] = endPort;
  if (route[1]) {
    if (originalStart.y === route[1].y) route[1].y = startPort.y;
    else route[1].x = startPort.x;
  }
  if (route.length > 2) {
    const beforeEnd = route[route.length - 2];
    if (originalEnd.y === beforeEnd.y) beforeEnd.y = endPort.y;
    else beforeEnd.x = endPort.x;
  }
  return compactOrthogonalPoints(route);
}

function buildRoutePass({
  units,
  streams,
  width,
  height,
  grid = DEFAULT_GRID,
  clearance = DEFAULT_CLEARANCE,
  maxIterations = 90000,
  priorityIds = [],
  orderVariant = "distance",
  lockedRoutes = {},
  hierarchical = false,
  zoneSize = 512,
}) {
  const unitMap = new Map(units.map((unit) => [unit.id, unit]));
  const priorityRank = new Map(priorityIds.map((id, index) => [id, index]));
  const bounds = {
    minX: 0,
    minY: 0,
    maxX: Math.max(grid, Math.floor(width / grid) * grid),
    maxY: Math.max(grid, Math.floor(height / grid) * grid),
  };
  const blocked = buildBlockedCells(units, grid, clearance, bounds);
  const edgeUsage = new Map();
  const nodeUsage = new Map();
  const reservedSegmentIndex = new SegmentSpatialIndex(Math.max(128, zoneSize / 2));
  const routes = {};
  const lockedIds = [];
  let fallback = 0;
  const fallbackIds = [];

  streams.forEach((stream) => {
    const from = unitMap.get(stream.from);
    const to = unitMap.get(stream.to);
    const points = from && to ? lockedRoutePoints(lockedRoutes[stream.id], from, to) : null;
    if (!points) return;
    routes[stream.id] = points;
    lockedIds.push(stream.id);
    reserveRoute(points, stream.kind, edgeUsage, nodeUsage, grid);
    routeSegments(points).forEach((segment) => reservedSegmentIndex.insert(segment, { routeId: stream.id }));
  });

  const orderedStreams = streams
    .filter((stream) => !routes[stream.id])
    .map((stream, index) => ({ ...stream, sourceIndex: stream.index ?? index }))
    .sort((left, right) => {
      const priorityDifference = routePriority(left) - routePriority(right);
      if (priorityDifference) return priorityDifference;
      if (hierarchical) {
        const leftHierarchy = streamHierarchy(left, unitMap, zoneSize);
        const rightHierarchy = streamHierarchy(right, unitMap, zoneSize);
        if (leftHierarchy.local !== rightHierarchy.local) return leftHierarchy.local ? 1 : -1;
        const hierarchyDifference = leftHierarchy.key.localeCompare(rightHierarchy.key);
        if (hierarchyDifference) return hierarchyDifference;
      }
      const leftRank = priorityRank.get(left.id) ?? Number.POSITIVE_INFINITY;
      const rightRank = priorityRank.get(right.id) ?? Number.POSITIVE_INFINITY;
      if (leftRank !== rightRank) return leftRank - rightRank;
      const leftFrom = unitMap.get(left.from);
      const leftTo = unitMap.get(left.to);
      const rightFrom = unitMap.get(right.from);
      const rightTo = unitMap.get(right.to);
      const leftDistance = leftFrom && leftTo ? Math.abs(leftTo.x - leftFrom.x) + Math.abs(leftTo.y - leftFrom.y) : 0;
      const rightDistance = rightFrom && rightTo ? Math.abs(rightTo.x - rightFrom.x) + Math.abs(rightTo.y - rightFrom.y) : 0;
      if (orderVariant === "stable") return left.sourceIndex - right.sourceIndex;
      if (orderVariant === "reverse") return right.sourceIndex - left.sourceIndex;
      return rightDistance - leftDistance || left.sourceIndex - right.sourceIndex;
    });

  orderedStreams.forEach((stream) => {
    const from = unitMap.get(stream.from);
    const to = unitMap.get(stream.to);
    if (!from || !to) return;
    const startPort = { x: from.x + from.width, y: from.y + from.height / 2 };
    const endPort = { x: to.x, y: to.y + to.height / 2 };
    const startStub = {
      x: clamp(startPort.x + 30, bounds.minX, bounds.maxX),
      y: clamp(startPort.y, bounds.minY, bounds.maxY),
    };
    const endStub = {
      x: clamp(endPort.x - 30, bounds.minX, bounds.maxX),
      y: clamp(endPort.y, bounds.minY, bounds.maxY),
    };
    const start = {
      x: clamp(snap(startStub.x, grid), bounds.minX, bounds.maxX),
      y: clamp(snap(startStub.y, grid), bounds.minY, bounds.maxY),
    };
    const goal = {
      x: clamp(snap(endStub.x, grid), bounds.minX, bounds.maxX),
      y: clamp(snap(endStub.y, grid), bounds.minY, bounds.maxY),
    };
    const routeBlocked = new Set(blocked);
    routeBlocked.delete(pointKey(start));
    routeBlocked.delete(pointKey(goal));
    const gridPath = findGridPath({
      start,
      goal,
      kind: stream.kind,
      blocked: routeBlocked,
      bounds,
      grid,
      edgeUsage,
      nodeUsage,
      reservedSegmentIndex,
      maxIterations,
    });

    if (!gridPath) {
      const points = fallbackRoute(from, to, stream.sourceIndex);
      routes[stream.id] = points;
      fallback += 1;
      fallbackIds.push(stream.id);
      reserveRoute(points, stream.kind, edgeUsage, nodeUsage, grid);
      routeSegments(points).forEach((segment) => reservedSegmentIndex.insert(segment, { routeId: stream.id }));
      return;
    }

    const points = compactOrthogonalPoints([
      startPort,
      startStub,
      { x: start.x, y: startStub.y },
      ...gridPath,
      { x: goal.x, y: endStub.y },
      endStub,
      endPort,
    ]);
    routes[stream.id] = points;
    reserveRoute(gridPath, stream.kind, edgeUsage, nodeUsage, grid);
    routeSegments(points).forEach((segment) => reservedSegmentIndex.insert(segment, { routeId: stream.id }));
  });

  const sharedEdges = [...edgeUsage.values()].filter((edge) => edge.count > 1).length;
  const crossingPairs = routeCrossingPairs(routes);
  const zones = new Set(units.map((unit) => unitZone(unit, zoneSize)));
  return {
    routes,
    stats: {
      routed: Object.keys(routes).length,
      crossings: crossingPairs.reduce((total, pair) => total + pair.count, 0),
      crossingPairs,
      sharedEdges,
      fallback,
      fallbackIds,
      locked: lockedIds.length,
      lockedIds,
      strategy: hierarchical ? "hierarchical" : "global",
      zones: zones.size,
    },
  };
}

function routePlanScore(plan) {
  const routeValues = Object.values(plan.routes);
  const bends = routeValues.reduce((total, points) => total + Math.max(0, points.length - 2), 0);
  const length = routeValues.reduce((total, points) => total + routeSegments(points).reduce(
    (routeTotal, segment) => routeTotal
      + Math.abs(segment.to.x - segment.from.x)
      + Math.abs(segment.to.y - segment.from.y),
    0,
  ), 0);
  return plan.stats.fallback * 1_000_000_000
    + plan.stats.crossings * 10_000_000
    + bends * 200
    + length
    + plan.stats.sharedEdges * 10;
}

function conflictPriority(plan) {
  const weights = new Map();
  const lockedIds = new Set(plan.stats.lockedIds || []);
  plan.stats.crossingPairs.forEach((pair) => {
    if (!lockedIds.has(pair.left)) weights.set(pair.left, (weights.get(pair.left) || 0) + pair.count);
    if (!lockedIds.has(pair.right)) weights.set(pair.right, (weights.get(pair.right) || 0) + pair.count);
  });
  plan.stats.fallbackIds.forEach((id) => {
    weights.set(id, (weights.get(id) || 0) + 1000);
  });
  return [...weights.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([id]) => id);
}

export function buildCrossingAwareRoutePlan(options) {
  const hierarchical = options.hierarchical ?? options.streams.length >= 400;
  const normalizedOptions = { ...options, hierarchical };
  const maxPasses = Math.max(1, Math.min(hierarchical ? 3 : 5, options.maxPasses ?? (hierarchical ? 2 : 3)));
  let bestPlan = buildRoutePass(normalizedOptions);
  let bestScore = routePlanScore(bestPlan);
  let passes = 1;

  while (passes < maxPasses && (bestPlan.stats.crossings > 0 || bestPlan.stats.fallback > 0)) {
    const priorityIds = conflictPriority(bestPlan);
    const candidate = buildRoutePass({
      ...normalizedOptions,
      priorityIds: passes % 2 ? priorityIds : [...priorityIds].reverse(),
      orderVariant: passes % 2 ? "stable" : "reverse",
    });
    const candidateScore = routePlanScore(candidate);
    passes += 1;
    if (candidateScore < bestScore) {
      bestPlan = candidate;
      bestScore = candidateScore;
    }
  }

  return {
    ...bestPlan,
    stats: {
      ...bestPlan.stats,
      passes,
      optimized: passes > 1,
      score: bestScore,
      strategy: hierarchical ? "hierarchical" : "global",
    },
  };
}
