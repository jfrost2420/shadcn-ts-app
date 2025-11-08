export const gridColumns = [
  { id: "id", header: [{ text: "Student ID" }], width: 120 },
  { id: "name", header: [{ text: "Student Name" }], width: 200 },
  { id: "age", header: [{ text: "Grade Level" }], width: 120 },
  { id: "mathematics", header: [{ text: "Mathematics" }], width: 120 },
  { id: "english", header: [{ text: "English" }], width: 100 },
  { id: "science", header: [{ text: "Science" }], width: 100 },
  { id: "history", header: [{ text: "History" }], width: 100 },
  { id: "geography", header: [{ text: "Geography" }], width: 120 },
  { id: "physics", header: [{ text: "Physics" }], width: 100 },
  { id: "chemistry", header: [{ text: "Chemistry" }], width: 120 },
  { id: "biology", header: [{ text: "Biology" }], width: 100 },
  { id: "literature", header: [{ text: "Literature" }], width: 120 },
  { id: "writing", header: [{ text: "Writing" }], width: 100 },
  { id: "art", header: [{ text: "Art" }], width: 100 },
  { id: "music", header: [{ text: "Music" }], width: 100 },
  { id: "physical_ed", header: [{ text: "Physical Ed" }], width: 120 },
  { id: "computer_sci", header: [{ text: "Computer Sci" }], width: 130 },
  { id: "economics", header: [{ text: "Economics" }], width: 120 },
  { id: "psychology", header: [{ text: "Psychology" }], width: 130 },
  { id: "sociology", header: [{ text: "Sociology" }], width: 120 },
  { id: "french", header: [{ text: "French" }], width: 100 },
  { id: "spanish", header: [{ text: "Spanish" }], width: 100 },
  { id: "statistics", header: [{ text: "Statistics" }], width: 120 },
  { id: "calculus", header: [{ text: "Calculus" }], width: 100 },
  { id: "algebra", header: [{ text: "Algebra" }], width: 100 },
  { id: "geometry", header: [{ text: "Geometry" }], width: 100 },
  { id: "drama", header: [{ text: "Drama" }], width: 100 },
  { id: "debate", header: [{ text: "Debate" }], width: 100 },
  { id: "health", header: [{ text: "Health" }], width: 100 },
  { id: "ethics", header: [{ text: "Ethics" }], width: 100 },
  { id: "philosophy", header: [{ text: "Philosophy" }], width: 120 },
  { id: "gpa", header: [{ text: "GPA" }], width: 100 },
  { id: "attendance", header: [{ text: "Attendance %" }], width: 130 },
];

// Factory function to create grid row data for a student
function createStudentRow(
  id: number,
  name: string,
  gradeLevel: number,
  basePerformance: number // Base performance 0-100 to add some variation
) {
  // Helper to generate grade with some randomness around base performance
  const generateGrade = (offset: number = 0) => {
    const grade = Math.min(100, Math.max(0, basePerformance + offset + (Math.random() * 20 - 10)));
    return Math.round(grade);
  };

  // Calculate GPA (0-4.0 scale)
  const calculateGPA = (grades: number[]) => {
    const avgGrade = grades.reduce((sum, g) => sum + g, 0) / grades.length;
    return ((avgGrade / 100) * 4.0).toFixed(2);
  };

  const subjects = [
    generateGrade(0),    // mathematics
    generateGrade(5),    // english
    generateGrade(-3),   // science
    generateGrade(2),    // history
    generateGrade(0),    // geography
    generateGrade(-5),   // physics
    generateGrade(-2),   // chemistry
    generateGrade(3),    // biology
    generateGrade(8),    // literature
    generateGrade(6),    // writing
    generateGrade(10),   // art
    generateGrade(12),   // music
    generateGrade(15),   // physical_ed
    generateGrade(-8),   // computer_sci
    generateGrade(1),    // economics
    generateGrade(4),    // psychology
    generateGrade(3),    // sociology
    generateGrade(-4),   // french
    generateGrade(-2),   // spanish
    generateGrade(-10),  // statistics
    generateGrade(-12),  // calculus
    generateGrade(-5),   // algebra
    generateGrade(-3),   // geometry
    generateGrade(14),   // drama
    generateGrade(7),    // debate
    generateGrade(9),    // health
    generateGrade(5),    // ethics
    generateGrade(2),    // philosophy
  ];

  const row: Record<string, string | number> = {
    id,
    name,
    age: gradeLevel,
    mathematics: subjects[0],
    english: subjects[1],
    science: subjects[2],
    history: subjects[3],
    geography: subjects[4],
    physics: subjects[5],
    chemistry: subjects[6],
    biology: subjects[7],
    literature: subjects[8],
    writing: subjects[9],
    art: subjects[10],
    music: subjects[11],
    physical_ed: subjects[12],
    computer_sci: subjects[13],
    economics: subjects[14],
    psychology: subjects[15],
    sociology: subjects[16],
    french: subjects[17],
    spanish: subjects[18],
    statistics: subjects[19],
    calculus: subjects[20],
    algebra: subjects[21],
    geometry: subjects[22],
    drama: subjects[23],
    debate: subjects[24],
    health: subjects[25],
    ethics: subjects[26],
    philosophy: subjects[27],
    gpa: calculateGPA(subjects),
    attendance: Math.round(85 + Math.random() * 15) + "%",
  };

  return row;
}

