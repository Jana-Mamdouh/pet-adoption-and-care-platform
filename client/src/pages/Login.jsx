import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const fakeLogin = () => {
        localStorage.setItem("token", "fake-login-token");
        localStorage.setItem("user", JSON.stringify({ name: "Jana" }));
        alert("Logged in successfully");
        navigate("/cart");
    };

    return (
        <div style={{ padding: "50px", background: "#fff7f4", minHeight: "100vh" }}>
            <h1>Login</h1>
            <p>Temporary login until Member 1 finishes authentication.</p>
            <button onClick={fakeLogin}>Login Now</button>
        </div>
    );
}

export default Login;