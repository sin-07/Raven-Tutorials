/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Simple Harmonic Motion and Spring Pendulum
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_oscillations {
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

export const oscillations: CurriculumTopic_oscillations = {
  id: 'oscillations',
  title: 'Simple Harmonic Motion and Spring Pendulum',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-09',
  revisionNumber: 323,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Simple Harmonic Motion and Spring Pendulum',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50,
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Simple Harmonic Motion and Spring Pendulum.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Simple Harmonic Motion and Spring Pendulum under standard Class 11 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Simple Harmonic Motion and Spring Pendulum.',
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
  },
  revisionChecklist: [
    'Memorize core definitions, formulas, and SI units',
    'Complete NCERT in-text exercises and chapter summaries',
    'Solve at least 15 timed mock examination problems',
    'Review mistake notebook and re-derive weak concepts',
    'Verify complete mastery of Simple Harmonic Motion and Spring Pendulum conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Simple Harmonic Motion and Spring Pendulum conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Simple Harmonic Motion and Spring Pendulum conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Simple Harmonic Motion and Spring Pendulum conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Simple Harmonic Motion and Spring Pendulum conceptual derivations and NCERT practice set #5'
  ]
};

export default oscillations;
