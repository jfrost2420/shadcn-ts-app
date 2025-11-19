import { AgGridReact } from "ag-grid-react";
import { useMemo, useState, useCallback } from "react";
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

function makeAssignmentColumns(assignmentFields: string[]) {
  const cols: ColDef<GradeRow>[] = [
    { field: "name", headerName: "Student", pinned: "left", minWidth: 180 },
  ];

  assignmentFields.forEach((field) => {
    cols.push({
      field,
      headerName: field.replace(/(HW|Quiz|Test|Project)/, (m) => `${m}`),
      type: "numericColumn",
      width: 110,
      editable: true,
      // parse entered values to numbers
      valueParser: (params: any) => {
        const v = params.newValue;
        if (v === null || v === undefined || v === "") return null;
        const n = Number(v);
        return Number.isNaN(n) ? null : n;
      },
      valueFormatter: (params: any) => {
        // show integer when possible, otherwise show as-is
        if (params.value == null || params.value === "") return "";
        return Number(params.value).toString();
      },
    });
  });

  // student average column (read-only)
  cols.push({
    field: "avg",
    headerName: "Average",
    width: 120,
    pinned: "right",
    valueGetter: (params: any) => {
      const data = params.data as GradeRow | undefined;
      if (!data) return "";
      let sum = 0;
      let count = 0;
      assignmentFields.forEach((f) => {
        const v = Number(data[f] ?? 0);
        if (!Number.isNaN(v)) {
          sum += v;
          count++;
        }
      });
      if (count === 0) return "";
      return (sum / count).toFixed(1);
    },
    valueFormatter: (p: any) => (p.value == null ? "" : String(p.value)),
  });

  return cols;
}

function randomGrade(min = 60, max = 100) {
  // return integer grade between min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRows(assignmentFields: string[]) {
  return STUDENT_NAMES.map((name, idx) => {
    const base: GradeRow = { id: idx + 1, name };
    assignmentFields.forEach((field) => {
      // generate 60-100 grades; can tweak distribution per assignment type if desired
      base[field] = randomGrade();
    });
    return base;
  });
}

export default function Grid() {
  // derive assignment field names (e.g., HW1, Quiz2...)
  const ASSIGNMENT_FIELDS = useMemo(() => {
    const fields: string[] = [];
    ASSIGNMENT_TYPES.forEach(({ type, count }) => {
      for (let i = 1; i <= count; i++) fields.push(`${type}${i}`);
    });
    return fields;
  }, []);

  // columns depend on assignment fields
  const colDefs = useMemo(
    () => makeAssignmentColumns(ASSIGNMENT_FIELDS),
    [ASSIGNMENT_FIELDS]
  );

  // use state for row data so we can update on edits
  const [rowData, setRowData] = useState<GradeRow[]>(() =>
    makeRows(ASSIGNMENT_FIELDS)
  );

  // compute pinned bottom row with assignment averages
  const pinnedBottomRowData = useMemo(() => {
    if (!rowData || rowData.length === 0) return [];
    const footer: Record<string, any> = { name: "Assignment Avg" };
    // per-assignment averages
    ASSIGNMENT_FIELDS.forEach((f) => {
      let sum = 0;
      let count = 0;
      rowData.forEach((r) => {
        const v = Number(r[f]);
        if (!Number.isNaN(v)) {
          sum += v;
          count++;
        }
      });
      footer[f] = count > 0 ? Number((sum / count).toFixed(1)) : "";
    });

    // overall average across all assignments/students
    let total = 0;
    let cells = 0;
    ASSIGNMENT_FIELDS.forEach((f) => {
      rowData.forEach((r) => {
        const v = Number(r[f]);
        if (!Number.isNaN(v)) {
          total += v;
          cells++;
        }
      });
    });
    footer["avg"] = cells > 0 ? Number((total / cells).toFixed(1)) : "";

    return [footer];
  }, [rowData, ASSIGNMENT_FIELDS]);

  const onCellValueChanged = useCallback((params: any) => {
    // params.data has the updated row object; replace that row in state to trigger recompute
    const updated = params.data as GradeRow;
    setRowData((prev) =>
      prev.map((r) => (r.id === updated.id ? { ...updated } : r))
    );
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={onCellValueChanged}
          pinnedBottomRowData={pinnedBottomRowData}
        />
      </div>
    </div>
  );
}
