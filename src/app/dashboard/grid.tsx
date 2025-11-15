import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register the required modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  make: string;
  model: string;
  price: number;
}

export default function Grid() {
  // Sample row data
  const [rowData] = useState<RowData[]>([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  // Column definitions
  const [colDefs] = useState<ColDef<RowData>[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}
