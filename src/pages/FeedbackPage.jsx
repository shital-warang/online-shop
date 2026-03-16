



import { useState } from "react";
import axios from "axios";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5); // ⭐ default rating

  const submitFeedback = async () => {
    if (!name || !message || !rating) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/feedback",
        {
          name: name,
          message: message,
          rating: rating   // 🔥 IMPORTANT
        }
      );

      console.log("SUCCESS:", response.data);
      alert("Feedback submitted successfully!");

      setName("");
      setMessage("");
      setRating(5);

    } catch (error) {
      console.log("ERROR STATUS:", error.response?.status);
      console.log("ERROR DATA:", error.response?.data);
      alert("Error submitting feedback!");
    }
  };

  return (
    <div>
      <h3>Submit Feedback</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button onClick={submitFeedback}>
        Submit Feedback
      </button>
    </div>
  );
}