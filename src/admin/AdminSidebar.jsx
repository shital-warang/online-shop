import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  const linkStyle = { display: "block", padding: "12px 20px", textDecoration: "none", color: "#fff", fontWeight: 500 };
  const activeStyle = { backgroundColor: "#1abc9c" };

  return (
    <div style={{ width: "250px", height: "100vh", backgroundColor: "#2c3e50", color: "#fff", position: "fixed", left: 0, top: 0 }}>
      <h2 style={{ textAlign: "center", padding: "20px 0" }}>Admin Panel</h2>

      <NavLink to="/admin-dashboard" style={({ isActive }) => isActive ? {...linkStyle,...activeStyle}:linkStyle} end>Dashboard</NavLink>
      <NavLink to="/admin/products" style={({ isActive }) => isActive ? {...linkStyle,...activeStyle}:linkStyle}>Manage Products</NavLink>
      <NavLink to="/admin/users" style={({ isActive }) => isActive ? {...linkStyle,...activeStyle}:linkStyle}>Manage Users</NavLink>
      <NavLink to="/admin/orders" style={({ isActive }) => isActive ? {...linkStyle,...activeStyle}:linkStyle}>Manage Orders</NavLink>
      <NavLink to="/admin/feedback" style={({ isActive }) => isActive ? {...linkStyle,...activeStyle}:linkStyle}>Manage Feedback</NavLink>
     {/* <NavLink to="/admin/payment" style={({ isActive }) => isActive ? {...linkStyle,...activeStyle}:linkStyle}>Manage Payment</NavLink> */}
     <NavLink 
  to="/admin/payments" 
  style={({ isActive }) => isActive ? {...linkStyle,...activeStyle}:linkStyle}
>
  Manage Payment
</NavLink>

      <button onClick={handleLogout} style={{ marginTop:"30px", marginLeft:"20px", padding:"10px 15px", backgroundColor:"#e74c3c", border:"none", color:"#fff", cursor:"pointer" }}>Logout</button>
    </div>
  );
};

export default AdminSidebar;