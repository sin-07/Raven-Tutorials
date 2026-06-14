/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Sets, Subsets, Power Sets & Cartesian Products
 * Standard: Class 11
 * Exam Weightage: ~7%
 */

export interface CurriculumTopic_sets_and_relations {
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

export const sets_and_relations: CurriculumTopic_sets_and_relations = {
  id: 'sets-and-relations',
  title: 'Sets, Subsets, Power Sets & Cartesian Products',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 7,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-14',
  revisionNumber: 344,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Sets, Subsets, Power Sets & Cartesian Products',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 11,
  sampleProblemCount: 35,
  commonPitfalls: [
    'Misapplying intermediate boundary approximation during Sets, Subsets, Power Sets & Cartesian Products step #10',
    'Misapplying intermediate boundary approximation during Sets, Subsets, Power Sets & Cartesian Products step #22',
    'Misapplying intermediate boundary approximation during Sets, Subsets, Power Sets & Cartesian Products step #10',
    'Misapplying intermediate boundary approximation during Sets, Subsets, Power Sets & Cartesian Products step #22',
    'Misapplying intermediate boundary approximation during Sets, Subsets, Power Sets & Cartesian Products step #10',
    'Misapplying intermediate boundary approximation during Sets, Subsets, Power Sets & Cartesian Products step #22',
    'Misapplying intermediate boundary approximation during Sets, Subsets, Power Sets & Cartesian Products step #10'
  ]
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  conceptDerivations: [
    {
      topic: 'Core Derivation for Sets, Subsets, Power Sets & Cartesian Products',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ]
};

export default sets_and_relations;
