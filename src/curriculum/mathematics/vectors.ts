/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Vectors: Dot Product and Cross Product Operations
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_vectors {
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

export const vectors: CurriculumTopic_vectors = {
  id: 'vectors',
  title: 'Vectors: Dot Product and Cross Product Operations',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-02-19',
  revisionNumber: 131,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Vectors: Dot Product and Cross Product Operations',
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

export default vectors;
