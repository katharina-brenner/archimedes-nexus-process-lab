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
  { type: "pump", label: "Transfer Pump", isoName: "Hygienic transfer pump", cls: "Piping", icon: "P", color: "#2f80ed", residence: 0.1, power: 1.6, standards: ["ASME BPE", "ISO 10628", "EU GMP Annex 15"] },
  { type: "valve", label: "Manual Valve", isoName: "Hygienic diaphragm valve", cls: "Piping", icon: "V", color: "#4f6f8f", residence: 0.05, power: 0.02, standards: ["ASME BPE", "ISO 10628"] },
  { type: "control-valve", label: "Control Valve", isoName: "Automated flow control valve", cls: "Piping", icon: "CV", color: "#2f80ed", residence: 0.05, power: 0.08, standards: ["ASME BPE", "ISA-88", "21 CFR Part 11"] },
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
  { type: "splitter", label: "Recycle Splitter", isoName: "Recycle purge splitter", cls: "Piping", icon: "SPL", color: "#2f80ed", residence: 0.05, power: 0.05, standards: ["ISO 10628", "ISA-88"] },
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
  { type: "weigh-scale", label: "Weigh Scale", isoName: "Process weigh scale or load cell station", cls: "Instrumentation", icon: "WS", color: "#8a6f3d", residence: 0.05, power: 0.05, standards: ["21 CFR Part 11", "GAMP 5"] },
];

const quickAddTypes = ["valve", "control-valve", "pump", "flowmeter", "sensor", "pressure-relief", "manifold", "sampling"];

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
  params: Object.fromEntries(processParameters.map((item) => [item.key, item.value])),
  units: [],
  streams: [],
  costs: [],
};

