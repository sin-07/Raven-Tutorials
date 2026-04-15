/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Triangles & Similarity Criteria
 * Standard: Class 10
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_triangles {
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

export const triangles: CurriculumTopic_triangles = {
  id: 'triangles',
  title: 'Triangles & Similarity Criteria',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-04-15',
  revisionNumber: 311,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Triangles & Similarity Criteria',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in Triangles & Similarity Criteria module section #14 for competitive examinations',
    'Demonstrate advanced competency in Triangles & Similarity Criteria module section #2 for competitive examinations',
    'Demonstrate advanced competency in Triangles & Similarity Criteria module section #14 for competitive examinations',
    'Demonstrate advanced competency in Triangles & Similarity Criteria module section #2 for competitive examinations'
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
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Triangles & Similarity Criteria.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Triangles & Similarity Criteria under standard Class 10 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Triangles & Similarity Criteria.',
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
  }
};

export default triangles;
