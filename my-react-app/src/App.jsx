import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Error from "./pages/Error/Error.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          {/* First Page */}
          <Route path="/" element={<Login />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Home Page */}
          <Route path="/home" element={<Home />} />
          
          {/* Error Page */}
          <Route path="*" element={<Error />} /> 

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
