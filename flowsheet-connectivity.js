export const STREAM_KINDS = Object.freeze(["main", "utility", "waste", "qc"]);

export function isBoundaryStream(stream) {
  return Boolean(stream) && (!stream.from || !stream.to);
}

export function createBoundaryStream({
  id,
  unitId,
  direction,
  kind = "main",
  composition = "Process material",
  phase = "Liquid",
  boundaryLabel,
}) {
  if (!id || !unitId) throw new Error("Boundary streams require an id and equipment tag.");
  if (!["inlet", "outlet"].includes(direction)) throw new Error("Boundary stream direction must be inlet or outlet.");
  const normalizedKind = STREAM_KINDS.includes(kind) ? kind : "main";
  return {
    id,
    from: direction === "outlet" ? unitId : null,
    to: direction === "inlet" ? unitId : null,
    composition,
    phase,
    kind: normalizedKind,
    boundary: direction,
    boundaryLabel: boundaryLabel || (direction === "inlet" ? "External source" : "External destination"),
  };
}

export function connectionStateForUnit(streams, unitId) {
  const incoming = streams.filter((stream) => stream.to === unitId);
  const outgoing = streams.filter((stream) => stream.from === unitId);
  return {
    incoming,
    outgoing,
    inboundBoundary: incoming.filter((stream) => !stream.from),
    outboundBoundary: outgoing.filter((stream) => !stream.to),
    isolated: incoming.length === 0 && outgoing.length === 0,
    missingInlet: incoming.length === 0,
    missingOutlet: outgoing.length === 0,
    complete: incoming.length > 0 && outgoing.length > 0,
  };
}

export function auditFlowsheetConnectivity(units, streams) {
  const rows = units.map((unit) => ({
    unit,
    ...connectionStateForUnit(streams, unit.id),
  }));
  return {
    rows,
    isolated: rows.filter((row) => row.isolated),
    missingInlets: rows.filter((row) => row.missingInlet),
    missingOutlets: rows.filter((row) => row.missingOutlet),
    complete: rows.filter((row) => row.complete),
    attention: rows.filter((row) => row.missingInlet || row.missingOutlet),
  };
}

export function retargetStream(stream, { from, to, composition, phase, kind }) {
  const normalizedFrom = from || null;
  const normalizedTo = to || null;
  if (!normalizedFrom && !normalizedTo) throw new Error("A stream needs at least one equipment endpoint.");
  if (normalizedFrom && normalizedFrom === normalizedTo) throw new Error("A stream cannot start and end at the same equipment.");
  const next = {
    ...stream,
    from: normalizedFrom,
    to: normalizedTo,
    composition: String(composition || stream.composition || "Process material").trim(),
    phase: phase || stream.phase || "Liquid",
    kind: STREAM_KINDS.includes(kind) ? kind : (stream.kind || "main"),
  };
  if (!next.from) {
    next.boundary = "inlet";
    next.boundaryLabel = next.boundaryLabel || "External source";
  } else if (!next.to) {
    next.boundary = "outlet";
    next.boundaryLabel = next.boundaryLabel || "External destination";
  } else {
    delete next.boundary;
    delete next.boundaryLabel;
  }
  return next;
}
