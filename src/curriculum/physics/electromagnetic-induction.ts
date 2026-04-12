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

export const electromagnetic_induction: CurriculumTopic_electromagnetic_induction = {
  id: 'electromagnetic-induction',
  title: 'Faraday Law, Lenz Law, and Inductance',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-23',
  revisionNumber: 347,
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
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Faraday Law, Lenz Law, and Inductance.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Faraday Law, Lenz Law, and Inductance under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Faraday Law, Lenz Law, and Inductance.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  lastReviewed: '2026-04-12',
  revisionNumber: 348
};

export default electromagnetic_induction;
