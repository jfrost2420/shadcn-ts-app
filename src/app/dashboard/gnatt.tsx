import { gantt }  from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { useEffect, useRef } from "react";

export default function Test2() {

  const container = useRef<HTMLDivElement | null>(null) 
 
  useEffect(() => { 
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.init(container.current!);
    gantt.parse({
      data:[
        {id:1, text:"Project #1", start_date:"2024-06-01 00:00", duration:18, progress:0.4, open: true},
        {id:2, text:"Task #1",    start_date:"2024-06-02 00:00", duration:8,  progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"2024-06-11 00:00", duration:8,  progress:0.6, parent:1}
      ],
      links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:2, target:3, type:"0"}
      ]
    }); 
 
    return () => {}; 
  }, []);  

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div  className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <div ref={container} style={ {width: "100%", height: "100%"} }></div>
      </div>
    </div>
  )
}
