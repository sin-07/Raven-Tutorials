/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Immunology, Pathogens, and Disease Prevention
 * Standard: Class 12
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_human_health_disease {
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

export const human_health_disease: CurriculumTopic_human_health_disease = {
  id: 'human-health-disease',
  title: 'Immunology, Pathogens, and Disease Prevention',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2025-12-04',
  revisionNumber: 54,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Immunology, Pathogens, and Disease Prevention',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60
};

export default human_health_disease;
