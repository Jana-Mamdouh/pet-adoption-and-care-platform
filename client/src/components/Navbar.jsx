import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [wishCount, setWishCount] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const updateData = () => {
        setCartCount((JSON.parse(localStorage.getItem("petCart")) || []).length);
        setWishCount((JSON.parse(localStorage.getItem("petWishlist")) || []).length);
        setUser(JSON.parse(localStorage.getItem("user")));
    };

    useEffect(() => {
        updateData();
        window.addEventListener("storageUpdated", updateData);
        return () => window.removeEventListener("storageUpdated", updateData);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storageUpdated"));
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">PawHome 🐾</Link>

            <div className="nav-center">
                <Link to="/">Home</Link>
                <Link to="/pets">Pets</Link>
                <Link to="/adoption-tips">Adoption Tips</Link>
                <Link to="/my-applications">My Applications</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>

            <div className="nav-right">
                <Link to="/wishlist" className="icon-link">❤️<span>{wishCount}</span></Link>
                <Link to="/cart" className="icon-link">🛒<span>{cartCount}</span></Link>

                {user ? (
                    <div className="user-menu">
                        <button className="user-circle">{user.name.charAt(0).toUpperCase()}</button>
                        <button className="logout-btn" onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="login-btn">Login / Register</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;