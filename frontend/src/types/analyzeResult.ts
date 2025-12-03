export interface AnalyzeResult {
  scores: {
    contentQuality: { score: number; justification: string };
    structureFormat: { score: number; justification: string };
    atsOptimization: { score: number; justification: string };
    skillsKeywords: { score: number; justification: string };
    totalScore: { score: number; justification: string };
  };
  suggestions: {
    issue: string;
    suggestion: string;
    example: string;
    priority: string;
  }[];
  missingSections: string[];
  summary: string[];
}
