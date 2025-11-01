import { createBrowserRouter } from "react-router-dom";
import Page from "./app/dashboard/page";
import Grid from "./app/dashboard/grid";
import Gnatt from "./app/dashboard/gnatt";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Page,
    children: [
      {
        path: "grid",
        Component: Grid,
      },
      {
        path: "gantt",
        Component: Gnatt,
      },
    ],
  },
]);

export default router;
