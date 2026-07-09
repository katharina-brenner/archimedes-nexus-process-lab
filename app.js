const palette = [
  { type: "media", label: "Media Prep", cls: "Preparation", icon: "MP", color: "#277da1", residence: 3, power: 0.8 },
  { type: "mixer", label: "Mixer", cls: "Preparation", icon: "MX", color: "#577590", residence: 1, power: 0.4 },
  { type: "sterile-filter", label: "Sterile Filter", cls: "Filtration", icon: "SF", color: "#43aa8b", residence: 0.5, power: 0.2 },
  { type: "seed-reactor", label: "Seed Reactor", cls: "Bioreactor", icon: "SR", color: "#11847d", residence: 30, power: 2.4 },
  { type: "production-reactor", label: "Production Reactor", cls: "Bioreactor", icon: "BR", color: "#0f766e", residence: 96, power: 6.5 },
  { type: "fermenter", label: "Fermenter", cls: "Bioreactor", icon: "FR", color: "#4d908e", residence: 72, power: 5.4 },
  { type: "cell-removal", label: "Centrifuge", cls: "Solid-liquid", icon: "CF", color: "#f8961e", residence: 1, power: 3.1 },
  { type: "microfilter", label: "Microfilter", cls: "Filtration", icon: "MF", color: "#90be6d", residence: 2, power: 1.2 },
  { type: "chromatography", label: "Chromatography", cls: "Purification", icon: "CH", color: "#6d597a", residence: 5, power: 0.8 },
  { type: "ufdf", label: "UF/DF", cls: "Concentration", icon: "UF", color: "#577590", residence: 4, power: 1.8 },
  { type: "crystallizer", label: "Crystallizer", cls: "Recovery", icon: "CR", color: "#b56576", residence: 8, power: 1.4 },
  { type: "washer", label: "Wash Tank", cls: "Downstream", icon: "WT", color: "#4895ef", residence: 2, power: 0.7 },
  { type: "dryer", label: "Dryer", cls: "Finishing", icon: "DR", color: "#bc6c25", residence: 6, power: 8.8 },
  { type: "formulation", label: "Formulation", cls: "Finishing", icon: "FM", color: "#5a7d7c", residence: 2, power: 0.9 },
  { type: "filler", label: "Filling", cls: "Packaging", icon: "PK", color: "#3f6173", residence: 1, power: 1.1 },
  { type: "cip", label: "CIP Skid", cls: "Utilities", icon: "CIP", color: "#b74d45", residence: 4, power: 2.2 },
];

const scalePresets = {
  lab: { label: "Lab", batchSize: 50, batchCount: 80, titer: 3, recovery: 55 },
  pilot: { label: "Pilot", batchSize: 1000, batchCount: 120, titer: 8, recovery: 68 },
  demo: { label: "Demo", batchSize: 10000, batchCount: 160, titer: 18, recovery: 76 },
  commercial: { label: "Commercial", batchSize: 100000, batchCount: 260, titer: 35, recovery: 84 },
};

