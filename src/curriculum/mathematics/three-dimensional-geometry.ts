/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Three-Dimensional Geometry: Direction Ratios & Planes
 * Standard: Class 12
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_three_dimensional_geometry {
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

export const three_dimensional_geometry: CurriculumTopic_three_dimensional_geometry = {
  id: 'three-dimensional-geometry',
  title: 'Three-Dimensional Geometry: Direction Ratios & Planes',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-14',
  revisionNumber: 284,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Three-Dimensional Geometry: Direction Ratios & Planes',
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
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Three-Dimensional Geometry: Direction Ratios & Planes.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Three-Dimensional Geometry: Direction Ratios & Planes under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Three-Dimensional Geometry: Direction Ratios & Planes.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Three-Dimensional Geometry: Direction Ratios & Planes under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Three-Dimensional Geometry: Direction Ratios & Planes under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Three-Dimensional Geometry: Direction Ratios & Planes under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Three-Dimensional Geometry: Direction Ratios & Planes under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Three-Dimensional Geometry: Direction Ratios & Planes under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Three-Dimensional Geometry: Direction Ratios & Planes under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Three-Dimensional Geometry: Direction Ratios & Planes under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    }
  ]
};

export default three_dimensional_geometry;
