/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: DNA Structure, Replication, and Gene Expression
 * Standard: Class 12
 * Exam Weightage: ~16%
 */

export interface CurriculumTopic_molecular_basis_of_inheritance {
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
}

export const molecular_basis_of_inheritance: CurriculumTopic_molecular_basis_of_inheritance = {
  id: 'molecular-basis-of-inheritance',
  title: 'DNA Structure, Replication, and Gene Expression',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 16,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-10',
  revisionNumber: 334,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for DNA Structure, Replication, and Gene Expression',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 24,
  sampleProblemCount: 80
};

export default molecular_basis_of_inheritance;
