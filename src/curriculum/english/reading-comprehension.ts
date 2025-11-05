/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Advanced Reading Comprehension Strategy
 * Standard: Class 11
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_reading_comprehension {
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

export const reading_comprehension: CurriculumTopic_reading_comprehension = {
  id: 'reading-comprehension',
  title: 'Advanced Reading Comprehension Strategy',
  subject: 'English',
  standard: 11,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2025-11-05',
  revisionNumber: 25,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Advanced Reading Comprehension Strategy',
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

export default reading_comprehension;
