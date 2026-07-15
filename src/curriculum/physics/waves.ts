/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Transverse Waves, Standing Waves, and Resonance
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_waves {
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
  conceptDerivations?: Array<{
    topic: string;
    steps: string[];
    concludingEquation: string;
    revisionChecklist?: string[];
  examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
  };
}>;
}

export const waves: CurriculumTopic_waves = {
  id: 'waves',
  title: 'Transverse Waves, Standing Waves, and Resonance',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-08-29',
  revisionNumber: 322,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Transverse Waves, Standing Waves, and Resonance',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50
  conceptDerivations: [
    {
      topic: 'Core Derivation for Transverse Waves, Standing Waves, and Resonance',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  lastReviewed: '2026-04-22',
  revisionNumber: 323
  revisionChecklist: [
    'Memorize core definitions, formulas, and SI units',
    'Complete NCERT in-text exercises and chapter summaries',
    'Solve at least 15 timed mock examination problems',
    'Review mistake notebook and re-derive weak concepts'
  ],
  lastReviewed: '2026-07-10',
  revisionNumber: 323
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  lastReviewed: '2026-07-15',
  revisionNumber: 323
};

export default waves;
