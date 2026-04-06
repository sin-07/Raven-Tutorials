/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Photoelectric Effect and De Broglie Hypothesis
 * Standard: Class 12
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_dual_nature {
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

export const dual_nature: CurriculumTopic_dual_nature = {
  id: 'dual-nature',
  title: 'Photoelectric Effect and De Broglie Hypothesis',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-04-06',
  revisionNumber: 177,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Photoelectric Effect and De Broglie Hypothesis',
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

export default dual_nature;
