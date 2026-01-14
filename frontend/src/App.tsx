import { UserContextProvider } from "./context/user/UserContextProvider"
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import PageLayout from "./layouts/PageLayout";

type Props = {}

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
