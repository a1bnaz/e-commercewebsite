import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home.jsx"
import Error from "./pages/Error.jsx"

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          
          <Route path="*" element={<Error />} /> 

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
