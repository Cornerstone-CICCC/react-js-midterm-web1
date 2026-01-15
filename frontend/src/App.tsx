import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageLayout from "./layouts/PageLayout";
import Products from "./pages/Products/Products";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
