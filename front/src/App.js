import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import SignUp from "./pages/signUp/signUp";
import NewOrder from "./pages/newOrder/newOrder"
import Login from "./pages/login/login"

import Orders from "./pages/orders/orders";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/newOrder" element={<NewOrder />} />
        <Route path="/meusPedidos" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
