/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Alcohols, Phenols, and Ethers Reactions
 * Standard: Class 12
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_alcohols_phenols {
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

export const alcohols_phenols: CurriculumTopic_alcohols_phenols = {
  id: 'alcohols-phenols',
  title: 'Alcohols, Phenols, and Ethers Reactions',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-07',
  revisionNumber: 324,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Alcohols, Phenols, and Ethers Reactions',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 17,
  sampleProblemCount: 55,
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  conceptDerivations: [
    {
      topic: 'Core Derivation for Alcohols, Phenols, and Ethers Reactions',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ]
};

export default alcohols_phenols;
