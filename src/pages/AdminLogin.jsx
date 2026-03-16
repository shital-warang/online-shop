

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const login = async () => {
  try {
    const res = await axios.post("http://localhost:8080/api/admin/auth/login", {
      username: email,   // FIX
      password: password,
    });

    console.log("Response:", res.data);

    if (res.data === "SUCCESS") {
      localStorage.setItem("adminLoggedIn", "true");
      alert("Admin Login Success");
      navigate("/admindashboard");
    } else {
      alert("Invalid Admin Username or Password");
    }
  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};
  return (
    <div className="admin-login-container">
      <div className="login-box">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}