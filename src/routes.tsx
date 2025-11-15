import { createBrowserRouter } from "react-router-dom"
import Page from "./app/dashboard/page"
import Test from "./app/dashboard/test"
import Grid from "./app/dashboard/grid"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Page,
    children: [
      {
          path: "test",
          Component: Test,
      },
      {
          path: "grid",
          Component: Grid,
      },
    ]
  },
])

export default router
