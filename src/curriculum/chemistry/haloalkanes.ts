/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Nucleophilic Substitution SN1 and SN2 Pathways
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_haloalkanes {
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

export const haloalkanes: CurriculumTopic_haloalkanes = {
  id: 'haloalkanes',
  title: 'Nucleophilic Substitution SN1 and SN2 Pathways',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-04-20',
  revisionNumber: 324,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Nucleophilic Substitution SN1 and SN2 Pathways',
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
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Nucleophilic Substitution SN1 and SN2 Pathways',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Nucleophilic Substitution SN1 and SN2 Pathways',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Nucleophilic Substitution SN1 and SN2 Pathways',
    'Raven Tutorials Advanced Problem Vault - Volume 12 for Nucleophilic Substitution SN1 and SN2 Pathways',
    'Raven Tutorials Advanced Problem Vault - Volume 24 for Nucleophilic Substitution SN1 and SN2 Pathways'
  ]
  conceptDerivations: [
    {
      topic: 'Core Derivation for Nucleophilic Substitution SN1 and SN2 Pathways',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  laboratoryExperiments: [
    {
      title: 'Experimental Verification for Nucleophilic Substitution SN1 and SN2 Pathways',
      apparatus: ['Standard test bench', 'Precision multimeter / sensor kit', 'Calibration weights'],
      objective: 'Empirically verify theoretical predictions and quantify experimental error percentage'
    }
  ]
};

export default haloalkanes;