const templates = {
  culturedMeat: {
    label: "Cultured Meat",
    description: "Media prep, seed train, production STR, harvest, wash, filling",
    product: "Cell biomass",
    titer: 12,
    recovery: 72,
    batchSize: 4000,
    batchCount: 120,
    units: [
      unit("T-101", "media", 50, 96),
      unit("F-101", "sterile-filter", 300, 96),
      unit("BR-101", "seed-reactor", 550, 96),
      unit("BR-201", "production-reactor", 800, 96),
      unit("C-301", "cell-removal", 300, 285),
      unit("W-301", "washer", 550, 285),
      unit("PK-401", "filler", 800, 285),
    ],
    streams: [
      stream("S-101", "T-101", "F-101", "Medium", "Aqueous"),
      stream("S-102", "F-101", "BR-101", "Sterile medium", "Aqueous"),
      stream("S-103", "BR-101", "BR-201", "Seed culture", "Broth"),
      stream("S-201", "BR-201", "C-301", "Cell broth", "Broth"),
      stream("S-302", "C-301", "W-301", "Cell paste", "Slurry"),
      stream("S-401", "W-301", "PK-401", "Washed biomass", "Slurry"),
    ],
    costs: costs(44, 16, 12, 18, 10),
  },
  penicillin: {
    label: "Penicillin",
    description: "Sterile fermentation with extraction, crystallization, drying",
    product: "Penicillin G",
    titer: 28,
    recovery: 79,
    batchSize: 60000,
    batchCount: 180,
    units: [
      unit("T-101", "media", 55, 92),
      unit("SF-101", "sterile-filter", 300, 92),
      unit("FR-201", "fermenter", 550, 92),
      unit("CF-301", "cell-removal", 800, 92),
      unit("EX-401", "mixer", 300, 285, "Solvent Extraction"),
      unit("CR-501", "crystallizer", 550, 285),
      unit("DR-601", "dryer", 800, 285),
    ],
    streams: [
      stream("S-101", "T-101", "SF-101", "Corn steep liquor, lactose, salts", "Aqueous"),
      stream("S-102", "SF-101", "FR-201", "Sterile medium", "Aqueous"),
      stream("S-201", "FR-201", "CF-301", "Penicillin fermentation broth", "Broth"),
      stream("S-301", "CF-301", "EX-401", "Clarified penicillin liquor", "Liquid"),
      stream("S-401", "EX-401", "CR-501", "Penicillin-rich extract", "Liquid"),
      stream("S-501", "CR-501", "DR-601", "Wet crystals", "Solid"),
    ],
    costs: costs(31, 15, 18, 20, 16),
  },
  antibody: {
    label: "Monoclonal Antibody",
    description: "Mammalian cell culture with clarification and chromatography train",
    product: "mAb drug substance",
    titer: 5,
    recovery: 62,
    batchSize: 12000,
    batchCount: 55,
    units: [
      unit("T-101", "media", 50, 90),
      unit("BR-101", "seed-reactor", 300, 90),
      unit("BR-201", "production-reactor", 550, 90),
      unit("MF-301", "microfilter", 800, 90),
      unit("CH-401", "chromatography", 300, 285, "Protein A Capture"),
      unit("CH-402", "chromatography", 550, 285, "Polishing Chromatography"),
      unit("UF-501", "ufdf", 800, 285),
      unit("FM-601", "formulation", 1050, 285),
    ],
    streams: [
      stream("S-101", "T-101", "BR-101", "CD medium", "Aqueous"),
      stream("S-102", "BR-101", "BR-201", "Seed culture", "Broth"),
      stream("S-201", "BR-201", "MF-301", "Harvest broth", "Broth"),
      stream("S-301", "MF-301", "CH-401", "Clarified harvest", "Liquid"),
      stream("S-401", "CH-401", "CH-402", "Captured mAb eluate", "Liquid"),
      stream("S-402", "CH-402", "UF-501", "Polished mAb", "Liquid"),
      stream("S-501", "UF-501", "FM-601", "Concentrated mAb", "Liquid"),
    ],
    costs: costs(22, 20, 9, 31, 18),
  },
  fermentation: {
    label: "Industrial Fermentation",
    description: "Generic aerobic fermentation with recovery and finishing",
    product: "Fermentation product",
    titer: 40,
    recovery: 82,
    batchSize: 100000,
    batchCount: 220,
    units: [
      unit("T-101", "media", 50, 92),
      unit("FR-201", "fermenter", 310, 92),
      unit("CF-301", "cell-removal", 570, 92),
      unit("UF-401", "ufdf", 830, 92),
      unit("CR-501", "crystallizer", 570, 285),
      unit("DR-601", "dryer", 830, 285),
      unit("PK-701", "filler", 1090, 285),
    ],
    streams: [
      stream("S-101", "T-101", "FR-201", "Sugar medium", "Aqueous"),
      stream("S-201", "FR-201", "CF-301", "Fermentation broth", "Broth"),
      stream("S-301", "CF-301", "UF-401", "Clarified product liquor", "Liquid"),
      stream("S-401", "UF-401", "CR-501", "Concentrated product", "Liquid"),
      stream("S-501", "CR-501", "DR-601", "Wet product crystals", "Solid"),
      stream("S-601", "DR-601", "PK-701", "Dry product", "Solid"),
    ],
    costs: costs(28, 14, 22, 17, 19),
  },
};

