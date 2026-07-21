/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Oxidation Number Balancing and Electrochemical Potential
 * Standard: Class 11
 * Exam Weightage: ~7%
 */

export interface CurriculumTopic_redox_reactions {
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

export const redox_reactions: CurriculumTopic_redox_reactions = {
  id: 'redox-reactions',
  title: 'Oxidation Number Balancing and Electrochemical Potential',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 7,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-21',
  revisionNumber: 283,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Oxidation Number Balancing and Electrochemical Potential',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 11,
  sampleProblemCount: 35
};

export default redox_reactions;
