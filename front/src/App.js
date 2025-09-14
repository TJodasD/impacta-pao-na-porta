import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import SignUp from "./pages/signUp/signUp";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<SignUp />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
