/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Bohr Model, Rydberg Formula, and Nuclear Binding Energy
 * Standard: Class 12
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_atoms_and_nuclei {
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
  examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
  };
}

export const atoms_and_nuclei: CurriculumTopic_atoms_and_nuclei = {
  id: 'atoms-and-nuclei',
  title: 'Bohr Model, Rydberg Formula, and Nuclear Binding Energy',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-15',
  revisionNumber: 277,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Bohr Model, Rydberg Formula, and Nuclear Binding Energy',
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
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  lastReviewed: '2026-04-07',
  revisionNumber: 278
};

export default atoms_and_nuclei;
