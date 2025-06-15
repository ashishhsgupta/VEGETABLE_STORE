import React, { Suspense, lazy } from "react";
import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from "../Header/DefaultLayout";
import {DELIVERY_STATUS_PATH, ABOUT_PATH, ADDED_CART_PRODUCT_PATH, CONTACTUS_PATH, FAQ_PATH, HOME_PATH, ORDER_ITEMS_PATH, PRODUCT_HOME_PATH, PRODUCT_PATH, SUPPORT_PATH }
from "../Router/Router-Constant.jsx";
import Home from "../Home/Home.jsx";
import Producthome from "../Product/Producthome.jsx";
import AddedCartproduct from "../Product/AddedCartProduct.jsx";
import OrderItem from "../Product/OrderItem.jsx";
import About from "../Footer/About.jsx";
import ContactUs from "../Footer/ContactUs.jsx";
import FAQ from "../Footer/FAQ.jsx";
import Support from "../Footer/Support.jsx";
import DeliveryStatus from "../Footer/DeliveryStatus.jsx";


const Product = lazy(()=>import('../Product/Product.jsx'));

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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Product />
          </Suspense>
        ),
      },
      {
        path : ADDED_CART_PRODUCT_PATH,
        element: <AddedCartproduct />
      },
      {
       path: ORDER_ITEMS_PATH,
       element:<OrderItem />
      },
      {
        path: ABOUT_PATH,
        element:<About />
      },
      {
        path: CONTACTUS_PATH,
        element:<ContactUs />
      },
      {
        path: FAQ_PATH,
        element:<FAQ />
      },
      {
        path: SUPPORT_PATH,
        element:<Support />
      },
      {
        path: DELIVERY_STATUS_PATH,
        element:<DeliveryStatus />
      }

    ],
  },
]);

export default router;
