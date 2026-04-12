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
  commonPitfalls?: string[];
}

export const laws_of_motion: CurriculumTopic_laws_of_motion = {
  id: 'laws-of-motion',
  title: 'Newton Laws of Motion and Friction Dynamics',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-30',
  revisionNumber: 292,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Newton Laws of Motion and Friction Dynamics',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Newton Laws of Motion and Friction Dynamics',
    'Premature approximation prior to final algebraic simplification'
  ],
  lastReviewed: '2026-04-12',
  revisionNumber: 293
};

export default laws_of_motion;
