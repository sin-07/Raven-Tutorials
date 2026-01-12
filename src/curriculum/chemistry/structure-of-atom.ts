/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Bohr Model and Quantum Electronic Configurations
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_structure_of_atom {
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

export const structure_of_atom: CurriculumTopic_structure_of_atom = {
  id: 'structure-of-atom',
  title: 'Bohr Model and Quantum Electronic Configurations',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-01-12',
  revisionNumber: 93,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Bohr Model and Quantum Electronic Configurations',
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

export default structure_of_atom;
