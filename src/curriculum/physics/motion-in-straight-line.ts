/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Kinematics: Velocity, Acceleration, and Motion
 * Standard: Class 11
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_motion_in_straight_line {
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
  realWorldApplications?: string[];
}

export const motion_in_straight_line: CurriculumTopic_motion_in_straight_line = {
  id: 'motion-in-straight-line',
  title: 'Kinematics: Velocity, Acceleration, and Motion',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-25',
  revisionNumber: 287,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Kinematics: Velocity, Acceleration, and Motion',
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
  realWorldApplications: [
    'Industrial automation and precision measurement sensors',
    'Biomedical diagnostics and pharmacological formulation analysis',
    'Computational simulations and algorithmic optimization in aerospace',
    'Modern renewable energy grid stabilization techniques'
  ],
  lastReviewed: '2026-04-12',
  revisionNumber: 288
};

export default motion_in_straight_line;
