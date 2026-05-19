/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Data Interpretation and Analytical Composition
 * Standard: Class 10
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_analytical_paragraph {
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

export const analytical_paragraph: CurriculumTopic_analytical_paragraph = {
  id: 'analytical-paragraph',
  title: 'Data Interpretation and Analytical Composition',
  subject: 'English',
  standard: 10,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-19',
  revisionNumber: 220,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Data Interpretation and Analytical Composition',
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

export default analytical_paragraph;
