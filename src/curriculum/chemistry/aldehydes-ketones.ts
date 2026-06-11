/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Carbonyl Compounds, Aldol, and Cannizzaro Reactions
 * Standard: Class 12
 * Exam Weightage: ~13%
 */

export interface CurriculumTopic_aldehydes_ketones {
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

export const aldehydes_ketones: CurriculumTopic_aldehydes_ketones = {
  id: 'aldehydes-ketones',
  title: 'Carbonyl Compounds, Aldol, and Cannizzaro Reactions',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 13,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-11',
  revisionNumber: 243,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Carbonyl Compounds, Aldol, and Cannizzaro Reactions',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 20,
  sampleProblemCount: 65
};

export default aldehydes_ketones;
