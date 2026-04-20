/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Mendelian Genetics and Linkage Analysis
 * Standard: Class 12
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_principles_of_inheritance {
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

export const principles_of_inheritance: CurriculumTopic_principles_of_inheritance = {
  id: 'principles-of-inheritance',
  title: 'Mendelian Genetics and Linkage Analysis',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-04-20',
  revisionNumber: 345,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Mendelian Genetics and Linkage Analysis',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 21,
  sampleProblemCount: 70,
  recommendedResources: [
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Mendelian Genetics and Linkage Analysis',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Mendelian Genetics and Linkage Analysis',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Mendelian Genetics and Linkage Analysis',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Mendelian Genetics and Linkage Analysis',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Mendelian Genetics and Linkage Analysis'
  ]
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Mendelian Genetics and Linkage Analysis.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Mendelian Genetics and Linkage Analysis under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Mendelian Genetics and Linkage Analysis.',
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

export default principles_of_inheritance;
