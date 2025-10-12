import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import SignUp from "./pages/signUp/signUp";
import NewOrder from "./pages/newOrder/newOrder"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/newOrder" element={<NewOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
