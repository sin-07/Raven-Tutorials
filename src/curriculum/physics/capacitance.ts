/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Electrostatic Potential and Parallel Plate Capacitors
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_capacitance {
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

export const capacitance: CurriculumTopic_capacitance = {
  id: 'capacitance',
  title: 'Electrostatic Potential and Parallel Plate Capacitors',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-03',
  revisionNumber: 338,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Electrostatic Potential and Parallel Plate Capacitors',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in Electrostatic Potential and Parallel Plate Capacitors module section #20 for competitive examinations',
    'Demonstrate advanced competency in Electrostatic Potential and Parallel Plate Capacitors module section #8 for competitive examinations',
    'Demonstrate advanced competency in Electrostatic Potential and Parallel Plate Capacitors module section #20 for competitive examinations',
    'Demonstrate advanced competency in Electrostatic Potential and Parallel Plate Capacitors module section #8 for competitive examinations',
    'Demonstrate advanced competency in Electrostatic Potential and Parallel Plate Capacitors module section #20 for competitive examinations'
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
      topic: 'Core Derivation for Electrostatic Potential and Parallel Plate Capacitors',
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

export default capacitance;
