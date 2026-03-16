


import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");
  const [editedRating, setEditedRating] = useState(5);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/feedback"
      );
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const deleteFeedback = async (id) => {
    await axios.delete(
      `http://localhost:8080/api/admin/feedback/${id}`
    );
    setFeedbacks(feedbacks.filter((f) => f.id !== id));
  };

  const startEdit = (feedback) => {
    setEditingId(feedback.id);
    setEditedMessage(feedback.message);
    setEditedRating(feedback.rating);
  };

  const updateFeedback = async (id) => {
    await axios.put(
      `http://localhost:8080/api/admin/feedback/${id}`,
      {
        message: editedMessage,
        rating: editedRating,
      }
    );

    setEditingId(null);
    fetchFeedbacks();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Manage Feedback
      </h2>

      {feedbacks.map((f) => (
        <div
          key={f.id}
          style={{
            background: "#f5f5f5",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* 🔥 USER NAME FIXED */}
          <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>
            {
              f.user?.username ||
              f.user?.name ||
              f.user?.email ||
              "No User Found"
            }
          </h4>

          {editingId === f.id ? (
            <>
              <input
                type="number"
                min="1"
                max="5"
                value={editedRating}
                onChange={(e) => setEditedRating(e.target.value)}
              />

              <br /><br />

              <textarea
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
              />

              <br /><br />

              <button onClick={() => updateFeedback(f.id)}>
                Save
              </button>
            </>
          ) : (
            <>
              <p style={{ margin: "0 0 10px 0" }}>
                ⭐ {f.rating}
              </p>

              <p style={{ marginBottom: "15px" }}>
                {f.message}
              </p>

              <button
                onClick={() => startEdit(f)}
                style={{
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteFeedback(f.id)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminFeedback;