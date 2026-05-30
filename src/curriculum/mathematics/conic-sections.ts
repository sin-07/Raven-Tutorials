/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Conic Sections: Parabola, Ellipse, and Hyperbola
 * Standard: Class 11
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_conic_sections {
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

export const conic_sections: CurriculumTopic_conic_sections = {
  id: 'conic-sections',
  title: 'Conic Sections: Parabola, Ellipse, and Hyperbola',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-30',
  revisionNumber: 231,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Conic Sections: Parabola, Ellipse, and Hyperbola',
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

export default conic_sections;
