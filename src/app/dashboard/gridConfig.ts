export const gridColumns = [
  { id: "id", header: [{ text: "Student ID" }], width: 120 },
  { id: "name", header: [{ text: "Student Name" }], width: 200 },
  { id: "hw1", header: [{ text: "HW 1" }], width: 100, editable: true, summary: "sum", footer: [{ text: (val: any) => String(val.sum || 0) }] },
  { id: "hw2", header: [{ text: "HW 2" }], width: 100, editable: true, summary: "avg", footer: [{ text: (val: any) => String(Math.round((val.avg || 0) * 10) / 10) }] },
  { id: "hw3", header: [{ text: "HW 3" }], width: 100, editable: true, summary: "min", footer: [{ text: (val: any) => String(val.min || 0) }] },
  { id: "hw4", header: [{ text: "HW 4" }], width: 100, editable: true, summary: "max", footer: [{ text: (val: any) => String(val.max || 0) }] },
  { id: "hw5", header: [{ text: "HW 5" }], width: 100, editable: true, summary: "sum", footer: [{ text: (val: any) => String(val.sum || 0) }] },
  { id: "quiz1", header: [{ text: "Quiz 1" }], width: 100, editable: true, summary: "avg", footer: [{ text: (val: any) => String(Math.round((val.avg || 0) * 10) / 10) }] },
  { id: "quiz2", header: [{ text: "Quiz 2" }], width: 100, editable: true, summary: "min", footer: [{ text: (val: any) => String(val.min || 0) }] },
  { id: "quiz3", header: [{ text: "Quiz 3" }], width: 100, editable: true, summary: "max", footer: [{ text: (val: any) => String(val.max || 0) }] },
  { id: "quiz4", header: [{ text: "Quiz 4" }], width: 100, editable: true, summary: "sum", footer: [{ text: (val: any) => String(val.sum || 0) }] },
  { id: "quiz5", header: [{ text: "Quiz 5" }], width: 100, editable: true, summary: "avg", footer: [{ text: (val: any) => String(Math.round((val.avg || 0) * 10) / 10) }] },
  { id: "test1", header: [{ text: "Test 1" }], width: 100, editable: true, summary: "min", footer: [{ text: (val: any) => String(val.min || 0) }] },
  { id: "test2", header: [{ text: "Test 2" }], width: 100, editable: true, summary: "max", footer: [{ text: (val: any) => String(val.max || 0) }] },
  { id: "test3", header: [{ text: "Test 3" }], width: 100, editable: true, summary: "sum", footer: [{ text: (val: any) => String(val.sum || 0) }] },
  { id: "test4", header: [{ text: "Test 4" }], width: 100, editable: true, summary: "avg", footer: [{ text: (val: any) => String(Math.round((val.avg || 0) * 10) / 10) }] },
  { id: "lab1", header: [{ text: "Lab 1" }], width: 100, editable: true, summary: "min", footer: [{ text: (val: any) => String(val.min || 0) }] },
  { id: "lab2", header: [{ text: "Lab 2" }], width: 100, editable: true, summary: "max", footer: [{ text: (val: any) => String(val.max || 0) }] },
  { id: "lab3", header: [{ text: "Lab 3" }], width: 100, editable: true, summary: "sum", footer: [{ text: (val: any) => String(val.sum || 0) }] },
  { id: "lab4", header: [{ text: "Lab 4" }], width: 100, editable: true, summary: "avg", footer: [{ text: (val: any) => String(Math.round((val.avg || 0) * 10) / 10) }] },
  { id: "project1", header: [{ text: "Project 1" }], width: 110, editable: true, summary: "min", footer: [{ text: (val: any) => String(val.min || 0) }] },
  { id: "project2", header: [{ text: "Project 2" }], width: 110, editable: true, summary: "max", footer: [{ text: (val: any) => String(val.max || 0) }] },
  { id: "essay1", header: [{ text: "Essay 1" }], width: 100, editable: true, summary: "sum", footer: [{ text: (val: any) => String(val.sum || 0) }] },
  { id: "essay2", header: [{ text: "Essay 2" }], width: 100, editable: true, summary: "avg", footer: [{ text: (val: any) => String(Math.round((val.avg || 0) * 10) / 10) }] },
  { id: "presentation1", header: [{ text: "Presentation 1" }], width: 130, editable: true, summary: "min", footer: [{ text: (val: any) => String(val.min || 0) }] },
  { id: "presentation2", header: [{ text: "Presentation 2" }], width: 130, editable: true, summary: "max", footer: [{ text: (val: any) => String(val.max || 0) }] },
  { id: "midterm", header: [{ text: "Midterm" }], width: 100, editable: true, summary: "sum", footer: [{ text: (val: any) => String(val.sum || 0) }] },
  { id: "final", header: [{ text: "Final Exam" }], width: 110, editable: true, summary: "avg", footer: [{ text: (val: any) => String(Math.round((val.avg || 0) * 10) / 10) }] },
  { id: "participation", header: [{ text: "Participation" }], width: 120, editable: true, summary: "min", footer: [{ text: (val: any) => String(val.min || 0) }] },
  { id: "avg", header: [{ text: "Average" }], width: 100, summary: "avg", footer: [{ text: (val: any) => String(Math.round((val.avg || 0) * 10) / 10) }] },
  { id: "attendance", header: [{ text: "Attendance %" }], width: 130 },
];

