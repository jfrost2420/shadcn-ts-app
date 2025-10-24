import { createBrowserRouter } from "react-router-dom"
import Page from "./app/dashboard/page"
import Test from "./app/dashboard/test"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Page,
    children: [
      {
          path: "test",
          Component: Test,
      },
    ]
  },
])

export default router
