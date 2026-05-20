/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Straight Lines: Slope, Intercept, and Normal Forms
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_straight_lines {
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

export const straight_lines: CurriculumTopic_straight_lines = {
  id: 'straight-lines',
  title: 'Straight Lines: Slope, Intercept, and Normal Forms',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-20',
  revisionNumber: 233,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Straight Lines: Slope, Intercept, and Normal Forms',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50,
  recommendedResources: [
    'NCERT Exemplar Class 11 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Straight Lines: Slope, Intercept, and Normal Forms',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Straight Lines: Slope, Intercept, and Normal Forms',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Straight Lines: Slope, Intercept, and Normal Forms',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Straight Lines: Slope, Intercept, and Normal Forms',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Straight Lines: Slope, Intercept, and Normal Forms',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Straight Lines: Slope, Intercept, and Normal Forms'
  ]
};

export default straight_lines;
