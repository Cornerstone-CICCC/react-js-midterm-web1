import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageLayout from "./layouts/PageLayout";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/Products/ProductDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Outlet />}>
            <Route index element={<Products />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
