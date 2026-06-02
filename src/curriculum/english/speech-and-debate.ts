/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Persuasive Speech Architecture and Debate Logic
 * Standard: Class 12
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_speech_and_debate {
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
  examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
    practiceQuestions?: Array<{
    id: string;
    question: string;
    difficulty: 'easy' | 'medium' | 'hard';
    marks: number;
    hint?: string;
  }>;
};
}

export const speech_and_debate: CurriculumTopic_speech_and_debate = {
  id: 'speech-and-debate',
  title: 'Persuasive Speech Architecture and Debate Logic',
  subject: 'English',
  standard: 12,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-10-06',
  revisionNumber: 360,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Persuasive Speech Architecture and Debate Logic',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 14,
  sampleProblemCount: 45
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  lastReviewed: '2026-03-08',
  revisionNumber: 361
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Persuasive Speech Architecture and Debate Logic.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Persuasive Speech Architecture and Debate Logic under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Persuasive Speech Architecture and Debate Logic.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  lastReviewed: '2026-06-02',
  revisionNumber: 361
};

export default speech_and_debate;
