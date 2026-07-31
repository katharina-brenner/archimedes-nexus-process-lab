const STATUS_ORDER = Object.freeze({
  blocked: 0,
  screening: 1,
  ready: 2,
});

function datasetAvailable(datasets, kinds, minimumQuality = 70, requireApplied = false) {
  return datasets.some((dataset) => (
    kinds.includes(dataset.kind)
    && Number(dataset.qualityScore || 0) >= minimumQuality
    && (!requireApplied || dataset.applied)
  ));
}

function requirement(id, label, met, {
  priority = "required",
  evidence,
  missing,
  modelTask,
  view,
  action,
}) {
  return {
    id,
    label,
    met: Boolean(met),
    priority,
    evidence: met ? evidence : "",
    missing: met ? "" : missing,
    modelTask,
    view,
    action,
  };
}

function output(id, title, purpose, requirements, {
  usefulNow,
  notFor,
}) {
  const gates = requirements.filter((item) => item.priority === "gate");
  const required = requirements.filter((item) => item.priority !== "recommended");
  const complete = requirements.filter((item) => item.met).length;
  const score = Math.round(complete / Math.max(1, requirements.length) * 100);
  const status = gates.some((item) => !item.met)
    ? "blocked"
    : required.every((item) => item.met)
      ? "ready"
      : "screening";
  const missing = requirements.filter((item) => !item.met);
  return {
    id,
    title,
    purpose,
    status,
    score,
    requirements,
    missing,
    usefulNow: status === "blocked" ? "No dependable result yet; complete the blocking model inputs first." : usefulNow,
    notFor: status === "ready" ? "" : notFor,
  };
}

