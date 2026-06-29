/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Indefinite and Definite Integrals Evaluation
 * Standard: Class 12
 * Exam Weightage: ~18%
 */

export interface CurriculumTopic_integrals {
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

export const integrals: CurriculumTopic_integrals = {
  id: 'integrals',
  title: 'Indefinite and Definite Integrals Evaluation',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 18,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-29',
  revisionNumber: 261,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Indefinite and Definite Integrals Evaluation',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 27,
  sampleProblemCount: 90
};

export default integrals;
