/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Transition Metals and Lanthanoid Contraction
 * Standard: Class 12
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_d_and_f_block {
  id: string;
  title: string;
  subject: string;
  standard: number;
  weightagePercent: number;
  learningObjectives: string[];
  keyFormulaeOrConcepts: string[];
  recommendedHours: number;
  sampleProblemCount: number;
}

export const d_and_f_block: CurriculumTopic_d_and_f_block = {
  id: 'd-and-f-block',
  title: 'Transition Metals and Lanthanoid Contraction',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-02-26',
  revisionNumber: 138,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Transition Metals and Lanthanoid Contraction',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 14,
  sampleProblemCount: 45
};

export default d_and_f_block;
