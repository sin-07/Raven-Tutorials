/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Circles & Tangents from External Points
 * Standard: Class 10
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_circles {
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

export const circles: CurriculumTopic_circles = {
  id: 'circles',
  title: 'Circles & Tangents from External Points',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-02',
  revisionNumber: 330,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Circles & Tangents from External Points',
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
  revisionChecklist: [
    'Verify complete mastery of Circles & Tangents from External Points conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Circles & Tangents from External Points conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Circles & Tangents from External Points conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Circles & Tangents from External Points conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Circles & Tangents from External Points conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Circles & Tangents from External Points conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Circles & Tangents from External Points conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Circles & Tangents from External Points conceptual derivations and NCERT practice set #5'
  ]
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Circles & Tangents from External Points.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Circles & Tangents from External Points under standard Class 10 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Circles & Tangents from External Points.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  realWorldApplications: [
    'Industrial automation and precision measurement sensors',
    'Biomedical diagnostics and pharmacological formulation analysis',
    'Computational simulations and algorithmic optimization in aerospace',
    'Modern renewable energy grid stabilization techniques'
  ]
};

export default circles;
