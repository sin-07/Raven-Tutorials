/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Center of Mass and Moment of Inertia Theorems
 * Standard: Class 11
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_rotational_motion {
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

export const rotational_motion: CurriculumTopic_rotational_motion = {
  id: 'rotational-motion',
  title: 'Center of Mass and Moment of Inertia Theorems',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-01-31',
  revisionNumber: 112,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Center of Mass and Moment of Inertia Theorems',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 21,
  sampleProblemCount: 70
};

export default rotational_motion;
