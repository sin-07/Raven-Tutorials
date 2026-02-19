/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Light Reactions and Carbon Fixation Mechanisms
 * Standard: Class 11
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_photosynthesis {
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

export const photosynthesis: CurriculumTopic_photosynthesis = {
  id: 'photosynthesis',
  title: 'Light Reactions and Carbon Fixation Mechanisms',
  subject: 'Biology',
  standard: 11,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-02-19',
  revisionNumber: 317,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Light Reactions and Carbon Fixation Mechanisms',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60,
  revisionChecklist: [
    'Verify complete mastery of Light Reactions and Carbon Fixation Mechanisms conceptual derivations and NCERT practice set #11',
    'Verify complete mastery of Light Reactions and Carbon Fixation Mechanisms conceptual derivations and NCERT practice set #23'
  ]
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Light Reactions and Carbon Fixation Mechanisms.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Light Reactions and Carbon Fixation Mechanisms under standard Class 11 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Light Reactions and Carbon Fixation Mechanisms.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  recommendedResources: [
    'NCERT Exemplar Class 11 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ]
};

export default photosynthesis;
