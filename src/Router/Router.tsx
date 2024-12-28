import { createBrowserRouter } from "react-router";
import EditProduct from "../Components/EditProduct";
import ProtectedAdminRoute from "../Components/ProtectedAdminRoute";
import ProtectedUserRoute from "../Components/ProtectedUserRoute";
import AddProduct from "../Pages/AddProduct";
import AllProducts from "../Pages/AllProducts";
import Cart from "../Pages/Cart";
import CheckOut from "../Pages/CheckOut";
import Error from "../Pages/Error";
import Products from "../Pages/Home";
import Login from "../Pages/Login";
import Product from "../Pages/Product";
import Root from "../Pages/Root";
import Signup from "../Pages/Signup";
import Users from "../Pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/add-product",
        element: (
          <ProtectedAdminRoute>
            <AddProduct />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/all-products",
        element: (
          <ProtectedAdminRoute>
            <AllProducts />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: `/edit-product/:id`,
        element: (
          <ProtectedAdminRoute>
            <EditProduct />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedUserRoute>
            <Cart />
          </ProtectedUserRoute>
        ),
      },
      {
        path: "/users",

        element: (
          <ProtectedAdminRoute>
            <Users />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "/cart/checkout",

        element: (
          <ProtectedUserRoute>
            <CheckOut />
          </ProtectedUserRoute>
        ),
      },
    ],
  },
]);

export default router;
