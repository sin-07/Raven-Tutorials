/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Universal Law of Gravitation & Escape Velocity
 * Standard: Class 11
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_gravitation {
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

export const gravitation: CurriculumTopic_gravitation = {
  id: 'gravitation',
  title: 'Universal Law of Gravitation & Escape Velocity',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-27',
  revisionNumber: 317,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Universal Law of Gravitation & Escape Velocity',
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
  practiceQuestions: [
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Universal Law of Gravitation & Escape Velocity under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Universal Law of Gravitation & Escape Velocity under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Universal Law of Gravitation & Escape Velocity under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Universal Law of Gravitation & Escape Velocity under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Universal Law of Gravitation & Escape Velocity under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Universal Law of Gravitation & Escape Velocity under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Universal Law of Gravitation & Escape Velocity under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Universal Law of Gravitation & Escape Velocity under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Universal Law of Gravitation & Escape Velocity under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    }
  ]
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  conceptDerivations: [
    {
      topic: 'Core Derivation for Universal Law of Gravitation & Escape Velocity',
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

export default gravitation;
