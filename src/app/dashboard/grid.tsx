import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register the required modules
ModuleRegistry.registerModules([AllCommunityModule]);

type GradeRow = {
  id: number;
  name: string;
  [assignment: string]: string | number;
};

const STUDENT_NAMES = [
  "Alex Johnson",
  "Brianna Lee",
  "Caleb Smith",
  "Diana Ross",
  "Ethan Brown",
  "Fiona Green",
  "Gabriel White",
  "Hannah Black",
  "Ian Walker",
  "Jasmine Patel",
  "Kevin Nguyen",
  "Lily Adams",
  "Marcus Young",
  "Nina Lopez",
  "Owen Clark",
  "Priya Sharma",
  "Quentin Price",
  "Rosa Diaz",
  "Samuel King",
  "Tara Morgan",
];

// Assignment distribution (total 15)
const ASSIGNMENT_TYPES: { type: string; count: number }[] = [
  { type: "HW", count: 6 },
  { type: "Quiz", count: 5 },
  { type: "Test", count: 3 },
  { type: "Project", count: 1 },
];

function makeAssignmentColumns() {
  const cols: ColDef<GradeRow>[] = [
    { field: "name", headerName: "Student", pinned: "left", minWidth: 180 },
  ];

  ASSIGNMENT_TYPES.forEach(({ type, count }) => {
    for (let i = 1; i <= count; i++) {
      const field = `${type}${i}`;
      cols.push({
        field,
        headerName: `${type} ${i}`,
        type: "numericColumn",
        width: 110,
        // simple sorting/aggregation will work on numeric values
      });
    }
  });

  return cols;
}

function randomGrade(min = 60, max = 100) {
  // return integer grade between min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRows() {
  const assignmentFields: string[] = [];
  ASSIGNMENT_TYPES.forEach(({ type, count }) => {
    for (let i = 1; i <= count; i++) assignmentFields.push(`${type}${i}`);
  });

  return STUDENT_NAMES.map((name, idx) => {
    const base: GradeRow = { id: idx + 1, name };
    assignmentFields.forEach((field) => {
      // generate 0-100 grades; can tweak distribution per assignment type if desired
      base[field] = randomGrade();
    });
    return base;
  });
}

export default function Grid() {
  // compute columns and rows once
  const colDefs = useMemo(() => makeAssignmentColumns(), []);
  const rowData = useMemo(() => makeRows(), []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div style={{ height: 700, width: "100%" }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}
