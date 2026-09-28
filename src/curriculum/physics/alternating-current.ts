/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: LCR Circuits, Resonance, and Power Factor
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_alternating_current {
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

export const alternating_current: CurriculumTopic_alternating_current = {
  id: 'alternating-current',
  title: 'LCR Circuits, Resonance, and Power Factor',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-28',
  revisionNumber: 352,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for LCR Circuits, Resonance, and Power Factor',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50
};

export default alternating_current;
