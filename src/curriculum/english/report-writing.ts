/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Journalistic and Institutional Event Reporting
 * Standard: Class 12
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_report_writing {
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

export const report_writing: CurriculumTopic_report_writing = {
  id: 'report-writing',
  title: 'Journalistic and Institutional Event Reporting',
  subject: 'English',
  standard: 12,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-03',
  revisionNumber: 235,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Journalistic and Institutional Event Reporting',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 14,
  sampleProblemCount: 45
};

export default report_writing;
