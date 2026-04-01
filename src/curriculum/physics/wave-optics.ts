/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Huygens Principle and Double Slit Interference
 * Standard: Class 12
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_wave_optics {
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

export const wave_optics: CurriculumTopic_wave_optics = {
  id: 'wave-optics',
  title: 'Huygens Principle and Double Slit Interference',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-04-01',
  revisionNumber: 172,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Huygens Principle and Double Slit Interference',
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

export default wave_optics;
