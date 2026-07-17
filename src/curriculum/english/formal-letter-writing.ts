/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Professional Correspondence and Formal Letter Formats
 * Standard: Class 10
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_formal_letter_writing {
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

export const formal_letter_writing: CurriculumTopic_formal_letter_writing = {
  id: 'formal-letter-writing',
  title: 'Professional Correspondence and Formal Letter Formats',
  subject: 'English',
  standard: 10,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-17',
  revisionNumber: 345,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Professional Correspondence and Formal Letter Formats',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions',
    'Rule 12: Standard dimensional and algebraic validation principles for Professional Correspondence and Formal Letter Formats',
    'Rule 24: Standard dimensional and algebraic validation principles for Professional Correspondence and Formal Letter Formats',
    'Rule 12: Standard dimensional and algebraic validation principles for Professional Correspondence and Formal Letter Formats',
    'Rule 24: Standard dimensional and algebraic validation principles for Professional Correspondence and Formal Letter Formats',
    'Rule 12: Standard dimensional and algebraic validation principles for Professional Correspondence and Formal Letter Formats',
    'Rule 24: Standard dimensional and algebraic validation principles for Professional Correspondence and Formal Letter Formats',
    'Rule 12: Standard dimensional and algebraic validation principles for Professional Correspondence and Formal Letter Formats',
    'Rule 24: Standard dimensional and algebraic validation principles for Professional Correspondence and Formal Letter Formats',
    'Rule 12: Standard dimensional and algebraic validation principles for Professional Correspondence and Formal Letter Formats'
  ],
  recommendedHours: 12,
  sampleProblemCount: 40,
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  conceptDerivations: [
    {
      topic: 'Core Derivation for Professional Correspondence and Formal Letter Formats',
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

export default formal_letter_writing;
