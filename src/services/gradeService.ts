export const GradeService = {
  gpa: (courses: any[]) => {
    if (!courses?.length) return "0.00";
    let totalPoints = 0;
    let totalCredits = 0;
    for (const c of courses) {
      const credits = parseInt(c.credits || 0);
      const grade = parseFloat(c.grade || 0);
      totalPoints += grade * credits;
      totalCredits += credits;
    }
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  },
  totalCredits: (semesters: any[]) => {
    if (!semesters?.length) return 0;
    let total = 0;
    for (const sem of semesters) {
      for (const c of sem.courses || []) {
        total += parseInt(c.credits || 0);
      }
    }
    return total;
  },
  semesterCredits: (courses: any[]) =>
    (courses || []).reduce(
      (s: number, c: any) => s + parseInt(c.credits || 0),
      0,
    ),
};
