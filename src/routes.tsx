import { createBrowserRouter } from "react-router-dom"
import Page from "./app/dashboard/page"
import Test from "./app/dashboard/test"
import Test2 from "./app/dashboard/test2"

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
        path: "test2",
        Component: Test2,
      }
    ]
  },
])

export default router
