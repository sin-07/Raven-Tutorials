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
  practiceQuestions?: Array<{
    id: string;
    question: string;
    difficulty: 'easy' | 'medium' | 'hard';
    marks: number;
    hint?: string;
  }>;
  examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
  };
  conceptDerivations?: Array<{
    topic: string;
    steps: string[];
    concludingEquation: string;
  }>;
  commonPitfalls?: string[];
  recommendedResources?: string[];
  realWorldApplications?: string[];
  revisionChecklist?: string[];
  laboratoryExperiments?: Array<{
    title: string;
    apparatus: string[];
    objective: string;
  }>;
}

export const motion_in_straight_line: CurriculumTopic_motion_in_straight_line = {
  id: 'motion-in-straight-line',
  title: 'Kinematics: Velocity, Acceleration, and Motion',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-04-15',
  revisionNumber: 292,
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
  sampleProblemCount: 40,
  commonPitfalls: [
    'Misapplying intermediate boundary approximation during Kinematics: Velocity, Acceleration, and Motion step #4',
    'Misapplying intermediate boundary approximation during Kinematics: Velocity, Acceleration, and Motion step #16',
    'Misapplying intermediate boundary approximation during Kinematics: Velocity, Acceleration, and Motion step #4',
    'Misapplying intermediate boundary approximation during Kinematics: Velocity, Acceleration, and Motion step #16'
  ]
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Kinematics: Velocity, Acceleration, and Motion.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Kinematics: Velocity, Acceleration, and Motion under standard Class 11 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Kinematics: Velocity, Acceleration, and Motion.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  recommendedResources: [
    'NCERT Exemplar Class 11 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ],
  realWorldApplications: [
    'Industrial automation and precision measurement sensors',
    'Biomedical diagnostics and pharmacological formulation analysis',
    'Computational simulations and algorithmic optimization in aerospace',
    'Modern renewable energy grid stabilization techniques'
  ]
};

export default motion_in_straight_line;
