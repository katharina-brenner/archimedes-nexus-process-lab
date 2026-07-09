const palette = [
  { type: "raw-material", label: "Raw Material Weighing", isoName: "Weighing and dispensing booth", cls: "Preparation", icon: "WB", color: "#51606f", residence: 1.5, power: 0.4, standards: ["EU GMP Part I Ch. 5", "ICH Q7", "ISO 14644"] },
  { type: "wfi", label: "WFI Generation", isoName: "Water for injection generation system", cls: "Utilities", icon: "WFI", color: "#277da1", residence: 2, power: 5.2, standards: ["USP <1231>", "EU GMP Annex 1", "ISPE Baseline"] },
  { type: "media", label: "Preparation Vessel", isoName: "Agitated preparation vessel", cls: "Preparation", icon: "PV", color: "#277da1", residence: 3, power: 0.8, standards: ["ISO 10628", "ASME BPE", "EU GMP Annex 15"] },
  { type: "mixer", label: "Blending Vessel", isoName: "Agitated mixing vessel", cls: "Preparation", icon: "MX", color: "#577590", residence: 1, power: 0.4, standards: ["ISO 10628", "ASME BPE"] },
  { type: "hold-tank", label: "Hold Vessel", isoName: "Sterile hold vessel", cls: "Hold", icon: "HV", color: "#5a7d7c", residence: 4, power: 0.5, standards: ["ISO 10628", "EU GMP Annex 1", "ASME BPE"] },
  { type: "heat-exchanger", label: "Heat Exchanger", isoName: "Shell-and-tube or plate heat exchanger", cls: "Thermal", icon: "HX", color: "#bc6c25", residence: 0.5, power: 1.5, standards: ["ISO 10628", "ASME BPE"] },
  { type: "sip", label: "SIP Cycle", isoName: "Steam-in-place sterilization", cls: "Sterilization", icon: "SIP", color: "#b74d45", residence: 2, power: 4.5, standards: ["EU GMP Annex 1", "ISO 13408-1", "ASME BPE"] },
  { type: "sterile-filter", label: "Sterilizing Grade Filter", isoName: "0.22 micron sterilizing-grade membrane filter", cls: "Filtration", icon: "SF", color: "#43aa8b", residence: 0.5, power: 0.2, standards: ["EU GMP Annex 1", "PDA TR26", "ISO 13408-2"] },
  { type: "seed-reactor", label: "Seed Bioreactor", isoName: "Seed stirred-tank bioreactor", cls: "Bioreactor", icon: "SR", color: "#11847d", residence: 30, power: 2.4, standards: ["ISO 10628", "ASME BPE", "ISA-88"] },
  { type: "production-reactor", label: "Production Bioreactor", isoName: "Production stirred-tank bioreactor", cls: "Bioreactor", icon: "BR", color: "#0f766e", residence: 96, power: 6.5, standards: ["ASME BPE", "ISA-88", "EU GMP Annex 15"] },
  { type: "fermenter", label: "Fermenter", isoName: "Aerobic stirred-tank fermenter", cls: "Bioreactor", icon: "FR", color: "#4d908e", residence: 72, power: 5.4, standards: ["ISO 10628", "ASME BPE", "ISA-88"] },
  { type: "cell-removal", label: "Disc-Stack Centrifuge", isoName: "Centrifugal separator", cls: "Solid-liquid", icon: "CF", color: "#f8961e", residence: 1, power: 3.1, standards: ["ISO 10628", "EU GMP Part I Ch. 3"] },
  { type: "depth-filter", label: "Depth Filter", isoName: "Depth filtration module", cls: "Filtration", icon: "DF", color: "#90be6d", residence: 1.2, power: 0.7, standards: ["ISO 13408-2", "EU GMP Annex 1"] },
  { type: "microfilter", label: "Microfilter", isoName: "Microfiltration membrane unit", cls: "Filtration", icon: "MF", color: "#90be6d", residence: 2, power: 1.2, standards: ["ISO 13408-2", "EU GMP Annex 1"] },
  { type: "virus-filter", label: "Virus Filter", isoName: "Virus-retentive membrane filter", cls: "Viral safety", icon: "VF", color: "#43aa8b", residence: 2, power: 0.9, standards: ["ICH Q5A", "EU GMP Annex 1", "PDA TR41"] },
  { type: "chromatography", label: "Chromatography Column", isoName: "Packed-bed chromatography column", cls: "Purification", icon: "CH", color: "#6d597a", residence: 5, power: 0.8, standards: ["ICH Q7", "ICH Q11", "ASME BPE"] },
  { type: "protein-a", label: "Protein A Capture", isoName: "Protein A affinity chromatography column", cls: "Purification", icon: "PA", color: "#6d597a", residence: 6, power: 0.9, standards: ["ICH Q5A", "ICH Q11", "EU GMP Part I"] },
  { type: "low-ph", label: "Low-pH Hold", isoName: "Viral inactivation hold vessel", cls: "Viral safety", icon: "VI", color: "#b56576", residence: 1.5, power: 0.4, standards: ["ICH Q5A", "EU GMP Annex 15"] },
  { type: "ufdf", label: "UF/DF Skid", isoName: "Tangential-flow ultrafiltration diafiltration skid", cls: "Concentration", icon: "UF", color: "#577590", residence: 4, power: 1.8, standards: ["ASME BPE", "EU GMP Part I"] },
  { type: "crystallizer", label: "Crystallizer", isoName: "Batch crystallization vessel", cls: "Recovery", icon: "CR", color: "#b56576", residence: 8, power: 1.4, standards: ["ISO 10628", "ICH Q7"] },
  { type: "washer", label: "Wash Vessel", isoName: "Product wash vessel", cls: "Downstream", icon: "WV", color: "#4895ef", residence: 2, power: 0.7, standards: ["ISO 10628", "EU GMP Part I"] },
  { type: "dryer", label: "Vacuum Dryer", isoName: "Vacuum tray or conical dryer", cls: "Finishing", icon: "DR", color: "#bc6c25", residence: 6, power: 8.8, standards: ["ICH Q7", "EU GMP Part II"] },
  { type: "formulation", label: "Formulation Vessel", isoName: "Final formulation vessel", cls: "Finishing", icon: "FV", color: "#5a7d7c", residence: 2, power: 0.9, standards: ["EU GMP Annex 1", "ICH Q8", "ICH Q9"] },
  { type: "sterile-fill", label: "Aseptic Filling Line", isoName: "Aseptic filling and stoppering line", cls: "Packaging", icon: "AF", color: "#3f6173", residence: 1.5, power: 2.4, standards: ["EU GMP Annex 1", "ISO 13408-1", "ISO 14644"] },
  { type: "lyophilizer", label: "Lyophilizer", isoName: "Freeze dryer", cls: "Finishing", icon: "LY", color: "#3f6173", residence: 28, power: 10.2, standards: ["EU GMP Annex 1", "ASME BPE", "ISO 14644"] },
  { type: "filler", label: "Packaging Line", isoName: "Secondary packaging line", cls: "Packaging", icon: "PK", color: "#3f6173", residence: 1, power: 1.1, standards: ["EU GMP Annex 16", "21 CFR 211"] },
  { type: "cip", label: "CIP Skid", isoName: "Clean-in-place skid", cls: "Utilities", icon: "CIP", color: "#b74d45", residence: 4, power: 2.2, standards: ["ASME BPE", "EU GMP Annex 15", "ISPE Baseline"] },
  { type: "qc", label: "QC Release Testing", isoName: "Quality control testing hold point", cls: "Quality", icon: "QC", color: "#8a6f3d", residence: 12, power: 0.2, standards: ["ICH Q2", "ICH Q6B", "USP <85>"] },
];

