/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Recombinant DNA Tools and Electrophoresis
 * Standard: Class 12
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_biotechnology_principles {
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

export const biotechnology_principles: CurriculumTopic_biotechnology_principles = {
  id: 'biotechnology-principles',
  title: 'Recombinant DNA Tools and Electrophoresis',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 12,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Recombinant DNA Tools and Electrophoresis',
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

export default biotechnology_principles;