// Sample student data with names, grade levels, and base performance
const studentData = [
  { name: "Emma Johnson", gradeLevel: 10, basePerformance: 92 },
  { name: "Liam Smith", gradeLevel: 10, basePerformance: 78 },
  { name: "Olivia Williams", gradeLevel: 11, basePerformance: 88 },
  { name: "Noah Brown", gradeLevel: 9, basePerformance: 85 },
  { name: "Ava Davis", gradeLevel: 12, basePerformance: 95 },
  { name: "Ethan Martinez", gradeLevel: 10, basePerformance: 72 },
  { name: "Sophia Rodriguez", gradeLevel: 11, basePerformance: 90 },
  { name: "Mason Garcia", gradeLevel: 9, basePerformance: 68 },
  { name: "Isabella Wilson", gradeLevel: 12, basePerformance: 87 },
  { name: "William Anderson", gradeLevel: 10, basePerformance: 83 },
  { name: "Mia Taylor", gradeLevel: 11, basePerformance: 91 },
  { name: "James Thomas", gradeLevel: 9, basePerformance: 75 },
  { name: "Charlotte Jackson", gradeLevel: 12, basePerformance: 89 },
  { name: "Benjamin White", gradeLevel: 10, basePerformance: 81 },
  { name: "Amelia Harris", gradeLevel: 11, basePerformance: 94 },
  { name: "Lucas Martin", gradeLevel: 9, basePerformance: 70 },
  { name: "Harper Thompson", gradeLevel: 12, basePerformance: 86 },
  { name: "Alexander Lee", gradeLevel: 10, basePerformance: 79 },
  { name: "Evelyn Walker", gradeLevel: 11, basePerformance: 93 },
  { name: "Michael Hall", gradeLevel: 9, basePerformance: 74 },
  { name: "Abigail Allen", gradeLevel: 12, basePerformance: 88 },
  { name: "Daniel Young", gradeLevel: 10, basePerformance: 82 },
  { name: "Emily King", gradeLevel: 11, basePerformance: 90 },
  { name: "Matthew Wright", gradeLevel: 9, basePerformance: 76 },
  { name: "Ella Lopez", gradeLevel: 12, basePerformance: 92 },
  { name: "Henry Hill", gradeLevel: 10, basePerformance: 80 },
  { name: "Scarlett Scott", gradeLevel: 11, basePerformance: 87 },
  { name: "Jackson Green", gradeLevel: 9, basePerformance: 73 },
];

// Generate grid data using the factory function
export const gridData = studentData.map((student, index) =>
  createStudentRow(index + 1, student.name, student.gradeLevel, student.basePerformance)
);
