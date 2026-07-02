/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Real Numbers & Fundamental Theorem of Arithmetic
 * Standard: Class 10
 * Exam Weightage: ~6%
 */

export interface CurriculumTopic_real_numbers {
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

export const real_numbers: CurriculumTopic_real_numbers = {
  id: 'real-numbers',
  title: 'Real Numbers & Fundamental Theorem of Arithmetic',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 6,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-02',
  revisionNumber: 290,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Real Numbers & Fundamental Theorem of Arithmetic',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions',
    'Rule 12: Standard dimensional and algebraic validation principles for Real Numbers & Fundamental Theorem of Arithmetic',
    'Rule 24: Standard dimensional and algebraic validation principles for Real Numbers & Fundamental Theorem of Arithmetic',
    'Rule 12: Standard dimensional and algebraic validation principles for Real Numbers & Fundamental Theorem of Arithmetic',
    'Rule 24: Standard dimensional and algebraic validation principles for Real Numbers & Fundamental Theorem of Arithmetic',
    'Rule 12: Standard dimensional and algebraic validation principles for Real Numbers & Fundamental Theorem of Arithmetic',
    'Rule 24: Standard dimensional and algebraic validation principles for Real Numbers & Fundamental Theorem of Arithmetic',
    'Rule 12: Standard dimensional and algebraic validation principles for Real Numbers & Fundamental Theorem of Arithmetic',
    'Rule 24: Standard dimensional and algebraic validation principles for Real Numbers & Fundamental Theorem of Arithmetic'
  ],
  recommendedHours: 9,
  sampleProblemCount: 30,
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Real Numbers & Fundamental Theorem of Arithmetic.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Real Numbers & Fundamental Theorem of Arithmetic under standard Class 10 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Real Numbers & Fundamental Theorem of Arithmetic.',
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

export default real_numbers;
