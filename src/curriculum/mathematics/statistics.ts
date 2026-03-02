/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Statistics: Mean, Median, and Mode of Grouped Data
 * Standard: Class 10
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_statistics {
  id: string;
  title: string;
  subject: string;
  standard: number;
  weightagePercent: number;
  academicCycle?: string;
  lastReviewed?: string;
  revisionNumber?: number;
  learningObjectives: string[];
  keyFormulaeOrConcepts: string[];
  recommendedHours: number;
  sampleProblemCount: number;
  practiceQuestions?: Array<{
    id: string;
    question: string;
    difficulty: 'easy' | 'medium' | 'hard';
    marks: number;
    hint?: string;
  }>;
  examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
  };
  conceptDerivations?: Array<{
    topic: string;
    steps: string[];
    concludingEquation: string;
  }>;
  commonPitfalls?: string[];
  recommendedResources?: string[];
  realWorldApplications?: string[];
  revisionChecklist?: string[];
  laboratoryExperiments?: Array<{
    title: string;
    apparatus: string[];
    objective: string;
  }>;
}

export const statistics: CurriculumTopic_statistics = {
  id: 'statistics',
  title: 'Statistics: Mean, Median, and Mode of Grouped Data',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-03-02',
  revisionNumber: 329,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Statistics: Mean, Median, and Mode of Grouped Data',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 12,
  sampleProblemCount: 40,
  revisionChecklist: [
    'Verify complete mastery of Statistics: Mean, Median, and Mode of Grouped Data conceptual derivations and NCERT practice set #11',
    'Verify complete mastery of Statistics: Mean, Median, and Mode of Grouped Data conceptual derivations and NCERT practice set #23'
  ]
  conceptDerivations: [
    {
      topic: 'Core Derivation for Statistics: Mean, Median, and Mode of Grouped Data',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Statistics: Mean, Median, and Mode of Grouped Data',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default statistics;
