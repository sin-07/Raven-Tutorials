/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Mendelian Genetics and Linkage Analysis
 * Standard: Class 12
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_principles_of_inheritance {
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

export const principles_of_inheritance: CurriculumTopic_principles_of_inheritance = {
  id: 'principles-of-inheritance',
  title: 'Mendelian Genetics and Linkage Analysis',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-18',
  revisionNumber: 219,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Mendelian Genetics and Linkage Analysis',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 21,
  sampleProblemCount: 70
};

export default principles_of_inheritance;