const equations = [
  eq("Cell growth", "kinetics", "mu = mu_max * S / (K_s + S)", "Monod growth rate for substrate-limited cultures."),
  eq("Logistic growth", "kinetics", "dX/dt = mu * X * (1 - X / X_max)", "Density-limited biomass growth."),
  eq("Product formation", "kinetics", "dP/dt = alpha * dX/dt + beta * X", "Luedeking-Piret model for growth-associated and non-growth-associated product."),
  eq("Substrate uptake", "mass", "dS/dt = -(1 / Y_XS) * dX/dt - m_s * X", "Substrate consumption from biomass formation and maintenance."),
  eq("Fed-batch substrate", "mass", "d(SV)/dt = F_in*S_in - q_s*X*V", "Dynamic substrate balance with feed addition."),
  eq("Oxygen transfer", "mass", "OTR = kLa * (C*_O2 - C_O2)", "Oxygen transfer rate from gas to liquid."),
  eq("Oxygen uptake", "mass", "OUR = q_O2 * X * V", "Biological oxygen demand."),
  eq("Carbon dioxide evolution", "mass", "CER = q_CO2 * X * V", "CO2 generation from cell respiration."),
  eq("Aerobic glucose", "stoichiometry", "C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O", "Complete aerobic glucose oxidation."),
  eq("Ethanol fermentation", "stoichiometry", "C6H12O6 -> 2 C2H5OH + 2 CO2", "Anaerobic yeast fermentation."),
  eq("Lactic acid", "stoichiometry", "C6H12O6 -> 2 C3H6O3", "Homolactic fermentation route."),
  eq("Penicillin G", "stoichiometry", "C8H8NO2S + C8H8O2 + O2 + NH3 -> C16H18N2O4S + H2O", "Simplified penicillin G biosynthesis using phenylacetic acid precursor."),
  eq("mAb mass", "mass", "m_product = V_harvest * titer * recovery", "Recoverable antibody mass from harvest volume and titer."),
  eq("Cultured meat biomass", "mass", "m_cells = V * X_v * m_cell * viability * recovery", "Cell biomass estimate from viable cell density."),
  eq("Overall mass balance", "mass", "sum(m_in) - sum(m_out) - accumulation = 0", "General conservation equation for each unit operation."),
  eq("Component balance", "mass", "F_in*x_i,in - F_out*x_i,out + r_i*V = d(C_iV)/dt", "Dynamic component balance with reaction."),
  eq("Heat duty", "energy", "Q = m * Cp * DeltaT", "Sensible heat requirement."),
  eq("Bioreactor cooling", "energy", "Q_cool = Q_metabolic + P_agitation - Q_loss", "Cooling load for aerobic bioreactors."),
  eq("Agitation power", "energy", "P/V = Np * rho * N^3 * D^5 / V", "Impeller power density relationship."),
  eq("Pump power", "energy", "P = Q_vol * DeltaP / eta", "Hydraulic pump power."),
  eq("Sterile filtration area", "separation", "A = V / (J * t)", "Filter sizing from flux and processing time."),
  eq("Centrifuge sigma", "separation", "Q = v_g * Sigma", "Clarifier capacity by equivalent settling area."),
  eq("Chromatography capacity", "separation", "V_resin = m_load / DBC", "Column resin volume from dynamic binding capacity."),
  eq("Chromatography cycle time", "separation", "t_cycle = t_load + t_wash + t_elute + t_regen", "Total chromatography cycle time."),
  eq("UF concentration", "separation", "C_f = C_i * V_i / V_f", "Concentration factor for ultrafiltration."),
  eq("Diafiltration removal", "separation", "C/C0 = exp(-N_DV)", "Impurity clearance during constant-volume diafiltration."),
  eq("Crystallization yield", "separation", "Y = (C_initial - C_sat) / C_initial", "Fraction crystallized by supersaturation removal."),
  eq("Drying water removal", "mass", "m_water_removed = m_wet * (w_i - w_f) / (1 - w_f)", "Water removal from wet cake."),
  eq("Batch cycle time", "economics", "t_batch = sum(t_process) + t_setup + t_CIP", "Scheduling time per batch."),
  eq("Annual output", "economics", "M_annual = V * titer * recovery * N_batches", "Annual product mass."),
  eq("Equipment purchase", "economics", "C = C_ref * (S / S_ref)^n", "Capacity-scaling rule for capital cost."),
  eq("Direct cost", "economics", "COGS = (raw + labor + utilities + consumables + depreciation) / kg_product", "Direct cost of goods estimate."),
];

const state = {
  template: "culturedMeat",
  scale: "pilot",
  mode: "select",
  selectedId: null,
  connectFrom: null,
  nextUnit: 900,
  nextStream: 900,
  batchSize: 4000,
  batchCount: 120,
  titer: 12,
  recovery: 72,
  units: [],
  streams: [],
  costs: [],
};

