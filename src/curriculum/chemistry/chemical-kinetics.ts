/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Reaction Rates, Order, and Arrhenius Equation
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_chemical_kinetics {
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

export const chemical_kinetics: CurriculumTopic_chemical_kinetics = {
  id: 'chemical-kinetics',
  title: 'Reaction Rates, Order, and Arrhenius Equation',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-17',
  revisionNumber: 218,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Reaction Rates, Order, and Arrhenius Equation',
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

export default chemical_kinetics;
