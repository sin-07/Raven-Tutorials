/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Newton Laws of Motion and Friction Dynamics
 * Standard: Class 11
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_laws_of_motion {
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

export const laws_of_motion: CurriculumTopic_laws_of_motion = {
  id: 'laws-of-motion',
  title: 'Newton Laws of Motion and Friction Dynamics',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-03-27',
  revisionNumber: 296,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Newton Laws of Motion and Friction Dynamics',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in Newton Laws of Motion and Friction Dynamics module section #2 for competitive examinations',
    'Demonstrate advanced competency in Newton Laws of Motion and Friction Dynamics module section #14 for competitive examinations',
    'Demonstrate advanced competency in Newton Laws of Motion and Friction Dynamics module section #2 for competitive examinations'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60,
  conceptDerivations: [
    {
      topic: 'Core Derivation for Newton Laws of Motion and Friction Dynamics',
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
    'Neglecting edge-case boundary restrictions in Newton Laws of Motion and Friction Dynamics',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default laws_of_motion;