const els = {
  templateList: document.querySelector("#templateList"),
  scaleList: document.querySelector("#scaleList"),
  parameterList: document.querySelector("#parameterList"),
  quickAdd: document.querySelector("#quickAdd"),
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
  batchDuration: document.querySelector("#batchDuration"),
  directCost: document.querySelector("#directCost"),
  utilities: document.querySelector("#utilities"),
  utilization: document.querySelector("#utilization"),
  equipmentTable: document.querySelector("#equipmentTable"),
  streamsTable: document.querySelector("#streamsTable"),
  simulationBoard: document.querySelector("#simulationBoard"),
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
  if (kg < 1) return `${formatNumber(kg * 1000, 0)} g`;
  return `${formatNumber(kg, 1)} kg`;
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

function unitWidth(item) {
  return isMinorUnit(item) ? 156 : 218;
}

function unitHeight(item) {
  return isMinorUnit(item) ? 58 : 88;
}

function unitMidline(item) {
  return item.y + (isMinorUnit(item) ? 29 : 46);
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
  processParameters.forEach((item) => {
    const input = document.querySelector(`[data-parameter="${item.key}"]`);
    if (input) input.value = state.params[item.key];
  });
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

function renderQuickAdd() {
  els.quickAdd.innerHTML = quickAddTypes.map((type) => {
    const item = palette.find((candidate) => candidate.type === type);
    return `
      <button class="quick-add-button" draggable="true" data-type="${item.type}" title="Add ${item.label}">
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
        <button class="equation-chip" data-equation-query="${item.name}">
          <span>${item.category}</span>
          <b>${item.name}</b>
          <code>${item.formula}</code>
        </button>
      `).join("")}
    </div>
  `;
}

function renderParameters() {
  els.parameterList.innerHTML = processParameters.map((item) => {
    const value = state.params[item.key];
    return `
      <label class="parameter-row">
        <span>${item.label}</span>
        <input data-parameter="${item.key}" type="range" min="${item.min}" max="${item.max}" step="${item.step}" value="${value}" />
        <b>${formatNumber(value, item.step < 1 ? 2 : 0)}${item.unit ? ` ${item.unit}` : ""}</b>
      </label>
    `;
  }).join("");
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
  const stagePaddingX = 520;
  const stagePaddingY = 420;
  const stageWidth = Math.max(1800, ...state.units.map((item) => item.x + unitWidth(item) + stagePaddingX));
  const stageHeight = Math.max(1120, ...state.units.map((item) => item.y + unitHeight(item) + stagePaddingY));
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
    const x1 = from.x + unitWidth(from);
    const y1 = unitMidline(from);
    const x2 = to.x;
    const y2 = unitMidline(to);
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    const kind = streamKind(item, from, to);
    line.className = `stream-line stream-${kind}`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.title = `${item.id}: ${item.composition} · ${streamLabel(kind)}`;
    line.addEventListener("click", () => {
      state.selectedId = item.id;
      renderInspector();
      renderEquationSpotlight();
      renderCanvas();
    });
    if (state.selectedId === item.id) line.classList.add("selected");
    stage.appendChild(line);
  });

  state.units.forEach((item) => {
    const node = document.createElement("button");
    const className = item.cls.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    node.className = `unit unit-${className}${isMinorUnit(item) ? " unit-minor" : ""}${state.selectedId === item.id ? " selected" : ""}${state.connectFrom === item.id ? " connecting" : ""}`;
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
  const prefix = base.icon.replace(/[^A-Z]/g, "").slice(0, 2) || "U";
  const newUnit = unit(`${prefix}-${state.nextUnit++}`, type, x, y);
  state.units.push(newUnit);
  state.selectedId = newUnit.id;
  renderAll();
  showToast(`${base.label} added`);
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

function nextCanvasPosition() {
  const rightMost = state.units.reduce((max, item) => Math.max(max, item.x), 40);
  const row = Math.floor(state.units.length / 4);
  return {
    x: Math.min(rightMost + 265, 45 + (state.units.length % 4) * 265),
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

function renderSimulationBoard() {
  const p = state.params;
  const data = metrics();
  const convergenceError = Math.max(0.0001, (100 - p.recycleFraction) / 100000);
  const washout = p.dilutionRate >= p.specificGrowth;
  const absorptionBoost = p.co2Removal / 2000;
  const groups = [...new Set(spdFunctions.map((item) => item.group))];

  els.simulationBoard.innerHTML = `
    <section class="simulation-summary">
      <article><span>Mode</span><strong>${state.template === "biohydrogen" ? "Continuous DF + recycle" : "Hybrid batch/continuous"}</strong></article>
      <article><span>Tear convergence</span><strong>${formatNumber(convergenceError * 100, 4)}%</strong></article>
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
  const costItems = [
    { label: "Annualized CAPEX", value: data.scale.annualizedCapital, color: "#123a56" },
    { label: "Fixed facility burden", value: data.scale.fixedBurden, color: "#c04f47" },
    { label: "Materials", value: data.scale.materialIntensity, color: "#00a88f" },
    { label: "Labor", value: data.scale.laborCost, color: "#d7a229" },
    { label: "QA/QC validation", value: data.scale.qaCost, color: "#8a6f3d" },
    { label: "Utilities + waste", value: data.scale.utilityCost + data.scale.wasteCost, color: "#2f80ed" },
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
    select: "Move & Edit Units: click any equipment block to select it, drag it to reposition, or use the library above to add new units.",
    connect: "Draw Process Stream: click the source equipment first, then click the destination. Animated streams show process direction.",
    inspect: "Inspect Equations: click equipment or a stream to review sizing assumptions, standards, balances, and relevant formulas.",
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

function exportJson() {
  const payload = JSON.stringify({
    template: state.template,
    scale: state.scale,
    parameters: {
      batchSize: state.batchSize,
      batchCount: state.batchCount,
      titer: state.titer,
      recovery: state.recovery,
      biochemical: state.params,
    },
    metrics: metrics(),
    units: state.units,
    streams: state.streams,
    equations,
    standards,
    simulationFunctions: spdFunctions,
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
  renderQuickAdd();
  renderEquationSpotlight();
  renderParameters();
  renderMetrics();
  renderCanvas();
  renderTables();
  renderEquations();
  renderSimulationBoard();
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

  [els.palette, els.quickAdd].forEach((container) => {
    container.addEventListener("dragstart", (event) => {
      const item = event.target.closest("[data-type]");
      if (!item) return;
      event.dataTransfer.setData("text/plain", item.dataset.type);
      event.dataTransfer.effectAllowed = "copy";
      els.canvas.classList.add("drop-ready");
    });

    container.addEventListener("dragend", () => els.canvas.classList.remove("drop-ready"));
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
    els.canvas.classList.add("drop-ready");
  });

  els.canvas.addEventListener("dragleave", (event) => {
    if (!els.canvas.contains(event.relatedTarget)) els.canvas.classList.remove("drop-ready");
  });

  els.canvas.addEventListener("drop", (event) => {
    event.preventDefault();
    els.canvas.classList.remove("drop-ready");
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

  els.parameterList.addEventListener("input", (event) => {
    const input = event.target.closest("[data-parameter]");
    if (!input) return;
    state.params[input.dataset.parameter] = Number(input.value);
    renderParameters();
    renderMetrics();
    renderCanvas();
    renderTables();
    renderEconomics();
    renderInspector();
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
