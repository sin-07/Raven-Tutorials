/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Nerve Impulse Propagation and Synaptic Action
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_neural_control {
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

export const neural_control: CurriculumTopic_neural_control = {
  id: 'neural-control',
  title: 'Nerve Impulse Propagation and Synaptic Action',
  subject: 'Biology',
  standard: 11,
  weightagePercent: 10,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Nerve Impulse Propagation and Synaptic Action',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50
};

export default neural_control;
