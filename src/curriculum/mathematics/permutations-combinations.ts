/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Permutations and Combinations Protocols
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_permutations_combinations {
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

export const permutations_combinations: CurriculumTopic_permutations_combinations = {
  id: 'permutations-combinations',
  title: 'Permutations and Combinations Protocols',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-20',
  revisionNumber: 363,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Permutations and Combinations Protocols',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50,
  revisionChecklist: [
    'Verify complete mastery of Permutations and Combinations Protocols conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Permutations and Combinations Protocols conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Permutations and Combinations Protocols conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Permutations and Combinations Protocols conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Permutations and Combinations Protocols conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Permutations and Combinations Protocols conceptual derivations and NCERT practice set #17'
  ]
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  conceptDerivations: [
    {
      topic: 'Core Derivation for Permutations and Combinations Protocols',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ]
};

export default permutations_combinations;