export function assessModelReadiness(signals = {}) {
  const datasets = Array.isArray(signals.datasets) ? signals.datasets : [];
  const topologyReady = Number(signals.openUnits || 0) === 0
    && Number(signals.externalInputs || 0) > 0
    && Number(signals.externalOutputs || 0) > 0;
  const balanceReady = Number(signals.closurePct || 0) >= 98
    && Number(signals.solvedStreams || 0) >= Number(signals.totalStreams || 0);
  const bioreactorData = datasetAvailable(datasets, ["bioreactor", "historian", "experimental"], 70, true);
  const scheduleData = datasetAvailable(datasets, ["schedule"], 70, true);
  const teaData = datasetAvailable(datasets, ["tea", "supplier"], 70, true);
  const supplierData = datasetAvailable(datasets, ["supplier"], 70, false);
  const lcaData = datasetAvailable(datasets, ["lca"], 70, true);
  const qcData = datasetAvailable(datasets, ["qc"], 70, true);
  const geometryEvidence = Boolean(signals.cfdGeometryEvidence);

  const outputs = [
    output("balances", "Flowsheet + mass and energy balances", "Close every material and utility path before using downstream calculations.", [
      requirement("connected-topology", "Every equipment item has an inlet and outlet path", topologyReady, {
        priority: "gate",
        evidence: `${signals.totalUnits || 0} units connected to plant or equipment boundaries`,
        missing: `${signals.openUnits || 0} equipment items still have an open or missing port`,
        modelTask: "Connect each open unit to upstream/downstream equipment or add an explicit plant inlet/outlet.",
        view: "flowsheet",
        action: "Repair flowsheet",
      }),
      requirement("balance-closure", "All streams solve with at least 98% mass closure", balanceReady, {
        priority: "gate",
        evidence: `${Number(signals.closurePct || 0).toFixed(2)}% closure`,
        missing: `${Number(signals.closurePct || 0).toFixed(2)}% closure with ${Math.max(0, Number(signals.totalStreams || 0) - Number(signals.solvedStreams || 0))} unsolved streams`,
        modelTask: "Reconcile feed, product, waste, recycle, sampling, and cleaning stream quantities component by component.",
        view: "simulation",
        action: "Review balances",
      }),
      requirement("component-vectors", "Measured component compositions and physical properties", Boolean(signals.appliedDatasetCount) && Number(signals.validatedPropertyCount || 0) > 0, {
        evidence: `${signals.appliedDatasetCount} applied datasets and ${signals.validatedPropertyCount} validated properties`,
        missing: "Water/substrate/product proxy vectors are still standing in for a governed component specification.",
        modelTask: "Upload stream assays or BOMs with component fractions, units, density, heat capacity, viscosity, and source quality.",
        view: "sources",
        action: "Add stream data",
      }),
    ], {
      usefulNow: "Topology review, preliminary stream reconciliation, first-pass heat and utility screening.",
      notFor: "Final equipment sizing, piping design, purchase specifications, or regulated material accounting.",
    }),
    output("dynamic", "Dynamic bioprocess simulation", "Predict biomass, substrate, product, oxygen and metabolite behavior through the production cycle.", [
      requirement("dynamic-topology", "Closed flowsheet and balance basis", topologyReady && balanceReady, {
        priority: "gate",
        evidence: "Flowsheet and balance gates passed",
        missing: "The dynamic model inherits an incomplete process graph or unresolved balance.",
        modelTask: "Close the flowsheet and reconcile all material streams before calibrating kinetics.",
        view: "flowsheet",
        action: "Close process graph",
      }),
      requirement("batch-data", "Applied time-series batch or historian data", bioreactorData, {
        evidence: "Applied bioreactor/historian dataset with quality score >=70%",
        missing: "No applied, quality-checked time series for VCD/biomass, substrate, product, DO, pH, lactate and ammonium.",
        modelTask: "Upload representative batches with timestamps, feed events, state variables, analytical results, units, and batch phase labels.",
        view: "sources",
        action: "Upload batch data",
      }),
      requirement("kinetic-calibration", "Calibrated kinetic and transfer coefficients", Number(signals.dataApplicationCount || 0) > 0 && Number(signals.medianUnitConfidence || 0) >= 80, {
        evidence: `${signals.dataApplicationCount} calibration events; ${signals.medianUnitConfidence}% median model confidence`,
        missing: `Default kinetic/transfer coefficients remain active; median unit-model confidence is ${signals.medianUnitConfidence || 0}%.`,
        modelTask: "Fit growth, death, substrate uptake, product formation, OUR/CER, kLa, inhibition and metabolite rates with uncertainty bounds.",
        view: "simulation",
        action: "Review dynamic model",
      }),
      requirement("recipe-events", "Event-based recipe and operating phases", Number(signals.recipeOverrideCount || 0) > 0, {
        evidence: `${signals.recipeOverrideCount} recipe rows reviewed or overridden`,
        missing: "Charge, feed, harvest, bleed, transfer, hold and cleaning events still use generated default timing.",
        modelTask: "Enter actual phase durations, feed profiles, transitions, controller setpoints, sampling and termination criteria.",
        view: "simulation",
        action: "Edit recipe",
      }),
      requirement("boundary-calibration", "Physical boundary excursions calibrated", Number(signals.criticalBoundaries || 0) === 0 && bioreactorData, {
        evidence: "No critical boundary and measured calibration data present",
        missing: `${signals.criticalBoundaries || 0} critical physical boundaries and ${signals.reviewBoundaries || 0} review items remain.`,
        modelTask: "Calibrate ammonium, lactate, osmolality, DO, heat and shear limits against product- and cell-line-specific evidence.",
        view: "ai",
        action: "Resolve boundaries",
      }),
    ], {
      usefulNow: "Comparing batch, fed-batch and perfusion scenarios; sensitivity screening; planning experiments.",
      notFor: "Predicting plant batches, setting control limits, scale-up release, or claiming validated yield and quality.",
    }),
    output("schedule", "Capacity + finite scheduling", "Test equipment reuse, cleaning, transfers, room load and campaign throughput.", [
      requirement("schedule-topology", "Connected equipment and transfer network", topologyReady, {
        priority: "gate",
        evidence: "All equipment participates in the transfer graph",
        missing: "Open equipment ports make transfer and occupancy logic ambiguous.",
        modelTask: "Connect all process, utility, cleaning, waste and sample paths.",
        view: "flowsheet",
        action: "Repair network",
      }),
      requirement("site-calendar", "Applied site calendar, shifts and resource availability", scheduleData, {
        evidence: "Applied schedule/MES dataset with quality score >=70%",
        missing: "Generated calendars are used for operators, rooms, equipment, QC and cleaning resources.",
        modelTask: "Upload shifts, holidays, maintenance, changeovers, room availability, shared skids, QC capacity and release calendars.",
        view: "sources",
        action: "Add schedule data",
      }),
      requirement("validated-durations", "Validated setup, process, transfer, hold and cleaning times", scheduleData && Number(signals.recipeOverrideCount || 0) > 0, {
        evidence: `${signals.recipeOverrideCount} recipe rows reviewed against schedule data`,
        missing: "Operation durations and precedence still rely on generated model defaults.",
        modelTask: "Map actual batch records or MES durations to every unit procedure and stream transfer.",
        view: "simulation",
        action: "Edit timing",
      }),
      requirement("schedule-feasibility", "No unresolved hard schedule warnings", Number(signals.scheduleWarnings || 0) === 0, {
        evidence: "No current schedule warning",
        missing: `${signals.scheduleWarnings || 0} schedule warnings remain.`,
        modelTask: "Resolve hold-time, resource, CIP/SIP, QC-release and bottleneck conflicts before quoting annual capacity.",
        view: "simulation",
        action: "Review warnings",
      }),
    ], {
      usefulNow: "Comparing routes, identifying likely bottlenecks, and estimating equipment occupancy.",
      notFor: "Committed production plans, customer delivery promises, staffing, or facility-capacity guarantees.",
    }),
    output("tea", "Techno-economic analysis", "Estimate COGS, material burden, CAPEX and scale scenarios on a traceable basis.", [
      requirement("tea-production-basis", "Closed mass balance and feasible annual production basis", balanceReady && Number(signals.annualProductKg || 0) > 0, {
        priority: "gate",
        evidence: `${Number(signals.annualProductKg || 0).toFixed(0)} kg/year on a closed balance`,
        missing: "Annual product output is zero or the production balance is not closed.",
        modelTask: "Close the balance and define working volume, titer, recovery, campaign count and yield losses.",
        view: "simulation",
        action: "Fix production basis",
      }),
      requirement("cost-bom", "Applied media, raw-material and consumable BOM with prices", teaData, {
        evidence: "Applied TEA or supplier dataset with quality score >=70%",
        missing: "Default media, feed, buffer, resin, single-use, QC and cleaning prices remain active.",
        modelTask: "Upload quantities, purchase units, currency/date, purity, losses, reuse cycles, supplier basis and uncertainty range.",
        view: "sources",
        action: "Upload TEA data",
      }),
      requirement("vendor-capex", "Vendor equipment quotes and installation factors", supplierData, {
        evidence: "Supplier evidence attached",
        missing: "Equipment costs are capacity-scaled estimates rather than vendor budget quotes.",
        modelTask: "Add vendor quotes, size basis, material/pressure factors, installation, validation, region, currency and quote date.",
        view: "sources",
        action: "Add supplier quotes",
      }),
      requirement("site-opex", "Site labor, utility, waste and facility tariffs", teaData && Number(signals.appliedDatasetCount || 0) > 0, {
        evidence: "Applied site-specific cost evidence",
        missing: "Labor, utility, waste, inventory and facility burdens use generic defaults.",
        modelTask: "Add loaded labor rates, electricity/steam/chilled-water/WFI tariffs, waste fees, occupancy and maintenance basis.",
        view: "economics",
        action: "Review economics",
      }),
      requirement("tea-uncertainty", "Uncertainty ranges and scenario distributions", Number(signals.customParameterCount || 0) >= 3, {
        evidence: `${signals.customParameterCount} custom project parameters`,
        missing: "The displayed point estimate has no project-specific uncertainty distribution.",
        modelTask: "Define low/base/high or probabilistic ranges for titer, yield, media, CAPEX, utilization, failures and ramp-up.",
        view: "economics",
        action: "Add uncertainty",
      }),
    ], {
      usefulNow: "Relative scenario comparison and identifying dominant cost drivers.",
      notFor: "Investment approval, financing, supplier negotiation, or a quoted commercial COGS.",
    }),
    output("lca", "Life-cycle inventory + impact screening", "Quantify energy, water, materials, waste and emissions per kilogram of product.", [
      requirement("lca-functional-unit", "Closed product and process mass basis", balanceReady && Number(signals.annualProductKg || 0) > 0, {
        priority: "gate",
        evidence: "Mass-normalized product basis available",
        missing: "The functional unit cannot be normalized to a reconciled product output.",
        modelTask: "Close material flows and define product, co-products, waste, recycle and allocation boundaries.",
        view: "simulation",
        action: "Fix mass basis",
      }),
      requirement("site-lci", "Applied site-specific LCA inventory", lcaData, {
        evidence: "Applied LCA dataset with quality score >=70%",
        missing: "Electricity, steam, WFI, materials, transport, waste and emissions use screening factors.",
        modelTask: "Upload activity quantities, geography, year, technology, compartment, factor source and data-quality score.",
        view: "sources",
        action: "Upload LCA data",
      }),
      requirement("lca-boundary", "Documented system boundary and allocation method", Boolean(signals.lcaBoundaryDefined), {
        evidence: "Project-specific system boundary evidence attached",
        missing: "Cradle/gate scope, infrastructure treatment, co-product allocation and biogenic carbon rules are not defined.",
        modelTask: "Document goal/scope, functional unit, cut-offs, allocation, geography, temporal basis and end-of-life treatment.",
        view: "sources",
        action: "Define LCA scope",
      }),
      requirement("lca-data-quality", "Primary-data coverage and uncertainty assessment", lcaData && Number(signals.highQualityDatasetCount || 0) >= 2, {
        evidence: `${signals.highQualityDatasetCount} high-quality project datasets`,
        missing: "Primary-data coverage, pedigree scores and uncertainty are incomplete.",
        modelTask: "Classify measured, supplier, database and proxy flows; add uncertainty and sensitivity for dominant contributors.",
        view: "reports",
        action: "Review LCA evidence",
      }),
    ], {
      usefulNow: "Hotspot screening and comparing alternative process scenarios on one consistent proxy basis.",
      notFor: "ISO-conformant comparative assertions, EPDs, public environmental claims, or verified product footprints.",
    }),
    output("cfd", "Bioreactor CFD + transport", "Resolve velocity, gas holdup, oxygen, nutrient and shear fields for the selected reactor.", [
      requirement("reactor-present", "A physical bioreactor is selected and defined", Boolean(signals.hasBioreactor), {
        priority: "gate",
        evidence: "Bioreactor equipment exists in the active model",
        missing: "No bioreactor equipment is available for a CFD case.",
        modelTask: "Add or select the production bioreactor to define a CFD case.",
        view: "flowsheet",
        action: "Add bioreactor",
      }),
      requirement("cfd-run", "CFD solver run completed", Boolean(signals.cfdStarted), {
        priority: "gate",
        evidence: signals.cfdBackendComplete ? "External CFD worker job completed" : "Interactive engineering screen started",
        missing: "No CFD run has been started for the active vessel.",
        modelTask: "Open Reactor CFD, review the setup and press Start simulation.",
        view: "cfd",
        action: "Start CFD",
      }),
      requirement("reactor-geometry", "As-built vessel, impeller, baffle and sparger geometry", geometryEvidence, {
        evidence: "Geometry evidence mapped from a project dataset",
        missing: "Generic vessel geometry is still used.",
        modelTask: "Provide tank diameter/height, heads, shaft, impeller type/diameter/clearance, baffles, probes, dip tubes, sparger holes and liquid level.",
        view: "sources",
        action: "Upload geometry",
      }),
      requirement("fluid-properties", "Rheology, gas and biology source terms over time", bioreactorData && Number(signals.validatedPropertyCount || 0) > 0, {
        evidence: "Measured bioreactor data and validated property records present",
        missing: "Viscosity, density, surface tension, bubble size, OUR and nutrient uptake still use screening proxies.",
        modelTask: "Add rheology curves, phase properties, gas flow/composition, bubble model, OUR/CER and uptake kinetics by process phase.",
        view: "sources",
        action: "Add CFD inputs",
      }),
      requirement("rigorous-cfd", "External mesh-converged CFD job with validation", Boolean(signals.cfdBackendComplete), {
        evidence: "External CFD worker returned a completed job",
        missing: "The browser field is an engineering screen, not a mesh-converged Navier-Stokes result.",
        modelTask: "Run the case on the CFD worker, perform mesh/time-step independence, residual checks and validate against mixing-time, kLa or PIV/tracer data.",
        view: "cfd",
        action: "Run rigorous CFD",
      }),
    ], {
      usefulNow: "Defining CFD boundary conditions, identifying data gaps, and comparing qualitative mixing risks.",
      notFor: "Impeller selection, scale-up sign-off, shear qualification, oxygen-transfer guarantees, or final vessel design.",
    }),
    output("gmp", "Control, PAT + GMP evidence", "Connect model predictions to qualified equipment, control logic, genealogy and review records.", [
      requirement("qualified-model", "Versioned model and traceable change history", Number(signals.projectVersionCount || 0) > 0, {
        priority: "gate",
        evidence: `${signals.projectVersionCount} saved project versions`,
        missing: "No frozen, reviewable model baseline exists.",
        modelTask: "Save a named project version with owner, change reason, assumptions and review status.",
        view: "projects",
        action: "Save baseline",
      }),
      requirement("plant-connection", "Qualified historian/OPC UA/MES connection", Boolean(signals.automationConnected), {
        evidence: "A non-simulated plant connection is configured",
        missing: "Displayed live values are simulated or disconnected from a qualified plant source.",
        modelTask: "Map approved tags, units, quality codes, sample rates, certificates, read/write policy and historian retention.",
        view: "twin",
        action: "Connect plant data",
      }),
      requirement("qc-cqa", "Applied QC/CQA specification and release data", qcData, {
        evidence: "Applied QC/release dataset with quality score >=70%",
        missing: "Critical quality attributes, specifications, sampling and release results are not tied to the model.",
        modelTask: "Upload CQA/CPP definitions, methods, limits, sample points, lot genealogy and release decisions.",
        view: "sources",
        action: "Add QC data",
      }),
      requirement("control-interlocks", "Validated control loops, alarms and interlocks", Boolean(signals.validatedControlLogic), {
        evidence: "Approved control/interlock evidence mapped",
        missing: "Control loops are illustrative and safety interlocks are not validated.",
        modelTask: "Model pH, DO, temperature, pressure, level, feed and antifoam loops plus alarm, trip, permissive and failure behavior.",
        view: "twin",
        action: "Model controls",
      }),
    ], {
      usefulNow: "Defining tag maps, expected control architecture and evidence requirements.",
      notFor: "Batch release, autonomous control, GMP decisions, safety-instrumented actions, or electronic batch records.",
    }),
  ];

  const missing = outputs
    .flatMap((item) => item.missing.map((gap) => ({ ...gap, outputId: item.id, outputTitle: item.title })))
    .sort((a, b) => {
      const priority = { gate: 0, required: 1, recommended: 2 };
      return priority[a.priority] - priority[b.priority];
    });
  const score = Math.round(outputs.reduce((sum, item) => sum + item.score, 0) / outputs.length);
  const readyOutputs = outputs.filter((item) => item.status === "ready");
  const screeningOutputs = outputs.filter((item) => item.status === "screening");
  const blockedOutputs = outputs.filter((item) => item.status === "blocked");
  const overallStatus = readyOutputs.length === outputs.length
    ? "ready"
    : blockedOutputs.length >= Math.ceil(outputs.length / 2)
      ? "blocked"
      : "screening";

  return {
    score,
    status: overallStatus,
    statusRank: STATUS_ORDER[overallStatus],
    label: overallStatus === "ready" ? "Decision-ready model" : overallStatus === "blocked" ? "Incomplete model basis" : "Screening model",
    statement: overallStatus === "ready"
      ? "Required model evidence is present for the listed outputs; formal review and approval are still required."
      : overallStatus === "blocked"
        ? "Fundamental process or data inputs are missing. Some displayed numbers should not yet be interpreted as engineering results."
        : "The model is useful for screening and comparing scenarios, but it is not yet a validated design, investment, LCA, CFD or GMP basis.",
    outputs,
    missing,
    readyOutputs,
    screeningOutputs,
    blockedOutputs,
  };
}

export function readinessRows(assessment) {
  return assessment.outputs.flatMap((outputItem) => outputItem.requirements.map((item) => ({
    output: outputItem.title,
    outputStatus: outputItem.status,
    outputScorePct: outputItem.score,
    requirement: item.label,
    priority: item.priority,
    complete: item.met ? "yes" : "no",
    evidence: item.evidence,
    missing: item.missing,
    modellingTask: item.modelTask,
    action: item.action,
    targetView: item.view,
    usefulNow: outputItem.usefulNow,
    notFor: outputItem.notFor,
  })));
}
