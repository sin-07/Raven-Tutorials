/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Pair of Linear Equations in Two Variables
 * Standard: Class 10
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_linear_equations {
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

export const linear_equations: CurriculumTopic_linear_equations = {
  id: 'linear-equations',
  title: 'Pair of Linear Equations in Two Variables',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-14',
  revisionNumber: 299,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Pair of Linear Equations in Two Variables',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in Pair of Linear Equations in Two Variables module section #2 for competitive examinations',
    'Demonstrate advanced competency in Pair of Linear Equations in Two Variables module section #14 for competitive examinations',
    'Demonstrate advanced competency in Pair of Linear Equations in Two Variables module section #2 for competitive examinations',
    'Demonstrate advanced competency in Pair of Linear Equations in Two Variables module section #14 for competitive examinations',
    'Demonstrate advanced competency in Pair of Linear Equations in Two Variables module section #2 for competitive examinations',
    'Demonstrate advanced competency in Pair of Linear Equations in Two Variables module section #14 for competitive examinations',
    'Demonstrate advanced competency in Pair of Linear Equations in Two Variables module section #2 for competitive examinations'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 14,
  sampleProblemCount: 45,
  recommendedResources: [
    'NCERT Exemplar Class 10 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ]
};

export default linear_equations;
