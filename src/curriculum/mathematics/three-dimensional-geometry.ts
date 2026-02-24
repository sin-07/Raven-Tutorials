/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Three-Dimensional Geometry: Direction Ratios & Planes
 * Standard: Class 12
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_three_dimensional_geometry {
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

export const three_dimensional_geometry: CurriculumTopic_three_dimensional_geometry = {
  id: 'three-dimensional-geometry',
  title: 'Three-Dimensional Geometry: Direction Ratios & Planes',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-02-24',
  revisionNumber: 136,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Three-Dimensional Geometry: Direction Ratios & Planes',
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
};

export default three_dimensional_geometry;
