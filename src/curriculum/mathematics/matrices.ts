/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Matrices: Operations and Symmetric Matrices
 * Standard: Class 12
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_matrices {
  id: string;
  title: string;
  subject: string;
  standard: number;
  weightagePercent: number;
  learningObjectives: string[];
  keyFormulaeOrConcepts: string[];
  recommendedHours: number;
  sampleProblemCount: number;
}

export const matrices: CurriculumTopic_matrices = {
  id: 'matrices',
  title: 'Matrices: Operations and Symmetric Matrices',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-09',
  revisionNumber: 241,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Matrices: Operations and Symmetric Matrices',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 14,
  sampleProblemCount: 45
};

export default matrices;
