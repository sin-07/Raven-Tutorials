/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Le Chatelier Principle and Buffer Equilibrium
 * Standard: Class 11
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_equilibrium {
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

export const equilibrium: CurriculumTopic_equilibrium = {
  id: 'equilibrium',
  title: 'Le Chatelier Principle and Buffer Equilibrium',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-10-09',
  revisionNumber: 363,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Le Chatelier Principle and Buffer Equilibrium',
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

export default equilibrium;
