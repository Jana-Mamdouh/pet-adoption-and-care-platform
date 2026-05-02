import React, { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import "./Wishlist.css";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        setWishlist(JSON.parse(localStorage.getItem("petWishlist")) || []);
    }, []);

    return (
        <div className="wishlist-page">
            <h1>Your Wishlist</h1>

            {wishlist.length === 0 ? (
                <p>No pets in wishlist</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((pet) => (
                        <PetCard key={pet._id} pet={pet} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;