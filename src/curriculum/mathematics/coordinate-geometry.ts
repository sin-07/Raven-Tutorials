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
  learningObjectives: string[];
  keyFormulaeOrConcepts: string[];
  recommendedHours: number;
  sampleProblemCount: number;
}

export const coordinate_geometry: CurriculumTopic_coordinate_geometry = {
  id: 'coordinate-geometry',
  title: 'Coordinate Geometry & Distance Formulae',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-03-31',
  revisionNumber: 171,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Coordinate Geometry & Distance Formulae',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 12,
  sampleProblemCount: 40
};

export default coordinate_geometry;
