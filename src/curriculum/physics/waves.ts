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

export const waves: CurriculumTopic_waves = {
  id: 'waves',
  title: 'Transverse Waves, Standing Waves, and Resonance',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-26',
  revisionNumber: 329,
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
  sampleProblemCount: 50,
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
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
  revisionChecklist: [
    'Memorize core definitions, formulas, and SI units',
    'Complete NCERT in-text exercises and chapter summaries',
    'Solve at least 15 timed mock examination problems',
    'Review mistake notebook and re-derive weak concepts',
    'Verify complete mastery of Transverse Waves, Standing Waves, and Resonance conceptual derivations and NCERT practice set #11',
    'Verify complete mastery of Transverse Waves, Standing Waves, and Resonance conceptual derivations and NCERT practice set #23',
    'Verify complete mastery of Transverse Waves, Standing Waves, and Resonance conceptual derivations and NCERT practice set #11',
    'Verify complete mastery of Transverse Waves, Standing Waves, and Resonance conceptual derivations and NCERT practice set #23',
    'Verify complete mastery of Transverse Waves, Standing Waves, and Resonance conceptual derivations and NCERT practice set #11',
    'Verify complete mastery of Transverse Waves, Standing Waves, and Resonance conceptual derivations and NCERT practice set #23'
  ]
};

export default waves;
