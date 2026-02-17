/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Carbohydrates, Amino Acids, and Peptide Structures
 * Standard: Class 12
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_biomolecules {
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
  practiceQuestions?: Array<{
    id: string;
    question: string;
    difficulty: 'easy' | 'medium' | 'hard';
    marks: number;
    hint?: string;
  }>;
}

export const biomolecules: CurriculumTopic_biomolecules = {
  id: 'biomolecules',
  title: 'Carbohydrates, Amino Acids, and Peptide Structures',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-14',
  revisionNumber: 338,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Carbohydrates, Amino Acids, and Peptide Structures',
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
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Carbohydrates, Amino Acids, and Peptide Structures.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Carbohydrates, Amino Acids, and Peptide Structures under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Carbohydrates, Amino Acids, and Peptide Structures.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  lastReviewed: '2026-02-17',
  revisionNumber: 339
};

export default biomolecules;
