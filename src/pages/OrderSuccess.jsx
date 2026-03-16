import React, { useState } from "react";
import axios from "axios";

function OrderSuccess() {

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    const data = {
      rating,
      comment
    };

    await axios.post("http://localhost:8080/api/feedback", data);
    setMsg("Thank you for your feedback ❤️");
  };

  return (
    <div className="container mt-5">
      <h1>🎉 Order Placed Successfully</h1>
      <p>Your order has been confirmed.</p>

      <h3>Give Feedback</h3>

      <form onSubmit={submitFeedback}>
        <label>Rating:</label>
        <select 
          className="form-control mb-2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
          <option value="4">⭐⭐⭐⭐ Good</option>
          <option value="3">⭐⭐⭐ Average</option>
          <option value="2">⭐⭐ Poor</option>
          <option value="1">⭐ Very Bad</option>
        </select>

        <textarea
          className="form-control mb-2"
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="btn btn-success">Submit Feedback</button>
      </form>

      {msg && <p className="text-success mt-2">{msg}</p>}
    </div>
  );
}

export default OrderSuccess;
