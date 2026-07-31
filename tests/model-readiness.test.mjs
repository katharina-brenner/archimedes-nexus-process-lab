import assert from "node:assert/strict";
import test from "node:test";

import { assessModelReadiness, readinessRows } from "../model-readiness.js";

function completeSignals() {
  return {
    totalUnits: 12,
    totalStreams: 18,
    openUnits: 0,
    externalInputs: 3,
    externalOutputs: 3,
    closurePct: 100,
    solvedStreams: 18,
    datasets: [
      { kind: "bioreactor", qualityScore: 92, applied: true },
      { kind: "schedule", qualityScore: 90, applied: true },
      { kind: "tea", qualityScore: 91, applied: true },
      { kind: "supplier", qualityScore: 88, applied: true },
      { kind: "lca", qualityScore: 89, applied: true },
      { kind: "qc", qualityScore: 95, applied: true },
    ],
    appliedDatasetCount: 6,
    highQualityDatasetCount: 6,
    validatedPropertyCount: 8,
    dataApplicationCount: 3,
    medianUnitConfidence: 91,
    recipeOverrideCount: 12,
    criticalBoundaries: 0,
    reviewBoundaries: 0,
    scheduleWarnings: 0,
    annualProductKg: 2400,
    customParameterCount: 8,
    cfdStarted: true,
    cfdBackendComplete: true,
    cfdGeometryEvidence: true,
    hasBioreactor: true,
    lcaBoundaryDefined: true,
    projectVersionCount: 4,
    automationConnected: true,
    validatedControlLogic: true,
  };
}

test("an incomplete model exposes blocking work instead of claiming useful output", () => {
  const assessment = assessModelReadiness({
    totalUnits: 4,
    totalStreams: 2,
    openUnits: 3,
    externalInputs: 0,
    externalOutputs: 0,
    hasBioreactor: true,
  });

  assert.equal(assessment.status, "blocked");
  assert.ok(assessment.missing.length > 10);
  assert.equal(assessment.outputs.find((item) => item.id === "balances").status, "blocked");
  assert.match(assessment.missing[0].modelTask, /Connect|Close|reconcile|Add|Open/i);
});

test("complete governed evidence makes every defined output decision-ready", () => {
  const assessment = assessModelReadiness(completeSignals());

  assert.equal(assessment.status, "ready");
  assert.equal(assessment.score, 100);
  assert.equal(assessment.readyOutputs.length, assessment.outputs.length);
  assert.equal(assessment.missing.length, 0);
});

test("schedule data is independently required for a useful capacity result", () => {
  const signals = completeSignals();
  signals.datasets = signals.datasets.filter((dataset) => dataset.kind !== "schedule");
  signals.appliedDatasetCount -= 1;
  signals.highQualityDatasetCount -= 1;
  const assessment = assessModelReadiness(signals);
  const schedule = assessment.outputs.find((item) => item.id === "schedule");

  assert.equal(schedule.status, "screening");
  assert.ok(schedule.missing.some((item) => item.id === "site-calendar"));
  assert.match(schedule.notFor, /production plans|delivery promises/i);
});

test("CFD remains blocked until the user starts a run", () => {
  const signals = completeSignals();
  signals.cfdStarted = false;
  signals.cfdBackendComplete = false;
  const assessment = assessModelReadiness(signals);
  const cfd = assessment.outputs.find((item) => item.id === "cfd");

  assert.equal(cfd.status, "blocked");
  assert.ok(cfd.missing.some((item) => item.id === "cfd-run"));
});

test("readiness export names the gap, modelling task, validity and target workspace", () => {
  const assessment = assessModelReadiness({
    totalUnits: 1,
    totalStreams: 0,
    openUnits: 1,
    hasBioreactor: true,
  });
  const rows = readinessRows(assessment);
  const missing = rows.find((row) => row.complete === "no");

  assert.ok(rows.length >= 20);
  assert.ok(missing.output);
  assert.ok(missing.outputStatus);
  assert.ok(missing.missing);
  assert.ok(missing.modellingTask);
  assert.ok(missing.targetView);
  assert.ok(missing.notFor);
});
