import { Grid as GridDHX } from "dhx-grid";
import { useEffect, useRef } from "react";
import "dhx-grid/codebase/grid.min.css";
import { gridColumns, gridData } from "./gridConfig";

export default function Test() {
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<any | null>(null);
  useEffect(() => {
    if (!gridContainerRef.current) return;
    console.log("[Test] mounting grid");

    // create and store the grid instance on a ref so cleanup can access it
    gridRef.current = new GridDHX(gridContainerRef.current, {
      columns: gridColumns,
      // freeze the first (leftmost) column
      leftSplit: 1,
      data: gridData,
    });

    return () => {
      console.log("[Test] cleanup: destroying grid");
      try {
        gridRef.current?.destructor();
      } catch (err) {
        console.error("[Test] error during grid destructor", err);
      } finally {
        gridRef.current = null;
      }
    };
  }, []);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div
        ref={gridContainerRef}
        style={{ width: "100%", height: "100%" }}
        className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"
      />
    </div>
  );
}
