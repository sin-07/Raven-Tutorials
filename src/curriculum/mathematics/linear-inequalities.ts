/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Linear Inequalities in One and Two Variables
 * Standard: Class 11
 * Exam Weightage: ~6%
 */

export interface CurriculumTopic_linear_inequalities {
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

export const linear_inequalities: CurriculumTopic_linear_inequalities = {
  id: 'linear-inequalities',
  title: 'Linear Inequalities in One and Two Variables',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 6,
  academicCycle: '2025-2026',
  lastReviewed: '2025-12-21',
  revisionNumber: 71,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Linear Inequalities in One and Two Variables',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 9,
  sampleProblemCount: 30
};

export default linear_inequalities;
