/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Cell Division: Mitosis and Meiosis Checkpoints
 * Standard: Class 11
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_cell_cycle {
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

export const cell_cycle: CurriculumTopic_cell_cycle = {
  id: 'cell-cycle',
  title: 'Cell Division: Mitosis and Meiosis Checkpoints',
  subject: 'Biology',
  standard: 11,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-27',
  revisionNumber: 320,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Cell Division: Mitosis and Meiosis Checkpoints',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions',
    'Rule 6: Standard dimensional and algebraic validation principles for Cell Division: Mitosis and Meiosis Checkpoints',
    'Rule 18: Standard dimensional and algebraic validation principles for Cell Division: Mitosis and Meiosis Checkpoints',
    'Rule 6: Standard dimensional and algebraic validation principles for Cell Division: Mitosis and Meiosis Checkpoints',
    'Rule 18: Standard dimensional and algebraic validation principles for Cell Division: Mitosis and Meiosis Checkpoints',
    'Rule 6: Standard dimensional and algebraic validation principles for Cell Division: Mitosis and Meiosis Checkpoints',
    'Rule 18: Standard dimensional and algebraic validation principles for Cell Division: Mitosis and Meiosis Checkpoints',
    'Rule 6: Standard dimensional and algebraic validation principles for Cell Division: Mitosis and Meiosis Checkpoints',
    'Rule 18: Standard dimensional and algebraic validation principles for Cell Division: Mitosis and Meiosis Checkpoints',
    'Rule 6: Standard dimensional and algebraic validation principles for Cell Division: Mitosis and Meiosis Checkpoints',
    'Rule 18: Standard dimensional and algebraic validation principles for Cell Division: Mitosis and Meiosis Checkpoints'
  ],
  recommendedHours: 14,
  sampleProblemCount: 45,
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Cell Division: Mitosis and Meiosis Checkpoints.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Cell Division: Mitosis and Meiosis Checkpoints under standard Class 11 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Cell Division: Mitosis and Meiosis Checkpoints.',
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
  conceptDerivations: [
    {
      topic: 'Core Derivation for Cell Division: Mitosis and Meiosis Checkpoints',
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

export default cell_cycle;
