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
  laboratoryExperiments?: Array<{
    title: string;
    apparatus: string[];
    objective: string;
    conceptDerivations?: Array<{
    topic: string;
    steps: string[];
    concludingEquation: string;
    revisionChecklist?: string[];
}>;
}>;
}

export const equilibrium: CurriculumTopic_equilibrium = {
  id: 'equilibrium',
  title: 'Le Chatelier Principle and Buffer Equilibrium',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-10-09',
  revisionNumber: 363,
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
  sampleProblemCount: 70
  laboratoryExperiments: [
    {
      title: 'Experimental Verification for Le Chatelier Principle and Buffer Equilibrium',
      apparatus: ['Standard test bench', 'Precision multimeter / sensor kit', 'Calibration weights'],
      objective: 'Empirically verify theoretical predictions and quantify experimental error percentage'
    }
  ],
  lastReviewed: '2026-02-17',
  revisionNumber: 364
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
  lastReviewed: '2026-02-21',
  revisionNumber: 364
  revisionChecklist: [
    'Memorize core definitions, formulas, and SI units',
    'Complete NCERT in-text exercises and chapter summaries',
    'Solve at least 15 timed mock examination problems',
    'Review mistake notebook and re-derive weak concepts'
  ],
  lastReviewed: '2026-05-12',
  revisionNumber: 364
};

export default equilibrium;
