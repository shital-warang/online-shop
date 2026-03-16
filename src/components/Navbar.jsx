



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ setCategory }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null); // logged-in user state
  const navigate = useNavigate();

  const categories = [
    "All","Electronics","Fashion","Grocery","Clothes",
    "Jewellery","Watches","Stationery","Beauty"
  ];

  // 🔥 LIVE CART COUNT UPDATE
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(total);
    };

    updateCartCount(); // first load
    const interval = setInterval(updateCartCount, 500); // every 0.5 sec
    return () => clearInterval(interval);
  }, []);

  // 🔹 CHECK LOGGED-IN USER
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(storedUser);
  }, []);

  // 🔹 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <Link className="navbar-brand fw-bold" to="/">SmartCart</Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/home">Home</Link>
          </li>

          {/* Category Dropdown */}
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Category
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setCategory(cat);
                      setDropdownOpen(false);
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </li>

          {/* Cart with Count */}
          <li className="nav-item" style={{ position: "relative" }}>
            <Link className="nav-link" to="/cart">
              Cart
              {cartCount > 0 && (
                <span style={{
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  position: "absolute",
                  top: "0px",
                  right: "-10px"
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {/* Conditional Rendering based on login */}
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/my-orders">My Orders</Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}

          {/* Feedback Link */}
          <li className="nav-item">
            <Link className="nav-link" to="/ordersuccess">Feedback</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}