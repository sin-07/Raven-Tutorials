/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Trigonometric Functions & General Solutions
 * Standard: Class 11
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_trigonometric_functions {
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
  conceptDerivations?: Array<{
    topic: string;
    steps: string[];
    concludingEquation: string;
    examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
  };
}>;
}

export const trigonometric_functions: CurriculumTopic_trigonometric_functions = {
  id: 'trigonometric-functions',
  title: 'Trigonometric Functions & General Solutions',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-17',
  revisionNumber: 341,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Trigonometric Functions & General Solutions',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 17,
  sampleProblemCount: 55
  conceptDerivations: [
    {
      topic: 'Core Derivation for Trigonometric Functions & General Solutions',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  lastReviewed: '2026-04-02',
  revisionNumber: 342
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  lastReviewed: '2026-06-27',
  revisionNumber: 342
};

export default trigonometric_functions;
