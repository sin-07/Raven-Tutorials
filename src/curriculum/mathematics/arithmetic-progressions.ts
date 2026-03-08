/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Arithmetic Progressions & Nth Term Summation
 * Standard: Class 10
 * Exam Weightage: ~7%
 */

export interface CurriculumTopic_arithmetic_progressions {
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
  commonPitfalls?: string[];
}

export const arithmetic_progressions: CurriculumTopic_arithmetic_progressions = {
  id: 'arithmetic-progressions',
  title: 'Arithmetic Progressions & Nth Term Summation',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 7,
  academicCycle: '2025-2026',
  lastReviewed: '2026-08-08',
  revisionNumber: 301,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Arithmetic Progressions & Nth Term Summation',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 11,
  sampleProblemCount: 35
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Arithmetic Progressions & Nth Term Summation',
    'Premature approximation prior to final algebraic simplification'
  ],
  lastReviewed: '2026-03-08',
  revisionNumber: 302
};

export default arithmetic_progressions;
