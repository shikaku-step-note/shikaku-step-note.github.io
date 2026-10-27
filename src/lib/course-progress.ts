export interface CourseLesson {
  id: string;
  qualification: string;
  subject?: string;
  unit?: number;
  archived?: boolean;
}

export function selectCourseLessons<T extends CourseLesson>(
  entries: T[],
  qualification: string,
  subject?: string,
  unit?: number,
): T[] {
  return entries.filter(
    (entry) =>
      !entry.archived &&
      entry.qualification === qualification &&
      (subject === undefined || entry.subject === subject) &&
      (unit === undefined || entry.unit === unit),
  );
}
