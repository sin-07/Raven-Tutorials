/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Alkanes, Alkenes, Alkynes, and Aromatic Compounds
 * Standard: Class 11
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_hydrocarbons {
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

export const hydrocarbons: CurriculumTopic_hydrocarbons = {
  id: 'hydrocarbons',
  title: 'Alkanes, Alkenes, Alkynes, and Aromatic Compounds',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2025-11-13',
  revisionNumber: 33,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Alkanes, Alkenes, Alkynes, and Aromatic Compounds',
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

export default hydrocarbons;
