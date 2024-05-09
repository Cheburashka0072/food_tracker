import Main from "../pages/Main";
import Recipes from "../pages/Recipes";
import Statistics from "../pages/Statistics";

export const routes = [
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
];
