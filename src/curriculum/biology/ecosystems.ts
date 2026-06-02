/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Ecosystem Dynamics, Nutrient Cycles, and Biomass
 * Standard: Class 12
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_ecosystems {
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

export const ecosystems: CurriculumTopic_ecosystems = {
  id: 'ecosystems',
  title: 'Ecosystem Dynamics, Nutrient Cycles, and Biomass',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-02',
  revisionNumber: 367,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Ecosystem Dynamics, Nutrient Cycles, and Biomass',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 12,
  sampleProblemCount: 40,
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Ecosystem Dynamics, Nutrient Cycles, and Biomass.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Ecosystem Dynamics, Nutrient Cycles, and Biomass under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Ecosystem Dynamics, Nutrient Cycles, and Biomass.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    },
    {
      id: 'pq-10',
      question: 'Analyze the institutional exam problem scenario #7 regarding Ecosystem Dynamics, Nutrient Cycles, and Biomass under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-22',
      question: 'Analyze the institutional exam problem scenario #19 regarding Ecosystem Dynamics, Nutrient Cycles, and Biomass under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-10',
      question: 'Analyze the institutional exam problem scenario #7 regarding Ecosystem Dynamics, Nutrient Cycles, and Biomass under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-22',
      question: 'Analyze the institutional exam problem scenario #19 regarding Ecosystem Dynamics, Nutrient Cycles, and Biomass under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-10',
      question: 'Analyze the institutional exam problem scenario #7 regarding Ecosystem Dynamics, Nutrient Cycles, and Biomass under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-22',
      question: 'Analyze the institutional exam problem scenario #19 regarding Ecosystem Dynamics, Nutrient Cycles, and Biomass under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-10',
      question: 'Analyze the institutional exam problem scenario #7 regarding Ecosystem Dynamics, Nutrient Cycles, and Biomass under Class 12 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    }
  ],
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  recommendedResources: [
    'NCERT Exemplar Class 12 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ]
};

export default ecosystems;
