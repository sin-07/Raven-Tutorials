/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Nernst Equation and Kohlrausch Conductivity Law
 * Standard: Class 12
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_electrochemistry {
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

export const electrochemistry: CurriculumTopic_electrochemistry = {
  id: 'electrochemistry',
  title: 'Nernst Equation and Kohlrausch Conductivity Law',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-26',
  revisionNumber: 307,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Nernst Equation and Kohlrausch Conductivity Law',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60,
  commonPitfalls: [
    'Misapplying intermediate boundary approximation during Nernst Equation and Kohlrausch Conductivity Law step #22',
    'Misapplying intermediate boundary approximation during Nernst Equation and Kohlrausch Conductivity Law step #10',
    'Misapplying intermediate boundary approximation during Nernst Equation and Kohlrausch Conductivity Law step #22',
    'Misapplying intermediate boundary approximation during Nernst Equation and Kohlrausch Conductivity Law step #10',
    'Misapplying intermediate boundary approximation during Nernst Equation and Kohlrausch Conductivity Law step #22',
    'Misapplying intermediate boundary approximation during Nernst Equation and Kohlrausch Conductivity Law step #10',
    'Misapplying intermediate boundary approximation during Nernst Equation and Kohlrausch Conductivity Law step #22',
    'Misapplying intermediate boundary approximation during Nernst Equation and Kohlrausch Conductivity Law step #10'
  ]
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Nernst Equation and Kohlrausch Conductivity Law.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Nernst Equation and Kohlrausch Conductivity Law under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Nernst Equation and Kohlrausch Conductivity Law.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  realWorldApplications: [
    'Industrial automation and precision measurement sensors',
    'Biomedical diagnostics and pharmacological formulation analysis',
    'Computational simulations and algorithmic optimization in aerospace',
    'Modern renewable energy grid stabilization techniques'
  ],
  revisionChecklist: [
    'Memorize core definitions, formulas, and SI units',
    'Complete NCERT in-text exercises and chapter summaries',
    'Solve at least 15 timed mock examination problems',
    'Review mistake notebook and re-derive weak concepts'
  ]
};

export default electrochemistry;
