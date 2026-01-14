import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageLayout from "./layouts/PageLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public layout */}
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
