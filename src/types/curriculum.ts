import { Topic } from '../types';
import { CourseData, MathSection, Module, RichSection } from '../services/contentService';

export type ClassGrade = 
  | 'Class 1' 
  | 'Class 2' 
  | 'Class 3' 
  | 'Class 4' 
  | 'Class 5' 
  | 'Class 6' 
  | 'Class 9' 
  | 'Class 10' 
  | 'Class 11' 
  | 'Class 12'
  | 'Advanced';

export interface ClassContext {
  classId: string;
  gradeLevel: number; // 1 to 12
  subject: string;
  chapter?: string | null;
  topic: Topic | string;
  ageBand: string; // e.g. "6–8 years"
}

export interface PedagogicalStandard {
  gradeRange: string;
  ageBand: string;
  tone: string;
  vocabularyLevel: 'simple' | 'foundational' | 'structured' | 'formal' | 'rigorous';
  maxWordsCore: number;
  maxFormulaLevel: number; // 0 = no formulas, 1 = basic arithmetic, 2 = simple algebra/proportions, 3 = secondary equations, 4 = calculus/vectors
  allowTechnicalJargon: boolean;
  instructionalFocus: string;
}

export interface GradeCurriculumMapping {
  classId: string;
  gradeLevel: number;
  subject: string;
  topicId: Topic | string;
  lessonTitle: string;
  chapterName?: string;
}
