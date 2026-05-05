// Formulas for the CLAT Dynamic Study Engine

export interface NLUMetadata {
  targetScore: number;
  historicAIR: number;
  location: string;
  category: 'Top 3' | 'Top 10' | 'Tier 1' | 'Tier 2';
}

export const NLU_BENCHMARKS: Record<string, NLUMetadata> = {
  'NLSIU Bangalore': { targetScore: 98, historicAIR: 100, location: 'Bangalore', category: 'Top 3' },
  'NALSAR Hyderabad': { targetScore: 96, historicAIR: 180, location: 'Hyderabad', category: 'Top 3' },
  'WBNUJS Kolkata': { targetScore: 95, historicAIR: 250, location: 'Kolkata', category: 'Top 3' },
  'NLU Jodhpur': { targetScore: 92, historicAIR: 400, location: 'Jodhpur', category: 'Top 10' },
  'GNLU Gandhinagar': { targetScore: 91, historicAIR: 500, location: 'Gandhinagar', category: 'Top 10' },
  'NLIU Bhopal': { targetScore: 89, historicAIR: 650, location: 'Bhopal', category: 'Top 10' },
  'MNLU Mumbai': { targetScore: 88, historicAIR: 750, location: 'Mumbai', category: 'Top 10' },
  'RMLNLU Lucknow': { targetScore: 86, historicAIR: 900, location: 'Lucknow', category: 'Top 10' },
  'HNLU Raipur': { targetScore: 84, historicAIR: 1100, location: 'Raipur', category: 'Tier 1' },
  'NLU Odisha': { targetScore: 82, historicAIR: 1300, location: 'Cuttack', category: 'Tier 1' },
  'RGNUL Punjab': { targetScore: 80, historicAIR: 1500, location: 'Patiala', category: 'Tier 1' },
  'CNLU Patna': { targetScore: 78, historicAIR: 1800, location: 'Patna', category: 'Tier 2' },
  'NUALS Kochi': { targetScore: 76, historicAIR: 2200, location: 'Kochi', category: 'Tier 2' },
  'DSNLU Visakhapatnam': { targetScore: 74, historicAIR: 2500, location: 'Visakhapatnam', category: 'Tier 2' },
  'Other NLU': { targetScore: 70, historicAIR: 3000, location: 'India', category: 'Tier 2' }
};

export const NLU_TARGETS: Record<string, number> = Object.entries(NLU_BENCHMARKS).reduce((acc, [key, val]) => {
  acc[key] = val.targetScore;
  return acc;
}, {} as Record<string, number>);

export interface DiagnosticScores {
  english: number;
  gk: number;
  legal: number;
  logical: number;
  quant: number;
}

export interface StudentProfile {
  targetNlu: string;
  targetYear: number;
  targetRank: number;
  studentStatus: 'dropper' | 'school';
  hoursWeekdays: number;
  hoursWeekends: number;
  diagnosticScores: DiagnosticScores;
  behavior: {
    consistency: number;
    completionRate: number;
  };
}

/**
 * Calculates the marks gap between target and current average.
 */
export function calculateImprovementGap(currentAvg: number, targetNlu: string): number {
  const targetScore = NLU_TARGETS[targetNlu] || 70;
  return Math.max(0, targetScore - currentAvg);
}

/**
 * Calculates priority weightage for each subject based on weakness (100 - accuracy).
 */
export function calculateSubjectWeights(scores: DiagnosticScores) {
  const subjects = Object.keys(scores) as (keyof DiagnosticScores)[];
  
  // Weakness score = 100 - accuracy
  const weaknesses = subjects.reduce((acc, sub) => {
    acc[sub] = 100 - scores[sub];
    return acc;
  }, {} as Record<string, number>);

  const totalWeakness = Object.values(weaknesses).reduce((a, b) => a + b, 0);

  // Split weights based on proportional weakness
  const weights = subjects.reduce((acc, sub) => {
    acc[sub] = (weaknesses[sub] / totalWeakness) * 100;
    return acc;
  }, {} as Record<string, number>);

  return weights;
}

/**
 * Calculates total weekly hours available.
 */
export function calculateWeeklyHours(weekdays: number, weekends: number): number {
  return (weekdays * 5) + (weekends * 2);
}

/**
 * Calculates the internal CLAT Readiness Score.
 * Formula: 0.4(Mock Avg) + 0.2(Consistency) + 0.2(Accuracy) + 0.2(Completion Rate)
 */
export function calculateReadinessScore(
  mockAvg: number,
  consistency: number,
  accuracy: number, // Use average diagnostic accuracy
  completionRate: number
): number {
  return (0.4 * mockAvg) + (0.2 * consistency) + (0.2 * accuracy) + (0.2 * completionRate);
}

/**
 * Predicts the current trending rank based on readiness score.
 * This is a simplified heuristic for engagement.
 */
export function predictRankTrend(readinessScore: number): { rank: string, level: string, color: string } {
  if (readinessScore > 85) return { rank: "AIR < 500", level: "Top NLU Ready", color: "#FFD700" };
  if (readinessScore > 70) return { rank: "AIR 501 - 1500", level: "Competitive", color: "#4ade80" };
  if (readinessScore > 50) return { rank: "AIR 1501 - 5000", level: "Improving", color: "#60a5fa" };
  return { rank: "AIR 5000+", level: "Beginner", color: "#94a3b8" };
}

/**
 * Calculates current study momentum/velocity based on completion and consistency.
 */
export function calculateVelocity(completionRate: number, consistency: number): number {
  return (completionRate * 0.6) + (consistency * 0.4);
}

/**
 * Generates a task distribution for a weekly plan.
 */
export function distributeWeeklyHours(weeklyHours: number, weights: Record<string, number>) {
  return Object.entries(weights).reduce((acc, [sub, weight]) => {
    acc[sub] = Number(((weight / 100) * weeklyHours).toFixed(1));
    return acc;
  }, {} as Record<string, number>);
}
