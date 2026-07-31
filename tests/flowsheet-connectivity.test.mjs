import assert from "node:assert/strict";
import test from "node:test";
import {
  auditFlowsheetConnectivity,
  connectionStateForUnit,
  createBoundaryStream,
  isBoundaryStream,
  retargetStream,
} from "../flowsheet-connectivity.js";

test("boundary streams model standalone equipment inlets and outlets", () => {
  const inlet = createBoundaryStream({
    id: "S-1",
    unitId: "BR-101",
    direction: "inlet",
    composition: "Sterile medium",
  });
  const outlet = createBoundaryStream({
    id: "S-2",
    unitId: "BR-101",
    direction: "outlet",
    composition: "Harvest broth",
  });

  assert.equal(inlet.from, null);
  assert.equal(inlet.to, "BR-101");
  assert.equal(outlet.from, "BR-101");
  assert.equal(outlet.to, null);
  assert.equal(isBoundaryStream(inlet), true);
  assert.equal(connectionStateForUnit([inlet, outlet], "BR-101").complete, true);
});

test("connectivity audit identifies isolated and open equipment ports", () => {
  const units = [{ id: "T-101" }, { id: "BR-101" }, { id: "F-101" }];
  const streams = [
    { id: "S-1", from: "T-101", to: "BR-101" },
    { id: "S-2", from: "BR-101", to: null },
  ];
  const audit = auditFlowsheetConnectivity(units, streams);

  assert.deepEqual(audit.isolated.map((row) => row.unit.id), ["F-101"]);
  assert.deepEqual(audit.missingInlets.map((row) => row.unit.id), ["T-101", "F-101"]);
  assert.deepEqual(audit.complete.map((row) => row.unit.id), ["BR-101"]);
});

test("streams can be retargeted between equipment and plant boundaries", () => {
  const internal = { id: "S-4", from: "T-101", to: "BR-101", composition: "Broth", phase: "Liquid" };
  const output = retargetStream(internal, { from: "BR-101", to: "", composition: "Harvest", phase: "Slurry", kind: "main" });

  assert.equal(output.to, null);
  assert.equal(output.boundary, "outlet");
  assert.equal(output.composition, "Harvest");
  assert.throws(() => retargetStream(internal, { from: "BR-101", to: "BR-101" }), /same equipment/);
});
