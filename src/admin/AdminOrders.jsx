

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8080/api/admin/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  };

  const deleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`http://localhost:8080/api/admin/orders/${id}`)
        .then(() => {
          fetchOrders();
        })
        .catch((err) => {
          console.error("Error deleting order:", err);
        });
    }
  };

  const updateStatus = (id, newStatus) => {
    axios
      .put(
        `http://localhost:8080/api/admin/orders/${id}/status?status=${newStatus}`
      )
      .then(() => {
        fetchOrders();
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 Manage Orders</h2>

      {orders.length === 0 ? (
        <p style={styles.message}>No orders found</p>
      ) : (
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Total Amount</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff"
                  }}
                >
                  <td style={styles.td}>{order.id}</td>

                  {/* ✅ Display exact user name from backend */}
                  {/* <td style={styles.td}>{order.userName}</td> */}
                  <td style={styles.td}>
  {order.userName}  {/* 👈 yahan direct userName use karo */}
</td>
                  <td style={{ ...styles.td, fontWeight: "bold", color: "#2e7d32" }}>
                    ₹ {order.totalAmount}
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor:
                          order.status === "Shipped"
                            ? "#4caf50"
                            : "#ff9800"
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => updateStatus(order.id, "Shipped")}
                      style={styles.shipBtn}
                    >
                      Mark Shipped
                    </button>

                    <button
                      onClick={() => deleteOrder(order.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginLeft: "260px",
    padding: "30px",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh"
  },
  heading: {
    marginBottom: "20px",
    color: "#333"
  },
  message: {
    fontSize: "16px",
    color: "#777"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  headerRow: {
    backgroundColor: "#1976d2",
    color: "#fff"
  },
  th: {
    padding: "14px",
    textAlign: "left"
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #eee"
  },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "500"
  },
  shipBtn: {
    padding: "6px 12px",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px"
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default AdminOrders;