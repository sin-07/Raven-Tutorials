/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Work-Energy Theorem and Elastic Collisions
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_work_energy_power {
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

export const work_energy_power: CurriculumTopic_work_energy_power = {
  id: 'work-energy-power',
  title: 'Work-Energy Theorem and Elastic Collisions',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2025-10-23',
  revisionNumber: 12,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Work-Energy Theorem and Elastic Collisions',
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

export default work_energy_power;
