import Main from "../pages/Main";
import Recipes from "../pages/Recipes";
import Statistics from "../pages/Statistics";
import Profile from "../pages/Profile";

export const privateRoutes = [
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "/recipes",
        element: <Recipes />,
    },
    {
        path: "/statistics",
        element: <Statistics />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
];

export const publicRoutes = [
    {
        path: "/profile",
        element: <Profile />,
    },
];
