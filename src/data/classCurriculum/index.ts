import { CourseData } from '../../services/contentService';
import { preloadedCourses } from '../preloadedCourses';
import { class1Curriculum } from './class1';
import { class2Curriculum } from './class2';
import { class3Curriculum } from './class3';
import { class4Curriculum } from './class4';
import { class5Curriculum } from './class5';
import { class6Curriculum } from './class6';
import { class9Curriculum } from './class9';
import { class10Curriculum } from './class10';
import { class11Curriculum } from './class11';
import { class12Curriculum } from './class12';

// Combined class-specific curriculum registry
export const classCurriculumRegistry: Record<string, CourseData> = {
  ...class1Curriculum,
  ...class2Curriculum,
  ...class3Curriculum,
  ...class4Curriculum,
  ...class5Curriculum,
  ...class6Curriculum,
  ...class9Curriculum,
  ...class10Curriculum,
  ...class11Curriculum,
  ...class12Curriculum,
};

// Numeric grade level helper
export function parseGradeLevel(classId: string | undefined): number {
  if (!classId) return 1;
  const match = classId.match(/\d+/);
  return match ? parseInt(match[0], 10) : (classId.includes('Advanced') || classId.includes('College') ? 13 : 1);
}

/**
 * Resolves the most accurate, grade-appropriate course for the given class and topic.
 * 1. Checks specific `${classId}::${topicId}` in class-aware curriculum.
 * 2. Checks if classId has a close equivalent in the registry.
 * 3. Falls back to preloadedCourses[topicId] if present.
 */
export function getGradeAwareCourse(topicId: string, classId?: string, subjectId?: string): CourseData | null {
  if (classId) {
    const key = `${classId}::${topicId}`;
    if (classCurriculumRegistry[key]) {
      return classCurriculumRegistry[key];
    }
  }

  // Fallback to general preloadedCourses
  const base = preloadedCourses[topicId];
  if (!base) return null;

  // If a classId is active, clone and enforce grade safety (e.g. formula gating)
  if (classId) {
    const grade = parseGradeLevel(classId);
    const cloned = { ...base };
    
    // Formula gating: remove or mark formulas if student's grade is lower than required
    if (cloned.math) {
      const minGrade = cloned.math.minGradeLevel ?? 9; // Default to Grade 9 minimum if unspecified
      if (grade < minGrade) {
        // For early grades (Class 1-5), completely omit university/high-school math
        if (grade <= 5) {
          delete (cloned as any).math;
        } else {
          // For intermediate grades, mark as optional enrichment
          cloned.math = {
            ...cloned.math,
            isEnrichment: true,
            intro: `[Optional Advanced Enrichment for Grade ${minGrade}+] ${cloned.math.intro}`
          };
        }
      }
    }
    return cloned;
  }

  return base;
}

/**
 * Returns all available grade versions for a given topic across the curriculum.
 * e.g. for "Globe", returns: [Class 1, Class 2, Class 3, Class 6, Class 9]
 */
export function getAvailableGradesForTopic(topicId: string): { classId: string; subject: string; label: string; gradeLevel: number }[] {
  const result: { classId: string; subject: string; label: string; gradeLevel: number }[] = [];
  
  for (const [key, course] of Object.entries(classCurriculumRegistry)) {
    const [cls, top] = key.split('::');
    if (top === topicId && cls) {
      result.push({
        classId: cls,
        subject: course.subjectId || 'Science',
        label: course.title,
        gradeLevel: course.gradeLevel || parseGradeLevel(cls)
      });
    }
  }

  // Sort by grade level ascending
  return result.sort((a, b) => a.gradeLevel - b.gradeLevel);
}
