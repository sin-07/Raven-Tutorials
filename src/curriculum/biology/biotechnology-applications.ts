/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Biotechnology in Medicine and Agriculture
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_biotechnology_applications {
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

export const biotechnology_applications: CurriculumTopic_biotechnology_applications = {
  id: 'biotechnology-applications',
  title: 'Biotechnology in Medicine and Agriculture',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-20',
  revisionNumber: 358,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Biotechnology in Medicine and Agriculture',
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
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Biotechnology in Medicine and Agriculture.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Biotechnology in Medicine and Agriculture under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Biotechnology in Medicine and Agriculture.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Biotechnology in Medicine and Agriculture under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Biotechnology in Medicine and Agriculture under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Biotechnology in Medicine and Agriculture under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Biotechnology in Medicine and Agriculture under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Biotechnology in Medicine and Agriculture under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Biotechnology in Medicine and Agriculture under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-4',
      question: 'Analyze the institutional exam problem scenario #1 regarding Biotechnology in Medicine and Agriculture under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-16',
      question: 'Analyze the institutional exam problem scenario #13 regarding Biotechnology in Medicine and Agriculture under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    }
  ],
  recommendedResources: [
    'NCERT Exemplar Class 12 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ]
};

export default biotechnology_applications;
