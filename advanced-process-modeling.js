const EPSILON = 1e-12;

function clamp(value, low, high) {
  return Math.max(low, Math.min(high, value));
}

function average(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function quantile(values, probability) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = clamp(probability, 0, 1) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

function seededRandom(seed = 1) {
  let value = (Number(seed) || 1) >>> 0;
  return () => {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function correlation(left, right) {
  if (!left.length || left.length !== right.length) return 0;
  const leftMean = average(left);
  const rightMean = average(right);
  let numerator = 0;
  let leftVariance = 0;
  let rightVariance = 0;
  left.forEach((value, index) => {
    const leftDelta = value - leftMean;
    const rightDelta = right[index] - rightMean;
    numerator += leftDelta * rightDelta;
    leftVariance += leftDelta ** 2;
    rightVariance += rightDelta ** 2;
  });
  return numerator / Math.max(EPSILON, Math.sqrt(leftVariance * rightVariance));
}

export function analyzeModelStructure({ variables = [], equations = [], domains = [], events = [] } = {}) {
  const unknownVariables = variables.filter((item) => !item.known);
  const activeEquations = equations.filter((item) => item.active !== false);
  const dynamicStates = unknownVariables.filter((item) => item.role === "state");
  const missingInitialConditions = dynamicStates.filter((item) => !item.initialized);
  const derivativeConstraints = activeEquations.filter((item) => item.derivativeConstraint).length;
  const degreesOfFreedom = unknownVariables.length - activeEquations.length;
  const diagnostics = [];

  if (degreesOfFreedom > 0) diagnostics.push({ severity: "error", code: "UNDER_SPECIFIED", message: `${degreesOfFreedom} independent specification(s) are missing.` });
  if (degreesOfFreedom < 0) diagnostics.push({ severity: "error", code: "OVER_SPECIFIED", message: `${Math.abs(degreesOfFreedom)} equation(s) over-specify the model.` });
  if (missingInitialConditions.length) diagnostics.push({ severity: "error", code: "INITIAL_CONDITIONS", message: `${missingInitialConditions.length} dynamic state(s) have no initial value.` });
  if (derivativeConstraints > 0) diagnostics.push({ severity: "warning", code: "DAE_INDEX", message: "Derivative constraints require index reduction or a compatible DAE solver." });
  if (domains.some((item) => Number(item.nodes || 0) < 3)) diagnostics.push({ severity: "warning", code: "DOMAIN_GRID", message: "At least one distributed domain has fewer than three nodes." });
  if (events.some((item) => !item.condition)) diagnostics.push({ severity: "warning", code: "EVENT_CONDITION", message: "At least one state transition has no explicit trigger." });
  if (!diagnostics.length) diagnostics.push({ severity: "ok", code: "WELL_POSED", message: "Equation count, initial conditions, domains, and event triggers are structurally consistent." });

  return {
    status: diagnostics.some((item) => item.severity === "error") ? "blocked" : diagnostics.some((item) => item.severity === "warning") ? "review" : "ready",
    degreesOfFreedom,
    unknownVariables: unknownVariables.length,
    activeEquations: activeEquations.length,
    dynamicStates: dynamicStates.length,
    missingInitialConditions: missingInitialConditions.map((item) => item.name),
    distributedDomains: domains.length,
    stateTransitions: events.length,
    diagnostics,
  };
}

function conditionMatches(condition, context) {
  if (!condition) return false;
  if (typeof condition === "function") return Boolean(condition(context));
  const left = Number(context[condition.key] ?? 0);
  const right = Number(condition.value ?? 0);
  if (condition.operator === ">") return left > right;
  if (condition.operator === ">=") return left >= right;
  if (condition.operator === "<") return left < right;
  if (condition.operator === "<=") return left <= right;
  if (condition.operator === "!=") return context[condition.key] !== condition.value;
  return context[condition.key] === condition.value;
}

export function executeOperatingProcedure({ tasks = [], context = {}, maxSteps = 500 } = {}) {
  const working = structuredClone(context);
  const saved = new Map();
  const log = [];
  let stopped = false;

  const record = (type, label, detail = "") => {
    log.push({ step: log.length + 1, type, label, detail, context: structuredClone(working) });
    if (log.length > maxSteps) throw new Error(`Operating procedure exceeded ${maxSteps} steps.`);
  };

  const run = (task) => {
    if (!task || stopped) return;
    if (task.type === "sequence" || task.type === "parallel") {
      record(task.type, task.label || task.type, `${task.steps?.length || 0} task(s)`);
      (task.steps || []).forEach(run);
      return;
    }
    if (task.type === "if") {
      const matched = conditionMatches(task.condition, working);
      record("if", task.label || "Conditional branch", matched ? "then" : "else");
      (matched ? task.then : task.else || []).forEach(run);
      return;
    }
    if (task.type === "while") {
      let iterations = 0;
      while (conditionMatches(task.condition, working) && iterations < (task.maxIterations || 25) && !stopped) {
        iterations += 1;
        (task.steps || []).forEach(run);
      }
      record("while", task.label || "Repeated task", `${iterations} iteration(s)`);
      return;
    }
    const key = task.key;
    if (["set", "reset", "switch", "replace", "reinitialize"].includes(task.type)) working[key] = task.value;
    if (task.type === "add") working[key] = Number(working[key] || 0) + Number(task.value || 0);
    if (task.type === "multiply") working[key] = Number(working[key] || 0) * Number(task.value ?? 1);
    if (task.type === "save") saved.set(task.label || "default", structuredClone(working));
    if (task.type === "restore") Object.assign(working, structuredClone(saved.get(task.label || "default") || {}));
    if (task.type === "stop") stopped = true;
    record(task.type, task.label || task.type, key ? `${key} = ${working[key]}` : task.message || "");
  };

  tasks.forEach(run);
  return { context: working, log, stopped, savedStates: [...saved.keys()] };
}

function predictionMetrics(observations, predicted) {
  const observed = observations.map((item) => Number(item.observed));
  const residuals = observed.map((value, index) => value - predicted[index]);
  const observedMean = average(observed);
  const sse = residuals.reduce((sum, value) => sum + value ** 2, 0);
  const total = observed.reduce((sum, value) => sum + (value - observedMean) ** 2, 0);
  return {
    sse,
    rmse: Math.sqrt(sse / Math.max(1, observed.length)),
    mae: average(residuals.map(Math.abs)),
    r2: 1 - sse / Math.max(EPSILON, total),
    residuals,
  };
}

export function estimateParameters({ observations = [], simulate, parameters = {}, bounds = {}, iterations = 80 } = {}) {
  if (!observations.length || typeof simulate !== "function") throw new Error("Parameter estimation requires observations and a simulation function.");
  const keys = Object.keys(parameters);
  const current = { ...parameters };
  const steps = Object.fromEntries(keys.map((key) => {
    const [low, high] = bounds[key] || [Number(current[key]) * 0.5, Number(current[key]) * 1.5 || 1];
    return [key, Math.max(EPSILON, Math.abs(high - low) * 0.2)];
  }));
  const evaluate = (candidate) => {
    const predicted = observations.map((observation, index) => Number(simulate(candidate, observation, index)));
    return { predicted, ...predictionMetrics(observations, predicted) };
  };
  let best = evaluate(current);
  const trace = [{ iteration: 0, objective: best.sse, ...current }];

  for (let iteration = 1; iteration <= iterations; iteration += 1) {
    let improved = false;
    for (const key of keys) {
      const [low, high] = bounds[key] || [-Infinity, Infinity];
      for (const direction of [-1, 1]) {
        const candidate = { ...current, [key]: clamp(Number(current[key]) + direction * steps[key], low, high) };
        const result = evaluate(candidate);
        if (result.sse + EPSILON < best.sse) {
          Object.assign(current, candidate);
          best = result;
          improved = true;
        }
      }
    }
    if (!improved) keys.forEach((key) => { steps[key] *= 0.55; });
    trace.push({ iteration, objective: best.sse, ...current });
    if (Math.max(...Object.values(steps)) < 1e-7) break;
  }

  const intervals = Object.fromEntries(keys.map((key) => {
    const delta = Math.max(steps[key] * 4, Math.abs(Number(current[key])) * 0.02, 1e-6);
    const [low, high] = bounds[key] || [-Infinity, Infinity];
    return [key, { low: clamp(Number(current[key]) - 1.96 * delta, low, high), high: clamp(Number(current[key]) + 1.96 * delta, low, high), method: "local profile approximation" }];
  }));

  return {
    parameters: current,
    intervals,
    predicted: observations.map((item, index) => ({ ...item, predicted: best.predicted[index], residual: best.residuals[index] })),
    rmse: best.rmse,
    mae: best.mae,
    r2: best.r2,
    iterations: trace.length - 1,
    trace,
  };
}

export function optimizeDesign({ variables = [], evaluate, iterations = 100, constraintPenalty = 1e6 } = {}) {
  if (!variables.length || typeof evaluate !== "function") throw new Error("Optimization requires decision variables and an evaluator.");
  const current = Object.fromEntries(variables.map((item) => [item.key, Number(item.initial)]));
  const steps = Object.fromEntries(variables.map((item) => [item.key, Math.max(EPSILON, (item.high - item.low) * 0.2)]));
  const score = (candidate) => {
    const result = evaluate(candidate) || {};
    const constraints = result.constraints || [];
    const violation = constraints.reduce((sum, item) => sum + Math.max(0, Number(item.violation || 0)) ** 2, 0);
    return { ...result, objective: Number(result.objective || 0), violation, penalized: Number(result.objective || 0) + violation * constraintPenalty };
  };
  let best = score(current);
  const trace = [{ iteration: 0, ...current, objective: best.objective, violation: best.violation }];

  for (let iteration = 1; iteration <= iterations; iteration += 1) {
    let improved = false;
    for (const variable of variables) {
      for (const direction of [-1, 1]) {
        const candidate = { ...current, [variable.key]: clamp(current[variable.key] + direction * steps[variable.key], variable.low, variable.high) };
        const result = score(candidate);
        if (result.penalized + EPSILON < best.penalized) {
          Object.assign(current, candidate);
          best = result;
          improved = true;
        }
      }
    }
    if (!improved) variables.forEach((item) => { steps[item.key] *= 0.55; });
    trace.push({ iteration, ...current, objective: best.objective, violation: best.violation });
    if (Math.max(...Object.values(steps)) < 1e-6) break;
  }

  return { variables: current, objective: best.objective, feasible: best.violation <= 1e-8, violation: best.violation, outputs: best.outputs || {}, constraints: best.constraints || [], trace };
}

function triangular(random, low, mode, high) {
  if (high <= low) return low;
  const probability = (mode - low) / (high - low);
  const value = random();
  return value < probability
    ? low + Math.sqrt(value * (high - low) * (mode - low))
    : high - Math.sqrt((1 - value) * (high - low) * (high - mode));
}

export function monteCarloAnalysis({ samples = 250, seed = 19, parameters = [], evaluate } = {}) {
  if (!parameters.length || typeof evaluate !== "function") throw new Error("Monte Carlo analysis requires parameter ranges and an evaluator.");
  const random = seededRandom(seed);
  const rows = Array.from({ length: Math.max(10, samples) }, (_, index) => {
    const inputs = Object.fromEntries(parameters.map((item) => [item.key, triangular(random, item.low, item.mode ?? item.base, item.high)]));
    return { sample: index + 1, ...inputs, ...evaluate(inputs) };
  });
  const inputKeys = parameters.map((item) => item.key);
  const outputKeys = Object.keys(rows[0]).filter((key) => key !== "sample" && !inputKeys.includes(key) && Number.isFinite(Number(rows[0][key])));
  const summary = Object.fromEntries(outputKeys.map((key) => {
    const values = rows.map((row) => Number(row[key]));
    return [key, { mean: average(values), p05: quantile(values, 0.05), p50: quantile(values, 0.5), p95: quantile(values, 0.95), minimum: Math.min(...values), maximum: Math.max(...values) }];
  }));
  const sensitivity = outputKeys.flatMap((output) => inputKeys.map((input) => ({ input, output, correlation: correlation(rows.map((row) => Number(row[input])), rows.map((row) => Number(row[output]))) }))).sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
  return { seed, samples: rows.length, rows, summary, sensitivity };
}

function solveLinearSystem(matrix, vector) {
  const size = vector.length;
  const augmented = matrix.map((row, index) => [...row, vector[index]]);
  for (let column = 0; column < size; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < size; row += 1) if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) pivot = row;
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
    const divisor = Math.abs(augmented[column][column]) < EPSILON ? EPSILON : augmented[column][column];
    for (let index = column; index <= size; index += 1) augmented[column][index] /= divisor;
    for (let row = 0; row < size; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      for (let index = column; index <= size; index += 1) augmented[row][index] -= factor * augmented[column][index];
    }
  }
  return augmented.map((row) => row[size]);
}

export function fitSurrogate({ rows = [], features = [], target, ridge = 1e-8 } = {}) {
  if (!rows.length || !features.length || !target) throw new Error("Surrogate fitting requires rows, features, and a target.");
  const design = rows.map((row) => [1, ...features.map((key) => Number(row[key] || 0))]);
  const response = rows.map((row) => Number(row[target] || 0));
  const width = features.length + 1;
  const normal = Array.from({ length: width }, (_, left) => Array.from({ length: width }, (_, right) => design.reduce((sum, row) => sum + row[left] * row[right], 0) + (left === right ? ridge : 0)));
  const rhs = Array.from({ length: width }, (_, column) => design.reduce((sum, row, index) => sum + row[column] * response[index], 0));
  const coefficients = solveLinearSystem(normal, rhs);
  const predict = (row) => coefficients[0] + features.reduce((sum, key, index) => sum + coefficients[index + 1] * Number(row[key] || 0), 0);
  const predicted = rows.map(predict);
  const metrics = predictionMetrics(rows.map((row) => ({ observed: row[target] })), predicted);
  return { features, target, intercept: coefficients[0], coefficients: Object.fromEntries(features.map((key, index) => [key, coefficients[index + 1]])), rmse: metrics.rmse, r2: metrics.r2, predict };
}

export function runScalarStateEstimator({ observations = [], initialState = 0, initialVariance = 1, processVariance = 0.01, measurementVariance = 0.1, transition = (state, input) => state + Number(input || 0), measurement = (state) => state } = {}) {
  let estimate = Number(initialState);
  let variance = Number(initialVariance);
  return observations.map((item, index) => {
    const predicted = Number(transition(estimate, item.input, item, index));
    const predictedVariance = variance + processVariance;
    const predictedMeasurement = Number(measurement(predicted, item, index));
    const gain = predictedVariance / Math.max(EPSILON, predictedVariance + measurementVariance);
    const residual = Number(item.measurement) - predictedMeasurement;
    estimate = predicted + gain * residual;
    variance = (1 - gain) * predictedVariance;
    return { ...item, index, predicted, estimate, residual, gain, variance };
  });
}

export function analyzeDesignSpace({ factors = [], evaluate } = {}) {
  if (!factors.length || typeof evaluate !== "function") throw new Error("Design-space analysis requires factors and an evaluator.");
  const rows = [];
  const visit = (index, current) => {
    if (index >= factors.length) {
      const result = evaluate(current) || {};
      rows.push({ ...current, ...result, feasible: (result.constraints || []).every((item) => Number(item.violation || 0) <= 0) });
      return;
    }
    const factor = factors[index];
    const levels = factor.levels || [factor.low, (factor.low + factor.high) / 2, factor.high];
    levels.forEach((value) => visit(index + 1, { ...current, [factor.key]: value }));
  };
  visit(0, {});
  const feasibleRows = rows.filter((row) => row.feasible);
  return { rows, feasibleRows, feasibleFraction: feasibleRows.length / Math.max(1, rows.length), best: [...feasibleRows].sort((a, b) => Number(a.objective || 0) - Number(b.objective || 0))[0] || null };
}

export function buildDistributedDomain({ name = "axial domain", length = 1, nodes = 21, method = "finite volume", inlet = "Dirichlet", outlet = "zero-gradient" } = {}) {
  const count = Math.max(3, Math.round(nodes));
  const spacing = Number(length) / (count - 1);
  return {
    name,
    length: Number(length),
    nodes: count,
    spacing,
    method,
    boundaries: { inlet, outlet },
    grid: Array.from({ length: count }, (_, index) => ({ index, position: index * spacing, boundary: index === 0 ? "inlet" : index === count - 1 ? "outlet" : "interior" })),
  };
}
