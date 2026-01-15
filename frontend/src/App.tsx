import { UserContextProvider } from "./context/user/UserContextProvider"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import PageLayout from "./layouts/PageLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


type Props = {}

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
          </Route>
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
