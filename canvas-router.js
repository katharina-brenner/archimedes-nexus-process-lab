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

export function routeCrossingPairs(routes) {
  const entries = Object.entries(routes);
  const pairs = [];
  for (let leftIndex = 0; leftIndex < entries.length; leftIndex += 1) {
    const leftSegments = routeSegments(entries[leftIndex][1]);
    for (let rightIndex = leftIndex + 1; rightIndex < entries.length; rightIndex += 1) {
      const rightSegments = routeSegments(entries[rightIndex][1]);
      let pairCrossings = 0;
      leftSegments.forEach((left) => {
        rightSegments.forEach((right) => {
          const leftOrientation = orientation(left.from, left.to);
          const rightOrientation = orientation(right.from, right.to);
          if (leftOrientation === rightOrientation) return;
          const horizontal = leftOrientation === "h" ? left : right;
          const vertical = leftOrientation === "v" ? left : right;
          const x = vertical.from.x;
          const y = horizontal.from.y;
          if (
            between(x, horizontal.from.x, horizontal.to.x, true)
            && between(y, vertical.from.y, vertical.to.y, true)
          ) pairCrossings += 1;
        });
      });
      if (pairCrossings) {
        pairs.push({
          left: entries[leftIndex][0],
          right: entries[rightIndex][0],
          count: pairCrossings,
        });
      }
    }
  }
  return pairs;
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
  reservedSegments,
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
      const exactCrossings = reservedSegments.filter((segment) => segmentsCross({
        from: current.point,
        to: next,
      }, segment)).length;
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

export function buildCrossingAwareRoutePlan({
  units,
  streams,
  width,
  height,
  grid = DEFAULT_GRID,
  clearance = DEFAULT_CLEARANCE,
  maxIterations = 90000,
}) {
  const unitMap = new Map(units.map((unit) => [unit.id, unit]));
  const bounds = {
    minX: 0,
    minY: 0,
    maxX: Math.max(grid, Math.floor(width / grid) * grid),
    maxY: Math.max(grid, Math.floor(height / grid) * grid),
  };
  const blocked = buildBlockedCells(units, grid, clearance, bounds);
  const edgeUsage = new Map();
  const nodeUsage = new Map();
  const reservedSegments = [];
  const routes = {};
  let fallback = 0;
  const fallbackIds = [];

  const orderedStreams = streams
    .map((stream, index) => ({ ...stream, sourceIndex: stream.index ?? index }))
    .sort((left, right) => {
      const priorityDifference = routePriority(left) - routePriority(right);
      if (priorityDifference) return priorityDifference;
      const leftFrom = unitMap.get(left.from);
      const leftTo = unitMap.get(left.to);
      const rightFrom = unitMap.get(right.from);
      const rightTo = unitMap.get(right.to);
      const leftDistance = leftFrom && leftTo ? Math.abs(leftTo.x - leftFrom.x) + Math.abs(leftTo.y - leftFrom.y) : 0;
      const rightDistance = rightFrom && rightTo ? Math.abs(rightTo.x - rightFrom.x) + Math.abs(rightTo.y - rightFrom.y) : 0;
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
      reservedSegments,
      maxIterations,
    });

    if (!gridPath) {
      routes[stream.id] = fallbackRoute(from, to, stream.sourceIndex);
      fallback += 1;
      fallbackIds.push(stream.id);
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
    reservedSegments.push(...routeSegments(points));
  });

  const sharedEdges = [...edgeUsage.values()].filter((edge) => edge.count > 1).length;
  const crossingPairs = routeCrossingPairs(routes);
  return {
    routes,
    stats: {
      routed: Object.keys(routes).length,
      crossings: crossingPairs.reduce((total, pair) => total + pair.count, 0),
      crossingPairs,
      sharedEdges,
      fallback,
      fallbackIds,
    },
  };
}
