/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Real Numbers & Fundamental Theorem of Arithmetic
 * Standard: Class 10
 * Exam Weightage: ~6%
 */

export interface CurriculumTopic_real_numbers {
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
  examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
  };
}

export const real_numbers: CurriculumTopic_real_numbers = {
  id: 'real-numbers',
  title: 'Real Numbers & Fundamental Theorem of Arithmetic',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 6,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-19',
  revisionNumber: 281,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Real Numbers & Fundamental Theorem of Arithmetic',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 9,
  sampleProblemCount: 30
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  lastReviewed: '2026-03-28',
  revisionNumber: 282
};

export default real_numbers;
