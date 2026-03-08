/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Circles & Tangents from External Points
 * Standard: Class 10
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_circles {
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
  realWorldApplications?: string[];
}

export const circles: CurriculumTopic_circles = {
  id: 'circles',
  title: 'Circles & Tangents from External Points',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-08-28',
  revisionNumber: 321,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Circles & Tangents from External Points',
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
  realWorldApplications: [
    'Industrial automation and precision measurement sensors',
    'Biomedical diagnostics and pharmacological formulation analysis',
    'Computational simulations and algorithmic optimization in aerospace',
    'Modern renewable energy grid stabilization techniques'
  ],
  lastReviewed: '2026-03-08',
  revisionNumber: 322
};

export default circles;