const els = {
  templateList: document.querySelector("#templateList"),
  scaleList: document.querySelector("#scaleList"),
  palette: document.querySelector("#palette"),
  canvas: document.querySelector("#flowsheetCanvas"),
  processEyebrow: document.querySelector("#processEyebrow"),
  batchSize: document.querySelector("#batchSize"),
  batchCount: document.querySelector("#batchCount"),
  titer: document.querySelector("#titer"),
  recovery: document.querySelector("#recovery"),
  batchSizeValue: document.querySelector("#batchSizeValue"),
  batchCountValue: document.querySelector("#batchCountValue"),
  titerValue: document.querySelector("#titerValue"),
  recoveryValue: document.querySelector("#recoveryValue"),
  annualProduct: document.querySelector("#annualProduct"),
  batchDuration: document.querySelector("#batchDuration"),
  directCost: document.querySelector("#directCost"),
  utilities: document.querySelector("#utilities"),
  utilization: document.querySelector("#utilization"),
  equipmentTable: document.querySelector("#equipmentTable"),
  streamsTable: document.querySelector("#streamsTable"),
  equationSearch: document.querySelector("#equationSearch"),
  equationFilter: document.querySelector("#equationFilter"),
  equationList: document.querySelector("#equationList"),
  costStack: document.querySelector("#costStack"),
  costNarrative: document.querySelector("#costNarrative"),
  economicDetails: document.querySelector("#economicDetails"),
  inspectorTitle: document.querySelector("#inspectorTitle"),
  inspectorBody: document.querySelector("#inspectorBody"),
  modeHint: document.querySelector("#modeHint"),
  toast: document.querySelector("#toast"),
};

function unit(id, type, x, y, customName) {
  const base = palette.find((item) => item.type === type);
  return {
    id,
    type,
    name: customName || base.label,
    cls: base.cls,
    icon: base.icon,
    color: base.color,
    residence: base.residence,
    powerFactor: base.power,
    x,
    y,
    status: "Ready",
  };
}

function stream(id, from, to, composition, phase) {
  return { id, from, to, composition, phase };
}

function eq(name, category, formula, note) {
  return { name, category, formula, note };
}

