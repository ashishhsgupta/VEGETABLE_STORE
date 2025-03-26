import React from "react";
import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from "../Header/DefaultLayout";
import {HOME_PATH } from "../Router/Router-Constant.jsx";
import Home from "../Home";



const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path : HOME_PATH,
        element: <Home />
      }
    ],
  },
]);

export default router;
