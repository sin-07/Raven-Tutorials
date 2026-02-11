/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Raoult Law and Colligative Properties
 * Standard: Class 12
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_solutions {
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

export const solutions: CurriculumTopic_solutions = {
  id: 'solutions',
  title: 'Raoult Law and Colligative Properties',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-02-11',
  revisionNumber: 123,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Raoult Law and Colligative Properties',
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
};

export default solutions;
