/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Organic Nitrogen Compounds and Diazonium Chemistry
 * Standard: Class 12
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_amines {
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

export const amines: CurriculumTopic_amines = {
  id: 'amines',
  title: 'Organic Nitrogen Compounds and Diazonium Chemistry',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-09',
  revisionNumber: 333,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Organic Nitrogen Compounds and Diazonium Chemistry',
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

export default amines;
