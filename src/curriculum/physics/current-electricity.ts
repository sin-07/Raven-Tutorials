/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Ohm Law, Kirchhoff Rules, and Wheatstone Bridge
 * Standard: Class 12
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_current_electricity {
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

export const current_electricity: CurriculumTopic_current_electricity = {
  id: 'current-electricity',
  title: 'Ohm Law, Kirchhoff Rules, and Wheatstone Bridge',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-02',
  revisionNumber: 338,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Ohm Law, Kirchhoff Rules, and Wheatstone Bridge',
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
  conceptDerivations: [
    {
      topic: 'Core Derivation for Ohm Law, Kirchhoff Rules, and Wheatstone Bridge',
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
    'Neglecting edge-case boundary restrictions in Ohm Law, Kirchhoff Rules, and Wheatstone Bridge',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default current_electricity;
