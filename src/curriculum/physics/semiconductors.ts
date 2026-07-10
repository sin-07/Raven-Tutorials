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
  commonPitfalls?: string[];
}

export const semiconductors: CurriculumTopic_semiconductors = {
  id: 'semiconductors',
  title: 'P-N Junction Diode, Rectifiers, and Logic Gates',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-20',
  revisionNumber: 282,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for P-N Junction Diode, Rectifiers, and Logic Gates',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in P-N Junction Diode, Rectifiers, and Logic Gates',
    'Premature approximation prior to final algebraic simplification'
  ],
  lastReviewed: '2026-07-10',
  revisionNumber: 283
};

export default semiconductors;
