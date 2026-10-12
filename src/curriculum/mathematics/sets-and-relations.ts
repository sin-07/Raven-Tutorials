/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Sets, Subsets, Power Sets & Cartesian Products
 * Standard: Class 11
 * Exam Weightage: ~7%
 */

export interface CurriculumTopic_sets_and_relations {
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
}

export const sets_and_relations: CurriculumTopic_sets_and_relations = {
  id: 'sets-and-relations',
  title: 'Sets, Subsets, Power Sets & Cartesian Products',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 7,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-12',
  revisionNumber: 336,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Sets, Subsets, Power Sets & Cartesian Products',
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
};

export default sets_and_relations;
