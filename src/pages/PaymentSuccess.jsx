

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./PaymentSuccess.css";
import "./FeedbackPage.css";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state =
    location.state || JSON.parse(localStorage.getItem("lastOrder")) || {};

  const { address, paymentMethod, total } = state;

  const [showFeedback, setShowFeedback] = useState(false);
  const [msg, setMsg] = useState("");
  const [rating, setRating] = useState(5);

  const submitFeedback = async () => {
    try {
      const orderId = 1;

      await axios.post("http://localhost:8080/api/feedback", {
        orderId,
        userId: 1,
        message: msg,
        rating,
      });

      alert("Thanks for your feedback!");

      setMsg("");
      setRating(5);

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback!");
    }
  };

  return (
    <div className="payment-success-container">
      <h1>🎉 Payment Status</h1>

      {address && paymentMethod && total ? (
        <>
          <h2>Your Order is Confirmed ✅</h2>

          <p>Delivery Address: {address}</p>
          <p>Payment Method: {paymentMethod}</p>
          <p>Total Paid: ₹{total}</p>

          {!showFeedback ? (
            <button
              className="continue-btn"
              onClick={() => setShowFeedback(true)}
            >
              Give Feedback
            </button>
          ) : (
            <div className="feedback-card mt-4">
              <h2 className="text-center mb-4 text-purple">Give Feedback</h2>

              <div className="mb-3">
                <label className="form-label">Rating (1-5):</label>

                <input
                  type="number"
                  min="1"
                  max="5"
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Feedback:</label>

                <textarea
                  className="form-control"
                  placeholder="Write your feedback..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  rows={4}
                />
              </div>

              <button
                className="btn btn-purple w-100"
                onClick={submitFeedback}
              >
                Submit Feedback & Continue Shopping
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <h2>No order details found</h2>

          <button
            className="continue-btn"
            onClick={() => navigate("/home")}
          >
            Go to Home
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;