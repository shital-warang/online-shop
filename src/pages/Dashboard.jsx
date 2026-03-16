


import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/dashboard")
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>Total Users: {data.totalUsers}</div>
      <div>Total Products: {data.totalProducts}</div>
      <div>Total Orders: {data.totalOrders}</div>
      <div>Total Revenue: ₹{data.totalRevenue}</div>
    </div>
  );
}