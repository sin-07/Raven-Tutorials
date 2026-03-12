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
  practiceQuestions?: Array<{
    id: string;
    question: string;
    difficulty: 'easy' | 'medium' | 'hard';
    marks: number;
    hint?: string;
  }>;
  examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
  };
  conceptDerivations?: Array<{
    topic: string;
    steps: string[];
    concludingEquation: string;
  }>;
  commonPitfalls?: string[];
  recommendedResources?: string[];
  realWorldApplications?: string[];
  revisionChecklist?: string[];
  laboratoryExperiments?: Array<{
    title: string;
    apparatus: string[];
    objective: string;
  }>;
}

export const molecular_basis_of_inheritance: CurriculumTopic_molecular_basis_of_inheritance = {
  id: 'molecular-basis-of-inheritance',
  title: 'DNA Structure, Replication, and Gene Expression',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 16,
  academicCycle: '2025-2026',
  lastReviewed: '2026-03-12',
  revisionNumber: 338,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for DNA Structure, Replication, and Gene Expression',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions',
    'Rule 12: Standard dimensional and algebraic validation principles for DNA Structure, Replication, and Gene Expression',
    'Rule 24: Standard dimensional and algebraic validation principles for DNA Structure, Replication, and Gene Expression',
    'Rule 12: Standard dimensional and algebraic validation principles for DNA Structure, Replication, and Gene Expression'
  ],
  recommendedHours: 24,
  sampleProblemCount: 80,
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  conceptDerivations: [
    {
      topic: 'Core Derivation for DNA Structure, Replication, and Gene Expression',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in DNA Structure, Replication, and Gene Expression',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default molecular_basis_of_inheritance;
