/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Le Chatelier Principle and Buffer Equilibrium
 * Standard: Class 11
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_equilibrium {
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

export const equilibrium: CurriculumTopic_equilibrium = {
  id: 'equilibrium',
  title: 'Le Chatelier Principle and Buffer Equilibrium',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-03-12',
  revisionNumber: 367,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Le Chatelier Principle and Buffer Equilibrium',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 21,
  sampleProblemCount: 70,
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  conceptDerivations: [
    {
      topic: 'Core Derivation for Le Chatelier Principle and Buffer Equilibrium',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  revisionChecklist: [
    'Memorize core definitions, formulas, and SI units',
    'Complete NCERT in-text exercises and chapter summaries',
    'Solve at least 15 timed mock examination problems',
    'Review mistake notebook and re-derive weak concepts',
    'Verify complete mastery of Le Chatelier Principle and Buffer Equilibrium conceptual derivations and NCERT practice set #23',
    'Verify complete mastery of Le Chatelier Principle and Buffer Equilibrium conceptual derivations and NCERT practice set #11',
    'Verify complete mastery of Le Chatelier Principle and Buffer Equilibrium conceptual derivations and NCERT practice set #23'
  ],
  laboratoryExperiments: [
    {
      title: 'Experimental Verification for Le Chatelier Principle and Buffer Equilibrium',
      apparatus: ['Standard test bench', 'Precision multimeter / sensor kit', 'Calibration weights'],
      objective: 'Empirically verify theoretical predictions and quantify experimental error percentage'
    }
  ]
};

export default equilibrium;
