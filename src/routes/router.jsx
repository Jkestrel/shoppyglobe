import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";

const Home = lazy(() => import("../pages/Home"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={<h2>Loading...</h2>}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Register />
          </Suspense>
        ),
      },
      {
        index: true,
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Checkout />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
