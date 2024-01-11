import { useDispatch, useSelector } from "react-redux";
import Protected from "./features/auth/components/Protected";
import ProductDetail from "./features/product/components/ProductDetail";
import ProductList from "./features/product/components/ProductList";
import Cartpage from "./pages/Cartpage";
import CheckOut from "./pages/CheckOut";
import Home from "./pages/Home";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  Route,
  Link,
  Router,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import {
  hasLoginnedUserAsync,
  selectLoggedInUser,
} from "./features/auth/authSlice";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrders";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import LogOut from "./features/auth/components/LogOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminHome from "./pages/AdminHome";
import ProductForm from "./features/admin/components/ProductForm";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminUpdateProductFormPage from "./pages/AdminUpdateProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ProductDetailPage from "./pages/ProductDetailPage";
import Testui from "./Testui";
import Shop from "./pages/Shop";
import ProductPopup from "./features/product/components/ProductPopup";
import WishlistPage from "./pages/WishlistPage";
import { fetchWishItemsByUserIdAsync } from "./features/wishlist/wishlistSlice";
import UserEditProfile from "./features/user/components/UserEditProfile";
import Service from "./features/service/Service";
import Contact from "./features/contact/Contact";
import Navbar from "./features/navbar/Navbar";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const createBrowserRouter = () => {
  return [
    {
      path: "/",
      element: (
        <Protected>
          <Home></Home>
        </Protected>
      ),
    },
    {
      path: "/shop",
      element: (
        <Protected>
          <Shop></Shop>
        </Protected>
      ),
    },
    {
      path: "/product-popup/:id",
      element: (
        <Protected>
          <ProductPopup></ProductPopup>
        </Protected>
      ),
    },
    {
      path: "/login",
      element: <Loginpage></Loginpage>,
    },
    {
      path: "/signup",
      element: <Signuppage></Signuppage>,
    },
    {
      path: "/protected",
      element: <Protected></Protected>,
    },
    {
      path: "/test",
      element: <Testui></Testui>,
    },
    {
      path: "/cart",
      element: (
        <Protected>
          <Cartpage></Cartpage>
        </Protected>
      ),
    },
    {
      path: "/services",
      element: <Service></Service>,
    },
    {
      path: "/contact",
      element: <Contact></Contact>,
    },
    {
      path: "/wishlist",
      element: (
        <Protected>
          <WishlistPage></WishlistPage>
        </Protected>
      ),
    },
    {
      path: "/order-success/:id",
      element: (
        <Protected>
          <OrderSuccessPage></OrderSuccessPage>
        </Protected>
      ),
    },
    {
      path: "/checkout",
      element: (
        <Protected>
          <CheckOut></CheckOut>
        </Protected>
      ),
    },
    {
      path: "/product-detail/:id",
      element: (
        <Protected>
          <ProductDetailPage></ProductDetailPage>
        </Protected>
      ),
    },
    {
      path: "/user-orders",
      element: (
        <Protected>
          <UserOrdersPage></UserOrdersPage>
        </Protected>
      ),
    },
    {
      path: "/user-profile",
      element: (
        <Protected>
          <UserProfilePage></UserProfilePage>
        </Protected>
      ),
    },
    {
      path: "/user-editprofile",
      element: (
        <Protected>
          <UserEditProfile></UserEditProfile>
        </Protected>
      ),
    },
    {
      path: "/logout",
      element: <LogOut></LogOut>,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage></ForgotPasswordPage>,
    },
    // For admin side
    {
      path: "/admin/product-form",
      element: (
        <ProtectedAdmin>
          <AdminProductFormPage></AdminProductFormPage>
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/update-product-form/:id",
      element: (
        <ProtectedAdmin>
          <AdminUpdateProductFormPage></AdminUpdateProductFormPage>
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/product-detail/:id",
      element: (
        <ProtectedAdmin>
          <AdminProductDetailPage></AdminProductDetailPage>
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/orders",
      element: (
        <ProtectedAdmin>
          <AdminOrdersPage></AdminOrdersPage>
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedAdmin>
          <AdminHome></AdminHome>
        </ProtectedAdmin>
      ),
    },
    {
      path: "*",
      element: <PageNotFound></PageNotFound>,
    },
  ];
};
function App() {
  const router = createBrowserRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
      dispatch(fetchWishItemsByUserIdAsync(user.id));
    }
  }, [user]);

  return (
    <>
      <Provider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {router.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </BrowserRouter>
      </Provider>
      {/* <Navbar />
      <div>
        <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>
      </div> */}
    </>
  );
}

export default App;
