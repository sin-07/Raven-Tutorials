/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Enthalpy, Entropy, and Gibbs Free Energy
 * Standard: Class 11
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_chemical_thermodynamics {
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

export const chemical_thermodynamics: CurriculumTopic_chemical_thermodynamics = {
  id: 'chemical-thermodynamics',
  title: 'Enthalpy, Entropy, and Gibbs Free Energy',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-12',
  revisionNumber: 359,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Enthalpy, Entropy, and Gibbs Free Energy',
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
  conceptDerivations: [
    {
      topic: 'Core Derivation for Enthalpy, Entropy, and Gibbs Free Energy',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Enthalpy, Entropy, and Gibbs Free Energy',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default chemical_thermodynamics;
