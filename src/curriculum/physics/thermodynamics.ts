/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Laws of Thermodynamics and Carnot Engine
 * Standard: Class 11
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_thermodynamics {
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

export const thermodynamics: CurriculumTopic_thermodynamics = {
  id: 'thermodynamics',
  title: 'Laws of Thermodynamics and Carnot Engine',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-16',
  revisionNumber: 217,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Laws of Thermodynamics and Carnot Engine',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 17,
  sampleProblemCount: 55
};

export default thermodynamics;
