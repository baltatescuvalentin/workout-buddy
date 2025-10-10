import { createBrowserRouter } from "react-router";
import lazyElement from "./LazyLoader";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { guestMiddleware } from "../middlewares/GuestMiddleware";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: lazyElement(() => import("../views/home/Home")),
      },
      {
        path: "/exercises",
        element: lazyElement(() => import("../views/exercices/ExercicesIndex")),
        loader: authMiddleware,
      },
      {
        path: "/calculators",
        element: lazyElement(
          () => import("../views/calculators/CalculatorsIndex")
        ),
        loader: authMiddleware,
      },
      {
        path: "/workouts",
        loader: authMiddleware,
        element: lazyElement(() => import("../views/workouts/WorkoutsIndex")),
        children: [
          {
            path: "show",
            element: lazyElement(
              () => import("../views/workouts/show/WorkoutsShow")
            ),
          },
          {
            path: "create",
            element: lazyElement(
              () => import("../views/workouts/create/WorkoutsCreate")
            ),
          },
          {
            path: "edit/:id",
            element: lazyElement(
              () => import("../views/workouts/edit/WorkoutsEdit")
            ),
          },
        ],
      },
      {
        path: "/exercise",
        element: lazyElement(() => import("../views/routine/ExerciseIndex")),
        loader: authMiddleware,
      },
      {
        path: "/tracker",
        element: lazyElement(() => import("../views/tracker/TrackerIndex")),
        loader: authMiddleware,
      },
      {
        path: "/summary",
        element: lazyElement(() => import("../views/summary/SummaryIndex")),
        loader: authMiddleware,
      },
      {
        path: "/profile",
        element: lazyElement(() => import("../views/profile/ProfileIndex")),
        loader: authMiddleware,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: lazyElement(() => import("../views/auth/Login")),
        loader: guestMiddleware,
      },
      {
        path: "/register",
        element: lazyElement(() => import("../views/auth/Register")),
        loader: guestMiddleware,
      },
    ],
  },
]);

export default router;
