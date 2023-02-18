import {
  createBrowserRouter
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard-profesor",
    element: <ProfesorDashboard />,
  },
  {
    path: "/dashboard-control",
    element: <ControlDashboard />,
  },
]);

export default router;