/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Laws of Thermodynamics and Carnot Engine
 * Standard: Class 11
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_thermodynamics {
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

export const thermodynamics: CurriculumTopic_thermodynamics = {
  id: 'thermodynamics',
  title: 'Laws of Thermodynamics and Carnot Engine',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-27',
  revisionNumber: 322,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Laws of Thermodynamics and Carnot Engine',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions',
    'Rule 12: Standard dimensional and algebraic validation principles for Laws of Thermodynamics and Carnot Engine',
    'Rule 24: Standard dimensional and algebraic validation principles for Laws of Thermodynamics and Carnot Engine',
    'Rule 12: Standard dimensional and algebraic validation principles for Laws of Thermodynamics and Carnot Engine',
    'Rule 24: Standard dimensional and algebraic validation principles for Laws of Thermodynamics and Carnot Engine',
    'Rule 12: Standard dimensional and algebraic validation principles for Laws of Thermodynamics and Carnot Engine',
    'Rule 24: Standard dimensional and algebraic validation principles for Laws of Thermodynamics and Carnot Engine',
    'Rule 12: Standard dimensional and algebraic validation principles for Laws of Thermodynamics and Carnot Engine',
    'Rule 24: Standard dimensional and algebraic validation principles for Laws of Thermodynamics and Carnot Engine',
    'Rule 12: Standard dimensional and algebraic validation principles for Laws of Thermodynamics and Carnot Engine'
  ],
  recommendedHours: 17,
  sampleProblemCount: 55,
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Laws of Thermodynamics and Carnot Engine.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Laws of Thermodynamics and Carnot Engine under standard Class 11 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Laws of Thermodynamics and Carnot Engine.',
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
  ]
};

export default thermodynamics;
