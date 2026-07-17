/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Coordinate Geometry & Distance Formulae
 * Standard: Class 10
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_coordinate_geometry {
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

export const coordinate_geometry: CurriculumTopic_coordinate_geometry = {
  id: 'coordinate-geometry',
  title: 'Coordinate Geometry & Distance Formulae',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-17',
  revisionNumber: 321,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Coordinate Geometry & Distance Formulae',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions',
    'Rule 24: Standard dimensional and algebraic validation principles for Coordinate Geometry & Distance Formulae',
    'Rule 12: Standard dimensional and algebraic validation principles for Coordinate Geometry & Distance Formulae',
    'Rule 24: Standard dimensional and algebraic validation principles for Coordinate Geometry & Distance Formulae',
    'Rule 12: Standard dimensional and algebraic validation principles for Coordinate Geometry & Distance Formulae',
    'Rule 24: Standard dimensional and algebraic validation principles for Coordinate Geometry & Distance Formulae',
    'Rule 12: Standard dimensional and algebraic validation principles for Coordinate Geometry & Distance Formulae',
    'Rule 24: Standard dimensional and algebraic validation principles for Coordinate Geometry & Distance Formulae',
    'Rule 12: Standard dimensional and algebraic validation principles for Coordinate Geometry & Distance Formulae',
    'Rule 24: Standard dimensional and algebraic validation principles for Coordinate Geometry & Distance Formulae'
  ],
  recommendedHours: 12,
  sampleProblemCount: 40,
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Coordinate Geometry & Distance Formulae',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default coordinate_geometry;
