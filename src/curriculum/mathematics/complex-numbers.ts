/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Complex Numbers & Argand Plane
 * Standard: Class 11
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_complex_numbers {
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

export const complex_numbers: CurriculumTopic_complex_numbers = {
  id: 'complex-numbers',
  title: 'Complex Numbers & Argand Plane',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-22',
  revisionNumber: 346,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Complex Numbers & Argand Plane',
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

export default complex_numbers;
