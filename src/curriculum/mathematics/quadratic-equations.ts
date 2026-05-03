/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Quadratic Equations & Nature of Roots
 * Standard: Class 10
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_quadratic_equations {
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

export const quadratic_equations: CurriculumTopic_quadratic_equations = {
  id: 'quadratic-equations',
  title: 'Quadratic Equations & Nature of Roots',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-03',
  revisionNumber: 302,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Quadratic Equations & Nature of Roots',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in Quadratic Equations & Nature of Roots module section #8 for competitive examinations',
    'Demonstrate advanced competency in Quadratic Equations & Nature of Roots module section #20 for competitive examinations',
    'Demonstrate advanced competency in Quadratic Equations & Nature of Roots module section #8 for competitive examinations',
    'Demonstrate advanced competency in Quadratic Equations & Nature of Roots module section #20 for competitive examinations',
    'Demonstrate advanced competency in Quadratic Equations & Nature of Roots module section #8 for competitive examinations'
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
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Quadratic Equations & Nature of Roots.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Quadratic Equations & Nature of Roots under standard Class 10 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Quadratic Equations & Nature of Roots.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  recommendedResources: [
    'NCERT Exemplar Class 10 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ]
};

export default quadratic_equations;
