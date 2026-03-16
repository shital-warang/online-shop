

import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

// Admin sub-pages
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import AdminPayments from "./AdminPayments";
import AdminFeedback from "./AdminFeedback";
import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/dashboard")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  // Admin route guard (optional, if you store login in localStorage)
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  if (!isAdminLoggedIn) return <Navigate to="/adminlogin" replace />;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Admin Dashboard</h1>

        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div>Total Users: {data.totalUsers}</div>
          <div>Total Products: {data.totalProducts}</div>
          <div>Total Orders: {data.totalOrders}</div>
          <div>Total Feedback: {data.totalFeedback}</div>
        </div>

        {/* Nested Admin Routes */}
        <Routes>
          <Route path="/" element={<div>Welcome to Admin Panel</div>} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="feedback" element={<AdminFeedback />} />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;