function costs(media, labor, utilities, consumables, depreciation) {
  return [
    { label: "Media", value: media, color: "#11847d" },
    { label: "Labor", value: labor, color: "#3f6173" },
    { label: "Utilities", value: utilities, color: "#b7791f" },
    { label: "Consumables", value: consumables, color: "#4d8d45" },
    { label: "Depreciation", value: depreciation, color: "#b74d45" },
  ];
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatNumber(value, digits = 0) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function formatMass(kg) {
  if (kg >= 1000000) return `${formatNumber(kg / 1000000, 2)} kt`;
  if (kg >= 1000) return `${formatNumber(kg / 1000, 2)} t`;
  return `${formatNumber(kg, 1)} kg`;
}

function activeTemplate() {
  return templates[state.template];
}

function loadTemplate(key, preserveScale = false) {
  const template = templates[key];
  state.template = key;
  state.units = clone(template.units);
  state.streams = clone(template.streams);
  state.costs = clone(template.costs);
  state.selectedId = state.units[0]?.id || null;
  state.connectFrom = null;
  state.nextUnit = 900;
  state.nextStream = 900;

  if (!preserveScale) {
    state.batchSize = template.batchSize;
    state.batchCount = template.batchCount;
    state.titer = template.titer;
    state.recovery = template.recovery;
  }

  syncInputs();
  renderAll();
  showToast(`${template.label} template loaded`);
}

function applyScale(key) {
  const preset = scalePresets[key];
  state.scale = key;
  state.batchSize = preset.batchSize;
  state.batchCount = preset.batchCount;
  state.titer = preset.titer;
  state.recovery = preset.recovery;
  syncInputs();
  renderAll();
  showToast(`${preset.label} scale applied`);
}

function metrics() {
  const annualKg = state.batchSize * state.titer * state.batchCount * (state.recovery / 100) / 1000;
  const reactorCount = state.units.filter((item) => item.cls === "Bioreactor").length || 1;
  const downstreamCount = state.units.filter((item) => item.cls !== "Bioreactor").length || 1;
  const batchDuration = state.units.reduce((sum, item) => sum + item.residence, 0) + reactorCount * 5 + downstreamCount * 0.75;
  const utilization = Math.min(96, (state.batchCount * batchDuration / 8760) * 100);
  const scalePenalty = 9 / Math.sqrt(Math.max(1, state.batchSize / 1000));
  const recoveryPenalty = (100 - state.recovery) * 0.75;
  const titerBenefit = 260 / Math.max(1, state.titer);
  const directCost = 18 + scalePenalty + recoveryPenalty + titerBenefit + state.units.length * 1.8;
  const utilities = state.units.reduce((sum, item) => sum + item.powerFactor, 0) * batchDuration * state.batchCount / 1000;
  const productPerBatchKg = state.batchSize * state.titer * (state.recovery / 100) / 1000;

  return { annualKg, batchDuration, utilization, directCost, utilities, productPerBatchKg };
}

function unitSize(item) {
  const basis = item.cls === "Bioreactor" ? state.batchSize * 1.25 : state.batchSize * 0.35;
  if (item.cls === "Filtration") return `${formatNumber(Math.max(2, state.batchSize / 180), 1)} m2`;
  if (item.cls === "Purification") return `${formatNumber(Math.max(0.02, state.batchSize * state.titer / 180000), 2)} m3 resin`;
  if (item.cls === "Solid-liquid") return `${formatNumber(Math.max(50, state.batchSize / 3), 0)} L/h`;
  if (item.cls === "Utilities") return `${formatNumber(Math.max(0.5, state.batchSize / 6000), 1)} m3 skid`;
  return `${formatNumber(Math.max(0.05, basis / 1000), 2)} m3`;
}

function unitPower(item) {
  return `${formatNumber(item.powerFactor * Math.pow(Math.max(1, state.batchSize / 1000), 0.62), 1)} kW`;
}

function streamFlow(item) {
  if (item.phase === "Solid") return `${formatMass(metrics().productPerBatchKg)} / batch`;
  if (item.phase === "Slurry") return `${formatNumber(metrics().productPerBatchKg * 1.25, 1)} kg / batch`;
  return `${formatNumber(state.batchSize, 0)} L / batch`;
}

function syncInputs() {
  els.batchSize.value = state.batchSize;
  els.batchCount.value = state.batchCount;
  els.titer.value = state.titer;
  els.recovery.value = state.recovery;
}

function renderTemplateList() {
  els.templateList.innerHTML = Object.entries(templates).map(([key, item]) => `
    <button class="template-button${key === state.template ? " active" : ""}" data-template="${key}">
      <strong>${item.label}</strong>
      <span>${item.description}</span>
    </button>
  `).join("");
}

function renderScaleList() {
  els.scaleList.innerHTML = Object.entries(scalePresets).map(([key, item]) => `
    <button class="${key === state.scale ? "active" : ""}" data-scale="${key}">${item.label}</button>
  `).join("");
}

function renderPalette() {
  els.palette.innerHTML = palette.map((item) => `
    <button class="palette-item" draggable="true" data-type="${item.type}">
      <span style="background:${item.color}">${item.icon}</span>
      <strong>${item.label}</strong>
      <small>${item.cls}</small>
    </button>
  `).join("");
}

function renderMetrics() {
  const data = metrics();
  els.processEyebrow.textContent = `${activeTemplate().label} production`;
  els.batchSizeValue.textContent = `${formatNumber(state.batchSize)} L`;
  els.batchCountValue.textContent = `${state.batchCount}`;
  els.titerValue.textContent = `${formatNumber(state.titer, 1)} g/L`;
  els.recoveryValue.textContent = `${state.recovery}%`;
  els.annualProduct.textContent = formatMass(data.annualKg);
  els.batchDuration.textContent = `${formatNumber(data.batchDuration, 0)} h`;
  els.directCost.textContent = `$${formatNumber(data.directCost, 0)}/kg`;
  els.utilities.textContent = `${formatNumber(data.utilities, 1)} MWh`;
  els.utilization.textContent = `${formatNumber(data.utilization, 0)}%`;
}

function renderCanvas() {
  els.canvas.innerHTML = "";
  const canvasMinWidth = Math.max(1200, ...state.units.map((item) => item.x + 260));
  const canvasMinHeight = Math.max(620, ...state.units.map((item) => item.y + 160));
  els.canvas.style.minWidth = `${canvasMinWidth}px`;
  els.canvas.style.minHeight = `${canvasMinHeight}px`;

  state.streams.forEach((item) => {
    const from = state.units.find((candidate) => candidate.id === item.from);
    const to = state.units.find((candidate) => candidate.id === item.to);
    if (!from || !to) return;
    const line = document.createElement("button");
    const x1 = from.x + 206;
    const y1 = from.y + 46;
    const x2 = to.x;
    const y2 = to.y + 46;
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    line.className = "stream-line";
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.title = `${item.id}: ${item.composition}`;
    line.addEventListener("click", () => {
      state.selectedId = item.id;
      renderInspector();
      renderCanvas();
    });
    if (state.selectedId === item.id) line.classList.add("selected");
    els.canvas.appendChild(line);
  });

  state.units.forEach((item) => {
    const node = document.createElement("button");
    node.className = `unit${state.selectedId === item.id ? " selected" : ""}${state.connectFrom === item.id ? " connecting" : ""}`;
    node.style.left = `${item.x}px`;
    node.style.top = `${item.y}px`;
    node.style.borderLeftColor = item.color;
    node.dataset.id = item.id;
    node.innerHTML = `
      <span class="unit-icon" style="background:${item.color}">${item.icon}</span>
      <span>
        <h3>${item.id}</h3>
        <p>${item.name}</p>
        <small>${unitSize(item)} · ${unitPower(item)}</small>
      </span>
    `;
    wireUnitNode(node, item);
    els.canvas.appendChild(node);
  });
}

function wireUnitNode(node, item) {
  node.addEventListener("click", () => {
    if (state.mode === "connect") {
      handleConnectClick(item.id);
      return;
    }
    state.selectedId = item.id;
    renderInspector();
    renderCanvas();
  });

  node.addEventListener("pointerdown", (event) => {
    if (state.mode !== "select") return;
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const originalX = item.x;
    const originalY = item.y;
    node.setPointerCapture(event.pointerId);

    const move = (moveEvent) => {
      item.x = Math.max(20, originalX + moveEvent.clientX - startX);
      item.y = Math.max(20, originalY + moveEvent.clientY - startY);
      node.style.left = `${item.x}px`;
      node.style.top = `${item.y}px`;
      redrawStreamsOnly();
    };

    const up = () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up);
      renderCanvas();
    };

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
  });
}

