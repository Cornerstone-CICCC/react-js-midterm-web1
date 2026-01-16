import { UserContextProvider } from "./context/user/UserContextProvider";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import Home from "./pages/Home";
import PageLayout from "./layouts/PageLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProductDetail from "./pages/Products/ProductDetail";
import Cart from "./pages/Cart";
import Products from "./pages/Products/Products";

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="products" element={<Outlet />}>
              <Route index element={<Products />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔒 Protected admin route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
