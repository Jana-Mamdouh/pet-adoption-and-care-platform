import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [wishCount, setWishCount] = useState(0);

    const updateCounts = () => {
        const cart = JSON.parse(localStorage.getItem("petCart")) || [];
        const wishlist = JSON.parse(localStorage.getItem("petWishlist")) || [];

        setCartCount(cart.length);
        setWishCount(wishlist.length);
    };

    useEffect(() => {
        updateCounts();

        window.addEventListener("storageUpdated", updateCounts);

        return () => {
            window.removeEventListener("storageUpdated", updateCounts);
        };
    }, []);

    return (
        <nav className="navbar">
            {/* Logo */}
            <Link to="/" className="logo">
                PawHome 🐾
            </Link>

            {/* Links */}
            <div className="nav-center">
                <Link to="/">Home</Link>

                <Link to="/pets">Pets</Link>

                <Link to="/adoption-tips">Adoption Tips</Link>

                <Link to="/about">About</Link>

                <Link to="/contact">Contact</Link>
            </div>

            {/* Right Side */}
            <div className="nav-right">
                <Link to="/wishlist" className="icon-link">
                    ❤️
                    <span>{wishCount}</span>
                </Link>

                <Link to="/cart" className="icon-link">
                    🛒
                    <span>{cartCount}</span>
                </Link>

                <Link to="/login" className="login-btn">
                    Login / Register
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;