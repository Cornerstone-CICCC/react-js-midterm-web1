import { UserContextProvider } from "./context/user/UserContextProvider";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import PageLayout from "./layouts/PageLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/ProductDetail";

type Props = {};

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
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
