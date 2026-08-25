/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Nucleophilic Substitution SN1 and SN2 Pathways
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_haloalkanes {
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

export const haloalkanes: CurriculumTopic_haloalkanes = {
  id: 'haloalkanes',
  title: 'Nucleophilic Substitution SN1 and SN2 Pathways',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-08-25',
  revisionNumber: 318,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Nucleophilic Substitution SN1 and SN2 Pathways',
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

export default haloalkanes;
