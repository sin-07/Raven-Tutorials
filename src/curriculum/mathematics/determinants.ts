/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Determinants: Minors, Cofactors, and Inverses
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_determinants {
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

export const determinants: CurriculumTopic_determinants = {
  id: 'determinants',
  title: 'Determinants: Minors, Cofactors, and Inverses',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-14',
  revisionNumber: 246,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Determinants: Minors, Cofactors, and Inverses',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50
};

export default determinants;
