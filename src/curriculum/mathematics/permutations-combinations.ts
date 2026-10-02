/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Permutations and Combinations Protocols
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_permutations_combinations {
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

export const permutations_combinations: CurriculumTopic_permutations_combinations = {
  id: 'permutations-combinations',
  title: 'Permutations and Combinations Protocols',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-10-02',
  revisionNumber: 356,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Permutations and Combinations Protocols',
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
};

export default permutations_combinations;
