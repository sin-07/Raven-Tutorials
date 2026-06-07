/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Differential Equations & Separation of Variables
 * Standard: Class 12
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_differential_equations {
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
  examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
    realWorldApplications?: string[];
};
}

export const differential_equations: CurriculumTopic_differential_equations = {
  id: 'differential-equations',
  title: 'Differential Equations & Separation of Variables',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-04',
  revisionNumber: 266,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Differential Equations & Separation of Variables',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 17,
  sampleProblemCount: 55
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  lastReviewed: '2026-03-18',
  revisionNumber: 267
  realWorldApplications: [
    'Industrial automation and precision measurement sensors',
    'Biomedical diagnostics and pharmacological formulation analysis',
    'Computational simulations and algorithmic optimization in aerospace',
    'Modern renewable energy grid stabilization techniques'
  ],
  lastReviewed: '2026-06-07',
  revisionNumber: 267
};

export default differential_equations;
