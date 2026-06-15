/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Biot-Savart Law and Ampere Circuital Law
 * Standard: Class 12
 * Exam Weightage: ~13%
 */

export interface CurriculumTopic_magnetic_effects {
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

export const magnetic_effects: CurriculumTopic_magnetic_effects = {
  id: 'magnetic-effects',
  title: 'Biot-Savart Law and Ampere Circuital Law',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 13,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-15',
  revisionNumber: 247,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Biot-Savart Law and Ampere Circuital Law',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 20,
  sampleProblemCount: 65
};

export default magnetic_effects;
