/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Statistics: Mean, Median, and Mode of Grouped Data
 * Standard: Class 10
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_statistics {
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

export const statistics: CurriculumTopic_statistics = {
  id: 'statistics',
  title: 'Statistics: Mean, Median, and Mode of Grouped Data',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-02',
  revisionNumber: 326,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Statistics: Mean, Median, and Mode of Grouped Data',
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

export default statistics;
