/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Faraday Law, Lenz Law, and Inductance
 * Standard: Class 12
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_electromagnetic_induction {
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

export const electromagnetic_induction: CurriculumTopic_electromagnetic_induction = {
  id: 'electromagnetic-induction',
  title: 'Faraday Law, Lenz Law, and Inductance',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2025-12-12',
  revisionNumber: 62,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Faraday Law, Lenz Law, and Inductance',
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

export default electromagnetic_induction;
