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
  learningObjectives: string[];
  keyFormulaeOrConcepts: string[];
  recommendedHours: number;
  sampleProblemCount: number;
}

export const motion_in_straight_line: CurriculumTopic_motion_in_straight_line = {
  id: 'motion-in-straight-line',
  title: 'Kinematics: Velocity, Acceleration, and Motion',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 8,
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
};

export default motion_in_straight_line;
