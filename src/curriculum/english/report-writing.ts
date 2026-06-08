/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Journalistic and Institutional Event Reporting
 * Standard: Class 12
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_report_writing {
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

export const report_writing: CurriculumTopic_report_writing = {
  id: 'report-writing',
  title: 'Journalistic and Institutional Event Reporting',
  subject: 'English',
  standard: 12,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-08',
  revisionNumber: 363,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Journalistic and Institutional Event Reporting',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 14,
  sampleProblemCount: 45,
  recommendedResources: [
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Journalistic and Institutional Event Reporting',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Journalistic and Institutional Event Reporting',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Journalistic and Institutional Event Reporting',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Journalistic and Institutional Event Reporting',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Journalistic and Institutional Event Reporting',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Journalistic and Institutional Event Reporting',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Journalistic and Institutional Event Reporting'
  ]
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Journalistic and Institutional Event Reporting.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Journalistic and Institutional Event Reporting under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Journalistic and Institutional Event Reporting.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ]
};

export default report_writing;
