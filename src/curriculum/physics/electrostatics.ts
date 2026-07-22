/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Coulomb Law, Electric Field Lines, and Gauss Law
 * Standard: Class 12
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_electrostatics {
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

export const electrostatics: CurriculumTopic_electrostatics = {
  id: 'electrostatics',
  title: 'Coulomb Law, Electric Field Lines, and Gauss Law',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-22',
  revisionNumber: 337,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Coulomb Law, Electric Field Lines, and Gauss Law',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60,
  recommendedResources: [
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Coulomb Law, Electric Field Lines, and Gauss Law',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Coulomb Law, Electric Field Lines, and Gauss Law',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Coulomb Law, Electric Field Lines, and Gauss Law',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Coulomb Law, Electric Field Lines, and Gauss Law',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Coulomb Law, Electric Field Lines, and Gauss Law',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Coulomb Law, Electric Field Lines, and Gauss Law',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Coulomb Law, Electric Field Lines, and Gauss Law',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Coulomb Law, Electric Field Lines, and Gauss Law',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Coulomb Law, Electric Field Lines, and Gauss Law'
  ]
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Coulomb Law, Electric Field Lines, and Gauss Law.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Coulomb Law, Electric Field Lines, and Gauss Law under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Coulomb Law, Electric Field Lines, and Gauss Law.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  }
};

export default electrostatics;
