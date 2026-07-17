/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Raoult Law and Colligative Properties
 * Standard: Class 12
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_solutions {
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

export const solutions: CurriculumTopic_solutions = {
  id: 'solutions',
  title: 'Raoult Law and Colligative Properties',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-17',
  revisionNumber: 303,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Raoult Law and Colligative Properties',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions',
    'Rule 6: Standard dimensional and algebraic validation principles for Raoult Law and Colligative Properties',
    'Rule 18: Standard dimensional and algebraic validation principles for Raoult Law and Colligative Properties',
    'Rule 6: Standard dimensional and algebraic validation principles for Raoult Law and Colligative Properties',
    'Rule 18: Standard dimensional and algebraic validation principles for Raoult Law and Colligative Properties',
    'Rule 6: Standard dimensional and algebraic validation principles for Raoult Law and Colligative Properties',
    'Rule 18: Standard dimensional and algebraic validation principles for Raoult Law and Colligative Properties',
    'Rule 6: Standard dimensional and algebraic validation principles for Raoult Law and Colligative Properties',
    'Rule 18: Standard dimensional and algebraic validation principles for Raoult Law and Colligative Properties',
    'Rule 6: Standard dimensional and algebraic validation principles for Raoult Law and Colligative Properties'
  ],
  recommendedHours: 17,
  sampleProblemCount: 55,
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Raoult Law and Colligative Properties.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Raoult Law and Colligative Properties under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Raoult Law and Colligative Properties.',
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

export default solutions;
