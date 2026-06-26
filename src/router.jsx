import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import CreateNew from "./pages/CreateNew";
import Upgrade from "./pages/Upgrade";
import CoursePlayer from "./pages/CoursePlayer";

export const router = createBrowserRouter([
    // 🌍 Public Routes
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },

    // 🎬 Full-screen Course Player (outside DashboardLayout)
    {
        path: "/dashboard/courses/:id",
        element: <CoursePlayer />,
    },

    // 🔐 Dashboard Routes
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "courses",
                children: [
                    {
                        index: true,
                        element: <Courses />,
                    },
                    {
                        path: "new",
                        element: <CreateNew />,
                    },
                ],
            },
            {
                path: "leaderboard",
                element: <Leaderboard />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "upgrade",
                element: <Upgrade />,
            },
        ],
    },

    //  404 Route
    {
        path: "*",
        element: <NotFound />,
    },
]);
