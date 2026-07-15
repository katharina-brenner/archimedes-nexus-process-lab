const palette = [
  { type: "raw-material", label: "Raw Material Weighing", isoName: "Weighing and dispensing booth", cls: "Preparation", icon: "WB", color: "#51606f", residence: 1.5, power: 0.4, standards: ["EU GMP Part I Ch. 5", "ICH Q7", "ISO 14644"] },
  { type: "wfi", label: "WFI Generation", isoName: "Water for injection generation system", cls: "Utilities", icon: "WFI", color: "#277da1", residence: 2, power: 5.2, standards: ["USP <1231>", "EU GMP Annex 1", "ISPE Baseline"] },
  { type: "media", label: "Preparation Vessel", isoName: "Agitated preparation vessel", cls: "Preparation", icon: "PV", color: "#277da1", residence: 3, power: 0.8, standards: ["ISO 10628", "ASME BPE", "EU GMP Annex 15"] },
  { type: "mixer", label: "Blending Vessel", isoName: "Agitated mixing vessel", cls: "Preparation", icon: "MX", color: "#577590", residence: 1, power: 0.4, standards: ["ISO 10628", "ASME BPE"] },
  { type: "hold-tank", label: "Hold Vessel", isoName: "Sterile hold vessel", cls: "Hold", icon: "HV", color: "#5a7d7c", residence: 4, power: 0.5, standards: ["ISO 10628", "EU GMP Annex 1", "ASME BPE"] },
  { type: "buffer-prep", label: "Buffer Preparation", isoName: "Buffer preparation vessel", cls: "Preparation", icon: "BP", color: "#277da1", residence: 2.5, power: 0.7, standards: ["ASME BPE", "EU GMP Part I", "ICH Q7"] },
  { type: "resin-prep", label: "Resin Slurry Prep", isoName: "Chromatography resin slurry preparation vessel", cls: "Purification", icon: "RP", color: "#6d597a", residence: 2, power: 0.4, standards: ["ASME BPE", "ICH Q11", "EU GMP Part I"] },
  { type: "heat-exchanger", label: "Heat Exchanger", isoName: "Shell-and-tube or plate heat exchanger", cls: "Thermal", icon: "HX", color: "#bc6c25", residence: 0.5, power: 1.5, standards: ["ISO 10628", "ASME BPE"] },
  { type: "autoclave", label: "Autoclave", isoName: "Moist-heat sterilizer", cls: "Sterilization", icon: "AC", color: "#b74d45", residence: 3, power: 9.5, standards: ["EU GMP Annex 1", "ISO 17665", "ISO 13408-1"] },
  { type: "sip", label: "SIP Cycle", isoName: "Steam-in-place sterilization", cls: "Sterilization", icon: "SIP", color: "#b74d45", residence: 2, power: 4.5, standards: ["EU GMP Annex 1", "ISO 13408-1", "ASME BPE"] },
  { type: "sterile-filter", label: "Sterilizing Grade Filter", isoName: "0.22 micron sterilizing-grade membrane filter", cls: "Filtration", icon: "SF", color: "#43aa8b", residence: 0.5, power: 0.2, standards: ["EU GMP Annex 1", "PDA TR26", "ISO 13408-2"] },
  { type: "seed-reactor", label: "Seed Bioreactor", isoName: "Seed stirred-tank bioreactor", cls: "Bioreactor", icon: "SR", color: "#11847d", residence: 30, power: 2.4, standards: ["ISO 10628", "ASME BPE", "ISA-88"] },
  { type: "production-reactor", label: "Production Bioreactor", isoName: "Production stirred-tank bioreactor", cls: "Bioreactor", icon: "BR", color: "#0f766e", residence: 96, power: 6.5, standards: ["ASME BPE", "ISA-88", "EU GMP Annex 15"] },
  { type: "fermenter", label: "Fermenter", isoName: "Aerobic stirred-tank fermenter", cls: "Bioreactor", icon: "FR", color: "#4d908e", residence: 72, power: 5.4, standards: ["ISO 10628", "ASME BPE", "ISA-88"] },
  { type: "perfusion", label: "Perfusion Bioreactor", isoName: "Perfusion stirred-tank bioreactor with cell retention", cls: "Bioreactor", icon: "PB", color: "#0f766e", residence: 240, power: 7.4, standards: ["ASME BPE", "ISA-88", "ICH Q5D"] },
  { type: "wave", label: "Single-Use Wave Bioreactor", isoName: "Rocking-motion single-use bioreactor", cls: "Bioreactor", icon: "WB", color: "#11847d", residence: 48, power: 1.8, standards: ["ASME BPE", "ISO 10993", "ICH Q5D"] },
  { type: "cell-removal", label: "Disc-Stack Centrifuge", isoName: "Centrifugal separator", cls: "Solid-liquid", icon: "CF", color: "#f8961e", residence: 1, power: 3.1, standards: ["ISO 10628", "EU GMP Part I Ch. 3"] },
  { type: "homogenizer", label: "High-Pressure Homogenizer", isoName: "High-pressure cell disruption homogenizer", cls: "Solid-liquid", icon: "HG", color: "#f8961e", residence: 0.7, power: 12.5, standards: ["ISO 10628", "EU GMP Part I", "ASME BPE"] },
  { type: "depth-filter", label: "Depth Filter", isoName: "Depth filtration module", cls: "Filtration", icon: "DF", color: "#90be6d", residence: 1.2, power: 0.7, standards: ["ISO 13408-2", "EU GMP Annex 1"] },
  { type: "microfilter", label: "Microfilter", isoName: "Microfiltration membrane unit", cls: "Filtration", icon: "MF", color: "#90be6d", residence: 2, power: 1.2, standards: ["ISO 13408-2", "EU GMP Annex 1"] },
  { type: "virus-filter", label: "Virus Filter", isoName: "Virus-retentive membrane filter", cls: "Viral safety", icon: "VF", color: "#43aa8b", residence: 2, power: 0.9, standards: ["ICH Q5A", "EU GMP Annex 1", "PDA TR41"] },
  { type: "chromatography", label: "Chromatography Column", isoName: "Packed-bed chromatography column", cls: "Purification", icon: "CH", color: "#6d597a", residence: 5, power: 0.8, standards: ["ICH Q7", "ICH Q11", "ASME BPE"] },
  { type: "protein-a", label: "Protein A Capture", isoName: "Protein A affinity chromatography column", cls: "Purification", icon: "PA", color: "#6d597a", residence: 6, power: 0.9, standards: ["ICH Q5A", "ICH Q11", "EU GMP Part I"] },
  { type: "low-ph", label: "Low-pH Hold", isoName: "Viral inactivation hold vessel", cls: "Viral safety", icon: "VI", color: "#b56576", residence: 1.5, power: 0.4, standards: ["ICH Q5A", "EU GMP Annex 15"] },
  { type: "ufdf", label: "UF/DF Skid", isoName: "Tangential-flow ultrafiltration diafiltration skid", cls: "Concentration", icon: "UF", color: "#577590", residence: 4, power: 1.8, standards: ["ASME BPE", "EU GMP Part I"] },
  { type: "nanofilter", label: "Nanofiltration", isoName: "Nanofiltration membrane skid", cls: "Separation", icon: "NF", color: "#43aa8b", residence: 2.5, power: 1.6, standards: ["ICH Q7", "EU GMP Part I", "ASME BPE"] },
  { type: "extractor", label: "Liquid-Liquid Extractor", isoName: "Liquid-liquid extraction mixer-settler", cls: "Separation", icon: "EX", color: "#4895ef", residence: 2.5, power: 1.2, standards: ["ISO 10628", "ICH Q7"] },
  { type: "phase-separator", label: "Phase Separator", isoName: "Gravity phase separator or decanter", cls: "Separation", icon: "PS", color: "#4895ef", residence: 1.5, power: 0.3, standards: ["ISO 10628", "ICH Q7"] },
  { type: "distillation", label: "Distillation Column", isoName: "Distillation column with condenser and reboiler", cls: "Thermal", icon: "DC", color: "#bc6c25", residence: 8, power: 18, standards: ["ISO 10628", "ICH Q7", "ATEX/DSEAR"] },
  { type: "crystallizer", label: "Crystallizer", isoName: "Batch crystallization vessel", cls: "Recovery", icon: "CR", color: "#b56576", residence: 8, power: 1.4, standards: ["ISO 10628", "ICH Q7"] },
  { type: "filter-dryer", label: "Filter Dryer", isoName: "Agitated nutsche filter dryer", cls: "Recovery", icon: "FD", color: "#b56576", residence: 10, power: 5.8, standards: ["ICH Q7", "EU GMP Part II", "ISO 10628"] },
  { type: "washer", label: "Wash Vessel", isoName: "Product wash vessel", cls: "Downstream", icon: "WV", color: "#4895ef", residence: 2, power: 0.7, standards: ["ISO 10628", "EU GMP Part I"] },
  { type: "dryer", label: "Vacuum Dryer", isoName: "Vacuum tray or conical dryer", cls: "Finishing", icon: "DR", color: "#bc6c25", residence: 6, power: 8.8, standards: ["ICH Q7", "EU GMP Part II"] },
  { type: "formulation", label: "Formulation Vessel", isoName: "Final formulation vessel", cls: "Finishing", icon: "FV", color: "#5a7d7c", residence: 2, power: 0.9, standards: ["EU GMP Annex 1", "ICH Q8", "ICH Q9"] },
  { type: "sterile-fill", label: "Aseptic Filling Line", isoName: "Aseptic filling and stoppering line", cls: "Packaging", icon: "AF", color: "#3f6173", residence: 1.5, power: 2.4, standards: ["EU GMP Annex 1", "ISO 13408-1", "ISO 14644"] },
  { type: "lyophilizer", label: "Lyophilizer", isoName: "Freeze dryer", cls: "Finishing", icon: "LY", color: "#3f6173", residence: 28, power: 10.2, standards: ["EU GMP Annex 1", "ASME BPE", "ISO 14644"] },
  { type: "isolator", label: "Aseptic Isolator", isoName: "Grade A aseptic isolator", cls: "Containment", icon: "IS", color: "#8a6f3d", residence: 1, power: 3.8, standards: ["EU GMP Annex 1", "ISO 14644", "ISO 13408-6"] },
  { type: "filler", label: "Packaging Line", isoName: "Secondary packaging line", cls: "Packaging", icon: "PK", color: "#3f6173", residence: 1, power: 1.1, standards: ["EU GMP Annex 16", "21 CFR 211"] },
  { type: "cip", label: "CIP Skid", isoName: "Clean-in-place skid", cls: "Utilities", icon: "CIP", color: "#b74d45", residence: 4, power: 2.2, standards: ["ASME BPE", "EU GMP Annex 15", "ISPE Baseline"] },
  { type: "waste-inactivation", label: "Waste Inactivation", isoName: "Thermal or chemical bio-waste inactivation skid", cls: "Utilities", icon: "WI", color: "#b74d45", residence: 3, power: 6.2, standards: ["EU GMP Part I", "Biosafety guidance", "ISO 14001"] },
  { type: "qc", label: "QC Release Testing", isoName: "Quality control testing hold point", cls: "Quality", icon: "QC", color: "#8a6f3d", residence: 12, power: 0.2, standards: ["ICH Q2", "ICH Q6B", "USP <85>"] },
  { type: "em", label: "Environmental Monitoring", isoName: "Cleanroom environmental monitoring point", cls: "Quality", icon: "EM", color: "#8a6f3d", residence: 0.5, power: 0.1, standards: ["EU GMP Annex 1", "ISO 14644", "USP <1116>"] },
  { type: "cell-bank", label: "Cell Bank Thaw", isoName: "Master or working cell bank thaw station", cls: "Preparation", icon: "CB", color: "#51606f", residence: 1, power: 0.2, standards: ["ICH Q5D", "EU GMP Part I", "ISO 20387"] },
  { type: "seed-flask", label: "Shake Flask Seed", isoName: "Incubator shake flask seed culture", cls: "Bioreactor", icon: "SK", color: "#11847d", residence: 24, power: 0.1, standards: ["ICH Q5D", "EU GMP Annex 15"] },
  { type: "single-use-mixer", label: "Single-Use Mixer", isoName: "Single-use mixing bag with load cells", cls: "Preparation", icon: "SU", color: "#277da1", residence: 1.5, power: 0.3, standards: ["ASME BPE", "ISO 10993", "EU GMP Annex 1"] },
  { type: "feed-tank", label: "Fed-Batch Feed Tank", isoName: "Sterile feed vessel or single-use feed bag", cls: "Hold", icon: "FT", color: "#5a7d7c", residence: 6, power: 0.3, standards: ["ASME BPE", "EU GMP Annex 15"] },
  { type: "gas-mixing", label: "Gas Mixing Skid", isoName: "Bioreactor air oxygen carbon dioxide gas blending skid", cls: "Utilities", icon: "GM", color: "#3f6173", residence: 0.2, power: 2.8, standards: ["ASME BPE", "ISA-88", "ISO 8573"] },
  { type: "compressor", label: "Clean Air Compressor", isoName: "Oil-free compressed air generation and drying package", cls: "Utilities", icon: "CA", color: "#3f6173", residence: 0.2, power: 12, standards: ["ISO 8573", "EU GMP Annex 1", "ISPE Baseline"] },
  { type: "clean-steam", label: "Clean Steam Generator", isoName: "Clean steam generator for SIP and sterilizers", cls: "Utilities", icon: "CS", color: "#b74d45", residence: 0.5, power: 14, standards: ["ASME BPE", "EN 285", "EU GMP Annex 1"] },
  { type: "hvac", label: "Cleanroom HVAC", isoName: "GMP HVAC and HEPA air handling unit", cls: "Utilities", icon: "HV", color: "#3f6173", residence: 0.5, power: 18, standards: ["ISO 14644", "EU GMP Annex 1", "ISPE Baseline"] },
  { type: "sampling", label: "Aseptic Sampling", isoName: "Closed aseptic sampling point", cls: "Quality", icon: "SP", color: "#8a6f3d", residence: 0.2, power: 0.05, standards: ["EU GMP Annex 1", "USP <85>", "ICH Q6B"] },
  { type: "pat", label: "PAT Analyzer", isoName: "Process analytical technology analyzer", cls: "Quality", icon: "PAT", color: "#8a6f3d", residence: 0.1, power: 0.4, standards: ["ICH Q8", "ICH Q9", "21 CFR Part 11"] },
  { type: "ph-adjust", label: "pH Adjustment", isoName: "Acid base pH adjustment vessel", cls: "Preparation", icon: "pH", color: "#577590", residence: 0.8, power: 0.3, standards: ["ISO 10628", "ICH Q7", "ASME BPE"] },
  { type: "antifoam", label: "Antifoam Dosing", isoName: "Sterile antifoam dosing skid", cls: "Utilities", icon: "AD", color: "#3f6173", residence: 0.2, power: 0.1, standards: ["ASME BPE", "EU GMP Annex 15"] },
  { type: "surge-tank", label: "Surge Vessel", isoName: "Intermediate surge or equalization vessel", cls: "Hold", icon: "SV", color: "#5a7d7c", residence: 2.5, power: 0.4, standards: ["ISO 10628", "ASME BPE"] },
  { type: "harvest-hold", label: "Harvest Hold", isoName: "Temperature-controlled harvest hold vessel", cls: "Hold", icon: "HH", color: "#5a7d7c", residence: 8, power: 1.2, standards: ["EU GMP Annex 15", "ASME BPE", "ICH Q5C"] },
  { type: "prefilter", label: "Prefilter", isoName: "Bioburden reduction prefilter", cls: "Filtration", icon: "PF", color: "#90be6d", residence: 0.5, power: 0.2, standards: ["ISO 13408-2", "EU GMP Annex 1"] },
  { type: "polish-filter", label: "Polishing Filter", isoName: "Fine polishing filter assembly", cls: "Filtration", icon: "PF2", color: "#90be6d", residence: 0.5, power: 0.2, standards: ["ISO 13408-2", "EU GMP Annex 1"] },
  { type: "bagging", label: "Single-Use Bag Hold", isoName: "Sterile single-use bag hold assembly", cls: "Hold", icon: "BH", color: "#5a7d7c", residence: 3, power: 0.1, standards: ["ISO 10993", "EU GMP Annex 1", "ASME BPE"] },
  { type: "labeling", label: "Label and Serialization", isoName: "Labeling serialization and vision inspection line", cls: "Packaging", icon: "LS", color: "#3f6173", residence: 0.8, power: 1.1, standards: ["EU GMP Annex 16", "21 CFR Part 11", "ISO 15378"] },
  { type: "inspection", label: "Visual Inspection", isoName: "Automated visual inspection station", cls: "Quality", icon: "VIQ", color: "#8a6f3d", residence: 1, power: 1.8, standards: ["EU GMP Annex 1", "USP <790>", "21 CFR 211"] },
  { type: "cold-storage", label: "Cold Storage", isoName: "Qualified cold room or freezer storage", cls: "Hold", icon: "CSG", color: "#4895ef", residence: 24, power: 4.5, standards: ["ICH Q5C", "EU GMP Annex 15", "GMP GDP"] },
  { type: "waste-hold", label: "Waste Hold Tank", isoName: "GMP liquid waste hold tank", cls: "Utilities", icon: "WH", color: "#b74d45", residence: 6, power: 0.5, standards: ["ISO 14001", "EU GMP Part I"] },
  { type: "solvent-tank", label: "Solvent Tank Farm", isoName: "GMP solvent storage and transfer system", cls: "Hold", icon: "ST", color: "#bc6c25", residence: 8, power: 0.7, standards: ["ATEX/DSEAR", "ICH Q7", "ISO 10628"] },
  { type: "dryer-mill", label: "Mill and Sieve", isoName: "Cone mill and vibratory sieve", cls: "Finishing", icon: "MS", color: "#bc6c25", residence: 1.5, power: 2.2, standards: ["ICH Q7", "EU GMP Part II", "ISO 10628"] },
  { type: "weigh-fill", label: "Weigh Fill", isoName: "Bulk weigh fill station", cls: "Packaging", icon: "WF", color: "#3f6173", residence: 1, power: 0.8, standards: ["EU GMP Annex 16", "21 CFR 211"] },
  { type: "pump", label: "Transfer Pump", isoName: "Hygienic transfer pump", cls: "Piping", icon: "P", color: "#4b5563", residence: 0.1, power: 1.6, standards: ["ASME BPE", "ISO 10628", "EU GMP Annex 15"] },
  { type: "valve", label: "Manual Valve", isoName: "Hygienic diaphragm valve", cls: "Piping", icon: "V", color: "#4f6f8f", residence: 0.05, power: 0.02, standards: ["ASME BPE", "ISO 10628"] },
  { type: "control-valve", label: "Control Valve", isoName: "Automated flow control valve", cls: "Piping", icon: "CV", color: "#4b5563", residence: 0.05, power: 0.08, standards: ["ASME BPE", "ISA-88", "21 CFR Part 11"] },
  { type: "flowmeter", label: "Flowmeter", isoName: "Coriolis or magnetic flowmeter", cls: "Instrumentation", icon: "FM", color: "#00a88f", residence: 0.05, power: 0.05, standards: ["ISA-88", "GAMP 5", "21 CFR Part 11"] },
  { type: "sensor", label: "PAT Sensor", isoName: "Inline pH DO conductivity or UV sensor", cls: "Instrumentation", icon: "S", color: "#8a6f3d", residence: 0.05, power: 0.08, standards: ["ICH Q8", "GAMP 5", "21 CFR Part 11"] },
  { type: "pressure-relief", label: "Pressure Relief", isoName: "Relief valve or rupture disc assembly", cls: "Piping", icon: "PR", color: "#c04f47", residence: 0.05, power: 0.02, standards: ["ASME BPE", "PED", "ISO 10628"] },
  { type: "manifold", label: "Manifold", isoName: "Hygienic transfer manifold", cls: "Piping", icon: "MF", color: "#4f6f8f", residence: 0.1, power: 0.05, standards: ["ASME BPE", "EU GMP Annex 1", "ISO 10628"] },
  { type: "storage", label: "Raw Material Storage", isoName: "Bulk raw material storage bin or tank", cls: "Preparation", icon: "STO", color: "#51606f", residence: 12, power: 0.2, standards: ["ISO 10628", "EU GMP Part I Ch. 5"] },
  { type: "grinder", label: "Grinder", isoName: "Feedstock grinder or mill", cls: "Preparation", icon: "GR", color: "#51606f", residence: 0.8, power: 7.5, standards: ["ISO 10628", "EU GMP Part I"] },
  { type: "liquefaction", label: "Liquefaction Reactor", isoName: "Enzymatic liquefaction reactor", cls: "Bioreactor", icon: "LQ", color: "#11847d", residence: 2, power: 3.5, standards: ["ISO 10628", "ASME BPE"] },
  { type: "saccharification", label: "Saccharification Reactor", isoName: "Enzymatic saccharification reactor", cls: "Bioreactor", icon: "SC", color: "#11847d", residence: 4, power: 3.8, standards: ["ISO 10628", "ASME BPE"] },
  { type: "rotary-filter", label: "Rotary Vacuum Filter", isoName: "Rotary vacuum filter", cls: "Solid-liquid", icon: "RVF", color: "#f8961e", residence: 1.5, power: 5.4, standards: ["ISO 10628", "EU GMP Part I"] },
  { type: "dark-fermenter", label: "Dark Fermenter", isoName: "Thermophilic continuous stirred-tank dark fermenter", cls: "Bioreactor", icon: "DF", color: "#0f766e", residence: 12, power: 8.2, standards: ["ISO 10628", "ISA-88", "ASME BPE"] },
  { type: "anaerobic-digester", label: "Anaerobic Digester", isoName: "Anaerobic digestion reactor", cls: "Bioreactor", icon: "AD", color: "#4d908e", residence: 72, power: 5.6, standards: ["ISO 10628", "ISA-88"] },
  { type: "absorber", label: "Absorption Column", isoName: "Packed or tray absorption column", cls: "Separation", icon: "ABS", color: "#4895ef", residence: 2.2, power: 6.4, standards: ["ISO 10628", "ATEX/DSEAR"] },
  { type: "desorber", label: "Desorption Column", isoName: "Solvent regeneration desorption column", cls: "Thermal", icon: "DES", color: "#bc6c25", residence: 2.8, power: 12.5, standards: ["ISO 10628", "ATEX/DSEAR"] },
  { type: "splitter", label: "Recycle Splitter", isoName: "Recycle purge splitter", cls: "Piping", icon: "SPL", color: "#4b5563", residence: 0.05, power: 0.05, standards: ["ISO 10628", "ISA-88"] },
  { type: "regulator", label: "Feedback Regulator", isoName: "Feedback regulatory control block", cls: "Instrumentation", icon: "REG", color: "#8a6f3d", residence: 0.05, power: 0.2, standards: ["ISA-88", "GAMP 5", "21 CFR Part 11"] },
  { type: "tear-stream", label: "Tear Stream Marker", isoName: "Recycle loop tear stream convergence marker", cls: "Instrumentation", icon: "TS", color: "#c04f47", residence: 0.05, power: 0.02, standards: ["ISA-88", "GAMP 5"] },
  { type: "equalization", label: "Equalization Tank", isoName: "Wastewater equalization basin", cls: "Environmental", icon: "EQ", color: "#277da1", residence: 8, power: 1.2, standards: ["ISO 14001", "ISO 10628"] },
  { type: "neutralization", label: "Neutralization Tank", isoName: "pH neutralization reactor", cls: "Environmental", icon: "NT", color: "#577590", residence: 2, power: 0.8, standards: ["ISO 14001", "ISO 10628"] },
  { type: "primary-clarifier", label: "Primary Clarifier", isoName: "Gravity primary clarifier", cls: "Environmental", icon: "PC", color: "#4895ef", residence: 3, power: 0.9, standards: ["ISO 14001", "ISO 10628"] },
  { type: "aeration-basin", label: "Aeration Basin", isoName: "Activated sludge aeration basin", cls: "Environmental", icon: "AB", color: "#11847d", residence: 18, power: 24, standards: ["ISO 14001", "ISA-88"] },
  { type: "secondary-clarifier", label: "Secondary Clarifier", isoName: "Secondary settling clarifier", cls: "Environmental", icon: "SC2", color: "#4895ef", residence: 4, power: 1.1, standards: ["ISO 14001", "ISO 10628"] },
  { type: "sludge-thickener", label: "Sludge Thickener", isoName: "Gravity sludge thickener", cls: "Environmental", icon: "TH", color: "#8a6f3d", residence: 6, power: 1.4, standards: ["ISO 14001", "ISO 10628"] },
  { type: "belt-filter", label: "Belt Filter Press", isoName: "Belt filter press sludge dewatering unit", cls: "Solid-liquid", icon: "BFP", color: "#f8961e", residence: 1.2, power: 8.2, standards: ["ISO 14001", "ISO 10628"] },
  { type: "uv-disinfection", label: "UV Disinfection", isoName: "UV wastewater disinfection channel", cls: "Environmental", icon: "UV", color: "#8a6f3d", residence: 0.2, power: 4.1, standards: ["ISO 14001"] },
  { type: "ion-exchange", label: "Ion Exchange", isoName: "Ion exchange column", cls: "Separation", icon: "IX", color: "#6d597a", residence: 1.8, power: 0.9, standards: ["ISO 10628", "USP <1231>"] },
  { type: "reverse-osmosis", label: "Reverse Osmosis", isoName: "Reverse osmosis membrane skid", cls: "Separation", icon: "RO", color: "#43aa8b", residence: 1.5, power: 5.7, standards: ["USP <1231>", "ISO 10628"] },
  { type: "scrubber", label: "Gas Scrubber", isoName: "Wet gas scrubber", cls: "Air pollution", icon: "GS", color: "#4895ef", residence: 0.8, power: 6.4, standards: ["EPA-MACT", "ISO 14001"] },
  { type: "baghouse", label: "Baghouse Filter", isoName: "Fabric baghouse dust collector", cls: "Air pollution", icon: "BH", color: "#90be6d", residence: 0.5, power: 4.8, standards: ["EPA-MACT", "ISO 14001"] },
  { type: "cyclone", label: "Cyclone Separator", isoName: "Cyclone particulate separator", cls: "Air pollution", icon: "CY", color: "#f8961e", residence: 0.2, power: 2.4, standards: ["EPA-MACT", "ISO 10628"] },
  { type: "carbon-bed", label: "Activated Carbon Bed", isoName: "Activated carbon adsorption bed", cls: "Air pollution", icon: "ACB", color: "#6d597a", residence: 1.5, power: 1.6, standards: ["EPA-MACT", "ISO 14001"] },
  { type: "thermal-oxidizer", label: "Thermal Oxidizer", isoName: "Regenerative thermal oxidizer", cls: "Air pollution", icon: "TO", color: "#bc6c25", residence: 0.3, power: 20, standards: ["EPA-MACT", "ISO 14001"] },
  { type: "cartoner", label: "Cartoner", isoName: "Cartoning packaging machine", cls: "Packaging", icon: "CT", color: "#3f6173", residence: 0.8, power: 2.8, standards: ["ISO 15378", "21 CFR 211"] },
  { type: "case-packer", label: "Case Packer", isoName: "Case packing machine", cls: "Packaging", icon: "CP", color: "#3f6173", residence: 0.6, power: 2.1, standards: ["ISO 15378"] },
  { type: "palletizer", label: "Palletizer", isoName: "Palletizing station", cls: "Packaging", icon: "PL", color: "#3f6173", residence: 0.5, power: 3.2, standards: ["ISO 15378"] },
  { type: "vacuum-pump", label: "Vacuum Pump", isoName: "Auxiliary vacuum pump package", cls: "Auxiliary", icon: "VP", color: "#3f6173", residence: 0.2, power: 4.6, standards: ["ISO 10628", "EU GMP Part I"] },
  { type: "heat-agent", label: "Heat Agent Loop", isoName: "Heat transfer agent supply and return loop", cls: "Utilities", icon: "HTA", color: "#bc6c25", residence: 0.3, power: 2.4, standards: ["ISO 10628", "ISPE Baseline"] },
  { type: "power-meter", label: "Power Meter", isoName: "Electrical demand and generation meter", cls: "Instrumentation", icon: "kW", color: "#d7a229", residence: 0.05, power: 0.05, standards: ["GAMP 5", "21 CFR Part 11"] },
  { type: "labor-crew", label: "Labor Crew", isoName: "Labor type demand and allocation record", cls: "Resources", icon: "LC", color: "#8a6f3d", residence: 0.1, power: 0.02, standards: ["ISA-95", "EU GMP Part I"] },
  { type: "material-inventory", label: "Material Inventory", isoName: "Material storage inventory and timing record", cls: "Resources", icon: "MI", color: "#51606f", residence: 2, power: 0.1, standards: ["EU GMP Part I Ch. 5", "ICH Q7"] },
  { type: "stream-summary", label: "Stream Summary", isoName: "Stream summary table and Excel-link node", cls: "Reports", icon: "SR", color: "#00a88f", residence: 0.1, power: 0.02, standards: ["21 CFR Part 11", "GAMP 5"] },
  { type: "report-set", label: "Report Set", isoName: "Generate-and-save report set node", cls: "Reports", icon: "RPT", color: "#00a88f", residence: 0.2, power: 0.05, standards: ["21 CFR Part 11", "GAMP 5"] },
  { type: "excel-link", label: "Excel/OLE Link", isoName: "Hot-linked spreadsheet or OLE automation object", cls: "Exchange", icon: "XL", color: "#00a88f", residence: 0.1, power: 0.05, standards: ["21 CFR Part 11", "GAMP 5"] },
  { type: "visual-object", label: "Visual Object", isoName: "Text, line, rectangle, ellipse, polyline, or polygon annotation", cls: "Documentation", icon: "VO", color: "#4f6f8f", residence: 0.05, power: 0.01, standards: ["ISO 10628", "GAMP 5"] },
  { type: "process-explorer", label: "Process Explorer", isoName: "Process tree, search, locate, and overview navigator node", cls: "Documentation", icon: "PX", color: "#4f6f8f", residence: 0.05, power: 0.01, standards: ["GAMP 5", "21 CFR Part 11"] },
  { type: "cleaning-agent", label: "Cleaning Agent Tank", isoName: "Validated cleaning-agent preparation and supply tank", cls: "Utilities", icon: "CAT", color: "#b74d45", residence: 1.2, power: 0.6, standards: ["EU GMP Annex 15", "ASME BPE"] },
  { type: "rinse-water", label: "Rinse Water Hold", isoName: "Final rinse water hold and conductivity endpoint tank", cls: "Utilities", icon: "RW", color: "#5bc0de", residence: 0.8, power: 0.4, standards: ["USP <1231>", "EU GMP Annex 15"] },
  { type: "caustic-hold", label: "Caustic Hold", isoName: "Caustic cleaning solution hold tank", cls: "Utilities", icon: "NaOH", color: "#b74d45", residence: 1, power: 0.5, standards: ["ASME BPE", "EU GMP Annex 15"] },
  { type: "acid-hold", label: "Acid Hold", isoName: "Acid cleaning solution hold tank", cls: "Utilities", icon: "ACD", color: "#b74d45", residence: 1, power: 0.5, standards: ["ASME BPE", "EU GMP Annex 15"] },
  { type: "cip-return", label: "CIP Return", isoName: "CIP return, neutralization, and spent-rinse collection", cls: "Utilities", icon: "CIPR", color: "#9b4d4d", residence: 1.5, power: 0.8, standards: ["EU GMP Annex 15", "ISO 14001"] },
  { type: "heat-recovery", label: "Heat Recovery Loop", isoName: "Process heat recovery exchanger and reuse loop", cls: "Thermal", icon: "HR", color: "#bc6c25", residence: 0.6, power: 1.1, standards: ["ISO 10628", "ISPE Baseline"] },
  { type: "condensate-return", label: "Condensate Return", isoName: "Clean steam condensate recovery and credit node", cls: "Utilities", icon: "CRN", color: "#bc6c25", residence: 0.4, power: 0.7, standards: ["ASME BPE", "ISPE Baseline"] },
  { type: "solvent-recycle", label: "Solvent Recycle", isoName: "Recovered solvent recycle and purge control", cls: "Recovery", icon: "SRC", color: "#6d597a", residence: 1.1, power: 1.8, standards: ["ISO 10628", "ICH Q7"] },
  { type: "water-reuse", label: "Water Reuse", isoName: "Process water reuse and reject-routing node", cls: "Environmental", icon: "WR", color: "#277da1", residence: 1.4, power: 1.2, standards: ["USP <1231>", "ISO 14001"] },
  { type: "weigh-scale", label: "Weigh Scale", isoName: "Process weigh scale or load cell station", cls: "Instrumentation", icon: "WS", color: "#8a6f3d", residence: 0.05, power: 0.05, standards: ["21 CFR Part 11", "GAMP 5"] },
];

const quickAddTypes = ["valve", "control-valve", "pump", "flowmeter", "sensor", "pressure-relief", "manifold", "sampling"];

const paletteGroups = [
  { key: "core", label: "Core", classes: ["Preparation", "Bioreactor", "Solid-liquid", "Filtration", "Purification", "Concentration", "Recovery", "Finishing", "Packaging"] },
  { key: "upstream", label: "Upstream", classes: ["Preparation", "Bioreactor", "Hold", "Sterilization"] },
  { key: "downstream", label: "Downstream", classes: ["Solid-liquid", "Filtration", "Purification", "Concentration", "Separation", "Recovery", "Finishing", "Packaging"] },
  { key: "utilities", label: "Utilities + CIP", classes: ["Utilities", "Thermal", "Sterilization", "Environmental"] },
  { key: "piping", label: "Piping", classes: ["Piping", "Instrumentation"] },
  { key: "quality", label: "Quality", classes: ["Quality", "Viral safety"] },
  { key: "all", label: "All equipment", classes: [] },
];

const canvasFocusOptions = [
  { key: "all", label: "L0 Full plant" },
  { key: "main", label: "L1 Core process" },
  { key: "upstream", label: "L2 Upstream" },
  { key: "downstream", label: "L3 Downstream" },
  { key: "utilities", label: "L4 Utilities + CIP" },
  { key: "recycle", label: "L5 Recycle + heat" },
  { key: "quality", label: "L6 QC + AI" },
];

const flowDetailOptions = [
  { key: "standard", label: "Standard" },
  { key: "detailed", label: "Flow labels" },
  { key: "equipment", label: "Equipment data" },
  { key: "full", label: "Full PFD" },
];

const sectionPresets = [
  {
    key: "upstream",
    label: "Upstream Train",
    detail: "Media, seed, bioreactor",
    types: ["wfi", "media", "sterile-filter", "hold-tank", "seed-reactor", "production-reactor"],
    y: 250,
    composition: "Sterile feed / culture",
    phase: "Broth",
  },
  {
    key: "downstream",
    label: "Downstream Train",
    detail: "Harvest to purification",
    types: ["cell-removal", "depth-filter", "protein-a", "low-ph", "chromatography", "ufdf"],
    y: 435,
    composition: "Clarified product pool",
    phase: "Liquid",
  },
  {
    key: "cip",
    label: "CIP / SIP Loop",
    detail: "Cleaning supply and return",
    types: ["cleaning-agent", "caustic-hold", "acid-hold", "rinse-water", "cip", "cip-return"],
    y: 805,
    composition: "Validated cleaning circuit",
    phase: "Aqueous",
  },
  {
    key: "recycle",
    label: "Reuse + Heat",
    detail: "Recycle, purge, energy credit",
    types: ["heat-exchanger", "heat-recovery", "condensate-return", "splitter", "water-reuse", "solvent-recycle"],
    y: 620,
    composition: "Recovered utility / recycle stream",
    phase: "Liquid",
  },
  {
    key: "quality",
    label: "QC + Data Layer",
    detail: "PAT, EM, records, release",
    types: ["sampling", "pat", "em", "qc", "stream-summary", "report-set"],
    y: 620,
    composition: "Sample / data link",
    phase: "Liquid",
  },
];

const processLanes = [
  { top: 52, height: 126, label: "Feed, media, and utility supply", tone: "support" },
  { top: 237, height: 126, label: "Core reaction / bioreactor train", tone: "main" },
  { top: 422, height: 126, label: "Harvest, separation, purification", tone: "main" },
  { top: 607, height: 126, label: "Fill finish, QC, packaging", tone: "quality" },
  { top: 792, height: 126, label: "CIP/SIP, recycle, heat reuse", tone: "cleaning" },
  { top: 977, height: 126, label: "Wastewater, emissions, environmental controls", tone: "waste" },
  { top: 1162, height: 126, label: "Resource planning and auxiliary systems", tone: "support" },
  { top: 1347, height: 126, label: "Reports, data exchange, process explorer", tone: "quality" },
  { top: 1532, height: 126, label: "Extended process branches", tone: "recycle" },
  { top: 1717, height: 126, label: "Design notes and validation objects", tone: "support" },
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

const scientificSources = [
  {
    group: "Merck",
    title: "Sterile filtration and bioburden control",
    appliesTo: ["sterile-filter", "prefilter", "polish-filter", "media", "buffer-prep", "sterile-fill"],
    benchmark: "Use 0.22 micron sterilizing-grade filtration as a model assumption for sterile liquid filtration and bioburden-control steps.",
    modelUse: "Sterile filter sizing, bioburden risk tags, final fill controls, filter integrity-test checklist.",
    source: "Merck Millipore - Sterile Filtration and Bioburden Control",
    url: "https://www.merckmillipore.com/BG/en/products/pharma-and-biopharma-manufacturing/sterile-filtration-and-bioburden-control",
  },
  {
    group: "Merck",
    title: "Scalable tangential-flow filtration",
    appliesTo: ["ufdf", "microfilter", "nanofilter", "virus-filter"],
    benchmark: "TFF is modeled for concentration, diafiltration, buffer exchange, and downstream viral-vector/biologics purification.",
    modelUse: "Membrane-area sizing, flux/TMP assumptions, diafiltration-volume planning, scale-up checklist.",
    source: "Merck Millipore - Scalable Tangential Flow Filtration",
    url: "https://www.merckmillipore.com/NI/es/technical-documents/technical-article/pharmaceutical-and-biopharmaceutical-manufacturing/viral-vector-downstream-processing/scalable-tangential-flow-filtration-downstream-processing",
  },
  {
    group: "Cytiva",
    title: "Dynamic binding capacity",
    appliesTo: ["chromatography", "protein-a", "ion-exchange", "resin-prep"],
    benchmark: "DBC is treated as the load limit before unacceptable product breakthrough under process conditions.",
    modelUse: "Chromatography resin volume, loading cycles, breakthrough risk, elution/pool design.",
    source: "Cytiva - How to determine dynamic binding capacity",
    url: "https://www.cytivalifesciences.com/en/us/insights/how-to-determine-dynamic-binding-capacity-of-chromatography-resins",
  },
  {
    group: "Sartorius",
    title: "Single-use bioreactor scale range",
    appliesTo: ["seed-reactor", "production-reactor", "fermenter", "perfusion", "wave"],
    benchmark: "Single-use bioreactors are represented as scalable culture systems with vendor ranges from milliliter-scale systems to 2000 L class systems.",
    modelUse: "Scale-up guardrails, working-volume constraints, single-use versus stainless utility burden.",
    source: "Sartorius - Single-Use Bioreactors",
    url: "https://www.sartorius.com/en/products/fermentation-bioreactors/single-use-bioreactors",
  },
  {
    group: "Paper",
    title: "Ammonia toxicity in mammalian cell culture",
    appliesTo: ["production-reactor", "seed-reactor", "perfusion", "fermenter", "wave", "cell-bank", "media"],
    benchmark: "Ammonia/ammonium accumulation is a known inhibitory byproduct in mammalian cell culture; growth, maximum viable density, protein processing, and product quality can be affected.",
    modelUse: "Ammonium boundary check, metabolic waste warning, feed/glutamine strategy, quality-risk signal.",
    source: "Schneider et al. - The importance of ammonia in mammalian cell culture",
    url: "https://pubmed.ncbi.nlm.nih.gov/8672289/",
  },
  {
    group: "Paper",
    title: "Ammonium, lactate, and glutamine effects",
    appliesTo: ["production-reactor", "seed-reactor", "perfusion", "fermenter", "media", "feed-tank"],
    benchmark: "Ammonium can reduce cell growth rate and can lead to growth arrest; lactate and glutamine interactions should be constrained in cell-culture models.",
    modelUse: "Chemical-boundary warning for ammonium, lactate, glutamine, and pH-linked metabolic stress.",
    source: "Influence of different ammonium, lactate and glutamine concentrations on CHO culture",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2995142/",
  },
  {
    group: "Industry",
    title: "20,000 L mammalian bioreactor scale reference",
    appliesTo: ["production-reactor", "seed-reactor", "perfusion"],
    benchmark: "Traditional mammalian-cell seed trains can culminate in manufacturing bioreactors around 20,000 L; above this, oxygen transfer, mixing time, shear, facility risk, and validation risk should trigger a hard design review.",
    modelUse: "Mammalian-cell bioreactor volume boundary, scale-out recommendation, oxygen-transfer and mixing-time warning.",
    source: "BioPharm International - Current challenges with cell culture scale-up",
    url: "https://www.biopharminternational.com/view/current-challenges-with-cell-culture-scale-up-for-biologics-production",
  },
  {
    group: "Industry",
    title: "Oxygen transfer and shear in 20,000 L cell-culture bioreactors",
    appliesTo: ["production-reactor", "seed-reactor", "perfusion", "gas-mixing", "sensor"],
    benchmark: "At 20,000 L scale, mixing time, oxygen mass transfer, agitation, and shear become explicit design constraints rather than simple linear scale-up variables.",
    modelUse: "kLa/OUR boundary, agitation/shear warning, large-bioreactor scale-up recommendation.",
    source: "BioProcess International - Characterizing oxygen mass transfer and shear",
    url: "https://www.bioprocessintl.com/bioreactors/characterizing-oxygen-mass-transfer-and-shear-during-cell-culture-calculating-the-maximum-cell-density-supported-by-a-20-000-liter-stirred-tank-bioreactor",
  },
  {
    group: "Industry",
    title: "Process intensification and 2,000 L scale-out",
    appliesTo: ["production-reactor", "perfusion", "seed-reactor", "wave"],
    benchmark: "Process-intensification strategies can reduce dependence on 20,000 L stainless-steel scale-up by moving toward smaller 2,000 L class single-use or scale-out configurations.",
    modelUse: "Scale-out recommendation when mammalian-cell reactor volume exceeds 20,000 L or when kLa/ammonium boundaries are stressed.",
    source: "Sartorius - seed train process intensification",
    url: "https://www.sartorius.com/download/785210/biostat-rm-str-seed-train-process-intensification-article-pd-1--data.pdf",
  },
  {
    group: "FDA",
    title: "Process validation lifecycle",
    appliesTo: ["report-set", "process-explorer", "qc", "pat", "stream-summary"],
    benchmark: "Validation is modeled as a lifecycle: process design, process qualification, and continued process verification.",
    modelUse: "Recommendations tab, validation readiness, batch-record and continued-verification gaps.",
    source: "FDA - Process Validation: General Principles and Practices",
    url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/process-validation-general-principles-and-practices",
  },
  {
    group: "ICH",
    title: "Viral safety for biotechnology products",
    appliesTo: ["virus-filter", "low-ph", "qc", "sampling", "cell-bank"],
    benchmark: "Viral safety is modeled as a risk-based testing, prevention, removal, and inactivation strategy for products from cell lines.",
    modelUse: "Viral-filter, low-pH inactivation, QC release, adventitious-agent risk checks.",
    source: "EMA / ICH Q5A(R2) - Viral safety evaluation",
    url: "https://www.ema.europa.eu/en/ich-q5ar2-guideline-viral-safety-evaluation-biotechnology-products-derived-cell-lines-human-or-animal-origin-scientific-guideline",
  },
  {
    group: "FDA",
    title: "Viral safety guidance",
    appliesTo: ["virus-filter", "low-ph", "protein-a", "chromatography", "qc"],
    benchmark: "Risk-based principles and mitigation strategies are used as the logic for viral-clearance recommendations.",
    modelUse: "Risk scoring for biologics, viral-vector, and mammalian-cell culture process templates.",
    source: "FDA - Q5A(R2) Viral Safety Evaluation",
    url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q5ar2-viral-safety-evaluation-biotechnology-products-derived-cell-lines-human-or-animal-origin",
  },
  {
    group: "ISO",
    title: "PFD/P&ID diagram conventions",
    appliesTo: ["visual-object", "process-explorer", "stream-summary", "pump", "valve", "control-valve", "flowmeter"],
    benchmark: "Chemical-industry diagrams should use consistent PFD/P&ID symbols and drawing conventions.",
    modelUse: "Standardized symbols, stream labels, equipment tags, and flowsheet-readability recommendations.",
    source: "ISO 10628 - Diagrams for the chemical and petrochemical industry",
    url: "https://www.iso.org/standard/51801.html",
  },
  {
    group: "ICS",
    title: "ICS 71.120 equipment classification",
    appliesTo: ["all"],
    benchmark: "ISO lists 71.120 as equipment for the chemical industry, with subgroups for equipment in general, reaction vessels and their components, columns, heat exchangers, and other equipment.",
    modelUse: "Equipment-table classification, standards coverage, and Recommendations tab gap analysis.",
    source: "ISO ICS 71.120 - Equipment for the chemical industry",
    url: "https://www.iso.org/ics/71.120.html",
  },
];

const scalePresets = {
  lab: { label: "Lab", batchSize: 50, batchCount: 80, titer: 3, recovery: 55 },
  pilot: { label: "Pilot", batchSize: 1000, batchCount: 120, titer: 8, recovery: 68 },
  demo: { label: "Demo", batchSize: 10000, batchCount: 160, titer: 18, recovery: 76 },
  commercial: { label: "Commercial", batchSize: 100000, batchCount: 260, titer: 35, recovery: 84 },
};

const processParameters = [
  { key: "viability", label: "Viability", unit: "%", min: 45, max: 99, step: 1, value: 92 },
  { key: "inoculation", label: "Inoculation ratio", unit: "%", min: 2, max: 25, step: 0.5, value: 10 },
  { key: "doublingTime", label: "Doubling time", unit: "h", min: 8, max: 72, step: 1, value: 24 },
  { key: "specificGrowth", label: "mu max", unit: "1/h", min: 0.01, max: 0.18, step: 0.01, value: 0.05 },
  { key: "cellDensity", label: "Peak cell density", unit: "M cells/mL", min: 0.2, max: 120, step: 0.2, value: 18 },
  { key: "glucose", label: "Glucose setpoint", unit: "g/L", min: 0.2, max: 12, step: 0.1, value: 4 },
  { key: "glutamine", label: "Glutamine", unit: "mM", min: 0, max: 8, step: 0.1, value: 3 },
  { key: "lactate", label: "Lactate limit", unit: "g/L", min: 0.2, max: 8, step: 0.1, value: 2 },
  { key: "ammonia", label: "Ammonia limit", unit: "mM", min: 0.2, max: 8, step: 0.1, value: 2 },
  { key: "ph", label: "pH", unit: "", min: 5.5, max: 8.2, step: 0.05, value: 7.1 },
  { key: "temperature", label: "Temperature", unit: "C", min: 20, max: 39, step: 0.1, value: 36.5 },
  { key: "doSetpoint", label: "Dissolved oxygen", unit: "% air sat.", min: 10, max: 80, step: 1, value: 40 },
  { key: "kla", label: "kLa", unit: "1/h", min: 2, max: 260, step: 1, value: 65 },
  { key: "our", label: "OUR", unit: "mmol/L/h", min: 0.2, max: 18, step: 0.1, value: 4.5 },
  { key: "agitation", label: "Agitation P/V", unit: "W/L", min: 0.01, max: 12, step: 0.01, value: 0.9 },
  { key: "aeration", label: "Aeration", unit: "vvm", min: 0.01, max: 2.5, step: 0.01, value: 0.35 },
  { key: "feedRate", label: "Feed rate", unit: "% vol/day", min: 0, max: 80, step: 1, value: 18 },
  { key: "perfusionRate", label: "Perfusion rate", unit: "VVD", min: 0, max: 8, step: 0.1, value: 1 },
  { key: "harvestRecovery", label: "Harvest recovery", unit: "%", min: 40, max: 99, step: 1, value: 88 },
  { key: "clarificationYield", label: "Clarification yield", unit: "%", min: 40, max: 99, step: 1, value: 92 },
  { key: "chromYield", label: "Chromatography yield", unit: "%", min: 35, max: 99, step: 1, value: 82 },
  { key: "ufdfYield", label: "UF/DF yield", unit: "%", min: 50, max: 99, step: 1, value: 91 },
  { key: "sterileFilterFlux", label: "Sterile filter flux", unit: "LMH", min: 20, max: 600, step: 5, value: 180 },
  { key: "bioburden", label: "Bioburden limit", unit: "CFU/mL", min: 0, max: 100, step: 1, value: 10 },
  { key: "hydrogenProductivity", label: "H2 productivity", unit: "mmol/L/h", min: 1, max: 80, step: 0.5, value: 45.8 },
  { key: "osmCrit", label: "Critical osmolarity", unit: "mol/L", min: 0.05, max: 0.6, step: 0.01, value: 0.28 },
  { key: "h2Crit", label: "Dissolved H2 crit.", unit: "mmol/L", min: 0.2, max: 8, step: 0.1, value: 2.2 },
  { key: "dilutionRate", label: "CSTR dilution", unit: "1/h", min: 0.01, max: 0.8, step: 0.01, value: 0.18 },
  { key: "recycleFraction", label: "Recycle fraction", unit: "%", min: 0, max: 95, step: 1, value: 35 },
  { key: "heatRecovery", label: "Heat recovery", unit: "%", min: 0, max: 85, step: 1, value: 22 },
  { key: "co2Removal", label: "CO2 absorption", unit: "%", min: 20, max: 99, step: 1, value: 88 },
  { key: "bodRemoval", label: "BOD removal", unit: "%", min: 20, max: 99, step: 1, value: 92 },
  { key: "codRemoval", label: "COD removal", unit: "%", min: 20, max: 99, step: 1, value: 86 },
  { key: "roRecovery", label: "RO recovery", unit: "%", min: 35, max: 95, step: 1, value: 78 },
  { key: "vocRemoval", label: "VOC removal", unit: "%", min: 20, max: 99.9, step: 0.1, value: 96 },
  { key: "targetThroughput", label: "Target throughput", unit: "kg/h", min: 10, max: 10000, step: 10, value: 1000 },
  { key: "bottleneckUtil", label: "Bottleneck util.", unit: "%", min: 20, max: 100, step: 1, value: 82 },
  { key: "validationFactor", label: "Validation factor", unit: "% CAPEX", min: 0, max: 25, step: 0.5, value: 8 },
  { key: "capitalScaleExponent", label: "CAPEX scale exponent", unit: "", min: 0.45, max: 1, step: 0.01, value: 0.62 },
  { key: "labFixedBurden", label: "Lab fixed burden", unit: "x", min: 1, max: 80, step: 1, value: 28 },
  { key: "learningRate", label: "Learning rate", unit: "%", min: 0, max: 45, step: 1, value: 18 },
  { key: "automationLevel", label: "Automation level", unit: "%", min: 0, max: 95, step: 1, value: 62 },
  { key: "facilityPremium", label: "Facility premium", unit: "%", min: 0, max: 120, step: 1, value: 35 },
  { key: "annualOperatingTime", label: "AOT available", unit: "h/yr", min: 2000, max: 8760, step: 10, value: 7920 },
  { key: "setupTime", label: "Setup time", unit: "h/batch", min: 0, max: 48, step: 0.5, value: 4 },
  { key: "turnaroundTime", label: "Turnaround time", unit: "h/batch", min: 0, max: 72, step: 0.5, value: 8 },
  { key: "holdupTime", label: "Holdup time", unit: "h", min: 0, max: 240, step: 1, value: 12 },
  { key: "equipmentUptime", label: "Equipment uptime", unit: "%", min: 50, max: 99.9, step: 0.1, value: 92 },
  { key: "resourceSlack", label: "Resource slack", unit: "%", min: 0, max: 60, step: 1, value: 12 },
  { key: "materialInventoryDays", label: "Material inventory", unit: "days", min: 0, max: 180, step: 1, value: 21 },
  { key: "zeroFlowThreshold", label: "Zero-flow threshold", unit: "kg/h", min: 0, max: 10, step: 0.1, value: 0.1 },
  { key: "densitySafetyFactor", label: "Density safety factor", unit: "x", min: 0.8, max: 1.3, step: 0.01, value: 1.03 },
  { key: "emissionLimit", label: "Emission limit", unit: "kg/yr", min: 10, max: 100000, step: 10, value: 1000 },
  { key: "workingCapitalPercent", label: "Working capital", unit: "% DFC", min: 0, max: 60, step: 1, value: 15 },
  { key: "taxRate", label: "Income tax", unit: "%", min: 0, max: 55, step: 1, value: 25 },
  { key: "discountRate", label: "Discount rate", unit: "%", min: 0, max: 30, step: 0.5, value: 10 },
  { key: "depreciationYears", label: "Depreciation life", unit: "yr", min: 1, max: 30, step: 1, value: 10 },
];

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
      unit("BP-101", "buffer-prep", 1040, 80, "Buffer Preparation"),
      unit("BR-102", "seed-reactor", 1290, 80, "Seed Bioreactor N-1"),
      unit("BR-101", "seed-reactor", 40, 265, "Seed Bioreactor N-2"),
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
      unit("IS-801", "isolator", 790, 635, "Grade A Fill Isolator"),
      unit("AF-802", "sterile-fill", 1040, 635, "Aseptic Fill Finish"),
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
      stream("S-702", "BP-101", "FV-701", "Formulation buffer", "Aqueous"),
      stream("S-701", "FV-701", "IS-801", "Sterile bulk drug substance", "Liquid"),
      stream("S-801", "IS-801", "AF-802", "Isolator-protected bulk", "Liquid"),
      stream("S-802", "AF-802", "QC-901", "Filled drug product", "Liquid"),
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
      unit("WB-101", "raw-material", 40, 80),
      unit("PV-101", "media", 290, 80, "Substrate Medium Preparation"),
      unit("HX-101", "heat-exchanger", 540, 80, "Continuous Sterilizer"),
      unit("FR-101", "seed-reactor", 790, 80, "Seed Fermenter"),
      unit("FR-201", "fermenter", 1040, 80, "Production Fermenter"),
      unit("WI-301", "waste-inactivation", 1290, 80, "Spent Biomass Inactivation"),
      unit("CF-301", "cell-removal", 290, 265),
      unit("NF-401", "nanofilter", 540, 265),
      unit("DC-501", "distillation", 790, 265, "Solvent/Product Distillation"),
      unit("CR-601", "crystallizer", 1040, 265),
      unit("FD-701", "filter-dryer", 1290, 265),
      unit("PK-801", "filler", 1040, 450),
      unit("QC-901", "qc", 1290, 450),
    ],
    streams: [
      stream("S-101", "WB-101", "PV-101", "Sugar, nitrogen, salts", "Solid"),
      stream("S-102", "PV-101", "HX-101", "Prepared fermentation medium", "Aqueous"),
      stream("S-103", "HX-101", "FR-101", "Sterile seed medium", "Aqueous"),
      stream("S-104", "FR-101", "FR-201", "Seed culture", "Broth"),
      stream("S-201", "FR-201", "CF-301", "Fermentation broth", "Broth"),
      stream("S-202", "FR-201", "WI-301", "Bio-waste side stream", "Broth"),
      stream("S-301", "CF-301", "NF-401", "Clarified product liquor", "Liquid"),
      stream("S-401", "NF-401", "DC-501", "Concentrated liquor", "Liquid"),
      stream("S-501", "DC-501", "CR-601", "Product-rich cut", "Liquid"),
      stream("S-601", "CR-601", "FD-701", "Crystal slurry", "Slurry"),
      stream("S-701", "FD-701", "PK-801", "Dry product", "Solid"),
      stream("S-801", "PK-801", "QC-901", "Packaged product", "Solid"),
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
      unit("HG-401", "homogenizer", 290, 265, "High-Pressure Cell Disruption"),
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
      stream("S-301", "CF-301", "HG-401", "Cell paste", "Slurry"),
      stream("S-401", "HG-401", "CF-402", "Disrupted cells", "Slurry"),
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
      unit("WB-101", "wave", 790, 80, "Seed Wave Bioreactor"),
      unit("PB-201", "perfusion", 1040, 80, "Perfusion Virus Production"),
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
      stream("S-102", "SF-101", "WB-101", "Sterile medium", "Aqueous"),
      stream("S-103", "WB-101", "PB-201", "Expanded production cells", "Broth"),
      stream("S-201", "PB-201", "DF-301", "Virus-containing harvest", "Broth"),
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
      unit("EM-801", "em", 1290, 265, "Cleanroom EM Hold Point"),
      unit("SF-802", "sterile-filter", 1040, 450, "Final Sterile Filter"),
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
      stream("S-701", "UF-701", "EM-801", "Concentrated pDNA", "Liquid"),
      stream("S-801", "EM-801", "SF-802", "EM-released pDNA bulk", "Liquid"),
      stream("S-802", "SF-802", "QC-901", "Sterile pDNA bulk", "Liquid"),
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
      unit("IS-250", "isolator", 790, 80, "Closed Processing Isolator"),
      unit("BR-301", "production-reactor", 1040, 80, "Closed Cell Expansion"),
      unit("VI-401", "low-ph", 1040, 80, "Vector Contact Hold"),
      unit("WV-501", "washer", 1290, 80, "Harvest Wash"),
      unit("UF-601", "ufdf", 540, 265, "Concentration"),
      unit("FV-701", "formulation", 790, 265, "Cryoprotectant Formulation"),
      unit("AF-801", "sterile-fill", 1040, 265, "Cryobag Fill"),
      unit("EM-850", "em", 1290, 265, "Grade A/B EM"),
      unit("QC-901", "qc", 1290, 265, "Identity, Sterility, Potency"),
    ],
    streams: [
      stream("S-001", "QC-001", "WB-101", "Accepted starting material", "Slurry"),
      stream("S-101", "WB-101", "PV-201", "Prepared closed kit", "Solid"),
      stream("S-201", "PV-201", "IS-250", "Activated cells", "Slurry"),
      stream("S-250", "IS-250", "BR-301", "Closed transfer cells", "Slurry"),
      stream("S-301", "BR-301", "VI-401", "Expanded cells", "Slurry"),
      stream("S-401", "VI-401", "WV-501", "Transduced cells", "Slurry"),
      stream("S-501", "WV-501", "UF-601", "Washed cells", "Slurry"),
      stream("S-601", "UF-601", "FV-701", "Concentrated cells", "Slurry"),
      stream("S-701", "FV-701", "AF-801", "Formulated cells", "Slurry"),
      stream("S-801", "AF-801", "EM-850", "Cryofilled dose", "Solid"),
      stream("S-850", "EM-850", "QC-901", "EM-cleared cryofilled dose", "Solid"),
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
      unit("EX-401", "extractor", 1040, 80, "Quench and Extraction"),
      unit("PS-402", "phase-separator", 1290, 80, "Phase Separation"),
      unit("CR-501", "crystallizer", 540, 265),
      unit("FD-601", "filter-dryer", 790, 265, "Filter Dryer"),
      unit("DC-701", "distillation", 1040, 265, "Solvent Recovery Distillation"),
      unit("PK-801", "filler", 1290, 265, "API Drum Packaging"),
      unit("QC-901", "qc", 1290, 450),
    ],
    streams: [
      stream("S-101", "WB-101", "MX-201", "Raw materials and solvent", "Liquid"),
      stream("S-201", "MX-201", "BR-301", "Reaction charge", "Liquid"),
      stream("S-301", "BR-301", "HX-302", "Reaction mass", "Liquid"),
      stream("S-302", "HX-302", "EX-401", "Temperature-controlled reaction mass", "Liquid"),
      stream("S-401", "EX-401", "PS-402", "Quenched extract", "Liquid"),
      stream("S-402", "PS-402", "CR-501", "Washed product solution", "Liquid"),
      stream("S-501", "CR-501", "FD-601", "API crystal slurry", "Slurry"),
      stream("S-601", "FD-601", "DC-701", "Mother liquor solvent", "Liquid"),
      stream("S-701", "FD-601", "PK-801", "Dry API", "Solid"),
      stream("S-801", "PK-801", "QC-901", "Packaged API", "Solid"),
    ],
    costs: costs(37, 12, 18, 16, 17),
  },
  biohydrogen: {
    label: "Biohydrogen DF",
    description: "Potato peel pre-treatment, dark fermentation, anaerobic digestion, CO2 absorption, recycle",
    product: "Hydrogen and methane",
    titer: 18,
    recovery: 64,
    batchSize: 75000,
    batchCount: 300,
    units: [
      unit("STO-101", "storage", 40, 80, "Potato Peel Storage"),
      unit("GR-102", "grinder", 290, 80, "Feedstock Grinding"),
      unit("HX-103", "heat-exchanger", 540, 80, "Liquefaction Heat Exchange"),
      unit("LQ-201", "liquefaction", 790, 80, "Alpha-Amylase Liquefaction"),
      unit("SC-202", "saccharification", 1040, 80, "Gluco-Amylase Saccharification"),
      unit("RVF-301", "rotary-filter", 1290, 80, "Rotary Vacuum Filtration"),
      unit("SV-302", "surge-tank", 40, 265, "Glucose Syrup Surge"),
      unit("REG-303", "regulator", 290, 265, "Syrup-Water Feedback Regulator"),
      unit("DF-401", "dark-fermenter", 540, 265, "C. saccharolyticus Dark Fermentation"),
      unit("SP-402", "sampling", 790, 265, "H2 Productivity Sample"),
      unit("ST-403", "sterile-filter", 1040, 265, "Liquid Sterilization"),
      unit("AD-501", "anaerobic-digester", 1290, 265, "Acid Conversion Anaerobic Digestion"),
      unit("MX-601", "mixer", 290, 450, "H2/CH4 Gas Blend"),
      unit("ABS-701", "absorber", 540, 450, "DEA CO2 Absorption"),
      unit("DES-702", "desorber", 790, 450, "DEA Regeneration"),
      unit("SPL-703", "splitter", 1040, 450, "Lean Solvent Recycle Split"),
      unit("TS-704", "tear-stream", 1290, 450, "Recycle Tear Stream"),
      unit("WH-801", "waste-hold", 540, 635, "Filter Cake and Biomass Waste"),
      unit("QC-901", "qc", 790, 635, "Gas Purity and Economics Report"),
    ],
    streams: [
      stream("S-101", "STO-101", "GR-102", "Potato peels", "Solid"),
      stream("S-102", "GR-102", "HX-103", "Ground potato peel slurry", "Slurry"),
      stream("S-103", "HX-103", "LQ-201", "60 C liquefaction feed", "Slurry"),
      stream("S-201", "LQ-201", "SC-202", "Liquefied starch stream", "Slurry"),
      stream("S-202", "SC-202", "RVF-301", "Glucose-rich hydrolysate", "Slurry"),
      stream("S-301", "RVF-301", "SV-302", "Filtered glucose syrup", "Liquid"),
      stream("S-302", "RVF-301", "WH-801", "Cellulose filter cake", "Solid"),
      stream("S-303", "SV-302", "REG-303", "Syrup feed", "Liquid"),
      stream("S-304", "REG-303", "DF-401", "Diluted glucose feed", "Aqueous"),
      stream("S-401", "DF-401", "SP-402", "H2 CO2 off-gas sample", "Gas"),
      stream("S-402", "DF-401", "ST-403", "Acetate lactate liquid outlet", "Liquid"),
      stream("S-403", "ST-403", "AD-501", "Sterilized acid substrate", "Liquid"),
      stream("S-501", "AD-501", "MX-601", "CH4 CO2 biogas", "Gas"),
      stream("S-502", "SP-402", "MX-601", "H2 CO2 dark fermentation gas", "Gas"),
      stream("S-601", "MX-601", "ABS-701", "Mixed H2 CH4 CO2 gas", "Gas"),
      stream("S-701", "ABS-701", "QC-901", "H2 CH4 product gas", "Gas"),
      stream("S-702", "ABS-701", "DES-702", "CO2-rich DEA", "Liquid"),
      stream("S-703", "DES-702", "SPL-703", "Lean DEA", "Liquid"),
      stream("S-704", "SPL-703", "TS-704", "Recycle solvent loop", "Liquid"),
      stream("S-705", "TS-704", "ABS-701", "Converged lean solvent", "Liquid"),
      stream("S-706", "SPL-703", "WH-801", "Solvent purge", "Liquid"),
    ],
    costs: costs(18, 16, 24, 8, 34),
  },
  wastewater: {
    label: "Industrial Wastewater",
    description: "Equalization, pH control, clarification, activated sludge, disinfection, sludge dewatering",
    product: "Treated effluent",
    titer: 3,
    recovery: 92,
    batchSize: 150000,
    batchCount: 330,
    units: [
      unit("EQ-101", "equalization", 40, 80),
      unit("NT-201", "neutralization", 290, 80),
      unit("PC-301", "primary-clarifier", 540, 80),
      unit("AB-401", "aeration-basin", 790, 80, "Activated Sludge Basin"),
      unit("SC-501", "secondary-clarifier", 1040, 80),
      unit("UV-601", "uv-disinfection", 1290, 80),
      unit("TH-701", "sludge-thickener", 540, 265),
      unit("BFP-801", "belt-filter", 790, 265),
      unit("WH-901", "waste-hold", 1040, 265, "Dewatered Sludge Hold"),
      unit("QC-999", "qc", 1290, 265, "Effluent Compliance"),
    ],
    streams: [
      stream("S-101", "EQ-101", "NT-201", "Equalized wastewater", "Liquid"),
      stream("S-201", "NT-201", "PC-301", "Neutralized wastewater", "Liquid"),
      stream("S-301", "PC-301", "AB-401", "Primary clarified effluent", "Liquid"),
      stream("S-302", "PC-301", "TH-701", "Primary sludge", "Slurry"),
      stream("S-401", "AB-401", "SC-501", "Mixed liquor", "Slurry"),
      stream("S-501", "SC-501", "UV-601", "Clarified effluent", "Liquid"),
      stream("S-502", "SC-501", "TH-701", "Waste activated sludge", "Slurry"),
      stream("S-601", "UV-601", "QC-999", "Disinfected effluent", "Liquid"),
      stream("S-701", "TH-701", "BFP-801", "Thickened sludge", "Slurry"),
      stream("S-801", "BFP-801", "WH-901", "Dewatered sludge cake", "Solid"),
    ],
    costs: costs(8, 18, 38, 12, 24),
  },
  waterPurification: {
    label: "Water Purification",
    description: "Pretreatment, filtration, ion exchange, RO, UV, WFI-style utility release",
    product: "Purified water",
    titer: 1,
    recovery: 88,
    batchSize: 200000,
    batchCount: 330,
    units: [
      unit("EQ-101", "equalization", 40, 80, "Raw Water Break Tank"),
      unit("PF-201", "prefilter", 290, 80, "Multimedia Prefilter"),
      unit("ACB-301", "carbon-bed", 540, 80, "Activated Carbon Bed"),
      unit("IX-401", "ion-exchange", 790, 80),
      unit("RO-501", "reverse-osmosis", 1040, 80),
      unit("UV-601", "uv-disinfection", 1290, 80),
      unit("WFI-701", "wfi", 790, 265, "Purified Water/WFI Generation"),
      unit("CS-702", "clean-steam", 1040, 265, "Clean Steam Utility"),
      unit("QC-901", "qc", 1290, 265, "Conductivity TOC Bioburden"),
    ],
    streams: [
      stream("S-101", "EQ-101", "PF-201", "Raw water", "Aqueous"),
      stream("S-201", "PF-201", "ACB-301", "Prefiltered water", "Aqueous"),
      stream("S-301", "ACB-301", "IX-401", "Dechlorinated water", "Aqueous"),
      stream("S-401", "IX-401", "RO-501", "Softened water", "Aqueous"),
      stream("S-501", "RO-501", "UV-601", "RO permeate", "Aqueous"),
      stream("S-502", "RO-501", "EQ-101", "RO reject recycle", "Aqueous"),
      stream("S-601", "UV-601", "WFI-701", "Disinfected purified water", "Aqueous"),
      stream("S-701", "WFI-701", "CS-702", "WFI utility feed", "Aqueous"),
      stream("S-702", "WFI-701", "QC-901", "Released purified water", "Aqueous"),
    ],
    costs: costs(6, 12, 48, 10, 24),
  },
  airPollution: {
    label: "Air Pollution Control",
    description: "Cyclone, baghouse, scrubber, activated carbon, thermal oxidation, emissions reporting",
    product: "Treated exhaust",
    titer: 1,
    recovery: 95,
    batchSize: 120000,
    batchCount: 330,
    units: [
      unit("CY-101", "cyclone", 40, 80),
      unit("BH-201", "baghouse", 290, 80),
      unit("GS-301", "scrubber", 540, 80),
      unit("ACB-401", "carbon-bed", 790, 80),
      unit("TO-501", "thermal-oxidizer", 1040, 80),
      unit("FM-601", "flowmeter", 1290, 80, "Stack Flowmeter"),
      unit("PAT-602", "pat", 790, 265, "VOC and Particulate Analyzer"),
      unit("QC-901", "qc", 1040, 265, "EPA-MACT Report"),
      unit("WH-902", "waste-hold", 1290, 265, "Spent Media Waste"),
    ],
    streams: [
      stream("S-101", "CY-101", "BH-201", "Dust-laden exhaust", "Gas"),
      stream("S-201", "BH-201", "GS-301", "Particulate-reduced gas", "Gas"),
      stream("S-202", "BH-201", "WH-902", "Collected particulate", "Solid"),
      stream("S-301", "GS-301", "ACB-401", "Scrubbed gas", "Gas"),
      stream("S-401", "ACB-401", "TO-501", "VOC-polished gas", "Gas"),
      stream("S-402", "ACB-401", "WH-902", "Spent carbon", "Solid"),
      stream("S-501", "TO-501", "FM-601", "Oxidized exhaust", "Gas"),
      stream("S-601", "FM-601", "PAT-602", "Stack monitoring sample", "Gas"),
      stream("S-602", "PAT-602", "QC-901", "Emissions dataset", "Gas"),
    ],
    costs: costs(5, 14, 42, 16, 23),
  },
};

const detailLayers = {
  culturedMeat: {
    units: [
      unit("CB-001", "cell-bank", 40, 635, "Cell Bank Thaw"),
      unit("SK-010", "seed-flask", 290, 635, "Shake Flask Expansion"),
      unit("GM-201", "gas-mixing", 1040, 635, "O2/CO2 Gas Mix"),
      unit("PAT-201", "pat", 790, 635, "Metabolite PAT"),
      unit("SP-301", "sampling", 1290, 635, "Aseptic Harvest Sample"),
      unit("EM-901", "em", 40, 820, "Grade C/D Monitoring"),
      unit("CIP-901", "cip", 290, 820, "Wash/CIP Skid"),
      unit("WH-901", "waste-hold", 540, 820, "Cell Culture Waste Hold"),
      unit("CSG-902", "cold-storage", 790, 820, "Chilled Product Hold"),
      unit("LS-903", "labeling", 1040, 820, "Label and Serialization"),
    ],
    streams: [
      stream("D-001", "CB-001", "SK-010", "Thawed vial", "Slurry"),
      stream("D-002", "SK-010", "BR-101", "Flask seed culture", "Broth"),
      stream("D-003", "GM-201", "BR-201", "Sterile gas mix", "Gas"),
      stream("D-004", "BR-201", "PAT-201", "Glucose lactate pH sample", "Liquid"),
      stream("D-005", "CF-301", "SP-301", "Harvest IPC sample", "Slurry"),
      stream("D-006", "AF-501", "CSG-902", "Filled chilled product", "Solid"),
      stream("D-007", "CSG-902", "LS-903", "Released cold product", "Solid"),
      stream("D-008", "CIP-901", "PV-101", "CIP solution", "Aqueous"),
      stream("D-009", "BR-201", "WH-901", "Spent culture waste", "Broth"),
      stream("D-010", "EM-901", "QC-701", "EM trend report", "Solid"),
    ],
  },
  penicillin: {
    units: [
      unit("ST-001", "solvent-tank", 40, 635, "Butyl Acetate Tank Farm"),
      unit("pH-401", "ph-adjust", 290, 635, "Acid pH Adjustment"),
      unit("EX-401", "extractor", 540, 635, "Primary Solvent Extractor"),
      unit("PS-401", "phase-separator", 790, 635, "Raffinate Separator"),
      unit("PF-501", "prefilter", 1040, 635, "Crystal Prefilter"),
      unit("MS-602", "dryer-mill", 1290, 635, "Milling and Sieve"),
      unit("SP-801", "sampling", 40, 820, "API IPC Sample"),
      unit("WH-901", "waste-hold", 290, 820, "Solvent Waste Hold"),
      unit("DC-902", "distillation", 540, 820, "Solvent Recovery"),
      unit("CIP-903", "cip", 790, 820, "Extraction Train CIP"),
      unit("EM-904", "em", 1040, 820, "API Suite EM"),
    ],
    streams: [
      stream("D-001", "ST-001", "EX-401", "Extraction solvent", "Liquid"),
      stream("D-002", "DF-301", "pH-401", "Clarified acidic broth", "Liquid"),
      stream("D-003", "pH-401", "EX-401", "pH-adjusted filtrate", "Liquid"),
      stream("D-004", "EX-401", "PS-401", "Mixed solvent extract", "Liquid"),
      stream("D-005", "PS-401", "MX-402", "Separated organic product phase", "Liquid"),
      stream("D-006", "CR-501", "PF-501", "Crystal slurry guard filtration", "Slurry"),
      stream("D-007", "DR-601", "MS-602", "Dried API granules", "Solid"),
      stream("D-008", "MS-602", "PK-701", "Milled API", "Solid"),
      stream("D-009", "MS-602", "SP-801", "Blend uniformity sample", "Solid"),
      stream("D-010", "PS-401", "WH-901", "Spent solvent raffinate", "Liquid"),
      stream("D-011", "WH-901", "DC-902", "Solvent recovery feed", "Liquid"),
      stream("D-012", "CIP-903", "EX-401", "CIP solution", "Aqueous"),
      stream("D-013", "EM-904", "QC-801", "Environmental report", "Solid"),
    ],
  },
  antibody: {
    units: [
      unit("CB-001", "cell-bank", 40, 820, "WCB Thaw"),
      unit("SK-010", "seed-flask", 290, 820, "Shake Flask Seed"),
      unit("FT-202", "feed-tank", 540, 820, "Concentrated Feed Tank"),
      unit("GM-203", "gas-mixing", 790, 820, "Gas Overlay and Sparge"),
      unit("AD-204", "antifoam", 1040, 820, "Sterile Antifoam Dose"),
      unit("HH-301", "harvest-hold", 1290, 820, "Cold Harvest Hold"),
      unit("RP-400", "resin-prep", 40, 1005, "Protein A Resin Prep"),
      unit("BH-405", "bagging", 290, 1005, "Chrom Pool Bag Hold"),
      unit("PF-502", "prefilter", 540, 1005, "Virus Filter Prefilter"),
      unit("SP-610", "sampling", 790, 1005, "Drug Substance IPC"),
      unit("INS-803", "inspection", 1040, 1005, "Filled Vial Inspection"),
      unit("LS-804", "labeling", 1290, 1005, "Serialization"),
      unit("CSG-805", "cold-storage", 540, 1190, "2-8 C Storage"),
      unit("EM-999", "em", 790, 1190, "Grade A/B Monitoring"),
    ],
    streams: [
      stream("D-001", "CB-001", "SK-010", "Thawed CHO vial", "Slurry"),
      stream("D-002", "SK-010", "BR-101", "Shake flask seed", "Broth"),
      stream("D-003", "FT-202", "BR-201", "Concentrated nutrient feed", "Aqueous"),
      stream("D-004", "GM-203", "BR-201", "Air O2 CO2 overlay", "Gas"),
      stream("D-005", "AD-204", "BR-201", "Antifoam addition", "Liquid"),
      stream("D-006", "BR-201", "HH-301", "Timed harvest pool", "Broth"),
      stream("D-007", "HH-301", "CF-301", "Chilled harvest", "Broth"),
      stream("D-008", "RP-400", "PA-401", "Equilibrated Protein A resin", "Slurry"),
      stream("D-009", "CH-404", "BH-405", "Polish pool hold", "Liquid"),
      stream("D-010", "BH-405", "PF-502", "Conditioned pool", "Liquid"),
      stream("D-011", "PF-502", "VF-501", "Prefiltered viral safety feed", "Liquid"),
      stream("D-012", "UF-601", "SP-610", "DS release sample", "Liquid"),
      stream("D-013", "AF-802", "INS-803", "Filled vials", "Liquid"),
      stream("D-014", "INS-803", "LS-804", "Accepted vials", "Solid"),
      stream("D-015", "LS-804", "CSG-805", "Serialized drug product", "Solid"),
      stream("D-016", "EM-999", "QC-901", "EM batch record", "Solid"),
    ],
  },
  fermentation: {
    units: [
      unit("CA-001", "compressor", 40, 635, "Oil-Free Air"),
      unit("GM-002", "gas-mixing", 290, 635, "Sterile Aeration Skid"),
      unit("AD-003", "antifoam", 540, 635, "Antifoam Dose"),
      unit("PAT-004", "pat", 790, 635, "Off-Gas PAT"),
      unit("HH-302", "harvest-hold", 1040, 635, "Broth Surge Hold"),
      unit("SV-402", "surge-tank", 1290, 635, "Clarified Liquor Surge"),
      unit("PF-403", "polish-filter", 40, 820, "Recovery Polish Filter"),
      unit("ST-504", "solvent-tank", 290, 820, "Recovery Solvent Feed"),
      unit("SP-801", "sampling", 540, 820, "Final Product Sample"),
      unit("WH-901", "waste-hold", 790, 820, "Biomass Waste Hold"),
      unit("CIP-902", "cip", 1040, 820, "Fermentation CIP"),
      unit("EM-903", "em", 1290, 820, "Production Area EM"),
    ],
    streams: [
      stream("D-001", "CA-001", "GM-002", "Dry clean air", "Gas"),
      stream("D-002", "GM-002", "FR-201", "Sterile aeration", "Gas"),
      stream("D-003", "AD-003", "FR-201", "Antifoam feed", "Liquid"),
      stream("D-004", "FR-201", "PAT-004", "Off-gas analytics", "Gas"),
      stream("D-005", "FR-201", "HH-302", "Harvest transfer", "Broth"),
      stream("D-006", "HH-302", "CF-301", "Equalized broth", "Broth"),
      stream("D-007", "CF-301", "SV-402", "Clarified product liquor", "Liquid"),
      stream("D-008", "SV-402", "PF-403", "Surge outlet", "Liquid"),
      stream("D-009", "PF-403", "NF-401", "Polished liquor", "Liquid"),
      stream("D-010", "ST-504", "DC-501", "Recovery solvent", "Liquid"),
      stream("D-011", "FD-701", "SP-801", "Final product sample", "Solid"),
      stream("D-012", "CF-301", "WH-901", "Separated biomass", "Slurry"),
      stream("D-013", "CIP-902", "FR-201", "CIP return loop", "Aqueous"),
      stream("D-014", "EM-903", "QC-901", "EM batch record", "Solid"),
    ],
  },
  insulin: {
    units: [
      unit("CB-001", "cell-bank", 40, 635, "Microbial Cell Bank Thaw"),
      unit("SK-010", "seed-flask", 290, 635, "Shake Flask Seed"),
      unit("CA-011", "compressor", 540, 635, "Fermentation Air"),
      unit("pH-404", "ph-adjust", 790, 635, "Refold pH Control"),
      unit("BH-405", "bagging", 1040, 635, "Refold Hold Bag"),
      unit("PF-406", "prefilter", 1290, 635, "Column Guard Filter"),
      unit("RP-500", "resin-prep", 40, 820, "Resin Slurry Prep"),
      unit("SP-701", "sampling", 290, 820, "Crystal IPC"),
      unit("MS-802", "dryer-mill", 540, 820, "Mill and Sieve"),
      unit("WF-803", "weigh-fill", 790, 820, "Bulk Weigh Fill"),
      unit("EM-904", "em", 1040, 820, "API EM"),
      unit("WH-905", "waste-hold", 1290, 820, "Cell Debris Waste"),
    ],
    streams: [
      stream("D-001", "CB-001", "SK-010", "Thawed E. coli vial", "Slurry"),
      stream("D-002", "SK-010", "FR-101", "Seed culture", "Broth"),
      stream("D-003", "CA-011", "FR-201", "Sterile air", "Gas"),
      stream("D-004", "MX-403", "pH-404", "Refolding pool", "Liquid"),
      stream("D-005", "pH-404", "BH-405", "pH-controlled refold pool", "Liquid"),
      stream("D-006", "BH-405", "PF-406", "Held refold pool", "Liquid"),
      stream("D-007", "PF-406", "CH-501", "Filtered column feed", "Liquid"),
      stream("D-008", "RP-500", "CH-501", "Prepared chromatography resin", "Slurry"),
      stream("D-009", "CR-701", "SP-701", "Crystal sample", "Slurry"),
      stream("D-010", "DR-801", "MS-802", "Dry insulin cake", "Solid"),
      stream("D-011", "MS-802", "WF-803", "Milled insulin", "Solid"),
      stream("D-012", "WF-803", "QC-901", "Bulk filled insulin API", "Solid"),
      stream("D-013", "EM-904", "QC-901", "EM report", "Solid"),
      stream("D-014", "CF-402", "WH-905", "Cell debris", "Slurry"),
    ],
  },
  vaccine: {
    units: [
      unit("CB-001", "cell-bank", 40, 635, "Cell Bank Thaw"),
      unit("SK-010", "seed-flask", 290, 635, "Spinner Flask Seed"),
      unit("GM-202", "gas-mixing", 540, 635, "CO2 Overlay"),
      unit("PAT-203", "pat", 790, 635, "Virus Titer PAT"),
      unit("HH-301", "harvest-hold", 1040, 635, "Virus Harvest Hold"),
      unit("PF-303", "prefilter", 1290, 635, "Clarification Guard Filter"),
      unit("BH-601", "bagging", 40, 820, "Antigen Pool Bag"),
      unit("SP-701", "sampling", 290, 820, "Sterility and Potency Sample"),
      unit("IS-902", "isolator", 540, 820, "Vial Fill Isolator"),
      unit("INS-903", "inspection", 790, 820, "Vial Inspection"),
      unit("LS-904", "labeling", 1040, 820, "Label and Carton"),
      unit("CSG-905", "cold-storage", 1290, 820, "Cold Chain Storage"),
      unit("EM-999", "em", 540, 1005, "Aseptic EM"),
    ],
    streams: [
      stream("D-001", "CB-001", "SK-010", "Thawed vial", "Slurry"),
      stream("D-002", "SK-010", "WB-101", "Spinner seed", "Broth"),
      stream("D-003", "GM-202", "PB-201", "Gas overlay", "Gas"),
      stream("D-004", "PB-201", "PAT-203", "Virus titer sample", "Liquid"),
      stream("D-005", "PB-201", "HH-301", "Virus harvest", "Broth"),
      stream("D-006", "HH-301", "DF-301", "Chilled harvest", "Broth"),
      stream("D-007", "DF-301", "PF-303", "Depth filtrate", "Liquid"),
      stream("D-008", "PF-303", "MF-302", "Guard-filtered harvest", "Liquid"),
      stream("D-009", "CH-601", "BH-601", "Purified antigen pool", "Liquid"),
      stream("D-010", "BH-601", "SF-701", "Held antigen pool", "Liquid"),
      stream("D-011", "SF-701", "SP-701", "Sterile bulk sample", "Liquid"),
      stream("D-012", "FV-801", "IS-902", "Formulated vaccine bulk", "Liquid"),
      stream("D-013", "IS-902", "AF-901", "Isolator fill transfer", "Liquid"),
      stream("D-014", "AF-901", "INS-903", "Filled vials", "Liquid"),
      stream("D-015", "INS-903", "LS-904", "Accepted vials", "Solid"),
      stream("D-016", "LS-904", "CSG-905", "Serialized cold-chain product", "Solid"),
      stream("D-017", "EM-999", "QC-999", "Aseptic EM report", "Solid"),
    ],
  },
  plasmid: {
    units: [
      unit("CB-001", "cell-bank", 40, 635, "E. coli Cell Bank Thaw"),
      unit("SK-010", "seed-flask", 290, 635, "Seed Flask"),
      unit("CA-011", "compressor", 540, 635, "Compressed Air"),
      unit("pH-402", "ph-adjust", 790, 635, "Neutralization Control"),
      unit("PF-403", "prefilter", 1040, 635, "Lysate Guard Filter"),
      unit("BH-504", "bagging", 1290, 635, "Conditioned Lysate Hold"),
      unit("RP-600", "resin-prep", 40, 820, "AEX Resin Prep"),
      unit("NF-702", "nanofilter", 290, 820, "Endotoxin Reduction NF"),
      unit("SP-803", "sampling", 540, 820, "pDNA IPC Sample"),
      unit("CSG-804", "cold-storage", 790, 820, "Frozen DS Hold"),
      unit("WH-901", "waste-hold", 1040, 820, "Cell Debris Waste"),
      unit("EM-902", "em", 1290, 820, "Gene Therapy EM"),
    ],
    streams: [
      stream("D-001", "CB-001", "SK-010", "Thawed cell bank", "Slurry"),
      stream("D-002", "SK-010", "FR-101", "Seed inoculum", "Broth"),
      stream("D-003", "CA-011", "FR-201", "Sterile air", "Gas"),
      stream("D-004", "MX-401", "pH-402", "Alkaline lysate", "Slurry"),
      stream("D-005", "pH-402", "DF-402", "Neutralized lysate", "Slurry"),
      stream("D-006", "DF-402", "PF-403", "Clarified lysate", "Liquid"),
      stream("D-007", "PF-403", "BH-504", "Guard-filtered lysate", "Liquid"),
      stream("D-008", "BH-504", "UF-501", "Conditioned lysate", "Liquid"),
      stream("D-009", "RP-600", "CH-601", "Prepared AEX resin", "Slurry"),
      stream("D-010", "UF-701", "NF-702", "Concentrated pDNA", "Liquid"),
      stream("D-011", "NF-702", "EM-801", "Endotoxin-reduced pDNA", "Liquid"),
      stream("D-012", "SF-802", "SP-803", "Sterile pDNA sample", "Liquid"),
      stream("D-013", "SF-802", "CSG-804", "Sterile pDNA DS", "Liquid"),
      stream("D-014", "CF-301", "WH-901", "Biomass waste", "Slurry"),
      stream("D-015", "EM-902", "QC-901", "EM report", "Solid"),
    ],
  },
  cellTherapy: {
    units: [
      unit("CSG-001", "cold-storage", 40, 450, "Incoming Cryoshipper"),
      unit("CB-002", "cell-bank", 290, 450, "Patient Material Thaw"),
      unit("SP-003", "sampling", 540, 450, "Identity Sample"),
      unit("GM-302", "gas-mixing", 790, 450, "Incubator Gas Mix"),
      unit("PAT-303", "pat", 1040, 450, "Viability PAT"),
      unit("BH-602", "bagging", 1290, 450, "Washed Cell Hold Bag"),
      unit("IS-802", "isolator", 40, 635, "Cryobag Fill Isolator"),
      unit("INS-803", "inspection", 290, 635, "Bag Integrity Inspection"),
      unit("CSG-804", "cold-storage", 540, 635, "Vapor Phase LN2 Storage"),
      unit("LS-805", "labeling", 790, 635, "Chain-of-Identity Labeling"),
      unit("EM-902", "em", 1040, 635, "Grade A/B EM"),
      unit("WH-903", "waste-hold", 1290, 635, "Biohazard Waste Hold"),
    ],
    streams: [
      stream("D-001", "CSG-001", "QC-001", "Controlled receipt", "Solid"),
      stream("D-002", "QC-001", "CB-002", "Released starting material", "Slurry"),
      stream("D-003", "CB-002", "SP-003", "Identity sample", "Slurry"),
      stream("D-004", "CB-002", "WB-101", "Thawed patient cells", "Slurry"),
      stream("D-005", "GM-302", "BR-301", "Incubator atmosphere", "Gas"),
      stream("D-006", "BR-301", "PAT-303", "Viability and density read", "Liquid"),
      stream("D-007", "UF-601", "BH-602", "Washed concentrated cells", "Slurry"),
      stream("D-008", "BH-602", "FV-701", "Held cells", "Slurry"),
      stream("D-009", "FV-701", "IS-802", "Cryoformulated cells", "Slurry"),
      stream("D-010", "IS-802", "AF-801", "Isolated fill transfer", "Slurry"),
      stream("D-011", "AF-801", "INS-803", "Filled cryobags", "Solid"),
      stream("D-012", "INS-803", "LS-805", "Accepted cryobags", "Solid"),
      stream("D-013", "LS-805", "CSG-804", "COI-labeled dose", "Solid"),
      stream("D-014", "EM-902", "QC-901", "EM batch record", "Solid"),
      stream("D-015", "PV-201", "WH-903", "Biohazard waste", "Slurry"),
    ],
  },
  api: {
    units: [
      unit("ST-001", "solvent-tank", 40, 635, "Solvent Tank Farm"),
      unit("pH-201", "ph-adjust", 290, 635, "Charge pH Adjustment"),
      unit("SV-303", "surge-tank", 540, 635, "Reaction Quench Hold"),
      unit("PF-403", "polish-filter", 790, 635, "Organic Polish Filter"),
      unit("ST-404", "solvent-tank", 1040, 635, "Wash Solvent Tank"),
      unit("PF-502", "prefilter", 1290, 635, "Crystallizer Guard Filter"),
      unit("MS-702", "dryer-mill", 40, 820, "Mill and Sieve"),
      unit("SP-703", "sampling", 290, 820, "Particle Size IPC"),
      unit("WF-804", "weigh-fill", 540, 820, "Drum Weigh Fill"),
      unit("WH-901", "waste-hold", 790, 820, "Mother Liquor Waste"),
      unit("CIP-902", "cip", 1040, 820, "API Train Cleaning"),
      unit("EM-903", "em", 1290, 820, "API Suite EM"),
    ],
    streams: [
      stream("D-001", "ST-001", "MX-201", "Solvent charge", "Liquid"),
      stream("D-002", "MX-201", "pH-201", "Prepared reaction feed", "Liquid"),
      stream("D-003", "pH-201", "BR-301", "pH-adjusted charge", "Liquid"),
      stream("D-004", "HX-302", "SV-303", "Cooled reaction mass", "Liquid"),
      stream("D-005", "SV-303", "EX-401", "Quench feed", "Liquid"),
      stream("D-006", "PS-402", "PF-403", "Organic phase", "Liquid"),
      stream("D-007", "PF-403", "CR-501", "Polished crystallization feed", "Liquid"),
      stream("D-008", "ST-404", "PS-402", "Wash solvent", "Liquid"),
      stream("D-009", "CR-501", "PF-502", "Seeded crystal slurry", "Slurry"),
      stream("D-010", "PF-502", "FD-601", "Guard-filtered slurry", "Slurry"),
      stream("D-011", "FD-601", "MS-702", "Dry API cake", "Solid"),
      stream("D-012", "MS-702", "SP-703", "PSD sample", "Solid"),
      stream("D-013", "MS-702", "WF-804", "Milled API", "Solid"),
      stream("D-014", "WF-804", "PK-801", "Filled drums", "Solid"),
      stream("D-015", "DC-701", "WH-901", "Distillation bottoms", "Liquid"),
      stream("D-016", "CIP-902", "BR-301", "Validated cleaning cycle", "Aqueous"),
      stream("D-017", "EM-903", "QC-901", "EM release report", "Solid"),
    ],
  },
};

Object.entries(detailLayers).forEach(([key, layer]) => {
  templates[key].units.push(...layer.units);
  templates[key].streams.push(...layer.streams);
  templates[key].description = `${templates[key].description}; detailed utilities, IPC, holds, waste, and release controls`;
});

const manualInfrastructureLayer = {
  units: [
    unit("CAT-950", "cleaning-agent", 40, 1375, "Cleaning Agent Prep"),
    unit("RWT-951", "rinse-water", 290, 1375, "Final Rinse Hold"),
    unit("CIP-952", "cip", 540, 1375, "CIP Supply Skid"),
    unit("CIPR-953", "cip-return", 790, 1375, "CIP Return and Neutralization"),
    unit("SIP-954", "sip", 1040, 1375, "SIP/Clean Steam Panel"),
    unit("HR-960", "heat-recovery", 40, 1560, "Heat Reuse Exchanger"),
    unit("HTA-961", "heat-agent", 290, 1560, "Heat Transfer Agent Loop"),
    unit("CRN-962", "condensate-return", 540, 1560, "Condensate Return"),
    unit("SPL-970", "splitter", 790, 1560, "Recycle/Purge Splitter"),
    unit("TS-971", "tear-stream", 1040, 1560, "Recycle Convergence Tear"),
    unit("MI-980", "material-inventory", 40, 1745, "Material Inventory Chart"),
    unit("PM-981", "power-meter", 290, 1745, "Power Demand/Generation"),
    unit("WR-982", "water-reuse", 540, 1745, "Water Reuse and Reject Routing"),
    unit("SRC-983", "solvent-recycle", 790, 1745, "Solvent Recycle/Purge"),
    unit("RPT-990", "report-set", 1040, 1745, "SR/EER/AUX/CIP-SIP Report Set"),
  ],
  streams: [
    stream("M-CIP-001", "CAT-950", "CIP-952", "Caustic acid cleaning agent supply", "Aqueous"),
    stream("M-CIP-002", "RWT-951", "CIP-952", "Final rinse water", "Aqueous"),
    stream("M-CIP-003", "CIP-952", "CIPR-953", "Spent CIP return", "Aqueous"),
    stream("M-SIP-004", "SIP-954", "CIP-952", "Sterile steam and condensate", "Gas"),
    stream("M-HR-001", "HR-960", "HTA-961", "Recovered heat transfer agent", "Liquid"),
    stream("M-HR-002", "SIP-954", "CRN-962", "Clean steam condensate return", "Liquid"),
    stream("M-RCY-001", "SPL-970", "TS-971", "Recycle tear stream convergence", "Liquid"),
    stream("M-RCY-002", "SRC-983", "SPL-970", "Recovered solvent recycle", "Liquid"),
    stream("M-WR-001", "WR-982", "SPL-970", "Water reuse recycle with purge", "Aqueous"),
    stream("M-RPT-001", "MI-980", "RPT-990", "Material inventory and storage report", "Solid"),
    stream("M-RPT-002", "PM-981", "RPT-990", "Power demand and generation report", "Solid"),
    stream("M-RPT-003", "CIPR-953", "RPT-990", "CIP/SIP cycle report", "Solid"),
  ],
};

Object.values(templates).forEach((template) => {
  template.units.push(...clone(manualInfrastructureLayer.units));
  template.streams.push(...clone(manualInfrastructureLayer.streams));
  template.description = `${template.description}; CIP/SIP, recycle, heat-reuse, resource inventory, and report infrastructure`;
});

const flagshipCulturedMeatFacility = {
  units: [
    unit("DOCK-001", "storage", 1540, 80, "GMP Raw Material Dock"),
    unit("WB-102", "weigh-scale", 1790, 80, "Barcode Weigh and Dispense"),
    unit("SUM-103", "single-use-mixer", 2040, 80, "Growth Factor Premix"),
    unit("WFI-104", "wfi", 2290, 80, "Ring Main WFI Loop"),
    unit("CS-105", "clean-steam", 2540, 80, "Clean Steam Header"),
    unit("HVAC-106", "hvac", 2790, 80, "Grade C/D HVAC Suite"),
    unit("FT-210", "feed-tank", 1540, 265, "Sterile Feed Concentrate"),
    unit("P-211", "pump", 1790, 285, "Feed Transfer Pump"),
    unit("CV-212", "control-valve", 1960, 285, "Feed Control Valve"),
    unit("FM-213", "flowmeter", 2130, 285, "Feed Coriolis Meter"),
    unit("BR-202", "production-reactor", 2290, 265, "Production STR Parallel A"),
    unit("BR-203", "production-reactor", 2540, 265, "Production STR Parallel B"),
    unit("GM-214", "gas-mixing", 2790, 265, "Sterile Gas Manifold"),
    unit("SENS-215", "sensor", 3040, 285, "Inline DO pH Biomass Sensor"),
    unit("HH-310", "harvest-hold", 1540, 450, "Temperature Controlled Harvest Hold"),
    unit("MF-311", "microfilter", 1790, 450, "Harvest Guard Microfilter"),
    unit("MAN-312", "manifold", 2040, 470, "Downstream Transfer Manifold"),
    unit("PF-313", "prefilter", 2210, 450, "Bioburden Reduction Prefilter"),
    unit("UF-314", "ufdf", 2460, 450, "Concentration and Wash TFF"),
    unit("SP-315", "sampling", 2710, 470, "IPC Microbiology Sample"),
    unit("FV-410", "formulation", 1540, 635, "Texturization and Final Blend"),
    unit("IS-411", "isolator", 1790, 635, "Aseptic Filling Isolator"),
    unit("AF-412", "sterile-fill", 2040, 635, "Tray Fill and Seal"),
    unit("INS-413", "inspection", 2290, 635, "Vision and Weight Inspection"),
    unit("CSG-414", "cold-storage", 2540, 635, "2-8 C Dispatch Cold Room"),
    unit("QC-415", "qc", 2790, 635, "Rapid Sterility Release"),
    unit("CAT-510", "cleaning-agent", 1540, 820, "CIP Chemical Make-Up"),
    unit("CIP-511", "cip", 1790, 820, "Mobile CIP Cart"),
    unit("CIPR-512", "cip-return", 2040, 820, "Spent CIP Return Header"),
    unit("WI-513", "waste-inactivation", 2290, 820, "Liquid Bio-Waste Kill Tank"),
    unit("WR-514", "water-reuse", 2540, 820, "Rinse Water Recovery"),
    unit("HR-515", "heat-recovery", 2790, 820, "Warm Effluent Heat Recovery"),
    unit("PM-610", "power-meter", 1540, 1005, "Electrical Demand Meter"),
    unit("PX-611", "process-explorer", 1790, 1005, "Plant Overview Navigator"),
    unit("RPT-612", "report-set", 2040, 1005, "Batch Record and KPI Reports"),
    unit("VO-613", "visual-object", 2290, 1005, "Suite Boundary and Pressure Cascade"),
  ],
  streams: [
    stream("F-001", "DOCK-001", "WB-102", "Released raw materials", "Solid"),
    stream("F-002", "WB-102", "SUM-103", "Dispensed supplements", "Solid"),
    stream("F-003", "WFI-104", "SUM-103", "WFI for premix", "Aqueous"),
    stream("F-004", "SUM-103", "PV-101", "Concentrated supplement premix", "Aqueous"),
    stream("F-005", "WFI-104", "FT-210", "Sterile feed water", "Aqueous"),
    stream("F-006", "FT-210", "P-211", "Feed concentrate", "Aqueous"),
    stream("F-007", "P-211", "CV-212", "Pressurized feed", "Aqueous"),
    stream("F-008", "CV-212", "FM-213", "Controlled feed", "Aqueous"),
    stream("F-009", "FM-213", "BR-202", "Metered feed to STR A", "Aqueous"),
    stream("F-010", "FM-213", "BR-203", "Metered feed to STR B", "Aqueous"),
    stream("F-011", "BR-201", "BR-202", "Production inoculum split", "Broth"),
    stream("F-012", "BR-201", "BR-203", "Parallel production inoculum", "Broth"),
    stream("F-013", "GM-214", "BR-202", "Sterile O2 CO2 gas", "Gas"),
    stream("F-014", "GM-214", "BR-203", "Sterile O2 CO2 gas", "Gas"),
    stream("F-015", "BR-202", "SENS-215", "STR A PAT signal", "Liquid"),
    stream("F-016", "BR-203", "SENS-215", "STR B PAT signal", "Liquid"),
    stream("F-017", "BR-202", "HH-310", "Harvest broth A", "Broth"),
    stream("F-018", "BR-203", "HH-310", "Harvest broth B", "Broth"),
    stream("F-019", "HH-310", "MF-311", "Pooled chilled harvest", "Broth"),
    stream("F-020", "MF-311", "MAN-312", "Guard-filtered harvest", "Liquid"),
    stream("F-021", "MAN-312", "PF-313", "Downstream feed", "Liquid"),
    stream("F-022", "PF-313", "UF-314", "Low-bioburden harvest", "Liquid"),
    stream("F-023", "UF-314", "SP-315", "Concentrated IPC sample", "Liquid"),
    stream("F-024", "UF-314", "FV-410", "Concentrated washed biomass", "Slurry"),
    stream("F-025", "FV-410", "IS-411", "Final blend to isolator", "Slurry"),
    stream("F-026", "IS-411", "AF-412", "Aseptic protected fill feed", "Slurry"),
    stream("F-027", "AF-412", "INS-413", "Filled trays", "Solid"),
    stream("F-028", "INS-413", "CSG-414", "Accepted chilled product", "Solid"),
    stream("F-029", "CSG-414", "QC-415", "Cold-chain release sample", "Solid"),
    stream("F-030", "QC-415", "QC-701", "Release result", "Solid"),
    stream("F-031", "CAT-510", "CIP-511", "Validated cleaning chemicals", "Aqueous"),
    stream("F-032", "CS-105", "CIP-511", "Clean steam assist", "Gas"),
    stream("F-033", "CIP-511", "BR-202", "CIP supply to STR A", "Aqueous"),
    stream("F-034", "CIP-511", "BR-203", "CIP supply to STR B", "Aqueous"),
    stream("F-035", "BR-202", "CIPR-512", "Spent CIP return A", "Aqueous"),
    stream("F-036", "BR-203", "CIPR-512", "Spent CIP return B", "Aqueous"),
    stream("F-037", "CIPR-512", "WI-513", "Spent cleaning waste", "Aqueous"),
    stream("F-038", "WI-513", "WR-514", "Inactivated wastewater", "Aqueous"),
    stream("F-039", "WR-514", "HR-515", "Warm rinse reuse loop", "Aqueous"),
    stream("F-040", "HR-515", "WFI-104", "Recovered heat credit", "Liquid"),
    stream("F-041", "HVAC-106", "EM-901", "Cleanroom pressure and particle data", "Gas"),
    stream("F-042", "SENS-215", "PX-611", "Live PAT and controls data", "Liquid"),
    stream("F-043", "PM-610", "RPT-612", "Energy demand report", "Solid"),
    stream("F-044", "PX-611", "RPT-612", "Model navigation snapshot", "Solid"),
    stream("F-045", "VO-613", "RPT-612", "Suite boundary annotation", "Solid"),
  ],
};

templates.culturedMeat.units.push(...flagshipCulturedMeatFacility.units);
templates.culturedMeat.streams.push(...flagshipCulturedMeatFacility.streams);
templates.culturedMeat.description = `${templates.culturedMeat.description}; flagship industrial plant with parallel STRs, GMP suite utilities, pressure cascade, PAT, CIP return, cold-chain, and reporting layers`;

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
  eq("Batch mass balance", "mass", "m_charge + m_feed - m_harvest - m_waste - m_hold = 0", "Closed batch-level mass balance across charge, feeds, harvest, waste, and hold-up."),
  eq("Continuous mass balance", "mass", "dM/dt = F_in - F_out + R_generation - R_consumption", "Dynamic mass balance for continuous or semi-continuous unit operations."),
  eq("Yield from limiting substrate", "mass", "m_product = m_substrate * Y_PS * conversion * recovery", "Product mass estimated from substrate-to-product yield and downstream recovery."),
  eq("Cell harvest recovery", "mass", "m_recovered = m_broth * X_cells * eta_clarification * eta_wash", "Recovered cell mass after clarification and washing."),
  eq("Wet cake solids", "mass", "m_wet_cake = m_dry_solids / solids_fraction", "Wet cake mass from dry solids and cake solids fraction."),
  eq("Mother liquor loss", "mass", "m_loss = V_mother_liquor * C_product", "Product loss remaining in mother liquor after crystallization or filtration."),
  eq("Buffer dilution", "mass", "C_final = (C_stock * V_stock) / V_final", "Dilution equation for buffer and media stock preparation."),
  eq("Osmolality blend", "mass", "Osm_final = sum(Osm_i * V_i) / sum(V_i)", "Weighted blend estimate for osmolality in formulation or media prep."),
  eq("Seed train volume ratio", "mass", "V_next = V_seed / inoculation_fraction", "Bioreactor scale-up volume from target inoculation fraction."),
  eq("Viable cell balance", "mass", "dXv/dt = (mu - kd - D) * Xv", "Viable cell balance with growth, death, and dilution."),
  eq("Total cell balance", "mass", "dXt/dt = mu*Xv - D*Xt", "Total cell density balance including dilution."),
  eq("Perfusion bleed", "mass", "F_bleed = (mu - D_target) * V", "Bleed flow required to maintain a target cell-specific dilution behavior."),
  eq("Perfusion harvest", "mass", "F_harvest = D * V - F_bleed", "Harvest flow from perfusion dilution rate minus bleed."),
  eq("Inclusion body recovery", "mass", "m_IB = m_cell_paste * f_IB * eta_disruption * eta_recovery", "Inclusion body mass recovered after microbial cell disruption."),
  eq("Alkaline lysis load", "mass", "m_pDNA = V_lysis * C_pDNA * eta_clarification", "pDNA amount after alkaline lysis and clarification."),
  eq("Vector transduction", "mass", "cells_transduced = cells_in * MOI_response * viability", "Simplified cell therapy transduction output."),
  eq("Reaction conversion", "mass", "X_A = (n_A0 - n_A) / n_A0", "Reactant conversion in small-molecule API synthesis."),
  eq("Selectivity", "mass", "S_PB = n_product / n_byproduct", "Reaction selectivity toward desired product over byproduct."),
  eq("Stoichiometric reagent charge", "mass", "m_reagent = n_limiting * equivalents * MW_reagent / purity", "GMP charge calculation corrected for equivalents, molecular weight, and purity."),
  eq("Solvent swap", "mass", "N_diavolumes = ln(C_initial / C_target)", "Solvent or buffer exchange estimate by diafiltration-like dilution."),
  eq("General energy balance", "energy", "dU/dt = Q - W + sum(F_in*h_in) - sum(F_out*h_out) + Q_rxn", "General open-system energy balance."),
  eq("Reaction heat", "energy", "Q_rxn = n_reacted * DeltaH_rxn", "Heat released or absorbed by chemical or biochemical reaction."),
  eq("Heat exchanger area", "energy", "A = Q / (U * LMTD)", "Heat exchanger sizing from duty, overall heat-transfer coefficient, and log-mean temperature difference."),
  eq("LMTD", "energy", "LMTD = (DeltaT1 - DeltaT2) / ln(DeltaT1 / DeltaT2)", "Log-mean temperature difference for heat exchanger calculations."),
  eq("Sterilization F0", "energy", "F0 = integral(10^((T(t)-121.1)/z) dt)", "Moist-heat sterilization lethality integral."),
  eq("SIP steam use", "energy", "m_steam = (m_metal*Cp_metal*DeltaT + m_condensate*lambda) / lambda_steam", "Approximate steam demand for SIP heat-up and condensation."),
  eq("Autoclave heat load", "energy", "Q = m_load*Cp*DeltaT + m_water*lambda + Q_losses", "Moist-heat sterilizer duty estimate."),
  eq("Lyophilization sublimation", "energy", "Q_sub = m_ice * DeltaH_sublimation", "Primary drying heat duty for freeze drying."),
  eq("Dryer evaporation duty", "energy", "Q_evap = m_solvent_removed * DeltaH_vap / eta_dryer", "Vacuum dryer evaporation duty corrected by efficiency."),
  eq("Distillation reboiler duty", "energy", "Q_reb = V_dot * lambda + sensible_heat", "Reboiler duty approximation for solvent recovery."),
  eq("Compressor air power", "energy", "P_air = n_dot * R*T/(eta*(k-1)) * ((P2/P1)^((k-1)/k)-1)", "Compressed air power for aeration service."),
  eq("Chiller duty", "energy", "P_chiller = Q_cooling / COP", "Electrical power for process cooling."),
  eq("Jacket heat transfer", "energy", "Q = U * A_jacket * (T_jacket - T_process)", "Reactor jacket heating or cooling transfer."),
  eq("Metabolic heat", "energy", "Q_metabolic = OUR * V * 460 kJ/mol_O2", "Bioreactor metabolic heat estimated from oxygen uptake."),
  eq("Filter capacity", "separation", "A_filter = m_solids / solids_loading_capacity", "Filter area sizing from solids loading capacity."),
  eq("Constant-pressure filtration", "separation", "t/V = (mu*alpha*C/(2*A^2*DeltaP))*V + mu*Rm/(A*DeltaP)", "Cake filtration equation for constant-pressure operation."),
  eq("Depth filter throughput", "separation", "V_max = A * throughput_L_per_m2", "Depth filter capacity from area and validated throughput."),
  eq("Sterile filter flux decay", "separation", "J(t) = J0 / (1 + k_fouling*t)", "Simple fouling-based flux decline for sterile filtration."),
  eq("Membrane rejection", "separation", "R = 1 - C_permeate / C_retentate", "Membrane rejection for UF/NF/virus filtration."),
  eq("TFF permeate flow", "separation", "Q_p = J * A_membrane", "Permeate flow from membrane flux and area."),
  eq("TFF concentration time", "separation", "t = (V_initial - V_final) / Q_p", "Time to concentrate by tangential-flow filtration."),
  eq("Column bed height", "separation", "H_bed = V_resin / column_area", "Chromatography bed height from resin volume and column area."),
  eq("Residence time in column", "separation", "tau = V_column / Q_load", "Column residence time during loading."),
  eq("Breakthrough loading", "separation", "m_loaded = DBC_10pct * V_resin * safety_factor", "Allowable load before breakthrough based on dynamic binding capacity."),
  eq("Elution pool concentration", "separation", "C_pool = m_product_eluted / V_elution_pool", "Eluate concentration after chromatography."),
  eq("Viral clearance", "separation", "LRV_total = sum(LRV_step_i)", "Overall viral clearance as sum of validated log reduction values."),
  eq("Low-pH viral inactivation", "kinetics", "log10(N0/N) = k_inactivation * t", "First-order viral inactivation model expressed as log reduction."),
  eq("Crystallizer supersaturation", "separation", "S = C / C_sat(T)", "Supersaturation ratio driving nucleation and crystal growth."),
  eq("Nucleation rate", "kinetics", "B = k_b * (S - 1)^b", "Empirical crystallization nucleation rate."),
  eq("Crystal growth rate", "kinetics", "G = k_g * (S - 1)^g", "Empirical crystal growth rate."),
  eq("Liquid-liquid partition", "separation", "K_D = C_org / C_aq", "Distribution coefficient for extraction."),
  eq("Extraction stage recovery", "separation", "E = K_D * V_org / (K_D * V_org + V_aq)", "Single-stage extraction fraction to organic phase."),
  eq("Multi-stage extraction", "separation", "R_total = 1 - (1 - E)^N", "Overall recovery across ideal repeated extraction stages."),
  eq("Distillation relative volatility", "separation", "alpha = (y_A/x_A) / (y_B/x_B)", "Relative volatility for binary distillation."),
  eq("Minimum reflux", "separation", "R_min = x_D/(alpha-1) * ((alpha*x_F)/(x_D-x_F) - 1)", "Approximate binary minimum reflux relationship."),
  eq("Cleanroom air changes", "energy", "ACH = Q_air * 3600 / room_volume", "Cleanroom air-change rate from supply flow and room volume."),
  eq("HEPA pressure power", "energy", "P_fan = Q_air * DeltaP_filter / eta_fan", "Fan power for HEPA filtration pressure drop."),
  eq("Environmental monitoring rate", "mass", "samples_per_batch = points * frequencies * batch_duration", "EM sampling workload estimate."),
  eq("CIP solution volume", "mass", "V_CIP = pipe_volume * turnover_factor + vessel_spray_volume", "CIP solution volume estimate."),
  eq("CIP caustic mass", "mass", "m_NaOH = V_CIP * C_NaOH * rho_solution", "Caustic mass required for CIP solution preparation."),
  eq("CIP heat duty", "energy", "Q_CIP = m_solution * Cp * (T_CIP - T_initial)", "CIP heat-up duty."),
  eq("Cleaning acceptance", "mass", "MACO = min(ADI_based_limit, dose_based_limit, 10ppm_limit)", "Maximum allowable carryover basis for cleaning validation."),
  eq("Bioburden hold", "kinetics", "N(t) = N0 * exp(mu_bioburden * t_hold)", "Bioburden growth risk during process hold."),
  eq("Aseptic fill yield", "mass", "N_good = N_filled * (1 - reject_rate) * sterility_assurance_factor", "Good filled units after inspection/rejects."),
  eq("Vial count", "mass", "N_vials = V_bulk * fill_yield / fill_volume", "Filled-unit count from bulk volume and fill volume."),
  eq("OEE", "economics", "OEE = availability * performance * quality", "Overall equipment effectiveness for production scheduling."),
  eq("Line occupancy", "economics", "occupancy = required_hours / available_hours", "Facility or line capacity utilization."),
  eq("Campaign output", "economics", "M_campaign = M_batch * batches_per_campaign * success_rate", "Expected campaign output including success probability."),
  eq("Raw material cost", "economics", "C_raw = sum(m_i * price_i / purity_i)", "Raw material cost corrected for purity."),
  eq("Utility cost", "economics", "C_util = steam*price_steam + chilled_water*price_cw + electricity*price_kWh", "Combined utility operating cost."),
  eq("Waste treatment cost", "economics", "C_waste = V_liquid*price_liquid + m_solid*price_solid + biohazard_factor", "Waste cost estimate including hazardous or bioactive factor."),
  eq("Labor cost", "economics", "C_labor = operators * hours * loaded_rate", "Direct labor cost for a batch or campaign."),
  eq("Depreciation charge", "economics", "C_dep_batch = installed_capital / useful_life_batches", "Batch depreciation charge."),
  eq("Net present value", "economics", "NPV = sum(CF_t / (1+r)^t) - CAPEX", "Project net present value."),
  eq("Payback period", "economics", "payback = CAPEX / annual_cash_flow", "Simple payback period estimate."),
  eq("Process mass intensity", "economics", "PMI = total_mass_inputs / mass_API", "Green chemistry process mass intensity."),
  eq("E-factor", "economics", "E_factor = mass_waste / mass_product", "Waste intensity metric."),
  eq("Water intensity", "economics", "WI = water_used / kg_product", "Water use per product mass."),
  eq("Carbon intensity", "economics", "CI = sum(activity_i * emission_factor_i) / kg_product", "Scope-relevant process carbon intensity estimate."),
  eq("SPD kinetic productivity", "kinetics", "q_C = (alpha*mu_max*S1*S2*S3 + beta) * X", "SuperPro-style volumetric productivity for kinetic fermentation with up to three multiplicative growth or inhibition terms."),
  eq("Luedeking-Piret product", "kinetics", "q_P = alpha*dX/dt + beta*X", "Growth-associated and non-growth-associated product formation used to represent product rather than biomass formation."),
  eq("Critical osmolarity inhibition", "kinetics", "I_osm = 1 - (OSM / OSM_crit)^n_osm", "Dark-fermentation osmotic inhibition from acetate, lactate, glucose, and other dissolved species."),
  eq("Hydrogen inhibition", "kinetics", "I_H2 = 1 - (H2_aq / H2_aq,crit)^n_H2", "Dissolved hydrogen inhibition term for C. saccharolyticus dark fermentation."),
  eq("DF specific growth", "kinetics", "mu = mu_max * G/(G + K_G) * I_osm * I_H2", "Dark-fermentation growth model combining Monod glucose limitation with osmotic and hydrogen inhibition."),
  eq("Haldane inhibition", "kinetics", "mu = mu_max * S / (K_S + S + S^2/K_I)", "Substrate inhibition model available as an alternative to simple Monod kinetics."),
  eq("First order formation", "kinetics", "r_P = k * C_reference", "Simplified product formation used when full product or by-product inhibition cannot be modeled."),
  eq("Zeroth order formation", "kinetics", "r_P = k", "Constant product formation independent of concentration."),
  eq("CSTR dilution", "mass", "D = F / V", "Continuous stirred-tank dilution rate from volumetric feed and reactor volume."),
  eq("CSTR washout check", "mass", "washout risk if D >= mu", "Continuous fermentation wash-out condition highlighted as a SuperPro limitation in the thesis."),
  eq("Tear stream convergence", "mass", "epsilon = abs(F_n - F_(n-1)) / F_n", "Recycle-loop convergence error checked over successive tear-stream iterations."),
  eq("Recycle purge", "mass", "F_purge = F_recycle * (1 - recycle_fraction)", "Purge needed to avoid accumulation in a continuous recycle loop."),
  eq("Regulated dilution stream", "mass", "F_water = F_syrup * (C_syrup/C_target - 1)", "Feedback-regulated water addition to achieve a target substrate concentration."),
  eq("Rotary vacuum split", "separation", "m_filtrate,i = split_i * m_feed,i", "Component split model for a filter when detailed particle properties are not used."),
  eq("Heat exchanger target", "energy", "Q = m_hot*Cp_hot*(T_hot,in - T_hot,out) = m_cold*Cp_cold*(T_cold,out - T_cold,in)", "Countercurrent heat exchange with target outlet temperature or approach temperature."),
  eq("Absorption removal", "separation", "CO2_out = CO2_in * (1 - eta_abs)", "Simplified CO2 absorption removal model for DEA gas upgrading."),
  eq("Solvent regeneration", "energy", "Q_regen = m_solvent * Cp * DeltaT + m_CO2 * DeltaH_des", "Desorption/regeneration duty estimate for a CO2-rich solvent stream."),
  eq("Adjusted absorption cost", "economics", "OC_adjusted = OC_fermentation * (1 + absorption_factor)", "Thesis-style adjustment when absorption cannot be modeled accurately in the simulator."),
  eq("Process throughput scale-up", "economics", "scale_factor = target_MP_rate / current_MP_rate", "SuperPro Adjust Process Throughput analogue for scaling flows and parallel unit counts."),
  eq("Parallel unit count", "economics", "N_parallel = ceil(required_capacity / unit_capacity)", "Automatic invisible parallel-unit sizing behavior described for bottleneck equipment."),
  eq("Gross margin", "economics", "gross_margin = (revenue - operating_cost) / revenue", "Economic Evaluation report profitability metric."),
  eq("Unit production cost", "economics", "UPC = annual_operating_cost / annual_main_product", "Cost basis used in the thesis economic evaluation reports."),
  eq("Recipe cycle time", "economics", "RCT = max(path_duration_i) + setup + cleaning + transfer_slack", "Scheduling metric for batch recipe cycle time and occupancy analysis."),
  eq("Equipment occupancy", "economics", "occupancy_i = busy_time_i / campaign_time", "Equipment occupancy used in Gantt and utilization analysis."),
  eq("Resource demand", "economics", "demand_resource(t) = sum(requirement_operation_i(t))", "Resource tracking for utilities, labor, consumables, and auxiliary equipment."),
  eq("Potential maximum throughput", "economics", "PMT = current_throughput / bottleneck_utilization", "Throughput analysis estimate for debottlenecking."),
  eq("Design rating utilization", "economics", "utilization = required_capacity / selected_capacity", "Equipment design vs rating check."),
  eq("Purchase cost adjustment", "economics", "C_adj = C_purchase * material_factor * pressure_factor * installation_factor", "Equipment purchase and adjustment model."),
  eq("Startup validation cost", "economics", "C_startup_validation = f_validation * direct_fixed_capital", "Startup and validation cost allowance."),
  eq("Discrete stream rate", "mass", "N_dot = entities_per_batch * batches_per_year / operating_hours", "Discrete stream conversion between countable entities and operating rate."),
  eq("Bulk stream density", "mass", "rho_mix = 1 / sum(w_i / rho_i)", "Bulk-stream mixture density estimate."),
  eq("Dry mass fraction", "mass", "dry_fraction = dry_solids / total_mass", "Dry mass option for biomass, foods, slurries, and wastewater solids."),
  eq("Displacement emissions", "emissions", "m_emitted = V_displaced * C_vapor * emission_fraction", "Batch displacement emission estimate."),
  eq("Depressurization emissions", "emissions", "m_emitted = V_headspace * (P_initial - P_final) * y_i * MW_i / (R*T)", "Depressurization emission model."),
  eq("Purging emissions", "emissions", "m_emitted = purge_flow * y_i * MW_i * purge_time", "Emission load from purging operations."),
  eq("Scrubber removal", "emissions", "m_out = m_in * (1 - eta_scrubber)", "Air-pollution scrubber removal model."),
  eq("Carbon bed breakthrough", "emissions", "t_break = M_carbon * capacity / VOC_loading_rate", "Activated-carbon bed service time approximation."),
  eq("Thermal oxidizer destruction", "emissions", "VOC_out = VOC_in * (1 - DRE)", "VOC destruction removal efficiency for thermal oxidation."),
  eq("BOD removal", "environmental", "BOD_out = BOD_in * (1 - eta_BOD)", "Wastewater biological oxygen demand removal."),
  eq("COD removal", "environmental", "COD_out = COD_in * (1 - eta_COD)", "Wastewater chemical oxygen demand removal."),
  eq("Activated sludge F/M", "environmental", "F_M = Q * S0 / (V * X)", "Food-to-microorganism ratio for activated sludge."),
  eq("Sludge production", "environmental", "P_sludge = Y_obs * Q * (S0 - S)", "Observed sludge production estimate."),
  eq("Clarifier surface overflow", "environmental", "SOR = Q / A_surface", "Clarifier surface overflow rate."),
  eq("RO recovery", "separation", "recovery_RO = permeate_flow / feed_flow", "Reverse osmosis water recovery."),
  eq("Ion exchange bed volumes", "separation", "BV_processed = V_treated / V_resin", "Ion exchange throughput in bed volumes."),
  eq("Environmental impact score", "environmental", "EIS = sum(load_i * characterization_factor_i)", "Environmental impact report style weighted impact score."),
  eq("Six-tenths CAPEX scaling", "economics", "C2 = C1 * (S2/S1)^n, n approx. 0.45-0.8", "Non-linear equipment and plant capacity scaling; larger systems usually cost less per unit capacity."),
  eq("Lab fixed burden", "economics", "COGS_fixed = fixed_facility_cost * lab_burden / kg_product", "Lab-scale kg cost dominated by facility, labor, QA/QC, setup, and validation overhead."),
  eq("Learning curve", "economics", "C_N = C_1 * N^(log2(1-learning_rate))", "Campaign repetition reduces labor, material losses, deviations, and changeover penalties."),
  eq("Automation labor credit", "economics", "labor_cost = labor_base * (1 - automation_level * automation_credit)", "Automation reduces direct labor burden more at pilot and commercial scale than at lab scale."),
  eq("Purchasing power curve", "economics", "raw_cost = raw_mass * price * purchasing_factor(scale)", "Bulk purchasing and supplier qualification reduce material unit cost at larger scale."),
  eq("Validation burden per kg", "economics", "validation_COGS = validation_cost / annual_kg", "Validation and QA overhead penalize low-volume lab and pilot campaigns strongly."),
  eq("Parallel train scale-up", "economics", "CAPEX_parallel = CAPEX_single * N_parallel^0.78", "Parallel equipment trains increase capacity sublinearly but add scheduling and facility complexity."),
  eq("Annual operating time utilization", "economics", "AOT_utilized = sum(busy_time_i + setup_i + turnaround_i)", "Manual-style annual operating time accounting for busy, setup, and turnaround demand."),
  eq("Maximum batches per year", "economics", "N_batches,max = AOT_available / recipe_cycle_time", "Maximum annual batches from available annual operating time and recipe cycle time."),
  eq("Cycle time slack", "economics", "slack_RCT = RCT_available - RCT_minimum", "Scheduling slack between available and minimum recipe cycle time."),
  eq("Equivalent procedure cycles", "economics", "N_equiv = procedure_cycles_per_batch / main_recipe_cycles", "Equivalent number of cycles used for independently cycling procedures."),
  eq("Start time shift", "economics", "t_start,i = t_reference + shift_i", "Operation start-time reference and shift used in scheduling views."),
  eq("Size utilization factor", "economics", "SUF = required_batch_size / rated_batch_size", "Sizing utilization factor for equipment design versus selected rating."),
  eq("Throughput utilization factor", "economics", "TUF = required_rate / rated_rate", "Throughput utilization factor for continuous or rate-limited equipment."),
  eq("Auxiliary relative load", "economics", "RL_aux = required_aux_load / rated_aux_load", "Relative load for auxiliary equipment such as vacuum pumps or HVAC."),
  eq("Auxiliary relative utilization", "economics", "RU_aux = aux_busy_time / aux_available_time", "Relative utilization for auxiliary equipment occupancy and demand reports."),
  eq("Material inventory", "economics", "inventory_i = demand_rate_i * inventory_days_i", "Material storage requirement from consumption rate and inventory coverage."),
  eq("Material storage rate", "economics", "rate_storage = max(receiving_rate, supply_rate, production_rate)", "Storage unit rate basis for supply and receiving charts."),
  eq("Heat transfer agent cost", "economics", "C_HTA = m_HTA * Cp * DeltaT * price_energy / recovery_factor", "Heat-transfer-agent consumption or credit estimate."),
  eq("Power demand table", "energy", "P_demand(t) = sum(P_equipment_i(t)) - P_generated(t)", "Power demand and generation profile used in resource reports."),
  eq("Labor demand table", "economics", "labor_demand(t) = sum(crew_i * operation_active_i(t))", "Labor requirement over time by labor type and operation."),
  eq("Working capital", "economics", "WC = working_capital_percent * direct_fixed_capital", "Working capital component of total capital investment."),
  eq("Straight-line depreciation", "economics", "D_annual = depreciable_capital / depreciation_life", "Annual straight-line depreciation charge."),
  eq("Taxable income", "economics", "taxable_income = revenue + credits - operating_cost - depreciation", "Taxable income basis for profit and cash-flow analysis."),
  eq("Net cash flow", "economics", "NCF = net_profit + depreciation - capital_spending - working_capital_change", "Cash-flow report basis for economic evaluation."),
  eq("Return on investment", "economics", "ROI = net_profit / total_capital_investment", "Return-on-investment profitability indicator."),
  eq("Internal rate of return", "economics", "0 = sum(NCF_t / (1+IRR)^t) - initial_investment", "IRR is the discount rate that makes project NPV equal zero."),
  eq("Currency conversion", "economics", "cost_currency_B = cost_currency_A * exchange_rate_AB", "Currency databank conversion for economic figures."),
  eq("Density safety factor", "mass", "rho_design = rho_calculated * density_safety_factor", "Design density allowance for sizing and rating checks."),
  eq("Ideal vapor density", "mass", "rho_vapor = P * MW / (R * T)", "Vapor density option for physical-state calculations."),
  eq("VLE K value", "mass", "K_i = y_i / x_i", "Rigorous or shortcut vapor-liquid equilibrium distribution value."),
  eq("Vapor fraction", "mass", "VF = n_vapor / (n_liquid + n_vapor)", "Physical-state flash variable for mixed phase streams."),
  eq("Zero flow filter", "mass", "F_effective = 0 if F < zero_flow_threshold", "Zero-flow threshold used to simplify stream summaries and diagnostics."),
  eq("Incidence matrix", "mass", "A_ij = 1 if stream_j enters unit_i, -1 if it exits", "Loop identification and sequencing representation for process simulation."),
  eq("Back-propagation demand", "mass", "demand_source = demand_terminal / product(path_yields)", "Back-propagation from terminal sinks to upstream source demands."),
  eq("Wegstein convergence", "mass", "x_next = lambda*x_direct + (1-lambda)*x_previous", "Recycle-loop acceleration strategy associated with tear-stream convergence."),
  eq("Emission limit check", "emissions", "status = pass if annual_emission <= emission_limit", "Emission limit comparison for EMS and EPA-MACT style reports."),
  eq("Report set completeness", "economics", "coverage = generated_reports / selected_reports", "Generate-and-save report-set completeness check."),
  eq("Cleaning-agent demand", "mass", "m_cleaner = V_CIP * rho_solution * concentration_cleaner", "Cleaning-agent stream demand for caustic, acid, or formulated cleaning solutions."),
  eq("CIP cycle occupancy", "economics", "t_CIP,total = t_pre_rinse + t_caustic + t_intermediate_rinse + t_acid + t_final_rinse", "CIP template duration for equipment occupancy and recipe cycle time."),
  eq("Rinse endpoint", "mass", "endpoint pass if conductivity_final <= conductivity_limit and TOC <= TOC_limit", "Final-rinse endpoint used for cleaning verification."),
  eq("SIP sterilization hold", "kinetics", "F0 = integral(10^((T(t)-121.1)/z)) dt", "Steam-in-place lethality equivalent for validated sterilization holds."),
  eq("Condensate return credit", "energy", "Q_credit = m_condensate * Cp * (T_return - T_makeup)", "Energy credit from clean steam condensate return."),
  eq("Heat reuse fraction", "energy", "reuse_fraction = Q_recovered / Q_process_heat_demand", "Share of process heat supplied by recovered heat rather than new utility."),
  eq("Pinch heat recovery", "energy", "Q_recovered,max = min(Q_hot_available, Q_cold_required) * eta_HX", "Heat recovery estimate for matched hot and cold process streams."),
  eq("Solvent recycle efficiency", "mass", "eta_solvent_recycle = m_solvent_reused / m_solvent_fresh_equivalent", "Solvent recovery and reuse efficiency with purge allowance."),
  eq("Water reuse ratio", "environmental", "reuse_water_ratio = water_reused / total_process_water", "Water reuse performance for process-water recovery nodes."),
  eq("Recycle accumulation check", "mass", "accumulation_i = F_in,i - F_out,i + generation_i - consumption_i", "Checks whether recycle and purge settings prevent component buildup."),
  eq("Purge fraction", "mass", "purge_fraction = F_purge / (F_recycle + F_purge)", "Recycle-loop purge fraction used to control impurities and inerts."),
  eq("Auxiliary equipment occupancy", "economics", "aux_occupancy = sum(auxiliary_busy_time) / available_auxiliary_time", "Occupancy basis for CIP skids, SIP panels, transfer panels, and vacuum pumps."),
  eq("Resource bottleneck index", "economics", "RBI = max(resource_demand_t / resource_capacity_t)", "Resource bottleneck check for labor, utilities, heat agents, materials, and auxiliaries."),
  eq("Inventory coverage", "economics", "coverage_days = inventory_on_hand / average_daily_consumption", "Material inventory coverage for raw materials, cleaning agents, solvents, and buffers."),
  eq("Cleaning validation sampling", "mass", "N_samples = equipment_surface_groups * swab_points_per_group + rinse_samples", "Sampling workload for cleaning validation and release documentation."),
];

const spdFunctions = [
  { group: "Setup", name: "Chemical register", status: "Implemented", inputs: "Components, mixtures, missing physical properties", output: "Component database for reactions, streams, and economics", note: "Mirrors the PDF workflow: define every reactant, product, by-product, and mixture before building the process." },
  { group: "Setup", name: "Batch or continuous mode", status: "Implemented", inputs: "Mode selection, holdup, scheduling, steady-state settings", output: "Process-mode assumptions and cost/scheduling behavior", note: "Batch mode requires unit-operation sequences; continuous mode uses steady-state unit settings and recycle convergence." },
  { group: "Streams", name: "Raw material / waste / revenue classification", status: "Implemented", inputs: "Stream role, buying price, disposal price, selling price", output: "Economic stream class and contribution", note: "The tool now differentiates main, utility, waste, and QC/data paths visually and in the function board." },
  { group: "Batch", name: "PULL IN / CHARGE", status: "Implemented", inputs: "Source stream, target mass, concentration, temperature, or volume", output: "Automatically sized inlet transfer", note: "Useful for raw-material streams and enzyme dosing to a concentration or temperature criterion." },
  { group: "Batch", name: "TRANSFER IN / TRANSFER OUT", status: "Implemented", inputs: "Available mass from upstream or outlet fraction", output: "Material transfer between units", note: "Recommended routine for moving all available mass between process units." },
  { group: "Batch", name: "PULL OUT", status: "Implemented", inputs: "Downstream demand or operation criterion", output: "Demand-driven outlet transfer", note: "Represents downstream-listening transfer behavior described in Appendix VII." },
  { group: "Batch", name: "STORE / GRIND / HEAT / HEAT EXCHANGE / FILTER / CIP", status: "Implemented", inputs: "Duration, energy source, split coefficients, labor, scheduling", output: "Unit operation sequence and cost/schedule impact", note: "Included as batch-operation cards and equipment units such as grinder, heat exchanger, rotary vacuum filter, and CIP." },
  { group: "Fermentation", name: "Stoichiometric reaction", status: "Implemented", inputs: "Balanced mass or molar coefficients, reaction time", output: "Linear conversion across residence time", note: "The PDF recommends mass balancing where biomass is treated as an approximate pseudo-component." },
  { group: "Fermentation", name: "Kinetic fermentation", status: "Implemented", inputs: "mu max, alpha, beta, biomass, S1/S2/S3 terms", output: "Volumetric productivity", note: "Adds the SuperPro kinetic productivity equation and Luedeking-Piret product formation." },
  { group: "Fermentation", name: "Dark fermentation inhibition", status: "Implemented", inputs: "Glucose, osmolarity, dissolved H2, critical inhibition terms", output: "DF growth/productivity warning model", note: "Adds osmolarity and hydrogen inhibition from the thesis, plus CSTR washout checking." },
  { group: "Continuous", name: "Feedback regulatory system", status: "Implemented", inputs: "Target concentration, water feed, syrup feed", output: "Adjusted dilution stream", note: "Modeled as the feedback regulator unit and dilution equation for syrup-water concentration control." },
  { group: "Continuous", name: "Recycle loop and tear stream", status: "Implemented", inputs: "Recycle fraction, purge, max iterations, tolerance", output: "Convergence status and tear-stream marker", note: "Includes splitter, tear-stream marker, convergence equation, and purge balance." },
  { group: "Troubleshooting", name: "Breakpoints", status: "Implemented", inputs: "Unit, operation, status, error condition", output: "Pause point for reviewing intermediate conditions", note: "Represented as operational status and function card for debugging unit sequences." },
  { group: "Troubleshooting", name: "Unit-operation equation lookup", status: "Implemented", inputs: "Selected unit or stream", output: "Relevant equation spotlight", note: "The canvas equation spotlight changes with selected equipment or stream and links into the full equation library." },
  { group: "Scale-up", name: "Process throughput target", status: "Implemented", inputs: "Target main-product rate", output: "Scale factor and parallel unit count", note: "Implements the Adjust Process Throughput idea from the PDF and shows parallel unit sizing equations." },
  { group: "Economics", name: "Economic evaluation report", status: "Implemented", inputs: "Capital, operating cost, revenues, waste handling, absorption adjustment", output: "COGS, gross margin, ROI-like indicators", note: "Adds thesis-style operating-cost adjustment, unit production cost, gross margin, and revenue/cost stream classification." },
  { group: "Gas upgrading", name: "Absorption and desorption", status: "Implemented", inputs: "CO2 removal, DEA solvent recycle, regeneration duty", output: "Product gas and solvent loop estimate", note: "Adds absorber/desorber equipment and simplified CO2 absorption/regeneration functions because the thesis noted SPD limitations for reactive absorption." },
  { group: "Reporting", name: "Batch sheet / dynamic profiles", status: "Implemented", inputs: "Operation sequence, time profile, temperature/concentration records", output: "Checklist-style batch record and time-series assumptions", note: "Represented by operation-sequence cards and profile-related equations; exported in JSON with scenario data." },
  { group: "Components", name: "Pure component databank", status: "Implemented", inputs: "Name, formula, MW, density, vapor pressure, heat capacity, economics", output: "Registered component property set", note: "Manual chapter 3 coverage: component registration, missing-property flags, DIPPR/PPDS-style property sources, and economics fields." },
  { group: "Components", name: "Stock mixture databank", status: "Implemented", inputs: "Mixture composition, dry mass options, pollutant categories", output: "Reusable material or feedstock mixture", note: "Supports foods, plant materials, wastewater feeds, raw substrates, and undefined process mixtures." },
  { group: "Streams", name: "Bulk and discrete streams", status: "Implemented", inputs: "Bulk mass composition or discrete entity count/properties", output: "Continuous material stream or countable entity stream", note: "Manual chapter 4 coverage: bulk streams, discrete streams, info tags, state/density options, and environmental properties." },
  { group: "Streams", name: "Stream drawing and elbow editing", status: "Implemented", inputs: "Source, destination, direction, stream class", output: "Animated directional stream with editable role", note: "Canvas stream rendering now shows flow direction and distinguishes product, utility, waste, and QC/data paths." },
  { group: "Procedures", name: "Procedure families and ports", status: "Implemented", inputs: "Unit procedure type, i/o ports, default ports, auto-initialization", output: "Procedure icon with suitable connection behavior", note: "Manual chapter 5 coverage: procedure states, labels, icons, port behavior, and unit-operation sequence." },
  { group: "Procedures", name: "Switching unit procedures", status: "Implemented", inputs: "Existing unit, replacement procedure family", output: "Preserved flowsheet context with changed operation model", note: "Represented as editable equipment type/class and detail-layer operations." },
  { group: "Resources", name: "Design vs rating mode", status: "Implemented", inputs: "Design capacity, selected equipment capacity, utilization", output: "Sizing mode and bottleneck indicator", note: "Manual chapter 6 coverage: main equipment sizing, rating/design choice, purchase cost, contents, consumables, and allocation." },
  { group: "Resources", name: "Equipment sharing and staggered mode", status: "Implemented", inputs: "Shared equipment, staggered cycles, occupancy", output: "Equipment utilization and scheduling capacity", note: "Simulation cards and equations cover equipment sharing, occupancy, staggered campaigns, and parallel unit counts." },
  { group: "Resources", name: "Auxiliary equipment demand", status: "Implemented", inputs: "Vacuum, compressed air, clean steam, HVAC, utilities", output: "Auxiliary equipment load and utilization", note: "Palette includes compressors, clean steam, HVAC, pumps, vacuum-related calculations, and utility demand models." },
  { group: "Scheduling", name: "Recipe cycle time and Gantt logic", status: "Implemented", inputs: "Operation duration, master/slave relationships, setup/CIP, holdup", output: "Batch duration, occupancy, and scheduling constraint signals", note: "Manual chapter 7 coverage: recipe cycle time bounds, operation/equipment Gantt concepts, and scheduling violations." },
  { group: "Scheduling", name: "Resource tracking", status: "Implemented", inputs: "Equipment, labor, utilities, consumables over time", output: "Utilization and demand summary", note: "Represented in KPIs, economics, utility estimates, and function board." },
  { group: "Sections", name: "Process sections and order", status: "Implemented", inputs: "Process section membership, procedure order, equipment order", output: "Organized flowsheet blocks and report groupings", note: "Manual chapter 8 coverage: sections, equipment/procedure ordering, and batch-vs-continuous process settings." },
  { group: "Economics", name: "Capital investment model", status: "Implemented", inputs: "Purchase cost, installation factors, validation/startup, working capital", output: "Capital investment estimate", note: "Manual chapter 9 coverage: direct fixed capital, startup/validation, consumables, labor, utilities, waste treatment, QC/QA, and annual operating cost." },
  { group: "Economics", name: "Profitability indicators", status: "Implemented", inputs: "Revenues, operating cost, capital, annual product", output: "COGS, gross margin, payback, ROI-like metrics", note: "Economic Evaluation report metrics are represented through equations and economics view." },
  { group: "Emissions", name: "Batch/continuous vent emissions", status: "Implemented", inputs: "Vent fraction, vapor pressure, displacement, depressurization, purge", output: "Emission load estimate", note: "Manual chapter 10 coverage: displacement, depressurization, purging, vacuum-pump emissions, and emissions reporting." },
  { group: "Emissions", name: "EPA-MACT style reporting", status: "Implemented", inputs: "VOC, particulate, scrubber/carbon/oxidizer removal", output: "Air pollution control and report card", note: "Air Pollution Control template includes cyclone, baghouse, scrubber, carbon bed, thermal oxidizer, stack monitoring, and report node." },
  { group: "Debottlenecking", name: "Throughput analysis", status: "Implemented", inputs: "Batch time, equipment size, utilization, target product rate", output: "Potential maximum throughput and bottleneck class", note: "Manual chapter 11 coverage: time bottlenecks, size bottlenecks, staggered equipment sets, and scale-up/down." },
  { group: "Reports", name: "Report suite", status: "Implemented", inputs: "Simulation state, streams, equipment, resources, economics, emissions", output: "JSON-exportable report payload", note: "Manual chapter 12 coverage: stream/material balance, equipment, auxiliary, economic, throughput, environmental, emissions, and EPA reports." },
  { group: "Databanks", name: "User/system databanks", status: "Implemented", inputs: "Components, mixtures, heat agents, power types, labor, consumables, equipment, CIP templates, processes", output: "Reusable process-design libraries", note: "Manual chapter 15 coverage represented as reusable palette items, parameters, standards, templates, and JSON export/import-ready structures." },
  { group: "Databanks", name: "Supplier and specification sheets", status: "Implemented", inputs: "Equipment class, material of construction, sterile boundary, supplier capacity range, purchase factor", output: "Equipment spec context for sizing and costing", note: "Represents professional equipment records: rating data, design basis, purchase assumptions, and documentation links." },
  { group: "Databanks", name: "User-defined cost models", status: "Implemented", inputs: "Purchase-cost curve, installation factor, material factor, pressure factor, validation burden", output: "Custom capital and operating-cost logic", note: "Lets the model separate lab-scale fixed burden from commercial-scale purchasing and automation effects." },
  { group: "Environmental", name: "Wastewater treatment process", status: "Implemented", inputs: "Wastewater flow, COD/BOD load, aeration, clarification, sludge handling", output: "Treated effluent and sludge stream model", note: "New Industrial Wastewater template follows the manual's environmental process family." },
  { group: "Environmental", name: "Water purification process", status: "Implemented", inputs: "Raw water, prefiltration, carbon, ion exchange, RO, UV, WFI utility", output: "Purified water release workflow", note: "New Water Purification template covers utility water treatment and release analytics." },
  { group: "Packaging", name: "Formulation and packaging", status: "Implemented", inputs: "Bulk product, fill/inspect/label/carton/case/pallet operations", output: "Finished packaged product workflow", note: "Palette now includes cartoner, case packer, palletizer, visual inspection, serialization, and weigh-fill operations." },
  { group: "Scenarios", name: "Scenario and sensitivity comparison", status: "Implemented", inputs: "Scale, titer, yield, recovery, batch count, CAPEX exponent, facility premium", output: "Scenario-ready cost and throughput deltas", note: "Designed for rapid what-if analysis across lab, pilot, demo, and commercial designs." },
  { group: "Exchange", name: "Spreadsheet/project export model", status: "Implemented", inputs: "Full state, equipment, streams, parameters, equations, standards, economics", output: "JSON scenario payload for downstream Excel, scheduling, and documentation workflows", note: "Keeps the process model portable for reports, external calculations, and project planning." },
  { group: "Cleaning", name: "CIP/SIP recipe templates", status: "Implemented", inputs: "Pre-rinse, caustic, acid, final rinse, SIP hold, sterile boundary", output: "Reusable cleaning and sterilization procedure sequence", note: "Connects GMP cleaning expectations to unit-operation timing, utilities, and validation burden." },
  { group: "Scale-up", name: "Non-linear scale economics", status: "Implemented", inputs: "Scale exponent, lab fixed burden, learning rate, automation, facility premium, bottleneck utilization", output: "Scale-sensitive COGS, CAPEX, annualized cost, parallel trains, and scale-efficiency estimate", note: "Replaces linear scale-up with economies of scale and heavy lab-scale fixed cost burden." },
  { group: "Economics", name: "Lab-scale burden model", status: "Implemented", inputs: "Low batch volume, QA/QC, validation, labor, setup, facility premium", output: "High $/kg at lab scale and lower unit cost as scale increases", note: "Reflects that many costs are nearly fixed at small scale and collapse per kg only when campaigns and equipment get larger." },
  { group: "Scheduling", name: "Operations Gantt chart", status: "Implemented", inputs: "Operation start, end, setup, process, turnaround, reference operation", output: "Operation-level campaign timing model", note: "Manual chapter 7 coverage for OGC-style scheduling, zoom/time-scale behavior, and data export readiness." },
  { group: "Scheduling", name: "Equipment Gantt and occupancy charts", status: "Implemented", inputs: "Equipment busy, idle, waiting, occupancy, shared/staggered mode", output: "Equipment utilization and occupancy profile", note: "Adds EGC/EOC concepts and scheduling bottleneck signals to the simulation board." },
  { group: "Resources", name: "Material inventory and storage units", status: "Implemented", inputs: "Material demand, output, inventory days, receiving rate, supply rate", output: "Material inventory and storage-rate assumptions", note: "Manual chapter 6 coverage for consumption/output charts, inventory charts, and material storage unit tables." },
  { group: "Resources", name: "Heat transfer agent tracking", status: "Implemented", inputs: "Steam, chilled water, hot oil, refrigerant, recovery/credit factors", output: "Heat-agent consumption, inventory, and cost signal", note: "Adds heat transfer agent databank and consumption-report concepts." },
  { group: "Resources", name: "Power demand and generation tracking", status: "Implemented", inputs: "Equipment power, generation credits, demand timing", output: "Power demand, production, and credit profile", note: "Manual chapter 6/9 coverage for power demand charts, power production tables, and generated-power credits." },
  { group: "Resources", name: "Labor requirement tables", status: "Implemented", inputs: "Labor type, operation duration, crew count, loaded labor rate", output: "Labor demand profile and labor-dependent cost", note: "Adds labor databank, demand chart, and labor requirement table concepts." },
  { group: "Process", name: "Process explorer and overview navigator", status: "Implemented", inputs: "Process tree, sections, branches, stream summary, search terms", output: "Navigable process structure and locate/search model", note: "Manual chapter 8 coverage for process explorer, overview navigator, stream summary table, and find/locate behavior." },
  { group: "Process", name: "Physical-state and density toolboxes", status: "Implemented", inputs: "Shortcut/rigorous PS settings, VLE, liquid density, vapor density, dry mass", output: "State/density assumption register", note: "Adds the manual's shortcut and rigorous physical-state and density-calculation options as explicit model coverage." },
  { group: "Simulation", name: "Pre-simulation checks", status: "Implemented", inputs: "Missing inputs, zero-flow threshold, scheduling violations, resource allocation consistency", output: "Simulation readiness and warning model", note: "Manual chapter 8 countdown-to-simulation and diagnostics coverage." },
  { group: "Simulation", name: "Partition, sequencing, and back-propagation", status: "Implemented", inputs: "Incidence matrix, loops, sources, terminals, tear streams", output: "Sequenced calculation partitions and upstream demand propagation", note: "Adds the manual's loop identification, tear-stream selection, convergence, and back-propagation concepts." },
  { group: "Simulation", name: "Error output and status indicators", status: "Implemented", inputs: "Filtering threshold, breakpoint visibility, status indicators, simulation speed", output: "Troubleshooting signal set", note: "Manual chapter 8 coverage for error output windows, filtering, breakpoints, and procedure status indicators." },
  { group: "Economics", name: "Cash-flow and financing analysis", status: "Implemented", inputs: "Working capital, depreciation, tax, discount rate, debt/loan, royalties, credits", output: "NPV, ROI, IRR, payback, taxable income, and cash-flow assumptions", note: "Extends economics to the manual's cash-flow report and profitability-analysis concepts." },
  { group: "Economics", name: "Currency and cost-reporting options", status: "Implemented", inputs: "Currency, exchange rate, reporting basis, unit reference flow", output: "Currency-aware economic reporting assumptions", note: "Manual chapter 9 coverage for currency and reporting of economic figures." },
  { group: "Reports", name: "Full SuperPro report set", status: "Implemented", inputs: "SR, EER, CFR, ICR, THR, EIR, EMS, EPA, EQR, AUX, IDR, CSR, custom Excel", output: "Report-set checklist and export payload", note: "Adds remaining report names from manual chapter 12 including equipment, auxiliary, input data, cash flow, itemized cost, and CIP/SIP reports." },
  { group: "Visual Objects", name: "Flowsheet annotation objects", status: "Implemented", inputs: "Text, line, rectangle, ellipse, polyline, polygon, style defaults", output: "Documentation and mark-up layer", note: "Manual chapter 13 coverage for visual objects and their command/style concepts." },
  { group: "Exchange", name: "Excel hot-link and OLE model", status: "Implemented", inputs: "Tables, charts, flowsheet drawing, resource data, scheduling data, OLE server hooks", output: "External-data exchange model", note: "Manual chapter 14 coverage for exporting drawings/data, hot-linked Excel charts, OLE objects, and automation-server concepts." },
  { group: "Databanks", name: "Database import/export and access control", status: "Implemented", inputs: "User DB, system DB, password, import, export, upgrade, sync", output: "Databank governance model", note: "Adds manual chapter 15 coverage for database registration, import/export, older DB access, and password-protected access." },
  { group: "Databanks", name: "Currency, consumable, material, and site databanks", status: "Implemented", inputs: "Currencies, consumables, equipment materials, site resources, auxiliary types", output: "Resource-cost library coverage", note: "Adds the remaining non-process databanks described in the manual." },
  { group: "Databanks", name: "Process library search", status: "Implemented", inputs: "Process records, PLRF sync, criteria, refine search, expand search", output: "Searchable process-library concept", note: "Manual chapter 15 coverage for adding process records, syncing a process library root folder, and AND/OR criteria search." },
  { group: "Emissions", name: "Emission limits and special tank models", status: "Implemented", inputs: "Quiescent tank, agitated tank, cooling tower, VOC load, annual limit", output: "Limit-check and special emission model coverage", note: "Extends emissions coverage with manual chapter 10 limit checks and tank/cooling-tower model concepts." },
  { group: "Cleaning", name: "Cleaning-agent stream classification", status: "Implemented", inputs: "Caustic, acid, rinse water, cleaning-agent inventory, spent rinse", output: "Cleaning-agent supply and return model", note: "Manual stream classification coverage for cleaning agents, raw materials, waste, revenue/credit, and unclassified streams." },
  { group: "Cleaning", name: "CIP/SIP auxiliary occupancy", status: "Implemented", inputs: "CIP skid, SIP panel, cycle template, return/neutralization, final rinse endpoint", output: "CIP/SIP support train and occupancy signal", note: "Manual auxiliary equipment coverage for CIP skids, SIP panels, equipment occupancy charts, and CIP template databank behavior." },
  { group: "Energy", name: "Heat reuse and condensate return", status: "Implemented", inputs: "Hot stream, cold stream, heat transfer agent, condensate return, recovery efficiency", output: "Recovered duty and utility credit", note: "Adds heat-transfer-agent charts, heat recovery, reuse, and condensate return concepts." },
  { group: "Recycle", name: "Solvent and water recycle with purge", status: "Implemented", inputs: "Recycle split, purge split, solvent recovery, water reuse, tear stream", output: "Recycle loop, purge, and convergence model", note: "Covers recycle-loop convergence, preferred tear streams, solvent reuse, and water reuse/reject routing." },
  { group: "Resources", name: "Main vs support process role model", status: "Implemented", inputs: "Unit class, stream class, utilities, cleaning, recycle, heat, QC, waste", output: "Visible unit role badges and support infrastructure layer", note: "Makes the core process visually distinct from utilities, cleaning, resource, heat-reuse, recycle, waste, and QC/data elements." },
];

const twinWorkspace = {
  hierarchy: [
    { level: "Factory", focus: "Plant-wide throughput, utilities, emissions, scheduling, cost, LCA", view: "overview" },
    { level: "Building", focus: "GMP zones, cleanroom classification, pressure cascade, material/personnel flows", view: "standards" },
    { level: "Room", focus: "Suite layout, HVAC, WFI, clean steam, waste handling, biosafety boundaries", view: "flowsheet" },
    { level: "Bioreactor", focus: "kLa, OUR, pH, DO, feed, ammonium, lactate, temperature, heat load", view: "cfd" },
    { level: "Impeller", focus: "Mixing time, shear, sparging, gas-liquid transfer, dead zones", view: "cfd" },
    { level: "Mass Transfer", focus: "Oxygen, nutrient, metabolite gradients, scale-up risk, soft sensors", view: "ai" },
    { level: "Cell Model", focus: "Growth, viability, product formation, waste metabolites, CQAs", view: "equations" },
  ],
  modules: [
    { name: "Live collaboration", status: "Tool module", detail: "Shared process workspace with comments, assignments, presence, review states, and approval gates.", action: "Open overview", view: "overview" },
    { name: "Git-style process versions", status: "Tool module", detail: "Branches for alternative process variants, diff of equipment/streams/parameters, and merge-ready decisions.", action: "Export model", view: "reports" },
    { name: "Live data connectors", status: "Connector map", detail: "SCADA, OSIsoft PI, Historian, OPC UA, CSV uploads, sensor streams, and batch records.", action: "Open streams", view: "streams" },
    { name: "Literature layer", status: "Tool module", detail: "Recommended papers, typical OUR, typical kLa, best practices, and source-backed unit assumptions.", action: "Open sources", view: "sources" },
    { name: "SOP and knowledge base", status: "Tool module", detail: "Attach SOPs, deviations, assumptions, validation notes, and experiment learnings to units and streams.", action: "Open recommendations", view: "recommendations" },
    { name: "AI Engineer", status: "Tool module", detail: "Natural-language prompts propose process variants such as media-cost reduction, oxygen-transfer fixes, or yield improvements.", action: "Ask help", view: "ai" },
    { name: "Equipment cost model", status: "Tool module", detail: "Equipment sizing, purchase curves, region, inflation, uncertainty, and validation burden as editable cost inputs.", action: "Open economics", view: "economics" },
    { name: "Sustainability model", status: "Tool module", detail: "CO2, energy, water, waste, solvent recovery, heat reuse, and LCA-style indicators integrated with process flows.", action: "Open boundaries", view: "ai" },
  ],
  aiPrompts: [
    "How can I reduce media cost by 20% without lowering viable cell density?",
    "Find the highest-risk scale-up boundary in this bioreactor train.",
    "Create a lower-water-use version with CIP rinse recovery and heat reuse.",
    "Compare a stainless-steel 20,000 L train against parallel single-use 2,000 L trains.",
  ],
};

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
  params: Object.fromEntries(processParameters.map((item) => [item.key, item.value])),
  units: [],
  streams: [],
  costs: [],
  paletteGroup: "core",
  paletteSearch: "",
  parameterSearch: "",
  canvasFocus: "all",
  flowDetail: "detailed",
  productBrief: "",
  productFiles: [],
  inferredTemplate: "culturedMeat",
};

const els = {
  templateList: document.querySelector("#templateList"),
  scaleList: document.querySelector("#scaleList"),
  parameterList: document.querySelector("#parameterList"),
  parameterSearch: document.querySelector("#parameterSearch"),
  resetParameters: document.querySelector("#resetParameters"),
  customParamName: document.querySelector("#customParamName"),
  customParamValue: document.querySelector("#customParamValue"),
  customParamUnit: document.querySelector("#customParamUnit"),
  addCustomParameter: document.querySelector("#addCustomParameter"),
  quickAdd: document.querySelector("#quickAdd"),
  paletteSearch: document.querySelector("#paletteSearch"),
  paletteGroups: document.querySelector("#paletteGroups"),
  paletteCount: document.querySelector("#paletteCount"),
  sectionPresets: document.querySelector("#sectionPresets"),
  canvasFocus: document.querySelector("#canvasFocus"),
  flowDetail: document.querySelector("#flowDetail"),
  equationSpotlight: document.querySelector("#equationSpotlight"),
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
  pageTitle: document.querySelector("#pageTitle"),
  startBoard: document.querySelector("#startBoard"),
  overviewBoard: document.querySelector("#overviewBoard"),
  batchDuration: document.querySelector("#batchDuration"),
  directCost: document.querySelector("#directCost"),
  utilities: document.querySelector("#utilities"),
  utilization: document.querySelector("#utilization"),
  equipmentTable: document.querySelector("#equipmentTable"),
  streamsTable: document.querySelector("#streamsTable"),
  streamSummary: document.querySelector("#streamSummary"),
  aiBoard: document.querySelector("#aiBoard"),
  simulationBoard: document.querySelector("#simulationBoard"),
  cfdBoard: document.querySelector("#cfdBoard"),
  equationSearch: document.querySelector("#equationSearch"),
  equationFilter: document.querySelector("#equationFilter"),
  equationList: document.querySelector("#equationList"),
  standardsList: document.querySelector("#standardsList"),
  sourcesBoard: document.querySelector("#sourcesBoard"),
  recommendationsBoard: document.querySelector("#recommendationsBoard"),
  twinBoard: document.querySelector("#twinBoard"),
  costStack: document.querySelector("#costStack"),
  costNarrative: document.querySelector("#costNarrative"),
  economicDetails: document.querySelector("#economicDetails"),
  reportsBoard: document.querySelector("#reportsBoard"),
  modeHint: document.querySelector("#modeHint"),
  toast: document.querySelector("#toast"),
  helpDock: document.querySelector("#helpDock"),
  helpToggle: document.querySelector("#helpToggle"),
  helpPrompt: document.querySelector("#helpPrompt"),
  askHelp: document.querySelector("#askHelp"),
  helpResult: document.querySelector("#helpResult"),
  loginForm: document.querySelector("#loginForm"),
  loginUser: document.querySelector("#loginUser"),
  loginPassword: document.querySelector("#loginPassword"),
  loginError: document.querySelector("#loginError"),
  loginOrigin: document.querySelector("#loginOrigin"),
  googleLoginBox: document.querySelector("#googleLoginBox"),
  googleLoginFallback: document.querySelector("#googleLoginFallback"),
  googleButtonMount: document.querySelector("#googleButtonMount"),
  googleLoginStatus: document.querySelector("#googleLoginStatus"),
  loginGate: document.querySelector("#loginGate"),
  publicLogo: document.querySelector("#publicLogo"),
  openLoginHero: document.querySelector("#openLoginHero"),
  loginPanel: document.querySelector("#loginPanel"),
  publicHome: document.querySelector("#publicHome"),
  workspaceLogo: document.querySelector("#workspaceLogo"),
  logoutButton: document.querySelector("#logoutButton"),
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
  if (kg < 1) return `${formatNumber(kg * 1000, 0)} g`;
  return `${formatNumber(kg, 1)} kg`;
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function equipmentTooltip(item) {
  const ics = icsCodeForUnit(item);
  return `${item.id} - ${item.name}. ${item.isoName || item.name}. ICS ${ics.code}: ${ics.label}. Role: ${unitLayerLabel(unitLayer(item))}. Size: ${unitSize(item)}; duty: ${unitPower(item)}. Standards: ${(item.standards || []).slice(0, 3).join(", ")}.`;
}

function streamTooltip(item, from, to, kind) {
  const solved = solveMassBalance().streamMap[item.id];
  const componentNote = solved?.componentText ? ` Components: ${solved.componentText}.` : "";
  return `${item.id}: ${item.composition}. ${from?.id || item.from} to ${to?.id || item.to}. Type: ${streamLabel(kind)}. Solved flow: ${streamFlow(item)}.${componentNote}`;
}

function activeTemplate() {
  return templates[state.template];
}

function scaleProfile() {
  const volume = Math.max(1, state.batchSize);
  if (volume < 250) return { key: "lab", label: "Lab / benchtop", fixedBurden: state.params.labFixedBurden, qaMultiplier: 6.8, laborMultiplier: 5.6, purchasingPower: 1.75, automationCredit: 0.05 };
  if (volume < 5000) return { key: "pilot", label: "Pilot", fixedBurden: 7.5, qaMultiplier: 3.2, laborMultiplier: 2.5, purchasingPower: 1.25, automationCredit: 0.22 };
  if (volume < 50000) return { key: "demo", label: "Demo", fixedBurden: 2.4, qaMultiplier: 1.65, laborMultiplier: 1.45, purchasingPower: 1.04, automationCredit: 0.42 };
  return { key: "commercial", label: "Commercial", fixedBurden: 1, qaMultiplier: 1, laborMultiplier: 1, purchasingPower: 0.86, automationCredit: 0.68 };
}

function scaleEconomics(data) {
  const p = state.params;
  const profile = scaleProfile();
  const volumeRatio = Math.max(0.001, state.batchSize / 10000);
  const campaignRatio = Math.max(0.05, state.batchCount / 160);
  const exponent = p.capitalScaleExponent;
  const parallelUnits = Math.max(1, Math.ceil((p.bottleneckUtil / 100) * Math.pow(volumeRatio, 0.42)));
  const installedCapital = 3_800_000 * Math.pow(volumeRatio, exponent) * (0.72 + state.units.length * 0.035) * (1 + p.facilityPremium / 100) * Math.pow(parallelUnits, 0.78);
  const annualizedCapital = installedCapital * (0.16 + p.validationFactor / 1000);
  const fixedBurden = profile.fixedBurden * (620000 + state.units.length * 18500);
  const automationCredit = 1 - (p.automationLevel / 100) * profile.automationCredit;
  const learningCredit = Math.max(0.45, 1 - (p.learningRate / 100) * Math.log2(Math.max(1, campaignRatio)));
  const materialIntensity = (state.batchSize * state.batchCount * (0.45 + state.titer / 120)) * profile.purchasingPower * learningCredit;
  const laborCost = (520000 + state.units.length * 42000) * profile.laborMultiplier * automationCredit / Math.sqrt(Math.max(0.35, campaignRatio));
  const qaCost = (380000 + state.units.length * 26000) * profile.qaMultiplier * (1 + p.validationFactor / 100);
  const utilityCost = data.utilities * 145 * (0.92 + profile.fixedBurden * 0.03);
  const wasteCost = state.units.filter((item) => ["Environmental", "Air pollution", "Utilities"].includes(item.cls)).length * 22000 + (1 - data.processYield) * 480000;
  const annualCost = annualizedCapital + fixedBurden + materialIntensity + laborCost + qaCost + utilityCost + wasteCost;
  const kg = Math.max(0.001, data.annualKg);
  const directCost = annualCost / kg;
  const scaleEfficiency = Math.max(0.08, Math.min(1, 1 / profile.fixedBurden));

  return { profile, installedCapital, annualizedCapital, fixedBurden, materialIntensity, laborCost, qaCost, utilityCost, wasteCost, annualCost, directCost, parallelUnits, scaleEfficiency };
}

function isMinorUnit(item) {
  return ["Piping", "Instrumentation"].includes(item.cls);
}

function streamKind(item, from, to) {
  const text = `${item.id} ${item.composition} ${item.phase} ${from?.cls || ""} ${to?.cls || ""}`.toLowerCase();
  if (text.includes("waste") || text.includes("spent") || text.includes("raffinate") || text.includes("bottoms")) return "waste";
  if (item.phase === "Gas" || ["Utilities", "Piping"].includes(from?.cls) || ["Utilities", "Piping"].includes(to?.cls) || text.includes("cip") || text.includes("steam") || text.includes("solvent")) return "utility";
  if (["Quality", "Instrumentation"].includes(from?.cls) || ["Quality", "Instrumentation"].includes(to?.cls) || text.includes("sample") || text.includes("report") || text.includes("analytics")) return "qc";
  return "main";
}

function streamLabel(kind) {
  return {
    main: "Main product flow",
    utility: "Utility or service flow",
    waste: "Waste or side stream",
    qc: "QC, PAT, or data flow",
  }[kind];
}

function icsCodeForUnit(item) {
  const text = `${item.type} ${item.cls} ${item.name} ${item.isoName || ""}`.toLowerCase();
  if (item.cls === "Bioreactor" || text.includes("reactor") || text.includes("vessel") || text.includes("fermenter") || text.includes("tank")) {
    return { code: "71.120.10", label: "Reaction vessels and their components" };
  }
  if (text.includes("column") || text.includes("chromatography") || text.includes("absorber") || text.includes("desorber") || text.includes("distillation") || text.includes("ion exchange")) {
    return { code: "71.120.20", label: "Columns" };
  }
  if (item.cls === "Thermal" || text.includes("heat exchanger") || text.includes("heat recovery") || text.includes("condensate")) {
    return { code: "71.120.30", label: "Heat exchangers" };
  }
  if (["Utilities", "Piping", "Instrumentation", "Resources", "Reports", "Documentation"].includes(item.cls)) {
    return { code: "71.120.01", label: "Equipment for the chemical industry in general" };
  }
  return { code: "71.120.99", label: "Other equipment for the chemical industry" };
}

function icsCoverage() {
  const groups = new Map([
    ["71.120.01", { code: "71.120.01", label: "Equipment for the chemical industry in general", count: 0, examples: [] }],
    ["71.120.10", { code: "71.120.10", label: "Reaction vessels and their components", count: 0, examples: [] }],
    ["71.120.20", { code: "71.120.20", label: "Columns", count: 0, examples: [] }],
    ["71.120.30", { code: "71.120.30", label: "Heat exchangers", count: 0, examples: [] }],
    ["71.120.99", { code: "71.120.99", label: "Other equipment for the chemical industry", count: 0, examples: [] }],
  ]);
  state.units.forEach((item) => {
    const ics = icsCodeForUnit(item);
    const current = groups.get(ics.code) || { ...ics, count: 0, examples: [] };
    current.count += 1;
    if (current.examples.length < 4) current.examples.push(item.id);
    groups.set(ics.code, current);
  });
  return [...groups.values()].sort((a, b) => a.code.localeCompare(b.code));
}

function unitSymbol(item) {
  const text = `${item.type} ${item.cls} ${item.name}`.toLowerCase();
  if (text.includes("bioreactor") || text.includes("fermenter") || text.includes("reactor")) return "R";
  if (text.includes("filter") || text.includes("uf") || text.includes("df") || text.includes("membrane")) return "◇";
  if (text.includes("chromatography") || text.includes("column") || text.includes("absorber") || text.includes("desorber")) return "││";
  if (text.includes("heat") || text.includes("steam") || text.includes("condensate")) return "ΔT";
  if (text.includes("pump")) return "P";
  if (text.includes("valve")) return "⋈";
  if (text.includes("sensor") || text.includes("pat") || text.includes("flowmeter")) return "λ";
  if (text.includes("qc") || text.includes("report") || text.includes("summary")) return "Σ";
  if (text.includes("cip") || text.includes("sip") || text.includes("clean") || text.includes("rinse")) return "C";
  if (text.includes("recycle") || text.includes("reuse") || text.includes("splitter")) return "↻";
  if (text.includes("waste") || text.includes("sludge") || text.includes("emission")) return "∇";
  if (text.includes("tank") || text.includes("vessel") || text.includes("hold") || text.includes("prep")) return "V";
  return item.icon;
}

function unitLayer(item) {
  const text = `${item.id} ${item.type} ${item.name} ${item.cls}`.toLowerCase();
  if (text.includes("cip") || text.includes("sip") || text.includes("clean") || text.includes("rinse") || text.includes("caustic") || text.includes("acid hold")) return "cleaning";
  if (text.includes("recycle") || text.includes("tear") || text.includes("splitter") || text.includes("reuse") || text.includes("solvent recycle")) return "recycle";
  if (text.includes("heat") || text.includes("condensate") || item.cls === "Thermal") return "heat";
  if (item.cls === "Quality" || item.cls === "Instrumentation" || item.cls === "Reports" || item.cls === "Documentation" || text.includes("report") || text.includes("sample") || text.includes("pat") || text.includes("em")) return "quality";
  if (item.cls === "Environmental" || item.cls === "Air pollution" || text.includes("waste") || text.includes("sludge") || text.includes("emission")) return "waste";
  if (["Utilities", "Resources", "Piping", "Containment"].includes(item.cls)) return "support";
  return "main";
}

function unitLayerLabel(layer) {
  return {
    main: "Main process",
    support: "Support",
    cleaning: "CIP/SIP cleaning",
    recycle: "Recycle/reuse",
    heat: "Heat reuse",
    waste: "Waste/emissions",
    quality: "QC/data",
  }[layer] || "Support";
}

function unitFocusLevel(item) {
  const text = `${item.type} ${item.name} ${item.cls}`.toLowerCase();
  const layer = unitLayer(item);
  if (layer === "quality") return "quality";
  if (layer === "cleaning" || layer === "support" || item.cls === "Utilities" || item.cls === "Sterilization") return "utilities";
  if (layer === "recycle" || layer === "heat") return "recycle";
  if (["Preparation", "Bioreactor", "Hold"].includes(item.cls) || text.includes("seed") || text.includes("media")) return "upstream";
  if (["Solid-liquid", "Filtration", "Purification", "Concentration", "Separation", "Recovery", "Finishing", "Packaging", "Viral safety"].includes(item.cls)) return "downstream";
  return layer === "main" ? "main" : layer;
}

function unitWidth(item) {
  return isMinorUnit(item) ? 156 : 238;
}

function unitHeight(item) {
  return isMinorUnit(item) ? 68 : 104;
}

function unitMidline(item) {
  return item.y + (isMinorUnit(item) ? 29 : 46);
}

function snapToCanvasGrid(value, step = 16) {
  return Math.max(24, Math.round(value / step) * step);
}

function relevantEquations() {
  const selectedUnit = state.units.find((item) => item.id === state.selectedId);
  const selectedStream = state.streams.find((item) => item.id === state.selectedId);
  const categories = selectedStream ? ["mass", "energy"] : selectedUnit?.cls === "Bioreactor" ? ["kinetics", "mass", "energy"] : selectedUnit?.cls === "Purification" ? ["separation", "mass"] : selectedUnit?.cls === "Filtration" ? ["separation", "mass"] : selectedUnit?.cls === "Thermal" ? ["energy", "separation"] : ["mass", "separation", "economics"];
  return equations.filter((item) => categories.includes(item.category)).slice(0, 4);
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
  const p = state.params;
  const processYield = (state.recovery / 100) * (p.viability / 100) * (p.harvestRecovery / 100) * (p.clarificationYield / 100) * (p.chromYield / 100) * (p.ufdfYield / 100);
  const effectiveTiter = state.titer * Math.min(1.35, Math.max(0.45, (p.viability / 92) * (p.cellDensity / 18) * (p.doSetpoint / 40) * (7.6 - Math.abs(p.ph - 7.1)) / 7.6));
  const annualKg = state.batchSize * effectiveTiter * state.batchCount * processYield / 1000;
  const reactorCount = state.units.filter((item) => item.cls === "Bioreactor").length || 1;
  const downstreamCount = state.units.filter((item) => item.cls !== "Bioreactor").length || 1;
  const bioAdjustment = Math.max(0.75, Math.min(1.6, p.doublingTime / 24 + p.perfusionRate * 0.03 - p.specificGrowth * 0.8));
  const batchDuration = state.units.reduce((sum, item) => sum + item.residence, 0) * bioAdjustment + reactorCount * 5 + downstreamCount * 0.75;
  const utilization = Math.min(96, (state.batchCount * batchDuration / 8760) * 100);
  const utilities = (state.units.reduce((sum, item) => sum + item.powerFactor, 0) + p.agitation * reactorCount + p.aeration * 8 + p.kla * 0.04) * batchDuration * state.batchCount / 1000;
  const productPerBatchKg = state.batchSize * effectiveTiter * processYield / 1000;
  const preliminary = { annualKg, batchDuration, utilization, utilities, productPerBatchKg, processYield, effectiveTiter };
  const scale = scaleEconomics(preliminary);
  const directCost = scale.directCost;

  return { annualKg, batchDuration, utilization, directCost, utilities, productPerBatchKg, processYield, effectiveTiter, scale };
}

function unitSize(item) {
  const basis = item.cls === "Bioreactor" ? state.batchSize * 1.25 : state.batchSize * 0.35;
  if (item.cls === "Piping") return "line item";
  if (item.cls === "Instrumentation") return "inline point";
  if (item.cls === "Environmental") return `${formatNumber(Math.max(8, state.batchSize / 900), 0)} m3/d`;
  if (item.cls === "Air pollution") return `${formatNumber(Math.max(120, state.batchSize / 20), 0)} Nm3/h`;
  if (item.cls === "Thermal") return `${formatNumber(Math.max(25, state.batchSize * item.powerFactor / 320), 0)} kW duty`;
  if (item.cls === "Filtration") return `${formatNumber(Math.max(2, state.batchSize / 180), 1)} m2`;
  if (item.cls === "Viral safety") return `${formatNumber(Math.max(1.5, state.batchSize / 260), 1)} m2 or hold h`;
  if (item.cls === "Purification") return `${formatNumber(Math.max(0.02, state.batchSize * state.titer / 180000), 2)} m3 resin`;
  if (item.cls === "Concentration") return `${formatNumber(Math.max(3, state.batchSize / 220), 1)} m2 membrane`;
  if (item.cls === "Separation") return `${formatNumber(Math.max(0.3, state.batchSize / 4200), 1)} m3/h`;
  if (item.cls === "Recovery") return `${formatNumber(Math.max(0.1, state.batchSize * state.titer / 140000), 2)} t cake`;
  if (item.cls === "Solid-liquid") return `${formatNumber(Math.max(50, state.batchSize / 3), 0)} L/h`;
  if (item.cls === "Sterilization") return `${formatNumber(Math.max(0.2, state.batchSize / 2500), 1)} m3 chamber`;
  if (item.cls === "Containment") return `${formatNumber(Math.max(1, state.batchSize / 12000), 1)} Grade A zone`;
  if (item.cls === "Packaging") return `${formatNumber(Math.max(600, state.batchSize * 0.08), 0)} units/h`;
  if (item.cls === "Quality") return `${formatNumber(Math.max(3, state.units.length * 1.5), 0)} assays`;
  if (item.cls === "Utilities") return `${formatNumber(Math.max(0.5, state.batchSize / 6000), 1)} m3 skid`;
  return `${formatNumber(Math.max(0.05, basis / 1000), 2)} m3`;
}

function unitPower(item) {
  return `${formatNumber(item.powerFactor * Math.pow(Math.max(1, state.batchSize / 1000), 0.62), 1)} kW`;
}

const balanceComponents = ["water", "substrate", "biomass", "product", "salts", "waste", "air", "cleaning"];
const propertyDatabase = {
  water: { classKey: "water", label: "Water / WFI", category: "Solvent", formula: "H2O", cp: 4.18, cpSlope: -0.002, density: 997, densitySlope: -0.31, viscosity: 0.89, viscositySlope: -0.019, osmotic: 0, heatRelease: 0, vaporPressureKpa: 3.17, henry: "", solubility: "miscible", ionicStrength: 0, source: "NIST/IAPWS engineering estimate at 25 C" },
  glucose: { classKey: "substrate", label: "D-Glucose", category: "Carbon source", formula: "C6H12O6", cp: 1.54, cpSlope: 0.001, density: 1540, densitySlope: -0.28, viscosity: 1.15, viscositySlope: -0.01, osmotic: 5.55, heatRelease: 4.1, vaporPressureKpa: 0, henry: "", solubility: "high", ionicStrength: 0, source: "CRC/Merck-style engineering estimate" },
  lactose: { classKey: "substrate", label: "Lactose", category: "Carbon source", formula: "C12H22O11", cp: 1.25, cpSlope: 0.001, density: 1530, densitySlope: -0.2, viscosity: 1.2, viscositySlope: -0.009, osmotic: 2.9, heatRelease: 3.9, vaporPressureKpa: 0, henry: "", solubility: "moderate", ionicStrength: 0, source: "Bioprocess media engineering estimate" },
  glutamine: { classKey: "substrate", label: "L-Glutamine", category: "Nitrogen source", formula: "C5H10N2O3", cp: 1.6, cpSlope: 0.001, density: 1460, densitySlope: -0.2, viscosity: 1.1, viscositySlope: -0.008, osmotic: 6.8, heatRelease: 2.6, vaporPressureKpa: 0, henry: "", solubility: "moderate", ionicStrength: 0, source: "Cell-culture media engineering estimate" },
  aminoAcids: { classKey: "substrate", label: "Amino acid pool", category: "Media nutrient", formula: "mixed", cp: 1.75, cpSlope: 0.001, density: 1350, densitySlope: -0.2, viscosity: 1.15, viscositySlope: -0.008, osmotic: 7.2, heatRelease: 2.2, vaporPressureKpa: 0, henry: "", solubility: "mixed", ionicStrength: 0.04, source: "Cell-culture media engineering estimate" },
  wetCells: { classKey: "biomass", label: "Wet mammalian cells", category: "Biomass", formula: "CH1.8O0.5N0.2 proxy", cp: 3.6, cpSlope: -0.001, density: 1060, densitySlope: -0.22, viscosity: 2.2, viscositySlope: -0.012, osmotic: 0.3, heatRelease: 0.8, vaporPressureKpa: 0, henry: "", solubility: "suspension", ionicStrength: 0.02, source: "Wet-cell slurry engineering estimate" },
  microbialBiomass: { classKey: "biomass", label: "Microbial biomass", category: "Biomass", formula: "CH1.8O0.5N0.2 proxy", cp: 3.2, cpSlope: -0.001, density: 1080, densitySlope: -0.2, viscosity: 2.6, viscositySlope: -0.014, osmotic: 0.4, heatRelease: 1.1, vaporPressureKpa: 0, henry: "", solubility: "suspension", ionicStrength: 0.03, source: "Fermentation broth engineering estimate" },
  proteinProduct: { classKey: "product", label: "Protein / mAb product", category: "Product", formula: "protein", cp: 2.1, cpSlope: 0.0005, density: 1350, densitySlope: -0.18, viscosity: 1.4, viscositySlope: -0.006, osmotic: 0.05, heatRelease: 0, vaporPressureKpa: 0, henry: "", solubility: "aqueous", ionicStrength: 0.01, source: "Protein solution engineering estimate" },
  penicillinG: { classKey: "product", label: "Penicillin G", category: "Product", formula: "C16H18N2O4S", cp: 1.25, cpSlope: 0.0008, density: 1410, densitySlope: -0.18, viscosity: 1.25, viscositySlope: -0.006, osmotic: 0.2, heatRelease: 0, vaporPressureKpa: 0, henry: "", solubility: "pH-dependent", ionicStrength: 0.02, source: "API engineering estimate" },
  sodiumChloride: { classKey: "salts", label: "Sodium chloride", category: "Salt", formula: "NaCl", cp: 0.86, cpSlope: 0.0003, density: 2160, densitySlope: -0.1, viscosity: 1.15, viscositySlope: -0.006, osmotic: 34.2, heatRelease: 0, vaporPressureKpa: 0, henry: "", solubility: "359 g/L", ionicStrength: 1, source: "CRC/NIST engineering estimate" },
  phosphateBuffer: { classKey: "salts", label: "Phosphate buffer", category: "Buffer", formula: "Na/K phosphate", cp: 0.95, cpSlope: 0.0003, density: 1800, densitySlope: -0.12, viscosity: 1.18, viscositySlope: -0.006, osmotic: 18, heatRelease: 0, vaporPressureKpa: 0, henry: "", solubility: "high", ionicStrength: 0.12, source: "USP/bioprocess buffer engineering estimate" },
  bicarbonate: { classKey: "salts", label: "Sodium bicarbonate", category: "Buffer", formula: "NaHCO3", cp: 1.0, cpSlope: 0.0004, density: 2200, densitySlope: -0.1, viscosity: 1.16, viscositySlope: -0.006, osmotic: 20, heatRelease: 0, vaporPressureKpa: 0, henry: "", solubility: "96 g/L", ionicStrength: 0.1, source: "Cell-culture buffer engineering estimate" },
  oxygen: { classKey: "air", label: "Oxygen", category: "Gas", formula: "O2", cp: 0.92, cpSlope: 0.0002, density: 1.33, densitySlope: -0.004, viscosity: 0.020, viscositySlope: 0.00004, osmotic: 0, heatRelease: 0, vaporPressureKpa: "", henry: "low mg/L at ambient", solubility: "sparging-limited", ionicStrength: 0, source: "Perry/NIST gas estimate" },
  carbonDioxide: { classKey: "air", label: "Carbon dioxide", category: "Gas", formula: "CO2", cp: 0.84, cpSlope: 0.0004, density: 1.84, densitySlope: -0.006, viscosity: 0.015, viscositySlope: 0.00003, osmotic: 0, heatRelease: 0, vaporPressureKpa: "", henry: "pH-dependent", solubility: "absorbs into buffer", ionicStrength: 0, source: "Perry/NIST gas estimate" },
  lactate: { classKey: "waste", label: "Lactate", category: "Metabolite", formula: "C3H5O3-", cp: 2.2, cpSlope: 0.0008, density: 1200, densitySlope: -0.18, viscosity: 1.35, viscositySlope: -0.008, osmotic: 11, heatRelease: 0.1, vaporPressureKpa: 0, henry: "", solubility: "high", ionicStrength: 0.1, source: "CHO metabolite engineering estimate" },
  ammonium: { classKey: "waste", label: "Ammonium / ammonia", category: "Metabolite", formula: "NH4+/NH3", cp: 4.0, cpSlope: -0.001, density: 1000, densitySlope: -0.25, viscosity: 1.0, viscositySlope: -0.012, osmotic: 17, heatRelease: 0, vaporPressureKpa: "pH-dependent", henry: "pH-dependent", solubility: "high", ionicStrength: 0.1, source: "Cell-culture waste engineering estimate" },
  hostCellProtein: { classKey: "waste", label: "Host-cell protein", category: "Impurity", formula: "protein mix", cp: 2.2, cpSlope: 0.0005, density: 1320, densitySlope: -0.16, viscosity: 1.45, viscositySlope: -0.006, osmotic: 0.05, heatRelease: 0, vaporPressureKpa: 0, henry: "", solubility: "aqueous/colloidal", ionicStrength: 0.01, source: "Downstream impurity engineering estimate" },
  dna: { classKey: "waste", label: "Host-cell DNA", category: "Impurity", formula: "DNA", cp: 1.7, cpSlope: 0.0004, density: 1700, densitySlope: -0.12, viscosity: 4.5, viscositySlope: -0.018, osmotic: 0.03, heatRelease: 0, vaporPressureKpa: 0, henry: "", solubility: "aqueous", ionicStrength: 0.02, source: "Nucleic-acid impurity engineering estimate" },
  ethanol: { classKey: "waste", label: "Ethanol", category: "Solvent/metabolite", formula: "C2H6O", cp: 2.44, cpSlope: 0.002, density: 789, densitySlope: -0.85, viscosity: 1.07, viscositySlope: -0.016, osmotic: 21.7, heatRelease: 7.4, vaporPressureKpa: 7.9, henry: "volatile", solubility: "miscible", ionicStrength: 0, source: "NIST/Perry solvent estimate" },
  acetate: { classKey: "waste", label: "Acetate", category: "Metabolite", formula: "CH3COO-", cp: 2.0, cpSlope: 0.0008, density: 1180, densitySlope: -0.18, viscosity: 1.25, viscositySlope: -0.008, osmotic: 12, heatRelease: 0.2, vaporPressureKpa: 0, henry: "", solubility: "high", ionicStrength: 0.1, source: "Fermentation metabolite engineering estimate" },
  sodiumHydroxide: { classKey: "cleaning", label: "Sodium hydroxide CIP", category: "Cleaning", formula: "NaOH", cp: 3.8, cpSlope: -0.001, density: 1100, densitySlope: -0.45, viscosity: 1.25, viscositySlope: -0.01, osmotic: 50, heatRelease: 0, vaporPressureKpa: 2.8, henry: "", solubility: "high", ionicStrength: 1, source: "CIP chemical engineering estimate" },
  hydrochloricAcid: { classKey: "cleaning", label: "Hydrochloric acid / acid rinse", category: "Cleaning", formula: "HCl", cp: 3.9, cpSlope: -0.001, density: 1050, densitySlope: -0.42, viscosity: 1.05, viscositySlope: -0.01, osmotic: 40, heatRelease: 0, vaporPressureKpa: 3.2, henry: "volatile acid", solubility: "high", ionicStrength: 1, source: "CIP acid engineering estimate" },
  ipa: { classKey: "cleaning", label: "Isopropanol / solvent", category: "Solvent", formula: "C3H8O", cp: 2.68, cpSlope: 0.002, density: 786, densitySlope: -0.8, viscosity: 2.04, viscositySlope: -0.024, osmotic: 16.6, heatRelease: 8.3, vaporPressureKpa: 6.0, henry: "volatile", solubility: "miscible", ionicStrength: 0, source: "NIST/Perry solvent estimate" },
  antifoam: { classKey: "cleaning", label: "Antifoam / silicone oil", category: "Additive", formula: "polymer mix", cp: 1.6, cpSlope: 0.001, density: 970, densitySlope: -0.35, viscosity: 100, viscositySlope: -0.9, osmotic: 0, heatRelease: 0, vaporPressureKpa: 0, henry: "", solubility: "emulsion", ionicStrength: 0, source: "Antifoam engineering estimate" },
};
const componentProperties = aggregateComponentProperties();
let massBalanceCache = { key: "", value: null };

function propertyAtTemperature(record, temperatureC = state.params.temperature || 25) {
  const delta = temperatureC - 25;
  return {
    ...record,
    cp: Math.max(0.1, record.cp + (record.cpSlope || 0) * delta),
    density: Math.max(0.01, record.density + (record.densitySlope || 0) * delta),
    viscosity: Math.max(0.001, record.viscosity + (record.viscositySlope || 0) * delta),
  };
}

function aggregateComponentProperties(temperatureC = 25) {
  const grouped = balanceComponents.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});
  Object.values(propertyDatabase).forEach((item) => {
    grouped[item.classKey]?.push(propertyAtTemperature(item, temperatureC));
  });

  return Object.fromEntries(balanceComponents.map((key) => {
    const items = grouped[key] || [];
    const count = items.length || 1;
    const average = (field) => items.reduce((sum, item) => sum + (Number(item[field]) || 0), 0) / count;
    return [key, {
      label: {
        water: "Water / aqueous solvent",
        substrate: "Nutrient and carbon source pool",
        biomass: "Wet biomass / cells",
        product: "Product pool",
        salts: "Salts and buffers",
        waste: "Metabolites and impurities",
        air: "Air and process gases",
        cleaning: "Cleaning chemicals and additives",
      }[key],
      cp: average("cp"),
      density: average("density"),
      viscosity: average("viscosity"),
      osmotic: average("osmotic"),
      heatRelease: average("heatRelease"),
      source: `${items.length} detailed property records aggregated`,
      records: items.length,
    }];
  }));
}

function propertyRows(temperatureC = state.params.temperature || 25) {
  return Object.entries(propertyDatabase).map(([key, value]) => {
    const corrected = propertyAtTemperature(value, temperatureC);
    return {
      component: key,
      classKey: value.classKey,
      label: value.label,
      category: value.category,
      formula: value.formula,
      temperatureC,
      cpKjKgK: corrected.cp,
      densityKgM3: corrected.density,
      viscosityCp: corrected.viscosity,
      osmoticIndex: value.osmotic,
      heatReleaseKwhKgProxy: value.heatRelease,
      vaporPressureKpa: value.vaporPressureKpa,
      henry: value.henry,
      solubility: value.solubility,
      ionicStrengthProxy: value.ionicStrength,
      source: value.source,
    };
  });
}

function aggregatePropertyRows(temperatureC = state.params.temperature || 25) {
  const aggregate = aggregateComponentProperties(temperatureC);
  return Object.entries(aggregate).map(([key, value]) => ({
    classKey: key,
    label: value.label,
    records: value.records,
    temperatureC,
    cpKjKgK: value.cp,
    densityKgM3: value.density,
    viscosityCp: value.viscosity,
    osmoticIndex: value.osmotic,
    heatReleaseKwhKgProxy: value.heatRelease,
    source: value.source,
  }));
}

function massBalanceCacheKey() {
  return [
    state.template,
    state.scale,
    state.batchSize,
    state.batchCount,
    state.titer,
    state.recovery,
    processParameters.map((item) => `${item.key}:${state.params[item.key]}`).join(","),
    state.units.map((item) => `${item.id}:${item.type}:${item.name}:${item.cls}:${item.residence}:${item.powerFactor}:${item.x}:${item.y}:${item.status}`).join("|"),
    state.streams.map((item) => `${item.id}:${item.from}:${item.to}:${item.composition}:${item.phase}`).join("|"),
  ].join("||");
}

function zeroVector() {
  return balanceComponents.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
}

function vectorMass(vector) {
  return balanceComponents.reduce((sum, key) => sum + Math.max(0, Number(vector[key]) || 0), 0);
}

function vectorHeatCapacity(vector) {
  const aggregate = aggregateComponentProperties(state.params.temperature || 25);
  return balanceComponents.reduce((sum, key) => sum + Math.max(0, vector[key] || 0) * (aggregate[key]?.cp || 0), 0);
}

function vectorDensity(vector, temperatureC = state.params.temperature || 25) {
  const aggregate = aggregateComponentProperties(temperatureC);
  const mass = vectorMass(vector);
  if (!mass) return 0;
  const volumeM3 = balanceComponents.reduce((sum, key) => {
    const density = aggregate[key]?.density || 1000;
    return sum + Math.max(0, vector[key] || 0) / density;
  }, 0);
  return volumeM3 ? mass / volumeM3 : 0;
}

function vectorViscosity(vector, temperatureC = state.params.temperature || 25) {
  const aggregate = aggregateComponentProperties(temperatureC);
  const mass = vectorMass(vector);
  if (!mass) return 0;
  return balanceComponents.reduce((sum, key) => {
    const fraction = Math.max(0, vector[key] || 0) / mass;
    return sum + fraction * (aggregate[key]?.viscosity || 1);
  }, 0);
}

function vectorOsmoticPressure(vector, temperatureC = state.params.temperature || 25) {
  const aggregate = aggregateComponentProperties(temperatureC);
  const mass = vectorMass(vector);
  if (!mass) return 0;
  return balanceComponents.reduce((sum, key) => {
    const fraction = Math.max(0, vector[key] || 0) / mass;
    return sum + fraction * (aggregate[key]?.osmotic || 0);
  }, 0);
}

function addVector(target, source, factor = 1) {
  balanceComponents.forEach((key) => {
    target[key] = (target[key] || 0) + (source[key] || 0) * factor;
  });
  return target;
}

function scaleVector(vector, factor) {
  const scaled = zeroVector();
  balanceComponents.forEach((key) => {
    scaled[key] = Math.max(0, (vector[key] || 0) * factor);
  });
  return scaled;
}

function componentSummary(vector) {
  const total = vectorMass(vector);
  if (!total) return "No material";
  return balanceComponents
    .map((key) => ({ key, value: vector[key] || 0 }))
    .filter((item) => item.value / total >= 0.005 || ["product", "biomass"].includes(item.key) && item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((item) => `${item.key} ${formatNumber(item.value, item.value < 1 ? 3 : 1)} kg`)
    .join("; ");
}

function sourceVectorForUnit(unitItem) {
  const p = state.params;
  const vector = zeroVector();
  const text = `${unitItem.id} ${unitItem.type} ${unitItem.name} ${unitItem.cls}`.toLowerCase();
  const density = p.densitySafetyFactor || 1.03;
  let mass = Math.max(1, state.batchSize * density);

  if (unitItem.cls === "Utilities" || text.includes("wfi") || text.includes("steam") || text.includes("cip") || text.includes("sip")) {
    mass = Math.max(25, state.batchSize * 0.08);
    vector.water = mass * 0.78;
    vector.cleaning = mass * 0.18;
    vector.salts = mass * 0.04;
  } else if (unitItem.cls === "Piping" || unitItem.cls === "Instrumentation" || unitItem.cls === "Quality") {
    mass = unitItem.cls === "Quality" ? 0.25 : 0.05;
    vector.water = mass;
  } else if (unitItem.cls === "Air pollution" || unitItem.cls === "Environmental") {
    mass = Math.max(10, state.batchSize * 0.01);
    vector.waste = mass * 0.8;
    vector.water = mass * 0.2;
  } else if (text.includes("air") || text.includes("oxygen") || unitItem.cls === "Gas handling") {
    mass = Math.max(5, state.batchSize * (p.aeration || 0.35) * 0.08);
    vector.air = mass;
  } else {
    const glucoseMass = Math.max(0.05, state.batchSize * (p.glucose || 4) / 1000);
    vector.water = Math.max(0, mass - glucoseMass - mass * 0.015);
    vector.substrate = glucoseMass;
    vector.salts = mass * 0.015;
  }

  return vector;
}

function recoveryForUnit(unitItem) {
  const cls = unitItem.cls;
  if (["Filtration", "Solid-liquid"].includes(cls)) return Math.max(0.72, (state.params.clarificationYield || 92) / 100);
  if (["Purification", "Recovery", "Separation"].includes(cls)) return Math.max(0.65, (state.params.chromYield || 88) / 100);
  if (["Concentration", "Viral safety"].includes(cls)) return Math.max(0.76, (state.params.ufdfYield || 92) / 100);
  if (["Packaging", "Sterilization", "Thermal", "Preparation", "Hold"].includes(cls)) return 0.995;
  if (unitLayer(unitItem) === "cleaning") return 0.9;
  if (["Waste", "Environmental", "Air pollution"].includes(cls)) return 0.05;
  return 0.99;
}

function isRecycleStream(streamItem, fromUnit, toUnit, kind) {
  const text = `${streamItem.id} ${streamItem.composition} ${fromUnit?.type || ""} ${fromUnit?.name || ""} ${toUnit?.type || ""} ${toUnit?.name || ""}`.toLowerCase();
  const recycleIntent = ["recycle", "reuse", "recirc", "tear", "loop"].some((word) => text.includes(word));
  const processRecycle = kind === "main" || text.includes("solvent recycle") || text.includes("water reuse");
  return recycleIntent && processRecycle;
}

function targetTemperatureForUnit(unitItem) {
  const text = `${unitItem.type} ${unitItem.name} ${unitItem.cls}`.toLowerCase();
  if (text.includes("sip") || text.includes("steril") || unitItem.cls === "Sterilization") return 121.1;
  if (text.includes("pasteur") || text.includes("heat") || unitItem.cls === "Thermal") return 65;
  if (text.includes("cold") || text.includes("hold") || text.includes("storage")) return 8;
  if (unitItem.cls === "Bioreactor") return state.params.temperature || 36.5;
  return 25;
}

function estimateUnitEnergy(unitItem, inputVector, outputVector, wasteVector, generation) {
  const aggregate = aggregateComponentProperties(targetTemperatureForUnit(unitItem));
  const targetTemperature = targetTemperatureForUnit(unitItem);
  const inletTemperature = 22;
  const deltaT = Math.abs(targetTemperature - inletTemperature);
  const sensibleKwh = vectorHeatCapacity(inputVector) * deltaT / 3600;
  const reactionKwh = unitItem.cls === "Bioreactor"
    ? balanceComponents.reduce((sum, key) => sum + (inputVector[key] || 0) * (aggregate[key]?.heatRelease || 0), 0) * 0.18
    : generation * 0.04;
  const mechanicalKwh = unitItem.powerFactor * Math.pow(Math.max(1, state.batchSize / 1000), 0.62) * Math.max(0.25, unitItem.residence);
  const separationKwh = ["Filtration", "Solid-liquid", "Separation", "Purification", "Recovery", "Concentration"].includes(unitItem.cls)
    ? vectorMass(outputVector) * 0.006 + vectorMass(wasteVector) * 0.003
    : 0;
  const recoverableKwh = ["Thermal", "Sterilization", "Preparation", "Utilities"].includes(unitItem.cls)
    ? sensibleKwh * (state.params.heatRecovery || 0) / 100
    : 0;
  const grossKwh = sensibleKwh + reactionKwh + mechanicalKwh + separationKwh;
  const netKwh = Math.max(0, grossKwh - recoverableKwh);
  return {
    targetTemperature,
    sensibleKwh,
    reactionKwh,
    mechanicalKwh,
    separationKwh,
    recoverableKwh,
    grossKwh,
    netKwh,
    densityKgM3: vectorDensity(outputVector, targetTemperature),
    viscosityCp: vectorViscosity(outputVector, targetTemperature),
    osmoticIndex: vectorOsmoticPressure(outputVector, targetTemperature),
  };
}

function solveUnitBalance(unitItem, inputVector, data) {
  const p = state.params;
  const output = scaleVector(inputVector, 1);
  const wasteVector = zeroVector();
  const warnings = [];
  let generation = 0;
  let loss = 0;
  const text = `${unitItem.type} ${unitItem.name} ${unitItem.cls}`.toLowerCase();

  if (unitItem.cls === "Bioreactor" || text.includes("fermenter")) {
    const upstreamYield = Math.max(0.12, data.processYield || 0.5);
    const productGenerated = Math.max(0.001, data.productPerBatchKg / upstreamYield);
    const biomassGenerated = isCellCultureTemplate()
      ? Math.max(0.1, state.batchSize * (p.cellDensity || 18) * 0.000004 * (p.viability || 90) / 100)
      : Math.max(0.1, state.batchSize * 0.018);
    const substrateNeeded = (productGenerated + biomassGenerated) * (isCellCultureTemplate() ? 1.4 : 1.9);
    const substrateConsumed = Math.min(output.substrate || 0, substrateNeeded);
    output.substrate = Math.max(0, (output.substrate || 0) - substrateConsumed);
    output.product += productGenerated;
    output.biomass += biomassGenerated;
    wasteVector.waste += substrateConsumed * 0.12 + biomassGenerated * (1 - (p.viability || 90) / 100);
    wasteVector.air += Math.max(0, state.batchSize * (p.our || 4.5) * 0.00003);
    generation = productGenerated + biomassGenerated;
    if ((output.substrate || 0) < substrateNeeded * 0.1) warnings.push("Substrate nearly exhausted for selected titer and biomass target.");
    if ((p.kla || 0) * Math.max(1, p.doSetpoint || 1) / 100 < (p.our || 1)) warnings.push("Oxygen transfer margin is below OUR pressure.");
  } else if (["Filtration", "Solid-liquid", "Separation", "Purification", "Recovery", "Concentration", "Viral safety"].includes(unitItem.cls)) {
    const recovery = recoveryForUnit(unitItem);
    const productLoss = (output.product || 0) * (1 - recovery);
    output.product = Math.max(0, (output.product || 0) - productLoss);
    wasteVector.product += productLoss;
    if (["Filtration", "Solid-liquid", "Separation"].includes(unitItem.cls)) {
      const biomassRemoval = (output.biomass || 0) * 0.75;
      const wasteRemoval = (output.waste || 0) * 0.55;
      output.biomass -= biomassRemoval;
      output.waste -= wasteRemoval;
      wasteVector.biomass += biomassRemoval;
      wasteVector.waste += wasteRemoval;
    }
    if (unitItem.cls === "Purification" || unitItem.cls === "Recovery") {
      const saltRemoval = (output.salts || 0) * 0.52;
      const impurityRemoval = (output.waste || 0) * 0.72;
      output.salts -= saltRemoval;
      output.waste -= impurityRemoval;
      wasteVector.salts += saltRemoval;
      wasteVector.waste += impurityRemoval;
    }
    if (unitItem.cls === "Concentration") {
      const waterRemoval = (output.water || 0) * 0.45;
      output.water -= waterRemoval;
      wasteVector.water += waterRemoval;
    }
    if (recovery < 0.85) warnings.push("Low step recovery is materially affecting product mass.");
  } else if (unitLayer(unitItem) === "cleaning") {
    const spent = Math.max(5, state.batchSize * 0.015);
    output.cleaning += spent;
    wasteVector.cleaning += spent * 0.92;
    wasteVector.water += spent * 0.08;
  } else if (["Waste", "Environmental", "Air pollution"].includes(unitItem.cls)) {
    addVector(wasteVector, output, 0.95);
    balanceComponents.forEach((key) => { output[key] *= 0.05; });
  }

  const outputMass = vectorMass(output);
  const wasteMass = vectorMass(wasteVector);
  const inputMass = vectorMass(inputVector);
  loss += Math.max(0, inputMass + generation - outputMass - wasteMass);

  return { output, wasteVector, inputMass, outputMass, wasteMass, generation, loss, warnings };
}

function solveMassBalance() {
  const cacheKey = massBalanceCacheKey();
  if (massBalanceCache.key === cacheKey && massBalanceCache.value) return massBalanceCache.value;
  const data = metrics();
  const streamMap = {};
  const unitMap = {};
  const orderedUnits = [...state.units].sort((a, b) => (a.x - b.x) || (a.y - b.y));
  const recycleStreamIds = new Set();
  const convergenceHistory = [];
  const tolerance = Math.max(0.0005, (state.params.zeroFlowThreshold || 0.1) / Math.max(1, state.batchSize));
  let iterationCount = 0;

  for (let pass = 0; pass < 28; pass += 1) {
    let passMaxDelta = 0;
    orderedUnits.forEach((unitItem) => {
      const incoming = state.streams.filter((streamItem) => streamItem.to === unitItem.id);
      const outgoing = state.streams.filter((streamItem) => streamItem.from === unitItem.id);
      const inputVector = zeroVector();
      let usedSource = incoming.length === 0;

      incoming.forEach((streamItem) => {
        if (streamMap[streamItem.id]) {
          addVector(inputVector, streamMap[streamItem.id].components);
        }
      });

      if (vectorMass(inputVector) === 0) {
        addVector(inputVector, sourceVectorForUnit(unitItem));
        usedSource = true;
      }

      const solvedUnit = solveUnitBalance(unitItem, inputVector, data);
      const mainStreams = [];
      const wasteStreams = [];
      const utilityStreams = [];
      const qcStreams = [];

      outgoing.forEach((streamItem) => {
        const from = state.units.find((candidate) => candidate.id === streamItem.from);
        const to = state.units.find((candidate) => candidate.id === streamItem.to);
        const kind = streamKind(streamItem, from, to);
        if (kind === "waste") wasteStreams.push(streamItem);
        else if (kind === "utility") utilityStreams.push(streamItem);
        else if (kind === "qc") qcStreams.push(streamItem);
        else mainStreams.push(streamItem);
        if (isRecycleStream(streamItem, unitItem, to, kind)) recycleStreamIds.add(streamItem.id);
      });

      const assignStream = (streamItem, vector, kind, divider) => {
        const to = state.units.find((candidate) => candidate.id === streamItem.to);
        const isRecycle = isRecycleStream(streamItem, unitItem, to, kind);
        let targetComponents = scaleVector(vector, divider ? 1 / divider : 1);
        if (isRecycle) targetComponents = scaleVector(targetComponents, Math.min(0.95, Math.max(0, (state.params.recycleFraction || 0) / 100)));
        const previousComponents = streamMap[streamItem.id]?.components;
        let components = targetComponents;
        if (isRecycle && previousComponents) {
          components = scaleVector(previousComponents, 0.35);
          addVector(components, targetComponents, 0.65);
        }
        const previousMass = previousComponents ? vectorMass(previousComponents) : 0;
        const nextMass = vectorMass(components);
        if (isRecycle) {
          passMaxDelta = Math.max(passMaxDelta, Math.abs(nextMass - previousMass) / Math.max(1, nextMass, previousMass));
        }
        streamMap[streamItem.id] = {
          ...streamItem,
          role: streamLabel(kind),
          massFlow: nextMass,
          annualMass: nextMass * state.batchCount,
          components,
          componentText: componentSummary(components),
          solverStatus: isRecycle ? "Relaxed recycle" : usedSource ? "Source estimated" : "Solved",
        };
      };

      const mainTargets = mainStreams.length ? mainStreams : outgoing.filter((item) => !wasteStreams.includes(item));
      mainTargets.forEach((streamItem) => assignStream(streamItem, solvedUnit.output, "main", mainTargets.length));
      wasteStreams.forEach((streamItem) => assignStream(streamItem, solvedUnit.wasteVector, "waste", wasteStreams.length));
      utilityStreams.forEach((streamItem) => {
        const utilityVector = zeroVector();
        utilityVector.water = Math.max(0.05, solvedUnit.inputMass * 0.002);
        utilityVector.cleaning = unitLayer(unitItem) === "cleaning" ? Math.max(0.05, solvedUnit.inputMass * 0.01) : 0;
        assignStream(streamItem, utilityVector, "utility", utilityStreams.length);
      });
      qcStreams.forEach((streamItem) => {
        const qcVector = scaleVector(solvedUnit.output, 0.0005);
        assignStream(streamItem, qcVector, "qc", qcStreams.length);
      });

      const materialOut = solvedUnit.outputMass + solvedUnit.wasteMass;
      const massGap = solvedUnit.inputMass + solvedUnit.generation - solvedUnit.loss - materialOut;
      const closurePct = solvedUnit.inputMass + solvedUnit.generation
        ? Math.max(0, 100 - Math.abs(massGap) / Math.max(1, solvedUnit.inputMass + solvedUnit.generation) * 100)
        : 100;
      const energy = estimateUnitEnergy(unitItem, inputVector, solvedUnit.output, solvedUnit.wasteVector, solvedUnit.generation);

      unitMap[unitItem.id] = {
        tag: unitItem.id,
        operation: unitItem.name,
        class: unitItem.cls,
        inputStreams: incoming.map((item) => item.id).join("; "),
        outputStreams: outgoing.map((item) => item.id).join("; "),
        massIn: solvedUnit.inputMass,
        generation: solvedUnit.generation,
        loss: solvedUnit.loss,
        massOut: materialOut,
        massGap,
        closurePct,
        heatDuty: energy.netKwh,
        grossHeatDuty: energy.grossKwh,
        recoveredHeat: energy.recoverableKwh,
        power: unitItem.powerFactor,
        targetTemperature: energy.targetTemperature,
        densityKgM3: energy.densityKgM3,
        viscosityCp: energy.viscosityCp,
        osmoticIndex: energy.osmoticIndex,
        equation: unitReactions(unitItem)[0]?.formula || "Σm_in + generation = Σm_out + loss + accumulation",
        equations: unitReactions(unitItem).map((item) => item.title).join("; "),
        componentsIn: componentSummary(inputVector),
        componentsOut: componentSummary(solvedUnit.output),
        solverStatus: usedSource ? "Source estimated" : "Solved",
        warnings: solvedUnit.warnings.join("; "),
      };
    });
    convergenceHistory.push(passMaxDelta);
    iterationCount = pass + 1;
    if (pass > 1 && passMaxDelta < tolerance) break;
  }

  const units = state.units.map((unitItem) => unitMap[unitItem.id]).filter(Boolean);
  const streams = state.streams.map((streamItem) => streamMap[streamItem.id]).filter(Boolean);
  const totals = units.reduce((acc, item) => {
    acc.massIn += item.massIn;
    acc.generation += item.generation;
    acc.loss += item.loss;
    acc.massOut += item.massOut;
    acc.absGap += Math.abs(item.massGap);
    if (item.warnings) acc.warningCount += item.warnings.split(";").filter(Boolean).length;
    return acc;
  }, { massIn: 0, generation: 0, loss: 0, massOut: 0, absGap: 0, warningCount: 0 });
  totals.closurePct = totals.massIn + totals.generation
    ? Math.max(0, 100 - totals.absGap / Math.max(1, totals.massIn + totals.generation) * 100)
    : 100;
  totals.solvedStreams = streams.length;
  totals.netHeatDuty = units.reduce((sum, item) => sum + (item.heatDuty || 0), 0);
  totals.grossHeatDuty = units.reduce((sum, item) => sum + (item.grossHeatDuty || 0), 0);
  totals.recoveredHeat = units.reduce((sum, item) => sum + (item.recoveredHeat || 0), 0);

  const result = {
    basis: "kg/batch",
    streamMap,
    unitMap,
    units,
    streams,
    totals,
    convergence: {
      iterations: iterationCount,
      tolerance,
      maxRelativeDelta: convergenceHistory.at(-1) || 0,
      history: convergenceHistory,
      recycleStreams: [...recycleStreamIds],
      converged: !recycleStreamIds.size || (convergenceHistory.at(-1) || 0) < tolerance,
    },
    warnings: recycleStreamIds.size && (convergenceHistory.at(-1) || 0) >= tolerance
      ? [`Recycle solver stopped after ${iterationCount} iterations at ${formatNumber((convergenceHistory.at(-1) || 0) * 100, 3)}% relative delta.`]
      : [],
    properties: aggregateComponentProperties(state.params.temperature || 25),
    detailedProperties: propertyRows(),
  };
  massBalanceCache = { key: cacheKey, value: result };
  return result;
}

function streamFlow(item) {
  const solved = solveMassBalance().streamMap[item.id];
  if (solved) return `${formatNumber(solved.massFlow, solved.massFlow < 10 ? 2 : 1)} kg / batch`;
  if (item.phase === "Solid") return `${formatMass(metrics().productPerBatchKg)} / batch`;
  if (item.phase === "Slurry") return `${formatNumber(metrics().productPerBatchKg * 1.25, 1)} kg / batch`;
  return `${formatNumber(state.batchSize, 0)} L / batch`;
}

function streamDirection(item) {
  const from = state.units.find((candidate) => candidate.id === item.from);
  const to = state.units.find((candidate) => candidate.id === item.to);
  const incoming = state.streams.some((candidate) => candidate.to === item.from);
  const outgoing = state.streams.some((candidate) => candidate.from === item.to);
  const text = `${item.id} ${item.composition} ${from?.name || ""} ${to?.name || ""}`.toLowerCase();
  if (!incoming || text.includes("raw") || text.includes("wfi") || text.includes("media feed")) return "Input";
  if (!outgoing || text.includes("final") || text.includes("waste") || text.includes("release") || text.includes("pack")) return "Output";
  return "Internal";
}

function streamRows() {
  const solved = solveMassBalance();
  return state.streams.map((item) => {
    const from = state.units.find((candidate) => candidate.id === item.from);
    const to = state.units.find((candidate) => candidate.id === item.to);
    const kind = streamKind(item, from, to);
    const solvedStream = solved.streamMap[item.id];
    return {
      id: item.id,
      direction: streamDirection(item),
      role: streamLabel(kind),
      from: item.from,
      fromName: from?.name || "",
      to: item.to,
      toName: to?.name || "",
      flow: streamFlow(item),
      massFlowKgBatch: solvedStream?.massFlow || streamNumericFlow(item),
      annualMassKg: solvedStream?.annualMass || streamNumericFlow(item) * state.batchCount,
      components: solvedStream?.componentText || item.composition,
      nominalDescription: item.composition,
      phase: item.phase,
      solverStatus: solvedStream?.solverStatus || "Estimated",
      densityKgM3: solvedStream?.components ? vectorDensity(solvedStream.components) : "",
      viscosityCp: solvedStream?.components ? vectorViscosity(solvedStream.components) : "",
      osmoticIndex: solvedStream?.components ? vectorOsmoticPressure(solvedStream.components) : "",
    };
  });
}

function isCellCultureTemplate() {
  return ["culturedMeat", "antibody", "vaccine", "cellTherapy"].includes(state.template);
}

function estimatedBioreactorVolumeL(item) {
  if (item.cls !== "Bioreactor") return 0;
  if (["seed-reactor", "seed-flask", "wave"].includes(item.type)) return Math.max(10, state.batchSize * 0.15);
  if (item.type === "perfusion") return Math.max(50, state.batchSize * 0.65);
  return Math.max(50, state.batchSize * 1.25);
}

function boundarySeverity(value, warn, critical, direction = "max") {
  if (direction === "min") {
    if (value <= critical) return "critical";
    if (value <= warn) return "caution";
    return "ok";
  }
  if (value >= critical) return "critical";
  if (value >= warn) return "caution";
  return "ok";
}

function severityLabel(severity) {
  return {
    ok: "Within boundary",
    caution: "Review needed",
    critical: "Hard boundary risk",
  }[severity] || "Review needed";
}

function evaluatePhysicalBoundaries() {
  const p = state.params;
  const cellCulture = isCellCultureTemplate();
  const bioreactors = state.units.filter((item) => item.cls === "Bioreactor");
  const maxBioreactor = bioreactors
    .map((item) => ({ unit: item, volume: estimatedBioreactorVolumeL(item) }))
    .sort((a, b) => b.volume - a.volume)[0];
  const transferIndex = (p.kla * Math.max(1, p.doSetpoint) / 100) / Math.max(0.1, p.our || 1);
  const volumeSeverity = cellCulture && maxBioreactor ? boundarySeverity(maxBioreactor.volume, 15000, 20000) : "ok";
  const ammoniaSeverity = cellCulture ? boundarySeverity(p.ammonia, 2, 6) : boundarySeverity(p.ammonia, 6, 10);
  const lactateSeverity = cellCulture ? boundarySeverity(p.lactate, 2, 4) : "ok";
  const osmolaritySeverity = cellCulture ? boundarySeverity(p.osmCrit, 0.32, 0.36) : "ok";
  const phDeviation = Math.abs((p.ph || 7.1) - 7.1);
  const phSeverity = phDeviation >= 0.6 ? "critical" : phDeviation >= 0.3 ? "caution" : "ok";
  const temperatureDeviation = Math.abs((p.temperature || 36.5) - 36.8);
  const temperatureSeverity = cellCulture ? (temperatureDeviation >= 2 ? "critical" : temperatureDeviation >= 1 ? "caution" : "ok") : "ok";
  const doSeverity = cellCulture ? ((p.doSetpoint < 20 || p.doSetpoint > 70) ? "critical" : (p.doSetpoint < 30 || p.doSetpoint > 60) ? "caution" : "ok") : "ok";
  const transferSeverity = cellCulture ? boundarySeverity(transferIndex, 1.6, 1.0, "min") : "ok";
  const shearSeverity = cellCulture ? boundarySeverity(p.agitation, 2.5, 5) : "ok";

  return [
    {
      key: "ammonium",
      title: "Ammonium / ammonia accumulation",
      value: `${formatNumber(p.ammonia, 1)} mM`,
      limit: cellCulture ? "Target <2 mM; >6 mM hard review" : "Microbial process: review >6-10 mM",
      severity: ammoniaSeverity,
      source: "Schneider et al.; CHO ammonium/lactate/glutamine study",
      recommendation: ammoniaSeverity === "ok" ? "Metabolic waste is inside the conservative cell-culture boundary." : "Reduce glutamine burden, intensify perfusion/bleed, adjust feed strategy, and add ammonium soft-sensor tracking.",
    },
    {
      key: "bioreactor-volume",
      title: "Mammalian-cell bioreactor volume",
      value: maxBioreactor ? `${formatNumber(maxBioreactor.volume, 0)} L (${maxBioreactor.unit.id})` : "No bioreactor",
      limit: cellCulture ? "Prefer scale-out/intensification above 15,000 L; hard review above 20,000 L" : "20,000 L limit is mammalian-cell specific",
      severity: volumeSeverity,
      source: "BioPharm International; BioProcess International; Sartorius intensification",
      recommendation: volumeSeverity === "ok" ? "Scale is inside the conservative mammalian-cell reference boundary." : "Do not linearly scale cell culture beyond 20,000 L; use parallel reactors, 2,000 L class intensified single-use/perfusion, or a validated scale-down model.",
    },
    {
      key: "oxygen-transfer",
      title: "Oxygen transfer vs OUR",
      value: `${formatNumber(transferIndex, 2)} transfer index`,
      limit: "Target >1.6; review 1.0-1.6; hard risk <1.0",
      severity: transferSeverity,
      source: "BioProcess International 20,000 L oxygen transfer/shear analysis",
      recommendation: transferSeverity === "ok" ? "kLa/DO/OUR relationship is inside the model boundary." : "Review sparging, oxygen enrichment, impeller selection, headspace pressure, and maximum cell-density assumption.",
    },
    {
      key: "lactate",
      title: "Lactate accumulation",
      value: `${formatNumber(p.lactate, 1)} g/L`,
      limit: "Target <2 g/L; hard review >4 g/L for mammalian-cell templates",
      severity: lactateSeverity,
      source: "CHO ammonium/lactate/glutamine study",
      recommendation: lactateSeverity === "ok" ? "Lactate remains inside the conservative boundary." : "Review glucose feed, pH, base addition, lactate metabolic shift, and perfusion/bleed strategy.",
    },
    {
      key: "ph",
      title: "pH operating window",
      value: `${formatNumber(p.ph, 2)}`,
      limit: "Model target 7.1 ±0.3; hard review outside ±0.6",
      severity: phSeverity,
      source: "Mammalian cell-culture operating-window practice",
      recommendation: phSeverity === "ok" ? "pH is inside the modeled cell-culture window." : "Review CO2 stripping, base addition, osmolality, lactate/ammonium formation, and control-loop tuning.",
    },
    {
      key: "osmolarity",
      title: "Osmolarity / solubility pressure",
      value: `${formatNumber(p.osmCrit, 2)} mol/L`,
      limit: "Target <0.32 mol/L; hard review >0.36 mol/L",
      severity: osmolaritySeverity,
      source: "Cell-culture media solubility and osmolarity constraints",
      recommendation: osmolaritySeverity === "ok" ? "Osmolarity proxy is inside boundary." : "Check concentrated feeds, salts, base addition, evaporation, and precipitation risk.",
    },
    {
      key: "temperature",
      title: "Cell-culture temperature",
      value: `${formatNumber(p.temperature, 1)} C`,
      limit: "Model target 36.8 C; review deviation >1 C",
      severity: temperatureSeverity,
      source: "Mammalian cell-culture operating-window practice",
      recommendation: temperatureSeverity === "ok" ? "Temperature is inside modeled cell-culture boundary." : "Review heat-transfer capacity, sensor placement, mixing time, and temperature-shift strategy.",
    },
    {
      key: "shear",
      title: "Agitation / shear proxy",
      value: `${formatNumber(p.agitation, 2)} W/L`,
      limit: "Review >2.5 W/L; hard review >5 W/L for mammalian cells",
      severity: shearSeverity,
      source: "BioProcess International 20,000 L oxygen transfer/shear analysis",
      recommendation: shearSeverity === "ok" ? "Agitation proxy is inside conservative shear boundary." : "Review impeller tip speed, sparger choice, antifoam, cell fragility, and kLa alternatives.",
    },
    {
      key: "do",
      title: "Dissolved oxygen setpoint",
      value: `${formatNumber(p.doSetpoint, 0)}% air saturation`,
      limit: "Target 30-60%; hard review outside 20-70%",
      severity: doSeverity,
      source: "Mammalian cell-culture control practice",
      recommendation: doSeverity === "ok" ? "DO setpoint is inside modeled operating window." : "Review oxygen transfer, CO2 stripping, cell-density target, and controller range.",
    },
  ];
}

function boundarySummary() {
  const boundaries = evaluatePhysicalBoundaries();
  const critical = boundaries.filter((item) => item.severity === "critical").length;
  const caution = boundaries.filter((item) => item.severity === "caution").length;
  return { boundaries, critical, caution, ok: boundaries.length - critical - caution };
}

function parameterGroup(item) {
  if (item.custom) return "Custom user parameters";
  if (["ph", "osmolality", "temperature", "viability", "cellDensity", "doublingTime", "specificGrowth", "biomassYield"].includes(item.key)) return "Cell physiology";
  if (["kla", "doSetpoint", "agitation", "aeration", "oxygenUptake", "co2Removal", "viscosity", "density", "heatRecovery"].includes(item.key)) return "Transfer + rheology";
  if (["perfusionRate", "dilutionRate", "harvestRecovery", "clarificationYield", "chromYield", "ufdfYield", "filterFlux", "resinCapacity"].includes(item.key)) return "Downstream + yield";
  if (["cipTime", "sipHold", "sterilityAssurance", "bioburdenLimit", "endotoxinLimit", "holdTimeLimit"].includes(item.key)) return "GMP + cleaning";
  if (["capitalScaleExponent", "labFixedBurden", "facilityPremium", "validationFactor", "automationLevel", "learningRate", "bottleneckUtil", "recycleFraction"].includes(item.key)) return "Scale-up + economics";
  return "Environmental + utilities";
}

function addCustomParameter() {
  const label = els.customParamName.value.trim();
  const value = Number(els.customParamValue.value);
  const unit = els.customParamUnit.value.trim();
  if (!label || !Number.isFinite(value)) {
    showToast("Add a parameter name and numeric value");
    return;
  }
  const baseKey = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "custom";
  let key = `custom-${baseKey}`;
  let suffix = 2;
  while (processParameters.some((item) => item.key === key)) key = `custom-${baseKey}-${suffix++}`;
  const spread = Math.max(1, Math.abs(value) || 1);
  processParameters.push({
    key,
    label,
    unit,
    min: Math.min(0, value - spread * 2),
    max: value + spread * 2,
    step: spread >= 10 ? 1 : 0.01,
    value,
    custom: true,
  });
  state.params[key] = value;
  els.customParamName.value = "";
  els.customParamValue.value = "";
  els.customParamUnit.value = "";
  renderAll();
  showToast(`${label} added`);
}

function unitReactions(item) {
  const text = `${item.type} ${item.name} ${item.cls}`.toLowerCase();
  const base = [];
  if (item.cls === "Bioreactor" || text.includes("fermenter")) {
    base.push(
      { title: "Growth stoichiometry", formula: "C6H12O6 + O2 + NH3 → biomass + CO2 + H2O", note: "Use with yield coefficients, OUR/CER, pH, kLa, and heat generation at this step." },
      { title: "Monod kinetics", formula: "μ = μmax · S / (KS + S)", note: "Controls growth, feed strategy, washout risk, and batch duration." },
      { title: "Product formation", formula: "dP/dt = α · dX/dt + β · X", note: "Luedeking-Piret form for coupled and non-coupled bioproduct formation." },
    );
  }
  if (text.includes("dark-fermenter") || text.includes("anaerobic")) {
    base.push({ title: "Hydrogen fermentation", formula: "C6H12O6 + 2 H2O → 2 CH3COO− + 2 CO2 + 4 H2 + 2 H+", note: "Screen gas yield, pH drift, acetate formation, and gas-liquid separation demand." });
  }
  if (["Filtration", "Solid-liquid", "Concentration", "Viral safety"].includes(item.cls) || text.includes("filter")) {
    base.push(
      { title: "Membrane flux", formula: "J = ΔP / (μ · Rtotal)", note: "Links viscosity, fouling resistance, filter area, and cycle time." },
      { title: "Recovery", formula: "mout = min · Ystep", note: "Step yield cascades into the full mass balance and cost per kg." },
    );
  }
  if (["Purification", "Separation", "Recovery"].includes(item.cls) || text.includes("column")) {
    base.push(
      { title: "Binding capacity", formula: "Vload = DBC10% · Vresin / Cfeed", note: "Sizes chromatography loads, cycles, resin volume, and buffer demand." },
      { title: "Partition model", formula: "K = xi,extract / xi,raffinate", note: "Used for extraction, crystallization, phase split, and purge calculations." },
    );
  }
  if (item.cls === "Thermal" || text.includes("heat") || text.includes("steril")) {
    base.push(
      { title: "Heat duty", formula: "Q = m · Cp · ΔT + ΔHvap · mvap", note: "Calculates heating, cooling, sterilization, evaporation, and heat recovery loads." },
      { title: "Sterilization lethality", formula: "F0 = ∫ 10^((T(t)-121.1)/z) dt", note: "SIP/autoclave validation model for target lethality." },
    );
  }
  if (unitLayer(item) === "cleaning") {
    base.push(
      { title: "Cleaning endpoint", formula: "Cresidue,out ≤ MACO and conductivity → baseline", note: "Validates rinse endpoint, residue removal, and campaign release." },
      { title: "CIP mass balance", formula: "mspent = mNaOH + macid + mrinses + soil", note: "Tracks spent cleaning streams into neutralization and waste treatment." },
    );
  }
  if (item.cls === "Environmental" || unitLayer(item) === "waste") {
    base.push(
      { title: "COD oxidation", formula: "CODremoved = Qin · (CODin - CODout)", note: "Connects waste inactivation, aeration basin load, sludge, and discharge." },
      { title: "Emission balance", formula: "E = Σ mi · EFi · (1 - ηcontrol)", note: "Calculates VOC, CO2, particulate, and abatement efficiency." },
    );
  }
  if (item.cls === "Quality" || item.cls === "Instrumentation") {
    base.push(
      { title: "PAT soft sensor", formula: "ŷ = f(T, pH, DO, kLa, Raman, capacitance)", note: "Machine-learning estimator constrained by physical ranges and mass balance closure." },
      { title: "Release decision", formula: "Pass = CQA within spec ∧ data integrity verified", note: "Maps process data to GMP release and deviation handling." },
    );
  }
  return base.length ? base : [
    { title: "Unit mass balance", formula: "Σmin + generation = Σmout + accumulation", note: "Generic dynamic or batch balance for this unit operation." },
    { title: "Unit energy balance", formula: "Q + W + ΣHin = ΣHout + ΔU", note: "Generic heat/work balance for sizing and utility demand." },
  ];
}

function sourcesForUnit(item) {
  if (!item) return scientificSources;
  const text = `${item.type} ${item.cls} ${item.name} ${item.isoName || ""}`.toLowerCase();
  const matched = scientificSources.filter((source) => {
    if (source.appliesTo.includes("all")) return true;
    return source.appliesTo.some((token) => text.includes(token));
  });
  if (matched.length) return matched;
  return scientificSources.filter((source) => ["ICS", "ISO", "FDA"].includes(source.group)).slice(0, 3);
}

function renderSourceCards(sources, compact = false) {
  return sources.map((item) => `
    <article class="source-card${compact ? " compact" : ""}">
      <span>${item.group}</span>
      <h3>${item.title}</h3>
      <p>${item.benchmark}</p>
      <dl>
        <dt>Model use</dt><dd>${item.modelUse}</dd>
        <dt>Source</dt><dd><a href="${item.url}" target="_blank" rel="noreferrer">${item.source}</a></dd>
      </dl>
    </article>
  `).join("");
}

function downloadText(filename, mime, text) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  return `"${String(value).replaceAll("\"", "\"\"")}"`;
}

function syncInputs() {
  els.batchSize.value = state.batchSize;
  els.batchCount.value = state.batchCount;
  els.titer.value = state.titer;
  els.recovery.value = state.recovery;
  processParameters.forEach((item) => {
    const input = document.querySelector(`[data-parameter="${item.key}"]`);
    if (input) input.value = state.params[item.key];
  });
}

function renderTemplateList() {
  const item = activeTemplate();
  const complexity = templateComplexity(item);
  els.templateList.innerHTML = `
    <article class="current-product-card" data-tooltip="${escapeAttr(`${item.label}: active product model with equipment, streams, economics, standards, and facility support systems.`)}">
      <span>Active model</span>
      <strong>${item.label}</strong>
      <p>${item.product}</p>
      <dl>
        <dt>Equipment</dt><dd>${complexity.units}</dd>
        <dt>Streams</dt><dd>${complexity.streams}</dd>
      </dl>
      <button class="template-button product-back-button" data-open-products type="button">Back to products</button>
    </article>
  `;
}

function renderScaleList() {
  els.scaleList.innerHTML = Object.entries(scalePresets).map(([key, item]) => `
    <button class="${key === state.scale ? "active" : ""}" data-scale="${key}" data-tooltip="${escapeAttr(`${item.label} scale preset: changes batch size, annual batches, titer, recovery, utilization, and non-linear cost burden.`)}">${item.label}</button>
  `).join("");
}

function paletteMatchesGroup(item) {
  const group = paletteGroups.find((candidate) => candidate.key === state.paletteGroup) || paletteGroups[0];
  return group.key === "all" || group.classes.includes(item.cls);
}

function paletteMatchesSearch(item) {
  const query = state.paletteSearch.trim().toLowerCase();
  if (!query) return true;
  return [item.label, item.isoName, item.cls, item.icon, ...(item.standards || [])]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function filteredPalette() {
  return palette.filter((item) => paletteMatchesGroup(item) && paletteMatchesSearch(item));
}

function renderPaletteGroups() {
  els.paletteGroups.innerHTML = paletteGroups.map((item) => `
    <button class="${item.key === state.paletteGroup ? "active" : ""}" data-palette-group="${item.key}" data-tooltip="${escapeAttr(`Filter the equipment library to ${item.label.toLowerCase()} unit operations.`)}">
      ${item.label}
    </button>
  `).join("");
}

function renderPalette() {
  const items = filteredPalette();
  els.paletteCount.textContent = `${items.length} unit${items.length === 1 ? "" : "s"} shown`;
  els.palette.innerHTML = items.length ? items.map((item) => `
    <button class="palette-item" draggable="true" data-type="${item.type}" title="Add ${item.label}" data-tooltip="${escapeAttr(`${item.label}: ${item.isoName}. Class: ${item.cls}. Standards: ${(item.standards || []).slice(0, 3).join(", ")}. Drag to the canvas or click to add.`)}">
      <span style="background:${item.color}">${item.icon}</span>
      <strong>${item.label}</strong>
      <small><b>${unitLayerLabel(unitLayer(item))}</b>${item.cls}</small>
    </button>
  `).join("") : `
    <div class="palette-empty">
      <strong>No matching equipment</strong>
      <span>Try another category or search term.</span>
    </div>
  `;
}

function renderCanvasFocus() {
  els.canvasFocus.innerHTML = canvasFocusOptions.map((item) => `
    <button class="${item.key === state.canvasFocus ? "active" : ""}" data-canvas-focus="${item.key}" data-tooltip="${escapeAttr(`Show ${item.label.toLowerCase()} units on the flowsheet canvas.`)}">
      ${item.label}
    </button>
  `).join("");
}

function renderFlowDetail() {
  els.flowDetail.innerHTML = flowDetailOptions.map((item) => `
    <button class="${item.key === state.flowDetail ? "active" : ""}" data-flow-detail="${item.key}" data-tooltip="${escapeAttr(`Set flowsheet visibility to ${item.label.toLowerCase()}.`) }">
      ${item.label}
    </button>
  `).join("");
}

function renderSectionPresets() {
  els.sectionPresets.innerHTML = sectionPresets.map((item) => `
    <button data-section-preset="${item.key}" title="Add ${item.label}" data-tooltip="${escapeAttr(`${item.label}: adds ${item.types.length} connected operations for ${item.detail.toLowerCase()}.`) }">
      <b>${item.label}</b>
      <span>${item.detail}</span>
    </button>
  `).join("");
}

function renderQuickAdd() {
  els.quickAdd.innerHTML = quickAddTypes.map((type) => {
    const item = palette.find((candidate) => candidate.type === type);
    return `
      <button class="quick-add-button" draggable="true" data-type="${item.type}" title="Add ${item.label}" data-tooltip="${escapeAttr(`${item.label}: add a supporting inline element near the selected unit.`)}">
        <span style="background:${item.color}">${item.icon}</span>
        <b>${item.label}</b>
      </button>
    `;
  }).join("");
}

function renderEquationSpotlight() {
  const context = state.streams.find((item) => item.id === state.selectedId) ? "Selected stream equations" : selectedUnit() ? `${selectedUnit().cls} equations` : "Live model equations";
  els.equationSpotlight.innerHTML = `
    <strong>${context}</strong>
    <div>
      ${relevantEquations().map((item) => `
        <button class="equation-chip" data-equation-query="${item.name}" data-tooltip="${escapeAttr(item.note)}">
          <span>${item.category}</span>
          <b>${item.name}</b>
          <code>${item.formula}</code>
        </button>
      `).join("")}
    </div>
  `;
}

function renderParameters() {
  const query = state.parameterSearch.trim().toLowerCase();
  const filtered = processParameters.filter((item) => {
    const haystack = `${item.label} ${item.key} ${item.unit || ""} ${parameterGroup(item)}`.toLowerCase();
    return !query || haystack.includes(query);
  });
  const groups = [...new Set(filtered.map(parameterGroup))];
  els.parameterList.innerHTML = groups.map((group) => `
    <section class="parameter-group">
      <h3>${group}</h3>
      ${filtered.filter((item) => parameterGroup(item) === group).map((item) => {
        const value = state.params[item.key];
        const digits = item.step < 1 ? 2 : 0;
        return `
          <label class="parameter-row" data-tooltip="${escapeAttr(`${item.label}: ${item.min}-${item.max}${item.unit ? ` ${item.unit}` : ""}. Used in mass balance, energy balance, scale-up, and cost calculations.`)}">
            <span>${item.label}</span>
            <input data-parameter="${item.key}" type="range" min="${item.min}" max="${item.max}" step="${item.step}" value="${value}" />
            <input class="parameter-number" data-parameter-number="${item.key}" type="number" min="${item.min}" max="${item.max}" step="${item.step}" value="${value}" />
            <b>${formatNumber(value, digits)}${item.unit ? ` ${item.unit}` : ""}</b>
          </label>
        `;
      }).join("")}
    </section>
  `).join("") || `
    <div class="parameter-empty">
      <strong>No parameter found</strong>
      <span>Search pH, kLa, recovery, CAPEX, cleaning, emissions, or AI.</span>
    </div>
  `;
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

function renderProcessLanes(stage, stageHeight) {
  stage.insertAdjacentHTML("beforeend", processLanes
    .filter((item) => item.top < stageHeight - 40)
    .map((item) => `
      <div class="process-lane lane-${item.tone}" style="top:${item.top}px;height:${item.height}px">
        <span>${item.label}</span>
      </div>
    `).join(""));
}

function renderCanvas() {
  els.canvas.innerHTML = "";
  const visibleUnits = state.units.filter(isUnitVisible);
  const visibleUnitIds = new Set(visibleUnits.map((item) => item.id));
  const visibleStreams = state.streams.filter((item) => visibleUnitIds.has(item.from) && visibleUnitIds.has(item.to));
  const stagePaddingX = 520;
  const stagePaddingY = 420;
  const stageWidth = Math.max(1800, ...visibleUnits.map((item) => item.x + unitWidth(item) + stagePaddingX));
  const stageHeight = Math.max(1120, ...visibleUnits.map((item) => item.y + unitHeight(item) + stagePaddingY));
  const stage = document.createElement("div");
  stage.className = "canvas-stage";
  stage.style.width = `${stageWidth}px`;
  stage.style.height = `${stageHeight}px`;
  stage.style.transform = `scale(${state.zoom})`;
  els.canvas.style.setProperty("--stage-width", `${stageWidth * state.zoom}px`);
  els.canvas.style.setProperty("--stage-height", `${stageHeight * state.zoom}px`);
  els.canvas.appendChild(stage);
  renderProcessLanes(stage, stageHeight);

  stage.dataset.focus = state.canvasFocus;
  stage.dataset.flowDetail = state.flowDetail;
  stage.insertAdjacentHTML("beforeend", `
    <div class="canvas-focus-note">
      <b>${canvasFocusOptions.find((item) => item.key === state.canvasFocus)?.label || "All"}</b>
      <span>${visibleUnits.length} units · ${visibleStreams.length} streams · ${flowDetailOptions.find((item) => item.key === state.flowDetail)?.label || "Standard"}</span>
    </div>
  `);

  visibleStreams.forEach((item) => {
    const from = state.units.find((candidate) => candidate.id === item.from);
    const to = state.units.find((candidate) => candidate.id === item.to);
    if (!from || !to) return;
    const line = document.createElement("button");
    const x1 = from.x + unitWidth(from);
    const y1 = unitMidline(from);
    const x2 = to.x;
    const y2 = unitMidline(to);
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    const kind = streamKind(item, from, to);
    line.className = `stream-line stream-${kind}`;
    line.dataset.streamId = item.id;
    line.dataset.tooltip = streamTooltip(item, from, to, kind);
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.title = `${item.id}: ${item.composition} · ${streamLabel(kind)}`;
    line.addEventListener("click", () => {
      state.selectedId = item.id;
      renderEquationSpotlight();
      renderCanvas();
    });
    if (state.selectedId === item.id) line.classList.add("selected");
    stage.appendChild(line);
    if (state.flowDetail !== "standard" || state.selectedId === item.id) {
      const label = document.createElement("button");
      label.className = `stream-label stream-label-${kind}${state.selectedId === item.id ? " selected" : ""}`;
      label.dataset.streamId = item.id;
      label.dataset.tooltip = streamTooltip(item, from, to, kind);
      label.style.left = `${(x1 + x2) / 2}px`;
      label.style.top = `${(y1 + y2) / 2}px`;
      const compact = state.flowDetail === "detailed";
      label.innerHTML = compact ? `
        <b>${item.id}</b><span>${streamLabel(kind).replace(" flow", "")}</span>
      ` : `
        <b>${item.id} → ${to.id}</b><span>${streamFlow(item)} · ${item.composition}</span>
      `;
      label.addEventListener("click", () => {
        state.selectedId = item.id;
        renderEquationSpotlight();
        renderCanvas();
      });
      stage.appendChild(label);
    }
  });

  visibleUnits.forEach((item) => {
    const node = document.createElement("button");
    const className = item.cls.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const layer = unitLayer(item);
    node.className = `unit unit-${className} unit-layer-${layer}${isMinorUnit(item) ? " unit-minor" : ""}${state.selectedId === item.id ? " selected" : ""}${state.connectFrom === item.id ? " connecting" : ""}`;
    node.style.left = `${item.x}px`;
    node.style.top = `${item.y}px`;
    node.style.borderLeftColor = item.color;
    node.dataset.layer = layer;
    node.dataset.id = item.id;
    node.dataset.tooltip = equipmentTooltip(item);
    const ics = icsCodeForUnit(item);
    const showEquipmentMeta = ["equipment", "full"].includes(state.flowDetail);
    node.innerHTML = `
      <span class="unit-icon" style="background:${item.color}">
        <strong>${unitSymbol(item)}</strong>
        <small>${item.icon}</small>
      </span>
      <span>
        <em class="unit-role">${unitLayerLabel(layer)}</em>
        <h3>${item.id}</h3>
        <p>${item.name}</p>
        <small>${unitSize(item)} · ${unitPower(item)}</small>
        ${showEquipmentMeta ? `<small class="unit-ics">${ics.code} · ${item.cls}</small>` : ""}
      </span>
    `;
    wireUnitNode(node, item);
    stage.appendChild(node);
  });
}

function isUnitVisible(item) {
  if (state.canvasFocus === "all") return true;
  const layer = unitLayer(item);
  if (state.canvasFocus === "main") return layer === "main";
  if (state.canvasFocus === "utilities") return ["utilities", "cleaning", "support"].includes(unitFocusLevel(item)) || ["cleaning", "support"].includes(layer);
  if (state.canvasFocus === "recycle") return ["recycle", "heat"].includes(layer) || unitFocusLevel(item) === "recycle";
  if (state.canvasFocus === "quality") return ["quality"].includes(layer) || unitFocusLevel(item) === "quality";
  return unitFocusLevel(item) === state.canvasFocus;
}

function wireUnitNode(node, item) {
  node.addEventListener("click", () => {
    if (state.mode === "connect") {
      handleConnectClick(item.id);
      return;
    }
    state.selectedId = item.id;
    renderEquationSpotlight();
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
      item.x = snapToCanvasGrid(originalX + (moveEvent.clientX - startX) / state.zoom);
      item.y = snapToCanvasGrid(originalY + (moveEvent.clientY - startY) / state.zoom);
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
  els.canvas.querySelectorAll(".canvas-stage .stream-line").forEach((line) => {
    const streamItem = state.streams.find((item) => item.id === line.dataset.streamId);
    if (!streamItem) return;
    const from = state.units.find((item) => item.id === streamItem.from);
    const to = state.units.find((item) => item.id === streamItem.to);
    if (!line || !from || !to) return;
    const x1 = from.x + unitWidth(from);
    const y1 = unitMidline(from);
    const x2 = to.x;
    const y2 = unitMidline(to);
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
  const newUnit = unit(nextUnitId(base), type, snapToCanvasGrid(x), snapToCanvasGrid(y));
  state.units.push(newUnit);
  state.selectedId = newUnit.id;
  renderAll();
  showToast(`${base.label} added`);
}

function nextUnitId(base) {
  const prefix = base.icon.replace(/[^A-Z]/g, "").slice(0, 3) || "U";
  return `${prefix}-${state.nextUnit++}`;
}

function addUnitFromButton(type) {
  const current = selectedUnit();
  if (current) {
    addUnitFromPalette(type, current.x + (isMinorUnit(palette.find((item) => item.type === type)) ? 148 : 255), current.y + 34);
    return;
  }
  const position = nextCanvasPosition();
  addUnitFromPalette(type, position.x, position.y);
}

function addSectionPreset(key) {
  const preset = sectionPresets.find((item) => item.key === key);
  if (!preset) return;
  const maxRight = state.units.reduce((max, item) => Math.max(max, item.x + unitWidth(item)), 40);
  const startX = snapToCanvasGrid(maxRight + 112);
  const startY = snapToCanvasGrid(preset.y);
  const added = preset.types.map((type, index) => {
    const base = palette.find((item) => item.type === type);
    const x = startX + index * (isMinorUnit(base) ? 178 : 250);
    const y = startY + (isMinorUnit(base) ? 20 : 0);
    const item = unit(nextUnitId(base), type, snapToCanvasGrid(x), snapToCanvasGrid(y));
    state.units.push(item);
    return item;
  });

  added.slice(1).forEach((item, index) => {
    state.streams.push(stream(`S-${state.nextStream++}`, added[index].id, item.id, preset.composition, preset.phase));
  });

  state.selectedId = added[0]?.id || state.selectedId;
  state.canvasFocus = "all";
  renderAll();
  window.requestAnimationFrame(() => {
    els.canvas.scrollTo({ left: Math.max(0, startX * state.zoom - 120), top: Math.max(0, startY * state.zoom - 120), behavior: "smooth" });
  });
  showToast(`${preset.label} added`);
}

function nextCanvasPosition() {
  const rightMost = state.units.reduce((max, item) => Math.max(max, item.x), 40);
  const row = Math.floor(state.units.length / 4);
  return {
    x: snapToCanvasGrid(Math.min(rightMost + 265, 45 + (state.units.length % 4) * 265)),
    y: snapToCanvasGrid(85 + row * 190),
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
  els.equipmentTable.innerHTML = state.units.map((item) => {
    const ics = icsCodeForUnit(item);
    return `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td><span class="ics-pill">${ics.code}</span><small>${ics.label}</small></td>
        <td>${item.isoName || item.name}</td>
        <td>${item.cls}</td>
        <td>${unitSize(item)}</td>
        <td>${formatNumber(item.residence, 1)} h</td>
        <td>${unitPower(item)}</td>
        <td>${(item.standards || []).slice(0, 3).join(", ")}</td>
        <td>${item.status}</td>
      </tr>
    `;
  }).join("");

  const rows = streamRows();
  const counts = rows.reduce((acc, item) => {
    acc[item.direction] = (acc[item.direction] || 0) + 1;
    return acc;
  }, {});
  els.streamSummary.innerHTML = `
    <strong>${rows.length} streams</strong>
    <span>${counts.Input || 0} inputs</span>
    <span>${counts.Internal || 0} internal</span>
    <span>${counts.Output || 0} outputs</span>
  `;
  els.streamsTable.innerHTML = rows.map((item) => `
    <tr>
      <td>${item.id}</td>
      <td><span class="stream-pill stream-pill-${item.direction.toLowerCase()}">${item.direction}</span></td>
      <td>${item.role}</td>
      <td>${item.from} · ${item.fromName}</td>
      <td>${item.to} · ${item.toName}</td>
      <td>${item.flow}</td>
      <td>${item.components}</td>
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

function renderSimulationBoard() {
  const p = state.params;
  const data = metrics();
  const solved = solveMassBalance();
  const washout = p.dilutionRate >= p.specificGrowth;
  const absorptionBoost = p.co2Removal / 2000;
  const groups = [...new Set(spdFunctions.map((item) => item.group))];
  const weakBalances = solved.units.filter((item) => item.closurePct < 98).slice(0, 6);
  const topFlows = [...solved.streams].sort((a, b) => b.massFlow - a.massFlow).slice(0, 6);

  els.simulationBoard.innerHTML = `
    <section class="simulation-summary">
      <article><span>Solver</span><strong>Mass + energy v1</strong></article>
      <article><span>Closure</span><strong class="${solved.totals.closurePct < 98 ? "risk" : "ok"}">${formatNumber(solved.totals.closurePct, 2)}%</strong></article>
      <article><span>Solved streams</span><strong>${solved.totals.solvedStreams}/${state.streams.length}</strong></article>
      <article><span>Recycle convergence</span><strong class="${solved.convergence.converged ? "ok" : "risk"}">${formatNumber(solved.convergence.maxRelativeDelta * 100, 3)}%</strong></article>
      <article><span>Net heat duty</span><strong>${formatNumber(solved.totals.netHeatDuty, 1)} kWh/batch</strong></article>
    </section>
    <section class="operation-sequence">
      <h3>Deterministic process balance</h3>
      <div>
        <span>Component vectors</span>
        <span>Step recovery</span>
        <span>Bioreaction generation</span>
        <span>Recycle relaxation</span>
        <span>Property package</span>
        <span>CSV export</span>
      </div>
      <p>Basis: ${solved.basis}. The engine computes water, substrate, biomass, product, salts, waste, air, and cleaning masses; then resolves recycle streams over ${solved.convergence.iterations} iterations and estimates heat duty from Cp, target temperature, heat recovery, and step operation class.</p>
    </section>
    <section class="simulation-summary">
      <article><span>Gross heat</span><strong>${formatNumber(solved.totals.grossHeatDuty, 1)} kWh/batch</strong></article>
      <article><span>Recovered heat</span><strong>${formatNumber(solved.totals.recoveredHeat, 1)} kWh/batch</strong></article>
      <article><span>Recycle streams</span><strong>${solved.convergence.recycleStreams.length}</strong></article>
      <article><span>Generated product</span><strong>${formatMass(data.productPerBatchKg)} / batch</strong></article>
      <article><span>Warnings</span><strong class="${solved.totals.warningCount || solved.warnings.length ? "risk" : "ok"}">${solved.totals.warningCount + solved.warnings.length}</strong></article>
    </section>
    <section class="simulation-group">
      <h3>Largest computed flows</h3>
      <div class="simulation-cards">
        ${topFlows.map((item) => `
          <article class="simulation-card">
            <div>
              <span>${item.id}</span>
              <h4>${item.massFlow < 0.01 ? "<0.01" : formatNumber(item.massFlow, item.massFlow < 10 ? 2 : 1)} kg/batch</h4>
            </div>
            <dl>
              <dt>Role</dt><dd>${item.role}</dd>
              <dt>Composition</dt><dd>${item.componentText}</dd>
            </dl>
            <p>${item.from} → ${item.to}. ${item.solverStatus}.</p>
          </article>
        `).join("")}
      </div>
    </section>
    ${weakBalances.length || solved.warnings.length ? `
      <section class="simulation-group">
        <h3>Solver warnings</h3>
        <div class="simulation-cards">
          ${weakBalances.map((item) => `
            <article class="simulation-card">
              <div>
                <span>${item.class}</span>
                <h4>${item.tag} · ${formatNumber(item.closurePct, 2)}% closure</h4>
              </div>
              <dl>
                <dt>Mass gap</dt><dd>${formatNumber(item.massGap, 3)} kg/batch</dd>
                <dt>Warning</dt><dd>${item.warnings || "Balance is outside the preferred closure band."}</dd>
              </dl>
              <p>${item.equation}</p>
            </article>
          `).join("")}
          ${solved.warnings.map((item) => `
            <article class="simulation-card">
              <div>
                <span>Recycle</span>
                <h4>Tear stream approximation</h4>
              </div>
              <p>${item}</p>
            </article>
          `).join("")}
        </div>
      </section>
    ` : ""}
    <section class="simulation-summary">
      <article><span>Mode</span><strong>${state.template === "biohydrogen" ? "Continuous DF + recycle" : "Hybrid batch/continuous"}</strong></article>
      <article><span>Tear convergence target</span><strong>${formatNumber(solved.convergence.tolerance * 100, 4)}%</strong></article>
      <article><span>CSTR washout</span><strong class="${washout ? "risk" : "ok"}">${washout ? "Risk" : "Clear"}</strong></article>
      <article><span>CO2 absorption</span><strong>${formatNumber(p.co2Removal, 0)}%</strong></article>
      <article><span>Adjusted output</span><strong>${formatMass(data.annualKg * (1 + absorptionBoost))}</strong></article>
    </section>
    <section class="operation-sequence">
      <h3>Batch operation sequence library</h3>
      <div>
        ${["PULL IN", "CHARGE", "TRANSFER IN", "HEAT", "HEAT EXCHANGE", "REACT / FERMENT", "FILTER", "PULL OUT", "TRANSFER OUT", "STORE", "GRIND", "CIP", "BATCH SHEET", "BREAKPOINT"].map((item) => `<span>${item}</span>`).join("")}
      </div>
    </section>
    ${groups.map((group) => `
      <section class="simulation-group">
        <h3>${group}</h3>
        <div class="simulation-cards">
          ${spdFunctions.filter((item) => item.group === group).map((item) => `
            <article class="simulation-card">
              <div>
                <span>${item.status}</span>
                <h4>${item.name}</h4>
              </div>
              <dl>
                <dt>Inputs</dt><dd>${item.inputs}</dd>
                <dt>Output</dt><dd>${item.output}</dd>
              </dl>
              <p>${item.note}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `).join("")}
  `;
}

function aiReport() {
  const data = metrics();
  const p = state.params;
  const rowData = streamRows();
  const solved = solveMassBalance();
  const boundary = boundarySummary();
  const bottleneck = state.units
    .map((unitItem) => ({
      id: unitItem.id,
      name: unitItem.name,
      score: unitItem.residence * (unitItem.powerFactor + 0.4) * (unitLayer(unitItem) === "main" ? 1.3 : 0.8),
    }))
    .sort((a, b) => b.score - a.score)[0];
  const yieldChain = p.harvestRecovery * p.clarificationYield * p.chromYield * p.ufdfYield / 100 ** 4;
  const closureGap = Math.max(0.001, 100 - solved.totals.closurePct);
  const riskScore = Math.min(99, Math.max(1,
    (data.utilization * 0.32) +
    (p.bottleneckUtil * 0.25) +
    (p.viability < 86 ? 18 : 4) +
    (p.kla < 120 ? 16 : 3) +
    (state.units.length > 70 ? 9 : 2),
  ));
  return {
    timestamp: new Date().toISOString(),
    template: activeTemplate().label,
    scale: scaleProfile().label,
    metrics: data,
    streamSummary: {
      total: rowData.length,
      inputs: rowData.filter((item) => item.direction === "Input").length,
      outputs: rowData.filter((item) => item.direction === "Output").length,
      internal: rowData.filter((item) => item.direction === "Internal").length,
    },
    boundarySummary: {
      ok: boundary.ok,
      caution: boundary.caution,
      critical: boundary.critical,
      items: boundary.boundaries,
    },
    physics: {
      oxygenTransferMargin: `${formatNumber((p.kla * Math.max(1, p.doSetpoint) / 100) / Math.max(0.1, p.our || 1), 2)} x`,
      heatDutyIndicator: `${formatNumber(data.utilities / Math.max(1, state.batchCount), 2)} MWh/batch`,
      massClosureGap: `${formatNumber(closureGap, 3)}%`,
      downstreamYieldChain: `${formatNumber(yieldChain * 100, 1)}%`,
      recycleLoad: `${formatNumber(p.recycleFraction, 0)}%`,
    },
    ml: {
      riskScore: formatNumber(riskScore, 0),
      bottleneckUnit: bottleneck,
      suggestedActions: [
        p.kla < 120 ? "Increase kLa, sparging strategy, or oxygen enrichment before scale-up." : "kLa margin looks acceptable for this scenario.",
        data.utilization > 90 ? "Add parallel capacity or reduce campaign time to lower utilization risk." : "Utilization is below the severe bottleneck range.",
        p.recycleFraction > 55 ? "Check recycle convergence and purge policy with a tear-stream solver." : "Recycle fraction is moderate.",
        p.viability < 86 ? "Investigate media, shear, osmolality, DO, and hold-time stressors." : "Cell physiology inputs are in a workable range.",
      ],
    },
    scientificSources: scientificSources.map((item) => ({ group: item.group, title: item.title, source: item.source, url: item.url })),
  };
}

function renderAiBoard() {
  const report = aiReport();
  const data = report.metrics;
  const p = state.params;
  const boundaries = report.boundarySummary.items;
  els.aiBoard.innerHTML = `
    <section class="ai-hero">
      <div>
        <p>Physics-enhanced AI</p>
        <h3>${activeTemplate().label} model assistant</h3>
        <span>Combines mass balance closure, energy balance, scale-up economics, PAT soft sensors, and ML-style bottleneck scoring.</span>
      </div>
      <button class="action-button primary" data-jump-view="cfd" type="button">Open CFD workbench</button>
    </section>
    <section class="ai-grid">
      <article>
        <span>ML risk score</span>
        <strong>${report.ml.riskScore}/100</strong>
        <p>Driven by utilization, kLa, viability, recycle, and bottleneck residence time.</p>
      </article>
      <article>
        <span>Bottleneck unit</span>
        <strong>${report.ml.bottleneckUnit?.id || "n/a"}</strong>
        <p>${report.ml.bottleneckUnit?.name || "No unit selected"} has the highest weighted duty/residence score.</p>
      </article>
      <article>
        <span>Mass closure</span>
        <strong>${report.physics.massClosureGap}</strong>
        <p>Physical consistency gap after density, recycle, harvest, and downstream balance checks.</p>
      </article>
      <article>
        <span>O2 transfer margin</span>
        <strong>${report.physics.oxygenTransferMargin}</strong>
        <p>kLa and DO compared with oxygen uptake pressure.</p>
      </article>
    </section>
    <section class="boundary-board">
      <div class="boundary-heading">
        <div>
          <span>Physical + chemical boundaries</span>
          <h3>${report.boundarySummary.critical} critical · ${report.boundarySummary.caution} review · ${report.boundarySummary.ok} inside</h3>
        </div>
        <strong>${isCellCultureTemplate() ? "Mammalian/cell culture rules active" : "General bioprocess rules active"}</strong>
      </div>
      <div class="boundary-grid">
        ${boundaries.map((item) => `
          <article class="boundary-card boundary-${item.severity}">
            <span>${severityLabel(item.severity)}</span>
            <h4>${item.title}</h4>
            <strong>${item.value}</strong>
            <p><b>Boundary:</b> ${item.limit}</p>
            <p>${item.recommendation}</p>
            <small>${item.source}</small>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="visualization-board">
      <h3>Process visualizations</h3>
      <div class="viz-row">
        <span>Mass yield</span>
        <b style="width:${Math.max(4, data.processYield * 100)}%"></b>
        <em>${formatNumber(data.processYield * 100, 1)}%</em>
      </div>
      <div class="viz-row">
        <span>Utilization</span>
        <b style="width:${Math.max(4, data.utilization)}%"></b>
        <em>${formatNumber(data.utilization, 0)}%</em>
      </div>
      <div class="viz-row">
        <span>Recycle load</span>
        <b style="width:${Math.max(4, p.recycleFraction)}%"></b>
        <em>${formatNumber(p.recycleFraction, 0)}%</em>
      </div>
      <div class="viz-row">
        <span>Automation</span>
        <b style="width:${Math.max(4, p.automationLevel)}%"></b>
        <em>${formatNumber(p.automationLevel, 0)}%</em>
      </div>
    </section>
    <section class="ai-recommendations">
      <h3>Recommended model actions</h3>
      ${report.ml.suggestedActions.map((item) => `<p>${item}</p>`).join("")}
    </section>
  `;
  els.aiBoard.querySelector("[data-jump-view]")?.addEventListener("click", (event) => {
    setView(event.currentTarget.dataset.jumpView);
  });
}

function renderStandards() {
  const icsCards = icsCoverage().map((item) => `
    <article class="standard-card ics-standard-card">
      <span>ICS ${item.code}</span>
      <h3>${item.label}</h3>
      <p>${item.count} mapped unit${item.count === 1 ? "" : "s"} in this scenario. Examples: ${item.examples.join(", ")}.</p>
    </article>
  `).join("");
  els.standardsList.innerHTML = `
    <article class="standard-card standard-source">
      <span>ISO ICS 71.120</span>
      <h3>Equipment for the chemical industry</h3>
      <p>Classification used here follows the ISO ICS 71.120 page: 71.120.01 equipment for the chemical industry in general, 71.120.10 reaction vessels and their components, 71.120.20 columns, 71.120.30 heat exchangers, and 71.120.99 other equipment for the chemical industry. Transport of dangerous chemicals belongs under ICS 13.300.</p>
    </article>
    ${icsCards}
    ${standards.map((item) => `
      <article class="standard-card">
        <span>${item.group}</span>
        <h3>${item.name}</h3>
        <p>${item.scope}</p>
      </article>
    `).join("")}
  `;
}

function renderSources() {
  const groups = [...new Set(scientificSources.map((item) => item.group))];
  const propertyCategories = [...new Set(propertyRows().map((item) => item.category))];
  const previewProperties = propertyRows().slice(0, 12);
  els.sourcesBoard.innerHTML = `
    <section class="source-hero">
      <div>
        <p>Scientific data layer</p>
        <h3>Vendor, regulatory, standards, and property references</h3>
        <span>These cards document where benchmark assumptions and property-package estimates come from. They are starting points for model calibration, not validated limits for every product or facility.</span>
      </div>
      <strong>${scientificSources.length} sources · ${propertyRows().length} properties</strong>
    </section>
    <section class="source-summary-grid">
      ${groups.map((group) => `
        <article>
          <span>${group}</span>
          <strong>${scientificSources.filter((item) => item.group === group).length}</strong>
          <p>reference${scientificSources.filter((item) => item.group === group).length === 1 ? "" : "s"}</p>
        </article>
      `).join("")}
    </section>
    <section class="source-summary-grid">
      ${propertyCategories.map((category) => `
        <article>
          <span>${category}</span>
          <strong>${propertyRows().filter((item) => item.category === category).length}</strong>
          <p>property record${propertyRows().filter((item) => item.category === category).length === 1 ? "" : "s"}</p>
        </article>
      `).join("")}
    </section>
    <section class="simulation-group">
      <h3>Property database v2 preview</h3>
      <div class="simulation-cards">
        ${previewProperties.map((item) => `
          <article class="simulation-card">
            <div>
              <span>${item.category}</span>
              <h4>${item.label}</h4>
            </div>
            <dl>
              <dt>Cp</dt><dd>${formatNumber(item.cpKjKgK, 2)} kJ/kg/K</dd>
              <dt>Density</dt><dd>${formatNumber(item.densityKgM3, 0)} kg/m3</dd>
              <dt>Viscosity</dt><dd>${formatNumber(item.viscosityCp, 2)} cP</dd>
            </dl>
            <p>${item.formula} · ${item.source}</p>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="source-card-grid">
      ${renderSourceCards(scientificSources)}
    </section>
  `;
}

function templateComplexity(template) {
  const units = template.units.length;
  const streams = template.streams.length;
  const bioreactors = template.units.filter((item) => item.cls === "Bioreactor").length;
  const downstream = template.units.filter((item) => ["Filtration", "Purification", "Concentration", "Separation", "Recovery", "Solid-liquid"].includes(item.cls)).length;
  return { units, streams, bioreactors, downstream };
}

function inferTemplateFromBrief(text) {
  const lower = text.toLowerCase();
  const rules = [
    { key: "penicillin", terms: ["penicillin", "antibiotic", "beta lactam", "fungal"] },
    { key: "culturedMeat", terms: ["cultured meat", "cell meat", "myoblast", "muscle", "scaffold", "food"] },
    { key: "antibody", terms: ["antibody", "mab", "monoclonal", "igg", "cho", "protein a"] },
    { key: "fermentation", terms: ["fermentation", "enzyme", "microbial", "yeast", "bacteria", "aerobic"] },
    { key: "insulin", terms: ["insulin", "recombinant protein", "e coli", "refolding"] },
    { key: "vaccine", terms: ["vaccine", "viral", "virus", "antigen", "vero"] },
    { key: "plasmid", terms: ["plasmid", "dna", "rna", "nucleic acid"] },
    { key: "cellTherapy", terms: ["cell therapy", "car-t", "autologous", "t cell"] },
    { key: "smallMolecule", terms: ["small molecule", "api", "crystallization", "solvent"] },
    { key: "biohydrogen", terms: ["hydrogen", "dark fermentation", "biogas"] },
    { key: "wastewater", terms: ["wastewater", "cod", "bod", "effluent"] },
    { key: "waterPurification", terms: ["water purification", "wfi", "reverse osmosis", "ultrapure"] },
    { key: "airPollution", terms: ["air pollution", "voc", "scrubber", "emission"] },
  ];
  const match = rules.find((rule) => templates[rule.key] && rule.terms.some((term) => lower.includes(term)));
  return match?.key || "fermentation";
}

function briefAssumptions(templateKey, fileCount) {
  const item = templates[templateKey] || templates.fermentation;
  return [
    `Model selected: ${item.label}`,
    `Product class: ${item.product}`,
    `${item.units.length} equipment nodes and ${item.streams.length} streams loaded`,
    fileCount ? `${fileCount} uploaded file${fileCount === 1 ? "" : "s"} attached to the project brief` : "No uploaded data attached yet",
    "Next recommended step: open Process Builder, inspect the main bioreactor, then review Boundaries + AI",
  ];
}

function readBriefFiles(input) {
  const files = Array.from(input?.files || []).slice(0, 6);
  return Promise.all(files.map((file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const raw = String(reader.result || "");
      resolve({
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        contentPreview: raw.slice(0, 2400),
      });
    };
    reader.onerror = () => resolve({ name: file.name, type: file.type || "application/octet-stream", size: file.size, contentPreview: "" });
    if (/text|csv|json|xml|tab-separated|spreadsheet/i.test(file.type) || /\.(csv|txt|json|tsv|xml)$/i.test(file.name)) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  })));
}

async function buildFromProductBrief() {
  const briefInput = document.querySelector("#productBriefInput");
  const scaleSelect = document.querySelector("#productScaleSelect");
  const fileInput = document.querySelector("#productDataFiles");
  const result = document.querySelector("#briefResult");
  const brief = briefInput?.value.trim() || "";
  if (brief.length < 12) {
    if (result) result.innerHTML = "<p>Please describe the product, organism, process goal, scale, or quality constraints in a few words.</p>";
    return;
  }
  if (result) result.innerHTML = "<p>Building project model from your product brief...</p>";
  const templateKey = inferTemplateFromBrief(brief);
  const files = await readBriefFiles(fileInput);
  state.productBrief = brief;
  state.productFiles = files.map(({ contentPreview, ...file }) => file);
  state.inferredTemplate = templateKey;
  loadTemplate(templateKey);
  if (scaleSelect?.value && scalePresets[scaleSelect.value]) applyScale(scaleSelect.value);
  try {
    await apiRequest("/api/project/brief", {
      method: "POST",
      body: JSON.stringify({
        brief,
        templateKey,
        scale: state.scale,
        files,
        assumptions: briefAssumptions(templateKey, files.length),
      }),
    });
  } catch {
    // The local model should still work when the persistence backend is offline.
  }
  renderStartBoard();
  renderOverview();
  renderTables();
  renderEquations();
  renderSimulationBoard();
  renderCfdBoard();
  renderAiBoard();
  setView("overview");
  showToast(`Project model created: ${templates[templateKey].label}`);
}

function renderStartBoard() {
  const selected = templates[state.inferredTemplate] || activeTemplate();
  const assumptions = briefAssumptions(state.inferredTemplate, state.productFiles.length);
  els.startBoard.innerHTML = `
    <section class="start-hero">
      <div>
        <p>Product brief first</p>
        <h3>Tell Axion what plant you want to build.</h3>
        <span>Describe the product, host organism, scale, quality targets, constraints, and any available data. Axion maps it to the closest process model, loads equipment, streams, equations, boundaries, costs, CFD screening, and downloadable reports.</span>
      </div>
      <button class="action-button primary" data-build-from-brief type="button">Build plant model</button>
    </section>
    <section class="product-brief-grid">
      <article class="brief-composer">
        <label>
          <span>Product and plant description</span>
          <textarea id="productBriefInput" rows="8" placeholder="Example: I want to model a 10,000 L CHO monoclonal antibody process with fed-batch production, Protein A capture, viral inactivation, UF/DF, CIP/SIP, heat recovery, ammonium boundary checks, and downloadable mass balances.">${escapeAttr(state.productBrief)}</textarea>
        </label>
        <div class="brief-row">
          <label>
            <span>Starting scale</span>
            <select id="productScaleSelect">
              ${Object.entries(scalePresets).map(([key, item]) => `<option value="${key}"${key === state.scale ? " selected" : ""}>${item.label}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Upload data</span>
            <input id="productDataFiles" type="file" multiple />
          </label>
        </div>
        <button class="action-button primary" data-build-from-brief type="button">Generate process workspace</button>
        <div id="briefResult" class="brief-result" aria-live="polite"></div>
      </article>
      <article class="brief-model-card">
        <span>Current model</span>
        <h3>${selected.label}</h3>
        <p>${selected.description}</p>
        <dl>
          <dt>Product</dt><dd>${selected.product}</dd>
          <dt>Equipment</dt><dd>${selected.units.length} units</dd>
          <dt>Streams</dt><dd>${selected.streams.length} flows</dd>
          <dt>Uploaded data</dt><dd>${state.productFiles.length} files</dd>
        </dl>
        <ul>
          ${assumptions.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="brief-actions">
          <button data-jump-view="flowsheet" type="button">Open builder</button>
          <button data-jump-view="reports" type="button">Open downloads</button>
        </div>
      </article>
    </section>
    <section class="start-secondary brief-examples">
      <h3>Example prompts</h3>
      <div>
        <button data-fill-brief="Cultured meat pilot plant with media prep, seed train, production stirred-tank bioreactors, harvest, washing, filling, CIP, water reuse, oxygen transfer, ammonium and lactate boundaries.">Cultured meat plant</button>
        <button data-fill-brief="Penicillin production with sterile fermentation, solvent extraction, crystallization, drying, emissions control, solvent recycle, batch scheduling, and full mass and energy balances.">Penicillin API</button>
        <button data-fill-brief="Monoclonal antibody process in CHO cells with fed-batch bioreactor, Protein A capture, low pH viral inactivation, polishing, UF/DF, sterile filtration, GMP release, and cost model.">Antibody process</button>
      </div>
    </section>
  `;
}

function plantAreaStats() {
  const layers = ["main", "support", "cleaning", "recycle", "heat", "waste", "quality"];
  return layers.map((layer) => {
    const units = state.units.filter((item) => unitLayer(item) === layer);
    return {
      layer,
      label: unitLayerLabel(layer),
      count: units.length,
      power: units.reduce((sum, item) => sum + item.powerFactor, 0),
      examples: units.slice(0, 4).map((item) => item.id).join(", ") || "none",
    };
  });
}

function renderPlantVisualization() {
  const stats = plantAreaStats();
  const maxCount = Math.max(1, ...stats.map((item) => item.count));
  const stages = [
    { key: "upstream", label: "Upstream", units: state.units.filter((item) => unitFocusLevel(item) === "upstream") },
    { key: "bioreactor", label: "Bioreactors", units: state.units.filter((item) => item.cls === "Bioreactor") },
    { key: "downstream", label: "Downstream", units: state.units.filter((item) => unitFocusLevel(item) === "downstream") },
    { key: "fill-qc", label: "Fill + QC", units: state.units.filter((item) => ["Packaging", "Quality", "Containment"].includes(item.cls)) },
  ];
  return `
    <section class="plant-visual">
      <div class="plant-visual-head">
        <div>
          <span>Production plant map</span>
          <h3>Production flow and support infrastructure</h3>
        </div>
        <button class="action-button" data-jump-view="flowsheet" type="button">Open full plant</button>
      </div>
      <div class="plant-flow-map">
        ${stages.map((stage, index) => `
          <article class="plant-stage plant-stage-${stage.key}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h4>${stage.label}</h4>
            <strong>${stage.units.length}</strong>
            <p>${stage.units.slice(0, 4).map((item) => item.id).join(" · ") || "No mapped equipment"}</p>
          </article>
        `).join("")}
      </div>
      <div class="plant-area-grid">
        ${stats.map((item) => `
          <article class="plant-area plant-area-${item.layer}">
            <b style="height:${Math.max(18, item.count / maxCount * 100)}%"></b>
            <span>${item.label}</span>
            <strong>${item.count}</strong>
            <small>${item.examples}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function cfdCellColor(cell) {
  if (cell.risk > 0.68) return "#b8534d";
  if (cell.risk > 0.48) return "#c7922e";
  if (cell.oxygen < 0.45) return "#4f6f8f";
  if (cell.nutrient < 0.45) return "#8a6f3d";
  return "#0f8f83";
}

function cfdBioreactors() {
  return state.units.filter((item) => item.cls === "Bioreactor");
}

function cfdScore(unit, xIndex, yIndex) {
  const p = state.params;
  const volume = estimatedBioreactorVolumeL(unit);
  const radius = Math.hypot(xIndex - 4.5, yIndex - 4.5) / 6.4;
  const bottomPenalty = yIndex / 9;
  const wallPenalty = Math.min(1, radius * 1.15);
  const mixingPower = Math.max(0.05, p.agitation * 0.42 + p.aeration * 0.85 + p.kla / 140);
  const scalePenalty = Math.max(0, Math.log10(Math.max(100, volume) / 2000)) * 0.22;
  const oxygen = Math.max(0, Math.min(1, (p.kla * p.doSetpoint / Math.max(1, p.our * 95)) - wallPenalty * 0.24 - bottomPenalty * 0.16 - scalePenalty));
  const nutrient = Math.max(0, Math.min(1, mixingPower - wallPenalty * 0.18 - bottomPenalty * 0.25 - scalePenalty * 0.8));
  const shear = Math.max(0, Math.min(1, p.agitation / (isCellCultureTemplate() ? 4.8 : 9) + (1 - radius) * 0.22));
  const risk = Math.max(0, Math.min(1, (1 - oxygen) * 0.46 + (1 - nutrient) * 0.34 + shear * (isCellCultureTemplate() ? 0.28 : 0.12)));
  return { oxygen, nutrient, shear, risk };
}

function cfdReport() {
  const units = cfdBioreactors();
  return units.map((unit) => {
    const cells = Array.from({ length: 100 }, (_, index) => cfdScore(unit, index % 10, Math.floor(index / 10)));
    const avg = (key) => cells.reduce((sum, item) => sum + item[key], 0) / cells.length;
    const lowOxygen = cells.filter((item) => item.oxygen < 0.45).length;
    const lowNutrient = cells.filter((item) => item.nutrient < 0.45).length;
    const highShear = cells.filter((item) => item.shear > 0.72).length;
    const risk = avg("risk");
    return {
      id: unit.id,
      name: unit.name,
      volumeL: estimatedBioreactorVolumeL(unit),
      oxygenIndex: avg("oxygen"),
      nutrientIndex: avg("nutrient"),
      shearIndex: avg("shear"),
      riskIndex: risk,
      lowOxygenCells: lowOxygen,
      lowNutrientCells: lowNutrient,
      highShearCells: highShear,
      recommendation: risk > 0.62
        ? "High CFD screening risk: increase kLa or aeration, review impeller layout, reduce working volume, add feed distribution points, or split into parallel reactors."
        : risk > 0.38
          ? "Review mixing map: verify DO probe placement, sparger design, feed-point location, viscosity, and scale-down data."
          : "Screening result is acceptable; confirm with validated CFD or mixing-time studies before scale-up.",
      cells,
    };
  });
}

function renderCfdBoard() {
  const report = cfdReport();
  if (!report.length) {
    els.cfdBoard.innerHTML = `
      <section class="empty-state">
        <h3>No bioreactor in this process</h3>
        <p>Add a bioreactor or fermenter in the Process Builder to enable CFD-style oxygen, nutrient, and shear screening.</p>
      </section>
    `;
    return;
  }
  const selected = report.find((item) => item.id === state.selectedId) || report[0];
  const hotspotCells = selected.cells.filter((cell) => cell.risk > 0.62).length;
  const transferScore = Math.max(0, Math.min(100, (selected.oxygenIndex * 0.46 + selected.nutrientIndex * 0.34 + (1 - selected.shearIndex) * 0.2) * 100));
  const selectedUnit = state.units.find((item) => item.id === selected.id);
  const selectedReactions = selectedUnit ? unitReactions(selectedUnit).slice(0, 3) : [];
  els.cfdBoard.innerHTML = `
    <section class="cfd-hero">
      <div>
        <p>Interactive bioreactor CFD workbench</p>
        <h3>${selected.id} · ${selected.name}</h3>
        <span>Screen oxygen transfer, nutrient distribution, shear, dead zones, and feed-point risk directly in the tool. This is a fast engineering model for prioritising rigorous CFD and scale-down experiments.</span>
      </div>
      <button class="action-button primary" data-jump-view="ai" type="button">Review boundaries</button>
    </section>
    <section class="cfd-layout">
      <div class="cfd-vessel" aria-label="Interactive CFD vessel visualization">
        <div class="cfd-vessel-head">
          <span>${formatNumber(selected.volumeL, 0)} L</span>
          <strong>${selected.id}</strong>
        </div>
        <div class="cfd-vessel-body">
          <div class="cfd-impeller impeller-top"></div>
          <div class="cfd-impeller impeller-bottom"></div>
          <div class="cfd-feed-plume"></div>
          <div class="cfd-sparger"></div>
          <div class="cfd-map" aria-label="CFD risk heatmap">
            ${selected.cells.map((cell) => `
              <span style="background:${cfdCellColor(cell)}; opacity:${0.48 + cell.risk * 0.46};" title="O2 ${formatNumber(cell.oxygen * 100, 0)}%, nutrient ${formatNumber(cell.nutrient * 100, 0)}%, shear ${formatNumber(cell.shear * 100, 0)}%"></span>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="cfd-detail">
        <div class="cfd-unit-tabs">
          ${report.map((item) => `<button class="${item.id === selected.id ? "active" : ""}" data-select-cfd="${item.id}" type="button">${item.id}</button>`).join("")}
        </div>
        <div class="cfd-score-card">
          <span>Transfer readiness</span>
          <strong>${formatNumber(transferScore, 0)}%</strong>
          <p>${selected.recommendation}</p>
        </div>
        <div class="cfd-metric-grid">
          <article><span>O2</span><strong>${formatNumber(selected.oxygenIndex * 100, 0)}%</strong><small>${selected.lowOxygenCells} low-O2 cells</small></article>
          <article><span>Nutrient</span><strong>${formatNumber(selected.nutrientIndex * 100, 0)}%</strong><small>${selected.lowNutrientCells} weak-feed cells</small></article>
          <article><span>Shear</span><strong>${formatNumber(selected.shearIndex * 100, 0)}%</strong><small>${selected.highShearCells} high-shear cells</small></article>
          <article><span>Hotspots</span><strong>${hotspotCells}</strong><small>risk cells / 100</small></article>
        </div>
        <div class="cfd-actions">
          <h4>Suggested engineering edits</h4>
          <ul>
            <li>${selected.lowOxygenCells ? "Increase kLa, oxygen enrichment, sparger efficiency, or headspace pressure." : "Oxygen transfer is acceptable for this screening state."}</li>
            <li>${selected.lowNutrientCells ? "Move feed point closer to high-circulation zones or add distributed feed points." : "Nutrient distribution is acceptable for this screening state."}</li>
            <li>${selected.highShearCells ? "Reduce agitation, review impeller tip speed, or consider scale-out." : "Shear proxy is acceptable for this screening state."}</li>
          </ul>
        </div>
        <div class="cfd-reactions">
          <h4>Linked reactions and balances</h4>
          ${selectedReactions.map((item) => `<p><b>${item.title}</b><span>${item.formula}</span></p>`).join("")}
        </div>
      </div>
    </section>
    <section class="cfd-legend">
      <span class="legend-good">Good transfer</span>
      <span class="legend-watch">Mixing watch zone</span>
      <span class="legend-risk">O2/nutrient/shear risk</span>
    </section>
  `;
}

function streamNumericFlow(item) {
  const solved = solveMassBalance().streamMap[item.id];
  if (solved) return solved.massFlow;
  if (item.phase === "Gas") return state.batchSize * (state.params.aeration || 0.35) * 0.08;
  if (item.phase === "Solid") return Math.max(1, metrics().productPerBatchKg);
  if (item.phase === "Slurry") return Math.max(1, metrics().productPerBatchKg * 1.25);
  return Math.max(1, state.batchSize);
}

function balanceRows() {
  return solveMassBalance().units.map((item) => ({
    tag: item.tag,
    operation: item.operation,
    class: item.class,
    inputStreams: item.inputStreams,
    outputStreams: item.outputStreams,
    massInKgBatch: item.massIn,
    generationKgBatch: item.generation,
    lossKgBatch: item.loss,
    massOutKgBatch: item.massOut,
    massGapKgBatch: item.massGap,
    closurePct: item.closurePct,
    netHeatDutyKwhBatch: item.heatDuty,
    grossHeatDutyKwhBatch: item.grossHeatDuty,
    recoveredHeatKwhBatch: item.recoveredHeat,
    targetTemperatureC: item.targetTemperature,
    densityKgM3: item.densityKgM3,
    viscosityCp: item.viscosityCp,
    osmoticIndex: item.osmoticIndex,
    powerFactor: item.power,
    componentsIn: item.componentsIn,
    componentsOut: item.componentsOut,
    solverStatus: item.solverStatus,
    warnings: item.warnings,
    equations: item.equations,
  }));
}

function costRows() {
  const data = metrics();
  return [
    { item: "Installed CAPEX", value: data.scale.installedCapital, unit: "USD", note: "Scaled installed capital estimate" },
    { item: "Annualized CAPEX", value: data.scale.annualizedCapital, unit: "USD/yr", note: "Annualized capital charge" },
    { item: "Fixed facility burden", value: data.scale.fixedBurden, unit: "USD/yr", note: "High at lab scale; decreases non-linearly with scale" },
    { item: "Materials", value: data.scale.materialIntensity, unit: "USD/yr", note: "Media, buffers, raw materials, consumables" },
    { item: "Labor", value: data.scale.laborCost, unit: "USD/yr", note: "Automation-adjusted labor estimate" },
    { item: "QA/QC validation", value: data.scale.qaCost, unit: "USD/yr", note: "GMP release, validation, and quality burden" },
    { item: "Utilities", value: data.scale.utilityCost, unit: "USD/yr", note: "Power, WFI, steam, cooling, compressed gases" },
    { item: "Waste", value: data.scale.wasteCost, unit: "USD/yr", note: "Wastewater, biomass, emissions, rejects" },
    { item: "Direct cost", value: data.directCost, unit: "USD/kg", note: "Annual cost divided by annual product" },
  ];
}

function downloadCsv(filename, rows) {
  const headers = Object.keys(rows[0] || { empty: "" });
  const csv = [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
  downloadText(filename, "text/csv", csv);
}

function comprehensiveReport() {
  const solved = solveMassBalance();
  return {
    template: state.template,
    product: activeTemplate().product,
    generatedAt: new Date().toISOString(),
    parameters: {
      global: { batchSize: state.batchSize, batchCount: state.batchCount, titer: state.titer, recovery: state.recovery },
      biochemical: state.params,
      definitions: processParameters,
    },
    metrics: metrics(),
    solver: solved,
    propertyPackage: aggregateComponentProperties(state.params.temperature || 25),
    detailedPropertyPackage: propertyRows(),
    equipment: state.units,
    streams: streamRows(),
    balances: balanceRows(),
    costs: costRows(),
    equations,
    unitEquations: state.units.map((item) => ({ tag: item.id, name: item.name, equations: unitReactions(item) })),
    cfd: cfdReport().map((item) => ({ ...item, cells: item.cells.map((cell) => ({ oxygen: cell.oxygen, nutrient: cell.nutrient, shear: cell.shear, risk: cell.risk })) })),
    boundaries: evaluatePhysicalBoundaries(),
    standards,
    sources: scientificSources,
    recommendations: simulationReadinessItems(),
    twinWorkspace,
  };
}

function renderReportsBoard() {
  const report = comprehensiveReport();
  els.reportsBoard.innerHTML = `
    <section class="reports-hero">
      <div>
        <p>Download center</p>
        <h3>Balances, costs, equations, streams, and parameters</h3>
        <span>Export spreadsheet-ready CSV files for Excel, thesis appendices, process reviews, and external modelling. CFD now runs visibly inside the workbench.</span>
      </div>
      <button class="action-button primary" data-jump-view="cfd" type="button">Open CFD workbench</button>
    </section>
    <section class="reports-grid">
      <article><span>Mass + energy balances</span><strong>${formatNumber(report.solver.totals.closurePct, 2)}%</strong><p>${report.balances.length} unit balances with component inputs/outputs, generation, loss, closure, heat duty, power, and linked equations.</p><button data-download-report="balances-csv" type="button">Download CSV</button></article>
      <article><span>Costs</span><strong>${report.costs.length}</strong><p>CAPEX, facility burden, materials, labor, QA/QC, utilities, waste, and direct cost.</p><button data-download-report="costs-csv" type="button">Download CSV</button></article>
      <article><span>Chemical equations</span><strong>${equations.length}</strong><p>Stoichiometry, kinetics, mass balances, energy balances, separations, emissions, and economics.</p><button data-download-report="equations-csv" type="button">Download CSV</button></article>
      <article><span>Input/output streams</span><strong>${report.solver.totals.solvedStreams}</strong><p>All material, utility, waste, and QC/data streams with solved kg/batch, annual kg, role, phase, and component summary.</p><button data-download-report="streams-csv" type="button">Download CSV</button></article>
      <article><span>Parameters</span><strong>${processParameters.length}</strong><p>Global, biochemical, scale-up, custom, and economic parameters.</p><button data-download-report="parameters-csv" type="button">Download CSV</button></article>
      <article><span>Property package</span><strong>${propertyRows().length}</strong><p>Detailed and aggregate Cp, density, viscosity, osmotic, vapor-pressure, solubility, Henry, and ionic-strength proxies used by the solver.</p><button data-download-report="properties-csv" type="button">Download CSV</button></article>
    </section>
  `;
}

function pageTitle(view) {
  return {
    start: "Choose Process",
    overview: "Overview",
    flowsheet: "Process Builder",
    equipment: "Equipment Register",
    streams: "Input / Output Streams",
    equations: "Equation Library",
    simulation: "Simulation Functions",
    cfd: "Bioreactor CFD",
    ai: "Boundaries + AI",
    standards: "Standards",
    sources: "Scientific Data",
    recommendations: "Readiness Roadmap",
    twin: "Twin OS",
    economics: "Economics",
    reports: "Downloads",
  }[view] || "Choose Process";
}

function renderOverview() {
  const data = metrics();
  const boundary = boundarySummary();
  const streamStats = streamRows().reduce((acc, item) => {
    acc[item.direction] = (acc[item.direction] || 0) + 1;
    return acc;
  }, {});
  const topRisks = boundary.boundaries
    .filter((item) => item.severity !== "ok")
    .slice(0, 3);
  els.overviewBoard.innerHTML = `
    <section class="overview-hero">
      <div>
        <p>Axion Process OS</p>
        <h3>${activeTemplate().label} production model</h3>
        <span>Enterprise process modeling workspace with process builder, material streams, physical boundaries, scientific sources, standards, and economic readiness.</span>
      </div>
      <button class="action-button primary" data-jump-view="flowsheet" type="button">Open Process Builder</button>
    </section>
    <section class="overview-grid">
      <article>
        <span>Equipment objects</span>
        <strong>${state.units.length}</strong>
        <p>Mapped unit operations, support systems, instruments, utilities, and documentation nodes.</p>
        <button data-jump-view="equipment">Review equipment</button>
      </article>
      <article>
        <span>Process streams</span>
        <strong>${state.streams.length}</strong>
        <p>${streamStats.Input || 0} inputs · ${streamStats.Internal || 0} internal · ${streamStats.Output || 0} outputs.</p>
        <button data-jump-view="streams">Open stream table</button>
      </article>
      <article class="${boundary.critical ? "overview-risk" : boundary.caution ? "overview-review" : ""}">
        <span>Physical boundaries</span>
        <strong>${boundary.critical}/${boundary.caution}</strong>
        <p>${boundary.critical} critical and ${boundary.caution} review warnings across chemistry, scale-up, and cell-culture constraints.</p>
        <button data-jump-view="ai">Inspect boundaries</button>
      </article>
      <article>
        <span>Scientific sources</span>
        <strong>${scientificSources.length}</strong>
        <p>Vendor, paper, regulatory, and standards references mapped to assumptions.</p>
        <button data-jump-view="sources">Open sources</button>
      </article>
    </section>
    ${renderPlantVisualization()}
    <section class="overview-split">
      <article>
        <div>
          <span>Current operating case</span>
          <h3>${formatNumber(state.batchSize)} L · ${state.batchCount} batches/year · ${formatNumber(state.titer, 1)} g/L</h3>
        </div>
        <dl>
          <dt>Annual product</dt><dd>${formatMass(data.annualKg)}</dd>
          <dt>Direct cost</dt><dd>$${formatNumber(data.directCost, 0)}/kg</dd>
          <dt>Utilization</dt><dd>${formatNumber(data.utilization, 0)}%</dd>
          <dt>Scale profile</dt><dd>${data.scale.profile.label}</dd>
        </dl>
      </article>
      <article>
        <div>
          <span>Top model checks</span>
          <h3>${topRisks.length ? "Review required" : "No major boundary warning"}</h3>
        </div>
        ${topRisks.length ? topRisks.map((item) => `
          <p><b>${item.title}:</b> ${item.value}. ${item.recommendation}</p>
        `).join("") : `<p>The current scenario is inside the conservative model boundaries. Continue with stream verification, sources, and economics.</p>`}
      </article>
    </section>
  `;
}

function simulationReadinessItems() {
  const data = metrics();
  const solved = solveMassBalance();
  const boundaryItems = evaluatePhysicalBoundaries()
    .filter((item) => item.severity !== "ok")
    .map((item) => ({
      group: "Physical boundary",
      status: item.severity === "critical" ? "Must add for full simulator" : "Needs more detail",
      title: item.title,
      detail: `${item.value}. ${item.recommendation} Source basis: ${item.source}.`,
    }));
  return [
    ...boundaryItems,
    {
      group: "Thermodynamics",
      status: "Partially covered",
      title: "Component property database",
      detail: `A property-package v2 now supplies ${propertyRows().length} detailed records plus ${aggregatePropertyRows().length} aggregate solver classes with temperature-corrected Cp, density, viscosity, osmotic index, vapor-pressure, Henry, solubility, ionic-strength, and heat-release proxies. Full simulation still needs validated coefficients, electrolyte speciation, activity coefficients, and product-specific calibration.`,
    },
    {
      group: "Mass balance",
      status: "Partially covered",
      title: "Component-resolved stream vectors",
      detail: `A deterministic v1 solver resolves water, substrate, biomass, product, salts, waste, air, and cleaning masses across ${state.streams.length} streams with recycle relaxation over ${solved.convergence.iterations} iterations. Full simulation still needs impurities, HCP/DNA/metabolites, rigorous nonlinear convergence, and time profiles.`,
    },
    {
      group: "Energy balance",
      status: "Partially covered",
      title: "Dynamic heat and utility network",
      detail: `Utility load is estimated at ${formatNumber(data.utilities, 1)} MWh, while the solver estimates ${formatNumber(solved.totals.netHeatDuty, 1)} kWh/batch net heat duty after ${formatNumber(solved.totals.recoveredHeat, 1)} kWh/batch heat recovery. Add time-resolved heating/cooling curves, heat-exchanger area, approach temperature, pressure drop, steam/condensate headers, and chilled-water constraints.`,
    },
    {
      group: "Reaction and kinetics",
      status: "Partially covered",
      title: "Unit-specific reaction packages",
      detail: "Add validated Monod/Contois/logistic models, Luedeking-Piret product formation, oxygen uptake, CO2 evolution, inhibition, degradation, sterilization lethality, and cleaning residue removal kinetics.",
    },
    {
      group: "Separation",
      status: "Must add for full simulator",
      title: "Mechanistic filtration/chromatography models",
      detail: "Add fouling curves, cake resistance, membrane polarization, column breakthrough, resin aging, elution gradients, viral clearance log-reduction, and pool blending logic.",
    },
    {
      group: "Scheduling",
      status: "Must add for full simulator",
      title: "Finite-capacity batch scheduler",
      detail: "Add equipment occupancy, changeover, CIP/SIP windows, hold-time limits, campaign planning, operator shifts, QC release timing, and cleanroom suite constraints.",
    },
    {
      group: "GMP validation",
      status: "Partially covered",
      title: "Electronic batch record and validation layer",
      detail: "Add audit trails, deviations, alarms, recipe versions, materials genealogy, equipment qualification status, cleaning validation limits, and data-integrity checks.",
    },
    {
      group: "Control",
      status: "Must add for full simulator",
      title: "DCS/PLC/PAT control simulation",
      detail: "Add control loops for pH, DO, feed, temperature, pressure, level, antifoam, perfusion bleed, alarms, soft sensors, and fault handling.",
    },
    {
      group: "Safety",
      status: "Needs more detail",
      title: "HAZOP and containment model",
      detail: "Add pressure-relief sizing, ATEX/DSEAR zones, chemical compatibility, biosafety containment, operator exposure, spill response, and dangerous-goods links outside ICS 71.120.",
    },
    {
      group: "Economics",
      status: "Partially covered",
      title: "Full TEA/LCA engine",
      detail: "Add itemized CAPEX, installation factors, depreciation, labor grades, consumables, resin lifetime, media BOM, waste fees, carbon intensity, water footprint, and uncertainty ranges.",
    },
  ];
}

function renderRecommendations() {
  const coverage = icsCoverage();
  const items = simulationReadinessItems();
  const fullCount = coverage.reduce((sum, item) => sum + item.count, 0);
  els.recommendationsBoard.innerHTML = `
    <section class="recommendation-hero">
      <div>
        <p>Industry readiness</p>
        <h3>ICS 71.120 equipment map + full-simulation gap list</h3>
        <span>Use this as a roadmap from impressive flowsheet prototype toward a rigorous production simulator with validated engineering models.</span>
      </div>
      <strong>${fullCount} mapped equipment objects</strong>
    </section>
    <section class="ics-coverage-grid">
      ${coverage.map((item) => `
        <article>
          <span>ICS ${item.code}</span>
          <strong>${item.count}</strong>
          <p>${item.label}</p>
          <small>${item.examples.length ? item.examples.join(", ") : "No mapped equipment in this active template"}</small>
        </article>
      `).join("")}
    </section>
    <section class="recommendation-list">
      ${items.map((item) => `
        <article>
          <div>
            <span>${item.group}</span>
            <h3>${item.title}</h3>
          </div>
          <b class="${item.status.toLowerCase().replace(/[^a-z0-9]+/g, "-")}">${item.status}</b>
          <p>${item.detail}</p>
        </article>
      `).join("")}
    </section>
    <section class="source-card-grid">
      ${renderSourceCards(scientificSources.filter((item) => ["Merck", "FDA", "ICH", "ICS", "Paper", "Industry"].includes(item.group)), true)}
    </section>
  `;
}

function renderTwinWorkspace() {
  const active = activeTemplate();
  els.twinBoard.innerHTML = `
    <section class="twin-hero">
      <div>
        <p>Process operating workspace</p>
        <h3>Figma + Git-style process engineering for ${active.label}</h3>
        <span>Use this as the working layer around the flowsheet: navigate from factory to cell model, connect live data, compare versions, attach literature and SOPs, and ask Axion to generate engineering variants.</span>
      </div>
      <button class="action-button primary" data-jump-view="flowsheet" type="button">Open process canvas</button>
    </section>
    <section class="twin-hierarchy" aria-label="Clickable factory hierarchy">
      ${twinWorkspace.hierarchy.map((item, index) => `
        <button data-twin-view="${item.view}" type="button">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${item.level}</strong>
          <small>${item.focus}</small>
        </button>
      `).join("")}
    </section>
    <section class="twin-module-grid">
      ${twinWorkspace.modules.map((item) => `
        <article>
          <span>${item.status}</span>
          <h3>${item.name}</h3>
          <p>${item.detail}</p>
          <button data-twin-view="${item.view}" type="button">${item.action}</button>
        </article>
      `).join("")}
    </section>
    <section class="twin-ai-engineer">
      <div>
        <span>AI Engineer prompts</span>
        <h3>Turn engineering questions into process variants</h3>
        <p>These prompts move into the help dock so Axion can guide you to the right module and first model edits.</p>
      </div>
      <div>
        ${twinWorkspace.aiPrompts.map((prompt) => `<button data-twin-prompt="${escapeAttr(prompt)}" type="button">${prompt}</button>`).join("")}
      </div>
    </section>
  `;
}

function renderEconomics() {
  const data = metrics();
  const costItems = [
    { label: "Annualized CAPEX", value: data.scale.annualizedCapital, color: "#123a56" },
    { label: "Fixed facility burden", value: data.scale.fixedBurden, color: "#c04f47" },
    { label: "Materials", value: data.scale.materialIntensity, color: "#00a88f" },
    { label: "Labor", value: data.scale.laborCost, color: "#d7a229" },
    { label: "QA/QC validation", value: data.scale.qaCost, color: "#8a6f3d" },
    { label: "Utilities + waste", value: data.scale.utilityCost + data.scale.wasteCost, color: "#0f8f83" },
  ];
  const totalCost = costItems.reduce((sum, item) => sum + item.value, 0) || 1;
  els.costStack.innerHTML = costItems.map((item) => `
    <div class="cost-bar">
      <span>${item.label}</span>
      <span class="cost-track"><span class="cost-fill" style="width:${Math.max(2, item.value / totalCost * 100)}%; background:${item.color}"></span></span>
      <strong>${formatNumber(item.value / totalCost * 100, 0)}%</strong>
    </div>
  `).join("");

  els.costNarrative.textContent = `${activeTemplate().label} at ${formatNumber(state.batchSize)} L is treated as ${data.scale.profile.label} scale. The cost model is non-linear: lab scale carries high fixed facility, labor, QA/QC, and validation burden per kg, while larger plants benefit from a ${formatNumber(state.params.capitalScaleExponent, 2)} CAPEX scaling exponent, purchasing power, automation, campaign learning, and higher utilization. Estimated direct cost is $${formatNumber(data.directCost, 0)}/kg.`;
  els.economicDetails.innerHTML = `
    <dt>Product</dt><dd>${activeTemplate().product}</dd>
    <dt>Product per batch</dt><dd>${formatMass(data.productPerBatchKg)}</dd>
    <dt>Effective titer</dt><dd>${formatNumber(data.effectiveTiter, 1)} g/L</dd>
    <dt>Effective process yield</dt><dd>${formatNumber(data.processYield * 100, 1)}%</dd>
    <dt>Campaign time demand</dt><dd>${formatNumber(data.batchDuration * state.batchCount, 0)} h</dd>
    <dt>Equipment count</dt><dd>${state.units.length} units</dd>
    <dt>Scale profile</dt><dd>${data.scale.profile.label}</dd>
    <dt>Installed CAPEX</dt><dd>$${formatNumber(data.scale.installedCapital / 1000000, 2)}M</dd>
    <dt>Annual cost</dt><dd>$${formatNumber(data.scale.annualCost / 1000000, 2)}M/yr</dd>
    <dt>Parallel units</dt><dd>${data.scale.parallelUnits}</dd>
    <dt>Scale efficiency</dt><dd>${formatNumber(data.scale.scaleEfficiency * 100, 0)}%</dd>
  `;
}

function setMode(mode) {
  state.mode = mode;
  state.connectFrom = null;
  document.querySelectorAll(".tool").forEach((tool) => tool.classList.toggle("active", tool.dataset.mode === mode));
  const hints = {
    select: "Select & Move Units: click equipment or streams to highlight them, drag units to reposition, and use Duplicate or Connect from the top actions.",
    connect: "Draw Process Stream: click the source equipment first, then click the destination. Animated streams show process direction.",
  };
  els.modeHint.textContent = hints[mode];
  renderCanvas();
}

function setView(view) {
  document.querySelectorAll(".view").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelectorAll(".suite-link").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  if (els.pageTitle) els.pageTitle.textContent = pageTitle(view);
  document.querySelector(`#${view}View`).classList.add("active");
}

function setZoom(value) {
  state.zoom = Math.max(0.18, Math.min(1.35, value));
  renderCanvas();
  showToast(`Zoom ${Math.round(state.zoom * 100)}%`);
}

function fitCanvas(silent = false) {
  if (!state.units.length) return;
  const maxX = Math.max(...state.units.map((item) => item.x + unitWidth(item) + 96));
  const maxY = Math.max(...state.units.map((item) => item.y + unitHeight(item) + 96));
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
    item.x = 45 + (index % columns) * 265;
    item.y = 85 + Math.floor(index / columns) * 185;
  });
  renderCanvas();
  showToast("Layout updated");
}

function downloadSummaryCsv() {
  const data = metrics();
  const solved = solveMassBalance();
  downloadCsv(`${state.template}-process-summary.csv`, [
    { metric: "Template", value: activeTemplate().label, unit: "" },
    { metric: "Product", value: activeTemplate().product, unit: "" },
    { metric: "Scale", value: scalePresets[state.scale].label, unit: "" },
    { metric: "Batch volume", value: state.batchSize, unit: "L" },
    { metric: "Annual batches", value: state.batchCount, unit: "batches/yr" },
    { metric: "Titer", value: state.titer, unit: "g/L" },
    { metric: "Recovery", value: state.recovery, unit: "%" },
    { metric: "Annual product", value: data.annualKg, unit: "kg/yr" },
    { metric: "Batch duration", value: data.batchDuration, unit: "h" },
    { metric: "Direct cost", value: data.directCost, unit: "USD/kg" },
    { metric: "Utilities", value: data.utilities, unit: "MWh/yr" },
    { metric: "Plant utilization", value: data.utilization, unit: "%" },
    { metric: "Mass balance closure", value: solved.totals.closurePct, unit: "%" },
    { metric: "Recycle convergence", value: solved.convergence.maxRelativeDelta * 100, unit: "% relative delta" },
    { metric: "Recycle iterations", value: solved.convergence.iterations, unit: "iterations" },
    { metric: "Net heat duty", value: solved.totals.netHeatDuty, unit: "kWh/batch" },
    { metric: "Recovered heat", value: solved.totals.recoveredHeat, unit: "kWh/batch" },
    { metric: "Solved streams", value: solved.totals.solvedStreams, unit: "streams" },
    { metric: "Solver warnings", value: solved.totals.warningCount + solved.warnings.length, unit: "warnings" },
    { metric: "Equipment", value: state.units.length, unit: "units" },
    { metric: "Streams", value: state.streams.length, unit: "streams" },
    { metric: "CFD bioreactors", value: cfdReport().length, unit: "screened units" },
  ]);
  showToast("Process summary CSV downloaded");
}

function downloadStreamsCsv() {
  const rows = streamRows();
  const headers = ["id", "direction", "role", "from", "fromName", "to", "toName", "flow", "massFlowKgBatch", "annualMassKg", "components", "nominalDescription", "phase", "solverStatus", "densityKgM3", "viscosityCp", "osmoticIndex"];
  const csv = [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
  downloadText(`${state.template}-input-output-streams.csv`, "text/csv", csv);
  showToast("Stream CSV downloaded");
}

function handleReportDownload(type) {
  if (type === "balances-csv") {
    downloadCsv(`${state.template}-mass-energy-balances.csv`, balanceRows());
  } else if (type === "costs-csv") {
    downloadCsv(`${state.template}-cost-model.csv`, costRows());
  } else if (type === "equations-csv") {
    downloadCsv(`${state.template}-chemical-equations.csv`, equations);
  } else if (type === "streams-csv") {
    downloadCsv(`${state.template}-input-output-streams.csv`, streamRows());
  } else if (type === "parameters-csv") {
    downloadCsv(`${state.template}-parameters.csv`, processParameters.map((item) => ({
      key: item.key,
      label: item.label,
      value: state.params[item.key],
      unit: item.unit || "",
      min: item.min,
      max: item.max,
      custom: item.custom ? "yes" : "no",
      group: parameterGroup(item),
    })));
  } else if (type === "properties-csv") {
    downloadCsv(`${state.template}-property-package.csv`, [
      ...propertyRows().map((item) => ({ scope: "detailed", ...item })),
      ...aggregatePropertyRows().map((item) => ({ scope: "aggregate", component: item.classKey, category: "Solver class", formula: "aggregate", vaporPressureKpa: "", henry: "", solubility: "", ionicStrengthProxy: "", ...item })),
    ]);
  }
  showToast("Download prepared");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("visible"), 1800);
}

function unlockApp() {
  document.body.classList.remove("locked");
  document.body.classList.remove("show-public");
  document.body.classList.add("authenticated");
}

function lockApp() {
  document.body.classList.add("locked");
  document.body.classList.remove("authenticated");
  document.body.classList.remove("show-public");
  window.setTimeout(() => els.loginGate?.scrollTo({ top: 0, behavior: "auto" }), 0);
}

const legacyAuthKeys = ["axion-auth", "atlas-auth", "aion-auth", "daedalus-auth", "archon-auth", "axioma-auth", "superpro-auth"];
const staticAuth = {
  token: "axion-static-session-v1",
  users: [
    { user: "kbrenner", passwordHash: "81dc948cd3fa9ec2064515b4267ef9a339993233dbdc0e984ce7b0fde6e1a0a9" },
    { user: "mahmed", passwordHash: "5626696e19ac4b81318bf2bdc4af05efb210da38a29f0cc395eeda1c37d11ede" },
  ],
};
let staticAccessMode = false;

async function sha256Hex(value) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function staticPasswordMatches(user, password) {
  const normalizedUser = user.trim().toLowerCase();
  const passwordHash = await sha256Hex(password);
  return staticAuth.users.some((candidate) => candidate.user === normalizedUser && candidate.passwordHash === passwordHash);
}

async function apiRequest(path, options = {}) {
  const session = window.localStorage.getItem("axion-session");
  if (session === staticAuth.token && path === "/api/account") {
    return { account: { role: "static", productName: "Axion Process OS" } };
  }
  if (path === "/api/auth/google-config" && session === staticAuth.token) {
    return { enabled: false, clientId: "" };
  }
  const headers = {
    "content-type": "application/json",
    ...(options.headers || {}),
  };
  if (session) headers.authorization = `Bearer ${session}`;
  const response = await fetch(path, {
    ...options,
    headers,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Backend request failed");
  }
  return payload;
}

function clearLegacyAuth() {
  legacyAuthKeys.forEach((key) => window.localStorage.removeItem(key));
}

function storeSession(token) {
  window.localStorage.setItem("axion-session", token);
  clearLegacyAuth();
}

function renderProductConfig(config) {
  staticAccessMode = false;
  if (els.loginOrigin) {
    els.loginOrigin.textContent = config?.productName
      ? "Backend online. Private process workspace ready."
      : "Backend online. Private workspace ready.";
  }
}

function renderStaticAccessMode() {
  staticAccessMode = true;
  if (els.loginOrigin) {
    els.loginOrigin.textContent = "Online static mode. Enter the workspace password to unlock Axion.";
  }
  if (els.googleLoginFallback) els.googleLoginFallback.disabled = true;
  if (els.googleLoginStatus) {
    els.googleLoginStatus.textContent = "Google login requires the backend; password login is available for this hosted static version.";
  }
}

const publicPageTargets = {
  publicHome: "home",
  publicPlatform: "platform",
  publicWorkflow: "workflow",
  publicEcosystem: "ecosystem",
  publicReviews: "reviews",
  publicPricing: "pricing",
  loginPanel: "login",
};

function showPublicPage(page = "home", { scroll = true, focusLogin = false } = {}) {
  const targetPage = page || "home";
  document.querySelectorAll(".public-page").forEach((section) => {
    section.classList.toggle("active-public-page", section.dataset.publicPage === targetPage);
  });
  document.querySelectorAll(".public-nav [data-public-target]").forEach((button) => {
    button.classList.toggle("active", publicPageTargets[button.dataset.publicTarget] === targetPage);
  });
  if (scroll) {
    els.loginGate?.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    els.loginGate?.scrollTo({ top: 0, behavior: "auto" });
  }
  if (focusLogin) {
    els.loginUser?.focus({ preventScroll: true });
    window.setTimeout(() => els.loginUser?.focus(), 260);
  }
}

function scrollPublicTarget(targetId, focusLogin = false) {
  const publicPage = publicPageTargets[targetId];
  if (publicPage) {
    showPublicPage(publicPage, { focusLogin });
    return;
  }
  const target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  if (focusLogin) {
    els.loginUser?.focus({ preventScroll: true });
    window.setTimeout(() => els.loginUser?.focus(), 420);
  }
}

function showPublicHome() {
  document.body.classList.add("show-public");
  window.setTimeout(() => showPublicPage("home"), 0);
}

function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }
    const existing = document.querySelector("script[data-google-identity]");
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.append(script);
  });
}

async function handleGoogleCredential(response) {
  els.loginError.textContent = "";
  try {
    const payload = await apiRequest("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential: response.credential }),
    });
    storeSession(payload.token);
    unlockApp();
    showToast(`Logged in with Google as ${payload.account.email || payload.account.role}`);
  } catch (error) {
    els.loginError.textContent = error.message;
  }
}

async function setupGoogleLogin() {
  if (!els.googleLoginBox) return;
  if (staticAccessMode) {
    renderStaticAccessMode();
    return;
  }
  try {
    const config = await apiRequest("/api/auth/google-config");
    if (!config.enabled || !config.clientId) {
      els.googleLoginFallback.disabled = true;
      els.googleLoginStatus.textContent = "Google login is not configured. Set GOOGLE_CLIENT_ID on the backend.";
      return;
    }
    els.googleLoginStatus.textContent = "Google login ready.";
    els.googleLoginFallback.style.display = "none";
    await loadGoogleScript();
    window.google.accounts.id.initialize({
      client_id: config.clientId,
      callback: handleGoogleCredential,
      ux_mode: "popup",
    });
    window.google.accounts.id.renderButton(els.googleButtonMount, {
      theme: "filled_black",
      size: "large",
      text: "continue_with",
      shape: "rectangular",
      width: 320,
    });
  } catch (error) {
    els.googleLoginFallback.disabled = true;
    els.googleLoginStatus.textContent = `Google login unavailable: ${error.message}`;
  }
}

function fallbackHelp(prompt) {
  const lower = prompt.toLowerCase();
  const steps = [];
  let targetView = "overview";
  if (lower.includes("oxygen") || lower.includes("do ") || lower.includes("kla") || lower.includes("cfd")) {
    targetView = "cfd";
    steps.push("Open Bioreactor CFD and inspect oxygen distribution, nutrient gradient, shear, and hotspot cards.");
    steps.push("Increase kLa, reduce working volume, split into parallel trains, or revise sparger/agitation assumptions.");
  }
  if (lower.includes("ammon") || lower.includes("lactate") || lower.includes("ph") || lower.includes("boundary")) {
    targetView = "ai";
    steps.push("Open Boundaries + AI and check ammonium, lactate, pH, DO, kLa, working-volume, and scale-up warnings.");
    steps.push("Adjust feed strategy, perfusion/bleed, glutamine burden, or batch duration until the boundary card clears.");
  }
  if (lower.includes("cost") || lower.includes("capex") || lower.includes("price")) {
    targetView = "economics";
    steps.push("Open Economics and compare CAPEX scale exponent, lab fixed burden, validation factor, facility premium, and utilization.");
    steps.push("Use Reports to download costs and mass balances for an external review.");
  }
  if (lower.includes("stream") || lower.includes("mass") || lower.includes("energy") || lower.includes("download")) {
    targetView = "reports";
    steps.push("Open Downloads and export mass + energy balances, streams, equations, parameters, and CFD screening.");
  }
  if (!steps.length) {
    targetView = "flowsheet";
    steps.push("Open Process Builder and select the most relevant unit or stream.");
    steps.push("Use Flow visibility = Full PFD, then inspect equations below the canvas and check downstream tables.");
  }
  return {
    targetView,
    title: "Recommended next steps",
    steps,
    assumptions: [
      `Active model: ${activeTemplate().label}`,
      `Current scale: ${scalePresets[state.scale].label}`,
      `Selected unit: ${state.selectedId || "none"}`,
    ],
  };
}

function renderHelpResult(payload) {
  if (!els.helpResult) return;
  const guide = payload.guide || payload;
  els.helpResult.innerHTML = `
    <strong>${guide.title || "Recommended next steps"}</strong>
    <ol>${(guide.steps || []).map((step) => `<li>${step}</li>`).join("")}</ol>
    <div>${(guide.assumptions || []).map((item) => `<span>${item}</span>`).join("")}</div>
    ${guide.targetView ? `<button data-help-jump="${guide.targetView}" type="button">Open ${pageTitle(guide.targetView)}</button>` : ""}
  `;
}

async function askToolHelp() {
  const prompt = els.helpPrompt?.value.trim() || "";
  if (prompt.length < 5) {
    renderHelpResult({ title: "Describe the issue first", steps: ["Tell Axion what is confusing or failing, for example oxygen transfer, ammonium, cost, stream download, or equipment placement."], assumptions: [] });
    return;
  }
  if (els.helpResult) els.helpResult.innerHTML = "<p>Preparing guidance...</p>";
  const localGuide = fallbackHelp(prompt);
  try {
    const payload = await apiRequest("/api/help", {
      method: "POST",
      body: JSON.stringify({
        prompt,
        context: {
          template: state.template,
          scale: state.scale,
          selectedId: state.selectedId,
          unitCount: state.units.length,
          streamCount: state.streams.length,
        },
      }),
    });
    renderHelpResult({ guide: { ...localGuide, ...(payload.guide || {}) } });
  } catch {
    renderHelpResult(localGuide);
  }
}

async function loadProductConfig() {
  try {
    const config = await apiRequest("/api/product");
    renderProductConfig(config);
  } catch (error) {
    renderStaticAccessMode();
  }
}

async function checkStoredAuth() {
  clearLegacyAuth();
  const session = window.localStorage.getItem("axion-session");
  if (!session) {
    lockApp();
    return;
  }
  try {
    await apiRequest("/api/account");
    unlockApp();
  } catch {
    window.localStorage.removeItem("axion-session");
    lockApp();
  }
}

function bindAuth() {
  loadProductConfig().finally(() => setupGoogleLogin());
  showPublicPage("home", { scroll: false });

  els.publicLogo?.addEventListener("click", () => scrollPublicTarget("publicHome"));
  els.workspaceLogo?.addEventListener("click", showPublicHome);
  els.openLoginHero?.addEventListener("click", () => {
    if (document.body.classList.contains("authenticated") && document.body.classList.contains("show-public")) {
      unlockApp();
      return;
    }
    scrollPublicTarget("loginPanel", true);
  });

  document.querySelectorAll("[data-public-target]").forEach((button) => {
    button.addEventListener("click", () => scrollPublicTarget(button.dataset.publicTarget, button.dataset.publicTarget === "loginPanel"));
  });

  els.loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const user = els.loginUser.value.trim();
    const password = els.loginPassword.value.trim();
    els.loginError.textContent = "";
    if (staticAccessMode) {
      if (await staticPasswordMatches(user, password)) {
        storeSession(staticAuth.token);
        els.loginPassword.value = "";
        unlockApp();
        showToast("Workspace unlocked");
      } else {
        els.loginError.textContent = "Access denied. Use the workspace password.";
      }
      return;
    }
    try {
      const payload = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ user, password, licenseKey: password }),
      });
      storeSession(payload.token);
      els.loginPassword.value = "";
      unlockApp();
      showToast(`Logged in as ${payload.account.role}`);
    } catch (error) {
      if (await staticPasswordMatches(user, password)) {
        storeSession(staticAuth.token);
        els.loginPassword.value = "";
        unlockApp();
        showToast("Workspace unlocked");
      } else {
        els.loginError.textContent = error.message || "Access denied. Use the workspace password.";
      }
    }
  });

  els.logoutButton?.addEventListener("click", () => {
    window.localStorage.removeItem("axion-session");
    clearLegacyAuth();
    lockApp();
    showToast("Logged out");
  });

  els.helpToggle?.addEventListener("click", () => {
    els.helpDock?.classList.toggle("open");
  });

  els.askHelp?.addEventListener("click", askToolHelp);

  els.helpPrompt?.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") askToolHelp();
  });

  els.helpResult?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-help-jump]");
    if (button) {
      setView(button.dataset.helpJump);
      els.helpDock?.classList.remove("open");
    }
  });
}

function renderAll() {
  renderStartBoard();
  renderTemplateList();
  renderScaleList();
  els.paletteSearch.value = state.paletteSearch;
  renderPaletteGroups();
  renderPalette();
  renderSectionPresets();
  renderCanvasFocus();
  renderFlowDetail();
  renderQuickAdd();
  renderEquationSpotlight();
  renderParameters();
  renderMetrics();
  renderOverview();
  renderCanvas();
  renderTables();
  renderEquations();
  renderSimulationBoard();
  renderCfdBoard();
  renderAiBoard();
  renderStandards();
  renderSources();
  renderRecommendations();
  renderTwinWorkspace();
  renderEconomics();
  renderReportsBoard();
}

function bindEvents() {
  els.templateList.addEventListener("click", (event) => {
    const productsButton = event.target.closest("[data-open-products]");
    if (productsButton) {
      setView("start");
      return;
    }
    const button = event.target.closest("[data-template]");
    if (button) loadTemplate(button.dataset.template);
  });

  els.startBoard.addEventListener("click", (event) => {
    const buildButton = event.target.closest("[data-build-from-brief]");
    if (buildButton) {
      buildFromProductBrief();
      return;
    }
    const fillButton = event.target.closest("[data-fill-brief]");
    if (fillButton) {
      const input = document.querySelector("#productBriefInput");
      if (input) {
        input.value = fillButton.dataset.fillBrief;
        input.focus();
      }
      return;
    }
    const templateButton = event.target.closest("[data-start-template]");
    if (templateButton) {
      loadTemplate(templateButton.dataset.startTemplate);
      setView("overview");
      return;
    }
    const jumpButton = event.target.closest("[data-jump-view]");
    if (jumpButton) setView(jumpButton.dataset.jumpView);
  });

  els.scaleList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-scale]");
    if (button) applyScale(button.dataset.scale);
  });

  els.parameterSearch.addEventListener("input", (event) => {
    state.parameterSearch = event.target.value;
    renderParameters();
  });

  els.resetParameters.addEventListener("click", () => {
    state.params = Object.fromEntries(processParameters.map((item) => [item.key, item.value]));
    state.parameterSearch = "";
    els.parameterSearch.value = "";
    renderAll();
    showToast("Biochemical parameters reset");
  });

  els.addCustomParameter.addEventListener("click", addCustomParameter);

  els.paletteSearch.addEventListener("input", (event) => {
    state.paletteSearch = event.target.value;
    renderPalette();
  });

  els.paletteGroups.addEventListener("click", (event) => {
    const button = event.target.closest("[data-palette-group]");
    if (!button) return;
    state.paletteGroup = button.dataset.paletteGroup;
    renderPaletteGroups();
    renderPalette();
  });

  els.canvasFocus.addEventListener("click", (event) => {
    const button = event.target.closest("[data-canvas-focus]");
    if (!button) return;
    state.canvasFocus = button.dataset.canvasFocus;
    renderCanvasFocus();
    renderCanvas();
  });

  els.flowDetail.addEventListener("click", (event) => {
    const button = event.target.closest("[data-flow-detail]");
    if (!button) return;
    state.flowDetail = button.dataset.flowDetail;
    renderFlowDetail();
    renderCanvas();
  });

  els.sectionPresets.addEventListener("click", (event) => {
    const button = event.target.closest("[data-section-preset]");
    if (!button) return;
    addSectionPreset(button.dataset.sectionPreset);
  });

  [els.palette, els.quickAdd].forEach((container) => {
    container.addEventListener("dragstart", (event) => {
      const item = event.target.closest("[data-type]");
      if (!item) return;
      const base = palette.find((candidate) => candidate.type === item.dataset.type);
      event.dataTransfer.setData("text/plain", item.dataset.type);
      event.dataTransfer.effectAllowed = "copy";
      els.canvas.dataset.dropLabel = base ? `Drop ${base.label} on the canvas` : "Drop equipment on the canvas";
      els.canvas.classList.add("drop-ready");
    });

    container.addEventListener("dragend", () => {
      els.canvas.classList.remove("drop-ready");
      delete els.canvas.dataset.dropLabel;
    });
  });

  els.palette.addEventListener("click", (event) => {
    const item = event.target.closest("[data-type]");
    if (!item) return;
    const position = nextCanvasPosition();
    addUnitFromPalette(item.dataset.type, position.x, position.y);
  });

  els.quickAdd.addEventListener("click", (event) => {
    const item = event.target.closest("[data-type]");
    if (!item) return;
    addUnitFromButton(item.dataset.type);
  });

  els.equationSpotlight.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-equation-query]");
    if (!chip) return;
    setView("equations");
    els.equationSearch.value = chip.dataset.equationQuery;
    renderEquations();
  });

  els.canvas.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    if (!els.canvas.dataset.dropLabel) els.canvas.dataset.dropLabel = "Drop equipment on the canvas";
    els.canvas.classList.add("drop-ready");
  });

  els.canvas.addEventListener("dragleave", (event) => {
    if (!els.canvas.contains(event.relatedTarget)) {
      els.canvas.classList.remove("drop-ready");
      delete els.canvas.dataset.dropLabel;
    }
  });

  els.canvas.addEventListener("drop", (event) => {
    event.preventDefault();
    els.canvas.classList.remove("drop-ready");
    delete els.canvas.dataset.dropLabel;
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

  document.querySelectorAll(".suite-link").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  els.overviewBoard.addEventListener("click", (event) => {
    const button = event.target.closest("[data-jump-view]");
    if (!button) return;
    setView(button.dataset.jumpView);
  });

  els.twinBoard.addEventListener("click", (event) => {
    const promptButton = event.target.closest("[data-twin-prompt]");
    if (promptButton) {
      els.helpDock?.classList.add("open");
      els.helpPrompt.value = promptButton.dataset.twinPrompt;
      askToolHelp();
      return;
    }
    const viewButton = event.target.closest("[data-twin-view]");
    if (viewButton) setView(viewButton.dataset.twinView);
  });

  [els.batchSize, els.batchCount, els.titer, els.recovery].forEach((input) => {
    input.addEventListener("input", () => {
      state.batchSize = Number(els.batchSize.value);
      state.batchCount = Number(els.batchCount.value);
      state.titer = Number(els.titer.value);
      state.recovery = Number(els.recovery.value);
      renderMetrics();
      renderOverview();
      renderCanvas();
      renderTables();
      renderEconomics();
      renderCfdBoard();
      renderAiBoard();
      renderRecommendations();
      renderReportsBoard();
    });
  });

  els.parameterList.addEventListener("input", (event) => {
    const input = event.target.closest("[data-parameter], [data-parameter-number]");
    if (!input) return;
    const key = input.dataset.parameter || input.dataset.parameterNumber;
    state.params[key] = Number(input.value);
    renderParameters();
    renderMetrics();
    renderOverview();
    renderCanvas();
    renderTables();
    renderEconomics();
    renderCfdBoard();
    renderAiBoard();
    renderRecommendations();
    renderReportsBoard();
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
  document.querySelector("#downloadSummaryCsv").addEventListener("click", downloadSummaryCsv);
  document.querySelector("#downloadStreamsCsv").addEventListener("click", downloadStreamsCsv);
  document.querySelector("#resetScenario").addEventListener("click", () => loadTemplate(state.template));

  els.cfdBoard.addEventListener("click", (event) => {
    const jumpButton = event.target.closest("[data-jump-view]");
    if (jumpButton) {
      setView(jumpButton.dataset.jumpView);
      return;
    }
    const selectButton = event.target.closest("[data-select-cfd]");
    if (selectButton) {
      state.selectedId = selectButton.dataset.selectCfd;
      renderCfdBoard();
      renderCanvas();
      return;
    }
  });

  els.reportsBoard.addEventListener("click", (event) => {
    const jumpButton = event.target.closest("[data-jump-view]");
    if (jumpButton) {
      setView(jumpButton.dataset.jumpView);
      return;
    }
    const button = event.target.closest("[data-download-report]");
    if (button) handleReportDownload(button.dataset.downloadReport);
  });
}

bindAuth();
bindEvents();
checkStoredAuth();
loadTemplate("culturedMeat");
setView("start");
