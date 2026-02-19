/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Nerve Impulse Propagation and Synaptic Action
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_neural_control {
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

export const neural_control: CurriculumTopic_neural_control = {
  id: 'neural-control',
  title: 'Nerve Impulse Propagation and Synaptic Action',
  subject: 'Biology',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-02-19',
  revisionNumber: 327,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Nerve Impulse Propagation and Synaptic Action',
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
  conceptDerivations: [
    {
      topic: 'Core Derivation for Nerve Impulse Propagation and Synaptic Action',
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
    'Neglecting edge-case boundary restrictions in Nerve Impulse Propagation and Synaptic Action',
    'Premature approximation prior to final algebraic simplification',
    'Misapplying intermediate boundary approximation during Nerve Impulse Propagation and Synaptic Action step #10',
    'Misapplying intermediate boundary approximation during Nerve Impulse Propagation and Synaptic Action step #22'
  ],
  recommendedResources: [
    'NCERT Exemplar Class 11 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ]
};

export default neural_control;
