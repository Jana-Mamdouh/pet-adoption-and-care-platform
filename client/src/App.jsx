import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Pets />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<h1>About Page</h1>} />

        <Route path="/contact" element={<h1>Contact Page</h1>} />

        <Route path="/adoption-tips" element={<h1>Adoption Tips Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;