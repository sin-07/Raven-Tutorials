/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Simple Harmonic Motion and Spring Pendulum
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_oscillations {
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

export const oscillations: CurriculumTopic_oscillations = {
  id: 'oscillations',
  title: 'Simple Harmonic Motion and Spring Pendulum',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2025-11-12',
  revisionNumber: 32,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Simple Harmonic Motion and Spring Pendulum',
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

export default oscillations;
