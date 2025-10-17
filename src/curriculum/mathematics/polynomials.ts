/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Polynomials & Geometric Meaning of Zeroes
 * Standard: Class 10
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_polynomials {
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

export const polynomials: CurriculumTopic_polynomials = {
  id: 'polynomials',
  title: 'Polynomials & Geometric Meaning of Zeroes',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 8,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Polynomials & Geometric Meaning of Zeroes',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 12,
  sampleProblemCount: 40
};

export default polynomials;
