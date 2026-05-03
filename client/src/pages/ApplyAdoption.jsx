import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ApplyAdoption() {
    const { petId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        message: "",
        hasExperience: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const submitApplication = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        const response = await fetch("http://localhost:4000/api/applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, pet: petId, userName: user.name }),
        });

        const data = await response.json();

        if (data.success) {
            navigate("/my-applications");
        }
    };

    return (
        <div style={{ minHeight: "100vh", padding: "50px", background: "#fff7f4" }}>
            <h1>Apply for Adoption</h1>

            <form onSubmit={submitApplication}>
                <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
                <input name="phone" placeholder="Phone" onChange={handleChange} required />
                <input name="address" placeholder="Address" onChange={handleChange} required />
                <textarea name="message" placeholder="Why do you want to adopt?" onChange={handleChange} required />

                <label>
                    <input type="checkbox" name="hasExperience" onChange={handleChange} />
                    I have experience with pets
                </label>

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
}

export default ApplyAdoption;