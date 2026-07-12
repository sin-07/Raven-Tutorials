/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Immunology, Pathogens, and Disease Prevention
 * Standard: Class 12
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_human_health_disease {
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

export const human_health_disease: CurriculumTopic_human_health_disease = {
  id: 'human-health-disease',
  title: 'Immunology, Pathogens, and Disease Prevention',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-12',
  revisionNumber: 364,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Immunology, Pathogens, and Disease Prevention',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in Immunology, Pathogens, and Disease Prevention module section #8 for competitive examinations',
    'Demonstrate advanced competency in Immunology, Pathogens, and Disease Prevention module section #20 for competitive examinations',
    'Demonstrate advanced competency in Immunology, Pathogens, and Disease Prevention module section #8 for competitive examinations',
    'Demonstrate advanced competency in Immunology, Pathogens, and Disease Prevention module section #20 for competitive examinations',
    'Demonstrate advanced competency in Immunology, Pathogens, and Disease Prevention module section #8 for competitive examinations',
    'Demonstrate advanced competency in Immunology, Pathogens, and Disease Prevention module section #20 for competitive examinations',
    'Demonstrate advanced competency in Immunology, Pathogens, and Disease Prevention module section #8 for competitive examinations',
    'Demonstrate advanced competency in Immunology, Pathogens, and Disease Prevention module section #20 for competitive examinations',
    'Demonstrate advanced competency in Immunology, Pathogens, and Disease Prevention module section #8 for competitive examinations'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60,
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Immunology, Pathogens, and Disease Prevention.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Immunology, Pathogens, and Disease Prevention under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Immunology, Pathogens, and Disease Prevention.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  conceptDerivations: [
    {
      topic: 'Core Derivation for Immunology, Pathogens, and Disease Prevention',
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

export default human_health_disease;
