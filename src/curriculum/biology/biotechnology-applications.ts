/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Biotechnology in Medicine and Agriculture
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_biotechnology_applications {
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

export const biotechnology_applications: CurriculumTopic_biotechnology_applications = {
  id: 'biotechnology-applications',
  title: 'Biotechnology in Medicine and Agriculture',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-25',
  revisionNumber: 349,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Biotechnology in Medicine and Agriculture',
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

export default biotechnology_applications;
