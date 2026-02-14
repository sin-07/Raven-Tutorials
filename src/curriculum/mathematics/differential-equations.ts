/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Differential Equations & Separation of Variables
 * Standard: Class 12
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_differential_equations {
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

export const differential_equations: CurriculumTopic_differential_equations = {
  id: 'differential-equations',
  title: 'Differential Equations & Separation of Variables',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-02-14',
  revisionNumber: 126,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Differential Equations & Separation of Variables',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 17,
  sampleProblemCount: 55
};

export default differential_equations;
