


import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import AdminFeedback from "./AdminFeedback";
import AdminPayments from "./AdminPayments";
import axios from "axios";

const AdminDashboard = () => {

  const [metrics, setMetrics] = useState({
    totalUsers:0,
    totalProducts:0,
    totalOrders:0,
    totalPayments:0,
    totalFeedback:0
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/metrics");
      setMetrics(res.data);
    } catch (err) {
      console.log("Metrics fetch error:", err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ marginLeft:"250px", padding:"20px", width:"100%" }}>
        <Routes>

          {/* Dashboard */}
          <Route path="/" element={
            <>
              <h1>Admin Dashboard</h1>

              <div style={{
                display:"grid",
                gridTemplateColumns:"repeat(3,1fr)",
                gap:"20px",
                marginTop:"20px"
              }}>

                <div style={{padding:"20px", background:"#1abc9c", color:"#fff", borderRadius:"8px"}}>
                  Total Users
                  <h2>{metrics.totalUsers}</h2>
                </div>

                <div style={{padding:"20px", background:"#3498db", color:"#fff", borderRadius:"8px"}}>
                  Total Products
                  <h2>{metrics.totalProducts}</h2>
                </div>

                <div style={{padding:"20px", background:"#9b59b6", color:"#fff", borderRadius:"8px"}}>
                  Total Orders
                  <h2>{metrics.totalOrders}</h2>
                </div>

                <div style={{padding:"20px", background:"#e67e22", color:"#fff", borderRadius:"8px"}}>
                  Total Payments
                  <h2>{metrics.totalPayments}</h2>
                </div>

                <div style={{padding:"20px", background:"#e74c3c", color:"#fff", borderRadius:"8px"}}>
                  Total Feedback
                  <h2>{metrics.totalFeedback}</h2>
                </div>

              </div>
            </>
          }/>

          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="payments" element={<AdminPayments />} />

        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard;