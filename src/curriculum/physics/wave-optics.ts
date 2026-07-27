/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Huygens Principle and Double Slit Interference
 * Standard: Class 12
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_wave_optics {
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

export const wave_optics: CurriculumTopic_wave_optics = {
  id: 'wave-optics',
  title: 'Huygens Principle and Double Slit Interference',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-27',
  revisionNumber: 372,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Huygens Principle and Double Slit Interference',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 17,
  sampleProblemCount: 55,
  commonPitfalls: [
    'Misapplying intermediate boundary approximation during Huygens Principle and Double Slit Interference step #10',
    'Misapplying intermediate boundary approximation during Huygens Principle and Double Slit Interference step #22',
    'Misapplying intermediate boundary approximation during Huygens Principle and Double Slit Interference step #10',
    'Misapplying intermediate boundary approximation during Huygens Principle and Double Slit Interference step #22',
    'Misapplying intermediate boundary approximation during Huygens Principle and Double Slit Interference step #10',
    'Misapplying intermediate boundary approximation during Huygens Principle and Double Slit Interference step #22',
    'Misapplying intermediate boundary approximation during Huygens Principle and Double Slit Interference step #10',
    'Misapplying intermediate boundary approximation during Huygens Principle and Double Slit Interference step #22',
    'Misapplying intermediate boundary approximation during Huygens Principle and Double Slit Interference step #10'
  ]
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Huygens Principle and Double Slit Interference.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Huygens Principle and Double Slit Interference under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Huygens Principle and Double Slit Interference.',
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
  },
  realWorldApplications: [
    'Industrial automation and precision measurement sensors',
    'Biomedical diagnostics and pharmacological formulation analysis',
    'Computational simulations and algorithmic optimization in aerospace',
    'Modern renewable energy grid stabilization techniques'
  ]
};

export default wave_optics;
