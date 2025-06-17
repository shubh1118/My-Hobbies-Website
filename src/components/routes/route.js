import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import WithNavbar from "../WithNavbar/WithNavbar";

const Home = lazy(() => import("../Home/Home"));
const Coding = lazy(() => import("../Coding/Coding"));
const Cricket = lazy(() => import("../Cricket/Cricket"));
const Paint = lazy(() => import("../Paint/Paint"));
const Reading = lazy(() => import("../Reading/Reading"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WithNavbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/coding",
        element: <Coding />,
      },
      {
        path: "/cricket",
        element: <Cricket />,
      },
      {
        path: "/paint",
        element: <Paint />,
      },
      {
        path: "/reading",
        element: <Reading />,
      },
    ],
  },
]);
