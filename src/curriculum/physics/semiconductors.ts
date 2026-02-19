/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: P-N Junction Diode, Rectifiers, and Logic Gates
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_semiconductors {
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

export const semiconductors: CurriculumTopic_semiconductors = {
  id: 'semiconductors',
  title: 'P-N Junction Diode, Rectifiers, and Logic Gates',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-02-19',
  revisionNumber: 284,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for P-N Junction Diode, Rectifiers, and Logic Gates',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in P-N Junction Diode, Rectifiers, and Logic Gates module section #8 for competitive examinations'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50,
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in P-N Junction Diode, Rectifiers, and Logic Gates',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default semiconductors;
