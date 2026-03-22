/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Photoelectric Effect and De Broglie Hypothesis
 * Standard: Class 12
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_dual_nature {
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

export const dual_nature: CurriculumTopic_dual_nature = {
  id: 'dual-nature',
  title: 'Photoelectric Effect and De Broglie Hypothesis',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-03-22',
  revisionNumber: 276,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Photoelectric Effect and De Broglie Hypothesis',
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
    'Misapplying intermediate boundary approximation during Photoelectric Effect and De Broglie Hypothesis step #22',
    'Misapplying intermediate boundary approximation during Photoelectric Effect and De Broglie Hypothesis step #10',
    'Misapplying intermediate boundary approximation during Photoelectric Effect and De Broglie Hypothesis step #22'
  ]
  recommendedResources: [
    'NCERT Exemplar Class 12 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ]
};

export default dual_nature;
