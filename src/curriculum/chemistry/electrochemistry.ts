/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Nernst Equation and Kohlrausch Conductivity Law
 * Standard: Class 12
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_electrochemistry {
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

export const electrochemistry: CurriculumTopic_electrochemistry = {
  id: 'electrochemistry',
  title: 'Nernst Equation and Kohlrausch Conductivity Law',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-08-05',
  revisionNumber: 298,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Nernst Equation and Kohlrausch Conductivity Law',
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

export default electrochemistry;
