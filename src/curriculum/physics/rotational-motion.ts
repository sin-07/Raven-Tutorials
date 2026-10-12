/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Center of Mass and Moment of Inertia Theorems
 * Standard: Class 11
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_rotational_motion {
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

export const rotational_motion: CurriculumTopic_rotational_motion = {
  id: 'rotational-motion',
  title: 'Center of Mass and Moment of Inertia Theorems',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-27',
  revisionNumber: 312,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Center of Mass and Moment of Inertia Theorems',
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
  practiceQuestions: [
    {
      id: 'pq-10',
      question: 'Analyze the institutional exam problem scenario #7 regarding Center of Mass and Moment of Inertia Theorems under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-22',
      question: 'Analyze the institutional exam problem scenario #19 regarding Center of Mass and Moment of Inertia Theorems under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-10',
      question: 'Analyze the institutional exam problem scenario #7 regarding Center of Mass and Moment of Inertia Theorems under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-22',
      question: 'Analyze the institutional exam problem scenario #19 regarding Center of Mass and Moment of Inertia Theorems under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-10',
      question: 'Analyze the institutional exam problem scenario #7 regarding Center of Mass and Moment of Inertia Theorems under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-22',
      question: 'Analyze the institutional exam problem scenario #19 regarding Center of Mass and Moment of Inertia Theorems under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-10',
      question: 'Analyze the institutional exam problem scenario #7 regarding Center of Mass and Moment of Inertia Theorems under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-22',
      question: 'Analyze the institutional exam problem scenario #19 regarding Center of Mass and Moment of Inertia Theorems under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-10',
      question: 'Analyze the institutional exam problem scenario #7 regarding Center of Mass and Moment of Inertia Theorems under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    }
  ],
  conceptDerivations: [
    {
      topic: 'Core Derivation for Center of Mass and Moment of Inertia Theorems',
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

export default rotational_motion;