const standards = [
  { group: "GMP", name: "EU GMP Annex 1", scope: "Sterile medicinal product manufacture, contamination control strategy, aseptic processing, environmental monitoring." },
  { group: "GMP", name: "EU GMP Annex 15", scope: "Qualification and validation, process validation, cleaning validation, transport verification." },
  { group: "GMP", name: "21 CFR Parts 210/211", scope: "US current good manufacturing practice for drugs and finished pharmaceuticals." },
  { group: "Data", name: "21 CFR Part 11", scope: "Electronic records, electronic signatures, audit trails, system access control." },
  { group: "Quality", name: "ICH Q7", scope: "GMP for active pharmaceutical ingredients and API intermediates." },
  { group: "Quality", name: "ICH Q8/Q9/Q10", scope: "Pharmaceutical development, quality risk management, and pharmaceutical quality system." },
  { group: "Quality", name: "ICH Q11/Q12", scope: "Development, lifecycle management, and manufacturing changes for drug substances." },
  { group: "Biologics", name: "ICH Q5A/Q5C/Q5D/Q6B", scope: "Viral safety, stability, cell substrates, and specifications for biotechnological products." },
  { group: "Cleanroom", name: "ISO 14644", scope: "Cleanroom classification, monitoring, testing, and cleanroom operations." },
  { group: "Aseptic", name: "ISO 13408", scope: "Aseptic processing, sterilizing filtration, lyophilization, and process simulation principles." },
  { group: "PFD/P&ID", name: "ISO 10628", scope: "Diagrams for the chemical and petrochemical industry, PFD symbols and drawing rules." },
  { group: "Hygienic design", name: "ASME BPE", scope: "Bioprocessing equipment, hygienic piping, surface finish, welds, and cleanability." },
  { group: "Automation", name: "ISA-88 / ISA-95", scope: "Batch control models and enterprise-control integration." },
  { group: "Validation", name: "GAMP 5", scope: "Risk-based computerized system validation and lifecycle controls." },
  { group: "Utilities", name: "USP <85> / <788> / <1231>", scope: "Endotoxins, particulate matter, and pharmaceutical water systems." },
  { group: "Packaging", name: "ISO 15378", scope: "Primary packaging materials for medicinal products with GMP expectations." },
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
    description: "WFI, media, SIP, seed train, STR, harvest, wash, filling, QC",
    product: "Cell biomass",
    titer: 12,
    recovery: 72,
    batchSize: 4000,
    batchCount: 120,
    units: [
      unit("WFI-001", "wfi", 40, 80),
      unit("WB-101", "raw-material", 290, 80),
      unit("PV-101", "media", 540, 80, "Basal Medium Preparation"),
      unit("SIP-101", "sip", 790, 80, "Media Line SIP"),
      unit("SF-101", "sterile-filter", 1040, 80),
      unit("HV-101", "hold-tank", 1290, 80, "Sterile Medium Hold"),
      unit("BR-101", "seed-reactor", 290, 265, "Seed Bioreactor 1"),
      unit("BR-102", "seed-reactor", 540, 265, "Seed Bioreactor 2"),
      unit("BR-201", "production-reactor", 790, 265, "Production STR"),
      unit("CF-301", "cell-removal", 1040, 265, "Harvest Centrifuge"),
      unit("WV-301", "washer", 1290, 265, "Biomass Wash"),
      unit("FV-401", "formulation", 540, 450, "Biomass Formulation"),
      unit("AF-501", "sterile-fill", 790, 450, "Aseptic Filling"),
      unit("PK-601", "filler", 1040, 450, "Secondary Packaging"),
      unit("QC-701", "qc", 1290, 450, "Release Testing"),
    ],
    streams: [
      stream("S-001", "WFI-001", "PV-101", "WFI", "Aqueous"),
      stream("S-101", "WB-101", "PV-101", "Media powders and supplements", "Solid"),
      stream("S-102", "PV-101", "SIP-101", "Prepared medium", "Aqueous"),
      stream("S-103", "SIP-101", "SF-101", "SIP-ready medium", "Aqueous"),
      stream("S-104", "SF-101", "HV-101", "Sterile medium", "Aqueous"),
      stream("S-105", "HV-101", "BR-101", "Sterile seed medium", "Aqueous"),
      stream("S-106", "BR-101", "BR-102", "Seed culture", "Broth"),
      stream("S-107", "BR-102", "BR-201", "Expanded seed culture", "Broth"),
      stream("S-201", "BR-201", "CF-301", "Cell broth", "Broth"),
      stream("S-301", "CF-301", "WV-301", "Cell paste", "Slurry"),
      stream("S-302", "WV-301", "FV-401", "Washed biomass", "Slurry"),
      stream("S-401", "FV-401", "AF-501", "Formulated biomass", "Slurry"),
      stream("S-501", "AF-501", "PK-601", "Filled units", "Solid"),
      stream("S-601", "PK-601", "QC-701", "Packaged product", "Solid"),
    ],
    costs: costs(44, 16, 12, 18, 10),
  },
  penicillin: {
    label: "Penicillin",
    description: "Sterile fermentation, broth clarification, extraction, crystallization, drying",
    product: "Penicillin G",
    titer: 28,
    recovery: 79,
    batchSize: 60000,
    batchCount: 180,
    units: [
      unit("WB-101", "raw-material", 40, 80),
      unit("PV-101", "media", 290, 80, "Corn Steep Medium Preparation"),
      unit("HX-101", "heat-exchanger", 540, 80, "Medium Sterilizer"),
      unit("HV-101", "hold-tank", 790, 80, "Sterile Feed Hold"),
      unit("FR-101", "seed-reactor", 1040, 80, "Seed Fermenter"),
      unit("FR-201", "fermenter", 1290, 80, "Production Fermenter"),
      unit("CF-301", "cell-removal", 290, 265),
      unit("DF-301", "depth-filter", 540, 265, "Polishing Depth Filter"),
      unit("MX-401", "mixer", 790, 265, "Acidification and Solvent Extraction"),
      unit("MX-402", "mixer", 1040, 265, "Back Extraction"),
      unit("CR-501", "crystallizer", 1290, 265),
      unit("CF-502", "cell-removal", 540, 450, "Crystal Centrifuge"),
      unit("DR-601", "dryer", 790, 450),
      unit("PK-701", "filler", 1040, 450, "Bulk API Packaging"),
      unit("QC-801", "qc", 1290, 450),
    ],
    streams: [
      stream("S-101", "WB-101", "PV-101", "Lactose, corn steep liquor, salts", "Solid"),
      stream("S-102", "PV-101", "HX-101", "Penicillin medium", "Aqueous"),
      stream("S-103", "HX-101", "HV-101", "Sterilized medium", "Aqueous"),
      stream("S-104", "HV-101", "FR-101", "Seed medium", "Aqueous"),
      stream("S-105", "FR-101", "FR-201", "Seed inoculum", "Broth"),
      stream("S-201", "FR-201", "CF-301", "Penicillin fermentation broth", "Broth"),
      stream("S-301", "CF-301", "DF-301", "Clarified broth", "Liquid"),
      stream("S-302", "DF-301", "MX-401", "Filtered penicillin liquor", "Liquid"),
      stream("S-401", "MX-401", "MX-402", "Penicillin solvent extract", "Liquid"),
      stream("S-402", "MX-402", "CR-501", "Penicillin-rich aqueous phase", "Liquid"),
      stream("S-501", "CR-501", "CF-502", "Crystal slurry", "Slurry"),
      stream("S-502", "CF-502", "DR-601", "Wet crystals", "Solid"),
      stream("S-601", "DR-601", "PK-701", "Dry Penicillin G", "Solid"),
      stream("S-701", "PK-701", "QC-801", "Released API sample", "Solid"),
    ],
    costs: costs(31, 15, 18, 20, 16),
  },
  antibody: {
    label: "Monoclonal Antibody",
    description: "Media, seed train, fed-batch, harvest, viral safety, polishing, sterile fill",
    product: "mAb drug substance",
    titer: 5,
    recovery: 62,
    batchSize: 12000,
    batchCount: 55,
    units: [
      unit("WFI-001", "wfi", 40, 80),
      unit("PV-101", "media", 290, 80, "Chemically Defined Medium Prep"),
      unit("SF-101", "sterile-filter", 540, 80),
      unit("HV-101", "hold-tank", 790, 80, "Sterile Medium Hold"),
      unit("BR-101", "seed-reactor", 1040, 80, "Seed Bioreactor N-2"),
      unit("BR-102", "seed-reactor", 1290, 80, "Seed Bioreactor N-1"),
      unit("BR-201", "production-reactor", 290, 265, "Fed-Batch Production Bioreactor"),
      unit("CF-301", "cell-removal", 540, 265, "Primary Clarification"),
      unit("DF-302", "depth-filter", 790, 265, "Secondary Clarification"),
      unit("PA-401", "protein-a", 1040, 265),
      unit("VI-402", "low-ph", 1290, 265),
      unit("CH-403", "chromatography", 290, 450, "Cation Exchange Polishing"),
      unit("CH-404", "chromatography", 540, 450, "Anion Exchange Flowthrough"),
      unit("VF-501", "virus-filter", 790, 450),
      unit("UF-601", "ufdf", 1040, 450),
      unit("FV-701", "formulation", 1290, 450),
      unit("AF-801", "sterile-fill", 1040, 635, "Aseptic Fill Finish"),
      unit("QC-901", "qc", 1290, 635),
    ],
    streams: [
      stream("S-001", "WFI-001", "PV-101", "WFI", "Aqueous"),
      stream("S-101", "PV-101", "SF-101", "Prepared CD medium", "Aqueous"),
      stream("S-102", "SF-101", "HV-101", "Sterile CD medium", "Aqueous"),
      stream("S-103", "HV-101", "BR-101", "Seed medium", "Aqueous"),
      stream("S-104", "BR-101", "BR-102", "N-2 seed culture", "Broth"),
      stream("S-105", "BR-102", "BR-201", "N-1 seed culture", "Broth"),
      stream("S-201", "BR-201", "CF-301", "Harvest broth", "Broth"),
      stream("S-301", "CF-301", "DF-302", "Centrate", "Liquid"),
      stream("S-302", "DF-302", "PA-401", "Clarified harvest", "Liquid"),
      stream("S-401", "PA-401", "VI-402", "Protein A eluate", "Liquid"),
      stream("S-402", "VI-402", "CH-403", "Virus-inactivated pool", "Liquid"),
      stream("S-403", "CH-403", "CH-404", "CEX pool", "Liquid"),
      stream("S-404", "CH-404", "VF-501", "AEX flowthrough", "Liquid"),
      stream("S-501", "VF-501", "UF-601", "Virus-filtered mAb", "Liquid"),
      stream("S-601", "UF-601", "FV-701", "Concentrated mAb", "Liquid"),
      stream("S-701", "FV-701", "AF-801", "Sterile bulk drug substance", "Liquid"),
      stream("S-801", "AF-801", "QC-901", "Filled drug product", "Liquid"),
    ],
    costs: costs(22, 20, 9, 31, 18),
  },
  fermentation: {
    label: "Industrial Fermentation",
    description: "Industrial aerobic fermentation with sterilization, recovery, drying, packaging",
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
  insulin: {
    label: "Recombinant Insulin",
    description: "E. coli fermentation, inclusion body recovery, refolding, chromatography, crystallization",
    product: "Recombinant insulin",
    titer: 6,
    recovery: 48,
    batchSize: 30000,
    batchCount: 140,
    units: [
      unit("WB-101", "raw-material", 40, 80),
      unit("PV-101", "media", 290, 80),
      unit("HX-101", "heat-exchanger", 540, 80, "Media Sterilizer"),
      unit("FR-101", "seed-reactor", 790, 80, "Seed Fermenter"),
      unit("FR-201", "fermenter", 1040, 80, "Production Fermenter"),
      unit("CF-301", "cell-removal", 1290, 80, "Cell Harvest"),
      unit("MX-401", "mixer", 290, 265, "Cell Disruption"),
      unit("CF-402", "cell-removal", 540, 265, "Inclusion Body Recovery"),
      unit("MX-403", "mixer", 790, 265, "Solubilization and Refolding"),
      unit("CH-501", "chromatography", 1040, 265, "Capture Chromatography"),
      unit("CH-502", "chromatography", 1290, 265, "Polishing Chromatography"),
      unit("UF-601", "ufdf", 540, 450),
      unit("CR-701", "crystallizer", 790, 450),
      unit("DR-801", "dryer", 1040, 450),
      unit("QC-901", "qc", 1290, 450),
    ],
    streams: [
      stream("S-101", "WB-101", "PV-101", "Media components", "Solid"),
      stream("S-102", "PV-101", "HX-101", "Prepared medium", "Aqueous"),
      stream("S-103", "HX-101", "FR-101", "Sterile medium", "Aqueous"),
      stream("S-104", "FR-101", "FR-201", "Seed culture", "Broth"),
      stream("S-201", "FR-201", "CF-301", "Insulin precursor broth", "Broth"),
      stream("S-301", "CF-301", "MX-401", "Cell paste", "Slurry"),
      stream("S-401", "MX-401", "CF-402", "Disrupted cells", "Slurry"),
      stream("S-402", "CF-402", "MX-403", "Inclusion bodies", "Solid"),
      stream("S-403", "MX-403", "CH-501", "Refolded insulin precursor", "Liquid"),
      stream("S-501", "CH-501", "CH-502", "Captured insulin", "Liquid"),
      stream("S-502", "CH-502", "UF-601", "Polished insulin", "Liquid"),
      stream("S-601", "UF-601", "CR-701", "Concentrated insulin", "Liquid"),
      stream("S-701", "CR-701", "DR-801", "Wet insulin crystals", "Solid"),
      stream("S-801", "DR-801", "QC-901", "Dry insulin API", "Solid"),
    ],
    costs: costs(26, 18, 14, 24, 18),
  },
  vaccine: {
    label: "Viral Vaccine",
    description: "Cell culture, virus propagation, clarification, inactivation, TFF, sterile fill",
    product: "Vaccine drug product",
    titer: 2,
    recovery: 52,
    batchSize: 8000,
    batchCount: 80,
    units: [
      unit("WFI-001", "wfi", 40, 80),
      unit("PV-101", "media", 290, 80),
      unit("SF-101", "sterile-filter", 540, 80),
      unit("BR-101", "seed-reactor", 790, 80, "Cell Expansion Bioreactor"),
      unit("BR-201", "production-reactor", 1040, 80, "Virus Production Bioreactor"),
      unit("DF-301", "depth-filter", 1290, 80),
      unit("MF-302", "microfilter", 290, 265),
      unit("VI-401", "low-ph", 540, 265, "Chemical Inactivation Hold"),
      unit("UF-501", "ufdf", 790, 265),
      unit("CH-601", "chromatography", 1040, 265, "Polishing Chromatography"),
      unit("SF-701", "sterile-filter", 1290, 265, "Final Sterile Filtration"),
      unit("FV-801", "formulation", 790, 450),
      unit("AF-901", "sterile-fill", 1040, 450),
      unit("QC-999", "qc", 1290, 450),
    ],
    streams: [
      stream("S-001", "WFI-001", "PV-101", "WFI", "Aqueous"),
      stream("S-101", "PV-101", "SF-101", "Cell culture medium", "Aqueous"),
      stream("S-102", "SF-101", "BR-101", "Sterile medium", "Aqueous"),
      stream("S-103", "BR-101", "BR-201", "Expanded production cells", "Broth"),
      stream("S-201", "BR-201", "DF-301", "Virus-containing harvest", "Broth"),
      stream("S-301", "DF-301", "MF-302", "Clarified harvest", "Liquid"),
      stream("S-302", "MF-302", "VI-401", "Filtered virus pool", "Liquid"),
      stream("S-401", "VI-401", "UF-501", "Inactivated virus pool", "Liquid"),
      stream("S-501", "UF-501", "CH-601", "Concentrated vaccine intermediate", "Liquid"),
      stream("S-601", "CH-601", "SF-701", "Purified antigen", "Liquid"),
      stream("S-701", "SF-701", "FV-801", "Sterile antigen bulk", "Liquid"),
      stream("S-801", "FV-801", "AF-901", "Formulated vaccine", "Liquid"),
      stream("S-901", "AF-901", "QC-999", "Filled vaccine", "Liquid"),
    ],
    costs: costs(34, 22, 11, 19, 14),
  },
  plasmid: {
    label: "Plasmid DNA",
    description: "Microbial fermentation, alkaline lysis, clarification, chromatography, TFF",
    product: "pDNA drug substance",
    titer: 1.5,
    recovery: 38,
    batchSize: 5000,
    batchCount: 120,
    units: [
      unit("PV-101", "media", 40, 80),
      unit("FR-101", "seed-reactor", 290, 80),
      unit("FR-201", "fermenter", 540, 80, "E. coli Fermenter"),
      unit("CF-301", "cell-removal", 790, 80),
      unit("MX-401", "mixer", 1040, 80, "Alkaline Lysis"),
      unit("DF-402", "depth-filter", 1290, 80, "Lysate Clarification"),
      unit("UF-501", "ufdf", 290, 265, "RNA Reduction TFF"),
      unit("CH-601", "chromatography", 540, 265, "Anion Exchange Capture"),
      unit("CH-602", "chromatography", 790, 265, "Hydrophobic Interaction Polish"),
      unit("UF-701", "ufdf", 1040, 265, "Final Concentration"),
      unit("SF-801", "sterile-filter", 1290, 265),
      unit("QC-901", "qc", 1290, 450),
    ],
    streams: [
      stream("S-101", "PV-101", "FR-101", "Sterile microbial medium", "Aqueous"),
      stream("S-102", "FR-101", "FR-201", "Seed culture", "Broth"),
      stream("S-201", "FR-201", "CF-301", "pDNA cell broth", "Broth"),
      stream("S-301", "CF-301", "MX-401", "Cell paste", "Slurry"),
      stream("S-401", "MX-401", "DF-402", "Neutralized lysate", "Slurry"),
      stream("S-402", "DF-402", "UF-501", "Clarified lysate", "Liquid"),
      stream("S-501", "UF-501", "CH-601", "Conditioned lysate", "Liquid"),
      stream("S-601", "CH-601", "CH-602", "Captured pDNA", "Liquid"),
      stream("S-602", "CH-602", "UF-701", "Polished pDNA", "Liquid"),
      stream("S-701", "UF-701", "SF-801", "Concentrated pDNA", "Liquid"),
      stream("S-801", "SF-801", "QC-901", "Sterile pDNA bulk", "Liquid"),
    ],
    costs: costs(24, 24, 10, 27, 15),
  },
  cellTherapy: {
    label: "Autologous Cell Therapy",
    description: "Patient material receipt, activation, transduction, expansion, harvest, cryofill",
    product: "Cell therapy dose",
    titer: 0.8,
    recovery: 45,
    batchSize: 50,
    batchCount: 260,
    units: [
      unit("QC-001", "qc", 40, 80, "Patient Material Receipt"),
      unit("WB-101", "raw-material", 290, 80, "Closed Kit Preparation"),
      unit("PV-201", "mixer", 540, 80, "Cell Wash and Activation"),
      unit("BR-301", "production-reactor", 790, 80, "Closed Cell Expansion"),
      unit("VI-401", "low-ph", 1040, 80, "Vector Contact Hold"),
      unit("WV-501", "washer", 1290, 80, "Harvest Wash"),
      unit("UF-601", "ufdf", 540, 265, "Concentration"),
      unit("FV-701", "formulation", 790, 265, "Cryoprotectant Formulation"),
      unit("AF-801", "sterile-fill", 1040, 265, "Cryobag Fill"),
      unit("QC-901", "qc", 1290, 265, "Identity, Sterility, Potency"),
    ],
    streams: [
      stream("S-001", "QC-001", "WB-101", "Accepted starting material", "Slurry"),
      stream("S-101", "WB-101", "PV-201", "Prepared closed kit", "Solid"),
      stream("S-201", "PV-201", "BR-301", "Activated cells", "Slurry"),
      stream("S-301", "BR-301", "VI-401", "Expanded cells", "Slurry"),
      stream("S-401", "VI-401", "WV-501", "Transduced cells", "Slurry"),
      stream("S-501", "WV-501", "UF-601", "Washed cells", "Slurry"),
      stream("S-601", "UF-601", "FV-701", "Concentrated cells", "Slurry"),
      stream("S-701", "FV-701", "AF-801", "Formulated cells", "Slurry"),
      stream("S-801", "AF-801", "QC-901", "Cryofilled dose", "Solid"),
    ],
    costs: costs(18, 38, 6, 24, 14),
  },
  api: {
    label: "Small-Molecule API",
    description: "Reaction, quench, extraction, crystallization, isolation, drying, release",
    product: "Small-molecule API",
    titer: 65,
    recovery: 86,
    batchSize: 25000,
    batchCount: 180,
    units: [
      unit("WB-101", "raw-material", 40, 80),
      unit("MX-201", "mixer", 290, 80, "Charge and Dissolution"),
      unit("BR-301", "production-reactor", 540, 80, "GMP Reaction Vessel"),
      unit("HX-302", "heat-exchanger", 790, 80, "Reaction Temperature Control"),
      unit("MX-401", "mixer", 1040, 80, "Quench and Phase Split"),
      unit("MX-402", "mixer", 1290, 80, "Wash Extraction"),
      unit("CR-501", "crystallizer", 540, 265),
      unit("CF-601", "cell-removal", 790, 265, "Nutsche Filter Centrifuge"),
      unit("DR-701", "dryer", 1040, 265),
      unit("PK-801", "filler", 1290, 265, "API Drum Packaging"),
      unit("QC-901", "qc", 1290, 450),
    ],
    streams: [
      stream("S-101", "WB-101", "MX-201", "Raw materials and solvent", "Liquid"),
      stream("S-201", "MX-201", "BR-301", "Reaction charge", "Liquid"),
      stream("S-301", "BR-301", "HX-302", "Reaction mass", "Liquid"),
      stream("S-302", "HX-302", "MX-401", "Temperature-controlled reaction mass", "Liquid"),
      stream("S-401", "MX-401", "MX-402", "Quenched organic phase", "Liquid"),
      stream("S-402", "MX-402", "CR-501", "Washed product solution", "Liquid"),
      stream("S-501", "CR-501", "CF-601", "API crystal slurry", "Slurry"),
      stream("S-601", "CF-601", "DR-701", "Wet API cake", "Solid"),
      stream("S-701", "DR-701", "PK-801", "Dry API", "Solid"),
      stream("S-801", "PK-801", "QC-901", "Packaged API", "Solid"),
    ],
    costs: costs(37, 12, 18, 16, 17),
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
  zoom: 0.78,
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
  standardsList: document.querySelector("#standardsList"),
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
    isoName: base.isoName,
    standards: base.standards,
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
  window.requestAnimationFrame(() => fitCanvas(true));
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
    <button class="palette-item" draggable="true" data-type="${item.type}" title="Add ${item.label}">
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
  const stageWidth = Math.max(1500, ...state.units.map((item) => item.x + 280));
  const stageHeight = Math.max(760, ...state.units.map((item) => item.y + 180));
  const stage = document.createElement("div");
  stage.className = "canvas-stage";
  stage.style.width = `${stageWidth}px`;
  stage.style.height = `${stageHeight}px`;
  stage.style.transform = `scale(${state.zoom})`;
  els.canvas.style.setProperty("--stage-width", `${stageWidth * state.zoom}px`);
  els.canvas.style.setProperty("--stage-height", `${stageHeight * state.zoom}px`);
  els.canvas.appendChild(stage);

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
    stage.appendChild(line);
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
    stage.appendChild(node);
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
      item.x = Math.max(20, originalX + (moveEvent.clientX - startX) / state.zoom);
      item.y = Math.max(20, originalY + (moveEvent.clientY - startY) / state.zoom);
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
    const line = els.canvas.querySelectorAll(".canvas-stage .stream-line")[index];
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

function nextCanvasPosition() {
  const rightMost = state.units.reduce((max, item) => Math.max(max, item.x), 40);
  const row = Math.floor(state.units.length / 4);
  return {
    x: Math.min(rightMost + 255, 45 + (state.units.length % 4) * 255),
    y: 85 + row * 190,
  };
}

function selectedUnit() {
  return state.units.find((item) => item.id === state.selectedId);
}

function duplicateSelectedUnit() {
  const current = selectedUnit();
  if (!current) {
    showToast("Select a unit to copy");
    return;
  }
  const copy = clone(current);
  copy.id = `${copy.icon}-${state.nextUnit++}`;
  copy.x += 46;
  copy.y += 46;
  copy.status = "Ready";
  state.units.push(copy);
  state.selectedId = copy.id;
  renderAll();
  showToast(`${current.id} copied to ${copy.id}`);
}

function connectFromSelectedUnit() {
  const current = selectedUnit();
  if (!current) {
    showToast("Select a unit first");
    return;
  }
  state.mode = "connect";
  state.connectFrom = current.id;
  document.querySelectorAll(".tool").forEach((tool) => tool.classList.toggle("active", tool.dataset.mode === "connect"));
  els.modeHint.textContent = `Now click the destination unit for ${current.id}.`;
  renderCanvas();
  showToast(`Connecting from ${current.id}`);
}

function renderTables() {
  els.equipmentTable.innerHTML = state.units.map((item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.isoName || item.name}</td>
      <td>${item.cls}</td>
      <td>${unitSize(item)}</td>
      <td>${formatNumber(item.residence, 1)} h</td>
      <td>${unitPower(item)}</td>
      <td>${(item.standards || []).slice(0, 3).join(", ")}</td>
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

function renderStandards() {
  els.standardsList.innerHTML = standards.map((item) => `
    <article class="standard-card">
      <span>${item.group}</span>
      <h3>${item.name}</h3>
      <p>${item.scope}</p>
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
        <dt>ISO/PFD name</dt><dd>${selectedUnit.isoName || selectedUnit.name}</dd>
        <dt>Class</dt><dd>${selectedUnit.cls}</dd>
        <dt>Estimated size</dt><dd>${unitSize(selectedUnit)}</dd>
        <dt>Estimated power</dt><dd>${unitPower(selectedUnit)}</dd>
        <dt>Standards</dt><dd>${(selectedUnit.standards || []).join(", ")}</dd>
      </dl>
      <button id="connectFromUnit" class="text-button full">Connect from this unit</button>
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
    document.querySelector("#connectFromUnit").addEventListener("click", connectFromSelectedUnit);
    document.querySelector("#duplicateUnit").addEventListener("click", () => {
      duplicateSelectedUnit();
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
    select: "Click a library item to add it. Drag units on the canvas to move them.",
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

function setZoom(value) {
  state.zoom = Math.max(0.18, Math.min(1.35, value));
  renderCanvas();
  showToast(`Zoom ${Math.round(state.zoom * 100)}%`);
}

function fitCanvas(silent = false) {
  if (!state.units.length) return;
  const maxX = Math.max(...state.units.map((item) => item.x + 240));
  const maxY = Math.max(...state.units.map((item) => item.y + 130));
  const rect = els.canvas.getBoundingClientRect();
  const availableWidth = Math.max(240, rect.width - 48);
  const availableHeight = Math.max(220, rect.height - 48);
  state.zoom = Math.max(0.18, Math.min(1, Math.min(availableWidth / maxX, availableHeight / maxY)));
  renderCanvas();
  els.canvas.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  if (!silent) showToast(`Fitted full process at ${Math.round(state.zoom * 100)}%`);
}

function autoLayout() {
  const columns = 6;
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
    standards,
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
  renderStandards();
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

  els.palette.addEventListener("click", (event) => {
    const item = event.target.closest("[data-type]");
    if (!item) return;
    const position = nextCanvasPosition();
    addUnitFromPalette(item.dataset.type, position.x, position.y);
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
    addUnitFromPalette(type, (event.clientX - rect.left + els.canvas.scrollLeft) / state.zoom, (event.clientY - rect.top + els.canvas.scrollTop) / state.zoom);
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
  document.querySelector("#fitCanvas").addEventListener("click", fitCanvas);
  document.querySelector("#zoomOut").addEventListener("click", () => setZoom(state.zoom - 0.1));
  document.querySelector("#zoomReset").addEventListener("click", () => setZoom(1));
  document.querySelector("#zoomIn").addEventListener("click", () => setZoom(state.zoom + 0.1));
  document.querySelector("#copySelected").addEventListener("click", duplicateSelectedUnit);
  document.querySelector("#connectSelected").addEventListener("click", connectFromSelectedUnit);
  document.querySelector("#exportJson").addEventListener("click", exportJson);
  document.querySelector("#resetScenario").addEventListener("click", () => loadTemplate(state.template));
}

bindEvents();
loadTemplate("culturedMeat");
