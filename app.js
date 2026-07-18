const palette = [
  { type: "raw-material", label: "Raw Material Weighing", isoName: "Weighing and dispensing booth", cls: "Preparation", icon: "WB", color: "#51606f", residence: 1.5, power: 0.4, standards: ["EU GMP Part I Ch. 5", "ICH Q7", "ISO 14644"] },
  { type: "wfi", label: "WFI Generation", isoName: "Water for injection generation system", cls: "Utilities", icon: "WFI", color: "#277da1", residence: 2, power: 5.2, standards: ["USP <1231>", "EU GMP Annex 1", "ISPE Baseline"] },
  { type: "media", label: "Preparation Vessel", isoName: "Agitated preparation vessel", cls: "Preparation", icon: "PV", color: "#277da1", residence: 3, power: 0.8, standards: ["ISO 10628", "ASME BPE", "EU GMP Annex 15"] },
  { type: "mixer", label: "Blending Vessel", isoName: "Agitated mixing vessel", cls: "Preparation", icon: "MX", color: "#577590", residence: 1, power: 0.4, standards: ["ISO 10628", "ASME BPE"] },
  { type: "hold-tank", label: "Hold Vessel", isoName: "Sterile hold vessel", cls: "Hold", icon: "HV", color: "#5a7d7c", residence: 4, power: 0.5, standards: ["ISO 10628", "EU GMP Annex 1", "ASME BPE"] },
  { type: "buffer-prep", label: "Buffer Preparation", isoName: "Buffer preparation vessel", cls: "Preparation", icon: "BP", color: "#277da1", residence: 2.5, power: 0.7, standards: ["ASME BPE", "EU GMP Part I", "ICH Q7"] },
  { type: "resin-prep", label: "Resin Slurry Prep", isoName: "Chromatography resin slurry preparation vessel", cls: "Purification", icon: "RP", color: "#62738a", residence: 2, power: 0.4, standards: ["ASME BPE", "ICH Q11", "EU GMP Part I"] },
  { type: "heat-exchanger", label: "Heat Exchanger", isoName: "Shell-and-tube or plate heat exchanger", cls: "Thermal", icon: "HX", color: "#596a64", residence: 0.5, power: 1.5, standards: ["ISO 10628", "ASME BPE"] },
  { type: "autoclave", label: "Autoclave", isoName: "Moist-heat sterilizer", cls: "Sterilization", icon: "AC", color: "#315f68", residence: 3, power: 9.5, standards: ["EU GMP Annex 1", "ISO 17665", "ISO 13408-1"] },
  { type: "sip", label: "SIP Cycle", isoName: "Steam-in-place sterilization", cls: "Sterilization", icon: "SIP", color: "#315f68", residence: 2, power: 4.5, standards: ["EU GMP Annex 1", "ISO 13408-1", "ASME BPE"] },
  { type: "sterile-filter", label: "Sterilizing Grade Filter", isoName: "0.22 micron sterilizing-grade membrane filter", cls: "Filtration", icon: "SF", color: "#43aa8b", residence: 0.5, power: 0.2, standards: ["EU GMP Annex 1", "PDA TR26", "ISO 13408-2"] },
  { type: "seed-reactor", label: "Seed Bioreactor", isoName: "Seed stirred-tank bioreactor", cls: "Bioreactor", icon: "SR", color: "#11847d", residence: 30, power: 2.4, standards: ["ISO 10628", "ASME BPE", "ISA-88"] },
  { type: "production-reactor", label: "Production Bioreactor", isoName: "Production stirred-tank bioreactor", cls: "Bioreactor", icon: "BR", color: "#0f766e", residence: 96, power: 6.5, standards: ["ASME BPE", "ISA-88", "EU GMP Annex 15"] },
  { type: "fermenter", label: "Fermenter", isoName: "Aerobic stirred-tank fermenter", cls: "Bioreactor", icon: "FR", color: "#4d908e", residence: 72, power: 5.4, standards: ["ISO 10628", "ASME BPE", "ISA-88"] },
  { type: "perfusion", label: "Perfusion Bioreactor", isoName: "Perfusion stirred-tank bioreactor with cell retention", cls: "Bioreactor", icon: "PB", color: "#0f766e", residence: 240, power: 7.4, standards: ["ASME BPE", "ISA-88", "ICH Q5D"] },
  { type: "wave", label: "Single-Use Wave Bioreactor", isoName: "Rocking-motion single-use bioreactor", cls: "Bioreactor", icon: "WB", color: "#11847d", residence: 48, power: 1.8, standards: ["ASME BPE", "ISO 10993", "ICH Q5D"] },
  { type: "cell-removal", label: "Disc-Stack Centrifuge", isoName: "Centrifugal separator", cls: "Solid-liquid", icon: "CF", color: "#4f7f89", residence: 1, power: 3.1, standards: ["ISO 10628", "EU GMP Part I Ch. 3"] },
  { type: "homogenizer", label: "High-Pressure Homogenizer", isoName: "High-pressure cell disruption homogenizer", cls: "Solid-liquid", icon: "HG", color: "#4f7f89", residence: 0.7, power: 12.5, standards: ["ISO 10628", "EU GMP Part I", "ASME BPE"] },
  { type: "depth-filter", label: "Depth Filter", isoName: "Depth filtration module", cls: "Filtration", icon: "DF", color: "#90be6d", residence: 1.2, power: 0.7, standards: ["ISO 13408-2", "EU GMP Annex 1"] },
  { type: "microfilter", label: "Microfilter", isoName: "Microfiltration membrane unit", cls: "Filtration", icon: "MF", color: "#90be6d", residence: 2, power: 1.2, standards: ["ISO 13408-2", "EU GMP Annex 1"] },
  { type: "virus-filter", label: "Virus Filter", isoName: "Virus-retentive membrane filter", cls: "Viral safety", icon: "VF", color: "#43aa8b", residence: 2, power: 0.9, standards: ["ICH Q5A", "EU GMP Annex 1", "PDA TR41"] },
  { type: "chromatography", label: "Chromatography Column", isoName: "Packed-bed chromatography column", cls: "Purification", icon: "CH", color: "#62738a", residence: 5, power: 0.8, standards: ["ICH Q7", "ICH Q11", "ASME BPE"] },
  { type: "protein-a", label: "Protein A Capture", isoName: "Protein A affinity chromatography column", cls: "Purification", icon: "PA", color: "#62738a", residence: 6, power: 0.9, standards: ["ICH Q5A", "ICH Q11", "EU GMP Part I"] },
  { type: "low-ph", label: "Low-pH Hold", isoName: "Viral inactivation hold vessel", cls: "Viral safety", icon: "VI", color: "#596d88", residence: 1.5, power: 0.4, standards: ["ICH Q5A", "EU GMP Annex 15"] },
  { type: "ufdf", label: "UF/DF Skid", isoName: "Tangential-flow ultrafiltration diafiltration skid", cls: "Concentration", icon: "UF", color: "#577590", residence: 4, power: 1.8, standards: ["ASME BPE", "EU GMP Part I"] },
  { type: "nanofilter", label: "Nanofiltration", isoName: "Nanofiltration membrane skid", cls: "Separation", icon: "NF", color: "#43aa8b", residence: 2.5, power: 1.6, standards: ["ICH Q7", "EU GMP Part I", "ASME BPE"] },
  { type: "extractor", label: "Liquid-Liquid Extractor", isoName: "Liquid-liquid extraction mixer-settler", cls: "Separation", icon: "EX", color: "#4895ef", residence: 2.5, power: 1.2, standards: ["ISO 10628", "ICH Q7"] },
  { type: "phase-separator", label: "Phase Separator", isoName: "Gravity phase separator or decanter", cls: "Separation", icon: "PS", color: "#4895ef", residence: 1.5, power: 0.3, standards: ["ISO 10628", "ICH Q7"] },
  { type: "distillation", label: "Distillation Column", isoName: "Distillation column with condenser and reboiler", cls: "Thermal", icon: "DC", color: "#596a64", residence: 8, power: 18, standards: ["ISO 10628", "ICH Q7", "ATEX/DSEAR"] },
  { type: "crystallizer", label: "Crystallizer", isoName: "Batch crystallization vessel", cls: "Recovery", icon: "CR", color: "#596d88", residence: 8, power: 1.4, standards: ["ISO 10628", "ICH Q7"] },
  { type: "filter-dryer", label: "Filter Dryer", isoName: "Agitated nutsche filter dryer", cls: "Recovery", icon: "FD", color: "#596d88", residence: 10, power: 5.8, standards: ["ICH Q7", "EU GMP Part II", "ISO 10628"] },
  { type: "washer", label: "Wash Vessel", isoName: "Product wash vessel", cls: "Downstream", icon: "WV", color: "#4895ef", residence: 2, power: 0.7, standards: ["ISO 10628", "EU GMP Part I"] },
  { type: "dryer", label: "Vacuum Dryer", isoName: "Vacuum tray or conical dryer", cls: "Finishing", icon: "DR", color: "#596a64", residence: 6, power: 8.8, standards: ["ICH Q7", "EU GMP Part II"] },
  { type: "formulation", label: "Formulation Vessel", isoName: "Final formulation vessel", cls: "Finishing", icon: "FV", color: "#5a7d7c", residence: 2, power: 0.9, standards: ["EU GMP Annex 1", "ICH Q8", "ICH Q9"] },
  { type: "sterile-fill", label: "Aseptic Filling Line", isoName: "Aseptic filling and stoppering line", cls: "Packaging", icon: "AF", color: "#3f6173", residence: 1.5, power: 2.4, standards: ["EU GMP Annex 1", "ISO 13408-1", "ISO 14644"] },
  { type: "lyophilizer", label: "Lyophilizer", isoName: "Freeze dryer", cls: "Finishing", icon: "LY", color: "#3f6173", residence: 28, power: 10.2, standards: ["EU GMP Annex 1", "ASME BPE", "ISO 14644"] },
  { type: "isolator", label: "Aseptic Isolator", isoName: "Grade A aseptic isolator", cls: "Containment", icon: "IS", color: "#62738a", residence: 1, power: 3.8, standards: ["EU GMP Annex 1", "ISO 14644", "ISO 13408-6"] },
  { type: "filler", label: "Packaging Line", isoName: "Secondary packaging line", cls: "Packaging", icon: "PK", color: "#3f6173", residence: 1, power: 1.1, standards: ["EU GMP Annex 16", "21 CFR 211"] },
  { type: "cip", label: "CIP Skid", isoName: "Clean-in-place skid", cls: "Utilities", icon: "CIP", color: "#315f68", residence: 4, power: 2.2, standards: ["ASME BPE", "EU GMP Annex 15", "ISPE Baseline"] },
  { type: "waste-inactivation", label: "Waste Inactivation", isoName: "Thermal or chemical bio-waste inactivation skid", cls: "Utilities", icon: "WI", color: "#315f68", residence: 3, power: 6.2, standards: ["EU GMP Part I", "Biosafety guidance", "ISO 14001"] },
  { type: "qc", label: "QC Release Testing", isoName: "Quality control testing hold point", cls: "Quality", icon: "QC", color: "#62738a", residence: 12, power: 0.2, standards: ["ICH Q2", "ICH Q6B", "USP <85>"] },
  { type: "em", label: "Environmental Monitoring", isoName: "Cleanroom environmental monitoring point", cls: "Quality", icon: "EM", color: "#62738a", residence: 0.5, power: 0.1, standards: ["EU GMP Annex 1", "ISO 14644", "USP <1116>"] },
  { type: "cell-bank", label: "Cell Bank Thaw", isoName: "Master or working cell bank thaw station", cls: "Preparation", icon: "CB", color: "#51606f", residence: 1, power: 0.2, standards: ["ICH Q5D", "EU GMP Part I", "ISO 20387"] },
  { type: "seed-flask", label: "Shake Flask Seed", isoName: "Incubator shake flask seed culture", cls: "Bioreactor", icon: "SK", color: "#11847d", residence: 24, power: 0.1, standards: ["ICH Q5D", "EU GMP Annex 15"] },
  { type: "single-use-mixer", label: "Single-Use Mixer", isoName: "Single-use mixing bag with load cells", cls: "Preparation", icon: "SU", color: "#277da1", residence: 1.5, power: 0.3, standards: ["ASME BPE", "ISO 10993", "EU GMP Annex 1"] },
  { type: "feed-tank", label: "Fed-Batch Feed Tank", isoName: "Sterile feed vessel or single-use feed bag", cls: "Hold", icon: "FT", color: "#5a7d7c", residence: 6, power: 0.3, standards: ["ASME BPE", "EU GMP Annex 15"] },
  { type: "gas-mixing", label: "Gas Mixing Skid", isoName: "Bioreactor air oxygen carbon dioxide gas blending skid", cls: "Utilities", icon: "GM", color: "#3f6173", residence: 0.2, power: 2.8, standards: ["ASME BPE", "ISA-88", "ISO 8573"] },
  { type: "compressor", label: "Clean Air Compressor", isoName: "Oil-free compressed air generation and drying package", cls: "Utilities", icon: "CA", color: "#3f6173", residence: 0.2, power: 12, standards: ["ISO 8573", "EU GMP Annex 1", "ISPE Baseline"] },
  { type: "clean-steam", label: "Clean Steam Generator", isoName: "Clean steam generator for SIP and sterilizers", cls: "Utilities", icon: "CS", color: "#315f68", residence: 0.5, power: 14, standards: ["ASME BPE", "EN 285", "EU GMP Annex 1"] },
  { type: "hvac", label: "Cleanroom HVAC", isoName: "GMP HVAC and HEPA air handling unit", cls: "Utilities", icon: "HV", color: "#3f6173", residence: 0.5, power: 18, standards: ["ISO 14644", "EU GMP Annex 1", "ISPE Baseline"] },
  { type: "sampling", label: "Aseptic Sampling", isoName: "Closed aseptic sampling point", cls: "Quality", icon: "SP", color: "#62738a", residence: 0.2, power: 0.05, standards: ["EU GMP Annex 1", "USP <85>", "ICH Q6B"] },
  { type: "pat", label: "PAT Analyzer", isoName: "Process analytical technology analyzer", cls: "Quality", icon: "PAT", color: "#62738a", residence: 0.1, power: 0.4, standards: ["ICH Q8", "ICH Q9", "21 CFR Part 11"] },
  { type: "ph-adjust", label: "pH Adjustment", isoName: "Acid base pH adjustment vessel", cls: "Preparation", icon: "pH", color: "#577590", residence: 0.8, power: 0.3, standards: ["ISO 10628", "ICH Q7", "ASME BPE"] },
  { type: "antifoam", label: "Antifoam Dosing", isoName: "Sterile antifoam dosing skid", cls: "Utilities", icon: "AD", color: "#3f6173", residence: 0.2, power: 0.1, standards: ["ASME BPE", "EU GMP Annex 15"] },
  { type: "surge-tank", label: "Surge Vessel", isoName: "Intermediate surge or equalization vessel", cls: "Hold", icon: "SV", color: "#5a7d7c", residence: 2.5, power: 0.4, standards: ["ISO 10628", "ASME BPE"] },
  { type: "harvest-hold", label: "Harvest Hold", isoName: "Temperature-controlled harvest hold vessel", cls: "Hold", icon: "HH", color: "#5a7d7c", residence: 8, power: 1.2, standards: ["EU GMP Annex 15", "ASME BPE", "ICH Q5C"] },
  { type: "prefilter", label: "Prefilter", isoName: "Bioburden reduction prefilter", cls: "Filtration", icon: "PF", color: "#90be6d", residence: 0.5, power: 0.2, standards: ["ISO 13408-2", "EU GMP Annex 1"] },
  { type: "polish-filter", label: "Polishing Filter", isoName: "Fine polishing filter assembly", cls: "Filtration", icon: "PF2", color: "#90be6d", residence: 0.5, power: 0.2, standards: ["ISO 13408-2", "EU GMP Annex 1"] },
  { type: "bagging", label: "Single-Use Bag Hold", isoName: "Sterile single-use bag hold assembly", cls: "Hold", icon: "BH", color: "#5a7d7c", residence: 3, power: 0.1, standards: ["ISO 10993", "EU GMP Annex 1", "ASME BPE"] },
  { type: "labeling", label: "Label and Serialization", isoName: "Labeling serialization and vision inspection line", cls: "Packaging", icon: "LS", color: "#3f6173", residence: 0.8, power: 1.1, standards: ["EU GMP Annex 16", "21 CFR Part 11", "ISO 15378"] },
  { type: "inspection", label: "Visual Inspection", isoName: "Automated visual inspection station", cls: "Quality", icon: "VIQ", color: "#62738a", residence: 1, power: 1.8, standards: ["EU GMP Annex 1", "USP <790>", "21 CFR 211"] },
  { type: "cold-storage", label: "Cold Storage", isoName: "Qualified cold room or freezer storage", cls: "Hold", icon: "CSG", color: "#4895ef", residence: 24, power: 4.5, standards: ["ICH Q5C", "EU GMP Annex 15", "GMP GDP"] },
  { type: "waste-hold", label: "Waste Hold Tank", isoName: "GMP liquid waste hold tank", cls: "Utilities", icon: "WH", color: "#315f68", residence: 6, power: 0.5, standards: ["ISO 14001", "EU GMP Part I"] },
  { type: "solvent-tank", label: "Solvent Tank Farm", isoName: "GMP solvent storage and transfer system", cls: "Hold", icon: "ST", color: "#596a64", residence: 8, power: 0.7, standards: ["ATEX/DSEAR", "ICH Q7", "ISO 10628"] },
  { type: "dryer-mill", label: "Mill and Sieve", isoName: "Cone mill and vibratory sieve", cls: "Finishing", icon: "MS", color: "#596a64", residence: 1.5, power: 2.2, standards: ["ICH Q7", "EU GMP Part II", "ISO 10628"] },
  { type: "weigh-fill", label: "Weigh Fill", isoName: "Bulk weigh fill station", cls: "Packaging", icon: "WF", color: "#3f6173", residence: 1, power: 0.8, standards: ["EU GMP Annex 16", "21 CFR 211"] },
  { type: "pump", label: "Transfer Pump", isoName: "Hygienic transfer pump", cls: "Piping", icon: "P", color: "#4b5563", residence: 0.1, power: 1.6, standards: ["ASME BPE", "ISO 10628", "EU GMP Annex 15"] },
  { type: "valve", label: "Manual Valve", isoName: "Hygienic diaphragm valve", cls: "Piping", icon: "V", color: "#4f6f8f", residence: 0.05, power: 0.02, standards: ["ASME BPE", "ISO 10628"] },
  { type: "control-valve", label: "Control Valve", isoName: "Automated flow control valve", cls: "Piping", icon: "CV", color: "#4b5563", residence: 0.05, power: 0.08, standards: ["ASME BPE", "ISA-88", "21 CFR Part 11"] },
  { type: "flowmeter", label: "Flowmeter", isoName: "Coriolis or magnetic flowmeter", cls: "Instrumentation", icon: "FM", color: "#00a88f", residence: 0.05, power: 0.05, standards: ["ISA-88", "GAMP 5", "21 CFR Part 11"] },
  { type: "sensor", label: "PAT Sensor", isoName: "Inline pH DO conductivity or UV sensor", cls: "Instrumentation", icon: "S", color: "#62738a", residence: 0.05, power: 0.08, standards: ["ICH Q8", "GAMP 5", "21 CFR Part 11"] },
  { type: "pressure-relief", label: "Pressure Relief", isoName: "Relief valve or rupture disc assembly", cls: "Piping", icon: "PR", color: "#275f6b", residence: 0.05, power: 0.02, standards: ["ASME BPE", "PED", "ISO 10628"] },
  { type: "manifold", label: "Manifold", isoName: "Hygienic transfer manifold", cls: "Piping", icon: "MF", color: "#4f6f8f", residence: 0.1, power: 0.05, standards: ["ASME BPE", "EU GMP Annex 1", "ISO 10628"] },
  { type: "storage", label: "Raw Material Storage", isoName: "Bulk raw material storage bin or tank", cls: "Preparation", icon: "STO", color: "#51606f", residence: 12, power: 0.2, standards: ["ISO 10628", "EU GMP Part I Ch. 5"] },
  { type: "grinder", label: "Grinder", isoName: "Feedstock grinder or mill", cls: "Preparation", icon: "GR", color: "#51606f", residence: 0.8, power: 7.5, standards: ["ISO 10628", "EU GMP Part I"] },
  { type: "liquefaction", label: "Liquefaction Reactor", isoName: "Enzymatic liquefaction reactor", cls: "Bioreactor", icon: "LQ", color: "#11847d", residence: 2, power: 3.5, standards: ["ISO 10628", "ASME BPE"] },
  { type: "saccharification", label: "Saccharification Reactor", isoName: "Enzymatic saccharification reactor", cls: "Bioreactor", icon: "SC", color: "#11847d", residence: 4, power: 3.8, standards: ["ISO 10628", "ASME BPE"] },
  { type: "rotary-filter", label: "Rotary Vacuum Filter", isoName: "Rotary vacuum filter", cls: "Solid-liquid", icon: "RVF", color: "#4f7f89", residence: 1.5, power: 5.4, standards: ["ISO 10628", "EU GMP Part I"] },
  { type: "dark-fermenter", label: "Dark Fermenter", isoName: "Thermophilic continuous stirred-tank dark fermenter", cls: "Bioreactor", icon: "DF", color: "#0f766e", residence: 12, power: 8.2, standards: ["ISO 10628", "ISA-88", "ASME BPE"] },
  { type: "anaerobic-digester", label: "Anaerobic Digester", isoName: "Anaerobic digestion reactor", cls: "Bioreactor", icon: "AD", color: "#4d908e", residence: 72, power: 5.6, standards: ["ISO 10628", "ISA-88"] },
  { type: "absorber", label: "Absorption Column", isoName: "Packed or tray absorption column", cls: "Separation", icon: "ABS", color: "#4895ef", residence: 2.2, power: 6.4, standards: ["ISO 10628", "ATEX/DSEAR"] },
  { type: "desorber", label: "Desorption Column", isoName: "Solvent regeneration desorption column", cls: "Thermal", icon: "DES", color: "#596a64", residence: 2.8, power: 12.5, standards: ["ISO 10628", "ATEX/DSEAR"] },
  { type: "splitter", label: "Recycle Splitter", isoName: "Recycle purge splitter", cls: "Piping", icon: "SPL", color: "#4b5563", residence: 0.05, power: 0.05, standards: ["ISO 10628", "ISA-88"] },
  { type: "regulator", label: "Feedback Regulator", isoName: "Feedback regulatory control block", cls: "Instrumentation", icon: "REG", color: "#62738a", residence: 0.05, power: 0.2, standards: ["ISA-88", "GAMP 5", "21 CFR Part 11"] },
  { type: "tear-stream", label: "Tear Stream Marker", isoName: "Recycle loop tear stream convergence marker", cls: "Instrumentation", icon: "TS", color: "#275f6b", residence: 0.05, power: 0.02, standards: ["ISA-88", "GAMP 5"] },
  { type: "equalization", label: "Equalization Tank", isoName: "Wastewater equalization basin", cls: "Environmental", icon: "EQ", color: "#277da1", residence: 8, power: 1.2, standards: ["ISO 14001", "ISO 10628"] },
  { type: "neutralization", label: "Neutralization Tank", isoName: "pH neutralization reactor", cls: "Environmental", icon: "NT", color: "#577590", residence: 2, power: 0.8, standards: ["ISO 14001", "ISO 10628"] },
  { type: "primary-clarifier", label: "Primary Clarifier", isoName: "Gravity primary clarifier", cls: "Environmental", icon: "PC", color: "#4895ef", residence: 3, power: 0.9, standards: ["ISO 14001", "ISO 10628"] },
  { type: "aeration-basin", label: "Aeration Basin", isoName: "Activated sludge aeration basin", cls: "Environmental", icon: "AB", color: "#11847d", residence: 18, power: 24, standards: ["ISO 14001", "ISA-88"] },
  { type: "secondary-clarifier", label: "Secondary Clarifier", isoName: "Secondary settling clarifier", cls: "Environmental", icon: "SC2", color: "#4895ef", residence: 4, power: 1.1, standards: ["ISO 14001", "ISO 10628"] },
  { type: "sludge-thickener", label: "Sludge Thickener", isoName: "Gravity sludge thickener", cls: "Environmental", icon: "TH", color: "#62738a", residence: 6, power: 1.4, standards: ["ISO 14001", "ISO 10628"] },
  { type: "belt-filter", label: "Belt Filter Press", isoName: "Belt filter press sludge dewatering unit", cls: "Solid-liquid", icon: "BFP", color: "#4f7f89", residence: 1.2, power: 8.2, standards: ["ISO 14001", "ISO 10628"] },
  { type: "uv-disinfection", label: "UV Disinfection", isoName: "UV wastewater disinfection channel", cls: "Environmental", icon: "UV", color: "#62738a", residence: 0.2, power: 4.1, standards: ["ISO 14001"] },
  { type: "ion-exchange", label: "Ion Exchange", isoName: "Ion exchange column", cls: "Separation", icon: "IX", color: "#62738a", residence: 1.8, power: 0.9, standards: ["ISO 10628", "USP <1231>"] },
  { type: "reverse-osmosis", label: "Reverse Osmosis", isoName: "Reverse osmosis membrane skid", cls: "Separation", icon: "RO", color: "#43aa8b", residence: 1.5, power: 5.7, standards: ["USP <1231>", "ISO 10628"] },
  { type: "scrubber", label: "Gas Scrubber", isoName: "Wet gas scrubber", cls: "Air pollution", icon: "GS", color: "#4895ef", residence: 0.8, power: 6.4, standards: ["EPA-MACT", "ISO 14001"] },
  { type: "baghouse", label: "Baghouse Filter", isoName: "Fabric baghouse dust collector", cls: "Air pollution", icon: "BH", color: "#90be6d", residence: 0.5, power: 4.8, standards: ["EPA-MACT", "ISO 14001"] },
  { type: "cyclone", label: "Cyclone Separator", isoName: "Cyclone particulate separator", cls: "Air pollution", icon: "CY", color: "#4f7f89", residence: 0.2, power: 2.4, standards: ["EPA-MACT", "ISO 10628"] },
  { type: "carbon-bed", label: "Activated Carbon Bed", isoName: "Activated carbon adsorption bed", cls: "Air pollution", icon: "ACB", color: "#62738a", residence: 1.5, power: 1.6, standards: ["EPA-MACT", "ISO 14001"] },
  { type: "thermal-oxidizer", label: "Thermal Oxidizer", isoName: "Regenerative thermal oxidizer", cls: "Air pollution", icon: "TO", color: "#596a64", residence: 0.3, power: 20, standards: ["EPA-MACT", "ISO 14001"] },
  { type: "cartoner", label: "Cartoner", isoName: "Cartoning packaging machine", cls: "Packaging", icon: "CT", color: "#3f6173", residence: 0.8, power: 2.8, standards: ["ISO 15378", "21 CFR 211"] },
  { type: "case-packer", label: "Case Packer", isoName: "Case packing machine", cls: "Packaging", icon: "CP", color: "#3f6173", residence: 0.6, power: 2.1, standards: ["ISO 15378"] },
  { type: "palletizer", label: "Palletizer", isoName: "Palletizing station", cls: "Packaging", icon: "PL", color: "#3f6173", residence: 0.5, power: 3.2, standards: ["ISO 15378"] },
  { type: "vacuum-pump", label: "Vacuum Pump", isoName: "Auxiliary vacuum pump package", cls: "Auxiliary", icon: "VP", color: "#3f6173", residence: 0.2, power: 4.6, standards: ["ISO 10628", "EU GMP Part I"] },
  { type: "heat-agent", label: "Heat Agent Loop", isoName: "Heat transfer agent supply and return loop", cls: "Utilities", icon: "HTA", color: "#596a64", residence: 0.3, power: 2.4, standards: ["ISO 10628", "ISPE Baseline"] },
  { type: "power-meter", label: "Power Meter", isoName: "Electrical demand and generation meter", cls: "Instrumentation", icon: "kW", color: "#7b8a84", residence: 0.05, power: 0.05, standards: ["GAMP 5", "21 CFR Part 11"] },
  { type: "labor-crew", label: "Labor Crew", isoName: "Labor type demand and allocation record", cls: "Resources", icon: "LC", color: "#62738a", residence: 0.1, power: 0.02, standards: ["ISA-95", "EU GMP Part I"] },
  { type: "material-inventory", label: "Material Inventory", isoName: "Material storage inventory and timing record", cls: "Resources", icon: "MI", color: "#51606f", residence: 2, power: 0.1, standards: ["EU GMP Part I Ch. 5", "ICH Q7"] },
  { type: "stream-summary", label: "Stream Summary", isoName: "Stream summary table and Excel-link node", cls: "Reports", icon: "SR", color: "#00a88f", residence: 0.1, power: 0.02, standards: ["21 CFR Part 11", "GAMP 5"] },
  { type: "report-set", label: "Report Set", isoName: "Generate-and-save report set node", cls: "Reports", icon: "RPT", color: "#00a88f", residence: 0.2, power: 0.05, standards: ["21 CFR Part 11", "GAMP 5"] },
  { type: "excel-link", label: "Excel/OLE Link", isoName: "Hot-linked spreadsheet or OLE automation object", cls: "Exchange", icon: "XL", color: "#00a88f", residence: 0.1, power: 0.05, standards: ["21 CFR Part 11", "GAMP 5"] },
  { type: "visual-object", label: "Visual Object", isoName: "Text, line, rectangle, ellipse, polyline, or polygon annotation", cls: "Documentation", icon: "VO", color: "#4f6f8f", residence: 0.05, power: 0.01, standards: ["ISO 10628", "GAMP 5"] },
  { type: "process-explorer", label: "Process Explorer", isoName: "Process tree, search, locate, and overview navigator node", cls: "Documentation", icon: "PX", color: "#4f6f8f", residence: 0.05, power: 0.01, standards: ["GAMP 5", "21 CFR Part 11"] },
  { type: "cleaning-agent", label: "Cleaning Agent Tank", isoName: "Validated cleaning-agent preparation and supply tank", cls: "Utilities", icon: "CAT", color: "#315f68", residence: 1.2, power: 0.6, standards: ["EU GMP Annex 15", "ASME BPE"] },
  { type: "rinse-water", label: "Rinse Water Hold", isoName: "Final rinse water hold and conductivity endpoint tank", cls: "Utilities", icon: "RW", color: "#5bc0de", residence: 0.8, power: 0.4, standards: ["USP <1231>", "EU GMP Annex 15"] },
  { type: "caustic-hold", label: "Caustic Hold", isoName: "Caustic cleaning solution hold tank", cls: "Utilities", icon: "NaOH", color: "#315f68", residence: 1, power: 0.5, standards: ["ASME BPE", "EU GMP Annex 15"] },
  { type: "acid-hold", label: "Acid Hold", isoName: "Acid cleaning solution hold tank", cls: "Utilities", icon: "ACD", color: "#315f68", residence: 1, power: 0.5, standards: ["ASME BPE", "EU GMP Annex 15"] },
  { type: "cip-return", label: "CIP Return", isoName: "CIP return, neutralization, and spent-rinse collection", cls: "Utilities", icon: "CIPR", color: "#3f6173", residence: 1.5, power: 0.8, standards: ["EU GMP Annex 15", "ISO 14001"] },
  { type: "heat-recovery", label: "Heat Recovery Loop", isoName: "Process heat recovery exchanger and reuse loop", cls: "Thermal", icon: "HR", color: "#596a64", residence: 0.6, power: 1.1, standards: ["ISO 10628", "ISPE Baseline"] },
  { type: "condensate-return", label: "Condensate Return", isoName: "Clean steam condensate recovery and credit node", cls: "Utilities", icon: "CRN", color: "#596a64", residence: 0.4, power: 0.7, standards: ["ASME BPE", "ISPE Baseline"] },
  { type: "solvent-recycle", label: "Solvent Recycle", isoName: "Recovered solvent recycle and purge control", cls: "Recovery", icon: "SRC", color: "#62738a", residence: 1.1, power: 1.8, standards: ["ISO 10628", "ICH Q7"] },
  { type: "water-reuse", label: "Water Reuse", isoName: "Process water reuse and reject-routing node", cls: "Environmental", icon: "WR", color: "#277da1", residence: 1.4, power: 1.2, standards: ["USP <1231>", "ISO 14001"] },
  { type: "weigh-scale", label: "Weigh Scale", isoName: "Process weigh scale or load cell station", cls: "Instrumentation", icon: "WS", color: "#62738a", residence: 0.05, power: 0.05, standards: ["21 CFR Part 11", "GAMP 5"] },
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

const gpromsModelCapabilities = [
  {
    name: "Equation-oriented plant model",
    status: "Axion scaffold",
    inputs: "Units, streams, reaction kinetics, property package, recycle loops",
    output: "High-fidelity equation set and variable map",
    example: "mAb: connect growth, substrate uptake, kLa, harvest recovery, chromatography yield, utilities, and recycle equations into one solvable model.",
  },
  {
    name: "Parameter estimation",
    status: "Axion scaffold",
    inputs: "Batch data, PAT tags, lab runs, CSV uploads, literature priors",
    output: "Estimated kinetic, transfer, yield, and cost parameters with confidence flags",
    example: "Fit mu max, qO2, kLa correction, resin capacity, filter fouling and media-consumption coefficients from uploaded batches.",
  },
  {
    name: "Dynamic optimization",
    status: "Axion scaffold",
    inputs: "Objective, constraints, batch schedule, feed profile, control bounds",
    output: "Optimized feed, DO, temperature, harvest, cleaning, and utility strategy",
    example: "Minimize cost per kg while respecting ammonium, lactate, DO, shear, hold-time, sterility and bottleneck constraints.",
  },
  {
    name: "Uncertainty and design-space",
    status: "Axion scaffold",
    inputs: "Parameter ranges, scale assumptions, yield uncertainty, CAPEX/OPEX factors",
    output: "Risk-ranked design envelope and sensitivity map",
    example: "Show whether titer, recovery, resin lifetime, media cost or utility carbon intensity dominates LCA/TEA uncertainty.",
  },
  {
    name: "Soft sensors and online twin",
    status: "Axion scaffold",
    inputs: "SCADA / historian tags, Raman, capacitance, pH, DO, airflow, feed mass",
    output: "Live state estimates, deviation warnings, and model-vs-plant residuals",
    example: "Estimate biomass, OUR, substrate depletion, oxygen limitation and heat-load drift during production.",
  },
  {
    name: "Utilities and sustainability optimizer",
    status: "Axion scaffold",
    inputs: "Steam, WFI, chilled water, heat recovery, wastewater, solvent recovery, power",
    output: "Utility pinch, heat reuse, water reuse, CO2e and cost improvement ideas",
    example: "Rank heat-recovery loop, condensate return, water reuse and solvent recycle by cost, carbon and implementation impact.",
  },
];

function gpromsAlgorithmRows() {
  const p = state.params;
  const data = metrics();
  const solved = solveMassBalance();
  const dynamic = dynamicBatchProfile();
  const cfd = cfdReport()[0];
  const volumeL = cfd?.volumeL || state.batchSize;
  const columnLengthM = Math.max(0.8, Math.pow(volumeL / 1000, 1 / 3) * 1.8);
  const axialVelocityMph = Math.max(0.05, (p.feedRate || state.batchSize * 0.04) / Math.max(volumeL, 1) * columnLengthM);
  const axialDispersionM2ph = Math.max(0.002, columnLengthM * axialVelocityMph / Math.max(12, p.kla / 4));
  const peclet = axialVelocityMph * columnLengthM / axialDispersionM2ph;
  const pvsdCompartments = Math.max(6, Math.round(Math.sqrt(Math.max(volumeL, 1)) / 7));
  const validationResidual = Math.max(0.8, (100 - solved.totals.closurePct) * 1.4 + Math.max(0, 30 - dynamic.minDoPct) * 0.22 + Math.max(0, dynamic.maxAmmoniaMm - (isCellCultureTemplate() ? 2 : 6)) * 0.7);
  return [
    {
      stage: 1,
      title: "Choose model objective",
      modelElement: "Product, impurity, RTD, oxygen, nutrient, or heat profile",
      axionInput: `${activeTemplate().product}; ${formatNumber(data.annualProduct, 1)} t/year target`,
      equation: "min J(theta) = sum((y_meas - y_model(theta))^2)",
      status: "defined",
      validationMetric: "Objective function ready",
    },
    {
      stage: 2,
      title: "Select distributed model",
      modelElement: "Convective-dispersive balance plus PVSD compartment layer",
      axionInput: `${pvsdCompartments} PVSD compartments; ${formatNumber(columnLengthM, 2)} m characteristic length`,
      equation: "dC/dt = D_ax*d2C/dz2 - u*dC/dz + R(C,t)",
      status: "implemented scaffold",
      validationMetric: `Pe ${formatNumber(peclet, 1)}`,
    },
    {
      stage: 3,
      title: "Define parameters and geometry",
      modelElement: "Velocity, axial dispersion, kLa, hold-up, porosity, volume split",
      axionInput: `u ${formatNumber(axialVelocityMph, 3)} m/h; D_ax ${formatNumber(axialDispersionM2ph, 4)} m2/h; kLa ${formatNumber(p.kla, 1)} 1/h`,
      equation: "Pe = u*L/D_ax",
      status: peclet < 8 ? "needs review" : "ready",
      validationMetric: peclet < 8 ? "Dispersion-dominated" : "Advection/dispersion plausible",
    },
    {
      stage: 4,
      title: "Set initial and boundary conditions",
      modelElement: "Danckwerts inlet, zero-gradient outlet, initial concentration field",
      axionInput: `Substrate ${formatNumber(p.substrateConcentration, 1)} g/L; DO floor ${formatNumber(dynamic.minDoPct, 1)}%`,
      equation: "u(C_in-C_0)=D_ax*(dC/dz)|z=0; (dC/dz)|z=L=0",
      status: "ready",
      validationMetric: "IC/BC package generated",
    },
    {
      stage: 5,
      title: "Discretize PDE model",
      modelElement: "Method of lines with finite-volume axial nodes",
      axionInput: `${Math.max(24, pvsdCompartments * 4)} axial nodes; ${dynamic.points.length} dynamic output points`,
      equation: "dC_i/dt = D_ax*(C_{i+1}-2C_i+C_{i-1})/dz2 - u*(C_i-C_{i-1})/dz + R_i",
      status: "screening grid",
      validationMetric: "Grid independence still required",
    },
    {
      stage: 6,
      title: "Run dynamic solver",
      modelElement: "DAE/ODE solve, event schedule, recycle convergence, unit constraints",
      axionInput: `${formatNumber(dynamic.durationH, 1)} h batch profile; ${solved.convergence.iterations} recycle iterations`,
      equation: "F(x, dx/dt, z, t, theta) = 0",
      status: solved.convergence.converged ? "converged" : "review convergence",
      validationMetric: `${formatNumber(solved.convergence.maxRelativeDelta * 100, 3)}% recycle delta`,
    },
    {
      stage: 7,
      title: "Validate against data",
      modelElement: "Compare model outputs with experiments, historian tags, or PAT profiles",
      axionInput: `Residual score ${formatNumber(validationResidual, 2)}; closure ${formatNumber(solved.totals.closurePct, 2)}%`,
      equation: "RMSE = sqrt(sum((y_meas-y_model)^2)/n)",
      status: validationResidual > 6 ? "calibration needed" : "screening pass",
      validationMetric: validationResidual > 6 ? "Needs measured calibration data" : "Ready for higher-fidelity handoff",
    },
    {
      stage: 8,
      title: "Iterate or export",
      modelElement: "Update parameters, refine grid, add data, or export to equation-oriented solver",
      axionInput: "Equations, parameters, streams, dynamic profile, unit models, CFD screening",
      equation: "theta_next = theta + Delta theta from estimation/optimization",
      status: "handoff ready",
      validationMetric: "CSV/JSON package available",
    },
  ];
}

function pvsdParameterRows() {
  const rows = gpromsAlgorithmRows();
  const dynamic = dynamicBatchProfile();
  const cfd = cfdReport()[0];
  const p = state.params;
  return [
    { parameter: "model_family", value: "Convective-dispersive + PVSD", unit: "", meaning: "Distributed axial transport with compartmental population/volume subdivision layer" },
    { parameter: "axial_nodes", value: rows.find((row) => row.stage === 5)?.axionInput.match(/\d+/)?.[0] || 24, unit: "nodes", meaning: "Finite-volume method-of-lines discretization size" },
    { parameter: "pvsd_compartments", value: (rows.find((row) => row.stage === 2)?.axionInput.match(/\d+/)?.[0] || 6), unit: "compartments", meaning: "Compartment count for PVSD-style residence/volume subdivision" },
    { parameter: "peclet_number", value: rows.find((row) => row.stage === 3)?.validationMetric.replace("Pe ", "") || "", unit: "-", meaning: "Advection-to-axial-dispersion ratio" },
    { parameter: "kla", value: formatNumber(p.kla, 2), unit: "1/h", meaning: "Gas-liquid oxygen transfer input used by the bioreactor layer" },
    { parameter: "minimum_do", value: formatNumber(dynamic.minDoPct, 2), unit: "% air saturation", meaning: "Screening validation signal for oxygen limitation" },
    { parameter: "max_ammonium", value: formatNumber(dynamic.maxAmmoniaMm, 2), unit: "mM", meaning: "Cell-culture metabolic boundary signal" },
    { parameter: "mixing_time", value: cfd ? formatNumber(cfd.engineering.mixingTimeMin, 2) : "", unit: "min", meaning: "CFD-style screening input for spatial gradients" },
  ];
}

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
  {
    group: "Siemens",
    title: "Bioprocess digital twins and gPROMS-style modelling",
    appliesTo: ["process-explorer", "pat", "sensor", "report-set", "utility", "power-demand", "bioreactor"],
    benchmark: "Bioprocess digital twins support in-silico design, optimization, scale-up, soft sensing, monitoring, real-time optimization, and manufacturing decision support.",
    modelUse: "Advanced process modelling panel, soft-sensor telemetry, parameter-estimation scaffold, model-predictive optimization path, and utility/sustainability optimizer.",
    source: "Siemens - Bioprocess digital twins",
    url: "https://resources.sw.siemens.com/en-US/bioprocess-digital-twins/",
  },
  {
    group: "Paper",
    title: "gPROMS simulation algorithm for convective-dispersive and PVSD models",
    appliesTo: ["gproms", "simulation", "chromatography", "filtration", "bioreactor", "digital-twin"],
    benchmark: "Equation-oriented workflows define objectives, PDE/DAE model structure, boundary and initial conditions, discretization, solver execution, validation, and iterative refinement.",
    modelUse: "Simulation tab algorithm panel, convective-dispersive equations, PVSD parameter package, and solver handoff export.",
    source: "ResearchGate figure supplied by user - gPROMS simulation algorithm",
    url: "https://www.researchgate.net/publication/359984264/figure/fig2/AS:11431281138426322@1680747250888/gPROMS-simulation-algorithm-Convective-dispersive-model-PVSD-model.png",
  },
  {
    group: "Paper",
    title: "CFD parameters for stirred-tank bioreactors",
    appliesTo: ["production-reactor", "seed-reactor", "fermenter", "sparger", "gas-mixing", "sensor"],
    benchmark: "Relevant CFD screening variables include power input, gas hold-up, mixing time, shear stress, oxygen transfer, kLa/OTR, impeller configuration, baffles, and sparging.",
    modelUse: "CFD workbench vessel layout, OTR margin, mixing-time, gas-hold-up, tip-speed, oxygen/nutrient/shear heatmap, and dead-zone recommendations.",
    source: "PMC - Oxygen mass transfer in a stirred tank bioreactor",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3561095/",
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
  { key: "cipTime", label: "CIP cycle time", unit: "h", min: 0.2, max: 16, step: 0.1, value: 2.5 },
  { key: "sipHold", label: "SIP hold time", unit: "min", min: 5, max: 90, step: 1, value: 30 },
  { key: "sterilityAssurance", label: "Sterility assurance", unit: "log", min: 2, max: 12, step: 0.5, value: 6 },
  { key: "qcReleaseTime", label: "QC release time", unit: "h", min: 0, max: 240, step: 1, value: 48 },
  { key: "operatorShiftHours", label: "Operator shift", unit: "h", min: 4, max: 12, step: 0.5, value: 8 },
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
  { key: "mediaCostPerL", label: "Media cost", unit: "$/L", min: 0.1, max: 500, step: 0.1, value: 42 },
  { key: "feedSupplementCostPerL", label: "Feed/supplement cost", unit: "$/L", min: 0, max: 1200, step: 1, value: 160 },
  { key: "bufferCostPerL", label: "Buffer cost", unit: "$/L", min: 0.05, max: 80, step: 0.05, value: 3.2 },
  { key: "resinCostPerL", label: "Resin cost", unit: "$/L resin", min: 50, max: 25000, step: 50, value: 9500 },
  { key: "singleUseCostPerL", label: "Single-use cost", unit: "$/L batch", min: 0, max: 120, step: 0.1, value: 7.5 },
  { key: "qcConsumableCost", label: "QC consumables", unit: "$/batch", min: 0, max: 250000, step: 100, value: 28000 },
  { key: "materialLossFactor", label: "Material loss factor", unit: "%", min: 0, max: 120, step: 1, value: 18 },
  { key: "coldChainMaterialFactor", label: "Cold-chain material", unit: "%", min: 0, max: 80, step: 1, value: 12 },
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
  eq("Convective-dispersive transport", "mass", "dC/dt = D_ax*d2C/dz2 - u*dC/dz + R(C,t)", "Axial distributed balance for concentration fronts, residence-time dispersion, and column/reactor transport."),
  eq("Danckwerts inlet boundary", "mass", "u(C_in - C_0) = D_ax*(dC/dz)|z=0", "Inlet boundary condition for convective-dispersive distributed models."),
  eq("Zero-gradient outlet boundary", "mass", "(dC/dz)|z=L = 0", "Outlet boundary condition for dispersed plug-flow style models."),
  eq("Axial Peclet number", "mass", "Pe = u*L/D_ax", "Dimensionless advection-to-axial-dispersion ratio used to classify transport behavior."),
  eq("PVSD compartment balance", "mass", "d(C_j*V_j)/dt = F_{j-1}C_{j-1} - F_jC_j + D_j(C_{j+1}-2C_j+C_{j-1}) + R_jV_j", "Population/volume subdivision style compartment balance for distributed hold-up and residence behavior."),
  eq("Method-of-lines discretization", "mass", "dC_i/dt = D_ax*(C_{i+1}-2C_i+C_{i-1})/dz2 - u*(C_i-C_{i-1})/dz + R_i", "Finite-volume transformation of a PDE into ODE/DAE equations for dynamic simulation."),
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
  eq("Media cost", "economics", "C_media = V_media * price_media * purchasing_factor * loss_factor", "Cell-culture or fermentation medium cost from annual media volume, media unit price, purchasing power, and material loss."),
  eq("Feed and supplement cost", "economics", "C_feed = V_broth * feed_rate * price_feed * supplement_factor", "Feeds, growth factors, amino acids, cytokines, glucose, antifoam, and other supplements can dominate bioprocess OPEX."),
  eq("Consumables cost", "economics", "C_consumables = V_batch * N_batches * price_single_use + C_filters + C_membranes", "Single-use bags, tubing, sterile connectors, filters, membranes, and assemblies scale with batch volume and unit count."),
  eq("Resin amortization", "economics", "C_resin,yr = V_resin * price_resin * cycles_used / resin_lifetime_cycles", "Chromatography resin annual burden from resin volume, resin price, and reuse lifetime."),
  eq("Material inventory burden", "economics", "C_inventory = C_materials * inventory_days / 365 * carrying_rate", "Inventory, cold-chain, expiry, supplier qualification, and safety stock burden for high-value materials."),
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
  eq("Kinetic productivity", "kinetics", "q_C = (alpha*mu_max*S1*S2*S3 + beta) * X", "Volumetric productivity for kinetic fermentation with up to three multiplicative growth or inhibition terms."),
  eq("Luedeking-Piret product", "kinetics", "q_P = alpha*dX/dt + beta*X", "Growth-associated and non-growth-associated product formation used to represent product rather than biomass formation."),
  eq("Critical osmolarity inhibition", "kinetics", "I_osm = 1 - (OSM / OSM_crit)^n_osm", "Dark-fermentation osmotic inhibition from acetate, lactate, glucose, and other dissolved species."),
  eq("Hydrogen inhibition", "kinetics", "I_H2 = 1 - (H2_aq / H2_aq,crit)^n_H2", "Dissolved hydrogen inhibition term for C. saccharolyticus dark fermentation."),
  eq("DF specific growth", "kinetics", "mu = mu_max * G/(G + K_G) * I_osm * I_H2", "Dark-fermentation growth model combining Monod glucose limitation with osmotic and hydrogen inhibition."),
  eq("Haldane inhibition", "kinetics", "mu = mu_max * S / (K_S + S + S^2/K_I)", "Substrate inhibition model available as an alternative to simple Monod kinetics."),
  eq("First order formation", "kinetics", "r_P = k * C_reference", "Simplified product formation used when full product or by-product inhibition cannot be modeled."),
  eq("Zeroth order formation", "kinetics", "r_P = k", "Constant product formation independent of concentration."),
  eq("CSTR dilution", "mass", "D = F / V", "Continuous stirred-tank dilution rate from volumetric feed and reactor volume."),
  eq("CSTR washout check", "mass", "washout risk if D >= mu", "Continuous fermentation wash-out condition for dilution-rate and growth-rate screening."),
  eq("Tear stream convergence", "mass", "epsilon = abs(F_n - F_(n-1)) / F_n", "Recycle-loop convergence error checked over successive tear-stream iterations."),
  eq("Recycle purge", "mass", "F_purge = F_recycle * (1 - recycle_fraction)", "Purge needed to avoid accumulation in a continuous recycle loop."),
  eq("Regulated dilution stream", "mass", "F_water = F_syrup * (C_syrup/C_target - 1)", "Feedback-regulated water addition to achieve a target substrate concentration."),
  eq("Rotary vacuum split", "separation", "m_filtrate,i = split_i * m_feed,i", "Component split model for a filter when detailed particle properties are not used."),
  eq("Heat exchanger target", "energy", "Q = m_hot*Cp_hot*(T_hot,in - T_hot,out) = m_cold*Cp_cold*(T_cold,out - T_cold,in)", "Countercurrent heat exchange with target outlet temperature or approach temperature."),
  eq("Absorption removal", "separation", "CO2_out = CO2_in * (1 - eta_abs)", "Simplified CO2 absorption removal model for DEA gas upgrading."),
  eq("Solvent regeneration", "energy", "Q_regen = m_solvent * Cp * DeltaT + m_CO2 * DeltaH_des", "Desorption/regeneration duty estimate for a CO2-rich solvent stream."),
  eq("Adjusted absorption cost", "economics", "OC_adjusted = OC_fermentation * (1 + absorption_factor)", "Thesis-style adjustment when absorption cannot be modeled accurately in the simulator."),
  eq("Process throughput scale-up", "economics", "scale_factor = target_MP_rate / current_MP_rate", "Throughput target scaling for flows, equipment capacity, and parallel unit counts."),
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
  eq("Route branch activation", "economics", "active_i(route) = route_i in {common, route}", "Route-specific recipe activation for branch and merge process alternatives."),
  eq("Route predecessor constraint", "economics", "t_start,i >= t_finish,pred + transfer_slack", "Predecessor dependency constraint used by the route topology and finite-capacity scheduler."),
  eq("Route optimization score", "economics", "Score = 0.28*C + 0.18*B + 0.16*W + 0.16*E + 0.14*Q + 0.08*S", "Weighted route recommendation score combining capacity, bottleneck, warnings, economics, quality, and sustainability."),
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
  eq("Discrete-event equipment state", "economics", "state_u(t) in {idle, setup, process, transfer, clean, blocked}", "Finite-capacity production simulation state model for reusable equipment, transfer lines, and shared auxiliary resources."),
  eq("Throughput from event releases", "economics", "throughput = released_good_mass / simulated_calendar_time", "Discrete-event throughput based on actual release events rather than a purely linear annualization."),
  eq("Buffer WIP balance", "mass", "WIP_buffer(t+dt) = WIP_buffer(t) + arrivals - departures - rejects", "Work-in-process accumulation for intermediate tanks, harvest pools, cold storage, and logistics buffers."),
  eq("Machine utilization", "economics", "U_machine = busy_time / scheduled_available_time", "Machine and line utilization for bottleneck detection and capacity planning."),
  eq("Buffer utilization", "economics", "U_buffer = average_inventory / usable_buffer_capacity", "Buffer occupancy metric for hold tanks, storage, incubators, cold rooms, and queue spaces."),
  eq("Finite-capacity load", "economics", "load_resource,h = demand_resource,h / capacity_resource,h", "Advanced planning and scheduling check for machinery, labor, tools, utilities, cleaning skids, and transfer lines."),
  eq("Due-date lateness", "economics", "lateness = max(0, scheduled_release_time - promised_due_time)", "Delivery-performance metric for customer orders, campaigns, and internal material requests."),
  eq("Plan adherence", "economics", "adherence = completed_operations_on_plan / planned_operations", "Real-time planning deviation signal for schedule control and shopfloor follow-up."),
  eq("Inventory reorder point", "economics", "ROP = demand_rate * lead_time + safety_stock", "Raw-material and consumable reorder trigger for media, buffers, filters, resin, single-use assemblies, and cleaning agents."),
  eq("WIP turn", "economics", "WIP_turns = released_good_mass / average_work_in_process", "Inventory-efficiency and lead-time indicator across intermediate pools and production queues."),
  eq("Sequence objective", "economics", "min Z = w1*lateness + w2*changeover + w3*idle_time + w4*WIP + w5*priority_miss", "Detailed sequencing objective for feasible production schedules under changing demand and constraints."),
  eq("Room occupancy", "economics", "U_room = busy_time_room / available_time_room", "Room and suite occupancy for production, support, QC, warehouse, and cleaning areas."),
  eq("Personnel load", "economics", "FTE_required = labor_hours / scheduled_shift_hours", "Operator, QA, QC, maintenance, and material-handler staffing load by planning period."),
  eq("Equipment state transition", "economics", "state_next = transition(state_current, event, resource_available)", "Discrete-event machine state logic for setup, processing, transfer, cleaning, waiting, blocked, and released states."),
  eq("Factory optimization score", "economics", "score = 100 - w1*lateness - w2*overload - w3*WIP - w4*cost - w5*risk", "Factory-level optimization score across capacity, delivery, inventory, staffing, cleaning, and route choices."),
  eq("Sankey flow share", "mass", "share_i = annual_mass_i / sum(annual_mass_relevant)", "Relative material-flow contribution used for Sankey-style process visualization."),
  eq("Genetic optimizer objective", "economics", "min f(x)=w1*COGS+w2*CO2e+w3*cycle_time+w4*risk-w5*yield", "Multi-objective optimization target for route, capacity, resource, and process-parameter screening."),
  eq("Neural surrogate prediction", "kinetics", "y_hat = NN(theta; titer, kLa, media, temperature, pH, feed)", "Machine-learning surrogate placeholder for fast prediction and calibration around mechanistic process models."),
  eq("Always-on twin residual", "mass", "residual = measured_tag_value - model_prediction", "Live digital-twin residual for historian, OPC UA, MQTT, CSV, or API-connected process tags."),
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
  { group: "Fermentation", name: "Kinetic fermentation", status: "Implemented", inputs: "mu max, alpha, beta, biomass, S1/S2/S3 terms", output: "Volumetric productivity", note: "Adds kinetic productivity and Luedeking-Piret product formation." },
  { group: "Fermentation", name: "Dark fermentation inhibition", status: "Implemented", inputs: "Glucose, osmolarity, dissolved H2, critical inhibition terms", output: "DF growth/productivity warning model", note: "Adds osmolarity and hydrogen inhibition from the thesis, plus CSTR washout checking." },
  { group: "Continuous", name: "Feedback regulatory system", status: "Implemented", inputs: "Target concentration, water feed, syrup feed", output: "Adjusted dilution stream", note: "Modeled as the feedback regulator unit and dilution equation for syrup-water concentration control." },
  { group: "Continuous", name: "Recycle loop and tear stream", status: "Implemented", inputs: "Recycle fraction, purge, max iterations, tolerance", output: "Convergence status and tear-stream marker", note: "Includes splitter, tear-stream marker, convergence equation, and purge balance." },
  { group: "Troubleshooting", name: "Breakpoints", status: "Implemented", inputs: "Unit, operation, status, error condition", output: "Pause point for reviewing intermediate conditions", note: "Represented as operational status and function card for debugging unit sequences." },
  { group: "Troubleshooting", name: "Unit-operation equation lookup", status: "Implemented", inputs: "Selected unit or stream", output: "Relevant equation spotlight", note: "The canvas equation spotlight changes with selected equipment or stream and links into the full equation library." },
  { group: "Scale-up", name: "Process throughput target", status: "Implemented", inputs: "Target main-product rate", output: "Scale factor and parallel unit count", note: "Implements the Adjust Process Throughput idea from the PDF and shows parallel unit sizing equations." },
  { group: "Economics", name: "Economic evaluation report", status: "Implemented", inputs: "Capital, operating cost, revenues, waste handling, absorption adjustment", output: "COGS, gross margin, ROI-like indicators", note: "Adds thesis-style operating-cost adjustment, unit production cost, gross margin, and revenue/cost stream classification." },
  { group: "Gas upgrading", name: "Absorption and desorption", status: "Implemented", inputs: "CO2 removal, DEA solvent recycle, regeneration duty", output: "Product gas and solvent loop estimate", note: "Adds absorber/desorber equipment and simplified CO2 absorption/regeneration functions for reactive absorption screening." },
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
  { group: "Reports", name: "Full process-simulation report set", status: "Implemented", inputs: "SR, EER, CFR, ICR, THR, EIR, EMS, EPA, EQR, AUX, IDR, CSR, custom Excel", output: "Report-set checklist and export payload", note: "Adds report coverage including equipment, auxiliary, input data, cash flow, itemized cost, and CIP/SIP reports." },
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
  { group: "Cloud", name: "Browser-first workspace", status: "Implemented", inputs: "Browser session, project workspace, backend token, saved model", output: "No-install process modelling environment", note: "Positions Axion against desktop-only workflows: projects, models, downloads, auth, and collaboration are available from the hosted workspace." },
  { group: "Collaboration", name: "Shared projects and invitations", status: "Implemented", inputs: "Username/email invite, role, project id", output: "Collaborator access record and in-app invite", note: "Supports project-specific collaboration through backend or local invite records." },
  { group: "Collaboration", name: "Git-style model versions", status: "Implemented", inputs: "Saved project state, archived version, active model", output: "Versioned model history", note: "Old model versions are stored in project archives and can be restored for later editing." },
  { group: "Collaboration", name: "Audit and review trail", status: "Implemented", inputs: "Login, checkout, project save, invite, restore", output: "Backend audit events and reviewable project metadata", note: "Provides the foundation for enterprise audit trails, approval states, and model-change review." },
  { group: "API-first", name: "REST API and JSON process model", status: "Implemented", inputs: "Project, model, stream, equipment, report payloads", output: "Portable JSON model and API handoff", note: "Moves the architecture toward REST/JSON instead of desktop COM automation." },
  { group: "API-first", name: "Python SDK and notebooks", status: "Planned connector", inputs: "Token, model id, parameter set, run id", output: "Notebook-driven sweeps, calibration, and report export", note: "The connector registry exposes a Python SDK target for future automation and scientific workflows." },
  { group: "API-first", name: "Webhooks and event model", status: "Planned connector", inputs: "Project events, run events, license events", output: "External system notifications", note: "Prepared for project.created, model.versioned, run.completed, report.ready, invite.created, and license.activated webhooks." },
  { group: "Compute", name: "Cloud batch runs", status: "Planned connector", inputs: "Run queue, scenario set, parameter grid", output: "Scenario-run package", note: "Prepared for running parameter sweeps and Monte Carlo cases without Excel add-ins or desktop scripts." },
  { group: "Uncertainty", name: "Native sensitivity analysis", status: "Implemented", inputs: "Titer, recovery, media cost, utilities, CAPEX exponent, yield", output: "Dominant parameter and scenario-risk guidance", note: "Supports browser-native sensitivity reasoning for LCA/TEA and process-readiness decisions." },
  { group: "Uncertainty", name: "Sobol-style global sensitivity roadmap", status: "Planned connector", inputs: "Parameter distributions, sampled model runs", output: "Global sensitivity ranking", note: "Prepared for rigorous uncertainty analysis and probabilistic model comparison." },
  { group: "Uncertainty", name: "Probabilistic cost ranges", status: "Implemented", inputs: "Material prices, CAPEX exponent, facility burden, uncertainty assumptions", output: "Screening-level cost ranges and driver explanation", note: "Economics now exposes itemized materials and major COGS drivers for scenario-range discussion." },
  { group: "Digital Twin", name: "Dynamic cell growth and metabolite profile", status: "Implemented", inputs: "Batch time, biomass, substrate, DO, lactate, ammonium, heat load", output: "Time-resolved dynamic profile", note: "Provides the first dynamic layer beyond static batch balances." },
  { group: "Digital Twin", name: "Live data and historian mapping", status: "Planned connector", inputs: "OPC UA, PI tags, SCADA tags, batch records", output: "Model variable calibration and live envelope comparison", note: "The connector registry maps DO, pH, temperature, airflow, agitation, feeds, pressure, and batch state to model variables." },
  { group: "Digital Twin", name: "Soft sensors and anomaly checks", status: "Planned connector", inputs: "PAT, Raman, capacitance, process tags, model prediction", output: "Online prediction and deviation warning", note: "Prepared for model-based soft sensors, anomaly detection, and eventually model predictive control." },
  { group: "Vertical models", name: "Cultivated meat template", status: "Implemented", inputs: "Media prep, seed train, perfusion/cell retention, harvest, wash, formulation, packaging", output: "Food-biotech scale-up model", note: "Captures media cost, oxygen transfer, ammonium/lactate, water reuse, wastewater, heat recovery, and food-grade operations." },
  { group: "Vertical models", name: "Precision fermentation and enzymes", status: "Implemented", inputs: "Sterile media, aerobic fermentation, recovery, concentration, drying, utilities", output: "Industrial biotech and ingredient route", note: "Covers fermentation, downstream recovery, utilities, waste, route scheduling, and TEA/LCA outputs." },
  { group: "Vertical models", name: "mAbs, vaccines, viral vectors, CGT", status: "Implemented", inputs: "Seed train, production, capture, viral safety, polishing, UF/DF, fill, QC release", output: "Biopharma platform route", note: "Targets high-demand biopharma platform processes plus advanced therapy variants." },
  { group: "Economics", name: "Vendor quotes and regional cost indices", status: "Planned connector", inputs: "Supplier quote, region, inflation, equipment family, material BOM", output: "Updated CAPEX/OPEX basis", note: "Prepared for ERP/procurement links, regional cost indices, and quote-backed capital and material costs." },
  { group: "Economics", name: "NPV, IRR, payback and break-even roadmap", status: "Planned module", inputs: "Revenue, COGS, CAPEX, depreciation, tax, ramp-up, utilization", output: "Investment-decision model", note: "Pricing research highlights transparent economics as a key differentiator; the current tool exposes COGS drivers and is ready for full cash-flow metrics." },
  { group: "Migration", name: "Representative process reconstruction", status: "Implemented workflow", inputs: "Existing report, stream table, equipment list, assumptions", output: "Editable Axion model for side-by-side review", note: "The recommended migration offer is not to replace everything instantly, but to reconstruct one representative model and compare speed, collaboration, and transparency." },
  { group: "Plant simulation", name: "Object-oriented plant hierarchy", status: "Implemented", inputs: "Factory, area, room, line, machine, stream, buffer objects", output: "Hierarchical production model with reusable object classes", note: "Adds factory-to-machine decomposition, object counts, inheritance-style library records, and instance-level process data." },
  { group: "Plant simulation", name: "3D-style factory layout preview", status: "Implemented", inputs: "Equipment coordinates, process role, stream role, utilization", output: "Downloadable factory-layout SVG and live browser preview", note: "Shows the production plant as zones, vessels, buffers, utilities, cleaning resources, logistics, and animated material-flow routes." },
  { group: "Plant simulation", name: "Material-flow and logistics analysis", status: "Implemented", inputs: "Streams, transfer times, buffer occupancy, release pitch, WIP", output: "Bottleneck, throughput, Sankey, and value-stream indicators", note: "Extends the scheduler with material-flow analysis from raw materials through production, cleaning, waste, storage, and release." },
  { group: "Plant simulation", name: "Experiment manager and optimizer", status: "Implemented", inputs: "Route, batch pitch, parallel units, cleaning, media price, heat recovery, automation", output: "Scenario ranking with genetic-optimizer and neural-surrogate placeholders", note: "Adds browser-native experiment rows, constraints, objective scores, and ready-to-export optimization assumptions." },
  { group: "Plant simulation", name: "Open integration matrix", status: "Implemented", inputs: "JSON, CSV, MQTT, OPC UA, ODBC, SQL, sockets, XML, CAD/JT, automation links", output: "Connector readiness and project-integration report", note: "Makes the integration registry concrete and downloadable for engineering review." },
  { group: "Plant simulation", name: "Value-stream mapping", status: "Implemented", inputs: "Process, transfer, cleaning, wait, release, storage, waste", output: "Value-added and non-value-added time split", note: "Adds a VSM-style view to compare process time, transfer time, cleaning time, waiting time, and QC release time." },
  { group: "APS", name: "Strategic, tactical, and detailed planning", status: "Implemented", inputs: "Demand, annual target, routes, finite schedule, resource limits", output: "Planning horizon workbook and plan-adherence KPIs", note: "Adds a planning layer from long-range capacity decisions through weekly campaign planning down to shift-level sequencing." },
  { group: "APS", name: "Delivery, inventory, and replanning control", status: "Implemented", inputs: "Due dates, release events, material costs, lead times, WIP, deviations", output: "Delivery-risk, inventory-risk, and replanning workbooks", note: "Turns scheduling into an operational planning cockpit with on-time delivery, stock coverage, finite-capacity deviations, and corrective actions." },
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
    { name: "Browser-first workspace", status: "Core architecture", detail: "No desktop installation, no license-server thinking, and no local-only model file as the primary workflow.", action: "Open projects", view: "projects" },
    { name: "REST API + Python SDK", status: "API-first layer", detail: "JSON model handoff, REST endpoints, Python automation, webhooks, cloud runs, parameter sweeps, and Monte Carlo scenario packages.", action: "Open projects", view: "projects" },
    { name: "Live data connectors", status: "Connector map", detail: "SCADA, OSIsoft PI, Historian, OPC UA, CSV uploads, sensor streams, and batch records.", action: "Open streams", view: "streams" },
    { name: "Dynamic digital twin", status: "Model layer", detail: "Time-dependent cell growth, metabolites, oxygen, heat, calibration against experiment data, soft sensors, anomaly detection, and online prediction roadmap.", action: "Open simulation", view: "simulation" },
    { name: "Uncertainty engine", status: "Decision layer", detail: "Native sensitivity analysis, probabilistic cost ranges, Sobol-style ranking roadmap, parameter fitting, and scenario comparison in the browser.", action: "Open economics", view: "economics" },
    { name: "Literature layer", status: "Tool module", detail: "Recommended papers, typical OUR, typical kLa, best practices, and source-backed unit assumptions.", action: "Open sources", view: "sources" },
    { name: "SOP and knowledge base", status: "Tool module", detail: "Attach SOPs, deviations, assumptions, validation notes, and experiment learnings to units and streams.", action: "Open recommendations", view: "recommendations" },
    { name: "AI Engineer", status: "Tool module", detail: "Natural-language prompts propose process variants such as media-cost reduction, oxygen-transfer fixes, or yield improvements.", action: "Ask help", view: "ai" },
    { name: "Equipment cost model", status: "Tool module", detail: "Equipment sizing, purchase curves, region, inflation, uncertainty, and validation burden as editable cost inputs.", action: "Open economics", view: "economics" },
    { name: "Vertical industry templates", status: "Template layer", detail: "Cultivated meat, precision fermentation, mAbs, cell and gene therapy, viral vectors, enzymes, alternative proteins, media prep, utilities, and wastewater.", action: "Open start", view: "start" },
    { name: "Sustainability model", status: "Tool module", detail: "CO2, energy, water, waste, solvent recovery, heat reuse, and LCA-style indicators integrated with process flows.", action: "Open boundaries", view: "ai" },
  ],
  aiPrompts: [
    "How can I reduce media cost by 20% without lowering viable cell density?",
    "Find the highest-risk scale-up boundary in this bioreactor train.",
    "Create a lower-water-use version with CIP rinse recovery and heat reuse.",
    "Compare a stainless-steel 20,000 L train against parallel single-use 2,000 L trains.",
    "Run a scenario comparison for titer, recovery, resin lifetime, media price, and plant utilization.",
    "Prepare a legacy-simulator migration checklist for this process and highlight missing validation data.",
  ],
};

const routeOptions = [
  { key: "primary", label: "Primary route", detail: "Default GMP process train with full downstream and release flow." },
  { key: "intensified", label: "Intensified route", detail: "Scale-out/perfusion-style route with higher parallel capacity and shorter bottleneck residence." },
  { key: "lean", label: "Lean route", detail: "Reduced train for screening, early development, or simplified recovery assumptions." },
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
  paletteGroup: "core",
  paletteSearch: "",
  parameterSearch: "",
  canvasFocus: "all",
  flowDetail: "detailed",
  productBrief: "",
  productFiles: [],
  inferredTemplate: "culturedMeat",
  activeRoute: "primary",
  recipeOverrides: {},
  account: null,
  productConfig: null,
  currentProjectId: null,
  projectName: "Untitled Axion model",
  projects: [],
  projectVersions: [],
  projectInvites: [],
  integrations: [],
  selectedIntegration: "",
  connectorResults: {},
  projectFolders: {},
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
  projectsBoard: document.querySelector("#projectsBoard"),
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
  detailDrawer: document.querySelector("#detailDrawer"),
  helpDock: document.querySelector("#helpDock"),
  helpToggle: document.querySelector("#helpToggle"),
  helpClose: document.querySelector("#helpClose"),
  helpPrompt: document.querySelector("#helpPrompt"),
  askHelp: document.querySelector("#askHelp"),
  helpResult: document.querySelector("#helpResult"),
  loginForm: document.querySelector("#loginForm"),
  checkoutForm: document.querySelector("#checkoutForm"),
  checkoutName: document.querySelector("#checkoutName"),
  checkoutEmail: document.querySelector("#checkoutEmail"),
  checkoutCompany: document.querySelector("#checkoutCompany"),
  checkoutResult: document.querySelector("#checkoutResult"),
  loginUser: document.querySelector("#loginUser"),
  loginPassword: document.querySelector("#loginPassword"),
  loginError: document.querySelector("#loginError"),
  loginOrigin: document.querySelector("#loginOrigin"),
  googleLoginBox: document.querySelector("#googleLoginBox"),
  googleLoginFallback: document.querySelector("#googleLoginFallback"),
  googleButtonMount: document.querySelector("#googleButtonMount"),
  googleLoginStatus: document.querySelector("#googleLoginStatus"),
  loginGate: document.querySelector("#loginGate"),
  profileButton: document.querySelector("#profileButton"),
  profilePanel: document.querySelector("#profilePanel"),
  profileInitials: document.querySelector("#profileInitials"),
  profileName: document.querySelector("#profileName"),
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
    { label: "Utilities", value: utilities, color: "#51606f" },
    { label: "Consumables", value: consumables, color: "#4d8d45" },
    { label: "Depreciation", value: depreciation, color: "#315f68" },
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

function templateMaterialProfile() {
  const key = state.template;
  if (key === "culturedMeat") return { media: 1.25, feed: 0.42, buffer: 0.7, resin: 0.05, singleUse: 1.25, gas: 1.2, qc: 0.9, note: "Cultured meat media and growth supplements dominate screening OPEX." };
  if (key === "antibody") return { media: 1.05, feed: 0.34, buffer: 3.8, resin: 1.8, singleUse: 1.05, gas: 1.05, qc: 1.35, note: "mAb economics are strongly driven by cell-culture media, feeds, buffers, Protein A resin, filters, and QC release consumables." };
  if (key === "penicillin") return { media: 0.46, feed: 0.18, buffer: 1.1, resin: 0.08, singleUse: 0.22, gas: 1.45, qc: 0.65, note: "Fermentation economics are driven by substrate, aeration, extraction chemicals, solvents, waste, and downstream recovery losses." };
  if (key === "industrialFermentation") return { media: 0.42, feed: 0.14, buffer: 0.8, resin: 0.05, singleUse: 0.18, gas: 1.35, qc: 0.5, note: "Bulk fermentation has lower media unit prices but high throughput, utilities, and waste loads." };
  if (key === "cellTherapy") return { media: 1.45, feed: 0.55, buffer: 2.6, resin: 0.2, singleUse: 3.8, gas: 0.9, qc: 4.5, note: "Cell therapy material cost is dominated by closed kits, cytokines, viral/vector-related consumables, QC, and release testing." };
  return { media: 0.82, feed: 0.24, buffer: 1.6, resin: 0.45, singleUse: 0.72, gas: 1, qc: 1, note: "Material profile is a screening default; replace with a process-specific bill of materials." };
}

function materialCostBreakdown(data, profile, learningCredit) {
  const p = state.params;
  const materialProfile = templateMaterialProfile();
  const batchVolumeL = Math.max(1, state.batchSize);
  const batches = Math.max(1, state.batchCount);
  const annualBrothL = batchVolumeL * batches;
  const productKg = Math.max(0.001, data.annualKg);
  const bioreactors = state.units.filter((item) => item.cls === "Bioreactor").length || 1;
  const chromatographyUnits = state.units.filter((item) => ["Purification", "Viral safety"].includes(item.cls)).length;
  const filtrationUnits = state.units.filter((item) => ["Filtration", "Concentration", "Solid-liquid"].includes(item.cls)).length;
  const cleaningUnits = state.units.filter((item) => ["Sterilization", "Utilities"].includes(item.cls)).length;
  const lossFactor = 1 + (p.materialLossFactor || 0) / 100 + (1 - data.processYield) * 0.65;
  const coldChainFactor = 1 + (p.coldChainMaterialFactor || 0) / 100;
  const purchasing = profile.purchasingPower * learningCredit;
  const mediaVolumeL = annualBrothL * materialProfile.media * (1 + (p.perfusionRate || 0) * 0.16);
  const feedVolumeL = annualBrothL * ((p.feedRate || 0) / 100) * materialProfile.feed;
  const bufferVolumeL = annualBrothL * materialProfile.buffer * (1 + chromatographyUnits * 0.28 + filtrationUnits * 0.08);
  const wfiCleaningL = annualBrothL * (0.85 + cleaningUnits * 0.18 + filtrationUnits * 0.06);
  const mediaCost = mediaVolumeL * (p.mediaCostPerL || 42) * purchasing * lossFactor * coldChainFactor;
  const feedCost = feedVolumeL * (p.feedSupplementCostPerL || 160) * purchasing * lossFactor * coldChainFactor;
  const bufferCost = bufferVolumeL * (p.bufferCostPerL || 3.2) * purchasing * (1 + (p.materialLossFactor || 0) / 220);
  const resinLiters = Math.max(0, chromatographyUnits) * Math.max(1, batchVolumeL * Math.max(0.02, state.titer / 1800) * materialProfile.resin);
  const resinCyclesPerYear = Math.max(1, Math.min(120, batches / Math.max(1, chromatographyUnits || 1)));
  const resinCost = resinLiters * (p.resinCostPerL || 9500) * Math.max(0.18, Math.min(1, resinCyclesPerYear / 60)) * purchasing;
  const singleUseCost = annualBrothL * (p.singleUseCostPerL || 7.5) * materialProfile.singleUse * (1 + filtrationUnits * 0.12) * purchasing * lossFactor;
  const wfiCipChemicals = wfiCleaningL * (0.32 + (p.bufferCostPerL || 3.2) * 0.18) * (1 + cleaningUnits * 0.06) * purchasing;
  const gasAndAdditives = annualBrothL * (0.55 + (p.aeration || 0.35) * 2.8 + (p.agitation || 0.9) * 0.12) * materialProfile.gas * purchasing;
  const qcConsumables = batches * (p.qcConsumableCost || 28000) * materialProfile.qc * profile.qaMultiplier;
  const inventoryAndColdChain = (mediaCost + feedCost + bufferCost + resinCost + singleUseCost) * ((p.materialInventoryDays || 0) / 365 * 0.18 + (p.coldChainMaterialFactor || 0) / 100 * 0.08);
  const yieldLossProxyUsdPerKg = 180 + (p.mediaCostPerL || 42) * materialProfile.media * 4 + (p.feedSupplementCostPerL || 160) * materialProfile.feed * 0.8;
  const wasteLinkedMaterials = productKg * yieldLossProxyUsdPerKg * Math.max(0, 1 - data.processYield) * 0.18;
  const rows = [
    { item: "Cell-culture media / fermentation medium", value: mediaCost, unit: "USD/yr", note: `${formatNumber(mediaVolumeL, 0)} L/yr media basis`, category: "Materials", costType: "media and basal medium", allocationBasis: "annual broth volume x media price" },
    { item: "Feeds and supplements", value: feedCost, unit: "USD/yr", note: `${formatNumber(feedVolumeL, 0)} L/yr feed/supplement basis`, category: "Materials", costType: "feeds and supplements", allocationBasis: "feed rate x annual broth volume" },
    { item: "Buffers, salts, acids and bases", value: bufferCost, unit: "USD/yr", note: `${formatNumber(bufferVolumeL, 0)} L/yr buffer basis`, category: "Materials", costType: "buffers and chemicals", allocationBasis: "downstream and cleaning buffer demand" },
    { item: "Chromatography resin amortization", value: resinCost, unit: "USD/yr", note: `${formatNumber(resinLiters, 1)} L resin screening basis`, category: "Materials", costType: "resin amortization", allocationBasis: "chromatography units, titer, resin price and cycles" },
    { item: "Single-use, filters and membranes", value: singleUseCost, unit: "USD/yr", note: "Bags, assemblies, filters, membranes, tubing and sterile connectors", category: "Materials", costType: "single-use consumables", allocationBasis: "batch volume, filtration count and loss factor" },
    { item: "WFI, CIP/SIP chemicals and cleaning consumables", value: wfiCipChemicals, unit: "USD/yr", note: `${formatNumber(wfiCleaningL, 0)} L/yr WFI/cleaning basis`, category: "Materials", costType: "cleaning materials", allocationBasis: "cleaning and utility equipment count" },
    { item: "Gases, antifoam and process additives", value: gasAndAdditives, unit: "USD/yr", note: "O2/air/CO2, antifoam and small additives", category: "Materials", costType: "gases and additives", allocationBasis: "aeration, agitation and annual broth volume" },
    { item: "QC/release consumables", value: qcConsumables, unit: "USD/yr", note: "Release assays, sterility, potency, identity and consumable kits", category: "Materials", costType: "QC consumables", allocationBasis: "batches, QC burden and process profile" },
    { item: "Material inventory, cold-chain and expiry burden", value: inventoryAndColdChain, unit: "USD/yr", note: "Inventory holding, cold storage, expiry and supplier qualification burden", category: "Materials", costType: "inventory burden", allocationBasis: "material inventory days and cold-chain factor" },
    { item: "Yield-loss replacement materials", value: wasteLinkedMaterials, unit: "USD/yr", note: "Extra material burden associated with non-ideal process yield", category: "Materials", costType: "yield-loss materials", allocationBasis: "process yield and annual product" },
  ];
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  return { rows, total, materialProfile };
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
  const materialBreakdown = materialCostBreakdown(data, profile, learningCredit);
  const materialIntensity = materialBreakdown.total;
  const laborCost = (520000 + state.units.length * 42000) * profile.laborMultiplier * automationCredit / Math.sqrt(Math.max(0.35, campaignRatio));
  const qaCost = (380000 + state.units.length * 26000) * profile.qaMultiplier * (1 + p.validationFactor / 100);
  const utilityCost = data.utilities * 145 * (0.92 + profile.fixedBurden * 0.03);
  const wasteCost = state.units.filter((item) => ["Environmental", "Air pollution", "Utilities"].includes(item.cls)).length * 22000 + (1 - data.processYield) * 480000;
  const annualCost = annualizedCapital + fixedBurden + materialIntensity + laborCost + qaCost + utilityCost + wasteCost;
  const kg = Math.max(0.001, data.annualKg);
  const directCost = annualCost / kg;
  const scaleEfficiency = Math.max(0.08, Math.min(1, 1 / profile.fixedBurden));

  return { profile, installedCapital, annualizedCapital, fixedBurden, materialIntensity, materialBreakdown, laborCost, qaCost, utilityCost, wasteCost, annualCost, directCost, parallelUnits, scaleEfficiency };
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
  return isMinorUnit(item) ? 172 : 286;
}

function unitHeight(item) {
  return isMinorUnit(item) ? 78 : 118;
}

function unitMidline(item) {
  return item.y + (isMinorUnit(item) ? 36 : 56);
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
  if (!template) return;
  state.template = key;
  state.inferredTemplate = key;
  state.units = clone(template.units);
  state.streams = clone(template.streams);
  state.costs = clone(template.costs);
  state.selectedId = state.units[0]?.id || null;
  state.connectFrom = null;
  state.nextUnit = 900;
  state.nextStream = 900;
  state.activeRoute = "primary";
  state.recipeOverrides = {};

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

function currentModelSummary() {
  const data = metrics();
  const schedule = campaignSchedule();
  return {
    template: state.template,
    templateLabel: activeTemplate().label,
    scale: state.scale,
    batchSize: state.batchSize,
    batchCount: state.batchCount,
    titer: state.titer,
    recovery: state.recovery,
    units: state.units.length,
    streams: state.streams.length,
    annualKg: data.annualKg,
    directCost: data.directCost,
    feasibleAnnualBatches: schedule.feasibleAnnualBatches,
    activeRoute: state.activeRoute,
  };
}

function exportCurrentModelState() {
  return {
    appVersion: "route-optimizer-v1",
    projectName: state.projectName,
    template: state.template,
    scale: state.scale,
    selectedId: state.selectedId,
    zoom: state.zoom,
    nextUnit: state.nextUnit,
    nextStream: state.nextStream,
    batchSize: state.batchSize,
    batchCount: state.batchCount,
    titer: state.titer,
    recovery: state.recovery,
    params: clone(state.params),
    units: clone(state.units),
    streams: clone(state.streams),
    costs: clone(state.costs),
    paletteGroup: state.paletteGroup,
    paletteSearch: state.paletteSearch,
    parameterSearch: state.parameterSearch,
    canvasFocus: state.canvasFocus,
    flowDetail: state.flowDetail,
    productBrief: state.productBrief,
    productFiles: clone(state.productFiles),
    inferredTemplate: state.inferredTemplate,
    activeRoute: state.activeRoute,
    recipeOverrides: clone(state.recipeOverrides),
  };
}

function importModelState(modelState = {}) {
  const template = templates[modelState.template] ? modelState.template : state.template;
  state.template = template;
  state.scale = scalePresets[modelState.scale] ? modelState.scale : state.scale;
  state.projectName = String(modelState.projectName || state.projectName || activeTemplate().label);
  state.units = Array.isArray(modelState.units) ? clone(modelState.units) : clone(templates[template].units);
  state.streams = Array.isArray(modelState.streams) ? clone(modelState.streams) : clone(templates[template].streams);
  state.costs = Array.isArray(modelState.costs) ? clone(modelState.costs) : clone(templates[template].costs);
  state.selectedId = modelState.selectedId || state.units[0]?.id || null;
  state.zoom = Math.max(0.72, Math.min(1.35, Number(modelState.zoom) || state.zoom));
  state.nextUnit = Number(modelState.nextUnit) || 900;
  state.nextStream = Number(modelState.nextStream) || 900;
  state.batchSize = Number(modelState.batchSize) || state.batchSize;
  state.batchCount = Number(modelState.batchCount) || state.batchCount;
  state.titer = Number(modelState.titer) || state.titer;
  state.recovery = Number(modelState.recovery) || state.recovery;
  state.params = { ...Object.fromEntries(processParameters.map((item) => [item.key, item.value])), ...(modelState.params || {}) };
  state.paletteGroup = modelState.paletteGroup || state.paletteGroup;
  state.paletteSearch = modelState.paletteSearch || "";
  state.parameterSearch = modelState.parameterSearch || "";
  state.canvasFocus = modelState.canvasFocus || "all";
  state.flowDetail = modelState.flowDetail || "detailed";
  state.productBrief = modelState.productBrief || "";
  state.productFiles = Array.isArray(modelState.productFiles) ? clone(modelState.productFiles) : [];
  state.inferredTemplate = modelState.inferredTemplate || template;
  state.activeRoute = modelState.activeRoute || "primary";
  state.recipeOverrides = modelState.recipeOverrides || {};
  syncInputs();
  renderAll();
  window.requestAnimationFrame(() => fitCanvas(true));
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
  const effectiveAot = Math.max(24, (p.annualOperatingTime || 7920) * (p.equipmentUptime || 92) / 100);
  const availabilityFactor = Math.max(0.45, Math.min(0.86, (1 - (p.resourceSlack || 12) / 100) * 0.9));
  const cycleDuration = batchDuration + (p.setupTime || 0) + (p.turnaroundTime || 0);
  const rawUtilization = state.batchCount * cycleDuration / Math.max(1, effectiveAot) * 100;
  const targetUtilization = Math.max(58, Math.min(82, (p.bottleneckUtil || 82) - (p.resourceSlack || 12) * 0.35));
  const impliedParallelTrains = Math.max(1, Math.ceil(rawUtilization / Math.max(35, targetUtilization)));
  const utilization = Math.min(targetUtilization, rawUtilization / impliedParallelTrains * availabilityFactor + targetUtilization * (1 - availabilityFactor));
  const utilities = (state.units.reduce((sum, item) => sum + item.powerFactor, 0) + p.agitation * reactorCount + p.aeration * 8 + p.kla * 0.04) * batchDuration * state.batchCount / 1000;
  const productPerBatchKg = state.batchSize * effectiveTiter * processYield / 1000;
  const preliminary = { annualKg, batchDuration, utilization, utilities, productPerBatchKg, processYield, effectiveTiter };
  const scale = scaleEconomics(preliminary);
  const directCost = scale.directCost;

  return { annualKg, batchDuration, utilization, rawUtilization, impliedParallelTrains, directCost, utilities, productPerBatchKg, processYield, effectiveTiter, scale };
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

function dynamicBatchProfile() {
  const data = metrics();
  const solved = solveMassBalance();
  const p = state.params;
  const duration = Math.max(24, data.batchDuration + (p.setupTime || 0) + (p.turnaroundTime || 0));
  const points = 49;
  const productionStart = duration * 0.22;
  const productionEnd = duration * 0.72;
  const downstreamEnd = duration * 0.9;
  const productTarget = Math.max(0.001, data.productPerBatchKg);
  const biomassTarget = Math.max(0.1, state.batchSize * (p.cellDensity || 18) * 0.000004 * (p.viability || 90) / 100);
  const feedBoost = Math.max(0, (p.feedRate || 0) / 100);
  const baseSubstrate = Math.max(0.2, p.glucose || 4);
  const maxHeatKw = Math.max(1, solved.totals.netHeatDuty / duration);
  const rows = Array.from({ length: points }, (_, index) => {
    const timeH = duration * index / (points - 1);
    const progress = Math.max(0, Math.min(1, (timeH - productionStart) / Math.max(1, productionEnd - productionStart)));
    const productionCurve = 1 / (1 + Math.exp(-10 * (progress - 0.52)));
    const normalizedProduct = progress <= 0 ? 0 : Math.min(1, productionCurve);
    const downstreamProgress = Math.max(0, Math.min(1, (timeH - productionEnd) / Math.max(1, downstreamEnd - productionEnd)));
    const finalRecovery = (state.recovery || 75) / 100;
    const recoveredFraction = timeH <= productionEnd ? normalizedProduct * 0.35 : 0.35 + downstreamProgress * (finalRecovery - 0.35);
    const cellGrowth = Math.min(1, Math.max(0, (1 / (1 + Math.exp(-9 * (progress - 0.35))))));
    const decay = timeH > productionEnd ? Math.min(0.28, (timeH - productionEnd) / duration * 0.55) : 0;
    const viableDensity = Math.max(0, (p.cellDensity || 18) * cellGrowth * (p.viability || 90) / 100 * (1 - decay));
    const substrate = Math.max(0.05, baseSubstrate * (1 - 0.82 * normalizedProduct) + feedBoost * baseSubstrate * Math.max(0, Math.sin(progress * Math.PI)) * 0.5);
    const doValue = Math.max(5, Math.min(95, (p.doSetpoint || 40) - normalizedProduct * Math.max(4, (p.our || 4.5) * 2.4) + (p.kla || 65) * 0.035));
    const lactate = Math.max(0, (p.lactate || 2) * normalizedProduct * (1.08 - (p.perfusionRate || 0) * 0.04));
    const ammonia = Math.max(0, (p.ammonia || 2) * normalizedProduct * (1.05 + (p.glutamine || 3) * 0.035 - (p.perfusionRate || 0) * 0.05));
    const heatShape = Math.max(0.12, Math.sin(Math.PI * Math.min(1, Math.max(0, (timeH - productionStart * 0.5) / Math.max(1, productionEnd - productionStart * 0.5)))));
    const heatKw = maxHeatKw * (0.35 + heatShape * 1.15 + normalizedProduct * 0.25);
    const cumulativeEnergyKwh = Math.min(solved.totals.netHeatDuty, solved.totals.netHeatDuty * (timeH / duration) * (0.72 + normalizedProduct * 0.28));
    const phase = timeH < productionStart
      ? "setup_seed_train"
      : timeH < productionEnd
        ? "production"
        : timeH < downstreamEnd
          ? "downstream_recovery"
          : "cleaning_turnaround";
    return {
      timeH,
      phase,
      volumeL: state.batchSize * (0.72 + Math.min(0.28, feedBoost * progress)),
      viableDensityMCellsMl: viableDensity,
      substrateGL: substrate,
      productKg: productTarget * normalizedProduct,
      recoveredProductKg: productTarget * Math.max(0, Math.min(finalRecovery, recoveredFraction)),
      biomassKg: biomassTarget * cellGrowth * (1 - decay),
      dissolvedOxygenPct: doValue,
      lactateGL: lactate,
      ammoniaMm: ammonia,
      heatLoadKw: heatKw,
      cumulativeEnergyKwh,
      recoveryPct: Math.max(0, Math.min(100, recoveredFraction * 100)),
    };
  });
  const warnings = [
    rows.some((row) => row.dissolvedOxygenPct < 20) ? "DO falls below 20% during the simulated production window." : "",
    rows.some((row) => row.ammoniaMm > (isCellCultureTemplate() ? 6 : 10)) ? "Ammonium crosses the conservative hard-review boundary." : "",
    rows.some((row) => row.lactateGL > 4) ? "Lactate crosses the conservative cell-culture review boundary." : "",
  ].filter(Boolean);
  return {
    basis: "time-resolved batch profile v1",
    durationH: duration,
    points: rows,
    warnings,
    peakHeatKw: Math.max(...rows.map((row) => row.heatLoadKw)),
    minDoPct: Math.min(...rows.map((row) => row.dissolvedOxygenPct)),
    maxAmmoniaMm: Math.max(...rows.map((row) => row.ammoniaMm)),
    finalRecoveredKg: rows.at(-1)?.recoveredProductKg || 0,
  };
}

function dynamicProfileRows() {
  return dynamicBatchProfile().points.map((row) => ({
    timeH: row.timeH,
    phase: row.phase,
    volumeL: row.volumeL,
    viableDensityMCellsMl: row.viableDensityMCellsMl,
    substrateGL: row.substrateGL,
    productKg: row.productKg,
    recoveredProductKg: row.recoveredProductKg,
    biomassKg: row.biomassKg,
    dissolvedOxygenPct: row.dissolvedOxygenPct,
    lactateGL: row.lactateGL,
    ammoniaMm: row.ammoniaMm,
    heatLoadKw: row.heatLoadKw,
    cumulativeEnergyKwh: row.cumulativeEnergyKwh,
    recoveryPct: row.recoveryPct,
  }));
}

function modelStatusLabel(severity) {
  return {
    ok: "Inside screening range",
    caution: "Review recommended",
    critical: "Hard review",
  }[severity] || "Review recommended";
}

function modelConfidence(severity, base = 72) {
  const adjustment = severity === "critical" ? -24 : severity === "caution" ? -12 : 8;
  return Math.max(35, Math.min(92, base + adjustment));
}

function unitMechanisticModels() {
  const p = state.params;
  const data = metrics();
  const solved = solveMassBalance();
  const dynamic = dynamicBatchProfile();
  const productKgBatch = Math.max(0.001, data.productPerBatchKg);

  return state.units.map((unitItem) => {
    const solvedUnit = solved.unitMap[unitItem.id] || {};
    const text = `${unitItem.type} ${unitItem.name} ${unitItem.cls}`.toLowerCase();
    const layer = unitLayer(unitItem);
    const unitVolumeL = Math.max(1, estimatedBioreactorVolumeL(unitItem) || unitItem.size || state.batchSize * 0.1);
    const incomingMass = Math.max(0.001, solvedUnit.massIn || unitVolumeL * (p.density || 1000) / 1000);
    let model = {
      tag: unitItem.id,
      operation: unitItem.name,
      class: unitItem.cls,
      modelType: "Generic dynamic hold-up",
      status: "Inside screening range",
      severity: "ok",
      confidence: 68,
      keyMetric: "Residence time",
      metricValue: unitItem.residence || 1,
      metricUnit: "h",
      equation: "dM/dt = min - mout + rV",
      inputs: `Mass in ${formatNumber(incomingMass, 1)} kg/batch; residence ${formatNumber(unitItem.residence || 1, 2)} h`,
      outputs: `Heat ${formatNumber(solvedUnit.heatDuty || 0, 1)} kWh/batch; closure ${formatNumber(solvedUnit.closurePct || 100, 2)}%`,
      warnings: "",
      recommendation: "Use this as a unit hold-up and pass-through screening model until a class-specific validated model is added.",
    };

    if (unitItem.cls === "Bioreactor" || text.includes("fermenter") || text.includes("reactor")) {
      const substrate = Math.max(0.01, p.glucose || 4);
      const oxygenFactor = Math.max(0.05, (p.doSetpoint || 40) / 100);
      const muEff = (p.specificGrowth || 0.05) * substrate / (0.45 + substrate) * oxygenFactor / (0.18 + oxygenFactor);
      const transferIndex = ((p.kla || 65) * Math.max(1, p.doSetpoint || 40) / 100) / Math.max(0.1, p.our || 4.5);
      const stress = Math.max(0, 1 - transferIndex / 1.6) + Math.max(0, dynamic.maxAmmoniaMm - (isCellCultureTemplate() ? 2 : 6)) * 0.08 + Math.max(0, 20 - dynamic.minDoPct) * 0.04;
      const severity = transferIndex < 1 ? "critical" : transferIndex < 1.6 || stress > 0.65 ? "caution" : "ok";
      model = {
        ...model,
        modelType: "Bioreactor kinetic + oxygen-transfer screen",
        status: modelStatusLabel(severity),
        severity,
        confidence: modelConfidence(severity, 76),
        keyMetric: "O2 transfer margin",
        metricValue: transferIndex,
        metricUnit: "index",
        equation: "mu = mumax*S/(Ks+S)*DO/(Kdo+DO); OTR = kLa*(Cstar - CL); dP/dt = alpha*dX/dt + beta*X",
        inputs: `V ${formatNumber(unitVolumeL, 0)} L; kLa ${formatNumber(p.kla, 0)} 1/h; OUR ${formatNumber(p.our, 1)} mmol/L/h; glucose ${formatNumber(substrate, 1)} g/L`,
        outputs: `mu_eff ${formatNumber(muEff, 3)} 1/h; min DO ${formatNumber(dynamic.minDoPct, 1)}%; max NH4 ${formatNumber(dynamic.maxAmmoniaMm, 1)} mM`,
        warnings: severity === "ok" ? "" : "Oxygen transfer, ammonium, or DO approaches the conservative mechanistic boundary.",
        recommendation: severity === "ok" ? "Proceed to scale-down validation and controller tuning." : "Review sparging, oxygen enrichment, impeller power, feed strategy, perfusion/bleed, and reactor scale-out before treating this as feasible.",
      };
    } else if (["Filtration", "Solid-liquid", "Concentration", "Viral safety"].includes(unitItem.cls) || text.includes("filter") || text.includes("ufdf")) {
      const flux = Math.max(5, p.sterileFilterFlux || 180);
      const viscosityPenalty = Math.max(0.35, 1 / Math.max(0.4, p.viscosity || 1.2));
      const foulingIndex = Math.max(0.2, incomingMass / Math.max(100, state.batchSize / 8) * (1 + (p.cellDensity || 18) / 120));
      const effectiveFlux = flux * viscosityPenalty / (1 + foulingIndex * 0.18);
      const areaM2 = incomingMass / Math.max(1, effectiveFlux * Math.max(0.5, unitItem.residence || 1));
      const severity = effectiveFlux < 45 ? "critical" : effectiveFlux < 90 || areaM2 > 80 ? "caution" : "ok";
      model = {
        ...model,
        modelType: "Flux, fouling, and area sizing screen",
        status: modelStatusLabel(severity),
        severity,
        confidence: modelConfidence(severity, 73),
        keyMetric: "Effective flux",
        metricValue: effectiveFlux,
        metricUnit: "LMH",
        equation: "J = dV/(A*dt) = DeltaP/(mu*(Rm + Rc + Rf)); A = V/(J*t)",
        inputs: `Feed ${formatNumber(incomingMass, 1)} kg/batch; clean flux ${formatNumber(flux, 0)} LMH; viscosity ${formatNumber(p.viscosity || 1.2, 2)} cP`,
        outputs: `Area screen ${formatNumber(areaM2, 1)} m2; fouling index ${formatNumber(foulingIndex, 2)}; yield ${(unitItem.cls === "Concentration" ? p.ufdfYield : p.clarificationYield) || p.harvestRecovery}%`,
        warnings: severity === "ok" ? "" : "Flux or membrane area is outside the preferred screening band.",
        recommendation: severity === "ok" ? "Use vendor capsules/cassettes to refine area and hold-up." : "Add parallel modules, reduce solids loading, split harvest, include prefilter depth, and validate fouling curves with vendor data.",
      };
    } else if (["Purification", "Recovery", "Separation"].includes(unitItem.cls) || text.includes("chrom") || text.includes("protein-a") || text.includes("column")) {
      const dbc = Math.max(5, p.resinCapacity || 35);
      const feedConcentration = Math.max(0.05, state.titer * (p.harvestRecovery || 88) / 100);
      const loadL = productKgBatch * 1000 / feedConcentration;
      const resinL = Math.max(0.1, productKgBatch * 1000 / dbc);
      const cycles = Math.max(1, Math.ceil(loadL / Math.max(1, resinL * 8)));
      const yieldPct = unitItem.cls === "Recovery" ? p.harvestRecovery : p.chromYield;
      const severity = cycles > 8 || yieldPct < 70 ? "critical" : cycles > 4 || yieldPct < 82 ? "caution" : "ok";
      model = {
        ...model,
        modelType: "Chromatography / partition screen",
        status: modelStatusLabel(severity),
        severity,
        confidence: modelConfidence(severity, 70),
        keyMetric: "Cycles",
        metricValue: cycles,
        metricUnit: "per batch",
        equation: "Vload = DBC*Vresin/Cfeed; recovery = product_pool/product_feed; K = xi_extract/xi_raffinate",
        inputs: `Product ${formatMass(productKgBatch)} per batch; DBC ${formatNumber(dbc, 1)} g/L; feed ${formatNumber(feedConcentration, 2)} g/L`,
        outputs: `Resin screen ${formatNumber(resinL, 1)} L; ${cycles} cycles; yield ${formatNumber(yieldPct, 0)}%`,
        warnings: severity === "ok" ? "" : "Binding capacity, cycle count, or step yield is not in a comfortable screening range.",
        recommendation: severity === "ok" ? "Proceed to breakthrough, wash, elution, and pool-volume calibration." : "Increase column volume, use parallel skids, reduce load, improve capture yield, or test alternative resin/partition conditions.",
      };
    } else if (unitItem.cls === "Thermal" || unitItem.cls === "Sterilization" || text.includes("heat") || text.includes("sip") || text.includes("autoclave")) {
      const deltaT = Math.max(0, (solvedUnit.targetTemperature || p.temperature || 25) - 20);
      const heatKwh = Math.max(0, solvedUnit.grossHeatDuty || solvedUnit.heatDuty || incomingMass * 4.18 * deltaT / 3600);
      const recoveryPct = Math.min(85, Math.max(0, p.heatRecovery || 0));
      const lethalityF0 = text.includes("sip") || text.includes("steril") ? Math.max(0, p.sipHold || 20) * Math.pow(10, ((121 - 121.1) / 10)) : 0;
      const severity = heatKwh > Math.max(2500, state.batchSize * 0.08) && recoveryPct < 25 ? "caution" : lethalityF0 && lethalityF0 < 12 ? "critical" : "ok";
      model = {
        ...model,
        modelType: "Heat duty, SIP lethality, and reuse screen",
        status: modelStatusLabel(severity),
        severity,
        confidence: modelConfidence(severity, 74),
        keyMetric: lethalityF0 ? "F0 lethality" : "Gross heat",
        metricValue: lethalityF0 || heatKwh,
        metricUnit: lethalityF0 ? "min" : "kWh/batch",
        equation: "Q = m*Cp*DeltaT + Hvap*mvap; F0 = integral(10^((T-121.1)/z) dt); Qnet = Qgross*(1 - heat_recovery)",
        inputs: `Mass ${formatNumber(incomingMass, 1)} kg; target ${formatNumber(solvedUnit.targetTemperature || p.temperature || 25, 1)} C; recovery ${formatNumber(recoveryPct, 0)}%`,
        outputs: `Gross heat ${formatNumber(heatKwh, 1)} kWh; recovered ${formatNumber(solvedUnit.recoveredHeat || 0, 1)} kWh; F0 ${formatNumber(lethalityF0, 1)} min`,
        warnings: severity === "ok" ? "" : "Heat recovery or sterilization hold time needs engineering review.",
        recommendation: severity === "ok" ? "Refine with exchanger area, approach temperature, steam pressure, and condensate-return constraints." : "Add heat integration, verify SIP temperature distribution, and size clean steam/chilled utilities before scale-up.",
      };
    } else if (layer === "cleaning" || text.includes("cip") || text.includes("clean")) {
      const cleaningLoad = Math.max(5, state.batchSize * 0.015);
      const rinseEndpoint = Math.max(0.01, (p.bioburden || 10) / Math.max(1, p.sterilityAssurance || 6));
      const cipHours = Math.max(0.1, p.cipTime || 2.5);
      const severity = cipHours < 1.2 || rinseEndpoint > 3 ? "critical" : cipHours < 2 || rinseEndpoint > 1 ? "caution" : "ok";
      model = {
        ...model,
        modelType: "CIP residue and cleaning validation screen",
        status: modelStatusLabel(severity),
        severity,
        confidence: modelConfidence(severity, 72),
        keyMetric: "Rinse endpoint",
        metricValue: rinseEndpoint,
        metricUnit: "proxy",
        equation: "Cresidue(t) = C0*exp(-k*t); MACO = ADE*batch_size/safety_factor; spent = caustic + acid + rinse + soil",
        inputs: `CIP ${formatNumber(cipHours, 1)} h; cleaning load ${formatNumber(cleaningLoad, 1)} kg/batch; bioburden ${formatNumber(p.bioburden || 10, 1)} CFU/mL`,
        outputs: `Endpoint proxy ${formatNumber(rinseEndpoint, 2)}; spent stream ${formatNumber(cleaningLoad * 1.08, 1)} kg/batch`,
        warnings: severity === "ok" ? "" : "Cleaning hold, bioburden, or residue endpoint is weak for GMP screening.",
        recommendation: severity === "ok" ? "Add product-specific MACO, swab/rinse limits, and conductivity/TOC endpoint data." : "Increase rinse validation detail, extend CIP/SIP window, define MACO limits, and add dirty/clean hold-time checks.",
      };
    } else if (unitItem.cls === "Utilities" || unitItem.cls === "Environmental" || unitItem.cls === "Air pollution" || layer === "waste" || layer === "support") {
      const removal = unitItem.cls === "Environmental" ? Math.max(p.codRemoval || 86, p.bodRemoval || 92) : unitItem.cls === "Air pollution" ? p.vocRemoval || 96 : p.heatRecovery || 22;
      const utilityIntensity = Math.max(0.01, (solvedUnit.heatDuty || 0) / Math.max(1, productKgBatch));
      const severity = unitItem.cls === "Environmental" && removal < 80 ? "critical" : removal < 90 && ["Environmental", "Air pollution"].includes(unitItem.cls) ? "caution" : "ok";
      model = {
        ...model,
        modelType: "Utility, abatement, and resource screen",
        status: modelStatusLabel(severity),
        severity,
        confidence: modelConfidence(severity, 66),
        keyMetric: "Removal / reuse",
        metricValue: removal,
        metricUnit: "%",
        equation: "load_out = load_in*(1 - eta); E = sum(mi*EF_i)*(1 - eta_control); utility_intensity = Q/product",
        inputs: `Load ${formatNumber(incomingMass, 1)} kg/batch; heat ${formatNumber(solvedUnit.heatDuty || 0, 1)} kWh/batch`,
        outputs: `Removal/reuse ${formatNumber(removal, 1)}%; utility intensity ${formatNumber(utilityIntensity, 2)} kWh/kg`,
        warnings: severity === "ok" ? "" : "Removal or reuse efficiency is too low for the active production scale.",
        recommendation: severity === "ok" ? "Calibrate with site utility headers, emission permits, and wastewater assays." : "Add equalization, polishing, heat recovery, or abatement capacity and validate discharge limits.",
      };
    } else if (unitItem.cls === "Quality" || unitItem.cls === "Instrumentation" || text.includes("pat") || text.includes("qc")) {
      const dataCompleteness = Math.min(100, 45 + processParameters.length * 0.8 + equations.length * 0.05);
      const releaseLoad = Math.max(1, state.batchCount / Math.max(1, p.annualOperatingTime || 7200) * 24);
      const severity = dataCompleteness < 70 ? "caution" : "ok";
      model = {
        ...model,
        modelType: "PAT, release, and data-integrity screen",
        status: modelStatusLabel(severity),
        severity,
        confidence: modelConfidence(severity, 64),
        keyMetric: "Data completeness",
        metricValue: dataCompleteness,
        metricUnit: "%",
        equation: "CQA_hat = f(PAT, pH, DO, feed, temperature); release = specs_pass and audit_trail_complete",
        inputs: `${processParameters.length} parameters; ${equations.length} equations; ${state.streams.length} streams`,
        outputs: `Release load ${formatNumber(releaseLoad, 2)} batches/day; completeness ${formatNumber(dataCompleteness, 0)}%`,
        warnings: severity === "ok" ? "" : "The data model still needs validated CQAs, calibration ranges, and audit-trail logic.",
        recommendation: "Attach CQA specs, calibration files, historian tags, audit trails, and method-validation records before production release use.",
      };
    }

    return {
      ...model,
      metricValue: Number.isFinite(model.metricValue) ? model.metricValue : 0,
      sourceBasis: sourcesForUnit(unitItem).slice(0, 2).map((source) => source.group).join("; ") || "Engineering screening assumption",
    };
  });
}

function mechanisticModelRows() {
  return unitMechanisticModels().map((item) => ({
    tag: item.tag,
    operation: item.operation,
    class: item.class,
    modelType: item.modelType,
    status: item.status,
    severity: item.severity,
    confidencePct: item.confidence,
    keyMetric: item.keyMetric,
    metricValue: item.metricValue,
    metricUnit: item.metricUnit,
    equation: item.equation,
    inputs: item.inputs,
    outputs: item.outputs,
    warnings: item.warnings,
    recommendation: item.recommendation,
    sourceBasis: item.sourceBasis,
  }));
}

function scheduleUnitGroup(item) {
  const layer = unitLayer(item);
  if (item.cls === "Bioreactor" || item.cls === "Preparation" || item.cls === "Hold") return "Upstream";
  if (["Solid-liquid", "Filtration", "Purification", "Concentration", "Separation", "Recovery", "Viral safety"].includes(item.cls)) return "Downstream";
  if (["Finishing", "Packaging", "Quality"].includes(item.cls)) return "Fill finish + QC";
  if (layer === "cleaning" || item.cls === "Sterilization") return "CIP/SIP";
  if (layer === "recycle" || layer === "heat" || item.cls === "Thermal") return "Heat + recycle";
  if (item.cls === "Utilities" || layer === "support") return "Utilities";
  if (item.cls === "Environmental" || layer === "waste" || item.cls === "Air pollution") return "Waste + emissions";
  return "Support";
}

function recipeNumber(unitItem, key, fallback, min = 0, max = 100000) {
  const value = Number(state.recipeOverrides[unitItem.id]?.[key]);
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, value));
}

function recipeParallelUnits(unitItem) {
  return Math.max(1, Math.min(12, Math.round(recipeNumber(unitItem, "parallelUnits", 1, 1, 12))));
}

function orderedScheduleUnits() {
  return [...state.units].sort((a, b) => (a.x - b.x) || (a.y - b.y));
}

function recipeActive(unitItem) {
  return state.recipeOverrides[unitItem.id]?.active !== false;
}

function defaultRecipeRoute(unitItem) {
  const text = `${unitItem.type} ${unitItem.name} ${unitItem.cls}`.toLowerCase();
  if (unitLayer(unitItem) === "cleaning" || unitItem.cls === "Utilities" || unitItem.cls === "Environmental" || unitItem.cls === "Quality") return "common";
  if (text.includes("perfusion") || text.includes("single-use") || text.includes("wave") || text.includes("cell retention")) return "intensified";
  if (text.includes("protein-a") || text.includes("chromatography") || text.includes("viral") || text.includes("low-ph")) return "primary";
  if (unitItem.cls === "Packaging" || unitItem.cls === "Finishing") return "common";
  return "common";
}

function recipeRoute(unitItem) {
  const value = state.recipeOverrides[unitItem.id]?.route;
  if (value === "common" || routeOptions.some((item) => item.key === value)) return value;
  return defaultRecipeRoute(unitItem);
}

function recipeRouteEnabled(unitItem, routeKey = state.activeRoute) {
  const route = recipeRoute(unitItem);
  return route === "common" || route === routeKey;
}

function defaultRecipePredecessor(unitItem, orderedUnits = orderedScheduleUnits(), routeKey = state.activeRoute) {
  const index = orderedUnits.findIndex((item) => item.id === unitItem.id);
  if (index <= 0) return "__batch_start";
  const predecessor = orderedUnits.slice(0, index).reverse().find((item) => recipeActive(item) && recipeRouteEnabled(item, routeKey));
  return predecessor?.id || "__batch_start";
}

function recipePredecessor(unitItem, orderedUnits = orderedScheduleUnits(), routeKey = state.activeRoute) {
  const value = state.recipeOverrides[unitItem.id]?.predecessor;
  if (value === "__batch_start") return value;
  if (value && orderedUnits.some((item) => item.id === value)) return value;
  return defaultRecipePredecessor(unitItem, orderedUnits, routeKey);
}

function defaultScheduleOperationDuration(unitItem, data) {
  const p = state.params;
  const text = `${unitItem.type} ${unitItem.name} ${unitItem.cls}`.toLowerCase();
  if (unitItem.cls === "Bioreactor") return Math.max(18, data.batchDuration * (text.includes("seed") ? 0.18 : 0.48), unitItem.residence || 0);
  if (unitItem.cls === "Preparation") return Math.max(1.2, unitItem.residence || 0, state.batchSize / 45000);
  if (unitItem.cls === "Hold") return Math.max(0.8, unitItem.residence || 0, Math.min(p.holdupTime || 12, 8));
  if (["Solid-liquid", "Filtration"].includes(unitItem.cls)) return Math.max(1.5, unitItem.residence || 0, state.batchSize / Math.max(12000, (p.sterileFilterFlux || 180) * 80));
  if (["Purification", "Recovery", "Separation"].includes(unitItem.cls)) return Math.max(2.5, unitItem.residence || 0, data.productPerBatchKg / 35);
  if (["Concentration", "Viral safety"].includes(unitItem.cls)) return Math.max(2, unitItem.residence || 0, data.productPerBatchKg / 55);
  if (unitItem.cls === "Thermal") return Math.max(0.8, unitItem.residence || 0, state.batchSize / 80000);
  if (unitItem.cls === "Sterilization" || text.includes("sip")) return Math.max(0.6, (p.sipHold || 30) / 60 + 0.6);
  if (unitItem.cls === "Packaging" || unitItem.cls === "Finishing") return Math.max(1.5, unitItem.residence || 0, data.productPerBatchKg / 80);
  if (unitItem.cls === "Quality") return Math.max(1, unitItem.residence || 0, (p.qcReleaseTime || 48) * 0.08);
  if (unitItem.cls === "Environmental" || unitItem.cls === "Air pollution") return Math.max(0.8, unitItem.residence || 0);
  if (unitItem.cls === "Utilities") return Math.max(0.4, unitItem.residence || 0);
  return Math.max(0.35, unitItem.residence || 0.7);
}

function scheduleOperationDuration(unitItem, data) {
  return recipeNumber(unitItem, "processH", defaultScheduleOperationDuration(unitItem, data), 0.05, 10000);
}

function defaultScheduleCleaningDuration(unitItem) {
  const p = state.params;
  const layer = unitLayer(unitItem);
  if (layer === "cleaning") return Math.max(0.25, p.cipTime || 2.5);
  if (["Preparation", "Bioreactor", "Hold", "Solid-liquid", "Filtration", "Purification", "Concentration", "Separation", "Recovery", "Viral safety", "Finishing"].includes(unitItem.cls)) {
    return Math.max(0.15, (p.cipTime || 2.5) * (unitItem.cls === "Bioreactor" ? 1.15 : 0.55));
  }
  if (unitItem.cls === "Packaging" || unitItem.cls === "Quality") return Math.max(0.05, (p.cipTime || 2.5) * 0.12);
  return 0;
}

function scheduleCleaningDuration(unitItem) {
  return recipeNumber(unitItem, "cleanH", defaultScheduleCleaningDuration(unitItem), 0, 1000);
}

function defaultScheduleSetupDuration(unitItem) {
  const p = state.params;
  const major = ["Preparation", "Bioreactor", "Purification", "Concentration", "Packaging", "Finishing"].includes(unitItem.cls);
  return Math.max(0.03, (p.setupTime || 4) * (major ? 0.08 : 0.025));
}

function scheduleSetupDuration(unitItem) {
  return recipeNumber(unitItem, "setupH", defaultScheduleSetupDuration(unitItem), 0, 1000);
}

function scheduleReusePolicy(unitItem) {
  const text = `${unitItem.id} ${unitItem.type} ${unitItem.name} ${unitItem.cls}`.toLowerCase();
  if (text.includes("single-use") || text.includes("bag") || text.includes("filter") || text.includes("membrane")) {
    return { mode: "replace assembly", detail: "Disposable path: short changeover, integrity check, and new sterile assembly before reuse." };
  }
  if (unitItem.cls === "Bioreactor" || text.includes("reactor") || text.includes("fermenter")) {
    return { mode: "CIP/SIP then reusable", detail: "Production ends, product is transferred, vessel is cleaned/sterilized, then released for the next batch." };
  }
  if (["Preparation", "Hold", "Purification", "Concentration", "Solid-liquid", "Separation", "Recovery", "Finishing"].includes(unitItem.cls)) {
    return { mode: "CIP/rinse then reusable", detail: "Equipment is reusable after product transfer, cleaning/rinse, and release check." };
  }
  if (unitLayer(unitItem) === "cleaning") {
    return { mode: "shared cleaning resource", detail: "CIP/SIP resource is shared across equipment and can only clean one train at a time in this screening model." };
  }
  if (unitItem.cls === "Quality" || unitItem.cls === "Instrumentation") {
    return { mode: "queue/resource slot", detail: "Analytical or data resource is scheduled as a queue, then released." };
  }
  return { mode: "reusable support", detail: "Support item returns to available state after its scheduled service window." };
}

function streamTransferDuration(streamItem, from, to, data) {
  const massKg = Math.max(0.01, streamNumericFlow(streamItem));
  const kind = streamKind(streamItem, from, to);
  const phase = String(streamItem.phase || "").toLowerCase();
  if (kind === "qc") return 0.08;
  if (kind === "utility") return Math.max(0.04, Math.min(1.2, massKg / 20000));
  if (phase.includes("gas")) return Math.max(0.03, Math.min(0.8, massKg / 30000));
  if (phase.includes("solid")) return Math.max(0.12, Math.min(3, massKg / 3500));
  if (phase.includes("slurry") || phase.includes("broth")) return Math.max(0.25, Math.min(5.5, massKg / Math.max(4000, state.batchSize * 0.8)));
  return Math.max(0.12, Math.min(3.5, massKg / Math.max(6000, state.batchSize)));
}

function streamFlushDuration(streamItem, kind) {
  const text = `${streamItem.id} ${streamItem.composition} ${streamItem.phase}`.toLowerCase();
  if (kind === "qc") return 0.02;
  if (kind === "utility" || text.includes("cip") || text.includes("steam") || text.includes("gas")) return 0.04;
  if (text.includes("broth") || text.includes("slurry") || text.includes("harvest") || text.includes("solvent")) return 0.18;
  return 0.08;
}

function campaignSchedule(routeKey = state.activeRoute) {
  const p = state.params;
  const data = metrics();
  const orderedUnits = orderedScheduleUnits();
  const activeUnits = orderedUnits.filter((item) => recipeActive(item) && recipeRouteEnabled(item, routeKey));
  const activeUnitIds = new Set(activeUnits.map((item) => item.id));
  const simulatedBatches = Math.min(12, Math.max(2, state.batchCount || 2));
  const effectiveAot = Math.max(24, (p.annualOperatingTime || 7920) * (p.equipmentUptime || 92) / 100);
  const plannedPitch = Math.max(1, effectiveAot / Math.max(1, state.batchCount || 1));
  const transferSlack = Math.max(0.05, (p.turnaroundTime || 8) / Math.max(8, activeUnits.length * 2));
  const equipmentAvailable = {};
  const equipmentPools = {};
  const equipmentBusy = {};
  const equipmentCapacity = {};
  const streamAvailable = {};
  const streamBusy = {};
  const groupBusy = {};
  const shiftHours = Math.max(1, p.operatorShiftHours || 8);
  const resourceBusy = { "CIP/SIP skid": 0, "QC release queue": 0, "Operator shifts": 0 };
  let cipSkidAvailable = 0;
  let qcQueueAvailable = 0;
  const operations = [];
  const streamOperations = [];
  const violations = [];
  const dependencyWarnings = [];
  const batchReleases = [];

  for (let batchIndex = 0; batchIndex < simulatedBatches; batchIndex += 1) {
    const batchId = `B${String(batchIndex + 1).padStart(2, "0")}`;
    const batchStartH = batchIndex * plannedPitch;
    const dependencyDone = { __batch_start: batchStartH };
    let firstStart = null;
    activeUnits.forEach((unitItem, operationIndex) => {
      const group = scheduleUnitGroup(unitItem);
      const predecessor = recipePredecessor(unitItem, orderedUnits, routeKey);
      const setupH = scheduleSetupDuration(unitItem);
      const processH = scheduleOperationDuration(unitItem, data);
      const cleanH = scheduleCleaningDuration(unitItem);
      const reuse = scheduleReusePolicy(unitItem);
      const parallelUnits = recipeParallelUnits(unitItem);
      equipmentCapacity[unitItem.id] = parallelUnits;
      if (!equipmentPools[unitItem.id] || equipmentPools[unitItem.id].length !== parallelUnits) {
        equipmentPools[unitItem.id] = Array.from({ length: parallelUnits }, (_, index) => equipmentPools[unitItem.id]?.[index] || 0);
      }
      const pool = equipmentPools[unitItem.id];
      const selectedSlot = pool.reduce((best, value, index) => value < pool[best] ? index : best, 0);
      const equipmentReady = pool[selectedSlot] || 0;
      const dependencyReady = dependencyDone[predecessor];
      const dependencyStatus = Number.isFinite(dependencyReady)
        ? "linked"
        : orderedUnits.some((item) => item.id === predecessor && (!recipeActive(item) || !recipeRouteEnabled(item, routeKey)))
          ? "inactive predecessor"
          : "unresolved predecessor";
      const readyTime = (Number.isFinite(dependencyReady) ? dependencyReady : batchStartH) + (predecessor === "__batch_start" ? 0 : transferSlack);
      const startH = Math.max(readyTime, equipmentReady);
      const waitingH = Math.max(0, startH - readyTime);
      const processEndH = startH + setupH + processH;
      const outgoingStreams = state.streams.filter((streamItem) => streamItem.from === unitItem.id && activeUnitIds.has(streamItem.to));
      let transferEndH = processEndH;
      let lineWaitH = 0;
      outgoingStreams.forEach((streamItem, streamIndex) => {
        const from = state.units.find((candidate) => candidate.id === streamItem.from);
        const to = state.units.find((candidate) => candidate.id === streamItem.to);
        const kind = streamKind(streamItem, from, to);
        const transferH = streamTransferDuration(streamItem, from, to, data);
        const flushH = streamFlushDuration(streamItem, kind);
        const lineReadyH = streamAvailable[streamItem.id] || 0;
        const transferStartH = Math.max(processEndH + streamIndex * 0.03, lineReadyH);
        const transferFinishH = transferStartH + transferH;
        const flushStartH = transferFinishH;
        const availableH = flushStartH + flushH;
        lineWaitH += Math.max(0, transferStartH - processEndH);
        transferEndH = Math.max(transferEndH, transferFinishH);
        streamAvailable[streamItem.id] = availableH + transferSlack * 0.25;
        streamBusy[streamItem.id] = (streamBusy[streamItem.id] || 0) + transferH + flushH;
        streamOperations.push({
          batchId,
          streamId: streamItem.id,
          from: streamItem.from,
          to: streamItem.to,
          composition: streamItem.composition,
          phase: streamItem.phase,
          role: streamLabel(kind),
          kind,
          sourceUnit: unitItem.id,
          transferStartH,
          transferH,
          transferFinishH,
          flushStartH,
          flushH,
          availableH,
          lineWaitH: Math.max(0, transferStartH - processEndH),
          status: transferStartH - processEndH > Math.max(0.5, p.holdupTime || 12) ? "line wait review" : "scheduled",
        });
      });
      const cleanStartH = cleanH > 0 ? Math.max(transferEndH, cipSkidAvailable) : transferEndH;
      const cleanEndH = cleanStartH + cleanH;
      const finishH = cleanH > 0 ? cleanEndH : transferEndH;
      const availableH = cleanH > 0 ? cleanEndH : transferEndH;
      const holdLimit = Math.max(0.5, p.holdupTime || 12);
      const status = waitingH > holdLimit ? "hold violation" : lineWaitH > holdLimit ? "line wait" : cleanH && cleanStartH > transferEndH + holdLimit ? "CIP wait" : "scheduled";
      const row = {
        batchId,
        operationNo: operationIndex + 1,
        tag: unitItem.id,
        operation: unitItem.name,
        class: unitItem.cls,
        group,
        predecessor,
        dependencyStatus,
        route: recipeRoute(unitItem),
        activeRoute: routeKey,
        assignedEquipment: `${unitItem.id}${parallelUnits > 1 ? `-${selectedSlot + 1}/${parallelUnits}` : ""}`,
        parallelUnits,
        reuseMode: reuse.mode,
        reuseDetail: reuse.detail,
        startH,
        setupH,
        processH,
        processEndH,
        transferEndH,
        cleanStartH,
        cleanH,
        finishH,
        availableH,
        waitingH,
        lineWaitH,
        status,
      };
      operations.push(row);
      if (firstStart == null) firstStart = startH;
      pool[selectedSlot] = finishH + transferSlack;
      equipmentAvailable[unitItem.id] = Math.min(...pool);
      equipmentBusy[unitItem.id] = (equipmentBusy[unitItem.id] || 0) + setupH + processH + cleanH;
      groupBusy[group] = (groupBusy[group] || 0) + setupH + processH;
      resourceBusy["Operator shifts"] += (setupH + processH) * (unitItem.cls === "Bioreactor" || unitItem.cls === "Purification" ? 0.35 : 0.18) / shiftHours;
      if (cleanH > 0) {
        cipSkidAvailable = cleanEndH;
        resourceBusy["CIP/SIP skid"] += cleanH;
      }
      if (waitingH > holdLimit) {
        violations.push(`${batchId} ${unitItem.id}: waited ${formatNumber(waitingH, 1)} h before ${unitItem.name}`);
      }
      if (dependencyStatus !== "linked") {
        dependencyWarnings.push(`${batchId} ${unitItem.id}: ${dependencyStatus} ${predecessor}`);
      }
      dependencyDone[unitItem.id] = transferEndH;
    });
    const finalProcessEnd = Math.max(...Object.entries(dependencyDone).filter(([key]) => key !== "__batch_start").map(([, value]) => value), batchStartH);
    const qcStart = Math.max(finalProcessEnd, qcQueueAvailable);
    const qcEnd = qcStart + Math.max(0, p.qcReleaseTime || 48);
    qcQueueAvailable = qcEnd;
    resourceBusy["QC release queue"] += Math.max(0, p.qcReleaseTime || 48);
    batchReleases.push({
      batchId,
      firstStartH: firstStart || 0,
      processCompleteH: finalProcessEnd,
      qcReleaseH: qcEnd,
      cycleTimeH: qcEnd - (firstStart || 0),
      releaseStatus: qcStart - finalProcessEnd > Math.max(1, p.holdupTime || 12) ? "QC queue review" : "release scheduled",
    });
  }

  const makespanH = Math.max(...operations.map((item) => item.finishH), ...batchReleases.map((item) => item.qcReleaseH), 1);
  const feasibleAnnualBatches = Math.max(0, Math.floor(simulatedBatches / makespanH * effectiveAot));
  const releasePitch = batchReleases.length > 1
    ? (batchReleases.at(-1).qcReleaseH - batchReleases[0].qcReleaseH) / (batchReleases.length - 1)
    : makespanH;
  const maxEquipmentOccupancy = Object.entries(equipmentBusy)
    .map(([tag, busyH]) => ({ tag, busyH, availableH: makespanH * (equipmentCapacity[tag] || 1), occupancyPct: busyH / (makespanH * (equipmentCapacity[tag] || 1)) * 100 }))
    .sort((a, b) => b.occupancyPct - a.occupancyPct);
  const bottleneck = maxEquipmentOccupancy[0] || { tag: "none", occupancyPct: 0, busyH: 0 };
  const resourceRows = [
    ...maxEquipmentOccupancy.slice(0, 16).map((item) => ({
      resource: item.tag,
      type: "Equipment",
      busyH: item.busyH,
      availableH: item.availableH,
      occupancyPct: item.occupancyPct,
      status: item.occupancyPct > 92 ? "bottleneck" : item.occupancyPct > 75 ? "review" : "ok",
    })),
    ...Object.entries(groupBusy).map(([group, busyH]) => ({
      resource: group,
      type: "Process area",
      busyH,
      availableH: makespanH,
      occupancyPct: busyH / makespanH * 100,
      status: busyH / makespanH > 0.92 ? "bottleneck" : busyH / makespanH > 0.75 ? "review" : "ok",
    })),
    ...Object.entries(resourceBusy).map(([resource, busyH]) => ({
      resource,
      type: "Shared resource",
      busyH,
      availableH: resource === "Operator shifts" ? makespanH / shiftHours : makespanH,
      occupancyPct: busyH / (resource === "Operator shifts" ? makespanH / shiftHours : makespanH) * 100,
      status: busyH / (resource === "Operator shifts" ? makespanH / shiftHours : makespanH) > 0.92 ? "bottleneck" : busyH / (resource === "Operator shifts" ? makespanH / shiftHours : makespanH) > 0.75 ? "review" : "ok",
    })),
    ...Object.entries(streamBusy).map(([resource, busyH]) => ({
      resource,
      type: "Process stream / transfer line",
      busyH,
      availableH: makespanH,
      occupancyPct: busyH / makespanH * 100,
      status: busyH / makespanH > 0.92 ? "bottleneck" : busyH / makespanH > 0.75 ? "review" : "ok",
    })),
  ];

  return {
    basis: "finite-capacity campaign schedule v1",
    activeRoute: routeKey,
    simulatedBatches,
    plannedPitchH: plannedPitch,
    effectiveAotH: effectiveAot,
    makespanH,
    releasePitchH: Math.max(0, releasePitch),
    feasibleAnnualBatches,
    batchTarget: state.batchCount,
    bottleneck,
    violations,
    dependencyWarnings,
    operations,
    streamOperations,
    batchReleases,
    resourceRows,
    warnings: [
      feasibleAnnualBatches < state.batchCount ? `Schedule capacity supports ${feasibleAnnualBatches} of ${state.batchCount} target annual batches under the current AOT and uptime.` : "",
      violations.length ? `${violations.length} hold-time or waiting violations need recipe/suite review.` : "",
      streamOperations.some((item) => item.status !== "scheduled") ? `${streamOperations.filter((item) => item.status !== "scheduled").length} stream transfer slots need line availability review.` : "",
      dependencyWarnings.length ? `${dependencyWarnings.length} dependency warnings need recipe review.` : "",
      bottleneck.occupancyPct > 92 ? `${bottleneck.tag} is above 92% occupancy in the simulated campaign.` : "",
    ].filter(Boolean),
  };
}

function scheduleOperationRows() {
  return campaignSchedule().operations.map((item) => ({
    batchId: item.batchId,
    operationNo: item.operationNo,
    tag: item.tag,
    operation: item.operation,
    class: item.class,
    group: item.group,
    route: item.route,
    activeRoute: item.activeRoute,
    predecessor: item.predecessor,
    dependencyStatus: item.dependencyStatus,
    assignedEquipment: item.assignedEquipment,
    parallelUnits: item.parallelUnits,
    startH: item.startH,
    setupH: item.setupH,
    processH: item.processH,
    processEndH: item.processEndH,
    transferEndH: item.transferEndH,
    cleanStartH: item.cleanStartH,
    cleanH: item.cleanH,
    finishH: item.finishH,
    availableH: item.availableH,
    waitingH: item.waitingH,
    lineWaitH: item.lineWaitH,
    reuseMode: item.reuseMode,
    reuseDetail: item.reuseDetail,
    status: item.status,
  }));
}

function scheduleStreamRows() {
  return campaignSchedule().streamOperations.map((item) => ({
    batchId: item.batchId,
    streamId: item.streamId,
    from: item.from,
    to: item.to,
    composition: item.composition,
    phase: item.phase,
    role: item.role,
    kind: item.kind,
    sourceUnit: item.sourceUnit,
    transferStartH: item.transferStartH,
    transferH: item.transferH,
    transferFinishH: item.transferFinishH,
    flushStartH: item.flushStartH,
    flushH: item.flushH,
    availableH: item.availableH,
    lineWaitH: item.lineWaitH,
    status: item.status,
  }));
}

function scheduleCycleRows() {
  return campaignSchedule().operations.map((item) => ({
    batchId: item.batchId,
    tag: item.tag,
    operation: item.operation,
    class: item.class,
    assignedEquipment: item.assignedEquipment,
    reuseMode: item.reuseMode,
    setupStartH: item.startH,
    processStartH: item.startH + item.setupH,
    processEndH: item.processEndH,
    transferEndH: item.transferEndH,
    cleaningStartH: item.cleanStartH,
    cleaningEndH: item.cleanStartH + item.cleanH,
    availableForNextBatchH: item.availableH,
    status: item.status,
  }));
}

function exportDateIso() {
  return new Date().toISOString();
}

function addHoursIso(hours, base = new Date()) {
  return new Date(base.getTime() + Number(hours || 0) * 3600000).toISOString();
}

function scheduleGanttRows(schedule = campaignSchedule()) {
  const rows = [];
  const pushSegment = (item, phase, startH, endH, resource = item.assignedEquipment, predecessor = "") => {
    const durationH = Math.max(0, endH - startH);
    if (durationH <= 0.001) return;
    rows.push({
      taskId: `${item.batchId}-${item.tag}-${phase}`.replaceAll(/\s+/g, "-"),
      parentTaskId: `${item.batchId}-${item.tag}`,
      batchId: item.batchId,
      operationNo: item.operationNo,
      taskName: `${item.tag} ${phase} - ${item.operation}`,
      operationTag: item.tag,
      operation: item.operation,
      phase,
      resource,
      resourceType: phase === "Cleaning/Release" ? "CIP/SIP" : phase === "Transfer" ? "Transfer line" : "Equipment",
      group: item.group,
      route: item.route,
      activeRoute: item.activeRoute,
      predecessorTaskId: predecessor || (item.predecessor === "__batch_start" ? "" : `${item.batchId}-${item.predecessor}-Process`),
      startH,
      finishH: endH,
      durationH,
      startIso: addHoursIso(startH),
      finishIso: addHoursIso(endH),
      percentComplete: 0,
      critical: item.status !== "scheduled" || schedule.bottleneck.tag === item.tag ? "yes" : "no",
      status: item.status,
      note: item.reuseDetail,
    });
  };
  schedule.operations.forEach((item) => {
    const setupEnd = item.startH + item.setupH;
    pushSegment(item, "Setup", item.startH, setupEnd);
    pushSegment(item, "Process", setupEnd, item.processEndH, item.assignedEquipment, item.predecessor === "__batch_start" ? "" : `${item.batchId}-${item.predecessor}-Process`);
    pushSegment(item, "Transfer", item.processEndH, item.transferEndH, `${item.tag} transfer line`, `${item.batchId}-${item.tag}-Process`);
    pushSegment(item, "Cleaning/Release", item.cleanStartH, item.cleanStartH + item.cleanH, "CIP/SIP skid", `${item.batchId}-${item.tag}-Transfer`);
  });
  return rows.sort((a, b) => a.startH - b.startH || a.operationNo - b.operationNo);
}

function scheduleBatchReleaseRows(schedule = campaignSchedule()) {
  return schedule.batchReleases.map((item) => ({
    batchId: item.batchId,
    firstStartH: item.firstStartH,
    processCompleteH: item.processCompleteH,
    qcReleaseH: item.qcReleaseH,
    cycleTimeH: item.cycleTimeH,
    firstStartIso: addHoursIso(item.firstStartH),
    processCompleteIso: addHoursIso(item.processCompleteH),
    qcReleaseIso: addHoursIso(item.qcReleaseH),
    releaseStatus: item.releaseStatus,
    activeRoute: schedule.activeRoute,
    plannedPitchH: schedule.plannedPitchH,
  }));
}

function scheduleMsProjectRows(schedule = campaignSchedule()) {
  return scheduleGanttRows(schedule).map((item, index) => ({
    ID: index + 1,
    "Task Name": item.taskName,
    "Outline Level": item.phase === "Process" ? 2 : 3,
    Duration: `${formatNumber(item.durationH, 2)}h`,
    Start: item.startIso,
    Finish: item.finishIso,
    Predecessors: item.predecessorTaskId,
    "Resource Names": item.resource,
    Notes: `${item.batchId}; ${item.group}; ${item.status}; ${item.note}`,
    "% Complete": item.percentComplete,
    Critical: item.critical,
  }));
}

function scheduleUtilizationMatrixRows(schedule = campaignSchedule()) {
  const windowH = Math.max(1, schedule.makespanH);
  const bucketH = Math.max(4, Math.ceil(windowH / 18));
  const ganttRows = scheduleGanttRows(schedule);
  const buckets = Array.from({ length: Math.ceil(windowH / bucketH) }, (_, index) => ({
    bucket: index + 1,
    startH: index * bucketH,
    finishH: Math.min(windowH, (index + 1) * bucketH),
  }));
  const resources = [...new Set(ganttRows.map((item) => item.resource))].slice(0, 36);
  return resources.flatMap((resource) => buckets.map((bucket) => {
    const busyH = ganttRows
      .filter((row) => row.resource === resource)
      .reduce((sum, row) => sum + Math.max(0, Math.min(row.finishH, bucket.finishH) - Math.max(row.startH, bucket.startH)), 0);
    return {
      resource,
      bucket: bucket.bucket,
      bucketStartH: bucket.startH,
      bucketFinishH: bucket.finishH,
      busyH,
      availableH: bucket.finishH - bucket.startH,
      utilizationPct: busyH / Math.max(0.001, bucket.finishH - bucket.startH) * 100,
      status: busyH / Math.max(0.001, bucket.finishH - bucket.startH) > 0.92 ? "conflict" : busyH > 0 ? "busy" : "idle",
    };
  }));
}

function advancedPlanningSuite(schedule = campaignSchedule()) {
  const data = metrics();
  const annualKg = Math.max(1, data.annualKg);
  const releaseRows = scheduleBatchReleaseRows(schedule);
  const operationRows = scheduleOperationRows();
  const resourceRows = scheduleResourceRows();
  const materialRows = costRows().filter((row) => row.category === "Materials" && row.unit === "USD/yr");
  const dailyProductKg = annualKg / 365;
  const simulatedReleaseKg = data.productPerBatchKg * Math.max(1, releaseRows.length);
  const onTimeTargetPct = schedule.warnings.length ? 88 : 96;
  const capacityRiskCount = resourceRows.filter((row) => row.status !== "ok").length;
  const inventoryRiskCount = materialRows.filter((row) => Number(row.perKgProductUsd || 0) > data.directCost * 0.08).length;
  const horizons = [
    {
      horizon: "Strategic plan",
      window: "12-36 months",
      planningQuestion: "Which products, sites, suites, and scales should exist?",
      decisions: "capacity expansion, parallel trains, make/buy, site fit, major CAPEX",
      inputs: "portfolio demand, target annual kg, facility constraints, investment envelope",
      output: `${formatNumber(annualKg, 0)} kg/yr target with ${capacityRiskCount} capacity review signals`,
      cadence: "monthly / quarterly",
    },
    {
      horizon: "Tactical plan",
      window: "4-26 weeks",
      planningQuestion: "Which campaigns should run, in which sequence, with which resources?",
      decisions: "campaign order, material readiness, suite allocation, QC capacity, cleaning windows",
      inputs: "forecast, confirmed orders, inventory, lead times, resource calendars",
      output: `${schedule.feasibleAnnualBatches} feasible annual batches under current assumptions`,
      cadence: "weekly",
    },
    {
      horizon: "Detailed schedule",
      window: "0-14 days",
      planningQuestion: "What exactly runs next and what will block it?",
      decisions: "operation start, equipment assignment, transfer line slot, operator shift, CIP/SIP queue",
      inputs: "finite equipment state, batch status, deviations, utility availability",
      output: `${operationRows.length} scheduled operations and ${schedule.warnings.length} warnings`,
      cadence: "shift / daily",
    },
  ];
  const capacity = resourceRows.map((row, index) => {
    const deviationPct = Math.max(-18, Math.min(22, (Number(row.occupancyPct || 0) - 72) * 0.28 + (index % 5 - 2) * 2.4));
    const projectedLoadPct = Math.max(0, Math.min(140, Number(row.occupancyPct || 0) + deviationPct));
    return {
      resource: row.resource,
      resourceType: row.type,
      plannedLoadPct: row.occupancyPct,
      realtimeDeviationPct: deviationPct,
      projectedLoadPct,
      capacityIssue: projectedLoadPct > 100 ? "over capacity" : projectedLoadPct > 85 ? "watch" : "ok",
      correctiveAction: projectedLoadPct > 100 ? "reschedule, add parallel capacity, outsource, or reduce campaign load" : projectedLoadPct > 85 ? "monitor next schedule cycle and protect cleaning/release windows" : "no immediate action",
      monitorSignal: row.type === "Shared resource" ? "queue length and availability" : row.type.includes("stream") ? "line slot and flush completion" : "equipment state and downtime",
    };
  });
  const delivery = Array.from({ length: Math.max(6, Math.min(10, releaseRows.length || 8)) }, (_, index) => {
    const release = releaseRows[index % Math.max(1, releaseRows.length)];
    const promisedH = (release?.qcReleaseH || (index + 1) * schedule.plannedPitchH) * (index % 3 === 0 ? 0.92 : 1.08);
    const scheduledH = release?.qcReleaseH || (index + 1) * Math.max(8, schedule.releasePitchH);
    const latenessH = Math.max(0, scheduledH - promisedH);
    const priority = index % 4 === 0 ? "A" : index % 3 === 0 ? "B" : "C";
    return {
      orderId: `ORD-${String(index + 1).padStart(3, "0")}`,
      product: activeTemplate().product,
      priority,
      promisedDueH: promisedH,
      scheduledReleaseH: scheduledH,
      latenessH,
      onTime: latenessH <= (priority === "A" ? 2 : 8) ? "yes" : "risk",
      quantityKg: data.productPerBatchKg,
      customerServiceSignal: latenessH > 0 ? "review delivery promise or schedule sequence" : "on schedule",
      linkedBatch: release?.batchId || `B${String(index + 1).padStart(2, "0")}`,
    };
  });
  const inventory = [
    ...materialRows.slice(0, 14).map((row, index) => {
      const dailyDemandUsd = Math.max(1, Number(row.annualValueUsd || 0) / 365);
      const leadTimeDays = 7 + (index % 5) * 4 + (row.item.toLowerCase().includes("resin") ? 35 : 0);
      const coverageDays = Math.max(3, 12 + (index % 4) * 8 - (Number(row.perKgProductUsd || 0) > data.directCost * 0.08 ? 6 : 0));
      return {
        item: row.item,
        inventoryClass: row.costType,
        annualDemandUsd: row.annualValueUsd,
        dailyDemandUsd,
        leadTimeDays,
        coverageDays,
        reorderPointUsd: dailyDemandUsd * leadTimeDays * 1.25,
        excessInventoryRisk: coverageDays > 38 ? "high" : "normal",
        shortageRisk: coverageDays < leadTimeDays ? "risk" : "ok",
        action: coverageDays < leadTimeDays ? "raise reorder point or lock supplier delivery" : coverageDays > 38 ? "reduce stock target or batch purchasing" : "maintain policy",
      };
    }),
    {
      item: "Work in process",
      inventoryClass: "intermediate pools",
      annualDemandUsd: "",
      dailyDemandUsd: dailyProductKg,
      leadTimeDays: Math.max(1, schedule.releasePitchH / 24),
      coverageDays: Math.max(1, schedule.makespanH / 24),
      reorderPointUsd: "",
      excessInventoryRisk: schedule.makespanH > schedule.plannedPitchH * 3 ? "high" : "normal",
      shortageRisk: "not applicable",
      action: "reduce waiting, hold time, transfer delay, and QC queue to lower WIP",
    },
  ];
  const sequencing = operationRows.slice(0, 32).map((row, index) => ({
    sequenceNo: index + 1,
    batchId: row.batchId,
    operation: `${row.tag} ${row.operation}`,
    family: row.group,
    assignedResource: row.assignedEquipment,
    priority: row.status === "scheduled" ? "standard" : "expedite review",
    predecessor: row.predecessor,
    setupH: row.setupH,
    processH: row.processH,
    cleaningH: row.cleanH,
    transferEndH: row.transferEndH,
    earliestStartH: row.startH,
    finiteCapacityStatus: row.status,
    sequencingRule: row.cleanH > 0 ? "protect cleaning/release before reuse" : "run after predecessor and resource availability",
  }));
  const collaboration = [
    { role: "Planner", responsibility: "maintain finite schedule, sequence priority, and delivery promises", workspaceSignal: `${delivery.filter((row) => row.onTime === "risk").length} delivery risks` },
    { role: "Process engineer", responsibility: "resolve bottlenecks, operating limits, transfer timing, and recipe assumptions", workspaceSignal: `${capacityRiskCount} capacity or utilization risks` },
    { role: "Procurement", responsibility: "protect material availability, supplier lead time, safety stock, and substitutions", workspaceSignal: `${inventory.filter((row) => row.shortageRisk === "risk").length} material coverage risks` },
    { role: "Quality", responsibility: "release batches, assays, deviations, cleaning verification, and hold-time review", workspaceSignal: `${schedule.batchReleases.length} release events` },
    { role: "Operations", responsibility: "execute equipment state changes, cleaning, line clearance, and shift handover", workspaceSignal: `${sequencing.length} detailed sequence rows` },
  ];
  const optimizations = [
    {
      scenario: "Protect delivery promise",
      objective: "minimize lateness and priority misses",
      decisionVariables: "batch sequence, release queue priority, parallel bottleneck equipment",
      estimatedImpact: `${formatNumber(Math.max(5, 100 - onTimeTargetPct), 0)}% lateness risk reduction target`,
      tradeoff: "may increase cleaning or idle time",
    },
    {
      scenario: "Maximize resource utilization",
      objective: "reduce idle time without exceeding finite capacity",
      decisionVariables: "operation start times, shared CIP/SIP sequence, transfer-line allocation",
      estimatedImpact: `${formatNumber(Math.max(1, schedule.bottleneck.occupancyPct - 82), 1)} pt bottleneck review`,
      tradeoff: "higher utilization can reduce schedule resilience",
    },
    {
      scenario: "Minimize inventory cost",
      objective: "lower excess raw-material and WIP holding costs",
      decisionVariables: "batch size, campaign length, reorder point, supplier lead time",
      estimatedImpact: `${inventoryRiskCount} high-value material classes prioritized`,
      tradeoff: "lower stock raises supply disruption risk",
    },
    {
      scenario: "Fast replanning after deviation",
      objective: "restore feasible plan after equipment, QC, or material delay",
      decisionVariables: "resource reassignment, skipped optional steps, alternate route, overtime",
      estimatedImpact: `${capacity.filter((row) => row.capacityIssue !== "ok").length} resources recalculated`,
      tradeoff: "requires validated escalation rules",
    },
  ];
  return {
    kpis: {
      planningBasis: "APS screening module for bioprocess production planning",
      onTimeTargetPct,
      simulatedReleaseKg,
      capacityRiskCount,
      deliveryRiskCount: delivery.filter((row) => row.onTime === "risk").length,
      inventoryRiskCount: inventory.filter((row) => row.shortageRisk === "risk" || row.excessInventoryRisk === "high").length,
      planAdherencePct: Math.max(70, Math.min(99, 98 - schedule.warnings.length * 3 - capacityRiskCount * 1.4)),
      replanningCadence: schedule.warnings.length ? "shift-level replanning recommended" : "daily review sufficient",
    },
    horizons,
    capacity,
    delivery,
    inventory,
    sequencing,
    collaboration,
    optimizations,
  };
}

function apsHorizonRows() {
  return advancedPlanningSuite().horizons;
}

function apsCapacityRows() {
  return advancedPlanningSuite().capacity;
}

function apsDeliveryRows() {
  return advancedPlanningSuite().delivery;
}

function apsInventoryRows() {
  return advancedPlanningSuite().inventory;
}

function apsSequencingRows() {
  return advancedPlanningSuite().sequencing;
}

function apsCollaborationRows() {
  return advancedPlanningSuite().collaboration;
}

function apsOptimizationRows() {
  return advancedPlanningSuite().optimizations;
}

function templateExampleRows() {
  return Object.entries(templates).map(([key, template]) => ({
    exampleId: key,
    exampleName: template.label,
    product: template.product,
    description: template.description,
    unitCount: template.units.length,
    streamCount: template.streams.length,
    recommendedUse: key === "mab" ? "high-demand antibody platform walkthrough" : "original Axion screening example",
    downloadBasis: "Original Axion generated model; not a copied third-party example file",
  }));
}

function operationSequenceForUnit(unitItem) {
  const cls = unitItem.cls;
  const text = `${unitItem.type} ${unitItem.name}`.toLowerCase();
  if (cls === "Preparation") return [
    { phase: "Charge", category: "input", share: 0.18, note: "Charge WFI, raw material, buffer salts, nutrients, or formulation components." },
    { phase: "Mix and condition", category: "process", share: 0.42, note: "Agitate, dissolve, adjust pH/osmolality/conductivity, and hold inside defined limits." },
    { phase: "Transfer", category: "output", share: 0.18, note: "Transfer prepared solution to the next hygienic boundary through a scheduled line." },
    { phase: "Rinse / release", category: "cleaning", share: 0.22, note: "Rinse or CIP the preparation vessel and release it for the next batch." },
  ];
  if (cls === "Bioreactor") return [
    { phase: text.includes("seed") ? "Seed inoculation" : "Production inoculation", category: "input", share: 0.1, note: "Receive inoculum/media under sterile transfer and begin controlled culture." },
    { phase: "Culture reaction", category: "process", share: 0.58, note: "Run growth/product formation with DO, pH, temperature, feed, foam, and metabolite boundaries." },
    { phase: "Gas and feed control", category: "control", share: 0.12, note: "Schedule aeration, agitation, feed, base/acid, antifoam, and off-gas monitoring." },
    { phase: "Harvest transfer", category: "output", share: 0.1, note: "Move broth or cell suspension forward while respecting hold-time and line availability." },
    { phase: "CIP/SIP release", category: "cleaning", share: 0.1, note: "Clean, sterilize, integrity-check, and return the vessel to available state." },
  ];
  if (["Solid-liquid", "Filtration"].includes(cls)) return [
    { phase: "Pre-use check", category: "setup", share: 0.12, note: "Integrity check, wetting/conditioning, bowl or filter setup." },
    { phase: cls === "Solid-liquid" ? "Clarify / separate" : "Filter", category: "process", share: 0.52, note: "Separate solids, cells, debris, or bioburden with flux and pressure-drop limits." },
    { phase: "Wash / chase", category: "process", share: 0.16, note: "Recover product hold-up, wash retained material, and classify losses." },
    { phase: "Transfer filtrate", category: "output", share: 0.1, note: "Schedule product pool transfer into downstream hold or purification." },
    { phase: "Flush / clean", category: "cleaning", share: 0.1, note: "Flush the line, dispose or clean the assembly, and release equipment." },
  ];
  if (["Purification", "Recovery", "Separation"].includes(cls)) return [
    { phase: "Equilibrate", category: "setup", share: 0.16, note: "Prepare resin, column, solvent, or separation medium to the target condition." },
    { phase: "Load", category: "input", share: 0.28, note: "Load feed under capacity, residence-time, and breakthrough constraints." },
    { phase: "Wash / separate", category: "process", share: 0.22, note: "Remove impurities, by-products, cells, host proteins, salts, or solvent carryover." },
    { phase: "Elute / recover", category: "output", share: 0.2, note: "Recover target product or product-rich stream with yield and pool-volume tracking." },
    { phase: "Regenerate / clean", category: "cleaning", share: 0.14, note: "Regenerate media, sanitize, clean, and prepare for reuse or disposal." },
  ];
  if (cls === "Concentration") return [
    { phase: "Concentrate", category: "process", share: 0.42, note: "Concentrate product using membrane area, flux, TMP, viscosity, and fouling checks." },
    { phase: "Diafilter / exchange", category: "process", share: 0.32, note: "Exchange buffer or remove small molecules with diavolume and loss assumptions." },
    { phase: "Pool transfer", category: "output", share: 0.12, note: "Transfer retentate or concentrate to hold/formulation." },
    { phase: "Membrane flush", category: "cleaning", share: 0.14, note: "Flush, clean, store, or discard the membrane assembly." },
  ];
  if (["Thermal", "Sterilization", "Viral safety"].includes(cls)) return [
    { phase: "Ramp", category: "energy", share: 0.22, note: "Heat, cool, pressurize, or condition to target validated setpoint." },
    { phase: "Hold", category: "process", share: 0.42, note: "Maintain residence time, lethality, viral inactivation, or thermal treatment target." },
    { phase: "Recover / cool", category: "energy", share: 0.2, note: "Cool, depressurize, and recover heat where feasible." },
    { phase: "Verification", category: "quality", share: 0.16, note: "Document critical parameters, alarms, and release check." },
  ];
  if (cls === "Quality") return [
    { phase: "Sample receipt", category: "input", share: 0.18, note: "Receive IPC, release, sterility, impurity, or environmental sample." },
    { phase: "Assay / review", category: "quality", share: 0.62, note: "Execute assay, compare specification, and trigger batch-release queue." },
    { phase: "Disposition", category: "output", share: 0.2, note: "Release, hold, reject, or request additional investigation." },
  ];
  if (["Packaging", "Finishing"].includes(cls)) return [
    { phase: "Prepare line", category: "setup", share: 0.18, note: "Prepare sterile or controlled filling/packaging boundary." },
    { phase: "Fill / finish", category: "process", share: 0.54, note: "Fill, close, inspect, label, package, or palletize the product." },
    { phase: "Line clearance", category: "quality", share: 0.14, note: "Check reconciliation, rejected units, and line-clearance requirements." },
    { phase: "Clean / reset", category: "cleaning", share: 0.14, note: "Clean or change over the line for the next product or batch." },
  ];
  if (unitLayer(unitItem) === "cleaning") return [
    { phase: "Pre-rinse", category: "cleaning", share: 0.18, note: "Remove gross soil and recover or drain first-rinse load." },
    { phase: "Caustic / acid wash", category: "cleaning", share: 0.32, note: "Apply validated cleaning chemistry and contact time." },
    { phase: "Final rinse", category: "cleaning", share: 0.22, note: "Rinse to conductivity, TOC, bioburden, and residue targets." },
    { phase: "SIP / release", category: "sterility", share: 0.28, note: "Sterilize where required and release the cleaned boundary." },
  ];
  if (["Utilities", "Environmental", "Air pollution"].includes(cls)) return [
    { phase: "Demand receive", category: "input", share: 0.18, note: "Receive utility, waste, air, steam, WFI, or treatment demand from the process." },
    { phase: "Service / treat", category: "process", share: 0.58, note: "Supply, condition, recover, neutralize, treat, or abate under capacity limits." },
    { phase: "Monitor", category: "quality", share: 0.12, note: "Track conductivity, temperature, emissions, discharge, pressure, or supply quality." },
    { phase: "Return / discharge", category: "output", share: 0.12, note: "Return condensate, discharge treated waste, or release utility capacity." },
  ];
  return [
    { phase: "Receive", category: "input", share: 0.22, note: "Receive material, information, utility, or process demand." },
    { phase: "Transform", category: "process", share: 0.48, note: "Apply the unit-operation model and update balances." },
    { phase: "Transfer", category: "output", share: 0.16, note: "Send material or signal to the next process object." },
    { phase: "Release", category: "release", share: 0.14, note: "Make the unit available for the next scheduled use." },
  ];
}

function procedureOperationWorkbookRows() {
  const data = metrics();
  const orderedUnits = orderedScheduleUnits();
  return orderedUnits.flatMap((unitItem) => {
    const processH = scheduleOperationDuration(unitItem, data);
    const setupH = scheduleSetupDuration(unitItem);
    const cleanH = scheduleCleaningDuration(unitItem);
    const inputStreams = state.streams.filter((item) => item.to === unitItem.id).map((item) => item.id).join(" | ");
    const outputStreams = state.streams.filter((item) => item.from === unitItem.id).map((item) => item.id).join(" | ");
    const ics = icsCodeForUnit(unitItem);
    return operationSequenceForUnit(unitItem).map((step, index) => {
      const estimatedDurationH = step.category === "setup"
        ? setupH * Math.max(0.3, step.share)
        : step.category === "cleaning" || step.category === "sterility"
          ? Math.max(0.02, cleanH * step.share)
          : Math.max(0.03, processH * step.share);
      return {
        procedureTag: unitItem.id,
        procedureName: unitItem.name,
        equipmentClass: unitItem.cls,
        processSection: scheduleUnitGroup(unitItem),
        unitLayer: unitLayerLabel(unitLayer(unitItem)),
        icsCode: ics.code,
        icsName: ics.label,
        operationNo: index + 1,
        operationName: step.phase,
        operationCategory: step.category,
        operatingMode: unitItem.cls === "Utilities" || unitItem.cls === "Environmental" || unitItem.cls === "Air pollution" ? "continuous / demand-driven" : "batch / campaign",
        estimatedDurationH,
        setupH,
        processH,
        cleaningH: cleanH,
        inputStreams,
        outputStreams,
        balanceBasis: "linked to mass-energy balance table",
        schedulingBasis: "finite-capacity operation with reusable equipment state",
        batchSheetNote: step.note,
        standards: (unitItem.standards || []).join(" | "),
        equations: unitReactions(unitItem).map((item) => item.title).join(" | "),
      };
    });
  });
}

function resourceInventoryRows() {
  const schedule = campaignSchedule();
  const resourceByName = Object.fromEntries(schedule.resourceRows.map((item) => [item.resource, item]));
  const costByCategory = costRows().filter((item) => item.unit === "USD/yr");
  const equipmentRows = state.units.map((unitItem) => {
    const ics = icsCodeForUnit(unitItem);
    const scheduleResource = resourceByName[unitItem.id] || {};
    return {
      resourceId: unitItem.id,
      resourceName: unitItem.name,
      scope: "Main or auxiliary equipment",
      class: unitItem.cls,
      processSection: scheduleUnitGroup(unitItem),
      role: unitLayerLabel(unitLayer(unitItem)),
      icsCode: ics.code,
      quantity: recipeParallelUnits(unitItem),
      unit: "equipment set",
      batchDemand: unitSize(unitItem),
      annualDemand: state.batchCount,
      costUsdYr: "",
      occupancyPct: scheduleResource.occupancyPct || 0,
      status: scheduleResource.status || "not on critical path",
      purchaseMode: unitItem.cls === "Bioreactor" ? "design/rating review required" : "screening equipment register",
      specBasis: `${unitItem.isoName || unitItem.name}; ${unitPower(unitItem)}; ${(unitItem.standards || []).join(" | ")}`,
    };
  });
  const materialRows = costByCategory.map((row, index) => ({
    resourceId: `MAT-${String(index + 1).padStart(3, "0")}`,
    resourceName: row.item,
    scope: row.category === "Utilities" ? "Utility cost driver" : row.category === "Waste" ? "Waste treatment driver" : "Material / consumable / service",
    class: row.category,
    processSection: row.category,
    role: row.costType,
    icsCode: "",
    quantity: row.annualValueUsd || row.value,
    unit: row.unit,
    batchDemand: row.productPerBatchKg || "",
    annualDemand: row.annualValueUsd || row.value,
    costUsdYr: row.annualValueUsd || "",
    occupancyPct: "",
    status: row.confidence,
    purchaseMode: row.aggregationRole,
    specBasis: row.sourceBasis || row.note,
  }));
  return [...equipmentRows, ...materialRows, ...schedule.resourceRows.map((row, index) => ({
    resourceId: `SCH-${String(index + 1).padStart(3, "0")}`,
    resourceName: row.resource,
    scope: "Scheduling resource",
    class: row.type,
    processSection: row.type,
    role: "finite-capacity occupancy",
    icsCode: "",
    quantity: row.busyH,
    unit: "busy h per simulated campaign",
    batchDemand: row.availableH,
    annualDemand: schedule.feasibleAnnualBatches,
    costUsdYr: "",
    occupancyPct: row.occupancyPct,
    status: row.status,
    purchaseMode: "capacity / debottlenecking review",
    specBasis: "Derived from campaign schedule, reusable equipment pools, cleaning, and stream-transfer slots",
  }))];
}

function emissionsWorkbookRows() {
  const annualKg = Math.max(1, metrics().annualKg);
  const streamEmissionRows = streamRows()
    .filter((row) => row.lcaCompartment === "air" || row.lcaFlowType.includes("Waste") || /vent|offgas|co2|solvent|ethanol|ipa|spent|waste/i.test(`${row.id} ${row.components} ${row.phase}`))
    .map((row) => {
      const text = `${row.id} ${row.components} ${row.phase}`.toLowerCase();
      const method = text.includes("vent") || text.includes("offgas") || row.phase === "Gas"
        ? "vent/off-gas emission screen"
        : text.includes("solvent") || text.includes("ethanol") || text.includes("ipa")
          ? "solvent loss / recovery screen"
          : text.includes("cip") || text.includes("spent")
            ? "cleaning wastewater load"
            : "waste classification screen";
      return {
        emissionId: row.id,
        sourceType: "stream",
        source: `${row.from} -> ${row.to}`,
        sourceName: row.components,
        phase: row.phase,
        method,
        annualQuantityKg: row.annualMassKg,
        perKgProductKg: row.annualMassKg / annualKg,
        compartment: row.lcaCompartment,
        treatment: row.teaDisposition,
        screeningCo2eKgYr: row.screeningCo2eKgAnnual,
        requiredNextData: "speciation, abatement efficiency, permit limit, monitoring frequency, and site treatment factor",
        status: row.lcaCompartment === "air" ? "air review" : row.lcaFlowType.includes("Waste") ? "waste review" : "classified",
      };
    });
  const unitVentRows = state.units
    .filter((unitItem) => ["Bioreactor", "Environmental", "Air pollution", "Thermal", "Sterilization"].includes(unitItem.cls))
    .map((unitItem) => ({
      emissionId: `${unitItem.id}-EM`,
      sourceType: "unit operation",
      source: unitItem.id,
      sourceName: unitItem.name,
      phase: unitItem.cls === "Bioreactor" ? "Gas / liquid" : "Mixed",
      method: unitItem.cls === "Bioreactor" ? "respiration off-gas and foam/entrainment screen" : "utility or treatment emission screen",
      annualQuantityKg: Math.max(1, state.batchSize * state.batchCount * (unitItem.cls === "Bioreactor" ? 0.012 : 0.003)),
      perKgProductKg: Math.max(1, state.batchSize * state.batchCount * (unitItem.cls === "Bioreactor" ? 0.012 : 0.003)) / annualKg,
      compartment: unitItem.cls === "Environmental" || unitItem.cls === "Air pollution" ? "air / treatment" : "air",
      treatment: unitItem.cls === "Air pollution" ? "abatement" : "monitor / classify",
      screeningCo2eKgYr: Math.max(1, state.batchSize * state.batchCount * (unitItem.cls === "Bioreactor" ? 0.012 : 0.003)),
      requiredNextData: "measured off-gas CO2/O2/VOC, humidity, bioburden, filter retention, and abatement efficiency",
      status: "needs measured emission factors",
    }));
  return [...streamEmissionRows, ...unitVentRows];
}

function debottleneckWorkbookRows() {
  const schedule = campaignSchedule();
  const balanceByTag = Object.fromEntries(balanceRows().map((row) => [row.tag, row]));
  return schedule.resourceRows.map((row, index) => {
    const unitItem = state.units.find((item) => item.id === row.resource);
    const balance = balanceByTag[row.resource] || {};
    const sizeRisk = unitItem && Number.parseFloat(unitSize(unitItem)) > state.batchSize * 0.9 ? "check selected rating" : "screening ok";
    const action = row.status === "bottleneck"
      ? "add parallel capacity, reduce process/cleaning time, or change route"
      : row.status === "review"
        ? "inspect occupancy, dependency, transfer line, and cleaning assumptions"
        : "monitor in scenario comparisons";
    return {
      rank: index + 1,
      resource: row.resource,
      resourceType: row.type,
      linkedUnitName: unitItem?.name || "",
      class: unitItem?.cls || row.type,
      busyH: row.busyH,
      availableH: row.availableH,
      occupancyPct: row.occupancyPct,
      status: row.status,
      sizeRisk,
      massInKgBatch: balance.massInKgBatch || "",
      heatDutyKwhBatch: balance.netHeatDutyKwhBatch || "",
      power: unitItem ? unitPower(unitItem) : "",
      recommendedAction: action,
      scaleUpNote: "Review nonlinear CAPEX/OPEX, vessel working-volume limit, oxygen transfer, heat removal, and finite scheduling before increasing throughput.",
      validationNeed: "replace screening values with equipment rating, vendor curve, measured cycle time, and site calendar",
    };
  });
}

function databankWorkbookRows() {
  const equipmentTypes = [...new Map(palette.map((item) => [item.type, item])).values()].map((item) => ({
    databank: "Equipment types",
    key: item.type,
    name: item.label,
    category: item.cls,
    value: item.isoName,
    unit: "",
    status: "native Axion library",
    reviewNeed: `Add vendor sizing curve, material of construction, max rating, turndown, surface finish, and purchase-cost model. Standards: ${(item.standards || []).join(" | ")}`,
  }));
  const componentRows = Object.entries(componentProperties).map(([key, item]) => ({
    databank: "Components / mixtures",
    key,
    name: item.label,
    category: item.category,
    value: item.formula || item.classKey,
    unit: "",
    status: "screening property set",
    reviewNeed: `Cp ${item.cp}; density ${item.density}; viscosity ${item.viscosity}; source basis: ${item.source}`,
  }));
  const parameterRows = processParameters.map((item) => ({
    databank: "Process parameters",
    key: item.key,
    name: item.label,
    category: parameterGroup(item),
    value: state.params[item.key],
    unit: item.unit || "",
    status: item.custom ? "custom project parameter" : "default parameter",
    reviewNeed: "Calibrate with project data, experimental measurements, site limits, or literature assumptions before regulated use.",
  }));
  const cleaningRows = [
    ["CIP pre-rinse", "ambient or warm WFI rinse", "conductivity / visible soil endpoint"],
    ["Caustic wash", "alkaline detergent or sodium hydroxide", "validated contact time and temperature"],
    ["Intermediate rinse", "WFI/process-water rinse", "conductivity trend and carryover check"],
    ["Acid wash", "acid rinse where process requires mineral removal", "pH/conductivity endpoint"],
    ["Final rinse / SIP", "final WFI rinse and optional steam sterilization", "TOC, bioburden, endotoxin, temperature hold"],
  ].map(([name, value, reviewNeed], index) => ({
    databank: "Cleaning templates",
    key: `CIP-${String(index + 1).padStart(2, "0")}`,
    name,
    category: "CIP/SIP",
    value,
    unit: "",
    status: "editable template",
    reviewNeed,
  }));
  return [...equipmentTypes, ...componentRows, ...parameterRows, ...cleaningRows];
}

function exchangeWorkbookRows() {
  const model = comprehensiveReportShallow();
  return [
    { target: "Spreadsheet / Excel", direction: "export", payload: "streams, equipment, balances, economics, LCA, schedule", format: "CSV", status: "implemented", detail: `${model.streams} streams and ${model.units} units available as tables` },
    { target: "Project planning", direction: "export", payload: "Gantt tasks, resources, predecessors, batch releases", format: "CSV", status: "implemented", detail: "MS Project compatible task table and schedule matrix" },
    { target: "API process model", direction: "import/export", payload: "project, versions, users, units, streams, parameters, reports", format: "JSON / REST scaffold", status: "scaffold", detail: "Backend routes exist for projects/invites/payment; production API auth still needs hardening" },
    { target: "Historian / SCADA", direction: "import", payload: "DO, pH, temperature, feeds, agitation, pressure, off-gas", format: "OPC UA / MQTT / CSV", status: "planned connector", detail: "Map plant tags to dynamic profile and boundary checks" },
    { target: "CFD solver", direction: "export/import", payload: "reactor geometry, impeller, sparger, viscosity, density, OUR, mesh and field summary", format: "case package", status: "screening handoff", detail: "Browser CFD is a visual/physics screen; rigorous CFD still needs external solver or validated backend" },
    { target: "LCA software", direction: "export", payload: "inventory flows, compartments, per-batch, annual and per-kg quantities", format: "CSV", status: "implemented", detail: "Ready for OpenLCA/SimaPro mapping after supplier/site factor replacement" },
    { target: "TEA / finance model", direction: "export", payload: "cost stack, uncertainty ranges, scale exponents, physical drivers", format: "CSV", status: "implemented", detail: "Use as a screening model before quote-backed CAPEX/OPEX" },
    { target: "Documentation / QMS", direction: "export", payload: "operation workbook, batch-sheet notes, standards, equations, sources", format: "CSV / report JSON", status: "implemented workbook", detail: "Useful for engineering review, but not yet validated electronic batch record" },
  ];
}

function comprehensiveReportShallow() {
  return {
    units: state.units.length,
    streams: state.streams.length,
    parameters: processParameters.length,
    equations: equations.length,
  };
}

function routeComparisonRows() {
  return routeOptions.map((route) => {
    const schedule = campaignSchedule(route.key);
    return {
      route: route.key,
      label: route.label,
      scheduledSteps: schedule.operations.filter((item) => item.batchId === "B01").length,
      feasibleAnnualBatches: schedule.feasibleAnnualBatches,
      targetAnnualBatches: state.batchCount,
      makespanH: schedule.makespanH,
      releasePitchH: schedule.releasePitchH,
      bottleneck: schedule.bottleneck.tag,
      bottleneckOccupancyPct: schedule.bottleneck.occupancyPct,
      warnings: schedule.warnings.join("; "),
    };
  });
}

function routeTopologyRows() {
  return routeOptions.map((route) => {
    const schedule = campaignSchedule(route.key);
    const firstBatch = schedule.operations.filter((item) => item.batchId === "B01");
    const nodes = firstBatch.map((item, index) => {
      const unitItem = state.units.find((candidate) => candidate.id === item.tag);
      const branchRoute = unitItem ? recipeRoute(unitItem) : "common";
      return {
        index: index + 1,
        tag: item.tag,
        operation: item.operation,
        group: item.group,
        route: branchRoute,
        predecessor: item.predecessor,
        status: item.status,
        startH: item.startH,
        finishH: item.finishH,
        lane: branchRoute === "common" ? "shared" : "branch",
      };
    });
    const branchNodes = nodes.filter((item) => item.route === route.key);
    const sharedNodes = nodes.filter((item) => item.route === "common");
    const firstBranchIndex = branchNodes[0]?.index || 0;
    const finalSharedAfterBranch = firstBranchIndex
      ? sharedNodes.filter((item) => item.index > firstBranchIndex).at(-1)
      : sharedNodes.at(-1);
    const branchEntry = branchNodes[0] || nodes.find((item) => item.route === "common") || nodes[0];
    return {
      route: route.key,
      label: route.label,
      entry: branchEntry?.tag || "batch start",
      merge: finalSharedAfterBranch?.tag || nodes.at(-1)?.tag || "release",
      sharedSteps: sharedNodes.length,
      branchSteps: branchNodes.length,
      totalSteps: nodes.length,
      nodes,
      edges: nodes.map((item) => `${item.predecessor === "__batch_start" ? "Batch start" : item.predecessor} -> ${item.tag}`),
    };
  });
}

function routeOptimizationRows() {
  const data = metrics();
  const routeCostFactors = {
    primary: 1,
    intensified: 0.9,
    lean: 0.74,
  };
  const routeQualityFactors = {
    primary: 96,
    intensified: 91,
    lean: state.scale === "lab" || state.scale === "pilot" ? 84 : 68,
  };
  const routeSustainabilityFactors = {
    primary: 78,
    intensified: 88,
    lean: 72,
  };
  return routeOptions.map((route) => {
    const schedule = campaignSchedule(route.key);
    const topology = routeTopologyRows().find((item) => item.route === route.key);
    const capacityRatio = Math.min(1.25, schedule.feasibleAnnualBatches / Math.max(1, state.batchCount));
    const capacityScore = Math.min(100, capacityRatio * 82);
    const bottleneckScore = Math.max(0, 100 - Math.max(0, schedule.bottleneck.occupancyPct - 62) * 2.1);
    const warningScore = Math.max(0, 100 - schedule.warnings.length * 22 - schedule.violations.length * 8);
    const economyCost = data.directCost * (routeCostFactors[route.key] || 1);
    const bestCost = data.directCost * Math.min(...Object.values(routeCostFactors));
    const economicsScore = Math.max(0, Math.min(100, bestCost / Math.max(1, economyCost) * 100));
    const qualityScore = routeQualityFactors[route.key] || 80;
    const sustainabilityScore = routeSustainabilityFactors[route.key] || 75;
    const score = (
      capacityScore * 0.28
      + bottleneckScore * 0.18
      + warningScore * 0.16
      + economicsScore * 0.16
      + qualityScore * 0.14
      + sustainabilityScore * 0.08
    );
    const rationale = [
      capacityRatio < 1 ? "capacity below annual target" : "capacity target covered",
      schedule.bottleneck.occupancyPct > 92 ? "bottleneck overload" : "bottleneck acceptable",
      schedule.warnings.length ? `${schedule.warnings.length} schedule warnings` : "no major schedule warning",
      route.key === "lean" ? "lower screening cost but weaker GMP readiness" : "",
      route.key === "intensified" ? "higher parallelization and lower release pitch" : "",
    ].filter(Boolean).join("; ");
    return {
      route: route.key,
      label: route.label,
      score,
      recommendation: score >= 82 ? "recommended" : score >= 70 ? "viable" : "review",
      capacityScore,
      bottleneckScore,
      warningScore,
      economicsScore,
      qualityScore,
      sustainabilityScore,
      estimatedDirectCost: economyCost,
      feasibleAnnualBatches: schedule.feasibleAnnualBatches,
      releasePitchH: schedule.releasePitchH,
      bottleneck: schedule.bottleneck.tag,
      bottleneckOccupancyPct: schedule.bottleneck.occupancyPct,
      totalSteps: topology?.totalSteps || 0,
      branchSteps: topology?.branchSteps || 0,
      rationale,
    };
  }).sort((a, b) => b.score - a.score);
}

function plantSimulationInterfaceRows() {
  return [
    { interface: "JSON process model", direction: "import/export", status: "implemented", payload: "equipment, streams, parameters, schedules, reports", axionUse: "Native model exchange and API handoff" },
    { interface: "CSV/XLSX tables", direction: "import/export", status: "implemented", payload: "balances, costs, LCA, TEA, schedules, object library", axionUse: "Engineering, LCA, TEA, and planning handoff" },
    { interface: "CAD/JT factory geometry", direction: "import", status: "planned connector", payload: "rooms, equipment solids, layout coordinates, access zones", axionUse: "3D plant-layout calibration" },
    { interface: "MQTT sensor stream", direction: "ingest", status: "planned connector", payload: "PAT, DO, pH, temperature, agitation, airflow, pressure", axionUse: "Live digital-twin residuals and anomaly checks" },
    { interface: "OPC UA / OPC Classic", direction: "ingest/control", status: "planned connector", payload: "PLC tags, batch phase, equipment state, alarms", axionUse: "Shopfloor connection and operating envelope comparison" },
    { interface: "ODBC / SQL / Oracle", direction: "ingest/export", status: "planned connector", payload: "historian, ERP, LIMS, MES, inventory, material prices", axionUse: "Data calibration, material costs, and batch genealogy" },
    { interface: "REST API + webhooks", direction: "automation", status: "implemented scaffold", payload: "project events, model versions, simulation runs, report-ready events", axionUse: "SaaS automation and collaboration workflows" },
    { interface: "Python SDK", direction: "automation", status: "planned connector", payload: "parameter sweeps, Monte Carlo, calibration, notebooks", axionUse: "Scientific and data-science workflows" },
    { interface: "Simulation optimizer", direction: "handoff", status: "implemented scaffold", payload: "objective, variables, constraints, experiment rows", axionUse: "Genetic optimization and neural-surrogate experiments" },
    { interface: "Scheduling/MES bridge", direction: "handoff", status: "implemented scaffold", payload: "Gantt, resources, release events, equipment states", axionUse: "Production planning and repeated equipment use" },
  ];
}

function plantSimulationHierarchyRows() {
  const schedule = campaignSchedule();
  const mainUnits = state.units.filter((item) => unitLayer(item) === "main");
  const supportUnits = state.units.filter((item) => unitLayer(item) !== "main");
  const processAreas = [...new Set(state.units.map((item) => scheduleUnitGroup(item)))];
  const activeClasses = [...new Set(state.units.map((item) => item.cls))];
  return [
    { level: "L0 Global network", parent: "Enterprise", objects: 1, scope: "multi-site capacity, product portfolio, regional demand, supply chain", editableNow: "scenario assumptions and exports" },
    { level: "L1 Site / plant", parent: "Global network", objects: 1, scope: `${activeTemplate().label} plant with production, utilities, waste, QC, storage`, editableNow: "scale, annual batches, utilization, economics" },
    { level: "L2 Building / suite", parent: "Site / plant", objects: processAreas.length, scope: processAreas.join(", "), editableNow: "process-area grouping and schedule occupancy" },
    { level: "L3 Production line", parent: "Building / suite", objects: Math.max(1, routeComparisonRows().length), scope: "primary, intensified, and lean route variants", editableNow: "route branch, active steps, predecessors" },
    { level: "L4 Machine / equipment", parent: "Production line", objects: state.units.length, scope: activeClasses.join(", "), editableNow: "drag/drop, duplicate, connect, recipe times, sizing" },
    { level: "L5 Transfer / logistics", parent: "Machine / equipment", objects: state.streams.length, scope: "process streams, utility lines, waste, QC/data, release flows", editableNow: "stream connections, role, phase, mass flow" },
    { level: "L6 Resource state", parent: "Transfer / logistics", objects: schedule.resourceRows.length, scope: "equipment, buffers, operators, CIP/SIP, QC release, transfer lines", editableNow: "finite-capacity utilization and conflict exports" },
  ];
}

function plantSimulationValueStreamRows(schedule = campaignSchedule()) {
  const operations = schedule.operations;
  const processH = operations.reduce((sum, item) => sum + item.setupH + item.processH, 0);
  const transferH = operations.reduce((sum, item) => sum + Math.max(0, item.transferEndH - item.processEndH), 0);
  const cleaningH = operations.reduce((sum, item) => sum + item.cleanH, 0);
  const waitH = operations.reduce((sum, item) => sum + item.waitingH + item.lineWaitH, 0);
  const qcH = schedule.batchReleases.reduce((sum, item) => sum + Math.max(0, item.qcReleaseH - item.processCompleteH), 0);
  const total = Math.max(0.001, processH + transferH + cleaningH + waitH + qcH);
  return [
    { lane: "Value-added process", category: "process", timeH: processH, sharePct: processH / total * 100, interpretation: "reaction, growth, separation, formulation, or packaging time" },
    { lane: "Material transfer", category: "logistics", timeH: transferH, sharePct: transferH / total * 100, interpretation: "line occupancy, pumping, transfer, flush, and handoff windows" },
    { lane: "Cleaning / release", category: "cleaning", timeH: cleaningH, sharePct: cleaningH / total * 100, interpretation: "CIP/SIP, rinse, disposable assembly exchange, and equipment release" },
    { lane: "Waiting / blocked", category: "non-value", timeH: waitH, sharePct: waitH / total * 100, interpretation: "equipment wait, line wait, dependency gaps, and hold-time risk" },
    { lane: "QC release queue", category: "release", timeH: qcH, sharePct: qcH / total * 100, interpretation: "analytical release, QA queue, and batch disposition" },
  ];
}

function plantSimulationModel() {
  const data = metrics();
  const schedule = campaignSchedule();
  const streams = streamRows();
  const mainUnits = state.units.filter((item) => unitLayer(item) === "main");
  const supportUnits = state.units.filter((item) => unitLayer(item) !== "main");
  const bufferUnits = state.units.filter((item) => /buffer|hold|storage|tank|warehouse|cold|incubator/i.test(`${item.type} ${item.name} ${item.cls}`));
  const totalObjects = state.units.length + state.streams.length + schedule.resourceRows.length + plantSimulationInterfaceRows().length + routeOptions.length + 6;
  const modelTier = totalObjects <= 500 ? "Essentials-scale digital model" : totalObjects <= 4000 ? "Standard-scale digital model" : "Advanced enterprise digital model";
  const inputMass = streams.filter((item) => item.direction === "Input").reduce((sum, item) => sum + Number(item.annualMassKg || 0), 0);
  const outputMass = streams.filter((item) => item.direction === "Output").reduce((sum, item) => sum + Number(item.annualMassKg || 0), 0);
  const wasteMass = streams.filter((item) => /waste|spent|drain|reject|purge|sludge|emission/i.test(`${item.role} ${item.components} ${item.teaDisposition}`)).reduce((sum, item) => sum + Number(item.annualMassKg || 0), 0);
  const resourceAverage = schedule.resourceRows.reduce((sum, item) => sum + Number(item.occupancyPct || 0), 0) / Math.max(1, schedule.resourceRows.length);
  const logisticsIndex = Math.min(100, Math.max(0, (schedule.streamOperations.length / Math.max(1, state.streams.length * schedule.simulatedBatches)) * 100));
  const sankey = [
    { label: "Raw materials + media", role: "input", annualKg: inputMass, color: "#95c7bd" },
    { label: "Main product", role: "product", annualKg: data.annualKg, color: "#d9b96f" },
    { label: "Waste + emissions", role: "waste", annualKg: wasteMass, color: "#596a64" },
    { label: "Reusable transfers", role: "internal", annualKg: Math.max(0, streams.filter((item) => item.direction === "Internal").reduce((sum, item) => sum + Number(item.annualMassKg || 0), 0)), color: "#6f8794" },
    { label: "Final outputs", role: "output", annualKg: outputMass, color: "#275f6b" },
  ];
  const topBottlenecks = schedule.resourceRows
    .slice()
    .sort((a, b) => Number(b.occupancyPct || 0) - Number(a.occupancyPct || 0))
    .slice(0, 5);
  return {
    basis: "Axion object-oriented plant simulation layer v1",
    modelTier,
    objects: {
      totalObjects,
      equipment: state.units.length,
      streams: state.streams.length,
      resources: schedule.resourceRows.length,
      interfaces: plantSimulationInterfaceRows().length,
      hierarchyLevels: plantSimulationHierarchyRows().length,
    },
    kpis: {
      throughputKgH: data.annualKg / Math.max(1, schedule.effectiveAotH || 1),
      releasePitchH: schedule.releasePitchH,
      feasibleAnnualBatches: schedule.feasibleAnnualBatches,
      targetAnnualBatches: state.batchCount,
      resourceAveragePct: resourceAverage,
      bottleneckTag: schedule.bottleneck.tag,
      bottleneckPct: schedule.bottleneck.occupancyPct,
      logisticsIndex,
      bufferUnits: bufferUnits.length,
      mainUnits: mainUnits.length,
      supportUnits: supportUnits.length,
      nonValueTimePct: plantSimulationValueStreamRows(schedule).filter((item) => item.category === "non-value")[0]?.sharePct || 0,
    },
    hierarchy: plantSimulationHierarchyRows(),
    valueStream: plantSimulationValueStreamRows(schedule),
    sankey,
    bottlenecks: topBottlenecks,
    interfaces: plantSimulationInterfaceRows(),
  };
}

function factoryRoomRows(schedule = campaignSchedule()) {
  const groups = [...new Set(state.units.map((item) => scheduleUnitGroup(item)))];
  const resourceByArea = Object.fromEntries(schedule.resourceRows.filter((item) => item.type === "Process area").map((item) => [item.resource, item]));
  const roomMeta = {
    "Upstream": { roomType: "cell culture / fermentation suite", cleanroom: "ISO 8 / CNC support depending process", pressure: "positive to corridor", x: 8, y: 14, w: 30, h: 30 },
    "Downstream": { roomType: "purification suite", cleanroom: "ISO 8 / controlled", pressure: "positive cascade", x: 42, y: 14, w: 30, h: 30 },
    "Preparation": { roomType: "media and buffer preparation", cleanroom: "controlled support", pressure: "neutral / positive", x: 8, y: 50, w: 26, h: 26 },
    "Utilities": { roomType: "utility mezzanine", cleanroom: "technical area", pressure: "segregated", x: 70, y: 52, w: 22, h: 28 },
    "Quality": { roomType: "QC and release lab", cleanroom: "controlled lab", pressure: "segregated", x: 38, y: 52, w: 24, h: 24 },
    "Environmental": { roomType: "waste and abatement", cleanroom: "contained technical area", pressure: "negative / exhausted", x: 64, y: 18, w: 26, h: 24 },
  };
  return groups.map((group, index) => {
    const units = state.units.filter((item) => scheduleUnitGroup(item) === group);
    const resource = resourceByArea[group] || {};
    const meta = roomMeta[group] || { roomType: `${group} room`, cleanroom: "project-defined", pressure: "project-defined", x: 8 + (index % 3) * 30, y: 18 + Math.floor(index / 3) * 30, w: 24, h: 22 };
    const occupancyPct = Number(resource.occupancyPct || 0);
    return {
      roomId: `RM-${String(index + 1).padStart(2, "0")}`,
      roomName: group,
      roomType: meta.roomType,
      cleanroomClass: meta.cleanroom,
      pressureCascade: meta.pressure,
      xPct: meta.x,
      yPct: meta.y,
      widthPct: meta.w,
      heightPct: meta.h,
      equipmentCount: units.length,
      mainEquipment: units.filter((item) => unitLayer(item) === "main").map((item) => item.id).join(" | "),
      supportEquipment: units.filter((item) => unitLayer(item) !== "main").map((item) => item.id).join(" | "),
      occupancyPct,
      status: occupancyPct > 92 ? "room bottleneck" : occupancyPct > 75 ? "room review" : "available",
      editableNow: "room assignment, capacity, cleanroom class, pressure cascade, people/material flow",
    };
  });
}

function movingBatchRows(schedule = campaignSchedule()) {
  const ops = schedule.operations.filter((item) => item.batchId === "B01").slice(0, 18);
  const total = Math.max(1, schedule.makespanH);
  return ops.map((item, index) => {
    const from = index ? ops[index - 1].tag : "Raw materials";
    const x = 10 + (item.startH / total) * 72;
    const y = 24 + (index % 5) * 12;
    const duration = Math.max(4, Math.min(16, item.processH / Math.max(1, total) * 34 + 4));
    return {
      tokenId: `BT-${String(index + 1).padStart(2, "0")}`,
      batchId: item.batchId,
      from,
      to: item.tag,
      operation: item.operation,
      room: item.group,
      startH: item.startH,
      finishH: item.finishH,
      durationH: item.finishH - item.startH,
      xPct: Math.max(8, Math.min(86, x)),
      yPct: Math.max(16, Math.min(80, y)),
      animationDurationS: duration,
      status: item.status,
      contents: activeTemplate().product,
    };
  });
}

function personnelPlanRows(schedule = campaignSchedule()) {
  const shiftHours = Math.max(1, state.params.operatorShiftHours || 8);
  const operations = schedule.operations;
  const roleConfig = [
    { role: "Upstream operator", match: (item) => item.class === "Bioreactor" || item.group === "Upstream", load: 0.42 },
    { role: "Downstream operator", match: (item) => ["Downstream", "Purification"].includes(item.group) || ["Purification", "Concentration", "Recovery", "Separation"].includes(item.class), load: 0.36 },
    { role: "Utility / CIP technician", match: (item) => item.cleanH > 0 || /cip|sip|utility|steam|wfi/i.test(`${item.operation} ${item.class}`), load: 0.3 },
    { role: "QC analyst", match: (item) => item.class === "Quality" || /qc|release|sample/i.test(item.operation), load: 0.34 },
    { role: "Material handler", match: (item) => item.transferEndH > item.processEndH || /prep|buffer|media|hold/i.test(item.operation), load: 0.22 },
    { role: "Maintenance / automation", match: () => true, load: 0.08 },
  ];
  return roleConfig.map((config) => {
    const matched = operations.filter(config.match);
    const laborHours = matched.reduce((sum, item) => sum + (item.setupH + item.processH + item.cleanH) * config.load, 0);
    const fte = laborHours / Math.max(1, schedule.makespanH / shiftHours * shiftHours);
    return {
      role: config.role,
      laborHours,
      shiftHours,
      requiredFte: fte,
      assignedFteScreen: Math.max(1, Math.ceil(fte * 1.15)),
      utilizationPct: Math.min(140, fte / Math.max(1, Math.ceil(fte * 1.15)) * 100),
      linkedOperations: matched.length,
      status: fte > Math.ceil(fte * 1.15) ? "understaffed" : fte > 0.85 ? "review" : "ok",
      handoverNeed: matched.length > 16 ? "shift handover checklist required" : "standard shift note",
    };
  });
}

function inventoryLevelRows(schedule = campaignSchedule()) {
  const apsInventory = apsInventoryRows();
  return apsInventory.slice(0, 12).flatMap((item, itemIndex) => {
    const startCoverage = Number(item.coverageDays || 0);
    return Array.from({ length: 8 }, (_, bucketIndex) => {
      const day = bucketIndex * 3;
      const replenishment = bucketIndex === 4 ? Number(item.leadTimeDays || 0) * 0.65 : 0;
      const projectedCoverage = Math.max(0, startCoverage - day * 0.68 + replenishment);
      return {
        item: item.item,
        inventoryClass: item.inventoryClass,
        day,
        projectedCoverageDays: projectedCoverage,
        leadTimeDays: item.leadTimeDays,
        reorderPointUsd: item.reorderPointUsd,
        shortageRisk: projectedCoverage < Number(item.leadTimeDays || 0) * 0.55 ? "risk" : "ok",
        excessRisk: projectedCoverage > 40 ? "excess" : "normal",
        linkedPolicy: item.action,
        lane: itemIndex % 4 === 0 ? "raw material" : itemIndex % 4 === 1 ? "consumable" : itemIndex % 4 === 2 ? "utility/chemical" : "WIP",
      };
    });
  });
}

function equipmentStateMachineRows(schedule = campaignSchedule()) {
  return schedule.operations.slice(0, 80).flatMap((item) => {
    const states = [
      { state: "idle", event: "resource released", startH: Math.max(0, item.startH - Math.max(0.1, item.setupH * 0.6)), finishH: item.startH },
      { state: "setup", event: "recipe starts", startH: item.startH, finishH: item.startH + item.setupH },
      { state: "process", event: "setup complete", startH: item.startH + item.setupH, finishH: item.processEndH },
      { state: "transfer", event: "process complete", startH: item.processEndH, finishH: item.transferEndH },
      { state: item.cleanH > 0 ? "clean" : "release", event: item.cleanH > 0 ? "transfer complete" : "no cleaning required", startH: item.cleanStartH, finishH: item.cleanStartH + item.cleanH },
      { state: item.status === "scheduled" ? "available" : "blocked", event: item.status, startH: item.finishH, finishH: item.availableH },
    ];
    return states.filter((stateRow) => stateRow.finishH >= stateRow.startH).map((stateRow, index) => ({
      batchId: item.batchId,
      equipmentTag: item.tag,
      equipmentName: item.operation,
      sequence: index + 1,
      state: stateRow.state,
      triggeringEvent: stateRow.event,
      startH: stateRow.startH,
      finishH: stateRow.finishH,
      durationH: Math.max(0, stateRow.finishH - stateRow.startH),
      nextState: states[index + 1]?.state || "available",
      resourceConstraint: item.assignedEquipment,
      status: item.status,
    }));
  });
}

function factoryOptimizationRows(schedule = campaignSchedule()) {
  const data = metrics();
  const routeRows = routeOptimizationRows();
  const aps = advancedPlanningSuite(schedule);
  const options = [];
  routeRows.slice(0, 3).forEach((route) => {
    [1, 2].forEach((parallelBoost) => {
      [0.85, 1, 1.15].forEach((cipFactor) => {
        [0.9, 1, 1.12].forEach((staffFactor) => {
          const overloadPenalty = Math.max(0, aps.kpis.capacityRiskCount * 5 - (parallelBoost - 1) * 12 - (staffFactor - 1) * 18);
          const latenessPenalty = Math.max(0, aps.kpis.deliveryRiskCount * 6 - (staffFactor - 1) * 10 - (parallelBoost - 1) * 8);
          const wipPenalty = Math.max(0, plantSimulationValueStreamRows(schedule).find((item) => item.category === "non-value")?.sharePct || 0) * 0.35;
          const costPenalty = (parallelBoost - 1) * 8 + Math.abs(1 - cipFactor) * 9 + (staffFactor - 1) * 6;
          const cleaningRisk = cipFactor < 0.95 ? 8 : cipFactor > 1.05 ? 1 : 3;
          const score = Math.max(0, Math.min(100, route.score - overloadPenalty - latenessPenalty - wipPenalty - costPenalty - cleaningRisk));
          options.push({
            scenarioId: `OPT-${String(options.length + 1).padStart(3, "0")}`,
            route: route.label,
            parallelCapacityFactor: parallelBoost,
            cipTimeFactor: cipFactor,
            staffingFactor: staffFactor,
            objectiveScore: score,
            estimatedCostUsdKg: data.directCost * (1 + (parallelBoost - 1) * 0.08 + (staffFactor - 1) * 0.06 - (1 - cipFactor) * 0.03),
            estimatedReleasePitchH: Math.max(0.1, schedule.releasePitchH / parallelBoost * cipFactor / Math.max(0.85, staffFactor)),
            capacityPenalty: overloadPenalty,
            deliveryPenalty: latenessPenalty,
            wipPenalty,
            cleaningRisk,
            recommendation: score >= 82 ? "best candidate for detailed validation" : score >= 70 ? "viable candidate" : "do not prioritize",
          });
        });
      });
    });
  });
  return options.sort((a, b) => b.objectiveScore - a.objectiveScore).slice(0, 18);
}

function factoryRoomCsvRows() {
  return factoryRoomRows();
}

function movingBatchCsvRows() {
  return movingBatchRows();
}

function personnelPlanCsvRows() {
  return personnelPlanRows();
}

function inventoryLevelCsvRows() {
  return inventoryLevelRows();
}

function equipmentStateMachineCsvRows() {
  return equipmentStateMachineRows();
}

function factoryOptimizationCsvRows() {
  return factoryOptimizationRows();
}

function plantSimulationObjectRows(model = plantSimulationModel()) {
  const schedule = campaignSchedule();
  const resourceByName = Object.fromEntries(schedule.resourceRows.map((item) => [item.resource, item]));
  const unitRows = state.units.map((item) => {
    const resource = resourceByName[item.id] || {};
    return {
      objectId: item.id,
      objectKind: "Equipment object",
      objectClass: item.cls,
      parentLevel: scheduleUnitGroup(item),
      libraryClass: item.type,
      processRole: unitLayerLabel(unitLayer(item)),
      x: item.x,
      y: item.y,
      reusable: scheduleReusePolicy(item).mode,
      utilizationPct: resource.occupancyPct || 0,
      stateModel: "idle/setup/process/transfer/clean/blocked",
      inheritance: "inherits class icon, sizing, standards, default recipe and cost curve",
      editableNow: "position, duplicate, connect, timing, active state, route branch, predecessor",
      status: item.status || "Ready",
    };
  });
  const streamRowsForExport = streamRows().map((item) => {
    const resource = resourceByName[item.id] || {};
    return {
      objectId: item.id,
      objectKind: "Transfer/logistics object",
      objectClass: item.role,
      parentLevel: `${item.from} -> ${item.to}`,
      libraryClass: item.phase,
      processRole: item.direction,
      x: "",
      y: "",
      reusable: "line flush/release after transfer",
      utilizationPct: resource.occupancyPct || 0,
      stateModel: "idle/transfer/flush/blocked",
      inheritance: "inherits stream role, phase, flow class, LCA/TEA classification",
      editableNow: "source, destination, composition, phase, stream role",
      status: item.solverStatus,
    };
  });
  const hierarchyRows = model.hierarchy.map((item) => ({
    objectId: item.level,
    objectKind: "Hierarchy object",
    objectClass: item.parent,
    parentLevel: item.parent,
    libraryClass: "factory hierarchy",
    processRole: item.scope,
    x: "",
    y: "",
    reusable: "library object can instantiate child objects",
    utilizationPct: "",
    stateModel: "container",
    inheritance: "changes cascade to child instances when model libraries are connected",
    editableNow: item.editableNow,
    status: "implemented",
  }));
  return [...hierarchyRows, ...unitRows, ...streamRowsForExport];
}

function plantSimulationExperimentRows(model = plantSimulationModel()) {
  const data = metrics();
  const schedule = campaignSchedule();
  const baseCost = Math.max(1, data.directCost);
  const baseScore = routeOptimizationRows()[0]?.score || 70;
  const scenarios = [
    { id: "EXP-001", name: "Baseline finite-capacity twin", variables: "current recipe, current route, current scale", costFactor: 1, pitchFactor: 1, riskDelta: 0, co2Factor: 1, method: "deterministic event simulation" },
    { id: "EXP-002", name: "Parallel bottleneck equipment", variables: `add parallel capacity at ${model.kpis.bottleneckTag}`, costFactor: 0.92, pitchFactor: 0.72, riskDelta: -10, co2Factor: 1.05, method: "genetic optimizer candidate" },
    { id: "EXP-003", name: "Shorter CIP with verified rinse endpoint", variables: "reduce clean time 15%, keep MACO/rinse constraints", costFactor: 0.96, pitchFactor: 0.88, riskDelta: -4, co2Factor: 0.92, method: "constraint-aware experiment" },
    { id: "EXP-004", name: "Heat recovery and condensate reuse", variables: "increase heat recovery and hot rinse reuse", costFactor: 0.94, pitchFactor: 0.98, riskDelta: -2, co2Factor: 0.76, method: "energy optimization experiment" },
    { id: "EXP-005", name: "Media and feed cost reduction", variables: "media price -15%, titer unchanged, viability boundary active", costFactor: 0.86, pitchFactor: 1.02, riskDelta: 6, co2Factor: 0.93, method: "neural-surrogate screen" },
    { id: "EXP-006", name: "Higher automation / lower manual queue", variables: "automation +12%, operator queue -20%", costFactor: 0.9, pitchFactor: 0.84, riskDelta: -7, co2Factor: 0.98, method: "resource utilization experiment" },
  ];
  return scenarios.map((item) => {
    const directCostUsdKg = baseCost * item.costFactor;
    const releasePitchH = Math.max(0.1, schedule.releasePitchH * item.pitchFactor);
    const feasibleAnnualBatches = Math.floor(schedule.feasibleAnnualBatches / Math.max(0.25, item.pitchFactor));
    const objectiveScore = Math.max(0, Math.min(100, baseScore + (1 - item.costFactor) * 70 + (1 - item.pitchFactor) * 35 - item.riskDelta * 0.35 + (1 - item.co2Factor) * 20));
    return {
      experimentId: item.id,
      experimentName: item.name,
      variables: item.variables,
      method: item.method,
      objective: "minimize COGS + CO2e + release pitch + boundary risk while preserving yield",
      directCostUsdKg,
      releasePitchH,
      feasibleAnnualBatches,
      bottleneck: model.kpis.bottleneckTag,
      estimatedCo2eFactor: item.co2Factor,
      riskDeltaPoints: item.riskDelta,
      objectiveScore,
      recommendation: objectiveScore >= 82 ? "run detailed validation" : objectiveScore >= 70 ? "keep as candidate" : "screen out or revise constraints",
      constraints: "mass closure, hold time, oxygen transfer, ammonia/lactate, cleaning, QC release, resource occupancy",
    };
  }).sort((a, b) => b.objectiveScore - a.objectiveScore);
}

function plantSimulationSvg() {
  const width = 1280;
  const height = 720;
  const maxX = Math.max(1, ...state.units.map((item) => item.x + unitWidth(item)));
  const maxY = Math.max(1, ...state.units.map((item) => item.y + unitHeight(item)));
  const scale = Math.min((width - 170) / maxX, (height - 170) / maxY);
  const offsetX = 84;
  const offsetY = 108;
  const colorForLayer = (layer) => ({
    main: "#0f5a52",
    support: "#5d707b",
    utility: "#275f6b",
    cleaning: "#95c7bd",
    waste: "#596a64",
    data: "#d9b96f",
  }[layer] || "#526271");
  const streams = state.streams.slice(0, 90).map((item) => {
    const from = state.units.find((unitItem) => unitItem.id === item.from);
    const to = state.units.find((unitItem) => unitItem.id === item.to);
    if (!from || !to) return "";
    const layer = streamKind(item, from, to);
    const x1 = offsetX + (from.x + unitWidth(from)) * scale;
    const y1 = offsetY + unitMidline(from) * scale;
    const x2 = offsetX + to.x * scale;
    const y2 = offsetY + unitMidline(to) * scale;
    const color = layer === "waste" ? "#596a64" : layer === "utility" ? "#6f8794" : layer === "qc" ? "#d9b96f" : "#95c7bd";
    return `<path d="M${formatNumber(x1, 1)} ${formatNumber(y1, 1)} L${formatNumber(x2, 1)} ${formatNumber(y2, 1)}" fill="none" stroke="${color}" stroke-width="${layer === "main" ? 4 : 2.4}" opacity="0.72" marker-end="url(#arrow)"/>`;
  }).join("");
  const units = state.units.slice(0, 90).map((item) => {
    const layer = unitLayer(item);
    const x = offsetX + item.x * scale;
    const y = offsetY + item.y * scale;
    const w = unitWidth(item) * scale;
    const h = unitHeight(item) * scale;
    const color = colorForLayer(layer);
    return `
      <g>
        <rect x="${formatNumber(x, 1)}" y="${formatNumber(y, 1)}" width="${formatNumber(w, 1)}" height="${formatNumber(h, 1)}" rx="18" fill="#f7faf9" stroke="${color}" stroke-width="2"/>
        <rect x="${formatNumber(x + 12, 1)}" y="${formatNumber(y + 14, 1)}" width="${formatNumber(Math.min(48, w * 0.22), 1)}" height="${formatNumber(Math.min(48, h * 0.48), 1)}" rx="14" fill="${color}"/>
        <text x="${formatNumber(x + Math.min(74, w * 0.32), 1)}" y="${formatNumber(y + 32, 1)}" fill="#102033" font-family="Manrope, Arial, sans-serif" font-size="16" font-weight="800">${svgEscape(item.id)}</text>
        <text x="${formatNumber(x + Math.min(74, w * 0.32), 1)}" y="${formatNumber(y + 52, 1)}" fill="#526271" font-family="Manrope, Arial, sans-serif" font-size="11">${svgEscape(item.name).slice(0, 28)}</text>
      </g>`;
  }).join("");
  const model = plantSimulationModel();
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Axion plant simulation layout">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="#95c7bd"/>
    </marker>
    <linearGradient id="bg" x1="0" x2="1">
      <stop offset="0" stop-color="#071a31"/>
      <stop offset="1" stop-color="#173452"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <path d="M70 94 H1210 M70 626 H1210 M70 94 V626 M1210 94 V626" fill="none" stroke="#5d707b" stroke-width="1" opacity="0.25"/>
  <g opacity="0.22">${Array.from({ length: 17 }, (_, index) => `<path d="M${70 + index * 70} 94 V626" stroke="#e7f1ef" stroke-width="1"/>`).join("")}${Array.from({ length: 8 }, (_, index) => `<path d="M70 ${136 + index * 58} H1210" stroke="#e7f1ef" stroke-width="1"/>`).join("")}</g>
  <text x="72" y="52" fill="#f4fbfa" font-family="Manrope, Arial, sans-serif" font-size="24" font-weight="900">Axion Process OS · ${svgEscape(activeTemplate().label)} plant simulation</text>
  <text x="72" y="78" fill="#b9c8cf" font-family="Manrope, Arial, sans-serif" font-size="13">${svgEscape(model.modelTier)} · ${model.objects.totalObjects} objects · ${formatNumber(model.kpis.throughputKgH, 2)} kg/h · ${svgEscape(exportDateIso().slice(0, 10))}</text>
  <g>${streams}</g>
  <g>${units}</g>
  <g font-family="Manrope, Arial, sans-serif" font-size="12" fill="#dbe8eb">
    <rect x="72" y="656" width="20" height="10" rx="5" fill="#0f5a52"/><text x="100" y="665">Main process</text>
    <rect x="210" y="656" width="20" height="10" rx="5" fill="#5d707b"/><text x="238" y="665">Support/logistics</text>
    <rect x="370" y="656" width="20" height="10" rx="5" fill="#275f6b"/><text x="398" y="665">Utilities</text>
    <rect x="488" y="656" width="20" height="10" rx="5" fill="#95c7bd"/><text x="516" y="665">CIP/SIP</text>
    <rect x="594" y="656" width="20" height="10" rx="5" fill="#596a64"/><text x="622" y="665">Waste/recycle</text>
    <rect x="738" y="656" width="20" height="10" rx="5" fill="#d9b96f"/><text x="766" y="665">Data/QC</text>
  </g>
</svg>`.trim();
}

function scheduleResourceRows() {
  return campaignSchedule().resourceRows.map((item) => ({
    resource: item.resource,
    type: item.type,
    busyH: item.busyH,
    availableH: item.availableH,
    occupancyPct: item.occupancyPct,
    status: item.status,
  }));
}

function recipeEditorRows() {
  const data = metrics();
  const orderedUnits = orderedScheduleUnits();
  const primaryClasses = new Set(["Preparation", "Bioreactor", "Hold", "Solid-liquid", "Filtration", "Purification", "Concentration", "Recovery", "Finishing", "Packaging", "Sterilization"]);
  const selected = state.selectedId ? orderedUnits.find((item) => item.id === state.selectedId) : null;
  const rows = orderedUnits.filter((item) => primaryClasses.has(item.cls) || unitLayer(item) === "cleaning").slice(0, 16);
  if (selected && !rows.some((item) => item.id === selected.id)) rows.unshift(selected);
  return rows.slice(0, 16).map((unitItem) => ({
    tag: unitItem.id,
    operation: unitItem.name,
    class: unitItem.cls,
    group: scheduleUnitGroup(unitItem),
    route: recipeRoute(unitItem),
    routeEnabled: recipeRouteEnabled(unitItem),
    active: recipeActive(unitItem),
    predecessor: recipePredecessor(unitItem, orderedUnits),
    baseProcessH: defaultScheduleOperationDuration(unitItem, data),
    processH: scheduleOperationDuration(unitItem, data),
    setupH: scheduleSetupDuration(unitItem),
    cleanH: scheduleCleaningDuration(unitItem),
    parallelUnits: recipeParallelUnits(unitItem),
    edited: !!state.recipeOverrides[unitItem.id],
  }));
}

function resetRecipeOverrides() {
  state.recipeOverrides = {};
  renderAll();
  showToast("Recipe timing reset");
}

function applyRecipeInput(input) {
  const unitId = input.dataset.recipeUnit;
  const field = input.dataset.recipeField;
  const unit = state.units.find((item) => item.id === unitId);
  if (!unit) return false;
  let value;
  if (field === "active") value = input.checked;
  else if (field === "predecessor") value = input.value || "__batch_start";
  else if (field === "route") value = input.value || "common";
  else value = field === "parallelUnits" ? Math.round(Number(input.value)) : Number(input.value);
  if (typeof value === "number" && !Number.isFinite(value)) return false;
  state.recipeOverrides[unitId] = { ...(state.recipeOverrides[unitId] || {}), [field]: value };
  return true;
}

function sparklinePath(rows, key, width = 420, height = 112) {
  const values = rows.map((row) => Number(row[key]) || 0);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(0.0001, max - min);
  return values.map((value, index) => {
    const x = values.length === 1 ? 0 : (index / (values.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${index ? "L" : "M"}${formatNumber(x, 2)} ${formatNumber(y, 2)}`;
  }).join(" ");
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

function classifyInventoryStream(item, from, to) {
  const text = `${item.id} ${item.composition} ${item.phase} ${from?.name || ""} ${to?.name || ""}`.toLowerCase();
  const direction = streamDirection(item);
  if (text.includes("wfi") || text.includes("water") || text.includes("rinse")) {
    return { flowType: "Water input", compartment: "technosphere", teaDisposition: "utility", factor: 0.00035, sourceBasis: "Screening water factor; replace with site WFI/process-water factor" };
  }
  if (text.includes("media") || text.includes("feed") || text.includes("glucose") || text.includes("nutrient")) {
    return { flowType: "Biochemical input", compartment: "technosphere", teaDisposition: "raw material", factor: 1.8, sourceBasis: "Screening media/raw-material factor; replace with supplier LCI" };
  }
  if (text.includes("buffer") || text.includes("salt") || text.includes("caustic") || text.includes("acid")) {
    return { flowType: "Chemical input", compartment: "technosphere", teaDisposition: "raw material", factor: 1.2, sourceBasis: "Screening chemical factor; replace with material-specific LCI" };
  }
  if (text.includes("ethanol") || text.includes("solvent") || text.includes("methanol") || text.includes("isopropanol")) {
    return { flowType: "Solvent input", compartment: "technosphere", teaDisposition: "recover or dispose", factor: 2.1, sourceBasis: "Screening solvent factor; replace with solvent-specific LCI and recovery rate" };
  }
  if (text.includes("resin") || text.includes("membrane") || text.includes("filter") || text.includes("consumable")) {
    return { flowType: "Consumable input", compartment: "technosphere", teaDisposition: "consumable", factor: 12, sourceBasis: "Screening single-use/resin factor; replace with supplier EPD" };
  }
  if (text.includes("wastewater") || text.includes("spent") || text.includes("cip drain") || text.includes("wash waste")) {
    return { flowType: "Wastewater output", compartment: "treatment", teaDisposition: "waste treatment", factor: 0.0011, sourceBasis: "Screening wastewater treatment factor; replace with site treatment model" };
  }
  if (text.includes("waste") || text.includes("biomass") || text.includes("reject") || text.includes("sludge")) {
    return { flowType: "Solid or biological waste", compartment: "treatment", teaDisposition: "waste treatment", factor: 0.25, sourceBasis: "Screening solid/biological waste factor; replace with disposal route" };
  }
  if (text.includes("co2") || text.includes("offgas") || text.includes("vent") || item.phase === "Gas") {
    return { flowType: "Air emission", compartment: "air", teaDisposition: "emission", factor: 1, sourceBasis: "Direct CO2e placeholder for gas streams; speciate off-gas for full LCA" };
  }
  if (direction === "Output") {
    return { flowType: "Product or co-product", compartment: "technosphere", teaDisposition: "product", factor: 0, sourceBasis: "Product output; burden allocated by selected TEA/LCA method" };
  }
  return { flowType: "Intermediate process stream", compartment: "internal", teaDisposition: "internal transfer", factor: 0, sourceBasis: "Internal stream; no direct inventory burden unless allocated by upstream inputs" };
}

function streamRows() {
  const solved = solveMassBalance();
  const annualKg = Math.max(1, metrics().annualKg);
  return state.streams.map((item) => {
    const from = state.units.find((candidate) => candidate.id === item.from);
    const to = state.units.find((candidate) => candidate.id === item.to);
    const kind = streamKind(item, from, to);
    const solvedStream = solved.streamMap[item.id];
    const massFlowKgBatch = solvedStream?.massFlow || streamNumericFlow(item);
    const annualMassKg = solvedStream?.annualMass || massFlowKgBatch * state.batchCount;
    const classification = classifyInventoryStream(item, from, to);
    return {
      id: item.id,
      direction: streamDirection(item),
      role: streamLabel(kind),
      lcaFlowType: classification.flowType,
      lcaCompartment: classification.compartment,
      teaDisposition: classification.teaDisposition,
      from: item.from,
      fromName: from?.name || "",
      to: item.to,
      toName: to?.name || "",
      flow: streamFlow(item),
      massFlowKgBatch,
      annualMassKg,
      perKgProductKg: annualMassKg / annualKg,
      components: solvedStream?.componentText || item.composition,
      nominalDescription: item.composition,
      phase: item.phase,
      solverStatus: solvedStream?.solverStatus || "Estimated",
      densityKgM3: solvedStream?.components ? vectorDensity(solvedStream.components) : "",
      viscosityCp: solvedStream?.components ? vectorViscosity(solvedStream.components) : "",
      osmoticIndex: solvedStream?.components ? vectorOsmoticPressure(solvedStream.components) : "",
      screeningEmissionFactorKgCo2eKg: classification.factor,
      screeningCo2eKgAnnual: annualMassKg * classification.factor,
      sourceBasis: classification.sourceBasis,
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
  if (["cipTime", "sipHold", "sterilityAssurance", "bioburden", "bioburdenLimit", "endotoxinLimit", "holdTimeLimit", "qcReleaseTime", "operatorShiftHours"].includes(item.key)) return "GMP + cleaning";
  if (["capitalScaleExponent", "labFixedBurden", "facilityPremium", "validationFactor", "automationLevel", "learningRate", "bottleneckUtil", "recycleFraction", "mediaCostPerL", "feedSupplementCostPerL", "bufferCostPerL", "resinCostPerL", "singleUseCostPerL", "qcConsumableCost", "materialLossFactor", "coldChainMaterialFactor", "materialInventoryDays"].includes(item.key)) return "Scale-up + economics";
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

function exportMetadata(kind = "Axion export") {
  return {
    exportProduct: "Axion Process OS",
    exportLogo: "Axion pixel mark",
    exportKind: kind,
    exportDate: exportDateIso(),
    scenario: `${activeTemplate().label} - ${state.scale}`,
    template: state.template,
    product: activeTemplate().product,
    generatedBy: accountName(),
    modelBasis: "Original Axion screening model; validate with site, supplier, and regulatory data before design decisions",
  };
}

function withExportMetadata(rows, kind = "Axion export") {
  const metadata = exportMetadata(kind);
  const sourceRows = rows.length ? rows : [{ empty: "" }];
  return sourceRows.map((row) => ({ ...metadata, ...row }));
}

function brandSvg(svg) {
  const width = Number(svg.match(/<svg[^>]*width="(\d+)"/)?.[1]) || 1180;
  const height = Number(svg.match(/<svg[^>]*height="(\d+)"/)?.[1]) || 720;
  const stamp = `
  <g class="axion-export-brand" font-family="Inter, Arial, sans-serif">
    <g transform="translate(${width - 214} 48)" fill="#f4f7fb">
      <rect x="0" y="10" width="8" height="8"/>
      <rect x="10" y="20" width="8" height="8"/>
      <rect x="20" y="20" width="8" height="8"/>
      <rect x="30" y="20" width="8" height="8"/>
      <rect x="40" y="20" width="8" height="8"/>
      <rect x="50" y="10" width="8" height="8"/>
      <rect x="60" y="0" width="8" height="8"/>
      <rect x="0" y="30" width="8" height="8"/>
      <rect x="10" y="30" width="8" height="8"/>
      <rect x="20" y="30" width="8" height="8"/>
      <rect x="30" y="30" width="8" height="8"/>
      <rect x="40" y="30" width="8" height="8"/>
      <rect x="50" y="40" width="8" height="8"/>
      <rect x="60" y="50" width="8" height="8"/>
      <text x="86" y="26" fill="#f4f7fb" font-size="16" font-weight="760">Axion</text>
      <text x="86" y="46" fill="#9fb0c5" font-size="11">${svgEscape(new Date().toISOString().slice(0, 10))}</text>
    </g>
    <text x="72" y="${height - 34}" fill="#75869f" font-size="12">Axion Process OS · ${svgEscape(activeTemplate().label)} · ${svgEscape(state.scale)} · generated ${svgEscape(exportDateIso())}</text>
  </g>`;
  return svg.replace("</svg>", `${stamp}\n</svg>`);
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
      <small><b>${unitLayerLabel(unitLayer(item))}</b><em>${item.cls}</em></small>
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
      showExploreDetails(line);
      renderCanvas();
    });
    if (state.selectedId === item.id) line.classList.add("selected");
    stage.appendChild(line);
    if (state.flowDetail !== "standard" || state.selectedId === item.id || kind === "main") {
      const label = document.createElement("button");
      label.className = `stream-label stream-label-${kind}${state.selectedId === item.id ? " selected" : ""}`;
      label.dataset.streamId = item.id;
      label.dataset.tooltip = streamTooltip(item, from, to, kind);
      label.style.left = `${(x1 + x2) / 2}px`;
      label.style.top = `${(y1 + y2) / 2}px`;
      const compact = state.flowDetail === "detailed" || state.flowDetail === "standard";
      label.innerHTML = compact ? `
        <b>${item.id}</b><span>${streamLabel(kind).replace(" flow", "")}</span>
      ` : `
        <b>${item.id} → ${to.id}</b><span>${streamFlow(item)} · ${item.composition}</span>
      `;
      label.addEventListener("click", () => {
        state.selectedId = item.id;
        renderEquationSpotlight();
        showExploreDetails(label);
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
      <i class="unit-port port-in" title="Input port"></i>
      <i class="unit-port port-out" title="Output port"></i>
      <span class="unit-icon" style="background:${item.color}">
        <strong>${unitSymbol(item)}</strong>
        <small>${item.icon}</small>
      </span>
      <span class="unit-body">
        <span class="unit-header">
          <h3>${item.id}</h3>
          <em class="unit-role">${unitLayerLabel(layer)}</em>
        </span>
        <p>${item.name}</p>
        <small>${unitSize(item)} · ${unitPower(item)}</small>
        ${showEquipmentMeta ? `<small class="unit-ics">${ics.code} · ${item.cls}</small>` : ""}
      </span>
      <em class="unit-pfd-tag">${item.cls}</em>
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
    showExploreDetails(node);
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
  const dynamic = dynamicBatchProfile();
  const schedule = campaignSchedule();
  const cycleRows = scheduleCycleRows();
  const streamScheduleRows = scheduleStreamRows();
  const ganttRows = scheduleGanttRows(schedule);
  const releaseRows = scheduleBatchReleaseRows(schedule);
  const utilizationRows = scheduleUtilizationMatrixRows(schedule);
  const recipeRows = recipeEditorRows();
  const routeRows = routeComparisonRows();
  const topologyRows = routeTopologyRows();
  const optimizationRows = routeOptimizationRows();
  const bestRoute = optimizationRows[0];
  const profileRows = dynamic.points;
  const washout = p.dilutionRate >= p.specificGrowth;
  const absorptionBoost = p.co2Removal / 2000;
  const groups = [...new Set(spdFunctions.map((item) => item.group))];
  const weakBalances = solved.units.filter((item) => item.closurePct < 98).slice(0, 6);
  const topFlows = [...solved.streams].sort((a, b) => b.massFlow - a.massFlow).slice(0, 6);
  const unitModels = unitMechanisticModels();
  const severityRank = { critical: 3, caution: 2, ok: 1 };
  const priorityModels = [...unitModels]
    .sort((a, b) => (severityRank[b.severity] - severityRank[a.severity]) || (a.confidence - b.confidence))
    .slice(0, 8);
  const modelRiskCount = unitModels.filter((item) => item.severity !== "ok").length;
  const modelTypes = new Set(unitModels.map((item) => item.modelType));
  const gpromsAlgorithm = gpromsAlgorithmRows();
  const pvsdParameters = pvsdParameterRows();
  const plantSim = plantSimulationModel();
  const plantExperiments = plantSimulationExperimentRows(plantSim);
  const plantObjects = plantSimulationObjectRows(plantSim);
  const aps = advancedPlanningSuite(schedule);

  els.simulationBoard.innerHTML = `
    <section class="simulation-summary">
      <article><span>Solver</span><strong>Mass + energy v1</strong></article>
      <article><span>Closure</span><strong class="${solved.totals.closurePct < 98 ? "risk" : "ok"}">${formatNumber(solved.totals.closurePct, 2)}%</strong></article>
      <article><span>Solved streams</span><strong>${solved.totals.solvedStreams}/${state.streams.length}</strong></article>
      <article><span>Recycle convergence</span><strong class="${solved.convergence.converged ? "ok" : "risk"}">${formatNumber(solved.convergence.maxRelativeDelta * 100, 3)}%</strong></article>
      <article><span>Net heat duty</span><strong>${formatNumber(solved.totals.netHeatDuty, 1)} kWh/batch</strong></article>
    </section>
    <section class="simulation-summary">
      <article><span>Mechanistic unit models</span><strong>${unitModels.length}</strong></article>
      <article><span>Model families</span><strong>${modelTypes.size}</strong></article>
      <article><span>Model review flags</span><strong class="${modelRiskCount ? "risk" : "ok"}">${modelRiskCount}</strong></article>
      <article><span>Median confidence</span><strong>${formatNumber([...unitModels].sort((a, b) => a.confidence - b.confidence)[Math.floor(unitModels.length / 2)]?.confidence || 0, 0)}%</strong></article>
      <article><span>Download</span><strong>Unit CSV</strong></article>
    </section>
    <section class="simulation-summary">
      <article><span>Campaign scheduler</span><strong>${schedule.simulatedBatches} batches</strong></article>
      <article><span>Feasible annual batches</span><strong class="${schedule.feasibleAnnualBatches < state.batchCount ? "risk" : "ok"}">${schedule.feasibleAnnualBatches}/${state.batchCount}</strong></article>
      <article><span>Release pitch</span><strong>${formatNumber(schedule.releasePitchH, 1)} h</strong></article>
      <article><span>Bottleneck</span><strong>${schedule.bottleneck.tag}</strong></article>
      <article><span>Stream slots</span><strong>${streamScheduleRows.length}</strong></article>
      <article><span>Schedule warnings</span><strong class="${schedule.warnings.length ? "risk" : "ok"}">${schedule.warnings.length}</strong></article>
    </section>
    <section class="simulation-summary">
      <article><span>Route optimizer</span><strong>${bestRoute.label}</strong></article>
      <article><span>Route score</span><strong class="${bestRoute.score < 70 ? "risk" : "ok"}">${formatNumber(bestRoute.score, 0)}/100</strong></article>
      <article><span>Route capacity</span><strong>${bestRoute.feasibleAnnualBatches}/${state.batchCount}</strong></article>
      <article><span>Branch steps</span><strong>${bestRoute.branchSteps}</strong></article>
      <article><span>Est. direct cost</span><strong>$${formatNumber(bestRoute.estimatedDirectCost, 0)}/kg</strong></article>
    </section>
    <section class="simulation-group aps-panel">
      <div class="simulation-group-heading">
        <div>
          <span>Advanced planning and scheduling</span>
          <h3>Capacity, delivery, inventory, and sequencing control</h3>
        </div>
        <strong>${formatNumber(aps.kpis.planAdherencePct, 0)}% plan adherence</strong>
      </div>
      <div class="simulation-summary aps-summary">
        <article><span>Capacity risks</span><strong class="${aps.kpis.capacityRiskCount ? "risk" : "ok"}">${aps.kpis.capacityRiskCount}</strong></article>
        <article><span>Delivery risks</span><strong class="${aps.kpis.deliveryRiskCount ? "risk" : "ok"}">${aps.kpis.deliveryRiskCount}</strong></article>
        <article><span>Inventory risks</span><strong class="${aps.kpis.inventoryRiskCount ? "risk" : "ok"}">${aps.kpis.inventoryRiskCount}</strong></article>
        <article><span>Replanning</span><strong>${aps.kpis.replanningCadence}</strong></article>
      </div>
      <div class="simulation-cards aps-cards">
        ${aps.horizons.map((item) => `
          <article class="simulation-card">
            <div><span>${item.window}</span><h4>${item.horizon}</h4></div>
            <dl>
              <dt>Question</dt><dd>${item.planningQuestion}</dd>
              <dt>Decision</dt><dd>${item.decisions}</dd>
              <dt>Cadence</dt><dd>${item.cadence}</dd>
            </dl>
            <p>${item.output}</p>
          </article>
        `).join("")}
      </div>
      <div class="aps-grid">
        <article>
          <span>Finite capacity monitor</span>
          <h4>${aps.capacity.filter((item) => item.capacityIssue !== "ok").length} resources need review</h4>
          ${aps.capacity.slice(0, 5).map((item) => `<p><b>${item.resource}</b><small>${formatNumber(item.projectedLoadPct, 0)}% projected · ${item.correctiveAction}</small></p>`).join("")}
        </article>
        <article>
          <span>Delivery performance</span>
          <h4>${aps.delivery.filter((item) => item.onTime === "yes").length}/${aps.delivery.length} orders on time</h4>
          ${aps.delivery.slice(0, 5).map((item) => `<p><b>${item.orderId}</b><small>${item.priority} priority · ${formatNumber(item.latenessH, 1)} h late · ${item.customerServiceSignal}</small></p>`).join("")}
        </article>
        <article>
          <span>Inventory and WIP</span>
          <h4>${aps.inventory.filter((item) => item.shortageRisk === "risk").length} shortage signals</h4>
          ${aps.inventory.slice(0, 5).map((item) => `<p><b>${item.item}</b><small>${formatNumber(item.coverageDays, 0)} d coverage · ${item.action}</small></p>`).join("")}
        </article>
        <article>
          <span>Optimization playbook</span>
          <h4>${aps.optimizations.length} schedule objectives</h4>
          ${aps.optimizations.map((item) => `<p><b>${item.scenario}</b><small>${item.objective}</small></p>`).join("")}
        </article>
      </div>
      <div class="report-button-row">
        <button data-download-report="aps-horizons-csv" type="button">Planning horizons CSV</button>
        <button data-download-report="aps-capacity-csv" type="button">Capacity CSV</button>
        <button data-download-report="aps-delivery-csv" type="button">Delivery CSV</button>
        <button data-download-report="aps-inventory-csv" type="button">Inventory CSV</button>
        <button data-download-report="aps-sequencing-csv" type="button">Sequencing CSV</button>
        <button data-download-report="aps-optimization-csv" type="button">Optimization CSV</button>
      </div>
    </section>
    ${renderRealtimeTelemetry(true)}
    <section class="simulation-group gproms-panel">
      <div class="simulation-group-heading">
        <div>
          <span>Advanced process modelling</span>
          <h3>gPROMS-style high-fidelity modelling path</h3>
        </div>
        <strong>${gpromsModelCapabilities.length} model capabilities</strong>
      </div>
      <div class="simulation-cards">
        ${gpromsModelCapabilities.map((item) => `
          <article class="simulation-card gproms-card">
            <div>
              <span>${item.status}</span>
              <h4>${item.name}</h4>
            </div>
            <dl>
              <dt>Inputs</dt><dd>${item.inputs}</dd>
              <dt>Output</dt><dd>${item.output}</dd>
            </dl>
            <p>${item.example}</p>
          </article>
        `).join("")}
      </div>
      <div class="equation-algorithm-panel" aria-label="Equation-oriented gPROMS simulation algorithm">
        <div class="algorithm-copy">
          <span>Convective-dispersive + PVSD workflow</span>
          <h4>Equation-oriented simulation algorithm</h4>
          <p>Axion turns the process model into a high-fidelity handoff path: define the target, choose the distributed model, set parameters and boundary conditions, discretize the PDE, run the dynamic solver, validate against data, then iterate or export.</p>
          <button data-download-report="gproms-algorithm-csv" type="button">Download algorithm CSV</button>
        </div>
        <div class="algorithm-flow">
          ${gpromsAlgorithm.map((item) => `
            <article class="${item.status.includes("review") || item.status.includes("needed") ? "warn" : ""}">
              <span>${item.stage}</span>
              <strong>${item.title}</strong>
              <small>${item.modelElement}</small>
              <code>${item.equation}</code>
              <em>${item.status} · ${item.validationMetric}</em>
            </article>
          `).join("")}
        </div>
        <div class="pvsd-parameter-grid">
          ${pvsdParameters.map((item) => `
            <article>
              <span>${escapeHtml(item.parameter)}</span>
              <strong>${escapeHtml(String(item.value))}${item.unit ? ` ${escapeHtml(item.unit)}` : ""}</strong>
              <p>${escapeHtml(item.meaning)}</p>
            </article>
          `).join("")}
        </div>
      </div>
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
      <h3>Dynamic batch profile</h3>
      <div class="simulation-cards">
        <article class="simulation-card">
          <div><span>${dynamic.basis}</span><h4>${formatNumber(dynamic.durationH, 1)} h cycle</h4></div>
          <dl>
            <dt>Final recovered</dt><dd>${formatMass(dynamic.finalRecoveredKg)}</dd>
            <dt>Peak heat</dt><dd>${formatNumber(dynamic.peakHeatKw, 1)} kW</dd>
            <dt>Min DO</dt><dd>${formatNumber(dynamic.minDoPct, 1)}%</dd>
          </dl>
          <p>${dynamic.warnings.length ? dynamic.warnings.join(" ") : "No dynamic DO, lactate, or ammonium hard warning in this screening profile."}</p>
        </article>
        <article class="simulation-card">
          <div><span>Product formation</span><h4>${formatMass(profileRows.at(-1)?.productKg || 0)}</h4></div>
          <svg viewBox="0 0 420 112" role="img" aria-label="Product and substrate profile">
            <path d="${sparklinePath(profileRows, "productKg")}" fill="none" stroke="#00a88f" stroke-width="4" />
            <path d="${sparklinePath(profileRows, "substrateGL")}" fill="none" stroke="#275f6b" stroke-width="3" opacity="0.8" />
          </svg>
          <p>Green: product. Blue-grey: substrate. Use this to see whether the selected titer, feed, and batch time are physically plausible.</p>
        </article>
        <article class="simulation-card">
          <div><span>Cell culture stress</span><h4>${formatNumber(dynamic.minDoPct, 1)}% minimum DO</h4></div>
          <svg viewBox="0 0 420 112" role="img" aria-label="DO ammonia lactate profile">
            <path d="${sparklinePath(profileRows, "dissolvedOxygenPct")}" fill="none" stroke="#4f7cff" stroke-width="4" />
            <path d="${sparklinePath(profileRows, "ammoniaMm")}" fill="none" stroke="#7b8a84" stroke-width="3" opacity="0.9" />
            <path d="${sparklinePath(profileRows, "lactateGL")}" fill="none" stroke="#275f6b" stroke-width="3" opacity="0.75" />
          </svg>
          <p>Blue: DO. Slate: ammonium. Deep cyan: lactate. Boundary cards still decide whether these values are acceptable.</p>
        </article>
        <article class="simulation-card">
          <div><span>Thermal profile</span><h4>${formatNumber(dynamic.peakHeatKw, 1)} kW peak</h4></div>
          <svg viewBox="0 0 420 112" role="img" aria-label="Heat load and cumulative energy profile">
            <path d="${sparklinePath(profileRows, "heatLoadKw")}" fill="none" stroke="#596a64" stroke-width="4" />
            <path d="${sparklinePath(profileRows, "cumulativeEnergyKwh")}" fill="none" stroke="#51606f" stroke-width="3" opacity="0.8" />
          </svg>
          <p>Graphite-green: instantaneous heat load. Grey: cumulative net energy after heat-recovery credit.</p>
        </article>
      </div>
    </section>
    <section class="simulation-group">
      <h3>Mechanistic unit-operation models</h3>
      <div class="simulation-cards">
        ${priorityModels.map((item) => `
          <article class="simulation-card">
            <div>
              <span>${item.status}</span>
              <h4>${item.tag} · ${item.modelType}</h4>
            </div>
            <dl>
              <dt>${item.keyMetric}</dt><dd>${formatNumber(item.metricValue, item.metricValue < 10 ? 2 : 1)} ${item.metricUnit}</dd>
              <dt>Confidence</dt><dd>${formatNumber(item.confidence, 0)}%</dd>
              <dt>Equation</dt><dd>${item.equation}</dd>
            </dl>
            <p>${item.warnings || item.recommendation}</p>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="simulation-group">
      <h3>Editable recipe model</h3>
      <div class="recipe-editor-panel">
        <div class="recipe-editor-copy">
          <span>Step 9/10 · topology + optimizer</span>
          <h4>Edit alternative routes before scheduling</h4>
          <p>Select the active route, assign steps to Common or route-specific branches, activate or skip steps, choose predecessors, and adjust timing. The topology map, optimizer, scheduler, and downloads update from the active branch.</p>
          <div class="route-selector" aria-label="Active process route">
            ${routeOptions.map((route) => `<button class="${state.activeRoute === route.key ? "active" : ""}" data-route-select="${route.key}" type="button"><strong>${route.label}</strong><small>${route.detail}</small></button>`).join("")}
          </div>
          <button data-recipe-reset type="button">Reset recipe model</button>
        </div>
        <div class="recipe-grid" role="table" aria-label="Editable recipe timing">
          <div class="recipe-grid-head" role="row">
            <span>Unit</span>
            <span>Active</span>
            <span>Route</span>
            <span>After</span>
            <span>Group</span>
            <span>Process h</span>
            <span>Setup h</span>
            <span>Clean h</span>
            <span>Parallel</span>
          </div>
          ${recipeRows.map((item) => `
            <div class="recipe-grid-row ${item.edited ? "edited" : ""} ${item.active ? "" : "inactive"}" role="row">
              <span><b>${item.tag}</b><small>${item.operation}</small></span>
              <label class="recipe-active"><input data-recipe-field="active" data-recipe-unit="${item.tag}" type="checkbox" ${item.active ? "checked" : ""} /><small>${item.active ? "on" : "skip"}</small></label>
              <label>
                <select data-recipe-field="route" data-recipe-unit="${item.tag}">
                  <option value="common" ${item.route === "common" ? "selected" : ""}>Common</option>
                  ${routeOptions.map((route) => `<option value="${route.key}" ${item.route === route.key ? "selected" : ""}>${route.label}</option>`).join("")}
                </select>
                <small>${item.routeEnabled ? "scheduled" : "inactive route"}</small>
              </label>
              <label>
                <select data-recipe-field="predecessor" data-recipe-unit="${item.tag}">
                  <option value="__batch_start" ${item.predecessor === "__batch_start" ? "selected" : ""}>Batch start</option>
                  ${recipeRows.filter((candidate) => candidate.tag !== item.tag).map((candidate) => `<option value="${candidate.tag}" ${item.predecessor === candidate.tag ? "selected" : ""}>${candidate.tag}</option>`).join("")}
                </select>
              </label>
              <span>${item.group}</span>
              <label><input data-recipe-field="processH" data-recipe-unit="${item.tag}" type="number" min="0.05" step="0.1" value="${item.processH.toFixed(2)}" /><small>base ${formatNumber(item.baseProcessH, 1)}</small></label>
              <label><input data-recipe-field="setupH" data-recipe-unit="${item.tag}" type="number" min="0" step="0.05" value="${item.setupH.toFixed(2)}" /></label>
              <label><input data-recipe-field="cleanH" data-recipe-unit="${item.tag}" type="number" min="0" step="0.05" value="${item.cleanH.toFixed(2)}" /></label>
              <label><input data-recipe-field="parallelUnits" data-recipe-unit="${item.tag}" type="number" min="1" max="12" step="1" value="${item.parallelUnits}" /></label>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="simulation-cards">
        ${routeRows.map((item) => `
          <article class="simulation-card">
            <div>
              <span>${state.activeRoute === item.route ? "active route" : "alternative"}</span>
              <h4>${item.label}</h4>
            </div>
            <dl>
              <dt>Steps</dt><dd>${item.scheduledSteps}</dd>
              <dt>Capacity</dt><dd>${item.feasibleAnnualBatches}/${item.targetAnnualBatches} batches/yr</dd>
              <dt>Bottleneck</dt><dd>${item.bottleneck} · ${formatNumber(item.bottleneckOccupancyPct, 1)}%</dd>
            </dl>
            <p>${item.warnings || "No major route-level scheduling warning in this screening comparison."}</p>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="simulation-group">
      <h3>Visual route topology</h3>
      <div class="route-topology-panel">
        <div class="route-topology-copy">
          <span>Step 9 · branch / merge model</span>
          <h4>${topologyRows.find((item) => item.route === state.activeRoute)?.label || "Active route"} topology</h4>
          <p>Shared nodes are common to all routes. Branch nodes are route-specific alternatives. Use this to see where the process splits, where it merges, and which units define the current route before scheduling.</p>
        </div>
        <div class="route-map-grid">
          ${topologyRows.map((route) => `
            <article class="route-lane ${state.activeRoute === route.route ? "active" : ""}">
              <header>
                <span>${state.activeRoute === route.route ? "active" : "alternative"}</span>
                <strong>${route.label}</strong>
                <small>${route.sharedSteps} shared · ${route.branchSteps} branch · merge ${route.merge}</small>
              </header>
              <div class="route-node-strip">
                ${route.nodes.slice(0, 14).map((node) => `
                  <button class="route-node ${node.lane}" data-route-node="${node.tag}" type="button" title="${escapeAttr(`${node.tag}: after ${node.predecessor === "__batch_start" ? "batch start" : node.predecessor}; ${formatNumber(node.startH, 1)}-${formatNumber(node.finishH, 1)} h`)}">
                    <b>${node.tag}</b>
                    <small>${node.group}</small>
                  </button>
                `).join("")}
              </div>
              <footer>
                <button data-route-select="${route.route}" type="button">Open route</button>
                <button data-route-assign-selected="${route.route}" type="button">Assign selected unit</button>
              </footer>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
    <section class="simulation-group">
      <h3>Automatic route optimization</h3>
      <div class="route-optimizer-grid">
        <article class="route-optimizer-hero">
          <span>Step 10 · decision engine</span>
          <h4>${bestRoute.label} is currently recommended</h4>
          <p>${bestRoute.rationale}. The score balances annual capacity, bottleneck occupancy, warnings, cost, GMP readiness, and sustainability. It is still a screening optimizer, not a validated design decision.</p>
          <button class="action-button primary" data-route-optimizer-apply="${bestRoute.route}" type="button">Apply recommended route</button>
        </article>
        ${optimizationRows.map((item) => `
          <article class="route-score-card ${item.recommendation}">
            <div>
              <span>${item.recommendation}</span>
              <h4>${item.label}</h4>
            </div>
            <strong>${formatNumber(item.score, 0)}</strong>
            <div class="score-bar" style="--score:${Math.max(0, Math.min(100, item.score))}%"></div>
            <dl>
              <dt>Capacity</dt><dd>${formatNumber(item.capacityScore, 0)}</dd>
              <dt>Bottleneck</dt><dd>${formatNumber(item.bottleneckScore, 0)}</dd>
              <dt>Economics</dt><dd>${formatNumber(item.economicsScore, 0)}</dd>
              <dt>Quality</dt><dd>${formatNumber(item.qualityScore, 0)}</dd>
            </dl>
            <p>${item.rationale}</p>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="simulation-group">
      <h3>Finite-capacity campaign schedule</h3>
      <div class="schedule-panel">
        <div class="schedule-panel-copy">
          <span>${schedule.basis}</span>
          <h4>${formatNumber(schedule.makespanH, 1)} h simulated campaign · ${formatNumber(schedule.effectiveAotH, 0)} h/yr effective AOT</h4>
          <p>${schedule.warnings.length ? schedule.warnings.join(" ") : "The selected annual batch target is inside the current finite-capacity screening schedule."} Each reusable unit follows setup → production → transfer → cleaning/release → available for the next batch.</p>
        </div>
        <div class="schedule-timeline" aria-label="First batch operation timeline">
          ${schedule.operations.filter((item) => item.batchId === "B01").slice(0, 18).map((item) => {
            const left = Math.max(0, item.startH / Math.max(1, schedule.makespanH) * 100);
            const width = Math.max(2.2, (item.finishH - item.startH) / Math.max(1, schedule.makespanH) * 100);
            const processWidth = Math.max(1, (item.processEndH - item.startH) / Math.max(1, item.finishH - item.startH) * 100);
            const transferWidth = Math.max(0, (item.transferEndH - item.processEndH) / Math.max(1, item.finishH - item.startH) * 100);
            const processEnd = Math.min(100, left + width * processWidth / 100);
            const transferEnd = Math.min(100, processEnd + width * transferWidth / 100);
            const barEnd = Math.min(100, left + width);
            return `
              <div class="schedule-row" data-schedule-status="${escapeAttr(item.status)}">
                <span>${item.tag}</span>
                <i style="--start:${left}%; --process-end:${processEnd}%; --transfer-end:${transferEnd}%; --bar-end:${barEnd}%;" title="${escapeAttr(`${item.batchId} ${item.operation}: setup/process ${formatNumber(item.startH, 1)}-${formatNumber(item.processEndH, 1)} h, transfer until ${formatNumber(item.transferEndH, 1)} h, clean ${formatNumber(item.cleanH, 1)} h, available ${formatNumber(item.availableH, 1)} h. ${item.reuseDetail}`)}"></i>
                <b>${formatNumber(item.availableH, 1)} h</b>
              </div>
            `;
          }).join("")}
          <div class="schedule-legend">
            <span><b class="legend-process"></b>setup + process</span>
            <span><b class="legend-transfer"></b>stream transfer</span>
            <span><b class="legend-clean"></b>clean/release</span>
          </div>
        </div>
      </div>
      <div class="schedule-export-actions" aria-label="Schedule exports">
        <button data-download-report="schedule-gantt-csv" type="button">Gantt CSV</button>
        <button data-download-report="schedule-msproject-csv" type="button">MS Project CSV</button>
        <button data-download-report="schedule-releases-csv" type="button">Batch releases</button>
        <button data-download-report="schedule-utilization-csv" type="button">Utilization matrix</button>
        <button data-download-report="schedule-svg" type="button">Schedule SVG</button>
        <button data-download-report="schedule-json" type="button">Schedule JSON</button>
      </div>
      <div class="advanced-schedule-board" aria-label="Advanced finite-capacity schedule workbench">
        <header>
          <div>
            <span>Batch schedule workbench</span>
            <h4>Unit procedures, resource occupancy, transfers, cleaning, and release</h4>
          </div>
          <strong>${ganttRows.length} tasks · ${releaseRows.length} releases · ${utilizationRows.filter((item) => item.status === "conflict").length} conflicts</strong>
        </header>
        <div class="advanced-schedule-table" role="table" aria-label="Gantt task table">
          <div class="advanced-schedule-head" role="row">
            <span>Batch</span><span>Task</span><span>Resource</span><span>Start</span><span>Finish</span><span>Status</span>
          </div>
          ${ganttRows.slice(0, 36).map((row) => `
            <button class="advanced-schedule-row ${row.critical === "yes" ? "critical" : ""}" data-jump-unit="${escapeAttr(row.operationTag)}" type="button" role="row" title="${escapeAttr(`${row.taskName}: ${formatNumber(row.startH, 1)}-${formatNumber(row.finishH, 1)} h`) }">
              <span>${escapeHtml(row.batchId)}</span>
              <span><b>${escapeHtml(row.operationTag)}</b> ${escapeHtml(row.phase)}</span>
              <span>${escapeHtml(row.resource)}</span>
              <span>${formatNumber(row.startH, 1)} h</span>
              <span>${formatNumber(row.finishH, 1)} h</span>
              <span>${escapeHtml(row.status)}</span>
            </button>
          `).join("")}
        </div>
        <div class="release-strip" aria-label="Batch release sequence">
          ${releaseRows.slice(0, 12).map((row) => `
            <span class="${row.releaseStatus.includes("review") ? "review" : ""}">
              <b>${escapeHtml(row.batchId)}</b>
              <small>release ${formatNumber(row.qcReleaseH, 1)} h</small>
            </span>
          `).join("")}
        </div>
      </div>
      <div class="schedule-cycles-grid">
        ${cycleRows.filter((item) => item.batchId === "B01").slice(0, 8).map((item) => `
          <article>
            <span>${escapeHtml(item.reuseMode)}</span>
            <h4>${escapeHtml(item.tag)} · ${escapeHtml(item.operation)}</h4>
            <dl>
              <dt>Production end</dt><dd>${formatNumber(item.processEndH, 1)} h</dd>
              <dt>Transfer end</dt><dd>${formatNumber(item.transferEndH, 1)} h</dd>
              <dt>Back available</dt><dd>${formatNumber(item.availableForNextBatchH, 1)} h</dd>
            </dl>
          </article>
        `).join("")}
      </div>
      <div class="schedule-stream-grid">
        ${streamScheduleRows.filter((item) => item.batchId === "B01").slice(0, 10).map((item) => `
          <article>
            <span>${escapeHtml(item.role)}</span>
            <h4>${escapeHtml(item.streamId)} · ${escapeHtml(item.from)} → ${escapeHtml(item.to)}</h4>
            <p>${escapeHtml(item.composition)}</p>
            <dl>
              <dt>Transfer</dt><dd>${formatNumber(item.transferStartH, 1)}-${formatNumber(item.transferFinishH, 1)} h</dd>
              <dt>Flush/release</dt><dd>${formatNumber(item.flushH, 2)} h</dd>
              <dt>Available</dt><dd>${formatNumber(item.availableH, 1)} h</dd>
            </dl>
          </article>
        `).join("")}
      </div>
      <div class="simulation-cards">
        ${schedule.resourceRows.slice(0, 6).map((item) => `
          <article class="simulation-card">
            <div>
              <span>${item.status}</span>
              <h4>${item.resource} · ${item.type}</h4>
            </div>
            <dl>
              <dt>Busy</dt><dd>${formatNumber(item.busyH, 1)} h</dd>
              <dt>Available</dt><dd>${formatNumber(item.availableH, 1)} h</dd>
              <dt>Occupancy</dt><dd>${formatNumber(item.occupancyPct, 1)}%</dd>
            </dl>
            <p>${item.status === "bottleneck" ? "This resource is likely capacity-limiting." : item.status === "review" ? "Review this occupancy before scaling the campaign." : "No major occupancy warning in this screening schedule."}</p>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="simulation-group plant-sim-panel">
      <div class="simulation-group-heading">
        <div>
          <span>Object-oriented plant simulation</span>
          <h3>Factory layout, material flow, logistics, experiments, and integrations</h3>
        </div>
        <strong>${plantSim.modelTier}</strong>
      </div>
      <div class="plant-sim-kpis">
        <article><span>Total objects</span><strong>${plantSim.objects.totalObjects}</strong><small>${plantSim.objects.equipment} equipment · ${plantSim.objects.streams} streams</small></article>
        <article><span>Throughput</span><strong>${formatNumber(plantSim.kpis.throughputKgH, 2)} kg/h</strong><small>${plantSim.kpis.feasibleAnnualBatches}/${plantSim.kpis.targetAnnualBatches} batches/yr</small></article>
        <article><span>Bottleneck</span><strong>${escapeHtml(plantSim.kpis.bottleneckTag)}</strong><small>${formatNumber(plantSim.kpis.bottleneckPct, 1)}% occupancy</small></article>
        <article><span>Logistics index</span><strong>${formatNumber(plantSim.kpis.logisticsIndex, 0)}%</strong><small>${plantSim.kpis.bufferUnits} buffers / hold spaces</small></article>
      </div>
      <div class="plant-layout-scene" aria-label="Object-oriented 3D-style plant simulation preview">
        <div class="plant-layout-floor">
          <div class="plant-zone zone-process">
            <span>Production zone</span>
            ${state.units.filter((item) => unitLayer(item) === "main").slice(0, 12).map((item, index) => `
              <button data-jump-unit="${escapeAttr(item.id)}" type="button" style="--x:${8 + (index % 4) * 22}%; --y:${16 + Math.floor(index / 4) * 26}%;" title="${escapeAttr(`${item.id} ${item.name}: main process equipment. Click to focus on the canvas.`)}">
                <i>${escapeHtml(item.icon)}</i><b>${escapeHtml(item.id)}</b>
              </button>
            `).join("")}
          </div>
          <div class="plant-zone zone-support">
            <span>Support, utilities, cleaning</span>
            ${state.units.filter((item) => unitLayer(item) !== "main").slice(0, 14).map((item, index) => `
              <button data-jump-unit="${escapeAttr(item.id)}" type="button" style="--x:${8 + (index % 5) * 18}%; --y:${18 + Math.floor(index / 5) * 28}%;" title="${escapeAttr(`${item.id} ${item.name}: ${unitLayerLabel(unitLayer(item))}. Click to focus on the canvas.`)}">
                <i>${escapeHtml(item.icon)}</i><b>${escapeHtml(item.id)}</b>
              </button>
            `).join("")}
          </div>
          <div class="plant-flow-line flow-a"></div>
          <div class="plant-flow-line flow-b"></div>
          <div class="plant-flow-line flow-c"></div>
        </div>
        <aside>
          <span>Live factory twin</span>
          <h4>${escapeHtml(plantSim.basis)}</h4>
          <p>Animated lines show directional material and resource movement across the current process model. Major equipment is separated from support systems so the plant reads as a logical facility, not just a row of blocks.</p>
          <button data-download-report="plant-simulation-svg" type="button">Download plant SVG</button>
        </aside>
      </div>
      <div class="plant-sim-columns">
        <article>
          <h4>Hierarchy</h4>
          <div class="plant-object-grid">
            ${plantSim.hierarchy.map((item) => `
              <button type="button" data-jump-view="${item.level.includes("Machine") || item.level.includes("Transfer") ? "flowsheet" : "overview"}" title="${escapeAttr(item.scope)}">
                <span>${escapeHtml(item.level)}</span>
                <strong>${item.objects}</strong>
                <small>${escapeHtml(item.editableNow)}</small>
              </button>
            `).join("")}
          </div>
        </article>
        <article>
          <h4>Material flow / Sankey</h4>
          <div class="sankey-bars">
            ${plantSim.sankey.map((item) => {
              const max = Math.max(...plantSim.sankey.map((row) => row.annualKg), 1);
              return `<div title="${escapeAttr(`${item.label}: ${formatNumber(item.annualKg, 0)} kg/yr`) }"><span>${escapeHtml(item.label)}</span><b style="--bar:${Math.max(4, item.annualKg / max * 100)}%; --color:${item.color};"></b><em>${formatNumber(item.annualKg, 0)} kg/yr</em></div>`;
            }).join("")}
          </div>
        </article>
      </div>
      <div class="plant-vsm-lane" aria-label="Value stream map">
        ${plantSim.valueStream.map((item) => `
          <article class="${item.category}">
            <span>${escapeHtml(item.lane)}</span>
            <strong>${formatNumber(item.sharePct, 1)}%</strong>
            <div style="--share:${Math.max(4, item.sharePct)}%;"></div>
            <p>${escapeHtml(item.interpretation)} · ${formatNumber(item.timeH, 1)} h</p>
          </article>
        `).join("")}
      </div>
      <div class="plant-experiment-grid">
        ${plantExperiments.slice(0, 6).map((item) => `
          <article>
            <span>${escapeHtml(item.method)}</span>
            <h4>${escapeHtml(item.experimentName)}</h4>
            <dl>
              <dt>Score</dt><dd>${formatNumber(item.objectiveScore, 0)}/100</dd>
              <dt>Cost</dt><dd>$${formatNumber(item.directCostUsdKg, 0)}/kg</dd>
              <dt>Pitch</dt><dd>${formatNumber(item.releasePitchH, 1)} h</dd>
            </dl>
            <p>${escapeHtml(item.recommendation)} · ${escapeHtml(item.variables)}</p>
          </article>
        `).join("")}
      </div>
      <div class="plant-integration-grid">
        ${plantSim.interfaces.map((item) => `
          <article class="${item.status.includes("implemented") ? "ready" : ""}">
            <span>${escapeHtml(item.status)}</span>
            <h4>${escapeHtml(item.interface)}</h4>
            <p>${escapeHtml(item.axionUse)}</p>
            <small>${escapeHtml(item.direction)} · ${escapeHtml(item.payload)}</small>
          </article>
        `).join("")}
      </div>
      <div class="schedule-export-actions" aria-label="Plant simulation exports">
        <button data-download-report="plant-simulation-objects-csv" type="button">Objects CSV</button>
        <button data-download-report="plant-simulation-experiments-csv" type="button">Experiments CSV</button>
        <button data-download-report="plant-simulation-interfaces-csv" type="button">Interfaces CSV</button>
        <button data-download-report="plant-simulation-svg" type="button">Plant SVG</button>
      </div>
      <p class="plant-sim-note">${plantObjects.length} object records are export-ready, including hierarchy, equipment instances, stream objects, reusable-state logic, utilization, and editable fields.</p>
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
  renderProfileMenu();
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
  const selected = activeTemplate();
  const assumptions = briefAssumptions(state.template, state.productFiles.length);
  els.startBoard.innerHTML = `
    <section class="start-hero">
      <div>
        <p>New model briefing</p>
        <h3>Describe the product. Axion builds the process workspace.</h3>
        <span>Start with the molecule, cell line or organism, target scale, quality requirements, and constraints. Axion translates the brief into an editable plant model with equipment, streams, equations, balances, scheduling, CFD screening, costs, standards, and downloads.</span>
      </div>
      <button class="action-button primary" data-build-from-brief type="button">Create workspace</button>
    </section>
    <section class="product-brief-grid">
      <article class="brief-composer">
        <label>
          <span>What should be manufactured?</span>
          <textarea id="productBriefInput" rows="8" placeholder="Example: I want to model a 10,000 L CHO monoclonal antibody process with fed-batch production, Protein A capture, viral inactivation, UF/DF, CIP/SIP, heat recovery, ammonium boundary checks, and downloadable mass balances.">${escapeAttr(state.productBrief)}</textarea>
        </label>
        <div class="brief-row">
          <label>
            <span>Initial scale assumption</span>
            <select id="productScaleSelect">
              ${Object.entries(scalePresets).map(([key, item]) => `<option value="${key}"${key === state.scale ? " selected" : ""}>${item.label}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Optional data files</span>
            <input id="productDataFiles" type="file" multiple />
          </label>
        </div>
        <button class="action-button primary" data-build-from-brief type="button">Build editable model</button>
        <div id="briefResult" class="brief-result" aria-live="polite"></div>
      </article>
      <article class="brief-model-card">
        <span>Active workspace</span>
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
          <button data-jump-view="flowsheet" type="button">Edit process canvas</button>
          <button data-jump-view="reports" type="button">Open exports</button>
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

function inviteStatusLabel(invite) {
  if (invite.status === "accepted") return "Added to project";
  if (invite.delivery === "local") return "Saved locally";
  return "Pending invite";
}

function renderInviteCard(invite) {
  const status = inviteStatusLabel(invite);
  const created = invite.createdAt ? new Date(invite.createdAt).toLocaleString() : "not sent yet";
  return `
    <article class="invite-card clickable-surface ${invite.status === "accepted" ? "accepted" : "pending"}" data-invite-card="${escapeAttr(invite.id || invite.recipient || "")}" tabindex="0" role="button" aria-label="Open invite details for ${escapeAttr(invite.recipient || "recipient")}">
      <div>
        <span>${escapeHtml(status)}</span>
        <strong>${escapeHtml(invite.recipient || "unknown recipient")}</strong>
        <p>${escapeHtml(invite.projectName || invite.projectId || "Current project")} · ${escapeHtml(invite.role || "editor")} · ${escapeHtml(invite.delivery || "recorded")}</p>
      </div>
      <dl>
        <dt>Created</dt><dd>${escapeHtml(created)}</dd>
        <dt>Delivery</dt><dd>${invite.delivery === "email" ? "Email sent" : "Stored in Axion"}</dd>
      </dl>
    </article>
  `;
}

function connectorStatusTone(status = "") {
  if (status.includes("ready") || status.includes("active")) return "ready";
  if (status.includes("scaffold") || status.includes("import")) return "partial";
  return "planned";
}

function connectorPayloads(item) {
  const byKey = {
    "legacy-simulator": ["stream table CSV", "equipment register CSV", "mass and energy balances", "economic report basis"],
    aspen: ["component list", "stream vectors", "property package assumptions", "unit operation duty table"],
    comsol: ["bioreactor geometry", "boundary conditions", "sparger and impeller metadata", "DO/nutrient target fields"],
    starccm: ["CFD case matrix", "mesh basis", "gas-liquid assumptions", "shear and oxygen transfer targets"],
    opcua: ["tag map", "sampling interval", "unit parameter binding", "live telemetry stream"],
    "osisoft-pi": ["batch historian tags", "time-series calibration data", "deviation windows", "soft-sensor input"],
    benchling: ["experiment metadata", "assay tables", "cell-line or strain records", "media and titer data"],
    limsid: ["QC assay fields", "release test metadata", "sample chain", "batch record handoff"],
  };
  return byKey[item.key] || ["stream data", "equipment metadata", "parameter set", "report export"];
}

function connectorConfigurationRows(item) {
  const authLabel = item.auth || "credential setup";
  return [
    ["Connector mode", item.status?.includes("planned") ? "Prepared handoff shell" : "Configured handoff scaffold"],
    ["Authentication", authLabel],
    ["Model source", `${state.projectName || "Current model"} · ${activeTemplate().label}`],
    ["Data contract", connectorPayloads(item).join(" + ")],
  ];
}

function connectorMappingChecks(item) {
  const streams = streamRows();
  const scheduleRows = scheduleStreamRows();
  const equationCount = equations.length;
  const payloadCount = connectorPayloads(item).length;
  const needsCredentials = /planned|connector|SDK|queue|handoff/i.test(item.status || "");
  return [
    {
      label: "Equipment register",
      value: `${state.units.length} units mapped`,
      status: state.units.length >= 12 ? "pass" : "warn",
    },
    {
      label: "Stream table",
      value: `${streams.length} process and utility streams`,
      status: streams.length >= 10 ? "pass" : "warn",
    },
    {
      label: "Equation layer",
      value: `${equationCount} equations available`,
      status: equationCount >= 40 ? "pass" : "warn",
    },
    {
      label: "Scheduling handoff",
      value: `${scheduleRows.length} stream transfer slots`,
      status: scheduleRows.length ? "pass" : "warn",
    },
    {
      label: "Payload groups",
      value: `${payloadCount} payload groups defined`,
      status: payloadCount >= 3 ? "pass" : "warn",
    },
    {
      label: "Live sync",
      value: needsCredentials ? "Needs customer credentials before activation" : "Ready for controlled export",
      status: needsCredentials ? "hold" : "pass",
    },
  ];
}

function renderConnectorWorkbench(item, payloads) {
  const result = state.connectorResults?.[item.key] || {
    mode: "configure",
    title: "Configuration workspace",
    message: "Choose Configure, Test mapping, or Export JSON. The result stays visible here so the registry feels like a real working panel.",
    rows: connectorConfigurationRows(item),
    checks: connectorMappingChecks(item),
  };
  const rows = result.rows || connectorConfigurationRows(item);
  const checks = result.checks || connectorMappingChecks(item);
  return `
    <div class="connector-workbench" aria-label="${escapeAttr(item.name)} connector workspace">
      <div class="connector-workbench-head">
        <div>
          <span>${escapeHtml(result.mode || "connector")}</span>
          <strong>${escapeHtml(result.title || "Connector workspace")}</strong>
        </div>
        <b>${escapeHtml(item.key)}</b>
      </div>
      <p>${escapeHtml(result.message || "Connector details are ready for review.")}</p>
      <div class="connector-payload-chips" aria-label="Payload groups">
        ${payloads.map((payload) => `<span>${escapeHtml(payload)}</span>`).join("")}
      </div>
      <dl class="connector-config-list">
        ${rows.map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`).join("")}
      </dl>
      <div class="connector-checks" aria-label="Mapping check results">
        ${checks.map((check) => `
          <span class="connector-check ${escapeAttr(check.status)}">
            <b>${escapeHtml(check.label)}</b>
            <small>${escapeHtml(check.value)}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function connectorRegistryItems() {
  return state.integrations.length ? state.integrations : localIntegrations();
}

function selectedConnectorItem(items = connectorRegistryItems()) {
  return items.find((item) => item.key === state.selectedIntegration) || items[0] || null;
}

function renderConnectorRegistryPanel() {
  const items = connectorRegistryItems();
  const item = selectedConnectorItem(items);
  if (!item) return "";
  const payloads = connectorPayloads(item);
  const result = state.connectorResults?.[item.key];
  return `
    <article class="connector-live-panel" aria-label="API connector registry workspace">
      <div class="connector-live-copy">
        <span>Connector workspace</span>
        <h4>${escapeHtml(item.name)}</h4>
        <p>${escapeHtml(result?.message || "Select a connector, run a mapping test, configure the data contract, or export a controlled handoff package. This panel updates immediately after every action.")}</p>
      </div>
      <div class="connector-live-actions">
        <button data-integration-action="configure" data-integration-key="${escapeAttr(item.key)}" type="button">Open configuration</button>
        <button data-integration-action="test" data-integration-key="${escapeAttr(item.key)}" type="button">Run mapping test</button>
        <button data-integration-action="export" data-integration-key="${escapeAttr(item.key)}" type="button">Download handoff JSON</button>
      </div>
      ${renderConnectorWorkbench(item, payloads)}
    </article>
  `;
}

function renderIntegrationRegistry() {
  const items = connectorRegistryItems();
  return items.map((item) => {
    const selected = state.selectedIntegration === item.key;
    const tone = connectorStatusTone(item.status || "");
    const payloads = connectorPayloads(item);
    return `
      <article class="integration-card clickable-surface ${selected ? "selected" : ""}" data-integration-card="${escapeAttr(item.key)}" tabindex="0" role="button" aria-label="Open connector ${escapeAttr(item.name)}">
        <div class="integration-head">
          <div>
            <span>${escapeHtml(item.category || "Connector")}</span>
            <h4>${escapeHtml(item.name)}</h4>
          </div>
          <b class="connector-status ${tone}">${escapeHtml(item.status || "planned")}</b>
        </div>
        <p>${escapeHtml(item.description || item.direction || "Connector definition for external process-model handoff.")}</p>
        <dl>
          <dt>Direction</dt><dd>${escapeHtml(item.direction || "model handoff")}</dd>
          <dt>Auth</dt><dd>${escapeHtml(item.auth || "credential setup")}</dd>
          <dt>Payload</dt><dd>${payloads.slice(0, 3).map(escapeHtml).join(", ")}</dd>
        </dl>
        ${selected ? renderConnectorWorkbench(item, payloads) : ""}
        <footer>
          <button data-integration-action="configure" data-integration-key="${escapeAttr(item.key)}" type="button">Configure</button>
          <button data-integration-action="test" data-integration-key="${escapeAttr(item.key)}" type="button">Test mapping</button>
          <button data-integration-action="export" data-integration-key="${escapeAttr(item.key)}" type="button">Export JSON</button>
        </footer>
      </article>
    `;
  }).join("");
}

function renderProjectsBoard() {
  if (!els.projectsBoard) return;
  const activeProject = state.projects.find((item) => item.id === state.currentProjectId);
  const openProjects = state.projects.filter((item) => !item.archived);
  const archivedProjects = state.projects.filter((item) => item.archived);
  els.projectsBoard.innerHTML = `
    <section class="projects-hero">
      <div>
        <p>Project workspace</p>
        <h3>Save models, reopen old versions, and collaborate by username or email.</h3>
        <span>Axion stores the current model as a project and keeps previous versions in an archive folder so old process models can be restored and continued later.</span>
      </div>
      <button class="action-button primary" data-save-project type="button">Save current model</button>
    </section>
    <section class="project-save-panel">
      <article>
        <span>Current project</span>
        <input id="projectNameInput" type="text" value="${escapeAttr(activeProject?.name || state.projectName || `${activeTemplate().label} model`)}" placeholder="Project name" />
        <p>${activeProject ? `Loaded project ${activeProject.id}` : "No backend project is loaded yet. Saving creates one."}</p>
        <div>
          <button data-save-project type="button">Save version</button>
          <button data-refresh-projects type="button">Refresh projects</button>
        </div>
      </article>
      <article>
        <span>Old model folder</span>
        <strong>${state.projectFolders.archivedModels || ".data/models/archive"}</strong>
        <p>Every backend save archives the previous model JSON here. Static mode uses browser localStorage as a fallback.</p>
      </article>
      <article>
        <span>Active model folder</span>
        <strong>${state.projectFolders.activeModels || ".data/models/projects"}</strong>
        <p>Each project has a current model file plus version entries for older process states.</p>
      </article>
    </section>
    <section class="project-grid">
      <div class="project-column">
        <h3>Open projects</h3>
        ${openProjects.length ? openProjects.map((project) => `
          <article class="project-card clickable-surface ${project.id === state.currentProjectId ? "active" : ""}" data-project-card="${escapeAttr(project.id)}" tabindex="0" role="button" aria-label="Open project ${escapeAttr(project.name)}">
            <div>
              <span>${project.template || "model"} · ${project.scale || "scale"}</span>
              <h4>${project.name}</h4>
              <p>${project.description || `${project.versionCount || 0} saved model versions`}</p>
            </div>
            <dl>
              <dt>Owner</dt><dd>${escapeHtml(projectOwnerLabel(project))}</dd>
              <dt>Updated</dt><dd>${project.updatedAt ? new Date(project.updatedAt).toLocaleString() : "n/a"}</dd>
              <dt>Versions</dt><dd>${project.versionCount || 0}</dd>
            </dl>
            <footer>
              <button data-load-project="${project.id}" type="button">Open</button>
              <button data-archive-project="${project.id}" type="button">Archive</button>
            </footer>
          </article>
        `).join("") : `<article class="project-card"><p>No saved backend projects yet. Save the current model to create one.</p></article>`}
      </div>
      <div class="project-column">
        <h3>Old versions</h3>
        ${state.projectVersions.length ? state.projectVersions.slice(0, 8).map((version) => `
          <article class="project-version-card clickable-surface" data-version-card="${escapeAttr(version.id)}" tabindex="0" role="button" aria-label="Open saved model version ${escapeAttr(version.label || version.id)}">
            <span>${version.label || "Saved model"}</span>
            <strong>${new Date(version.createdAt).toLocaleString()}</strong>
            <p>${version.createdBy || "user"} · ${version.summary?.units || 0} units · ${version.summary?.streams || 0} streams</p>
            <button data-restore-version="${version.id}" type="button">Restore this model</button>
          </article>
        `).join("") : `<article class="project-version-card"><p>Open a project to see its old model versions.</p></article>`}
        ${archivedProjects.length ? `<h3>Archived projects</h3>${archivedProjects.slice(0, 6).map((project) => `<article class="project-version-card clickable-surface" data-project-card="${escapeAttr(project.id)}" tabindex="0" role="button"><span>${escapeHtml(project.name)}</span><p>${project.updatedAt ? new Date(project.updatedAt).toLocaleString() : ""}</p></article>`).join("")}` : ""}
      </div>
    </section>
    <section class="collaboration-panel">
      <div>
        <p>Collaboration</p>
        <h3>${activeProject ? "Invite collaborators to this model." : "Save a project before inviting collaborators."}</h3>
        <span>${activeProject
          ? "Invite by email or username. Existing Axion users are added to the project; external recipients are stored as pending until email delivery is connected."
          : "Collaboration is project-based, so Axion first needs a saved model with an owner, version history, and a project ID."}</span>
      </div>
      <label>
        <span>Email or username</span>
        <input id="inviteRecipient" type="text" placeholder="mahmed or person@company.com" ${activeProject ? "" : "disabled"} />
      </label>
      <label>
        <span>Role</span>
        <select id="inviteRole" ${activeProject ? "" : "disabled"}>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
          <option value="owner">Owner</option>
        </select>
      </label>
      <button class="action-button primary" data-invite-collaborator type="button" ${activeProject ? "" : "disabled"}>${activeProject ? "Invite collaborator" : "Save project first"}</button>
    </section>
    <section class="project-grid">
      <div class="project-column">
        <h3>Invites</h3>
        ${state.projectInvites.length ? state.projectInvites.slice(0, 10).map(renderInviteCard).join("") : `<article class="project-version-card"><p>No invitations yet. Save a project, then invite MAhmed, KBrenner, or an external email address.</p></article>`}
      </div>
      <div class="project-column connector-column">
        <div class="connector-heading">
          <h3>API connector registry</h3>
          <p>Prepared handoff targets for simulation, CFD, historian, ELN/LIMS, and plant-data tools. Live sync needs credentials and vendor access.</p>
        </div>
        ${renderConnectorRegistryPanel()}
        ${renderIntegrationRegistry()}
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

function realtimeTelemetryRows() {
  const p = state.params;
  const data = metrics();
  const phase = Date.now() / 1000;
  const wave = (offset = 0, amplitude = 1) => Math.sin(phase * 0.85 + offset) * amplitude;
  const bioreactor = cfdReport()[0];
  const oxygenMargin = (p.kla * Math.max(1, p.doSetpoint) / 100) / Math.max(0.1, p.our || 1);
  const heatPerBatch = data.utilities * 1000 / Math.max(1, state.batchCount);
  return [
    { key: "do", label: "DO probe", value: Math.max(0, Math.min(100, p.doSetpoint + wave(0, 2.7))), unit: "% air sat.", status: oxygenMargin < 1.2 ? "risk" : oxygenMargin < 1.8 ? "watch" : "ok" },
    { key: "ph", label: "pH loop", value: p.ph + wave(1.7, 0.025), unit: "pH", status: Math.abs(p.ph - 7.1) > 0.45 ? "watch" : "ok" },
    { key: "otr", label: "OTR margin", value: oxygenMargin + wave(2.5, 0.04), unit: "x OUR", status: oxygenMargin < 1.15 ? "risk" : oxygenMargin < 1.6 ? "watch" : "ok" },
    { key: "mix", label: "Mixing time", value: cfdMixingTimeMinutes(bioreactor || { volumeL: state.batchSize }), unit: "min", status: cfdMixingTimeMinutes(bioreactor || { volumeL: state.batchSize }) > 9 ? "watch" : "ok" },
    { key: "heat", label: "Heat load", value: heatPerBatch + wave(3.1, heatPerBatch * 0.025), unit: "kWh/batch", status: heatPerBatch > 900 ? "watch" : "ok" },
    { key: "closure", label: "Mass closure", value: solveMassBalance().totals.closurePct + wave(4.2, 0.03), unit: "%", status: solveMassBalance().totals.closurePct < 98 ? "risk" : "ok" },
  ];
}

function renderRealtimeTelemetry(compact = false) {
  const rows = realtimeTelemetryRows();
  return `
    <section class="realtime-panel${compact ? " compact" : ""}" data-live-telemetry>
      <div class="realtime-head">
        <div>
          <span>Live model telemetry</span>
          <h3>Digital-twin signal layer</h3>
        </div>
        <b>refreshing</b>
      </div>
      <div class="realtime-grid">
        ${rows.map((row) => `
          <article class="realtime-tile realtime-${row.status}" data-live-key="${row.key}">
            <span>${row.label}</span>
            <strong data-live-value>${formatNumber(row.value, row.value < 10 ? 2 : 1)}</strong>
            <small>${row.unit}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function updateRealtimeTelemetry() {
  const panels = document.querySelectorAll("[data-live-telemetry]");
  if (!panels.length) return;
  const rows = realtimeTelemetryRows();
  panels.forEach((panel) => {
    rows.forEach((row) => {
      const tile = panel.querySelector(`[data-live-key="${row.key}"]`);
      if (!tile) return;
      tile.className = `realtime-tile realtime-${row.status}`;
      const value = tile.querySelector("[data-live-value]");
      if (value) value.textContent = formatNumber(row.value, row.value < 10 ? 2 : 1);
    });
  });
}

function startRealtimeTelemetry() {
  window.clearInterval(startRealtimeTelemetry.timer);
  startRealtimeTelemetry.timer = window.setInterval(updateRealtimeTelemetry, 1800);
}

const exploreSelector = [
  ".bento-card",
  ".platform-grid article",
  ".workflow-rail article",
  ".public-example-grid article",
  ".ecosystem-grid article",
  ".usecase-grid article",
  ".module-copy-grid article",
  ".review-grid article",
  ".faq-grid article",
  ".pricing-grid article",
  ".overview-grid article",
  ".overview-split article",
  ".plant-stage",
  ".plant-area",
  ".realtime-tile",
  ".simulation-card",
  ".boundary-card",
  ".source-card",
  ".standard-card",
  ".recommendation-list article",
  ".reports-grid article",
  ".cfd-score-card",
  ".cfd-metric-grid article",
  ".route-score-card",
  ".cost-row",
  "tbody tr",
].join(", ");

function enhanceInteractiveSurfaces() {
  document.querySelectorAll(exploreSelector).forEach((item) => {
    if (item.closest(".detail-drawer") || item.matches("button, a, input, textarea, select")) return;
    item.classList.add("clickable-surface");
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `Open details for ${exploreTitle(item)}`);
  });
}

function exploreTitle(item) {
  const heading = item.querySelector("h1, h2, h3, h4")?.textContent?.trim();
  const label = item.querySelector("span")?.textContent?.trim();
  const metric = item.querySelector("strong, b")?.textContent?.trim();
  const preferred = heading
    || (label && metric ? `${label}: ${metric}` : label)
    || metric
    || item.getAttribute("aria-label")
    || item.getAttribute("title")
    || item.dataset.id
    || item.textContent?.trim().split(/\s+/).slice(0, 7).join(" ")
    || "selected item";
  return preferred.replace(/\s+/g, " ").slice(0, 96);
}

function exploreEyebrow(item) {
  return item.querySelector("span, em, small")?.textContent?.trim().replace(/\s+/g, " ").slice(0, 80)
    || item.className.toString().split(/\s+/).find((name) => !["clickable-surface", "surface-pop"].includes(name))?.replaceAll("-", " ")
    || "Axion detail";
}

function exploreBody(item) {
  const parts = [
    ...Array.from(item.querySelectorAll("p")).map((node) => node.textContent.trim()),
    ...Array.from(item.querySelectorAll("dd")).map((node) => node.textContent.trim()),
    ...Array.from(item.querySelectorAll("li")).map((node) => node.textContent.trim()),
  ].filter(Boolean);
  if (parts.length) return parts.slice(0, 4).join(" ");
  return item.textContent.trim().replace(/\s+/g, " ").slice(0, 420);
}

function exploreMetrics(item) {
  const metrics = [
    ...Array.from(item.querySelectorAll("strong, b")).map((node) => node.textContent.trim()),
    ...Array.from(item.querySelectorAll("small")).map((node) => node.textContent.trim()),
  ].filter(Boolean);
  return [...new Set(metrics)].slice(0, 6);
}

function exploreContext(item) {
  const text = item.textContent.toLowerCase();
  if (text.includes("cfd") || text.includes("oxygen") || text.includes("otr") || text.includes("mixing")) return { view: "cfd", label: "Open CFD", note: "Use this when a detail depends on oxygen transfer, mixing, shear, gas hold-up, or reactor scale-up." };
  if (text.includes("lca") || text.includes("co2") || text.includes("water") || text.includes("waste")) return { view: "reports", label: "Open LCA exports", note: "This connects to inventory, impact summaries, water, waste, utilities, and downloadable CSV/SVG outputs." };
  if (text.includes("tea") || text.includes("cost") || text.includes("capex") || text.includes("price")) return { view: "economics", label: "Open economics", note: "This connects to cost stack, annual values, per-kg values, scale exponent, and uncertainty assumptions." };
  if (text.includes("gproms") || text.includes("optimization") || text.includes("parameter") || text.includes("soft sensor")) return { view: "simulation", label: "Open simulation", note: "This connects to equation-oriented modelling, parameter estimation, dynamic optimization, soft sensors, and design-space analysis." };
  if (text.includes("stream") || text.includes("flow") || text.includes("input") || text.includes("output")) return { view: "streams", label: "Open streams", note: "This connects to process streams, components, annual quantities, per-kg product values, and solver status." };
  if (text.includes("equipment") || text.includes("unit") || text.includes("reactor") || text.includes("filter")) return { view: "flowsheet", label: "Open canvas", note: "This connects to the editable flowsheet, equipment ports, stream labels, and drag/drop process building." };
  if (text.includes("source") || text.includes("standard") || text.includes("iso") || text.includes("gmp")) return { view: "sources", label: "Open sources", note: "This connects to standards, scientific references, supplier assumptions, and model-use notes." };
  return { view: "overview", label: "Open overview", note: "This is connected to the active model, its assumptions, visuals, downloads, and next-step tools." };
}

function showExploreDetails(item) {
  if (!els.detailDrawer) return;
  const projectCardId = item.dataset.projectCard;
  const versionCardId = item.dataset.versionCard;
  const inviteCardId = item.dataset.inviteCard;
  if (projectCardId && projectById(projectCardId)) {
    showProjectDetails(projectById(projectCardId));
    return;
  }
  if (versionCardId && versionById(versionCardId)) {
    showVersionDetails(versionById(versionCardId));
    return;
  }
  if (inviteCardId && inviteById(inviteCardId)) {
    showInviteDetails(inviteById(inviteCardId));
    return;
  }
  const title = exploreTitle(item);
  const body = exploreBody(item);
  const metrics = exploreMetrics(item);
  const context = exploreContext(item);
  els.detailDrawer.innerHTML = `
    <div class="detail-card">
      <button class="detail-close" data-close-detail type="button" aria-label="Close details">Close</button>
      <span>${exploreEyebrow(item)}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(body || context.note)}</p>
      ${metrics.length ? `<div class="detail-metrics">${metrics.map((metric) => `<b>${escapeHtml(metric)}</b>`).join("")}</div>` : ""}
      <div class="detail-next">
        <small>${escapeHtml(context.note)}</small>
        <button data-detail-jump="${context.view}" type="button">${context.label}</button>
      </div>
    </div>
  `;
  els.detailDrawer.classList.add("open");
}

function showProjectDetails(project) {
  if (!els.detailDrawer || !project) return;
  const collaborators = (project.collaborators || []).map((item) => `${item.principal} (${item.role})`).join(", ") || "No collaborators yet";
  els.detailDrawer.innerHTML = `
    <div class="detail-card">
      <button class="detail-close" data-close-detail type="button" aria-label="Close details">Close</button>
      <span>Project</span>
      <h3>${escapeHtml(project.name || "Untitled project")}</h3>
      <p>${escapeHtml(project.description || "Saved Axion process model with equipment, streams, balances, economics, CFD screening, and reports.")}</p>
      <dl>
        <dt>Owner</dt><dd>${escapeHtml(projectOwnerLabel(project))}</dd>
        <dt>Project ID</dt><dd>${escapeHtml(project.id)}</dd>
        <dt>Updated</dt><dd>${project.updatedAt ? new Date(project.updatedAt).toLocaleString() : "n/a"}</dd>
        <dt>Versions</dt><dd>${project.versionCount || 0}</dd>
        <dt>Collaborators</dt><dd>${escapeHtml(collaborators)}</dd>
      </dl>
      <div class="detail-actions">
        <button data-detail-load-project="${escapeAttr(project.id)}" type="button">Open project</button>
        <button data-detail-jump="projects" type="button">Stay in projects</button>
      </div>
    </div>
  `;
  els.detailDrawer.classList.add("open");
}

function showVersionDetails(version) {
  if (!els.detailDrawer || !version) return;
  els.detailDrawer.innerHTML = `
    <div class="detail-card">
      <button class="detail-close" data-close-detail type="button" aria-label="Close details">Close</button>
      <span>Archived model version</span>
      <h3>${escapeHtml(version.label || "Saved model")}</h3>
      <p>Created ${version.createdAt ? new Date(version.createdAt).toLocaleString() : "at unknown time"} by ${escapeHtml(version.createdBy || "user")}.</p>
      <dl>
        <dt>Units</dt><dd>${version.summary?.units || 0}</dd>
        <dt>Streams</dt><dd>${version.summary?.streams || 0}</dd>
        <dt>Template</dt><dd>${escapeHtml(version.summary?.template || state.template)}</dd>
        <dt>Scale</dt><dd>${escapeHtml(version.summary?.scale || state.scale)}</dd>
      </dl>
      <div class="detail-actions">
        <button data-detail-restore-version="${escapeAttr(version.id)}" type="button">Restore this version</button>
        <button data-detail-jump="reports" type="button">Open downloads</button>
      </div>
    </div>
  `;
  els.detailDrawer.classList.add("open");
}

function showInviteDetails(invite) {
  if (!els.detailDrawer || !invite) return;
  els.detailDrawer.innerHTML = `
    <div class="detail-card">
      <button class="detail-close" data-close-detail type="button" aria-label="Close details">Close</button>
      <span>${escapeHtml(inviteStatusLabel(invite))}</span>
      <h3>${escapeHtml(invite.recipient || "Collaborator")}</h3>
      <p>${escapeHtml(invite.projectName || invite.projectId || state.projectName)} · ${escapeHtml(invite.role || "editor")} access · ${escapeHtml(invite.delivery || "recorded locally")}.</p>
      <dl>
        <dt>Status</dt><dd>${escapeHtml(invite.status || "pending")}</dd>
        <dt>Role</dt><dd>${escapeHtml(invite.role || "editor")}</dd>
        <dt>Created</dt><dd>${invite.createdAt ? new Date(invite.createdAt).toLocaleString() : "not sent yet"}</dd>
        <dt>Delivery</dt><dd>${invite.delivery === "email" ? "Email sent" : "Stored in Axion"}</dd>
      </dl>
      <div class="detail-actions">
        <button data-detail-jump="projects" type="button">Back to project workspace</button>
      </div>
    </div>
  `;
  els.detailDrawer.classList.add("open");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function animateSurfaceClick(item, event) {
  item.classList.remove("surface-pop");
  void item.offsetWidth;
  item.classList.add("surface-pop");
  const pulse = document.createElement("span");
  pulse.className = "interaction-pulse";
  const rect = item.getBoundingClientRect();
  pulse.style.left = `${Math.max(0, (event?.clientX || rect.left + rect.width / 2) - rect.left)}px`;
  pulse.style.top = `${Math.max(0, (event?.clientY || rect.top + rect.height / 2) - rect.top)}px`;
  item.appendChild(pulse);
  window.setTimeout(() => pulse.remove(), 720);
  window.setTimeout(() => item.classList.remove("surface-pop"), 420);
}

function cfdCellColor(cell) {
  if (cell.risk > 0.68) return "#b8534d";
  if (cell.risk > 0.48) return "#c7922e";
  if (cell.oxygen < 0.45) return "#3e6d9c";
  if (cell.nutrient < 0.45) return "#7d6a42";
  return "#0f8f83";
}

function cfdBioreactors() {
  return state.units.filter((item) => item.cls === "Bioreactor");
}

function cfdMixingTimeMinutes(item) {
  const p = state.params;
  const volumeL = Number(item.volumeL || estimatedBioreactorVolumeL(item)) || state.batchSize;
  const scaleTerm = Math.pow(Math.max(0.05, volumeL / 1000), 0.22);
  const powerTerm = Math.max(0.25, p.agitation + p.aeration * 1.8 + p.kla / 180);
  return Math.max(0.8, 5.8 * scaleTerm / Math.sqrt(powerTerm));
}

function cfdEngineeringMetrics(unit, cells) {
  const p = state.params;
  const volumeL = estimatedBioreactorVolumeL(unit);
  const volumeM3 = Math.max(0.05, volumeL / 1000);
  const diameterM = Math.cbrt(volumeM3 / 1.6);
  const impellerM = diameterM * 0.38;
  const rpm = Math.max(28, Math.min(260, 52 + p.agitation * 18 + p.aeration * 24));
  const tipSpeed = Math.PI * impellerM * rpm / 60;
  const superficialGasVelocity = p.aeration * volumeM3 / Math.max(0.05, Math.PI * (diameterM / 2) ** 2) / 60;
  const mixingTimeMin = cfdMixingTimeMinutes({ volumeL });
  const powerDensityWm3 = p.agitation * 1000;
  const gasHoldUpPct = Math.min(18, Math.max(0.4, p.aeration * 4.6 + p.kla / 70));
  const otrMmolLh = p.kla * (p.doSetpoint / 100) * 0.21;
  const otrMargin = otrMmolLh / Math.max(0.1, p.our);
  const deadZonePct = cells.filter((cell) => cell.oxygen < 0.45 || cell.nutrient < 0.45).length / cells.length * 100;
  const shearLimit = isCellCultureTemplate() ? 1.8 : 3.5;
  const workingVolumePct = unit.type === "seed-reactor"
    ? 65
    : isCellCultureTemplate()
      ? 72
      : 80;
  return {
    diameterM,
    impellerM,
    rpm,
    tipSpeed,
    superficialGasVelocity,
    mixingTimeMin,
    powerDensityWm3,
    gasHoldUpPct,
    otrMmolLh,
    otrMargin,
    deadZonePct,
    shearLimit,
    workingVolumePct,
  };
}

function cfdScore(unit, xIndex, yIndex) {
  const p = state.params;
  const volume = estimatedBioreactorVolumeL(unit);
  const radial = Math.abs(xIndex - 5.5) / 5.5;
  const height = 1 - yIndex / 11;
  const wallPenalty = Math.min(1, radial * 1.08);
  const bottomDeadZone = yIndex > 8 ? (yIndex - 8) / 3 : 0;
  const topFoamZone = yIndex < 2 ? (2 - yIndex) / 3 : 0;
  const impellerBand = Math.min(
    Math.abs(yIndex - 4.2),
    Math.abs(yIndex - 7.1),
  );
  const circulationBoost = Math.max(0, 1 - impellerBand / 2.8) * (1 - wallPenalty * 0.36);
  const mixingPower = Math.max(0.05, p.agitation * 0.36 + p.aeration * 0.62 + p.kla / 165);
  const scalePenalty = Math.max(0, Math.log10(Math.max(100, volume) / 2000)) * 0.22;
  const oxygen = Math.max(0, Math.min(1, (p.kla * p.doSetpoint / Math.max(1, p.our * 98)) + circulationBoost * 0.18 - wallPenalty * 0.17 - bottomDeadZone * 0.22 - topFoamZone * 0.06 - scalePenalty));
  const nutrient = Math.max(0, Math.min(1, mixingPower + circulationBoost * 0.24 - wallPenalty * 0.16 - bottomDeadZone * 0.25 - scalePenalty * 0.72));
  const shear = Math.max(0, Math.min(1, p.agitation / (isCellCultureTemplate() ? 5.4 : 9.8) + circulationBoost * 0.26 - wallPenalty * 0.06 + height * 0.03));
  const risk = Math.max(0, Math.min(1, (1 - oxygen) * 0.46 + (1 - nutrient) * 0.34 + shear * (isCellCultureTemplate() ? 0.28 : 0.12)));
  return { oxygen, nutrient, shear, risk };
}

function cfdReport() {
  const units = cfdBioreactors();
  return units.map((unit) => {
    const cells = Array.from({ length: 144 }, (_, index) => cfdScore(unit, index % 12, Math.floor(index / 12)));
    const engineering = cfdEngineeringMetrics(unit, cells);
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
      engineering,
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
  const eng = selected.engineering;
  els.cfdBoard.innerHTML = `
    <section class="cfd-hero">
      <div>
        <p>Interactive bioreactor CFD workbench</p>
        <h3>${selected.id} · ${selected.name}</h3>
        <span>Screen oxygen transfer, nutrient distribution, shear, dead zones, and feed-point risk directly in the tool. The vessel is shown as a vertical stirred-tank bioreactor with horizontal impeller planes, central downflow, wall upflow, sparging, and feed-zone gradients.</span>
      </div>
      <button class="action-button primary" data-jump-view="ai" type="button">Review boundaries</button>
    </section>
    <section class="cfd-layout">
      <div class="cfd-vessel" aria-label="Bioreactor engineering visualization">
        <div class="cfd-vessel-head">
          <span>${formatNumber(selected.volumeL, 0)} L</span>
          <strong>${selected.id}</strong>
        </div>
        <div class="cfd-vessel-body" style="--working-volume:${formatNumber(eng.workingVolumePct, 1)}%;">
          <div class="cfd-headspace"><span>headspace</span></div>
          <div class="cfd-liquid-level"><span>working volume ${formatNumber(eng.workingVolumePct, 0)}%</span></div>
          <div class="cfd-baffle baffle-left"></div>
          <div class="cfd-baffle baffle-right"></div>
          <div class="cfd-baffle baffle-back"></div>
          <div class="cfd-probe probe-do" title="DO probe"></div>
          <div class="cfd-probe probe-ph" title="pH / conductivity probe"></div>
          <div class="cfd-shaft"></div>
          <div class="cfd-motor"></div>
          <div class="cfd-impeller impeller-top"><i></i><i></i><i></i><i></i></div>
          <div class="cfd-impeller impeller-bottom"><i></i><i></i><i></i><i></i></div>
          <div class="cfd-horizontal-plane plane-top"><span>horizontal impeller plane</span></div>
          <div class="cfd-horizontal-plane plane-bottom"></div>
          <div class="cfd-center-downflow"></div>
          <div class="cfd-wall-upflow wall-left"></div>
          <div class="cfd-wall-upflow wall-right"></div>
          <div class="cfd-axial-flow axial-up"></div>
          <div class="cfd-axial-flow axial-down"></div>
          <div class="cfd-circulation circulation-a"></div>
          <div class="cfd-circulation circulation-b"></div>
          <div class="cfd-gas-plume"></div>
          <div class="cfd-feed-line"></div>
          <div class="cfd-feed-zone"></div>
          <div class="cfd-sparger"><i></i><i></i><i></i><i></i><i></i></div>
          <div class="cfd-zone-label zone-top">foam / gas disengagement</div>
          <div class="cfd-zone-label zone-mid">bulk mixing</div>
          <div class="cfd-zone-label zone-bottom">sparger + dead-zone watch</div>
          <div class="cfd-map" aria-label="CFD risk heatmap">
            ${selected.cells.map((cell) => `
              <span style="--cell:${cfdCellColor(cell)}; opacity:${0.42 + cell.risk * 0.5};" title="O2 ${formatNumber(cell.oxygen * 100, 0)}%, nutrient ${formatNumber(cell.nutrient * 100, 0)}%, shear ${formatNumber(cell.shear * 100, 0)}%"></span>
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
          <article><span>Hotspots</span><strong>${hotspotCells}</strong><small>risk zones / ${selected.cells.length}</small></article>
          <article><span>Mixing time</span><strong>${formatNumber(eng.mixingTimeMin, 1)}</strong><small>min, CFD screening</small></article>
          <article><span>Tip speed</span><strong>${formatNumber(eng.tipSpeed, 2)}</strong><small>m/s, ${formatNumber(eng.rpm, 0)} rpm</small></article>
          <article><span>OTR margin</span><strong>${formatNumber(eng.otrMargin, 2)}x</strong><small>${formatNumber(eng.otrMmolLh, 2)} mmol/L/h proxy</small></article>
          <article><span>Gas hold-up</span><strong>${formatNumber(eng.gasHoldUpPct, 1)}%</strong><small>sparger/aeration proxy</small></article>
          <article><span>Working volume</span><strong>${formatNumber(eng.workingVolumePct, 0)}%</strong><small>of vessel volume, max 80% screen</small></article>
        </div>
        ${renderRealtimeTelemetry(true)}
        <div class="cfd-actions">
          <h4>Suggested engineering edits</h4>
          <ul>
            <li>${selected.lowOxygenCells ? "Review gas-flow rate, oxygen enrichment, sparger hole velocity, kLa target, and headspace pressure." : "Oxygen-transfer proxy is acceptable for this screening state."}</li>
            <li>${selected.lowNutrientCells ? "Move feed addition toward the upper circulation loop or use a ring/distributed feed manifold." : "Nutrient-distribution proxy is acceptable for this screening state."}</li>
            <li>${selected.highShearCells ? "Check impeller tip speed, power density, shear-sensitive cell limits, and whether scale-out is safer than scale-up." : "Shear proxy is acceptable for this screening state."}</li>
            <li>${eng.deadZonePct > 12 ? "Dead-zone proxy is elevated; verify baffle layout, bottom clearance, sparger ring coverage, viscosity, and probe placement." : "Dead-zone proxy is within the current screening envelope."}</li>
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
  const annualKg = Math.max(1, metrics().annualKg);
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
    annualMassInKg: item.massIn * state.batchCount,
    annualMassOutKg: item.massOut * state.batchCount,
    massInPerKgProduct: item.massIn * state.batchCount / annualKg,
    massOutPerKgProduct: item.massOut * state.batchCount / annualKg,
    closurePct: item.closurePct,
    netHeatDutyKwhBatch: item.heatDuty,
    grossHeatDutyKwhBatch: item.grossHeatDuty,
    recoveredHeatKwhBatch: item.recoveredHeat,
    annualNetHeatKwh: item.heatDuty * state.batchCount,
    annualGrossHeatKwh: item.grossHeatDuty * state.batchCount,
    netHeatPerKgProductKwhKg: item.heatDuty * state.batchCount / annualKg,
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
  const annualKg = Math.max(1, data.annualKg);
  const materialRows = data.scale.materialBreakdown?.rows || [];
  const baseRows = [
    { item: "Installed CAPEX", value: data.scale.installedCapital, unit: "USD", note: "Scaled installed capital estimate", category: "CAPEX", costType: "capital", lifetimeYears: 10, allocationBasis: "facility installed cost", confidence: "screening", aggregationRole: "capital basis" },
    { item: "Annualized CAPEX", value: data.scale.annualizedCapital, unit: "USD/yr", note: "Annualized capital charge", category: "CAPEX", costType: "annualized capital", lifetimeYears: 10, allocationBasis: "capital recovery charge", confidence: "screening", aggregationRole: "summable cost line" },
    { item: "Fixed facility burden", value: data.scale.fixedBurden, unit: "USD/yr", note: "High at lab scale; decreases non-linearly with scale", category: "Facility", costType: "fixed OPEX", lifetimeYears: "", allocationBasis: "scale profile", confidence: "screening", aggregationRole: "summable cost line" },
    { item: "Materials total", value: data.scale.materialIntensity, unit: "USD/yr", note: data.scale.materialBreakdown?.materialProfile?.note || "Media, buffers, raw materials, consumables, resin, single-use and QC consumables", category: "Materials", costType: "variable OPEX", lifetimeYears: "", allocationBasis: "itemized material cost model", confidence: "screening", aggregationRole: "rollup; do not sum with material components" },
    ...materialRows.map((row) => ({ ...row, lifetimeYears: "", confidence: "screening", aggregationRole: "material component; sum to Materials total" })),
    { item: "Labor", value: data.scale.laborCost, unit: "USD/yr", note: "Automation-adjusted labor estimate", category: "Labor", costType: "fixed OPEX", lifetimeYears: "", allocationBasis: "operation count and automation", confidence: "screening", aggregationRole: "summable cost line" },
    { item: "QA/QC validation", value: data.scale.qaCost, unit: "USD/yr", note: "GMP release, validation, and quality burden", category: "Quality", costType: "fixed OPEX", lifetimeYears: "", allocationBasis: "unit count and validation factor", confidence: "screening", aggregationRole: "summable cost line" },
    { item: "Utilities", value: data.scale.utilityCost, unit: "USD/yr", note: "Power, WFI, steam, cooling, compressed gases", category: "Utilities", costType: "variable OPEX", lifetimeYears: "", allocationBasis: "annual utility demand", confidence: "screening", aggregationRole: "summable cost line" },
    { item: "Waste", value: data.scale.wasteCost, unit: "USD/yr", note: "Wastewater, biomass, emissions, rejects", category: "Waste", costType: "variable OPEX", lifetimeYears: "", allocationBasis: "yield loss and waste assets", confidence: "screening", aggregationRole: "summable cost line" },
    { item: "Direct cost", value: data.directCost, unit: "USD/kg", note: "Annual cost divided by annual product", category: "Result", costType: "unit cost", lifetimeYears: "", allocationBasis: "annual product mass", confidence: "screening", aggregationRole: "result; do not sum" },
  ];
  return baseRows.map((row) => {
    const annualValueUsd = row.unit === "USD/yr" ? row.value : row.unit === "USD/kg" ? row.value * annualKg : "";
    const perKgProductUsd = row.unit === "USD/kg" ? row.value : row.unit === "USD/yr" ? row.value / annualKg : row.unit === "USD" ? row.value / annualKg : "";
    const low = typeof annualValueUsd === "number" ? annualValueUsd * 0.72 : "";
    const high = typeof annualValueUsd === "number" ? annualValueUsd * 1.38 : "";
    return {
      ...row,
      annualProductKg: data.annualKg,
      productPerBatchKg: data.productPerBatchKg,
      annualBatches: state.batchCount,
      batchVolumeL: state.batchSize,
      annualValueUsd,
      perKgProductUsd,
      lowEstimateUsdPerYr: low,
      highEstimateUsdPerYr: high,
      uncertaintyRange: typeof annualValueUsd === "number" ? "-28% / +38%" : "",
      capitalScaleExponent: state.params.capitalScaleExponent,
      plantUtilizationPct: data.utilization,
      sourceBasis: "Axion screening TEA model; replace with vendor quotes, site labor rates, depreciation, tax, and region factors",
    };
  });
}

function teaRows() {
  const data = metrics();
  const utilityKwhYr = data.utilities * 1000;
  const annualKg = Math.max(1, data.annualKg);
  const rows = costRows().map((row) => ({
    table: "TEA cost model",
    scenario: `${activeTemplate().label} - ${state.scale}`,
    product: activeTemplate().product,
    item: row.item,
    category: row.category,
    costType: row.costType,
    baseValue: row.value,
    baseUnit: row.unit,
    annualValueUsd: row.annualValueUsd,
    perKgProductUsd: row.perKgProductUsd,
    lowEstimateUsdPerYr: row.lowEstimateUsdPerYr,
    highEstimateUsdPerYr: row.highEstimateUsdPerYr,
    annualProductKg: data.annualKg,
    productPerBatchKg: data.productPerBatchKg,
    annualBatches: state.batchCount,
    batchVolumeL: state.batchSize,
    titerGL: state.titer,
    recoveryPct: state.recovery,
    processYieldPct: data.processYield * 100,
    effectiveTiterGL: data.effectiveTiter,
    plantUtilizationPct: data.utilization,
    allocationBasis: row.allocationBasis,
    aggregationRole: row.aggregationRole,
    lifetimeYears: row.lifetimeYears,
    capitalScaleExponent: row.capitalScaleExponent,
    confidence: row.confidence,
    sourceBasis: row.sourceBasis,
    note: row.note,
  }));
  rows.push({
    table: "TEA utility driver",
    scenario: `${activeTemplate().label} - ${state.scale}`,
    product: activeTemplate().product,
    item: "Total utility demand",
    category: "Utilities",
    costType: "physical driver",
    baseValue: utilityKwhYr,
    baseUnit: "kWh/yr",
    annualValueUsd: "",
    perKgProductUsd: "",
    lowEstimateUsdPerYr: "",
    highEstimateUsdPerYr: "",
    annualProductKg: data.annualKg,
    productPerBatchKg: data.productPerBatchKg,
    annualBatches: state.batchCount,
    batchVolumeL: state.batchSize,
    titerGL: state.titer,
    recoveryPct: state.recovery,
    processYieldPct: data.processYield * 100,
    effectiveTiterGL: data.effectiveTiter,
    plantUtilizationPct: data.utilization,
    allocationBasis: "equipment power and campaign duration",
    lifetimeYears: "",
    capitalScaleExponent: state.params.capitalScaleExponent,
    confidence: "screening",
    sourceBasis: "Use this as TEA utility driver before replacing with metered/site tariff data",
    note: `${formatNumber(utilityKwhYr / annualKg, 2)} kWh/kg product`,
  });
  return rows;
}

function lcaUtilityAssumptions() {
  const totalKwhYr = metrics().utilities * 1000;
  return [
    { flow: "Electricity", direction: "input", activityType: "energy", unit: "kWh", annualQuantity: totalKwhYr * 0.46, factorKgCo2eUnit: 0.42, sourceBasis: "Screening grid electricity factor; replace with market/location factor" },
    { flow: "Clean steam / process heat", direction: "input", activityType: "energy", unit: "kWh", annualQuantity: totalKwhYr * 0.32, factorKgCo2eUnit: 0.24, sourceBasis: "Screening natural-gas steam factor; replace with boiler and fuel data" },
    { flow: "Chilled water / cooling", direction: "input", activityType: "energy", unit: "kWh", annualQuantity: totalKwhYr * 0.16, factorKgCo2eUnit: 0.08, sourceBasis: "Screening chilled-water factor; replace with plant cooling model" },
    { flow: "Compressed air / process gases", direction: "input", activityType: "energy", unit: "kWh", annualQuantity: totalKwhYr * 0.06, factorKgCo2eUnit: 0.18, sourceBasis: "Screening compressed utility factor; replace with compressor and gas supply model" },
  ];
}

function lcaInventoryRows() {
  const annualKg = Math.max(1, metrics().annualKg);
  const streamInventory = streamRows().map((row) => ({
    table: "LCA process inventory",
    scenario: `${activeTemplate().label} - ${state.scale}`,
    product: activeTemplate().product,
    flowId: row.id,
    flowName: row.components,
    activityType: row.lcaFlowType,
    direction: row.direction.toLowerCase(),
    compartment: row.lcaCompartment,
    unit: "kg",
    quantityPerBatch: row.massFlowKgBatch,
    annualQuantity: row.annualMassKg,
    quantityPerKgProduct: row.perKgProductKg,
    emissionFactorKgCo2eUnit: row.screeningEmissionFactorKgCo2eKg,
    climateKgCo2eAnnual: row.screeningCo2eKgAnnual,
    climateKgCo2ePerKgProduct: row.screeningCo2eKgAnnual / annualKg,
    waterKgAnnual: row.lcaFlowType.includes("Water") ? row.annualMassKg : "",
    wasteKgAnnual: row.lcaFlowType.includes("Waste") || row.lcaFlowType.includes("Solid") ? row.annualMassKg : "",
    fromUnit: row.from,
    fromName: row.fromName,
    toUnit: row.to,
    toName: row.toName,
    phase: row.phase,
    teaDisposition: row.teaDisposition,
    densityKgM3: row.densityKgM3,
    viscosityCp: row.viscosityCp,
    osmoticIndex: row.osmoticIndex,
    sourceBasis: row.sourceBasis,
    dataQuality: row.solverStatus,
  }));
  const utilityInventory = lcaUtilityAssumptions().map((row, index) => ({
    table: "LCA utility inventory",
    scenario: `${activeTemplate().label} - ${state.scale}`,
    product: activeTemplate().product,
    flowId: `U-${String(index + 1).padStart(3, "0")}`,
    flowName: row.flow,
    activityType: row.activityType,
    direction: row.direction,
    compartment: "technosphere",
    unit: row.unit,
    quantityPerBatch: row.annualQuantity / Math.max(1, state.batchCount),
    annualQuantity: row.annualQuantity,
    quantityPerKgProduct: row.annualQuantity / annualKg,
    emissionFactorKgCo2eUnit: row.factorKgCo2eUnit,
    climateKgCo2eAnnual: row.annualQuantity * row.factorKgCo2eUnit,
    climateKgCo2ePerKgProduct: row.annualQuantity * row.factorKgCo2eUnit / annualKg,
    waterKgAnnual: "",
    wasteKgAnnual: "",
    fromUnit: "site utility",
    fromName: row.flow,
    toUnit: "process",
    toName: activeTemplate().label,
    phase: "Utility",
    teaDisposition: "utility",
    densityKgM3: "",
    viscosityCp: "",
    osmoticIndex: "",
    sourceBasis: row.sourceBasis,
    dataQuality: "Screening",
  }));
  return [...streamInventory, ...utilityInventory];
}

function lcaImpactRows() {
  const data = metrics();
  const annualKg = Math.max(1, data.annualKg);
  const inventory = lcaInventoryRows();
  const sum = (predicate, field = "annualQuantity") => inventory
    .filter(predicate)
    .reduce((acc, row) => acc + (Number(row[field]) || 0), 0);
  const climate = sum(() => true, "climateKgCo2eAnnual");
  const electricity = sum((row) => row.flowName === "Electricity");
  const processHeat = sum((row) => row.flowName === "Clean steam / process heat");
  const cooling = sum((row) => row.flowName === "Chilled water / cooling");
  const water = sum((row) => row.activityType === "Water input");
  const wastewater = sum((row) => row.activityType === "Wastewater output");
  const waste = sum((row) => row.activityType === "Solid or biological waste");
  const solvent = sum((row) => row.activityType === "Solvent input");
  const materials = sum((row) => ["Biochemical input", "Chemical input", "Consumable input"].includes(row.activityType));
  const recoveredHeatCredit = balanceRows().reduce((acc, row) => acc + (Number(row.recoveredHeatKwhBatch) || 0), 0) * state.batchCount * 0.24;
  return [
    { indicator: "Climate screening total", annualValue: climate, perKgProduct: climate / annualKg, unit: "kg CO2e", method: "Screening sum of material, utility, waste, and emission factors", dataQuality: "screening" },
    { indicator: "Electricity demand", annualValue: electricity, perKgProduct: electricity / annualKg, unit: "kWh", method: "Allocated share of total utility model", dataQuality: "screening" },
    { indicator: "Process heat demand", annualValue: processHeat, perKgProduct: processHeat / annualKg, unit: "kWh", method: "Allocated share of total utility model", dataQuality: "screening" },
    { indicator: "Cooling demand", annualValue: cooling, perKgProduct: cooling / annualKg, unit: "kWh", method: "Allocated share of total utility model", dataQuality: "screening" },
    { indicator: "Process water input", annualValue: water, perKgProduct: water / annualKg, unit: "kg", method: "Classified stream inventory", dataQuality: "estimated/solved" },
    { indicator: "Wastewater output", annualValue: wastewater, perKgProduct: wastewater / annualKg, unit: "kg", method: "Classified stream inventory", dataQuality: "estimated/solved" },
    { indicator: "Solid or biological waste", annualValue: waste, perKgProduct: waste / annualKg, unit: "kg", method: "Classified stream inventory", dataQuality: "estimated/solved" },
    { indicator: "Solvent throughput", annualValue: solvent, perKgProduct: solvent / annualKg, unit: "kg", method: "Classified stream inventory", dataQuality: "estimated/solved" },
    { indicator: "Raw material and consumable throughput", annualValue: materials, perKgProduct: materials / annualKg, unit: "kg", method: "Classified stream inventory", dataQuality: "estimated/solved" },
    { indicator: "Recovered heat credit", annualValue: -recoveredHeatCredit, perKgProduct: -recoveredHeatCredit / annualKg, unit: "kg CO2e credit", method: "Recovered heat multiplied by screening heat factor", dataQuality: "screening" },
  ].map((row) => ({
    scenario: `${activeTemplate().label} - ${state.scale}`,
    product: activeTemplate().product,
    annualProductKg: data.annualKg,
    functionalUnit: "1 kg product at plant gate",
    ...row,
    sourceBasis: "Screening LCA export for OpenLCA/SimaPro preparation; replace factors with ecoinvent/GaBi/supplier/site data",
  }));
}

function svgEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function barChartSvg(title, subtitle, rows, options = {}) {
  const width = options.width || 1180;
  const height = options.height || 760;
  const max = Math.max(1, ...rows.map((row) => Math.abs(Number(row.value) || 0)));
  const barHeight = Math.min(48, Math.max(26, (height - 210) / Math.max(1, rows.length) - 12));
  const colors = ["#69d2c4", "#b7a4ff", "#7f97a8", "#536f75", "#88a6ff", "#75d18d", "#d4d9e4", "#6ea1a8"];
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#071326"/>
  <rect x="34" y="34" width="${width - 68}" height="${height - 68}" rx="28" fill="#0c1c34" stroke="#28435f"/>
  <text x="72" y="92" fill="#f4f7fb" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="760">${svgEscape(title)}</text>
  <text x="72" y="128" fill="#aebbd0" font-family="Inter, Arial, sans-serif" font-size="17">${svgEscape(subtitle)}</text>
  ${rows.map((row, index) => {
    const y = 180 + index * (barHeight + 22);
    const length = Math.max(8, Math.abs(row.value) / max * (width - 430));
    const color = colors[index % colors.length];
    return `
      <text x="78" y="${y + barHeight * 0.68}" fill="#dce6f3" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="650">${svgEscape(row.label)}</text>
      <rect x="360" y="${y}" width="${width - 460}" height="${barHeight}" rx="12" fill="#132844"/>
      <rect x="360" y="${y}" width="${length}" height="${barHeight}" rx="12" fill="${color}"/>
      <text x="${width - 82}" y="${y + barHeight * 0.68}" text-anchor="end" fill="#f4f7fb" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="720">${svgEscape(row.display)}</text>
    `;
  }).join("")}
  <text x="72" y="${height - 66}" fill="#75869f" font-family="Inter, Arial, sans-serif" font-size="13">Generated by Axion Process OS - screening model; replace assumptions with site and supplier data for regulated decisions.</text>
</svg>`.trim();
}

function teaCostSvg() {
  const rows = costRows()
    .filter((row) => row.unit === "USD/yr" && !String(row.aggregationRole || "").startsWith("material component"))
    .map((row) => ({
      label: row.item,
      value: Number(row.annualValueUsd) || 0,
      display: `$${formatNumber((Number(row.annualValueUsd) || 0) / 1000000, 2)}M/yr`,
    }));
  return barChartSvg("TEA cost stack", `${activeTemplate().label} - ${formatNumber(metrics().annualKg, 0)} kg product/year`, rows);
}

function lcaImpactSvg() {
  const rows = lcaImpactRows().slice(0, 8).map((row) => ({
    label: row.indicator,
    value: Math.abs(Number(row.perKgProduct) || 0),
    display: `${formatNumber(row.perKgProduct, 2)} ${row.unit}/kg`,
  }));
  return barChartSvg("LCA screening indicators", `${activeTemplate().label} - functional unit 1 kg product`, rows);
}

function lcaFlowSvg() {
  const inventory = lcaInventoryRows();
  const annualKg = Math.max(1, metrics().annualKg);
  const groups = [
    { label: "Materials", key: (row) => ["Biochemical input", "Chemical input", "Consumable input", "Solvent input"].includes(row.activityType), color: "#69d2c4" },
    { label: "Utilities", key: (row) => row.activityType === "energy", color: "#b7a4ff" },
    { label: "Water", key: (row) => row.activityType === "Water input", color: "#88a6ff" },
    { label: "Waste", key: (row) => row.activityType.includes("Waste") || row.activityType.includes("Solid"), color: "#536f75" },
    { label: "Emissions", key: (row) => row.compartment === "air", color: "#7f97a8" },
  ].map((group) => {
    const annualQuantity = inventory.filter(group.key).reduce((sum, row) => sum + (Number(row.annualQuantity) || 0), 0);
    return { ...group, annualQuantity, perKg: annualQuantity / annualKg };
  });
  const max = Math.max(1, ...groups.map((row) => row.annualQuantity));
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1180" height="720" viewBox="0 0 1180 720">
  <rect width="1180" height="720" fill="#071326"/>
  <text x="72" y="86" fill="#f4f7fb" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="760">Plant-gate LCA flow map</text>
  <text x="72" y="122" fill="#aebbd0" font-family="Inter, Arial, sans-serif" font-size="17">${svgEscape(activeTemplate().label)} - annual inventory grouped for LCA handoff</text>
  <rect x="438" y="260" width="304" height="156" rx="26" fill="#10223d" stroke="#69d2c4" stroke-width="2"/>
  <text x="590" y="326" text-anchor="middle" fill="#f4f7fb" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="760">Axion process model</text>
  <text x="590" y="362" text-anchor="middle" fill="#aebbd0" font-family="Inter, Arial, sans-serif" font-size="15">${svgEscape(formatNumber(metrics().annualKg, 0))} kg product/year</text>
  ${groups.map((row, index) => {
    const y = 180 + index * 92;
    const stroke = Math.max(5, row.annualQuantity / max * 28);
    const left = index < 3;
    const x1 = left ? 110 : 742;
    const x2 = left ? 438 : 1070;
    const labelX = left ? 112 : 920;
    return `
      <path d="M${x1} ${y} C${left ? 230 : 870} ${y}, ${left ? 318 : 950} 338, ${x2} 338" fill="none" stroke="${row.color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.86"/>
      <circle cx="${x1}" cy="${y}" r="12" fill="${row.color}"/>
      <text x="${labelX}" y="${y - 20}" ${left ? "" : "text-anchor=\"end\""} fill="#f4f7fb" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="720">${svgEscape(row.label)}</text>
      <text x="${labelX}" y="${y + 28}" ${left ? "" : "text-anchor=\"end\""} fill="#aebbd0" font-family="Inter, Arial, sans-serif" font-size="14">${svgEscape(formatNumber(row.perKg, 2))} unit/kg product</text>
    `;
  }).join("")}
  <text x="72" y="664" fill="#75869f" font-family="Inter, Arial, sans-serif" font-size="13">Width is proportional to annual grouped inventory mass or energy. Use CSV exports for exact LCA/TEA data.</text>
</svg>`.trim();
}

function processOverviewSvg() {
  const stats = plantAreaStats();
  const max = Math.max(1, ...stats.map((row) => row.count));
  const width = 1180;
  const height = 720;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#071326"/>
  <text x="72" y="86" fill="#f4f7fb" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="760">Production plant architecture</text>
  <text x="72" y="122" fill="#aebbd0" font-family="Inter, Arial, sans-serif" font-size="17">${svgEscape(activeTemplate().label)} - main process, support, cleaning, recycle, heat, waste, and quality layers</text>
  ${stats.map((row, index) => {
    const x = 78 + index * 154;
    const h = Math.max(36, row.count / max * 310);
    const y = 520 - h;
    return `
      <rect x="${x}" y="${y}" width="108" height="${h}" rx="18" fill="#10223d" stroke="#28435f"/>
      <rect x="${x}" y="${y}" width="108" height="${h}" rx="18" fill="#69d2c4" opacity="${0.2 + row.count / max * 0.55}"/>
      <text x="${x + 54}" y="${y - 18}" text-anchor="middle" fill="#f4f7fb" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="780">${row.count}</text>
      <text x="${x + 54}" y="560" text-anchor="middle" fill="#dce6f3" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="720">${svgEscape(row.label)}</text>
      <text x="${x + 54}" y="586" text-anchor="middle" fill="#8999af" font-family="Inter, Arial, sans-serif" font-size="12">${svgEscape(row.examples)}</text>
    `;
  }).join("")}
  <path d="M118 238 C260 170, 370 170, 512 238 S792 306, 964 238" fill="none" stroke="#b7a4ff" stroke-width="6" stroke-linecap="round" stroke-dasharray="16 16"/>
  <text x="72" y="664" fill="#75869f" font-family="Inter, Arial, sans-serif" font-size="13">Layer count view exported from the editable process model. Use the process builder for unit-level editing.</text>
</svg>`.trim();
}

function scheduleGanttSvg() {
  const schedule = campaignSchedule();
  const rows = scheduleGanttRows(schedule).filter((row) => row.batchId === "B01").slice(0, 28);
  const width = 1480;
  const rowH = 34;
  const height = Math.max(620, 190 + rows.length * rowH);
  const axisX = 330;
  const axisW = width - axisX - 95;
  const maxH = Math.max(1, ...rows.map((row) => row.finishH), schedule.makespanH);
  const phaseColor = {
    Setup: "#596a64",
    Process: "#173f37",
    Transfer: "#64748b",
    "Cleaning/Release": "#275f6b",
  };
  const tickCount = 8;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#071326"/>
  <rect x="34" y="34" width="${width - 68}" height="${height - 68}" rx="30" fill="#0c1c34" stroke="#28435f"/>
  <text x="72" y="92" fill="#f4f7fb" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="760">Finite-capacity campaign schedule</text>
  <text x="72" y="128" fill="#aebbd0" font-family="Inter, Arial, sans-serif" font-size="17">${svgEscape(activeTemplate().label)} · ${schedule.simulatedBatches} simulated batches · bottleneck ${svgEscape(schedule.bottleneck.tag)}</text>
  ${Array.from({ length: tickCount + 1 }, (_, index) => {
    const x = axisX + axisW * index / tickCount;
    const value = maxH * index / tickCount;
    return `
      <line x1="${x}" y1="152" x2="${x}" y2="${height - 82}" stroke="#213954" stroke-width="1"/>
      <text x="${x}" y="176" text-anchor="middle" fill="#8fa1b8" font-family="Inter, Arial, sans-serif" font-size="12">${formatNumber(value, 0)}h</text>
    `;
  }).join("")}
  ${rows.map((row, index) => {
    const y = 204 + index * rowH;
    const x = axisX + row.startH / maxH * axisW;
    const w = Math.max(3, row.durationH / maxH * axisW);
    const color = phaseColor[row.phase] || "#9fb0c5";
    return `
      <text x="72" y="${y + 17}" fill="#dce6f3" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="720">${svgEscape(row.operationTag)}</text>
      <text x="150" y="${y + 17}" fill="#9fb0c5" font-family="Inter, Arial, sans-serif" font-size="12">${svgEscape(row.phase)}</text>
      <rect x="${x}" y="${y}" width="${w}" height="22" rx="11" fill="${color}" opacity="${row.critical === "yes" ? "0.98" : "0.78"}"/>
      <text x="${Math.min(width - 120, x + w + 8)}" y="${y + 16}" fill="#c9d5e5" font-family="Inter, Arial, sans-serif" font-size="11">${svgEscape(row.resource)}</text>
    `;
  }).join("")}
  <g font-family="Inter, Arial, sans-serif" font-size="12" fill="#aebbd0">
    <rect x="72" y="${height - 106}" width="18" height="10" rx="5" fill="#596a64"/><text x="98" y="${height - 97}">Setup</text>
    <rect x="164" y="${height - 106}" width="18" height="10" rx="5" fill="#173f37"/><text x="190" y="${height - 97}">Process</text>
    <rect x="268" y="${height - 106}" width="18" height="10" rx="5" fill="#64748b"/><text x="294" y="${height - 97}">Transfer</text>
    <rect x="380" y="${height - 106}" width="18" height="10" rx="5" fill="#275f6b"/><text x="406" y="${height - 97}">Cleaning / release</text>
  </g>
</svg>`.trim();
}

function downloadCsv(filename, rows, kind = "CSV export") {
  const enrichedRows = withExportMetadata(rows, kind);
  const headers = Object.keys(enrichedRows[0] || { empty: "" });
  const csv = [
    headers.map(csvEscape).join(","),
    ...enrichedRows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
  downloadText(filename, "text/csv", csv);
}

function downloadSvg(filename, svg) {
  downloadText(filename, "image/svg+xml", brandSvg(svg));
}

function downloadJson(filename, payload, kind = "JSON export") {
  downloadText(filename, "application/json", JSON.stringify({
    metadata: exportMetadata(kind),
    ...payload,
  }, null, 2));
}

function comprehensiveReport() {
  const solved = solveMassBalance();
  const plantSim = plantSimulationModel();
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
    dynamicProfile: dynamicBatchProfile(),
    unitModels: unitMechanisticModels(),
    schedule: campaignSchedule(),
    recipe: recipeEditorRows(),
    routeComparison: routeComparisonRows(),
    routeTopology: routeTopologyRows(),
    routeOptimization: routeOptimizationRows(),
    plantSimulation: plantSim,
    plantSimulationObjects: plantSimulationObjectRows(plantSim),
    plantSimulationExperiments: plantSimulationExperimentRows(plantSim),
    plantSimulationInterfaces: plantSimulationInterfaceRows(),
    propertyPackage: aggregateComponentProperties(state.params.temperature || 25),
    detailedPropertyPackage: propertyRows(),
    equipment: state.units,
    streams: streamRows(),
    balances: balanceRows(),
    costs: costRows(),
    tea: teaRows(),
    lcaInventory: lcaInventoryRows(),
    lcaImpacts: lcaImpactRows(),
    equations,
    unitEquations: state.units.map((item) => ({ tag: item.id, name: item.name, equations: unitReactions(item) })),
    cfd: cfdReport().map((item) => ({ ...item, cells: item.cells.map((cell) => ({ oxygen: cell.oxygen, nutrient: cell.nutrient, shear: cell.shear, risk: cell.risk })) })),
    gpromsAlgorithm: gpromsAlgorithmRows(),
    pvsdParameters: pvsdParameterRows(),
    procedureWorkbook: procedureOperationWorkbookRows(),
    resourceInventory: resourceInventoryRows(),
    emissionsWorkbook: emissionsWorkbookRows(),
    debottleneckWorkbook: debottleneckWorkbookRows(),
    databankWorkbook: databankWorkbookRows(),
    exchangeWorkbook: exchangeWorkbookRows(),
    advancedPlanning: advancedPlanningSuite(),
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
        <h3>Balances, LCA, TEA, equations, streams, and visualizations</h3>
        <span>Export spreadsheet-ready CSV files and crisp SVG graphics for Excel, LCA/TEA handoff, thesis appendices, process reviews, and external modelling.</span>
      </div>
      <button class="action-button primary" data-jump-view="cfd" type="button">Open CFD workbench</button>
    </section>
    <section class="reports-grid">
      <article><span>Mass + energy balances</span><strong>${formatNumber(report.solver.totals.closurePct, 2)}%</strong><p>${report.balances.length} unit balances with component inputs/outputs, generation, loss, closure, heat duty, power, and linked equations.</p><button data-download-report="balances-csv" type="button">Download CSV</button></article>
      <article><span>Costs</span><strong>${report.costs.length}</strong><p>CAPEX, facility burden, materials, labor, QA/QC, utilities, waste, and direct cost.</p><button data-download-report="costs-csv" type="button">Download CSV</button></article>
      <article><span>TEA-ready export</span><strong>${report.tea.length}</strong><p>Cost model with annual value, per-kg product values, scenario basis, uncertainty range, scale exponent, utilization, and physical utility drivers.</p><button data-download-report="tea-csv" type="button">Download CSV</button><button data-download-report="tea-cost-svg" type="button">Cost SVG</button></article>
      <article><span>LCA inventory</span><strong>${report.lcaInventory.length}</strong><p>OpenLCA/SimaPro-ready screening inventory with activity type, compartment, per-batch, annual, per-kg, factors, CO2e, water, waste, and data-quality notes.</p><button data-download-report="lca-inventory-csv" type="button">Inventory CSV</button><button data-download-report="lca-impact-csv" type="button">Impact CSV</button></article>
      <article><span>Downloadable visualizations</span><strong>SVG</strong><p>High-resolution process architecture, LCA flow map, LCA impact bars, and TEA cost-stack graphics for slides, thesis appendices, and reviews.</p><button data-download-report="process-svg" type="button">Plant SVG</button><button data-download-report="lca-flow-svg" type="button">LCA flow SVG</button><button data-download-report="lca-impact-svg" type="button">LCA impact SVG</button></article>
      <article><span>Chemical equations</span><strong>${equations.length}</strong><p>Stoichiometry, kinetics, mass balances, energy balances, separations, emissions, and economics.</p><button data-download-report="equations-csv" type="button">Download CSV</button></article>
      <article><span>Input/output streams</span><strong>${report.solver.totals.solvedStreams}</strong><p>All material, utility, waste, and QC/data streams with solved kg/batch, annual kg, role, phase, and component summary.</p><button data-download-report="streams-csv" type="button">Download CSV</button></article>
      <article><span>Parameters</span><strong>${processParameters.length}</strong><p>Global, biochemical, scale-up, custom, and economic parameters.</p><button data-download-report="parameters-csv" type="button">Download CSV</button></article>
      <article><span>Property package</span><strong>${propertyRows().length}</strong><p>Detailed and aggregate Cp, density, viscosity, osmotic, vapor-pressure, solubility, Henry, and ionic-strength proxies used by the solver.</p><button data-download-report="properties-csv" type="button">Download CSV</button></article>
      <article><span>Dynamic profile</span><strong>${report.dynamicProfile.points.length}</strong><p>Time-resolved batch profile for product, recovery, substrate, biomass, DO, lactate, ammonium, heat load, and energy.</p><button data-download-report="dynamic-csv" type="button">Download CSV</button></article>
      <article><span>Unit-operation models</span><strong>${report.unitModels.length}</strong><p>Mechanistic screening models for bioreactors, filtration, chromatography, thermal steps, cleaning, utilities, QC, and generic unit hold-up.</p><button data-download-report="unit-models-csv" type="button">Download CSV</button></article>
      <article><span>gPROMS-style algorithm</span><strong>${report.gpromsAlgorithm.length}</strong><p>Equation-oriented handoff workflow for convective-dispersive and PVSD-style dynamic models, including objectives, PDEs, IC/BCs, discretization, solver status, validation, and iteration steps.</p><button data-download-report="gproms-algorithm-csv" type="button">Algorithm CSV</button><button data-download-report="pvsd-parameters-csv" type="button">PVSD CSV</button></article>
      <article><span>Procedure workbook</span><strong>${report.procedureWorkbook.length}</strong><p>Unit procedures decomposed into charge, transform, transfer, cleaning/release, I/O streams, batch-sheet notes, standards, and linked equations.</p><button data-download-report="procedure-workbook-csv" type="button">Download CSV</button></article>
      <article><span>Resource inventory</span><strong>${report.resourceInventory.length}</strong><p>Equipment, materials, utilities, cleaning agents, schedule resources, occupancy, cost basis, sizing basis, and specification-review needs.</p><button data-download-report="resource-inventory-csv" type="button">Download CSV</button></article>
      <article><span>Emissions workbook</span><strong>${report.emissionsWorkbook.length}</strong><p>Off-gas, vent, solvent-loss, cleaning-wastewater, waste-treatment, abatement, monitoring, and missing-data review table.</p><button data-download-report="emissions-workbook-csv" type="button">Download CSV</button></article>
      <article><span>Debottlenecking workbook</span><strong>${report.debottleneckWorkbook.length}</strong><p>Equipment-time, size, heat, power, occupancy, cleaning, transfer-line, and scale-up review actions for capacity planning.</p><button data-download-report="debottleneck-workbook-csv" type="button">Download CSV</button></article>
      <article><span>Databank workbook</span><strong>${report.databankWorkbook.length}</strong><p>Original Axion equipment, component, mixture, property, parameter, cost, and CIP/SIP template libraries for project calibration.</p><button data-download-report="databank-workbook-csv" type="button">Download CSV</button></article>
      <article><span>Exchange workbook</span><strong>${report.exchangeWorkbook.length}</strong><p>Structured handoff map for spreadsheets, project planning, API model exchange, historian tags, CFD cases, LCA, TEA, and QMS documentation.</p><button data-download-report="exchange-workbook-csv" type="button">Download CSV</button></article>
      <article><span>Campaign schedule</span><strong>${report.schedule.feasibleAnnualBatches}/${state.batchCount}</strong><p>Finite-capacity operation timing with repeated production, stream transfer slots, cleaning/release, equipment reuse, QC release, hold-time checks, resources, and project-planning handoff.</p><button data-download-report="schedule-csv" type="button">Operations CSV</button><button data-download-report="schedule-gantt-csv" type="button">Gantt CSV</button><button data-download-report="schedule-msproject-csv" type="button">MS Project CSV</button><button data-download-report="schedule-svg" type="button">Gantt SVG</button><button data-download-report="schedule-json" type="button">JSON</button></article>
      <article><span>APS planning cockpit</span><strong>${formatNumber(report.advancedPlanning.kpis.planAdherencePct, 0)}%</strong><p>Strategic, tactical, and detailed planning with finite capacity, delivery promises, inventory coverage, WIP, replanning signals, collaboration roles, and sequencing objectives.</p><button data-download-report="aps-horizons-csv" type="button">Horizons CSV</button><button data-download-report="aps-capacity-csv" type="button">Capacity CSV</button><button data-download-report="aps-delivery-csv" type="button">Delivery CSV</button><button data-download-report="aps-inventory-csv" type="button">Inventory CSV</button><button data-download-report="aps-sequencing-csv" type="button">Sequencing CSV</button><button data-download-report="aps-collaboration-csv" type="button">Roles CSV</button><button data-download-report="aps-optimization-csv" type="button">Optimization CSV</button></article>
      <article><span>Scheduling resources</span><strong>${report.schedule.resourceRows.length}</strong><p>Detailed equipment, stream line, process-area, operator, CIP/SIP, and QC-release occupancy for finite-capacity review.</p><button data-download-report="schedule-streams-csv" type="button">Streams CSV</button><button data-download-report="schedule-cycles-csv" type="button">Reuse cycles CSV</button><button data-download-report="schedule-resources-csv" type="button">Resources CSV</button><button data-download-report="schedule-utilization-csv" type="button">Utilization matrix</button><button data-download-report="schedule-releases-csv" type="button">Batch releases</button></article>
      <article><span>Editable recipe</span><strong>${report.recipe.filter((item) => item.edited).length}/${report.recipe.length}</strong><p>Generated and manually overridden recipe assumptions for active/skip state, route branch, predecessor dependency, process time, setup time, cleaning time, and parallel equipment pools.</p><button data-download-report="recipe-csv" type="button">Download CSV</button></article>
      <article><span>Route comparison</span><strong>${report.routeComparison.length}</strong><p>Primary, intensified, and lean route comparison with scheduled steps, capacity, make-span, release pitch, bottleneck, occupancy, and warnings.</p><button data-download-report="routes-csv" type="button">Download CSV</button></article>
      <article><span>Route topology</span><strong>${report.routeTopology.reduce((sum, item) => sum + item.totalSteps, 0)}</strong><p>Visual branch/merge model with shared steps, route-specific steps, merge point, entry node, and predecessor edges.</p><button data-download-report="route-topology-csv" type="button">Download CSV</button></article>
      <article><span>Route optimizer</span><strong>${report.routeOptimization[0]?.label || "n/a"}</strong><p>Screening optimizer ranking every route by capacity, bottleneck, schedule warnings, estimated direct cost, GMP readiness, and sustainability.</p><button data-download-report="route-optimizer-csv" type="button">Download CSV</button></article>
      <article><span>Plant simulation twin</span><strong>${report.plantSimulation.objects.totalObjects}</strong><p>Object-oriented factory hierarchy, reusable equipment states, logistics buffers, resource occupancy, value-stream timing, Sankey flow shares, and 3D-style layout preview.</p><button data-download-report="plant-simulation-objects-csv" type="button">Objects CSV</button><button data-download-report="plant-simulation-svg" type="button">Plant SVG</button></article>
      <article><span>Experiment manager</span><strong>${report.plantSimulationExperiments.length}</strong><p>Optimization-ready scenarios for bottleneck parallelization, CIP reduction, heat reuse, media cost, automation, release pitch, CO2e, and risk constraints.</p><button data-download-report="plant-simulation-experiments-csv" type="button">Experiments CSV</button></article>
      <article><span>Integration matrix</span><strong>${report.plantSimulationInterfaces.length}</strong><p>Concrete connector registry for JSON, CSV, CAD/JT, MQTT, OPC UA, SQL/ODBC, REST, Python SDK, optimizer, and scheduling/MES handoff.</p><button data-download-report="plant-simulation-interfaces-csv" type="button">Interfaces CSV</button></article>
      <article><span>Original example library</span><strong>${templateExampleRows().length}</strong><p>Download Axion's own example model library for antibodies, penicillin, cultured meat, fermentation, vaccines, plasmids, cell therapy, utilities, and emissions without using copied third-party files.</p><button data-download-report="examples-csv" type="button">Examples CSV</button><button data-download-report="examples-json" type="button">Examples JSON</button></article>
    </section>
  `;
}

function pageTitle(view) {
  return {
    start: "New Model Briefing",
    projects: "Projects",
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
  }[view] || "New Model Briefing";
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
    ${renderRealtimeTelemetry()}
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
  const dynamic = dynamicBatchProfile();
  const unitModels = unitMechanisticModels();
  const schedule = campaignSchedule();
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
      detail: `Utility load is estimated at ${formatNumber(data.utilities, 1)} MWh, while the solver estimates ${formatNumber(solved.totals.netHeatDuty, 1)} kWh/batch net heat duty after ${formatNumber(solved.totals.recoveredHeat, 1)} kWh/batch heat recovery. A ${dynamic.points.length}-point dynamic heat profile is now exported. Add heat-exchanger area, approach temperature, pressure drop, steam/condensate headers, and chilled-water constraints.`,
    },
    {
      group: "Dynamic simulation",
      status: "Partially covered",
      title: "Time-resolved batch profile",
      detail: `A dynamic screening profile now simulates ${formatNumber(dynamic.durationH, 1)} h with product, recovered product, biomass, substrate, DO, lactate, ammonium, heat load, and cumulative energy. Full simulation still needs validated ODE models, event-based recipes, controller dynamics, equipment hold-up, and measured batch historian calibration.`,
    },
    {
      group: "Unit operations",
      status: "Partially covered",
      title: "Mechanistic equipment model layer",
      detail: `${unitModels.length} unit operations now receive class-specific screening models for bioreactor kinetics/oxygen transfer, flux/fouling, chromatography capacity, thermal/SIP lethality, CIP residue removal, utility abatement, PAT/release, and generic hold-up. Full simulation still needs validated coefficients, vendor sizing curves, calibration data, and nonlinear dynamic solvers.`,
    },
    {
      group: "Reaction and kinetics",
      status: "Partially covered",
      title: "Unit-specific reaction packages",
      detail: "Screening equations now include Monod-style effective growth, Luedeking-Piret product formation, oxygen transfer, sterilization lethality, and cleaning residue removal. Full simulation still needs validated Monod/Contois/logistic coefficients, CO2 evolution, inhibition, degradation, and organism/product-specific calibration.",
    },
    {
      group: "Separation",
      status: "Partially covered",
      title: "Mechanistic filtration/chromatography models",
      detail: "Filtration, UF/DF, chromatography, and partition steps now receive flux, fouling, area, DBC, resin-volume, cycle-count, and yield screens. Full simulation still needs measured fouling curves, cake resistance, membrane polarization, column breakthrough, resin aging, elution gradients, viral clearance log-reduction, and pool blending logic.",
    },
    {
      group: "Scheduling",
      status: "Partially covered",
      title: "Finite-capacity batch scheduler",
      detail: `A finite-capacity scheduler now simulates ${schedule.simulatedBatches} repeated batches with equipment occupancy, editable active/skip flags, route branches, visual branch/merge topology, automatic route optimization, predecessor dependencies, setup/process/transfer/CIP timing, reusable equipment pools, scheduled process-stream transfer slots, short cleaning or assembly-changeover windows, a shared CIP/SIP skid, QC release queue, hold-time checks, and bottleneck resources. Current ${state.activeRoute} route supports ${schedule.feasibleAnnualBatches} of ${state.batchCount} target annual batches. Full simulation still needs operator calendars, suite-level cleanroom constraints, campaign changeovers, validated site calendars, and a mathematical optimizer with hard constraints.`,
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
    <section class="market-intel-board">
      <div>
        <p>Implementation roadmap</p>
        <h3>Move from screening model to controlled engineering workspace.</h3>
        <span>Use the readiness list to replace screening assumptions with project-specific data, connect review outputs, and decide which modules need higher-fidelity modelling next.</span>
      </div>
      <div class="market-caveat-list">
        <span>Validate process-specific kinetics, yields, and impurity behavior.</span>
        <span>Replace screening costs with supplier quotes and site-specific utility tariffs.</span>
        <span>Add governance, approvals, and audit trails before regulated production use.</span>
      </div>
    </section>
    <section class="market-wave-grid">
      <article>
        <span>Step 1</span>
        <h3>Calibrate the model</h3>
        <p>Add measured titers, yields, media composition, utility loads, cleaning limits, and representative batch data.</p>
        <small>Goal: replace defaults with defendable project assumptions.</small>
      </article>
      <article>
        <span>Step 2</span>
        <h3>Validate the process boundaries</h3>
        <p>Review oxygen transfer, heat load, ammonium, lactate, hold time, sterility, waste, and scale-up constraints.</p>
        <small>Goal: identify the next experiments or engineering studies.</small>
      </article>
      <article>
        <span>Step 3</span>
        <h3>Connect decision outputs</h3>
        <p>Use exports for TEA, LCA, equipment review, scheduling, source tracking, and stakeholder-ready technical reports.</p>
        <small>Goal: turn the model into a repeatable engineering workflow.</small>
      </article>
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
  const materialRows = data.scale.materialBreakdown?.rows || [];
  const costItems = [
    { label: "Annualized CAPEX", value: data.scale.annualizedCapital, color: "#123a56" },
    { label: "Fixed facility burden", value: data.scale.fixedBurden, color: "#275f6b" },
    { label: "Materials + media", value: data.scale.materialIntensity, color: "#0f8f83" },
    { label: "Labor", value: data.scale.laborCost, color: "#7b8a84" },
    { label: "QA/QC validation", value: data.scale.qaCost, color: "#62738a" },
    { label: "Utilities + waste", value: data.scale.utilityCost + data.scale.wasteCost, color: "#257c88" },
  ];
  const totalCost = costItems.reduce((sum, item) => sum + item.value, 0) || 1;
  const materialTotal = Math.max(1, data.scale.materialIntensity);
  els.costStack.innerHTML = `
    ${costItems.map((item) => `
    <div class="cost-bar">
      <span>${item.label}</span>
      <span class="cost-track"><span class="cost-fill" style="width:${Math.max(2, item.value / totalCost * 100)}%; background:${item.color}"></span></span>
      <strong>${formatNumber(item.value / totalCost * 100, 0)}%</strong>
    </div>
    `).join("")}
    <div class="cost-bar cost-bar-section">
      <span>Material breakdown</span>
      <span>media, feeds, buffers, resin, single-use, QC, cleaning</span>
      <strong>$${formatNumber(data.scale.materialIntensity / Math.max(1, data.annualKg), 0)}/kg</strong>
    </div>
    ${materialRows
      .slice()
      .sort((a, b) => b.value - a.value)
      .map((item) => `
        <div class="cost-bar material-cost-bar">
          <span>${item.item}</span>
          <span class="cost-track"><span class="cost-fill" style="width:${Math.max(2, item.value / materialTotal * 100)}%; background:#0f8f83"></span></span>
          <strong>${formatNumber(item.value / materialTotal * 100, 0)}%</strong>
        </div>
      `).join("")}
  `;

  els.costNarrative.textContent = `${activeTemplate().label} at ${formatNumber(state.batchSize)} L is treated as ${data.scale.profile.label} scale. Materials are now modeled as a major bioprocess cost driver: media, feeds/supplements, buffers, resin, filters, membranes, single-use assemblies, WFI/CIP chemicals, gases, QC consumables, cold-chain, inventory and yield-loss replacement materials are itemized. Larger plants still benefit from purchasing power and learning, but high-value media and consumables remain a dominant OPEX driver. Estimated direct cost is $${formatNumber(data.directCost, 0)}/kg.`;
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
    <dt>Materials total</dt><dd>$${formatNumber(data.scale.materialIntensity / 1000000, 2)}M/yr</dd>
    <dt>Materials per kg</dt><dd>$${formatNumber(data.scale.materialIntensity / Math.max(1, data.annualKg), 0)}/kg</dd>
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
  const target = document.querySelector(`#${view}View`);
  if (!target) return;
  document.body.dataset.activeView = view;
  if (view === "simulation") renderSimulationBoard();
  if (view === "cfd") renderCfdBoard();
  if (view === "reports") renderReportsBoard();
  if (view === "recommendations") renderRecommendations();
  document.querySelectorAll(".view").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelectorAll(".suite-link").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  if (els.pageTitle) els.pageTitle.textContent = pageTitle(view);
  target.classList.add("active");
  document.querySelector(".workspace")?.scrollTo({ left: 0, top: document.querySelector(".workspace")?.scrollTop || 0, behavior: "auto" });
  if (view === "flowsheet") openProcessCanvas();
  else window.requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "smooth" }));
}

function jumpToView(view) {
  if (!view) return;
  setView(view);
  showToast(`${pageTitle(view)} opened`);
}

function openProcessCanvas() {
  window.requestAnimationFrame(() => {
    fitCanvas(true);
    document.querySelector("#flowsheetView")?.scrollIntoView({ block: "start", behavior: "smooth" });
    els.canvas?.focus?.({ preventScroll: true });
    showToast("Process canvas opened");
  });
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
  state.zoom = Math.max(0.72, Math.min(1, Math.min(availableWidth / maxX, availableHeight / maxY)));
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
  const dynamic = dynamicBatchProfile();
  const unitModels = unitMechanisticModels();
  const schedule = campaignSchedule();
  const recipeRows = recipeEditorRows();
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
    { metric: "Dynamic profile duration", value: dynamic.durationH, unit: "h" },
    { metric: "Dynamic profile points", value: dynamic.points.length, unit: "points" },
    { metric: "Dynamic peak heat", value: dynamic.peakHeatKw, unit: "kW" },
    { metric: "Dynamic min DO", value: dynamic.minDoPct, unit: "%" },
    { metric: "Dynamic max ammonia", value: dynamic.maxAmmoniaMm, unit: "mM" },
    { metric: "Mechanistic unit models", value: unitModels.length, unit: "models" },
    { metric: "Mechanistic model review flags", value: unitModels.filter((item) => item.severity !== "ok").length, unit: "flags" },
    { metric: "Schedule feasible annual batches", value: schedule.feasibleAnnualBatches, unit: "batches/yr" },
    { metric: "Active route", value: state.activeRoute, unit: "" },
    { metric: "Schedule release pitch", value: schedule.releasePitchH, unit: "h" },
    { metric: "Schedule bottleneck", value: schedule.bottleneck.tag, unit: "" },
    { metric: "Schedule warnings", value: schedule.warnings.length, unit: "warnings" },
    { metric: "Edited recipe rows", value: recipeRows.filter((item) => item.edited).length, unit: "rows" },
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
  const headers = ["id", "direction", "role", "lcaFlowType", "lcaCompartment", "teaDisposition", "from", "fromName", "to", "toName", "flow", "massFlowKgBatch", "annualMassKg", "perKgProductKg", "components", "nominalDescription", "phase", "solverStatus", "densityKgM3", "viscosityCp", "osmoticIndex", "screeningEmissionFactorKgCo2eKg", "screeningCo2eKgAnnual", "sourceBasis"];
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
  } else if (type === "tea-csv") {
    downloadCsv(`${state.template}-tea-ready-cost-model.csv`, teaRows());
  } else if (type === "lca-inventory-csv") {
    downloadCsv(`${state.template}-lca-inventory.csv`, lcaInventoryRows());
  } else if (type === "lca-impact-csv") {
    downloadCsv(`${state.template}-lca-impact-summary.csv`, lcaImpactRows());
  } else if (type === "tea-cost-svg") {
    downloadSvg(`${state.template}-tea-cost-stack.svg`, teaCostSvg());
  } else if (type === "lca-flow-svg") {
    downloadSvg(`${state.template}-lca-flow-map.svg`, lcaFlowSvg());
  } else if (type === "lca-impact-svg") {
    downloadSvg(`${state.template}-lca-impact-bars.svg`, lcaImpactSvg());
  } else if (type === "process-svg") {
    downloadSvg(`${state.template}-process-architecture.svg`, processOverviewSvg());
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
  } else if (type === "dynamic-csv") {
    downloadCsv(`${state.template}-dynamic-batch-profile.csv`, dynamicProfileRows());
  } else if (type === "unit-models-csv") {
    downloadCsv(`${state.template}-unit-operation-models.csv`, mechanisticModelRows());
  } else if (type === "gproms-algorithm-csv") {
    downloadCsv(`${state.template}-gproms-pvsd-simulation-algorithm.csv`, gpromsAlgorithmRows(), "Equation-oriented simulation algorithm");
  } else if (type === "pvsd-parameters-csv") {
    downloadCsv(`${state.template}-pvsd-transport-parameters.csv`, pvsdParameterRows(), "PVSD transport parameter package");
  } else if (type === "procedure-workbook-csv") {
    downloadCsv(`${state.template}-procedure-operation-workbook.csv`, procedureOperationWorkbookRows(), "Procedure and unit-operation workbook");
  } else if (type === "resource-inventory-csv") {
    downloadCsv(`${state.template}-resource-inventory.csv`, resourceInventoryRows(), "Resource inventory workbook");
  } else if (type === "emissions-workbook-csv") {
    downloadCsv(`${state.template}-emissions-workbook.csv`, emissionsWorkbookRows(), "Emissions and waste workbook");
  } else if (type === "debottleneck-workbook-csv") {
    downloadCsv(`${state.template}-debottlenecking-workbook.csv`, debottleneckWorkbookRows(), "Debottlenecking workbook");
  } else if (type === "databank-workbook-csv") {
    downloadCsv(`${state.template}-databank-workbook.csv`, databankWorkbookRows(), "Databank workbook");
  } else if (type === "exchange-workbook-csv") {
    downloadCsv(`${state.template}-exchange-workbook.csv`, exchangeWorkbookRows(), "Exchange and connector workbook");
  } else if (type === "schedule-csv") {
    downloadCsv(`${state.template}-campaign-schedule.csv`, scheduleOperationRows(), "Campaign schedule operations");
  } else if (type === "schedule-gantt-csv") {
    downloadCsv(`${state.template}-schedule-gantt-tasks.csv`, scheduleGanttRows(), "Gantt task schedule");
  } else if (type === "schedule-msproject-csv") {
    downloadCsv(`${state.template}-ms-project-schedule.csv`, scheduleMsProjectRows(), "MS Project compatible schedule");
  } else if (type === "schedule-releases-csv") {
    downloadCsv(`${state.template}-batch-release-schedule.csv`, scheduleBatchReleaseRows(), "Batch release schedule");
  } else if (type === "schedule-utilization-csv") {
    downloadCsv(`${state.template}-schedule-utilization-matrix.csv`, scheduleUtilizationMatrixRows(), "Schedule utilization matrix");
  } else if (type === "schedule-svg") {
    downloadSvg(`${state.template}-finite-capacity-schedule.svg`, scheduleGanttSvg());
  } else if (type === "schedule-json") {
    const schedule = campaignSchedule();
    downloadJson(`${state.template}-finite-capacity-schedule.json`, {
      schedule,
      ganttTasks: scheduleGanttRows(schedule),
      msProjectTasks: scheduleMsProjectRows(schedule),
      batchReleases: scheduleBatchReleaseRows(schedule),
      utilizationMatrix: scheduleUtilizationMatrixRows(schedule),
    }, "Finite-capacity schedule package");
  } else if (type === "aps-horizons-csv") {
    downloadCsv(`${state.template}-aps-planning-horizons.csv`, apsHorizonRows(), "Advanced planning horizons");
  } else if (type === "aps-capacity-csv") {
    downloadCsv(`${state.template}-aps-finite-capacity-monitor.csv`, apsCapacityRows(), "Advanced planning finite capacity monitor");
  } else if (type === "aps-delivery-csv") {
    downloadCsv(`${state.template}-aps-delivery-performance.csv`, apsDeliveryRows(), "Advanced planning delivery performance");
  } else if (type === "aps-inventory-csv") {
    downloadCsv(`${state.template}-aps-inventory-and-wip.csv`, apsInventoryRows(), "Advanced planning inventory and WIP");
  } else if (type === "aps-sequencing-csv") {
    downloadCsv(`${state.template}-aps-detailed-sequencing.csv`, apsSequencingRows(), "Advanced planning detailed sequencing");
  } else if (type === "aps-collaboration-csv") {
    downloadCsv(`${state.template}-aps-collaboration-roles.csv`, apsCollaborationRows(), "Advanced planning collaboration roles");
  } else if (type === "aps-optimization-csv") {
    downloadCsv(`${state.template}-aps-optimization-playbook.csv`, apsOptimizationRows(), "Advanced planning optimization playbook");
  } else if (type === "schedule-streams-csv") {
    downloadCsv(`${state.template}-stream-transfer-schedule.csv`, scheduleStreamRows(), "Stream transfer schedule");
  } else if (type === "schedule-cycles-csv") {
    downloadCsv(`${state.template}-equipment-reuse-cycles.csv`, scheduleCycleRows(), "Equipment reuse cycles");
  } else if (type === "schedule-resources-csv") {
    downloadCsv(`${state.template}-schedule-resources.csv`, scheduleResourceRows(), "Schedule resources");
  } else if (type === "recipe-csv") {
    downloadCsv(`${state.template}-editable-recipe.csv`, recipeEditorRows());
  } else if (type === "routes-csv") {
    downloadCsv(`${state.template}-route-comparison.csv`, routeComparisonRows());
  } else if (type === "route-topology-csv") {
    downloadCsv(`${state.template}-route-topology.csv`, routeTopologyRows().flatMap((route) => route.nodes.map((node) => ({
      route: route.route,
      label: route.label,
      entry: route.entry,
      merge: route.merge,
      sharedSteps: route.sharedSteps,
      branchSteps: route.branchSteps,
      totalSteps: route.totalSteps,
      nodeIndex: node.index,
      tag: node.tag,
      operation: node.operation,
      group: node.group,
      nodeRoute: node.route,
      predecessor: node.predecessor,
      startH: node.startH,
      finishH: node.finishH,
      status: node.status,
    }))));
  } else if (type === "route-optimizer-csv") {
    downloadCsv(`${state.template}-route-optimizer.csv`, routeOptimizationRows());
  } else if (type === "plant-simulation-objects-csv") {
    const plantSim = plantSimulationModel();
    downloadCsv(`${state.template}-plant-simulation-objects.csv`, plantSimulationObjectRows(plantSim), "Object-oriented plant simulation object library");
  } else if (type === "plant-simulation-experiments-csv") {
    const plantSim = plantSimulationModel();
    downloadCsv(`${state.template}-plant-simulation-experiments.csv`, plantSimulationExperimentRows(plantSim), "Plant simulation experiment manager");
  } else if (type === "plant-simulation-interfaces-csv") {
    downloadCsv(`${state.template}-plant-simulation-interfaces.csv`, plantSimulationInterfaceRows(), "Plant simulation integration matrix");
  } else if (type === "plant-simulation-svg") {
    downloadSvg(`${state.template}-plant-simulation-layout.svg`, plantSimulationSvg());
  } else if (type === "examples-csv") {
    downloadCsv("axion-original-example-library.csv", templateExampleRows(), "Original example library");
  } else if (type === "examples-json") {
    downloadJson("axion-original-example-library.json", {
      examples: templateExampleRows(),
      models: Object.fromEntries(Object.entries(templates).map(([key, template]) => [key, {
        label: template.label,
        product: template.product,
        description: template.description,
        units: template.units.map((unitItem) => ({ id: unitItem.id, name: unitItem.name, type: unitItem.type, class: unitItem.cls, x: unitItem.x, y: unitItem.y })),
        streams: template.streams.map((streamItem) => ({ id: streamItem.id, from: streamItem.from, to: streamItem.to, composition: streamItem.composition, phase: streamItem.phase })),
      }])),
      note: "Original Axion generated example library. This package is not copied from third-party simulator example files.",
    }, "Original example library");
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

const legacyAuthKeys = ["axion-auth", "atlas-auth", "aion-auth", "daedalus-auth", "archon-auth", "axioma-auth"];
const staticAuth = {
  token: "axion-static-session-v1",
  users: [
    { user: "kbrenner", name: "KBrenner", role: "admin", passwordHash: "81dc948cd3fa9ec2064515b4267ef9a339993233dbdc0e984ce7b0fde6e1a0a9" },
    { user: "mahmed", name: "MAhmed", role: "user", passwordHash: "5626696e19ac4b81318bf2bdc4af05efb210da38a29f0cc395eeda1c37d11ede" },
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
  return staticAuth.users.find((candidate) => candidate.user === normalizedUser && candidate.passwordHash === passwordHash) || null;
}

function staticAccountForUser(user = "") {
  const normalizedUser = String(user || "").trim().toLowerCase();
  const candidate = staticAuth.users.find((item) => item.user === normalizedUser) || staticAuth.users[0];
  return {
    role: candidate.role || "static",
    name: candidate.name || candidate.user,
    username: candidate.user,
    principal: candidate.user,
    productName: "Axion Process OS",
    billing: {
      plan: candidate.role === "admin" ? "Owner workspace" : "Internal private workspace",
      paymentStatus: "password access, payment exempt",
      amountFormatted: "2.400,00 EUR",
      customerId: candidate.user,
      billingEmail: `${candidate.user}@local.axion`,
    },
  };
}

async function apiRequest(path, options = {}) {
  const session = window.localStorage.getItem("axion-session");
  if (session === staticAuth.token && path === "/api/account") {
    return { account: staticAccountForUser(window.localStorage.getItem("axion-static-user") || "") };
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

function prettyUsername(value = "") {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "kbrenner") return "KBrenner";
  if (normalized === "mahmed") return "MAhmed";
  return String(value || "").trim();
}

function accountName() {
  const account = state.account || {};
  if (account.username) return prettyUsername(account.username);
  const name = String(account.name || "").trim();
  if (name && !["admin", "owner", "workspace owner", "static workspace user"].includes(name.toLowerCase())) return name;
  return account.email || account.principal || "Axion user";
}

function accountAccessLabel(account = state.account || {}) {
  if (account.role === "admin") return "Owner access";
  if (account.role === "customer") return "Paid workspace";
  if (account.role === "user") return "Internal user access";
  if (account.role === "static") return "Password access";
  return "Workspace access";
}

function accountInitials() {
  const parts = accountName().split(/[\s@._-]+/).filter(Boolean);
  if (parts.length > 1) return (parts[0]?.[0] || "A") + (parts[1]?.[0] || "");
  const compact = (parts[0] || "Axion").replace(/[^a-z0-9]/gi, "");
  return compact.slice(0, 2) || "AX";
}

function accountPrincipal() {
  const account = state.account || {};
  return account.username || account.email || account.principal || account.name || "local-user";
}

function projectOwnerLabel(project = {}) {
  const owner = project.owner || accountPrincipal();
  const rawOwnerName = project.ownerName || (owner === accountPrincipal() ? accountName() : owner);
  const ownerName = ["workspace owner", "owner", "admin", "static user", "static workspace user"].includes(String(rawOwnerName).toLowerCase())
    ? prettyUsername(owner)
    : rawOwnerName;
  return ownerName && ownerName !== owner ? `${ownerName} (${owner})` : owner;
}

function projectById(projectId) {
  return state.projects.find((project) => project.id === projectId);
}

function versionById(versionId) {
  return state.projectVersions.find((version) => version.id === versionId);
}

function inviteById(inviteId) {
  return state.projectInvites.find((invite) => invite.id === inviteId);
}

function renderProfileMenu() {
  if (!els.profileButton || !els.profilePanel) return;
  const account = state.account || {};
  const config = state.productConfig || {};
  const billing = account.billing || {};
  const activeProject = state.projects.find((item) => item.id === state.currentProjectId);
  const amount = billing.amountFormatted || config.amountFormatted || "2.400,00 EUR";
  const paymentStatus = billing.paymentStatus || (account.licenseKey ? "active license" : account.role === "static" ? "static access" : "workspace access");
  const plan = billing.plan || (account.role === "admin" ? "Owner workspace" : account.role === "customer" ? "Professional license" : "Private workspace");
  const principal = account.username || account.email || account.principal || accountName();
  els.profileInitials.textContent = "";
  els.profileInitials.setAttribute("aria-hidden", "true");
  els.profileButton.setAttribute("aria-label", `Open profile for ${accountName()}`);
  els.profileName.textContent = accountName();
  els.profilePanel.innerHTML = `
    <section class="profile-card">
      <div class="profile-card-head">
        <span>${accountInitials().toUpperCase().slice(0, 2)}</span>
        <div>
          <strong>${accountName()}</strong>
          <small>${escapeHtml(principal)}</small>
        </div>
      </div>
      <dl>
        <dt>User</dt><dd>${escapeHtml(accountName())}</dd>
        <dt>Access</dt><dd>${escapeHtml(accountAccessLabel(account))}</dd>
        <dt>Plan</dt><dd>${plan}</dd>
        <dt>Status</dt><dd>${paymentStatus}</dd>
        <dt>Price</dt><dd>${amount}</dd>
        <dt>License</dt><dd>${account.licenseKey || billing.licenseKey || "not assigned"}</dd>
        <dt>Billing email</dt><dd>${billing.billingEmail || account.email || "not set"}</dd>
        <dt>Customer ID</dt><dd>${billing.customerId || account.principal || "local-session"}</dd>
        <dt>Project</dt><dd>${activeProject?.name || state.projectName || "unsaved model"}</dd>
      </dl>
      <div class="profile-actions">
        <button data-profile-view="projects" type="button">Projects</button>
        <button data-profile-view="reports" type="button">Invoices / Exports</button>
        <button id="logoutButton" data-profile-logout type="button">Logout</button>
      </div>
    </section>
  `;
}

function renderProductConfig(config) {
  state.productConfig = config || null;
  staticAccessMode = false;
  if (els.loginOrigin) {
    els.loginOrigin.textContent = config?.productName
      ? "Backend online. Private process workspace ready."
      : "Backend online. Private workspace ready.";
  }
  renderProfileMenu();
}

function renderStaticAccessMode() {
  staticAccessMode = true;
  state.productConfig = null;
  if (els.loginOrigin) {
    els.loginOrigin.textContent = "Online static mode. Enter the workspace password to unlock Axion.";
  }
  if (els.googleLoginFallback) els.googleLoginFallback.disabled = true;
  if (els.googleLoginStatus) {
    els.googleLoginStatus.textContent = "Password login is available now. Google SSO can be enabled by the workspace administrator.";
  }
  renderProfileMenu();
}

function renderCheckoutResult(payload) {
  if (!els.checkoutResult) return;
  const order = payload.order || {};
  const payment = payload.payment || {};
  const checkoutUrl = payment.checkoutUrl || order.checkoutUrl || "";
  const paid = Boolean(payload.paid || order.status === "paid_active" || payload.licenseKey);
  const amount = payment.amount || order.amount || "";
  const currency = payment.currency || order.currency || state.productConfig?.currency || "EUR";
  const licenseKey = payload.licenseKey || order.licenseKey || "";
  if (paid) {
    els.checkoutResult.innerHTML = `
      <strong>Access is active</strong>
      <dl>
        <dt>Reference</dt><dd>${escapeHtml(order.reference || payment.reference || "paid checkout")}</dd>
        <dt>Billing email</dt><dd>${escapeHtml(payload.customerEmail || order.customerEmail || els.checkoutEmail?.value || "")}</dd>
        <dt>License</dt><dd>${escapeHtml(licenseKey || "created")}</dd>
      </dl>
      <p>${escapeHtml(payload.instruction || "Payment confirmed. Axion is unlocking your workspace now.")}</p>
    `;
    return;
  }
  if (checkoutUrl) {
    els.checkoutResult.innerHTML = `
      <strong>Secure checkout ready</strong>
      <dl>
        <dt>Reference</dt><dd>${escapeHtml(order.reference || payment.reference || "")}</dd>
        <dt>Amount</dt><dd>${escapeHtml(`${amount} ${currency}`)}</dd>
        <dt>Activation</dt><dd>automatic after payment</dd>
      </dl>
      <p>${escapeHtml(payment.instruction || "Continue to Stripe Checkout. Your license activates automatically after successful payment.")}</p>
      <a class="checkout-link" href="${escapeHtml(checkoutUrl)}">Open secure checkout</a>
    `;
    return;
  }
  els.checkoutResult.innerHTML = `
    <strong>Checkout setup needed</strong>
    <dl>
      <dt>Provider</dt><dd>${escapeHtml(payment.provider || state.productConfig?.payments?.provider || "setup_required")}</dd>
      <dt>Required</dt><dd>STRIPE_SECRET_KEY</dd>
      <dt>Optional</dt><dd>STRIPE_PRICE_ID and STRIPE_WEBHOOK_SECRET</dd>
    </dl>
    <p>${escapeHtml(payload.error || payment.instruction || "Add Stripe credentials on the backend to enable automatic SaaS payment and license activation.")}</p>
  `;
}

async function createCheckoutOrder() {
  if (!els.checkoutResult) return;
  const customerName = els.checkoutName?.value.trim() || "";
  const customerEmail = els.checkoutEmail?.value.trim() || "";
  const company = els.checkoutCompany?.value.trim() || "";
  els.checkoutResult.innerHTML = "<p>Preparing secure checkout...</p>";
  try {
    const payload = await apiRequest("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ customerName, customerEmail, company }),
    });
    renderCheckoutResult(payload);
    const checkoutUrl = payload.payment?.checkoutUrl || payload.order?.checkoutUrl;
    if (checkoutUrl) window.setTimeout(() => window.location.assign(checkoutUrl), 260);
  } catch (error) {
    els.checkoutResult.innerHTML = `<p>${escapeHtml(error.message || "Could not start secure checkout.")}</p>`;
  }
}

async function handleCheckoutReturn() {
  const params = new URLSearchParams(window.location.search);
  const checkoutState = params.get("checkout");
  const sessionId = params.get("session_id");
  if (!checkoutState) return;
  showPublicPage("login", { scroll: false });
  if (checkoutState === "cancelled") {
    if (els.checkoutResult) {
      els.checkoutResult.innerHTML = "<p>Checkout was cancelled. You can restart secure checkout whenever you are ready.</p>";
    }
    window.history.replaceState(null, "", window.location.pathname);
    return;
  }
  if (checkoutState !== "success" || !sessionId) return;
  if (els.checkoutResult) {
    els.checkoutResult.innerHTML = "<p>Confirming payment and activating access...</p>";
  }
  try {
    const payload = await apiRequest(`/api/checkout/session/${encodeURIComponent(sessionId)}`);
    renderCheckoutResult(payload);
    if (payload.paid && payload.licenseKey) {
      const loginPayload = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ user: payload.customerEmail, password: payload.licenseKey, licenseKey: payload.licenseKey }),
      });
      storeSession(loginPayload.token);
      state.account = loginPayload.account || null;
      unlockApp();
      refreshProjects();
      showToast("Payment confirmed. Workspace unlocked.");
    }
  } catch (error) {
    if (els.checkoutResult) {
      els.checkoutResult.innerHTML = `<p>${escapeHtml(error.message || "Payment could not be confirmed yet.")}</p>`;
    }
  } finally {
    window.history.replaceState(null, "", window.location.pathname);
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

const mabWalkthroughSteps = [
  ["mab-overview", "Overview"],
  ["mab-upstream", "Upstream"],
  ["mab-downstream", "Downstream"],
  ["mab-cfd", "CFD + boundaries"],
  ["mab-reports", "Reports"],
];

const publicDetailStories = {
  "mab-overview": {
    eyebrow: "Canonical biopharma walkthrough",
    title: "Therapeutic monoclonal antibody production",
    body: "Axion uses an original CHO monoclonal-antibody platform process as the front-page guided demo because it forces the full software stack to work: upstream cell culture, harvest, capture chromatography, viral safety, polishing, UF/DF, fill, QC release, utilities, cleaning, scheduling, economics, LCA, and scale-up physics.",
    points: [
      "Starts from a therapeutic mAb product brief rather than a blank canvas.",
      "Creates a full process path with main units, support systems, cleaning, utilities, and QC release.",
      "Uses an original, non-proprietary reference architecture based on common mAb manufacturing practice.",
      "Keeps assumptions, equations, boundaries, reports, and references connected so the page sells the actual tool workflow.",
    ],
    visual: [
      ["Reference basis", "Common CHO/mAb platform-process architecture"],
      ["Model", "CHO mAb platform process"],
      ["Scale", "Fed-batch or continuous/perfusion variants"],
      ["Core", "Seed train -> production -> Protein A -> VI -> polishing -> UF/DF -> fill"],
      ["Outputs", "Streams, balances, equations, LCA/TEA datasets, SVG visuals"],
    ],
    actions: [
      ["mab-upstream", "Open upstream"],
      ["mab-downstream", "Open downstream"],
      ["login", "Try it in Axion"],
    ],
  },
  "mab-upstream": {
    eyebrow: "Upstream model",
    title: "Media, seed train, and production bioreactor",
    body: "The walkthrough begins with media preparation, sterile transfer, seed expansion, production STR, gas supply, antifoam, feed strategy, sampling, sensors, SIP/CIP, and working-volume limits.",
    points: [
      "Shows media and feed as explicit input streams rather than hidden assumptions.",
      "Tracks oxygen demand, kLa, mixing time, heat load, pH, lactate, ammonium, and viable-cell boundary checks.",
      "Separates main production units from utilities, sensors, cleaning, and QC nodes.",
    ],
    visual: [
      ["Equipment", "Media tank, seed reactors, production STR, gas mixer, feed tank"],
      ["Parameters", "Titer, VCD, doubling time, OUR, kLa, pH, feed, working volume"],
      ["Boundaries", "DO, ammonium, lactate, heat removal, shear, 20,000 L cell-culture caution"],
      ["Next", "Harvest and capture purification"],
    ],
    actions: [
      ["mab-cfd", "Inspect CFD + boundaries"],
      ["mab-downstream", "Continue downstream"],
      ["login", "Build this model"],
    ],
  },
  "mab-downstream": {
    eyebrow: "Downstream model",
    title: "Harvest, Protein A, viral safety, polishing, and formulation",
    body: "The example then walks through clarification, depth filtration, Protein A capture, low-pH viral inactivation, ion exchange polishing, viral filtration, UF/DF, sterile filtration, filling, and release analytics.",
    points: [
      "Every step carries yield, residence time, buffer, waste, equipment, and cleaning assumptions.",
      "Chromatography and filtration connect to resin/membrane costs, cycle count, buffer volumes, and hold-time risk.",
      "Outputs are prepared for QA review, TEA, LCA, and supplier conversations.",
    ],
    visual: [
      ["Capture", "Protein A with load, wash, elute, regeneration, storage"],
      ["Safety", "Low-pH viral inactivation and viral filtration"],
      ["Polish", "CEX/AEX, UF/DF, formulation, sterile filtration"],
      ["Release", "QC assays, batch record, fill-finish handoff"],
    ],
    actions: [
      ["mab-reports", "Open report outputs"],
      ["mab-cfd", "Review scale-up physics"],
      ["login", "Try private workspace"],
    ],
  },
  "mab-cfd": {
    eyebrow: "Scale-up physics",
    title: "CFD-style reactor screening and biochemical boundaries",
    body: "The frontend demo shows why the tool is more than a static flowsheet: reactor working volume, headspace, oxygen transfer, nutrient distribution, shear, mixing, ammonium, lactate, heat, and scale-up warnings become visible early.",
    points: [
      "Working volume is kept below the visual 80% screen limit with visible headspace.",
      "Oxygen and nutrient limitations are shown as distribution risks, not only as one average number.",
      "The tool recommends whether to adjust kLa, split into parallel trains, reduce working volume, or commission rigorous CFD.",
    ],
    visual: [
      ["kLa / OTR", "Oxygen-transfer margin and OUR screening"],
      ["Mixing", "Horizontal/tangential flow, dead-zone watch, feed-zone risk"],
      ["Cells", "Ammonium, lactate, pH, osmolality, shear limits"],
      ["Decision", "Scale-up, scale-out, or refine process parameters"],
    ],
    actions: [
      ["mab-reports", "See downloadable outputs"],
      ["builder", "See editable builder"],
      ["login", "Open workspace"],
    ],
  },
  "mab-reports": {
    eyebrow: "Decision outputs",
    title: "A decision canvas for the next engineering move",
    body: "The end of the walkthrough should answer the questions that matter: can the process scale, what limits it, what costs too much, what evidence is missing, and what should the team change next.",
    points: [
      "Scale decision: compare working volume, oxygen-transfer margin, heat removal, mixing time, shear, hold time, cleaning load, and annual throughput.",
      "Cost decision: rank media, feeds, buffers, resin, filters, single-use items, utilities, labor, QA/QC, waste, and facility burden by per-kg impact.",
      "Evidence decision: show which assumptions are measured, literature-based, supplier-based, screening-only, or still missing before a design review.",
    ],
    visual: [
      ["Scale", "parallel train vs. larger vessel vs. process-intensification"],
      ["Cost", "top OPEX/CAPEX drivers and sensitivity direction"],
      ["Quality", "CQA, sterility, hold-time, cleaning and release gaps"],
      ["Sustainability", "water, waste, energy, heat reuse and CO2e drivers"],
    ],
    actions: [
      ["pricing", "See pricing"],
      ["login", "Open private workspace"],
      ["mab-overview", "Restart walkthrough"],
    ],
  },
  brief: {
    eyebrow: "Platform layer",
    title: "The product brief becomes the model seed",
    body: "Axion starts from a plain-language product description and converts it into a likely process architecture, default scale, equipment family, parameters, and next assumptions to inspect.",
    points: ["Product, organism, scale, titer, recovery, sterility and constraints are captured together.", "Uploaded data can become project context.", "The model opens in the workspace instead of ending as a static recommendation."],
    visual: [["Input", "Text brief + optional uploaded data"], ["Output", "Chosen process family"], ["Next", "Editable plant workspace"]],
    actions: [["builder", "Open builder layer"], ["mab-overview", "See example"], ["login", "Try it"]],
  },
  builder: {
    eyebrow: "Platform layer",
    title: "Editable flowsheet with equipment and streams",
    body: "The builder is the bridge between a generated concept and real engineering work: drag units, connect streams, separate main/support systems, and inspect assumptions.",
    points: ["Main process, CIP/SIP, utilities, heat reuse, waste, QC, recycle and sensors are visually separated.", "Equipment and stream clicks reveal equations and data.", "The user can reshape the process rather than accept a black-box result."],
    visual: [["Canvas", "PFD-like unit and stream editor"], ["Library", "Reactors, filters, tanks, chromatography, valves, sensors"], ["Motion", "Animated stream direction and roles"]],
    actions: [["mab-upstream", "Use mAb model"], ["reports", "See reports"], ["login", "Open workspace"]],
  },
  reports: {
    eyebrow: "Platform layer",
    title: "Download center for engineering review",
    body: "The reporting layer turns the model into reviewable artifacts for LCA, TEA, slides, suppliers, thesis work, and process meetings.",
    points: ["Streams and balances include annual, per-batch, and per-kg product values.", "Costs expose fixed, variable, facility, material, labor, utility, validation and waste drivers.", "Visual downloads help explain the plant without screenshots."],
    visual: [["CSV", "Streams, balances, LCA, TEA, costs"], ["SVG", "Plant, LCA, TEA visualizations"], ["JSON", "Full model scenario"]],
    actions: [["mab-reports", "See mAb outputs"], ["pricing", "See pricing"], ["login", "Try it"]],
  },
  ai: {
    eyebrow: "Platform layer",
    title: "AI help tied to the actual model",
    body: "The AI layer is useful only when it knows the process context. Axion connects help prompts to selected units, streams, parameters, boundaries, and reports.",
    points: ["Ask how to lower media cost, improve oxygen transfer, reduce water use, or fix ammonium warnings.", "The answer points to the right module instead of staying generic.", "Recommendations keep a list of missing work before full simulation."],
    visual: [["Prompt", "Natural-language engineering question"], ["Context", "Active model + selected unit"], ["Action", "Jump to parameter, CFD, report, or builder module"]],
    actions: [["mab-cfd", "See boundary example"], ["mab-reports", "See outputs"], ["login", "Open workspace"]],
  },
  "cultured-meat": {
    eyebrow: "Example",
    title: "Cultured meat perfusion plant",
    body: "A food-biotech scenario with media cost pressure, oxygen transfer, ammonia/lactate limits, water reuse, cleaning, heat recovery, harvest wash, formulation, and packaging.",
    points: ["Good for media-cost optimization.", "Shows perfusion and cell-retention logic.", "Highlights food-grade scale-up and utility burden."],
    visual: [["Core", "Media -> seed -> perfusion STR -> harvest"], ["Risk", "Ammonium, lactate, oxygen, water demand"], ["Outputs", "LCA/TEA and process visuals"]],
    actions: [["mab-overview", "Compare with mAb"], ["login", "Build this model"]],
  },
  penicillin: {
    eyebrow: "Example",
    title: "Penicillin fermentation route",
    body: "A classic fermentation and recovery example with sterile media, aerobic fermentation, clarification, extraction, crystallization, drying, solvent recycle, emissions, and hazardous-material checks.",
    points: ["Good for fermentation and solvent recovery.", "Makes extraction, crystallization and drying visible.", "Useful for emissions, waste and route-scheduling discussion."],
    visual: [["Core", "Media -> fermenter -> separation -> extraction"], ["Recovery", "Crystallization and drying"], ["Support", "Solvent recycle and emissions"]],
    actions: [["mab-overview", "Compare with mAb"], ["login", "Build this model"]],
  },
  sources: {
    eyebrow: "Ecosystem layer",
    title: "Scientific sources and supplier assumptions attached to the model",
    body: "The reference layer is where the product becomes credible: papers, supplier values, SOP notes, standards, parameter assumptions, and internal decisions sit next to the equipment or stream they influence.",
    points: ["Click a bioreactor to see typical OUR, kLa, working-volume and scale-up assumptions.", "Replace screening values with supplier quotes or site data.", "Keep uncertainty visible for technical reviews."],
    visual: [["Attached to", "Units, streams, parameters, standards"], ["Use", "Audit assumptions and justify values"], ["Next", "Export model and source notes"]],
    actions: [["mab-overview", "See mAb model"], ["reports", "See exports"], ["login", "Open workspace"]],
  },
  connectors: {
    eyebrow: "Ecosystem layer",
    title: "Connector path for SCADA, historian, CFD and simulator handoff",
    body: "The public demo now explains how Axion should connect outward: not as a vague API promise, but as concrete handoff payloads for streams, equipment, historian tags, CFD cases, and property assumptions.",
    points: ["Map PI/SCADA tags to model variables.", "Export reactor geometry and boundary-condition packages for rigorous CFD.", "Move stream/equipment tables into external simulation and review tools."],
    visual: [["Historian", "DO, pH, airflow, agitation, pressure, feeds"], ["CFD", "Geometry, sparger, impeller, boundary conditions"], ["Simulators", "Streams, properties, equipment, balances"]],
    actions: [["mab-cfd", "See CFD layer"], ["mab-reports", "See handoff outputs"], ["login", "Open workspace"]],
  },
  recommendations: {
    eyebrow: "Ecosystem layer",
    title: "Readiness recommendations before a full production simulation",
    body: "Instead of pretending the screening model is final, Axion lists what is still missing for a defensible simulation: measured kinetics, site utilities, validated CFD, supplier quotes, impurity data, control logic and batch records.",
    points: ["Makes missing assumptions visible.", "Turns gaps into concrete engineering tasks.", "Helps users decide what to refine next before spending on detailed modelling."],
    visual: [["Screening", "Fast editable process model"], ["Gaps", "Data, validation, vendor, site-specific values"], ["Next", "Rigorous simulation or investment review"]],
    actions: [["mab-reports", "See report gaps"], ["mab-cfd", "See physics gaps"], ["login", "Try it"]],
  },
  "legacy-migration": {
    eyebrow: "Model continuity",
    title: "Bring existing process knowledge into a browser workspace",
    body: "Axion can use legitimate customer-owned exports, reports, stream tables, and equipment lists as inputs for a clean browser model with visible assumptions, collaborative review, versioning, and transparent scenario comparison.",
    points: ["Use existing customer-owned reports, stream tables, equipment lists, schedules, and economic outputs as migration inputs.", "Rebuild the process into an editable Axion model with visible assumptions and downloadable review data.", "Compare speed, clarity, collaboration, and model transparency before asking teams to change their workflow."],
    visual: [["Input", "Reports, CSV, Excel, stream table"], ["Axion", "Editable model, branches, comments"], ["Output", "Balance, TEA/LCA, scenario review"]],
    actions: [["api-first", "See API layer"], ["collaboration-versioning", "See collaboration"], ["login", "Open workspace"]],
  },
  "collaboration-versioning": {
    eyebrow: "Collaboration layer",
    title: "Shared process models with version history",
    body: "Teams need more than local model files. Axion exposes projects, collaborators, invitations, model archives, restoreable versions, and the product structure for future branches, diffs, comments, and approval gates.",
    points: ["Multiple users can be attached to project workspaces by username or email.", "Old models are saved in an archive so teams can continue later or restore a previous version.", "The architecture is ready for Git-style branches, model comparison, audit trails, and enterprise review states."],
    visual: [["Project", "Owner + collaborators"], ["Version", "Saved state + archive"], ["Review", "Diff, branch, approval roadmap"]],
    actions: [["legacy-migration", "See migration"], ["reports", "See exports"], ["login", "Try it"]],
  },
  "api-first": {
    eyebrow: "API-first layer",
    title: "REST, Python, webhooks, and cloud runs",
    body: "Legacy process-simulator automation is often desktop- and file-centric. Axion is structured around JSON process models, REST endpoints, Python automation targets, webhook events, and browser-native scenario runs.",
    points: ["Connector registry now includes REST API, Python SDK, webhooks, cloud batch runs, legacy simulator handoff, Aspen, gPROMS, CFD tools, LIMS, historian, ERP, and dashboards.", "The model exports equipment, streams, balances, parameters, economics, and report payloads as machine-readable data.", "Cloud-run and Monte-Carlo execution are represented as first-class product modules rather than spreadsheet add-ons."],
    visual: [["REST", "Projects, models, runs, reports"], ["Python", "Sweeps, fitting, Monte Carlo"], ["Webhooks", "Run complete, report ready, invite created"]],
    actions: [["connectors", "See connectors"], ["uncertainty", "See uncertainty"], ["login", "Open workspace"]],
  },
  "dynamic-twin": {
    eyebrow: "Digital twin layer",
    title: "Dynamic bioprocess model beyond a static flowsheet",
    body: "Axion now makes the dynamic roadmap explicit: time-dependent growth, metabolites, oxygen transfer, heat load, live plant tags, calibration, soft sensors, anomaly checks, and online prediction.",
    points: ["Simulation exports dynamic profiles for biomass, substrate, product, DO, lactate, ammonium, heat, and energy.", "Connector targets map SCADA, OPC UA, AVEVA PI, and batch-record data to model variables.", "High-fidelity handoff is prepared for equation-oriented modelling, parameter estimation, optimization, and eventually MPC."],
    visual: [["Dynamic", "Cell growth + metabolites"], ["Live data", "PI / SCADA / OPC UA"], ["Prediction", "Soft sensors + anomaly checks"]],
    actions: [["mab-cfd", "See CFD"], ["connectors", "See data layer"], ["login", "Try it"]],
  },
  uncertainty: {
    eyebrow: "Uncertainty layer",
    title: "Native sensitivity, scenarios, and probabilistic economics",
    body: "Instead of pushing uncertainty into separate Excel add-ins, Axion surfaces sensitivity and risk as part of the browser workflow.",
    points: ["Scenario reports expose titer, recovery, media cost, resin lifetime, utilities, yield, and CAPEX exponent as major drivers.", "The connector registry includes cloud runs for parameter sweeps and Monte Carlo cases.", "The roadmap includes Sobol-style global sensitivity, uncertainty bands, and automatic parameter fitting."],
    visual: [["Inputs", "Ranges and distributions"], ["Runs", "Sweeps and Monte Carlo"], ["Output", "Driver ranking and uncertainty bands"]],
    actions: [["economics-upgrade", "See economics"], ["reports", "See downloads"], ["login", "Open workspace"]],
  },
  "economics-upgrade": {
    eyebrow: "Economics layer",
    title: "Transparent economics for process decisions",
    body: "The economics layer now treats materials, media, feeds, resin, single-use, QC, cleaning, utilities, waste, CAPEX, validation, and facility burden as explicit drivers rather than one hidden number.",
    points: ["Economics is presented through transparent assumptions, editable drivers, scenario comparisons, and decision-ready TEA exports.", "Economics is prepared for vendor quotes, regional indices, inflation, scenario ranges, NPV, IRR, payback, break-even, and cash runway.", "Material cost is intentionally high and itemized for bioprocesses where media and consumables dominate."],
    visual: [["COGS", "Materials, labor, QA, utilities"], ["CAPEX", "Equipment, install, validation"], ["Finance", "NPV, IRR, payback roadmap"]],
    actions: [["uncertainty", "See uncertainty"], ["pricing", "See pricing"], ["login", "Try it"]],
  },
  "target-engineering": {
    eyebrow: "Workflow example",
    title: "Engineering and process-design workspaces",
    body: "Use Axion for conceptual design, sizing, utilities, CAPEX/OPEX, scheduling, debottlenecking, and scenario review across process-development projects.",
    points: ["Set up process routes with reusable equipment, streams, assumptions, and reports.", "Compare alternatives while keeping model logic and assumptions visible.", "Prepare review material for technical teams, suppliers, and project stakeholders."],
    visual: [["Use cases", "Facility design, capacity, CAPEX"], ["Teams", "Process, digital, simulation"], ["Output", "Team workspace + reports"]],
    actions: [["legacy-migration", "See migration"], ["pricing", "See pricing"], ["login", "Open workspace"]],
  },
  "target-biopharma": {
    eyebrow: "Workflow example",
    title: "Biopharma, CDMO, and MSAT teams",
    body: "Biopharma teams need site-standardized, reviewable models for mAbs, vaccines, advanced therapies, tech transfer, COGS, capacity, and customer-specific CDMO scenarios.",
    points: ["Model families include mAbs, continuous/perfusion variants, vaccines, viral vectors, cell and gene therapy, insulin/API, and downstream purification trains.", "CDMOs can use the workflow for rapid customer modelling, capacity planning, and quote-ready TEA exports.", "Enterprise readiness depends on security, validation, audit trails, access control, and source-backed model assumptions."],
    visual: [["Products", "mAbs, vaccines, CGT, viral vectors"], ["Outputs", "COGS, capacity, tech transfer"], ["Controls", "GMP, audit, QA, validation"]],
    actions: [["mab-overview", "See mAb example"], ["recommendations", "See readiness"], ["login", "Try it"]],
  },
  "target-food": {
    eyebrow: "Workflow example",
    title: "Food, fermentation, and alternative-protein teams",
    body: "Food biotech and precision fermentation workflows need rapid scale-up, media-cost realism, downstream recovery, utilities, sustainability, and review-ready TEA/LCA outputs.",
    points: ["Model cultivated meat, precision fermentation, enzyme production, alternative proteins, food processing, media preparation, utilities, wastewater, and heat reuse.", "Make media, feeds, water, cleaning, aeration, fermentation, recovery, drying, waste, and LCA drivers visible.", "Use the same product-brief workflow for founders, university teams, CDMOs, ingredient companies, and engineering partners."],
    visual: [["Core", "Fermentation, media, recovery"], ["Economics", "Media, utilities, waste"], ["Exports", "LCA / TEA / visuals"]],
    actions: [["cultured-meat", "See cultured meat"], ["penicillin", "See fermentation"], ["login", "Open workspace"]],
  },
};

function renderPublicDetail(key = "mab-overview", { scroll = true } = {}) {
  const story = publicDetailStories[key] || publicDetailStories["mab-overview"];
  const panel = document.querySelector("#publicDetailPanel");
  if (!panel) return;
  const currentIndex = mabWalkthroughSteps.findIndex(([stepKey]) => stepKey === key);
  const nextStep = currentIndex >= 0 ? mabWalkthroughSteps[Math.min(currentIndex + 1, mabWalkthroughSteps.length - 1)] : null;
  const isMabStory = currentIndex >= 0;
  panel.innerHTML = `
    <div class="public-detail-copy">
      <span>${escapeHtml(story.eyebrow)}</span>
      <h3>${escapeHtml(story.title)}</h3>
      <p>${escapeHtml(story.body)}</p>
      ${isMabStory ? `
        <div class="public-detail-stepper" aria-label="mAb example walkthrough">
          ${mabWalkthroughSteps.map(([stepKey, label], index) => `
            <button type="button" class="${stepKey === key ? "active" : ""}" data-public-detail-next="${escapeAttr(stepKey)}">
              <b>${String(index + 1).padStart(2, "0")}</b><span>${escapeHtml(label)}</span>
            </button>
          `).join("")}
        </div>
      ` : ""}
      <ul class="public-detail-list">
        ${story.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
      </ul>
      <div class="public-detail-actions">
        ${story.actions.map(([target, label]) => `<button type="button" data-public-detail-next="${escapeAttr(target)}">${escapeHtml(label)}</button>`).join("")}
        ${nextStep && nextStep[0] !== key ? `<button type="button" class="public-next-primary" data-public-detail-next="${escapeAttr(nextStep[0])}">Next: ${escapeHtml(nextStep[1])}</button>` : ""}
      </div>
    </div>
    <div class="public-detail-visual">
      ${story.visual.map(([label, value]) => `<div><b>${escapeHtml(label)}</b><span>${escapeHtml(value)}</span></div>`).join("")}
      ${isMabStory ? `
        <div class="public-source-card">
          <b>Why this example?</b>
          <span>mAb manufacturing is one of the clearest biopharma platform examples because it combines upstream cell culture, downstream purification, GMP controls, economics, LCA, and scale-up physics in one story.</span>
        </div>
      ` : ""}
    </div>
  `;
  document.querySelectorAll("[data-public-detail]").forEach((button) => {
    button.classList.toggle("active", button.dataset.publicDetail === key);
  });
  if (scroll) panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openPublicDetail(key = "mab-overview", { scroll = true } = {}) {
  showPublicPage("platform", { scroll: false });
  window.setTimeout(() => {
    renderPublicDetail(key);
    if (scroll) document.querySelector("#publicDetailPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

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
  if (targetPage === "platform") window.setTimeout(() => renderPublicDetail("mab-overview", { scroll: false }), 80);
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
      showToast(`Logged in as ${accountName()}`);
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
      els.googleLoginStatus.textContent = "Password login is available now. Google SSO can be enabled by the workspace administrator.";
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
    els.googleLoginStatus.textContent = "Password login is available now. Google SSO is not active for this workspace yet.";
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

function commandTemplateMatch(lower) {
  const candidates = [
    ["penicillin", "penicilin", "penicillium", "antibiotic"],
    ["antibody", "mab", "monoclonal", "cho"],
    ["culturedMeat", "cultured meat", "cellular agriculture", "meat"],
    ["fermentation", "industrial fermentation", "precision fermentation"],
    ["vaccine", "vaccin"],
    ["plasmid", "pdna", "gene therapy"],
    ["cellTherapy", "cell therapy", "car-t", "cart"],
    ["water", "water purification", "wfi"],
    ["wastewater", "waste water"],
    ["biohydrogen", "hydrogen"],
    ["insulin", "peptide"],
    ["smallMolecule", "small molecule", "api synthesis"],
    ["starch", "starch"],
    ["airPollution", "air pollution", "emissions"],
  ];
  const match = candidates.find(([key, ...terms]) => templates[key] && terms.some((term) => lower.includes(term)));
  return match?.[0] || null;
}

function commandScaleMatch(lower) {
  if (lower.includes("commercial") || lower.includes("industrial") || lower.includes("large scale")) return "commercial";
  if (lower.includes("demo") || lower.includes("demonstration")) return "demo";
  if (lower.includes("pilot")) return "pilot";
  if (lower.includes("lab") || lower.includes("bench")) return "lab";
  return null;
}

function commandEquipmentMatch(lower) {
  const aliases = [
    ["bioreactor", ["bioreactor", "reactor", "fermenter"]],
    ["cip", ["cip", "cleaning skid", "cleaning"]],
    ["sip-panel", ["sip", "sterilization panel"]],
    ["valve", ["manual valve", "valve"]],
    ["control-valve", ["control valve"]],
    ["pump", ["pump"]],
    ["heat-exchanger", ["heat exchanger", "heat reuse", "heater", "cooler"]],
    ["chromatography", ["chromatography", "column", "protein a"]],
    ["sterile-filter", ["sterile filter", "grade filter"]],
    ["depth-filter", ["depth filter"]],
    ["centrifuge", ["centrifuge"]],
    ["ufdf", ["ufdf", "uf/df", "tff", "ultrafiltration"]],
    ["hold-tank", ["hold tank", "surge tank", "buffer hold"]],
    ["sampling", ["sample", "sampling"]],
    ["pat", ["pat", "sensor", "soft sensor"]],
    ["waste-hold", ["waste hold", "waste tank"]],
  ];
  return aliases.find(([type, terms]) => palette.some((item) => item.type === type) && terms.some((term) => lower.includes(`add ${term}`) || lower.includes(`insert ${term}`) || lower.includes(`place ${term}`)))?.[0] || null;
}

function applySystemCommand(prompt) {
  const lower = prompt.toLowerCase();
  const applied = [];
  const steps = [];
  let targetView = null;
  let needsRender = false;
  let needsFit = false;

  const templateKey = commandTemplateMatch(lower);
  if (templateKey && state.template !== templateKey) {
    loadTemplate(templateKey, lower.includes("keep scale"));
    applied.push(`Loaded ${templates[templateKey].label} as the active product model.`);
    steps.push("The workspace now uses the selected product model, so labels, streams, equipment and reports follow that process instead of the previous template.");
    targetView = "overview";
  }

  const scaleKey = commandScaleMatch(lower);
  if (scaleKey && scalePresets[scaleKey] && state.scale !== scaleKey) {
    applyScale(scaleKey);
    applied.push(`Changed scale to ${scalePresets[scaleKey].label}.`);
    steps.push("Scale-dependent costs, batch size, annual batches and equipment sizing were recalculated.");
    needsRender = true;
  }

  if (lower.includes("full pfd") || lower.includes("all streams") || lower.includes("show flows") || lower.includes("show streams") || lower.includes("more flow")) {
    state.flowDetail = "full";
    state.canvasFocus = "all";
    applied.push("Switched the canvas to Full PFD with all flow labels visible.");
    steps.push("The canvas now shows equipment data, stream labels, utilities, waste, QC/data and supporting flows.");
    targetView = "flowsheet";
    needsRender = true;
    needsFit = true;
  }

  if (lower.includes("core process")) {
    state.canvasFocus = "main";
    applied.push("Focused the canvas on the core production train.");
    targetView = "flowsheet";
    needsRender = true;
  }

  if (lower.includes("utilities") || lower.includes("support systems")) {
    state.canvasFocus = "utilities";
    applied.push("Focused the canvas on utilities, support systems, cleaning and sterilization.");
    targetView = "flowsheet";
    needsRender = true;
  }

  if (lower.includes("recycle") || lower.includes("heat reuse") || lower.includes("heat recovery")) {
    state.params.heatRecovery = Math.min(85, Math.max(state.params.heatRecovery || 0, 45));
    if (!state.units.some((item) => item.name.toLowerCase().includes("heat recovery"))) addSectionPreset("recycle");
    state.canvasFocus = "recycle";
    applied.push("Added or emphasized recycle and heat-reuse logic, with heat recovery raised to at least 45%.");
    targetView = "flowsheet";
    needsRender = true;
  }

  if (lower.includes("cip") || lower.includes("sip") || lower.includes("cleaning") || lower.includes("sterilization")) {
    if (!state.units.some((item) => item.type === "cip")) addSectionPreset("cip");
    state.canvasFocus = "utilities";
    state.params.cipTime = Math.max(state.params.cipTime || 0, 2.5);
    state.params.sipHold = Math.max(state.params.sipHold || 0, 30);
    applied.push("Added or emphasized CIP/SIP support and cleaning-cycle parameters.");
    targetView = "flowsheet";
    needsRender = true;
  }

  if (lower.includes("oxygen") || lower.includes("kla") || lower.includes("do ") || lower.includes("mixing")) {
    state.params.kla = Math.min(260, Math.max(state.params.kla || 0, Math.round((state.params.kla || 65) * 1.18)));
    state.params.aeration = Math.min(2.5, Math.max(state.params.aeration || 0.01, Number(((state.params.aeration || 0.35) + 0.08).toFixed(2))));
    state.params.doSetpoint = Math.max(state.params.doSetpoint || 0, 45);
    applied.push("Improved oxygen-transfer assumptions: kLa, aeration and DO setpoint were raised conservatively.");
    steps.push("Open CFD to inspect oxygen, nutrient and shear gradients before accepting the scale-up.");
    targetView = "cfd";
    needsRender = true;
  }

  if (lower.includes("ammon") || lower.includes("lactate") || lower.includes("ph boundary")) {
    state.params.glutamine = Math.max(0, Number(((state.params.glutamine || 3) * 0.82).toFixed(1)));
    state.params.feedRate = Math.min(80, Math.max(state.params.feedRate || 0, 22));
    applied.push("Adjusted conservative cell-culture boundary assumptions for ammonium/lactate risk review.");
    targetView = "ai";
    needsRender = true;
  }

  if (lower.includes("material") || lower.includes("media cost") || lower.includes("medium cost")) {
    state.params.mediaCostPerL = Math.max(state.params.mediaCostPerL || 0, 60);
    state.params.feedSupplementCostPerL = Math.max(state.params.feedSupplementCostPerL || 0, 220);
    state.params.materialLossFactor = Math.max(state.params.materialLossFactor || 0, 22);
    applied.push("Raised media, feed supplement and material-loss assumptions so materials carry more weight in economics.");
    targetView = "economics";
    needsRender = true;
  }

  const equipmentType = commandEquipmentMatch(lower);
  if (equipmentType) {
    addUnitFromButton(equipmentType);
    applied.push(`Added ${palette.find((item) => item.type === equipmentType)?.label || "equipment"} near the current selection.`);
    targetView = "flowsheet";
    needsRender = true;
  }

  if (lower.includes("layout") || lower.includes("arrange") || lower.includes("clean up") || lower.includes("make it clear")) {
    autoLayout();
    state.flowDetail = "full";
    applied.push("Re-arranged the process canvas and enabled full PFD visibility.");
    targetView = "flowsheet";
    needsRender = true;
    needsFit = true;
  }

  if (lower.includes("fit") || lower.includes("zoom") || lower.includes("entire process") || lower.includes("whole process")) {
    applied.push("Fitted the whole process canvas into view.");
    targetView = "flowsheet";
    needsFit = true;
  }

  if (lower.includes("schedule")) {
    applied.push("Opened the scheduling and simulation layer.");
    steps.push("Use the schedule board to inspect equipment occupancy, cleaning windows, batch release and repeated equipment use.");
    targetView = "simulation";
  }

  if (lower.includes("download") || lower.includes("export") || lower.includes("csv") || lower.includes("lca") || lower.includes("tea")) {
    applied.push("Opened the Downloads area for LCA, TEA, streams, balances, visuals and schedules.");
    targetView = "reports";
  }

  if (lower.includes("source") || lower.includes("paper") || lower.includes("reference") || lower.includes("public data")) {
    applied.push("Opened scientific data and source governance.");
    steps.push("Axion uses public or licensed references only, keeps provenance attached, and does not copy proprietary simulator files.");
    targetView = "sources";
  }

  if (targetView) setView(targetView);
  if (needsRender) {
    syncInputs();
    renderAll();
  }
  if (needsFit) window.requestAnimationFrame(() => fitCanvas(true));

  const fallback = fallbackHelp(prompt);
  if (!applied.length) {
    steps.push(...fallback.steps);
    if (fallback.targetView) targetView = fallback.targetView;
  }

  return {
    title: applied.length ? "Applied to the model" : "Suggested next steps",
    applied,
    steps: steps.length ? steps : fallback.steps,
    targetView: targetView || fallback.targetView,
    assumptions: [
      `Active model: ${activeTemplate().label}`,
      `Current scale: ${scalePresets[state.scale].label}`,
      `Selected item: ${state.selectedId || "none"}`,
    ],
    commands: [
      "show full PFD and fit canvas",
      "add CIP and cleaning loop",
      "improve oxygen transfer",
      "open LCA and TEA downloads",
    ],
  };
}

function renderHelpResult(payload) {
  if (!els.helpResult) return;
  const guide = payload.guide || payload;
  els.helpResult.innerHTML = `
    <strong>${guide.title || "Recommended next steps"}</strong>
    ${(guide.applied || []).length ? `<div>${guide.applied.map((item) => `<span class="applied-change">${escapeHtml(item)}</span>`).join("")}</div>` : ""}
    <ol>${(guide.steps || []).map((step) => `<li>${step}</li>`).join("")}</ol>
    <div>${(guide.assumptions || []).map((item) => `<span>${item}</span>`).join("")}</div>
    ${guide.targetView ? `<button data-help-jump="${guide.targetView}" type="button">Open ${pageTitle(guide.targetView)}</button>` : ""}
    ${(guide.commands || []).length ? `<div>${guide.commands.map((command) => `<button data-help-command="${escapeAttr(command)}" type="button">${escapeHtml(command)}</button>`).join("")}</div>` : ""}
  `;
}

function localProjectStore() {
  return JSON.parse(window.localStorage.getItem("axion-local-projects") || '{"projects":[],"versions":[],"invites":[]}');
}

function saveLocalProjectStore(store) {
  window.localStorage.setItem("axion-local-projects", JSON.stringify(store));
}

function normalizeLocalProjectOwnership(store) {
  const principal = accountPrincipal();
  const name = accountName();
  let changed = false;
  (store.projects || []).forEach((project) => {
    if (!project.owner || ["static", "static-user", "local-user"].includes(String(project.owner).toLowerCase())) {
      project.owner = principal;
      project.ownerName = name;
      changed = true;
    }
    if (!project.ownerName || ["static user", "static workspace user"].includes(String(project.ownerName).toLowerCase())) {
      project.ownerName = name;
      changed = true;
    }
  });
  (store.versions || []).forEach((version) => {
    if (!version.createdBy || ["static", "static-user", "local-user"].includes(String(version.createdBy).toLowerCase())) {
      version.createdBy = principal;
      changed = true;
    }
  });
  if (changed) saveLocalProjectStore(store);
  return store;
}

function localIntegrations() {
  return [
    { key: "legacy-simulator", name: "Legacy process simulator", category: "Process simulation", status: "import-export scaffold", direction: "Import reports / export Axion model", auth: "file", description: "CSV, equipment, stream, balance, and economic report handoff for legitimate customer-owned simulator workflows." },
    { key: "rest-api", name: "Axion REST API", category: "API-first modelling", status: "schema scaffold", direction: "Read/write JSON process models", auth: "token", description: "Prepared for project, version, equipment, stream, parameter, simulation-run, and report endpoints." },
    { key: "python-sdk", name: "Python SDK", category: "Automation", status: "SDK planned", direction: "Run sweeps, fit parameters, export reports", auth: "token", description: "Prepared for notebooks, parameter sweeps, Monte Carlo, Sobol-style sensitivity analysis, and calibration scripts." },
    { key: "webhooks", name: "Webhooks", category: "Automation", status: "event scaffold", direction: "Notify external systems", auth: "signing secret", description: "Prepared for project.created, model.versioned, run.completed, report.ready, invite.created, and license.activated events." },
    { key: "cloud-runs", name: "Cloud batch runs", category: "Scenario compute", status: "run queue planned", direction: "Execute parameter sweeps and Monte Carlo cases", auth: "workspace token", description: "Prepared for browser-native scenario runs without Excel add-ins or desktop automation." },
    { key: "aspen", name: "Aspen Plus / Aspen Batch", category: "Process simulation", status: "connector planned", direction: "Export streams, property package, and economics basis", auth: "enterprise API or file", description: "Prepared for stream vectors, component properties, and unit-operation duty transfer." },
    { key: "comsol", name: "COMSOL Multiphysics", category: "CFD / multiphysics", status: "connector planned", direction: "Export reactor geometry and boundary conditions", auth: "file/API", description: "Prepared for rigorous bioreactor CFD geometry, sparger, impeller, and boundary-condition setup." },
    { key: "starccm", name: "Simcenter STAR-CCM+", category: "CFD", status: "connector planned", direction: "Export CFD screening cases", auth: "file/API", description: "Prepared for oxygen, nutrient, shear, gas-liquid, and agitation case handoff." },
    { key: "gproms", name: "gPROMS / equation-oriented modelling", category: "High-fidelity modelling", status: "handoff planned", direction: "Export equations, parameters, units, and estimation cases", auth: "file/API", description: "Prepared for rigorous dynamic models, parameter estimation, optimization, soft sensors, and model predictive control roadmaps." },
    { key: "opcua", name: "OPC UA / SCADA", category: "Live plant data", status: "connector planned", direction: "Read historian tags", auth: "server credentials", description: "Maps live pH, DO, temperature, pressure, flow, and batch-state tags to model parameters." },
    { key: "osisoft-pi", name: "AVEVA PI / OSIsoft PI", category: "Historian", status: "connector planned", direction: "Read batch historian", auth: "enterprise connector", description: "Prepared for batch-profile calibration, deviations, soft sensors, and continued process verification." },
    { key: "benchling", name: "Benchling", category: "ELN/LIMS", status: "connector planned", direction: "Read experiments and assays", auth: "API key/OAuth", description: "Prepared for titer, viability, media, assay, strain, and cell-line metadata transfer." },
    { key: "limsid", name: "LIMS / ELN generic", category: "Quality data", status: "connector planned", direction: "Read/write assay metadata", auth: "API key", description: "Generic release-test, sterility, HCP, DNA, endotoxin, and bioburden handoff shell." },
    { key: "erp", name: "ERP / procurement", category: "Economics", status: "connector planned", direction: "Read material prices, inventory, and vendor quote records", auth: "enterprise connector", description: "Prepared for regional costs, supplier quotes, media BOMs, consumables, resin, packaging, and working-capital assumptions." },
    { key: "powerbi", name: "Power BI / data warehouse", category: "Analytics", status: "export scaffold", direction: "Publish TEA/LCA and portfolio metrics", auth: "workspace token", description: "Prepared for dashboards across projects, scenarios, facilities, emissions, COGS, and readiness gaps." },
  ];
}

function connectorHandoffPayload(item) {
  return {
    product: "Axion Process OS",
    generatedAt: new Date().toISOString(),
    project: {
      id: state.currentProjectId || "unsaved-local-model",
      name: state.projectName,
      template: state.template,
      scale: state.scale,
    },
    connector: {
      key: item.key,
      name: item.name,
      category: item.category,
      status: item.status,
      direction: item.direction,
      auth: item.auth,
    },
    payloads: connectorPayloads(item),
    modelSummary: currentModelSummary(),
    streamsPreview: streamRows().slice(0, 12),
    streamSchedulePreview: scheduleStreamRows().slice(0, 12),
    equipmentReusePreview: scheduleCycleRows().slice(0, 12),
    equipmentPreview: state.units.slice(0, 12).map((unit) => ({
      id: unit.id,
      name: unit.name,
      type: unit.type,
      role: unit.role,
      size: unit.size,
      power: unit.power,
    })),
    note: "This is a connector handoff package. Live third-party sync requires customer credentials, vendor API access, schema mapping, and validation.",
  };
}

function handleIntegrationAction(action, key) {
  const item = connectorRegistryItems().find((candidate) => candidate.key === key);
  if (!item) return;
  state.selectedIntegration = key;
  state.connectorResults = state.connectorResults || {};
  const checks = connectorMappingChecks(item);
  const passCount = checks.filter((check) => check.status === "pass").length;
  const rows = connectorConfigurationRows(item);
  if (action === "export") {
    const payload = connectorHandoffPayload(item);
    downloadText(`${state.template}-${key}-connector-handoff.json`, "application/json", JSON.stringify(payload, null, 2));
    state.connectorResults[key] = {
      mode: "Export",
      title: "Connector handoff downloaded",
      message: `${payload.payloads.length} payload groups were packaged with equipment, stream, schedule, economics, and model-summary previews.`,
      rows: [...rows, ["Export timestamp", payload.generatedAt]],
      checks,
    };
    showToast(`${item.name} handoff JSON downloaded`);
  } else if (action === "test") {
    state.connectorResults[key] = {
      mode: "Mapping test",
      title: `${passCount}/${checks.length} checks passed`,
      message: passCount === checks.length
        ? "The current model is ready for a controlled connector export."
        : "The current model can be exported, but live sync still needs credentials, schema validation, or more complete model data.",
      rows,
      checks,
    };
    showToast(`${item.name}: ${passCount}/${checks.length} mapping checks passed`);
  } else {
    state.connectorResults[key] = {
      mode: "Configure",
      title: "Connector configuration opened",
      message: "Review the data contract, authentication method, payload groups, and mapping readiness before enabling a real integration.",
      rows,
      checks,
    };
    showToast(`${item.name} connector details opened`);
  }
  renderProjectsBoard();
  window.requestAnimationFrame(() => {
    document.querySelector(".connector-live-panel")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
}

async function refreshProjects() {
  try {
    const payload = await apiRequest("/api/projects");
    state.projects = payload.projects || [];
    state.projectInvites = payload.invites || [];
    state.integrations = payload.integrations || [];
    state.projectFolders = payload.folders || {};
  } catch {
    const store = normalizeLocalProjectOwnership(localProjectStore());
    state.projects = store.projects || [];
    state.projectInvites = store.invites || [];
    state.integrations = localIntegrations();
    state.projectFolders = { activeModels: "Browser localStorage", archivedModels: "Browser localStorage old model versions" };
  }
  if (!state.currentProjectId && state.projects.length) {
    const latestOpenProject = state.projects.find((project) => !project.archived) || state.projects[0];
    state.currentProjectId = latestOpenProject.id;
    state.projectName = latestOpenProject.name || state.projectName;
  }
  renderProjectsBoard();
  renderProfileMenu();
}

async function saveCurrentProject() {
  const nameInput = document.querySelector("#projectNameInput");
  const name = (nameInput?.value || state.projectName || `${activeTemplate().label} model`).trim();
  state.projectName = name;
  const modelState = exportCurrentModelState();
  const summary = currentModelSummary();
  try {
    if (!state.currentProjectId) {
      const payload = await apiRequest("/api/projects", {
        method: "POST",
        body: JSON.stringify({ name, description: state.productBrief, modelState, summary }),
      });
      state.currentProjectId = payload.project.id;
    } else {
      await apiRequest(`/api/projects/${encodeURIComponent(state.currentProjectId)}/save`, {
        method: "POST",
        body: JSON.stringify({ name, description: state.productBrief, modelState, summary, label: "Manual save" }),
      });
    }
    await refreshProjects();
    showToast("Project saved");
  } catch {
    const store = normalizeLocalProjectOwnership(localProjectStore());
    const now = new Date().toISOString();
    let project = store.projects.find((item) => item.id === state.currentProjectId);
    if (!project) {
      project = { id: `local-${Date.now()}`, name, description: state.productBrief, owner: accountPrincipal(), ownerName: accountName(), createdAt: now, collaborators: [], versionCount: 0 };
      store.projects.unshift(project);
      state.currentProjectId = project.id;
    }
    if (project.modelState) {
      store.versions.unshift({ id: `v-${Date.now()}`, projectId: project.id, createdAt: now, createdBy: accountPrincipal(), label: "Archived local model", modelState: project.modelState, summary: project.summary });
    }
    project.owner = project.owner || accountPrincipal();
    project.ownerName = project.ownerName || accountName();
    project.name = name;
    project.updatedAt = now;
    project.template = state.template;
    project.scale = state.scale;
    project.versionCount = (project.versionCount || 0) + 1;
    project.modelState = modelState;
    project.summary = summary;
    saveLocalProjectStore(store);
    await refreshProjects();
    showToast("Project saved locally");
  }
}

async function loadProject(projectId) {
  try {
    const payload = await apiRequest(`/api/projects/${encodeURIComponent(projectId)}`);
    state.currentProjectId = payload.project.id;
    state.projectName = payload.project.name;
    state.projectVersions = payload.versions || [];
    state.projectInvites = payload.invites || state.projectInvites;
    importModelState(payload.model?.modelState || {});
    setView("overview");
    showToast(`${payload.project.name} loaded`);
  } catch {
    const store = normalizeLocalProjectOwnership(localProjectStore());
    const project = store.projects.find((item) => item.id === projectId);
    if (!project) return showToast("Project not found");
    state.currentProjectId = project.id;
    state.projectName = project.name;
    state.projectVersions = store.versions.filter((item) => item.projectId === projectId);
    importModelState(project.modelState || {});
    setView("overview");
    showToast(`${project.name} loaded`);
  }
}

async function archiveProject(projectId) {
  try {
    await apiRequest(`/api/projects/${encodeURIComponent(projectId)}/archive`, { method: "POST", body: "{}" });
    await refreshProjects();
    showToast("Project archived");
  } catch {
    const store = normalizeLocalProjectOwnership(localProjectStore());
    const project = store.projects.find((item) => item.id === projectId);
    if (project) project.archived = true;
    saveLocalProjectStore(store);
    await refreshProjects();
    showToast("Project archived locally");
  }
}

async function inviteToProject() {
  if (!state.currentProjectId) {
    showToast("Save or load a project first");
    return;
  }
  const recipient = document.querySelector("#inviteRecipient")?.value.trim();
  const role = document.querySelector("#inviteRole")?.value || "editor";
  if (!recipient) {
    showToast("Enter email or username");
    return;
  }
  try {
    const payload = await apiRequest(`/api/projects/${encodeURIComponent(state.currentProjectId)}/invites`, {
      method: "POST",
      body: JSON.stringify({ recipient, role }),
    });
    if (payload.invite) state.projectInvites = [payload.invite, ...state.projectInvites.filter((invite) => invite.id !== payload.invite.id)];
    const input = document.querySelector("#inviteRecipient");
    if (input) input.value = "";
    await refreshProjects();
    showToast("Invite recorded");
  } catch {
    const store = normalizeLocalProjectOwnership(localProjectStore());
    const activeProject = state.projects.find((item) => item.id === state.currentProjectId);
    store.invites.unshift({ id: `invite-${Date.now()}`, projectId: state.currentProjectId, projectName: activeProject?.name || state.projectName, recipient, role, status: "pending", createdAt: new Date().toISOString(), delivery: "local" });
    saveLocalProjectStore(store);
    const input = document.querySelector("#inviteRecipient");
    if (input) input.value = "";
    await refreshProjects();
    showToast("Invite saved locally");
  }
}

async function restoreProjectVersion(versionId) {
  if (!state.currentProjectId) return;
  try {
    const payload = await apiRequest(`/api/projects/${encodeURIComponent(state.currentProjectId)}/versions/${encodeURIComponent(versionId)}/restore`, {
      method: "POST",
      body: "{}",
    });
    importModelState(payload.model?.modelState || {});
    showToast("Archived model restored");
  } catch {
    const store = normalizeLocalProjectOwnership(localProjectStore());
    const version = store.versions.find((item) => item.id === versionId && item.projectId === state.currentProjectId);
    if (version) {
      importModelState(version.modelState || {});
      showToast("Local archived model restored");
    }
  }
}

async function askToolHelp() {
  const prompt = els.helpPrompt?.value.trim() || "";
  if (prompt.length < 5) {
    renderHelpResult({
      title: "Describe the change first",
      steps: ["Type a concrete model instruction, for example: show full PFD, add CIP, improve oxygen transfer, fit canvas, open downloads, or switch to penicillin."],
      assumptions: [],
      commands: ["show full PFD and fit canvas", "add CIP and cleaning loop", "improve oxygen transfer", "open LCA and TEA downloads"],
    });
    return;
  }
  if (els.helpResult) els.helpResult.innerHTML = "<p>Applying changes...</p>";
  const guide = applySystemCommand(prompt);
  renderHelpResult(guide);
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
    const payload = await apiRequest("/api/account");
    state.account = payload.account || null;
    unlockApp();
    refreshProjects();
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
    button.addEventListener("click", (event) => {
      if (button.dataset.publicDetail) {
        event.preventDefault();
        event.stopPropagation();
        openPublicDetail(button.dataset.publicDetail);
        return;
      }
      scrollPublicTarget(button.dataset.publicTarget, button.dataset.publicTarget === "loginPanel");
    });
  });

  els.loginGate?.addEventListener("click", (event) => {
    const publicButton = event.target.closest("[data-public-target]");
    if (publicButton) {
      event.preventDefault();
      const target = publicButton.dataset.publicTarget;
      if (publicButton.dataset.publicDetail) {
        openPublicDetail(publicButton.dataset.publicDetail);
      } else {
        scrollPublicTarget(target, target === "loginPanel");
      }
      return;
    }
    const logoButton = event.target.closest("#publicLogo");
    if (logoButton) {
      event.preventDefault();
      scrollPublicTarget("publicHome");
    }
  });

  document.querySelector(".public-scroll")?.addEventListener("click", (event) => {
    const nextButton = event.target.closest("[data-public-detail-next]");
    if (nextButton) {
      event.preventDefault();
      event.stopPropagation();
      const target = nextButton.dataset.publicDetailNext;
      if (target === "login") {
        scrollPublicTarget("loginPanel", true);
      } else if (target === "pricing") {
        scrollPublicTarget("publicPricing");
      } else {
        openPublicDetail(target);
      }
      return;
    }
    const detailButton = event.target.closest("[data-public-detail]");
    if (!detailButton) return;
    event.preventDefault();
    event.stopPropagation();
    openPublicDetail(detailButton.dataset.publicDetail);
  });

  els.loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const user = els.loginUser.value.trim();
    const password = els.loginPassword.value.trim();
    els.loginError.textContent = "";
    if (staticAccessMode) {
      const staticUser = await staticPasswordMatches(user, password);
      if (staticUser) {
        storeSession(staticAuth.token);
        window.localStorage.setItem("axion-static-user", staticUser.user);
        state.account = staticAccountForUser(staticUser.user);
        els.loginPassword.value = "";
        unlockApp();
        refreshProjects();
        showToast(`Workspace unlocked for ${state.account.name}`);
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
      state.account = payload.account || null;
      els.loginPassword.value = "";
      unlockApp();
      refreshProjects();
      showToast(`Logged in as ${accountName()}`);
    } catch (error) {
      const staticUser = await staticPasswordMatches(user, password);
      if (staticUser) {
        storeSession(staticAuth.token);
        window.localStorage.setItem("axion-static-user", staticUser.user);
        state.account = staticAccountForUser(staticUser.user);
        els.loginPassword.value = "";
        unlockApp();
        refreshProjects();
        showToast(`Workspace unlocked for ${state.account.name}`);
      } else {
        els.loginError.textContent = error.message || "Access denied. Use the workspace password.";
      }
    }
  });

  els.checkoutForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    createCheckoutOrder();
  });

  els.profileButton?.addEventListener("click", () => {
    const expanded = els.profileButton.getAttribute("aria-expanded") === "true";
    els.profileButton.setAttribute("aria-expanded", String(!expanded));
    if (els.profilePanel) els.profilePanel.hidden = expanded;
    renderProfileMenu();
  });

  els.profilePanel?.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-profile-view]");
    if (viewButton) {
      setView(viewButton.dataset.profileView);
      els.profilePanel.hidden = true;
      els.profileButton?.setAttribute("aria-expanded", "false");
      return;
    }
    const logoutButton = event.target.closest("[data-profile-logout]");
    if (logoutButton) {
      window.localStorage.removeItem("axion-session");
      window.localStorage.removeItem("axion-static-user");
      clearLegacyAuth();
      state.account = null;
      els.profilePanel.hidden = true;
      els.profileButton?.setAttribute("aria-expanded", "false");
      renderProfileMenu();
      lockApp();
      showToast("Logged out");
    }
  });

  document.addEventListener("click", (event) => {
    if (!els.profilePanel || els.profilePanel.hidden) return;
    if (event.target.closest(".profile-menu")) return;
    els.profilePanel.hidden = true;
    els.profileButton?.setAttribute("aria-expanded", "false");
  });

  const setHelpOpen = (open) => {
    els.helpDock?.classList.toggle("open", open);
    els.helpToggle?.setAttribute("aria-expanded", String(open));
  };

  els.helpToggle?.addEventListener("click", () => {
    setHelpOpen(!els.helpDock?.classList.contains("open"));
  });

  els.helpClose?.addEventListener("click", () => {
    setHelpOpen(false);
    els.helpToggle?.focus();
  });

  els.askHelp?.addEventListener("click", askToolHelp);

  els.helpPrompt?.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") askToolHelp();
  });

  els.helpResult?.addEventListener("click", (event) => {
    const command = event.target.closest("[data-help-command]");
    if (command) {
      if (els.helpPrompt) els.helpPrompt.value = command.dataset.helpCommand;
      renderHelpResult(applySystemCommand(command.dataset.helpCommand || ""));
      return;
    }
    const button = event.target.closest("[data-help-jump]");
    if (button) {
      setView(button.dataset.helpJump);
    }
  });
}

function renderAll() {
  renderStartBoard();
  renderProjectsBoard();
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
  renderProfileMenu();
  enhanceInteractiveSurfaces();
}

function bindEvents() {
  document.addEventListener("pointerdown", (event) => {
    const surface = event.target.closest(".clickable-surface, .unit, .stream-line, .stream-label");
    const control = event.target.closest("button, a, input, textarea, select");
    if (!surface || surface.closest(".detail-drawer") || (control && !surface.matches(".unit, .stream-line, .stream-label"))) return;
    animateSurfaceClick(surface, event);
  });

  document.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const surface = event.target.closest(".clickable-surface");
    if (!surface) return;
    event.preventDefault();
    animateSurfaceClick(surface);
    showExploreDetails(surface);
  });

  document.addEventListener("click", (event) => {
    const globalJumpButton = event.target.closest("[data-jump-view]");
    if (globalJumpButton) {
      event.preventDefault();
      jumpToView(globalJumpButton.dataset.jumpView);
      return;
    }
    const closeButton = event.target.closest("[data-close-detail]");
    if (closeButton) {
      els.detailDrawer?.classList.remove("open");
      return;
    }
    const jumpButton = event.target.closest("[data-detail-jump]");
    if (jumpButton) {
      jumpToView(jumpButton.dataset.detailJump);
      els.detailDrawer?.classList.remove("open");
      return;
    }
    const detailLoadProject = event.target.closest("[data-detail-load-project]");
    if (detailLoadProject) {
      loadProject(detailLoadProject.dataset.detailLoadProject);
      els.detailDrawer?.classList.remove("open");
      return;
    }
    const detailRestoreVersion = event.target.closest("[data-detail-restore-version]");
    if (detailRestoreVersion) {
      restoreProjectVersion(detailRestoreVersion.dataset.detailRestoreVersion);
      els.detailDrawer?.classList.remove("open");
      return;
    }
    const surface = event.target.closest(".clickable-surface, .unit, .stream-line, .stream-label");
    const control = event.target.closest("button, a, input, textarea, select");
    if (!surface || surface.closest(".detail-drawer") || (control && !surface.matches(".unit, .stream-line, .stream-label"))) return;
    showExploreDetails(surface);
  });

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

  els.projectsBoard?.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-save-project]");
    if (saveButton) {
      saveCurrentProject();
      event.stopPropagation();
      return;
    }
    const refreshButton = event.target.closest("[data-refresh-projects]");
    if (refreshButton) {
      refreshProjects();
      showToast("Projects refreshed");
      event.stopPropagation();
      return;
    }
    const loadButton = event.target.closest("[data-load-project]");
    if (loadButton) {
      loadProject(loadButton.dataset.loadProject);
      event.stopPropagation();
      return;
    }
    const archiveButton = event.target.closest("[data-archive-project]");
    if (archiveButton) {
      archiveProject(archiveButton.dataset.archiveProject);
      event.stopPropagation();
      return;
    }
    const restoreButton = event.target.closest("[data-restore-version]");
    if (restoreButton) {
      restoreProjectVersion(restoreButton.dataset.restoreVersion);
      event.stopPropagation();
      return;
    }
    const inviteButton = event.target.closest("[data-invite-collaborator]");
    if (inviteButton) {
      inviteToProject();
      event.stopPropagation();
      return;
    }
    const integrationButton = event.target.closest("[data-integration-action]");
    if (integrationButton) {
      handleIntegrationAction(integrationButton.dataset.integrationAction, integrationButton.dataset.integrationKey);
      event.stopPropagation();
      return;
    }
    const integrationCard = event.target.closest("[data-integration-card]");
    if (integrationCard) {
      handleIntegrationAction("configure", integrationCard.dataset.integrationCard);
      event.stopPropagation();
      return;
    }
    const versionCard = event.target.closest("[data-version-card]");
    if (versionCard) {
      showVersionDetails(versionById(versionCard.dataset.versionCard));
      event.stopPropagation();
      return;
    }
    const inviteCard = event.target.closest("[data-invite-card]");
    if (inviteCard) {
      showInviteDetails(inviteById(inviteCard.dataset.inviteCard));
      event.stopPropagation();
      return;
    }
    const projectCard = event.target.closest("[data-project-card]");
    if (projectCard) {
      const project = projectById(projectCard.dataset.projectCard);
      if (project?.archived) showProjectDetails(project);
      else loadProject(projectCard.dataset.projectCard);
      event.stopPropagation();
    }
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
    const jumpButton = event.target.closest("[data-jump-view]");
    if (jumpButton) {
      setView(jumpButton.dataset.jumpView);
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

  els.simulationBoard.addEventListener("change", (event) => {
    const input = event.target.closest("[data-recipe-field]");
    if (!input) return;
    if (!applyRecipeInput(input)) return;
    renderSimulationBoard();
    renderRecommendations();
    renderReportsBoard();
    showToast(`${input.dataset.recipeUnit} recipe updated`);
  });

  els.simulationBoard.addEventListener("input", (event) => {
    const input = event.target.closest("[data-recipe-field]");
    if (!input || !applyRecipeInput(input)) return;
    window.clearTimeout(els.simulationBoard.recipeInputTimer);
    els.simulationBoard.recipeInputTimer = window.setTimeout(() => {
      renderSimulationBoard();
      renderRecommendations();
      renderReportsBoard();
    }, 350);
  });

  els.simulationBoard.addEventListener("click", (event) => {
    const downloadButton = event.target.closest("[data-download-report]");
    if (downloadButton) {
      handleReportDownload(downloadButton.dataset.downloadReport);
      return;
    }
    const scheduleUnitButton = event.target.closest("[data-jump-unit]");
    if (scheduleUnitButton) {
      state.selectedId = scheduleUnitButton.dataset.jumpUnit;
      renderEquationSpotlight();
      renderCanvas();
      renderSimulationBoard();
      showToast(`${state.selectedId} selected from schedule`);
      return;
    }
    const nodeButton = event.target.closest("[data-route-node]");
    if (nodeButton) {
      state.selectedId = nodeButton.dataset.routeNode;
      renderEquationSpotlight();
      renderCanvas();
      renderSimulationBoard();
      showToast(`${state.selectedId} selected`);
      return;
    }
    const assignRouteButton = event.target.closest("[data-route-assign-selected]");
    if (assignRouteButton) {
      const current = selectedUnit();
      if (!current) {
        showToast("Select a unit on the flowsheet first");
        return;
      }
      state.recipeOverrides[current.id] = {
        ...(state.recipeOverrides[current.id] || {}),
        route: assignRouteButton.dataset.routeAssignSelected,
      };
      renderSimulationBoard();
      renderRecommendations();
      renderReportsBoard();
      showToast(`${current.id} assigned to ${routeOptions.find((item) => item.key === assignRouteButton.dataset.routeAssignSelected)?.label || "route"}`);
      return;
    }
    const optimizerApply = event.target.closest("[data-route-optimizer-apply]");
    if (optimizerApply) {
      state.activeRoute = optimizerApply.dataset.routeOptimizerApply;
      renderSimulationBoard();
      renderRecommendations();
      renderReportsBoard();
      showToast(`${routeOptions.find((item) => item.key === state.activeRoute)?.label || "Route"} applied`);
      return;
    }
    const routeButton = event.target.closest("[data-route-select]");
    if (routeButton) {
      state.activeRoute = routeButton.dataset.routeSelect;
      renderSimulationBoard();
      renderRecommendations();
      renderReportsBoard();
      showToast(`${routeOptions.find((item) => item.key === state.activeRoute)?.label || "Route"} selected`);
      return;
    }
    const resetButton = event.target.closest("[data-recipe-reset]");
    if (resetButton) resetRecipeOverrides();
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
loadTemplate("culturedMeat");
startRealtimeTelemetry();
setView("start");
checkStoredAuth().finally(() => handleCheckoutReturn());
