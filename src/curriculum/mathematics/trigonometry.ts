/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Introduction to Trigonometry & Trigonometric Ratios
 * Standard: Class 10
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_trigonometry {
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

export const trigonometry: CurriculumTopic_trigonometry = {
  id: 'trigonometry',
  title: 'Introduction to Trigonometry & Trigonometric Ratios',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2025-11-16',
  revisionNumber: 36,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Introduction to Trigonometry & Trigonometric Ratios',
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

export default trigonometry;
