/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Limits, Continuity, and Derivatives
 * Standard: Class 11
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_limits_and_derivatives {
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

export const limits_and_derivatives: CurriculumTopic_limits_and_derivatives = {
  id: 'limits-and-derivatives',
  title: 'Limits, Continuity, and Derivatives',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-22',
  revisionNumber: 246,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Limits, Continuity, and Derivatives',
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
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Limits, Continuity, and Derivatives under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Limits, Continuity, and Derivatives under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Limits, Continuity, and Derivatives under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Limits, Continuity, and Derivatives under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Limits, Continuity, and Derivatives under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Limits, Continuity, and Derivatives under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Limits, Continuity, and Derivatives under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Limits, Continuity, and Derivatives under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Limits, Continuity, and Derivatives under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    }
  ]
  conceptDerivations: [
    {
      topic: 'Core Derivation for Limits, Continuity, and Derivatives',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Limits, Continuity, and Derivatives',
    'Premature approximation prior to final algebraic simplification'
  ],
  laboratoryExperiments: [
    {
      title: 'Experimental Verification for Limits, Continuity, and Derivatives',
      apparatus: ['Standard test bench', 'Precision multimeter / sensor kit', 'Calibration weights'],
      objective: 'Empirically verify theoretical predictions and quantify experimental error percentage'
    }
  ]
};

export default limits_and_derivatives;
