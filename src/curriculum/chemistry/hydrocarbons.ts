/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Alkanes, Alkenes, Alkynes, and Aromatic Compounds
 * Standard: Class 11
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_hydrocarbons {
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

export const hydrocarbons: CurriculumTopic_hydrocarbons = {
  id: 'hydrocarbons',
  title: 'Alkanes, Alkenes, Alkynes, and Aromatic Compounds',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-15',
  revisionNumber: 294,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Alkanes, Alkenes, Alkynes, and Aromatic Compounds',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60,
  practiceQuestions: [
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Alkanes, Alkenes, Alkynes, and Aromatic Compounds under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Alkanes, Alkenes, Alkynes, and Aromatic Compounds under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Alkanes, Alkenes, Alkynes, and Aromatic Compounds under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Alkanes, Alkenes, Alkynes, and Aromatic Compounds under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Alkanes, Alkenes, Alkynes, and Aromatic Compounds under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Alkanes, Alkenes, Alkynes, and Aromatic Compounds under Class 11 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    }
  ]
};

export default hydrocarbons;
