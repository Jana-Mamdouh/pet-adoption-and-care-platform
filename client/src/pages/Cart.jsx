import React, { useEffect, useState } from "react";
import "./Cart.css";

const governorateFees = {
    Cairo: 50,
    Giza: 60,
    Alexandria: 90,
    Mansoura: 80,
    Tanta: 75,
    Aswan: 120,
    Luxor: 110,
    Ismailia: 85,
    Suez: 85,
};

function Cart() {
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [governorate, setGovernorate] = useState("");

    const [popup, setPopup] = useState({
        show: false,
        message: "",
        type: "",
    });

    const isLoggedIn =
        localStorage.getItem("token") || localStorage.getItem("user");

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("petCart")) || []);
    }, []);

    const showPopup = (message, type) => {
        setPopup({
            show: true,
            message,
            type,
        });

        setTimeout(() => {
            setPopup({
                show: false,
                message: "",
                type: "",
            });
        }, 2500);
    };

    const removeFromCart = (id) => {
        const updatedCart = cart.filter((pet) => pet._id !== id);

        setCart(updatedCart);

        localStorage.setItem("petCart", JSON.stringify(updatedCart));

        window.dispatchEvent(new Event("storageUpdated"));

        showPopup("Pet removed from cart", "success");
    };

    const deliveryFee = governorateFees[governorate] || 0;

    const donationTotal = cart.reduce((sum, pet) => {
        return sum + Number(pet.donationFee || 0);
    }, 0);

    const total = donationTotal + deliveryFee;

    const confirmOrder = () => {
        if (!isLoggedIn) {
            showPopup(
                "You must login first to confirm adoption order",
                "error"
            );
            return;
        }

        if (!governorate) {
            showPopup("Please choose your governorate", "error");
            return;
        }

        if (!paymentMethod) {
            showPopup("Please choose payment method", "error");
            return;
        }

        showPopup("Order confirmed successfully 🐾", "success");
    };

    return (
        <div className="cart-page">
            {popup.show && (
                <div className={`popup ${popup.type}`}>
                    {popup.message}
                </div>
            )}

            <h1>Your Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cart.map((pet) => (
                        <div className="cart-item" key={pet._id}>
                            <img src={pet.image} alt={pet.name} />

                            <div>
                                <h3>{pet.name}</h3>

                                <p>Breed: {pet.breed}</p>

                                <p>
                                    Donation Fee: {pet.donationFee || 0} EGP
                                </p>

                                <p className="note">
                                    These symbolic fees support donations,
                                    food, vaccination, and rescue care.
                                </p>
                            </div>

                            <button onClick={() => removeFromCart(pet._id)}>
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="checkout-box">
                        <h2>Checkout</h2>

                        <label>Choose Your Governorate</label>

                        <select
                            value={governorate}
                            onChange={(e) => setGovernorate(e.target.value)}
                        >
                            <option value="">
                                Select governorate
                            </option>

                            {Object.keys(governorateFees).map((gov) => (
                                <option key={gov} value={gov}>
                                    {gov}
                                </option>
                            ))}
                        </select>

                        {governorate && (
                            <p>
                                Delivery Fee: {deliveryFee} EGP
                            </p>
                        )}

                        <label>Payment Method</label>

                        <select
                            value={paymentMethod}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        >
                            <option value="">
                                Choose payment method
                            </option>

                            <option value="cash">
                                Cash on Delivery
                            </option>

                            <option value="card">
                                Card
                            </option>

                            <option value="wallet">
                                Mobile Wallet
                            </option>
                        </select>

                        <p>
                            Donation Total: {donationTotal} EGP
                        </p>

                        <p>
                            Delivery Fee: {deliveryFee} EGP
                        </p>

                        <h3>
                            Total Payment: {total} EGP
                        </h3>

                        {!isLoggedIn && (
                            <p className="login-warning">
                                You must login first before confirming
                                the order.
                            </p>
                        )}

                        <button onClick={confirmOrder}>
                            Confirm Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;