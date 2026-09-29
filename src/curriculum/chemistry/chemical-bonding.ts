/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: VSEPR Theory and Molecular Orbital Theory
 * Standard: Class 11
 * Exam Weightage: ~13%
 */

export interface CurriculumTopic_chemical_bonding {
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

export const chemical_bonding: CurriculumTopic_chemical_bonding = {
  id: 'chemical-bonding',
  title: 'VSEPR Theory and Molecular Orbital Theory',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 13,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-29',
  revisionNumber: 353,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for VSEPR Theory and Molecular Orbital Theory',
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

export default chemical_bonding;
