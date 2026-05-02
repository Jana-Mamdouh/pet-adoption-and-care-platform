import React from "react";
import { Link } from "react-router-dom";
import "./PetCard.css";

function PetCard({ pet }) {
    const updateNavbarCounts = () => {
        window.dispatchEvent(new Event("storageUpdated"));
    };

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("petCart")) || [];
        const exists = cart.find((item) => item._id === pet._id);

        if (exists) {
            alert("This pet is already in cart");
            return;
        }

        localStorage.setItem("petCart", JSON.stringify([...cart, pet]));
        updateNavbarCounts();
        alert("Added to cart");
    };

    const addToWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem("petWishlist")) || [];
        const exists = wishlist.find((item) => item._id === pet._id);

        if (exists) {
            alert("This pet is already in wishlist");
            return;
        }

        localStorage.setItem("petWishlist", JSON.stringify([...wishlist, pet]));
        updateNavbarCounts();
        alert("Added to wishlist");
    };

    const getDeliveryFee = (location) => {
        if (!location) return 100;

        const city = location.toLowerCase();

        if (city.includes("cairo") || city.includes("القاهرة")) return 50;
        if (city.includes("giza") || city.includes("الجيزة")) return 60;
        if (
            city.includes("alex") ||
            city.includes("alexandria") ||
            city.includes("اسكندرية")
        )
            return 90;
        if (city.includes("mansoura") || city.includes("المنصورة")) return 80;
        if (city.includes("tanta") || city.includes("طنطا")) return 75;

        return 100;
    };

    const deliveryFee = getDeliveryFee(pet.location);
    const totalPrice = Number(pet.donationFee || 0) + deliveryFee;

    return (
        <div className="pet-card">
            <div className="pet-image-box">
                <img src={pet.image} alt={pet.name} className="pet-image" />

                <button onClick={addToWishlist} className="heart-btn">
                    ♥
                </button>

                <div className="pet-tags">
                    <span className="tag pink">{pet.type}</span>
                    <span className="tag purple">{pet.gender}</span>
                </div>
            </div>

            <div className="pet-info">
                <h3>{pet.name}</h3>
                <p className="breed">{pet.breed}</p>

                <p className="details">📅 {pet.age} years old</p>
                <p className="details">📍 {pet.location}</p>
                <p className="details">
                    💉 {pet.vaccinated ? "Vaccinated" : "Not vaccinated"}
                </p>

                <div className="price-box">
                    <p>Donation: {pet.donationFee || 0} EGP</p>
                    <p>Delivery: {deliveryFee} EGP</p>
                    <strong>Total: {totalPrice} EGP</strong>
                </div>

                <p className="donation-note">
                    These fees are symbolic and help support pet care donations.
                </p>

                <div className="card-actions">
                    <Link to={`/pets/${pet._id}`} className="details-btn">
                        Details
                    </Link>

                    <button onClick={addToCart} className="adopt-btn">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PetCard;