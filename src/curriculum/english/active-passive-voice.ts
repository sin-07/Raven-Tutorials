/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Active and Passive Voice Syntactic Rules
 * Standard: Class 10
 * Exam Weightage: ~6%
 */

export interface CurriculumTopic_active_passive_voice {
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

export const active_passive_voice: CurriculumTopic_active_passive_voice = {
  id: 'active-passive-voice',
  title: 'Active and Passive Voice Syntactic Rules',
  subject: 'English',
  standard: 10,
  weightagePercent: 6,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-08',
  revisionNumber: 333,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Active and Passive Voice Syntactic Rules',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 9,
  sampleProblemCount: 30,
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Active and Passive Voice Syntactic Rules',
    'Premature approximation prior to final algebraic simplification'
  ],
  recommendedResources: [
    'NCERT Exemplar Class 10 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Active and Passive Voice Syntactic Rules',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Active and Passive Voice Syntactic Rules',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Active and Passive Voice Syntactic Rules',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Active and Passive Voice Syntactic Rules',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Active and Passive Voice Syntactic Rules',
    'Raven Tutorials Advanced Problem Vault - Volume 18 for Active and Passive Voice Syntactic Rules',
    'Raven Tutorials Advanced Problem Vault - Volume 6 for Active and Passive Voice Syntactic Rules'
  ]
};

export default active_passive_voice;