function redrawStreamsOnly() {
  state.streams.forEach((streamItem, index) => {
    const line = els.canvas.querySelectorAll(".stream-line")[index];
    const from = state.units.find((item) => item.id === streamItem.from);
    const to = state.units.find((item) => item.id === streamItem.to);
    if (!line || !from || !to) return;
    const x1 = from.x + 206;
    const y1 = from.y + 46;
    const x2 = to.x;
    const y2 = to.y + 46;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${Math.hypot(x2 - x1, y2 - y1)}px`;
    line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg)`;
  });
}

function handleConnectClick(id) {
  if (!state.connectFrom) {
    state.connectFrom = id;
    showToast(`Connect from ${id}`);
  } else if (state.connectFrom === id) {
    state.connectFrom = null;
    showToast("Connection cancelled");
  } else {
    state.streams.push(stream(`S-${state.nextStream++}`, state.connectFrom, id, "Process intermediate", "Liquid"));
    state.connectFrom = null;
    renderAll();
    showToast("Stream connected");
  }
  renderCanvas();
}

function addUnitFromPalette(type, x, y) {
  const base = palette.find((item) => item.type === type);
  const prefix = base.icon.replace(/[^A-Z]/g, "").slice(0, 2) || "U";
  const newUnit = unit(`${prefix}-${state.nextUnit++}`, type, x, y);
  state.units.push(newUnit);
  state.selectedId = newUnit.id;
  renderAll();
  showToast(`${base.label} added`);
}

function renderTables() {
  els.equipmentTable.innerHTML = state.units.map((item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.cls}</td>
      <td>${unitSize(item)}</td>
      <td>${formatNumber(item.residence, 1)} h</td>
      <td>${unitPower(item)}</td>
      <td>${item.status}</td>
    </tr>
  `).join("");

  els.streamsTable.innerHTML = state.streams.map((item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.from}</td>
      <td>${item.to}</td>
      <td>${streamFlow(item)}</td>
      <td>${item.composition}</td>
      <td>${item.phase}</td>
    </tr>
  `).join("");
}

