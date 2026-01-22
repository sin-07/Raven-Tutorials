/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Enthalpy, Entropy, and Gibbs Free Energy
 * Standard: Class 11
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_chemical_thermodynamics {
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

export const chemical_thermodynamics: CurriculumTopic_chemical_thermodynamics = {
  id: 'chemical-thermodynamics',
  title: 'Enthalpy, Entropy, and Gibbs Free Energy',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-01-22',
  revisionNumber: 103,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Enthalpy, Entropy, and Gibbs Free Energy',
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

export default chemical_thermodynamics;