// Factory function to create grid row data for a student
function createStudentRow(
  id: number,
  name: string,
  basePerformance: number // Base performance 0-100 to add some variation
) {
  // Helper to generate grade with some randomness around base performance
  const generateGrade = (offset: number = 0) => {
    const grade = Math.min(100, Math.max(0, basePerformance + offset + (Math.random() * 20 - 10)));
    return Math.round(grade);
  };

  // Calculate average grade
  const calculateAverage = (grades: number[]) => {
    const avgGrade = grades.reduce((sum, g) => sum + g, 0) / grades.length;
    return Math.round(avgGrade);
  };

  const assignments = [
    generateGrade(0),    // hw1
    generateGrade(2),    // hw2
    generateGrade(-1),   // hw3
    generateGrade(3),    // hw4
    generateGrade(1),    // hw5
    generateGrade(-2),   // quiz1
    generateGrade(0),    // quiz2
    generateGrade(1),    // quiz3
    generateGrade(-3),   // quiz4
    generateGrade(2),    // quiz5
    generateGrade(-5),   // test1
    generateGrade(-4),   // test2
    generateGrade(-3),   // test3
    generateGrade(-6),   // test4
    generateGrade(4),    // lab1
    generateGrade(3),    // lab2
    generateGrade(2),    // lab3
    generateGrade(1),    // lab4
    generateGrade(-8),   // project1
    generateGrade(-7),   // project2
    generateGrade(5),    // essay1
    generateGrade(4),    // essay2
    generateGrade(-2),   // presentation1
    generateGrade(-1),   // presentation2
    generateGrade(-10),  // midterm
    generateGrade(-12),  // final
    generateGrade(8),    // participation
  ];

  const row: Record<string, string | number> = {
    id,
    name,
    hw1: assignments[0],
    hw2: assignments[1],
    hw3: assignments[2],
    hw4: assignments[3],
    hw5: assignments[4],
    quiz1: assignments[5],
    quiz2: assignments[6],
    quiz3: assignments[7],
    quiz4: assignments[8],
    quiz5: assignments[9],
    test1: assignments[10],
    test2: assignments[11],
    test3: assignments[12],
    test4: assignments[13],
    lab1: assignments[14],
    lab2: assignments[15],
    lab3: assignments[16],
    lab4: assignments[17],
    project1: assignments[18],
    project2: assignments[19],
    essay1: assignments[20],
    essay2: assignments[21],
    presentation1: assignments[22],
    presentation2: assignments[23],
    midterm: assignments[24],
    final: assignments[25],
    participation: assignments[26],
    avg: calculateAverage(assignments),
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
  createStudentRow(index + 1, student.name, student.basePerformance)
);
