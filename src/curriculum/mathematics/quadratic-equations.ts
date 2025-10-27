/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Quadratic Equations & Nature of Roots
 * Standard: Class 10
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_quadratic_equations {
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

export const quadratic_equations: CurriculumTopic_quadratic_equations = {
  id: 'quadratic-equations',
  title: 'Quadratic Equations & Nature of Roots',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 10,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Quadratic Equations & Nature of Roots',
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

export default quadratic_equations;
