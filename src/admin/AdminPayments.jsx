
import React, { useEffect, useState } from "react";
import axios from "axios";

const SubmitPayment = () => {

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  // GET ALL PAYMENTS
  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/payments");
      console.log("Payments Data:", res.data);
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  // DELETE PAYMENT
  const deletePayment = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/payments/${id}`);
      alert("Payment deleted successfully");

      // remove deleted row instantly
      setPayments(payments.filter((p) => p.id !== id));

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>💳 Manage Payments</h2>

      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.orderId}</td>
                <td>₹ {p.amount}</td>
                <td>{p.method}</td>
                <td>{p.status}</td>
                <td>
                  {p.paymentDate
                    ? new Date(p.paymentDate).toLocaleString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    onClick={() => deletePayment(p.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
};

export default SubmitPayment;