function renderEquations() {
  const query = els.equationSearch.value.trim().toLowerCase();
  const category = els.equationFilter.value;
  const filtered = equations.filter((item) => {
    const haystack = `${item.name} ${item.category} ${item.formula} ${item.note}`.toLowerCase();
    return (category === "all" || item.category === category) && (!query || haystack.includes(query));
  });

  els.equationList.innerHTML = filtered.map((item) => `
    <article class="equation-card">
      <div>
        <span>${item.category}</span>
        <h3>${item.name}</h3>
      </div>
      <code>${item.formula}</code>
      <p>${item.note}</p>
    </article>
  `).join("");
}

function renderEconomics() {
  const data = metrics();
  els.costStack.innerHTML = state.costs.map((item) => `
    <div class="cost-bar">
      <span>${item.label}</span>
      <span class="cost-track"><span class="cost-fill" style="width:${item.value}%; background:${item.color}"></span></span>
      <strong>${item.value}%</strong>
    </div>
  `).join("");

  els.costNarrative.textContent = `${activeTemplate().label} at ${formatNumber(state.batchSize)} L and ${formatNumber(state.titer, 1)} g/L produces ${formatMass(data.annualKg)} annually at an estimated direct cost of $${formatNumber(data.directCost, 0)}/kg. The strongest current levers are recovery, titer, and the number of purification steps.`;
  els.economicDetails.innerHTML = `
    <dt>Product</dt><dd>${activeTemplate().product}</dd>
    <dt>Product per batch</dt><dd>${formatMass(data.productPerBatchKg)}</dd>
    <dt>Annual operating time</dt><dd>${formatNumber(data.batchDuration * state.batchCount, 0)} h</dd>
    <dt>Equipment count</dt><dd>${state.units.length} units</dd>
  `;
}

function renderInspector() {
  const selectedUnit = state.units.find((item) => item.id === state.selectedId);
  const selectedStream = state.streams.find((item) => item.id === state.selectedId);

  if (selectedUnit) {
    els.inspectorTitle.textContent = `${selectedUnit.id} · ${selectedUnit.name}`;
    els.inspectorBody.innerHTML = `
      <label>Operation name<input id="editName" value="${selectedUnit.name}" /></label>
      <label>Residence time<input id="editResidence" type="number" min="0.1" step="0.1" value="${selectedUnit.residence}" /></label>
      <label>Status<select id="editStatus">
        ${["Ready", "Active", "Queued", "CIP", "Hold", "Offline"].map((status) => `<option ${selectedUnit.status === status ? "selected" : ""}>${status}</option>`).join("")}
      </select></label>
      <dl>
        <dt>Class</dt><dd>${selectedUnit.cls}</dd>
        <dt>Estimated size</dt><dd>${unitSize(selectedUnit)}</dd>
        <dt>Estimated power</dt><dd>${unitPower(selectedUnit)}</dd>
      </dl>
      <button id="duplicateUnit" class="text-button full">Duplicate</button>
      <button id="deleteUnit" class="danger-button full">Delete unit</button>
    `;
    document.querySelector("#editName").addEventListener("input", (event) => {
      selectedUnit.name = event.target.value;
      renderCanvas();
      renderTables();
    });
    document.querySelector("#editResidence").addEventListener("input", (event) => {
      selectedUnit.residence = Number(event.target.value);
      renderMetrics();
      renderTables();
      renderEconomics();
    });
    document.querySelector("#editStatus").addEventListener("change", (event) => {
      selectedUnit.status = event.target.value;
      renderCanvas();
      renderTables();
    });
    document.querySelector("#duplicateUnit").addEventListener("click", () => {
      const copy = clone(selectedUnit);
      copy.id = `${copy.icon}-${state.nextUnit++}`;
      copy.x += 40;
      copy.y += 40;
      state.units.push(copy);
      state.selectedId = copy.id;
      renderAll();
    });
    document.querySelector("#deleteUnit").addEventListener("click", () => {
      state.units = state.units.filter((item) => item.id !== selectedUnit.id);
      state.streams = state.streams.filter((item) => item.from !== selectedUnit.id && item.to !== selectedUnit.id);
      state.selectedId = state.units[0]?.id || null;
      renderAll();
    });
    return;
  }

  if (selectedStream) {
    els.inspectorTitle.textContent = `${selectedStream.id} · stream`;
    els.inspectorBody.innerHTML = `
      <label>Composition<input id="editComposition" value="${selectedStream.composition}" /></label>
      <label>Phase<select id="editPhase">
        ${["Aqueous", "Broth", "Liquid", "Slurry", "Solid", "Gas"].map((phase) => `<option ${selectedStream.phase === phase ? "selected" : ""}>${phase}</option>`).join("")}
      </select></label>
      <dl>
        <dt>From</dt><dd>${selectedStream.from}</dd>
        <dt>To</dt><dd>${selectedStream.to}</dd>
        <dt>Estimated flow</dt><dd>${streamFlow(selectedStream)}</dd>
      </dl>
      <button id="deleteStream" class="danger-button full">Delete stream</button>
    `;
    document.querySelector("#editComposition").addEventListener("input", (event) => {
      selectedStream.composition = event.target.value;
      renderTables();
    });
    document.querySelector("#editPhase").addEventListener("change", (event) => {
      selectedStream.phase = event.target.value;
      renderTables();
    });
    document.querySelector("#deleteStream").addEventListener("click", () => {
      state.streams = state.streams.filter((item) => item.id !== selectedStream.id);
      state.selectedId = state.units[0]?.id || null;
      renderAll();
    });
    return;
  }

  els.inspectorTitle.textContent = "Select a unit";
  els.inspectorBody.innerHTML = "<p>Choose a unit operation or stream to inspect sizing, duty, status, and editable properties.</p>";
}

