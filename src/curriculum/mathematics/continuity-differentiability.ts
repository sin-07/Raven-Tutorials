/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Continuity, Differentiability, and Chain Rule
 * Standard: Class 12
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_continuity_differentiability {
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

export const continuity_differentiability: CurriculumTopic_continuity_differentiability = {
  id: 'continuity-differentiability',
  title: 'Continuity, Differentiability, and Chain Rule',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-19',
  revisionNumber: 251,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Continuity, Differentiability, and Chain Rule',
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

export default continuity_differentiability;
