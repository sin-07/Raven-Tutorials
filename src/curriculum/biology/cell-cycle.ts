/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Cell Division: Mitosis and Meiosis Checkpoints
 * Standard: Class 11
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_cell_cycle {
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

export const cell_cycle: CurriculumTopic_cell_cycle = {
  id: 'cell-cycle',
  title: 'Cell Division: Mitosis and Meiosis Checkpoints',
  subject: 'Biology',
  standard: 11,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2025-10-20',
  revisionNumber: 9,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Cell Division: Mitosis and Meiosis Checkpoints',
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

export default cell_cycle;
