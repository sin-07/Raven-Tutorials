/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Ohm Law, Kirchhoff Rules, and Wheatstone Bridge
 * Standard: Class 12
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_current_electricity {
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

export const current_electricity: CurriculumTopic_current_electricity = {
  id: 'current-electricity',
  title: 'Ohm Law, Kirchhoff Rules, and Wheatstone Bridge',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-13',
  revisionNumber: 337,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Ohm Law, Kirchhoff Rules, and Wheatstone Bridge',
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

export default current_electricity;
