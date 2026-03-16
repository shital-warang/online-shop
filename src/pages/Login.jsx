
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      // Admin login condition
      if (email === "admin@example.com" && password === "Admin@123") {
        localStorage.setItem("userRole", "ADMIN");
        localStorage.setItem("userName", "Admin");
        navigate("/admin-dashboard");
        return;
      }

      if (res.data.status === "success") {
        localStorage.setItem("userRole", res.data.role);
        localStorage.setItem("userName", res.data.name);

        if (res.data.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      } else {
        setMsg("Login Failed ❌");
      }
    } catch (err) {
      console.log(err);
      setMsg("Server Error ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p style={{ color: "red" }}>{msg}</p>
      </div>
    </div>
  );
};

export default Login;