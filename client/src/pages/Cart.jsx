import React, { useEffect, useState } from "react";
import "./Cart.css";

const getDeliveryFee = (location) => {
    if (!location) return 100;

    const city = location.toLowerCase();

    if (city.includes("cairo") || city.includes("القاهرة")) return 50;
    if (city.includes("giza") || city.includes("الجيزة")) return 60;
    if (city.includes("alex") || city.includes("alexandria") || city.includes("اسكندرية")) return 90;
    if (city.includes("mansoura") || city.includes("المنصورة")) return 80;
    if (city.includes("tanta") || city.includes("طنطا")) return 75;

    return 100;
};

function Cart() {
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const isLoggedIn = localStorage.getItem("token") || localStorage.getItem("user");

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("petCart")) || []);
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cart.filter((pet) => pet._id !== id);
        setCart(updatedCart);
        localStorage.setItem("petCart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storageUpdated"));
    };

    const total = cart.reduce((sum, pet) => {
        return sum + Number(pet.donationFee || 0) + getDeliveryFee(pet.location);
    }, 0);

    const confirmOrder = () => {
        if (!isLoggedIn) {
            alert("You must login first to confirm adoption order");
            return;
        }

        if (!paymentMethod) {
            alert("Please choose payment method");
            return;
        }

        alert("Order confirmed successfully");
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cart.map((pet) => {
                        const delivery = getDeliveryFee(pet.location);
                        const itemTotal = Number(pet.donationFee || 0) + delivery;

                        return (
                            <div className="cart-item" key={pet._id}>
                                <img src={pet.image} alt={pet.name} />

                                <div>
                                    <h3>{pet.name}</h3>
                                    <p>Donation Fee: {pet.donationFee} EGP</p>
                                    <p>Delivery Fee: {delivery} EGP</p>
                                    <strong>Total: {itemTotal} EGP</strong>
                                    <p className="note">
                                        These symbolic fees support donations, food, vaccination,
                                        and rescue care.
                                    </p>
                                </div>

                                <button onClick={() => removeFromCart(pet._id)}>Remove</button>
                            </div>
                        );
                    })}

                    <div className="checkout-box">
                        <h2>Checkout</h2>

                        <label>Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="">Choose payment method</option>
                            <option value="cash">Cash on Delivery</option>
                            <option value="card">Card</option>
                            <option value="wallet">Mobile Wallet</option>
                        </select>

                        <h3>Total Payment: {total} EGP</h3>

                        {!isLoggedIn && (
                            <p className="login-warning">
                                You must login first before confirming the order.
                            </p>
                        )}

                        <button onClick={confirmOrder}>Confirm Order</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;