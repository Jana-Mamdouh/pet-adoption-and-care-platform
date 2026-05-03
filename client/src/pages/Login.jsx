import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const fakeLogin = () => {
        localStorage.setItem("token", "fake-token");
        localStorage.setItem("user", JSON.stringify({ name: "Jana", email: "jana@test.com" }));
        window.dispatchEvent(new Event("storageUpdated"));
        navigate("/pets");
    };

    return (
        <div style={{ minHeight: "100vh", padding: "60px", background: "#fff7f4" }}>
            <h1>Login</h1>
            <p>Temporary login until Member 1 finishes Register/Login.</p>
            <button onClick={fakeLogin}>Login as Jana</button>
        </div>
    );
}

export default Login;