

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import AdminFeedback from "./AdminFeedback";
import SubmitPayment from "./SubmitPayment";
import axios from "axios";

const AdminDashboard = () => {

  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalPayments: 0,
    totalFeedback: 0
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/metrics");
        console.log("Metrics Response:", res.data);
        setMetrics(res.data);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ flex: 1, padding: "20px", marginLeft: "250px" }}>

        <Routes>

          {/* Dashboard */}
          <Route
            path="/"
            element={
              <>
                <h1>Admin Dashboard</h1>

                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

                  <div className="card blue">
                    <h3>Total Users</h3>
                    <h2>{metrics.totalUsers}</h2>
                  </div>

                  <div className="card green">
                    <h3>Total Products</h3>
                    <h2>{metrics.totalProducts}</h2>
                  </div>

                  <div className="card orange">
                    <h3>Total Orders</h3>
                    <h2>{metrics.totalOrders}</h2>
                  </div>

                  <div className="card purple">
                    <h3>Total Payments</h3>
                    <h2>₹{metrics.totalPayments}</h2>
                  </div>

                  <div className="card pink">
                    <h3>Total Feedback</h3>
                    <h2>{metrics.totalFeedback}</h2>
                  </div>

                </div>
              </>
            }
          />

          {/* Other Admin Pages */}
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="payments" element={<SubmitPayment />} />

        </Routes>

      </div>
    </div>
  );
};

export default AdminDashboard;