/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Endocrine System and Hormonal Regulation
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_chemical_coordination {
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

export const chemical_coordination: CurriculumTopic_chemical_coordination = {
  id: 'chemical-coordination',
  title: 'Endocrine System and Hormonal Regulation',
  subject: 'Biology',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-27',
  revisionNumber: 340,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Endocrine System and Hormonal Regulation',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50,
  recommendedResources: [
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Endocrine System and Hormonal Regulation',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Endocrine System and Hormonal Regulation',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Endocrine System and Hormonal Regulation',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Endocrine System and Hormonal Regulation',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Endocrine System and Hormonal Regulation',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Endocrine System and Hormonal Regulation',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Endocrine System and Hormonal Regulation',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Endocrine System and Hormonal Regulation',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Endocrine System and Hormonal Regulation',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Endocrine System and Hormonal Regulation'
  ]
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Endocrine System and Hormonal Regulation.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Endocrine System and Hormonal Regulation under standard Class 11 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Endocrine System and Hormonal Regulation.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Endocrine System and Hormonal Regulation',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default chemical_coordination;
