import { createBrowserRouter } from "react-router-dom"
import Page from "./app/dashboard/page"
import Test from "./app/dashboard/grid"
import Gnatt from "./app/dashboard/gnatt"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Page,
    children: [
      {
          path: "grid",
          Component: Test,
      },
      {
        path: "gantt",
        Component: Gnatt,
      }
    ]
  },
])

export default router
