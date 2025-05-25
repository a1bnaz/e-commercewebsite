import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Error from "./pages/Error/Error.jsx";
import Login from "./pages/Login/Login.jsx";
import Listings from "./pages/Listings/Listings.jsx";
import MyListings from "./pages/MyListings/MyListings.jsx";
import ViewListing from "./pages/ViewListing/ViewListing.jsx";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            
            {/* Landing Page/First Page */}
            <Route path="/" element={<Login />} />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            {/* Home Page */}
            <Route path="/home" element={<Home />} />

            {/* Listings Page */}
            <Route path="/listings" element={<Listings />} />

            <Route path="/listings/:listingId" element={<ViewListing/>} />

            {/* My Listings Page */}
            <Route path="/mylistings" element={<MyListings />} />
            
            {/* Error Page */}
            <Route path="*" element={<Error />} /> 

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
