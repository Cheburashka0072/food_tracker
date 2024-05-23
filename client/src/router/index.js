import Main from "../pages/Main";
import DishDirectory from "../pages/DishDirectory";
import Statistics from "../pages/Statistics";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";

export const privateRoutes = [
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "/directory",
        element: <DishDirectory />,
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
        path: "/auth",
        element: <Auth />,
    },
];
