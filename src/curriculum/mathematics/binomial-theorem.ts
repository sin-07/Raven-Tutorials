/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Binomial Theorem for Positive Integral Indices
 * Standard: Class 11
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_binomial_theorem {
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
}

export const binomial_theorem: CurriculumTopic_binomial_theorem = {
  id: 'binomial-theorem',
  title: 'Binomial Theorem for Positive Integral Indices',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-10-07',
  revisionNumber: 361,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Binomial Theorem for Positive Integral Indices',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 12,
  sampleProblemCount: 40
};

export default binomial_theorem;
