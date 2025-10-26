/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Professional Correspondence and Formal Letter Formats
 * Standard: Class 10
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_formal_letter_writing {
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

export const formal_letter_writing: CurriculumTopic_formal_letter_writing = {
  id: 'formal-letter-writing',
  title: 'Professional Correspondence and Formal Letter Formats',
  subject: 'English',
  standard: 10,
  weightagePercent: 8,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Professional Correspondence and Formal Letter Formats',
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

export default formal_letter_writing;
