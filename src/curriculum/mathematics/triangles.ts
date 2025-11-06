/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Triangles & Similarity Criteria
 * Standard: Class 10
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_triangles {
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

export const triangles: CurriculumTopic_triangles = {
  id: 'triangles',
  title: 'Triangles & Similarity Criteria',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2025-11-06',
  revisionNumber: 26,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Triangles & Similarity Criteria',
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

export default triangles;
