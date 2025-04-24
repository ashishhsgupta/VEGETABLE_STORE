import React from "react";
import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from "../Header/DefaultLayout";
import {ADDED_CART_PRODUCT_PATH, HOME_PATH, ORDER_ITEMS_PATH, PRODUCT_HOME_PATH, PRODUCT_PATH }
from "../Router/Router-Constant.jsx";
import Home from "../Home/Home.jsx";
import Producthome from "../Product/Producthome.jsx";
import Product from "../Product/Product.jsx";
import AddedCartproduct from "../Product/AddedCartProduct.jsx";
import OrderItem from "../Product/OrderItem.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path : HOME_PATH,
        element: <Home />
      },
      {
        path : PRODUCT_HOME_PATH,
        element: <Producthome />
      },
      {
        path : PRODUCT_PATH,
        element: <Product />
      },
      {
        path : ADDED_CART_PRODUCT_PATH,
        element: <AddedCartproduct />
      },
      {
       path: ORDER_ITEMS_PATH,
       element:<OrderItem />
      },

    ],
  },
]);

export default router;
