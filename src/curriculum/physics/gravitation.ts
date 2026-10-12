/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Universal Law of Gravitation & Escape Velocity
 * Standard: Class 11
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_gravitation {
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

export const gravitation: CurriculumTopic_gravitation = {
  id: 'gravitation',
  title: 'Universal Law of Gravitation & Escape Velocity',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-08-14',
  revisionNumber: 307,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Universal Law of Gravitation & Escape Velocity',
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

export default gravitation;