function setMode(mode) {
  state.mode = mode;
  state.connectFrom = null;
  document.querySelectorAll(".tool").forEach((tool) => tool.classList.toggle("active", tool.dataset.mode === mode));
  const hints = {
    select: "Drag units from the library or move units on the canvas.",
    connect: "Click a source unit, then a destination unit to create a stream.",
    inspect: "Click units or streams to inspect assumptions and equations.",
  };
  els.modeHint.textContent = hints[mode];
  renderCanvas();
}

function setView(view) {
  document.querySelectorAll(".view").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelector(`#${view}View`).classList.add("active");
}

function autoLayout() {
  const columns = 4;
  state.units.forEach((item, index) => {
    item.x = 45 + (index % columns) * 255;
    item.y = 85 + Math.floor(index / columns) * 190;
  });
  renderCanvas();
  showToast("Layout updated");
}

function exportJson() {
  const payload = JSON.stringify({
    template: state.template,
    scale: state.scale,
    parameters: {
      batchSize: state.batchSize,
      batchCount: state.batchCount,
      titer: state.titer,
      recovery: state.recovery,
    },
    metrics: metrics(),
    units: state.units,
    streams: state.streams,
    equations,
  }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${state.template}-process-design.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast("Scenario exported");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("visible"), 1800);
}

function renderAll() {
  renderTemplateList();
  renderScaleList();
  renderPalette();
  renderMetrics();
  renderCanvas();
  renderTables();
  renderEquations();
  renderEconomics();
  renderInspector();
}

function bindEvents() {
  els.templateList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-template]");
    if (button) loadTemplate(button.dataset.template);
  });

  els.scaleList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-scale]");
    if (button) applyScale(button.dataset.scale);
  });

  els.palette.addEventListener("dragstart", (event) => {
    const item = event.target.closest("[data-type]");
    if (!item) return;
    event.dataTransfer.setData("text/plain", item.dataset.type);
    event.dataTransfer.effectAllowed = "copy";
  });

  els.canvas.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  });

  els.canvas.addEventListener("drop", (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("text/plain");
    if (!type) return;
    const rect = els.canvas.getBoundingClientRect();
    addUnitFromPalette(type, event.clientX - rect.left + els.canvas.scrollLeft, event.clientY - rect.top + els.canvas.scrollTop);
  });

  document.querySelectorAll(".tool").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  [els.batchSize, els.batchCount, els.titer, els.recovery].forEach((input) => {
    input.addEventListener("input", () => {
      state.batchSize = Number(els.batchSize.value);
      state.batchCount = Number(els.batchCount.value);
      state.titer = Number(els.titer.value);
      state.recovery = Number(els.recovery.value);
      renderMetrics();
      renderCanvas();
      renderTables();
      renderEconomics();
      renderInspector();
    });
  });

  els.equationSearch.addEventListener("input", renderEquations);
  els.equationFilter.addEventListener("change", renderEquations);
  document.querySelector("#autoLayout").addEventListener("click", autoLayout);
  document.querySelector("#exportJson").addEventListener("click", exportJson);
  document.querySelector("#resetScenario").addEventListener("click", () => loadTemplate(state.template));
}

bindEvents();
loadTemplate("culturedMeat");
