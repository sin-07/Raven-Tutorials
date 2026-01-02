/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Carbohydrates, Amino Acids, and Peptide Structures
 * Standard: Class 12
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_biomolecules {
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

export const biomolecules: CurriculumTopic_biomolecules = {
  id: 'biomolecules',
  title: 'Carbohydrates, Amino Acids, and Peptide Structures',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-01-02',
  revisionNumber: 83,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Carbohydrates, Amino Acids, and Peptide Structures',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 12,
  sampleProblemCount: 40
};

export default biomolecules;
