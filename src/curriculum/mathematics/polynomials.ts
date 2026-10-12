/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Polynomials & Geometric Meaning of Zeroes
 * Standard: Class 10
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_polynomials {
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

export const polynomials: CurriculumTopic_polynomials = {
  id: 'polynomials',
  title: 'Polynomials & Geometric Meaning of Zeroes',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-22',
  revisionNumber: 296,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Polynomials & Geometric Meaning of Zeroes',
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
  recommendedResources: [
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Polynomials & Geometric Meaning of Zeroes',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Polynomials & Geometric Meaning of Zeroes',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Polynomials & Geometric Meaning of Zeroes',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Polynomials & Geometric Meaning of Zeroes',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Polynomials & Geometric Meaning of Zeroes',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Polynomials & Geometric Meaning of Zeroes',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Polynomials & Geometric Meaning of Zeroes',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Polynomials & Geometric Meaning of Zeroes',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Polynomials & Geometric Meaning of Zeroes'
  ],
  conceptDerivations: [
    {
      topic: 'Core Derivation for Polynomials & Geometric Meaning of Zeroes',
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

export default polynomials;
