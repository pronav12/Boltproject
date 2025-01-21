export interface AssessmentStep {
  title: string;
  description: string;
  icon: string;
}

export interface AssessmentResult {
  missionStatement: {
    sustainabilityIntegration: string;
    longTermGoals: string;
  };
  materialsAndProduction: {
    materialChoices: string[];
    animalBasedMaterials: string[];
    productionPractices: string[];
    chemicalManagement: string[];
  };
  packaging: {
    materials: string[];
    certifications: string[];
  };
  supplyChain: {
    transparency: string;
    depthOfDisclosure: string;
    traceability: string;
  };
  laborPractices: {
    standards: string[];
    certifications: string[];
    deiInitiatives: string[];
  };
  environmentalPractices: {
    carbonFootprint: string;
    waterManagement: string[];
    renewableEnergy: string;
    certifications: string[];
  };
  circularEconomy: {
    programs: string[];
    initiatives: string[];
  };
  customerEngagement: {
    sustainabilityClaims: string;
    educationalResources: string;
  };
  innovation: {
    investments: string[];
    partnerships: string[];
    lifecycleAssessments: string;
  };
  communityImpact: {
    contributions: string[];
    collaborations: string[];
  };
  compliance: {
    regulations: string[];
    progress: string;
  };
  reporting: {
    publications: string[];
    frameworks: string[];
    governance: string;
  };
  sources: string[];
  score?: number;
  category?: string;
  controversies?: {
    greenwashing: string[];
    labor: string[];
    environmental: string[];
    animalWelfare: string[];
    other: string[];
  };
}

export interface AssessmentError {
  error: string;
  message: string;
}