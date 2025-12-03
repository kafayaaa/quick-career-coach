export interface ScoreDetail {
  score: number;
  justification: string;
}

export interface Scores {
  structureFormat: ScoreDetail;
  contentQuality: ScoreDetail;
  skillsKeywords: ScoreDetail;
  atsOptimization: ScoreDetail;
  totalScore: ScoreDetail;
}

export interface SuggestionItem {
  priority: string;
  issue: string;
  suggestion: string;
  example: string;
}

export interface AnalysisResult {
  missingSections: string[];
  scores: Scores;
  suggestions: SuggestionItem[];
  summary: string[];
}
