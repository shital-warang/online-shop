import React from "react";

function Footer() {
  return (
    <footer style={{
      width: "100%",
      backgroundColor: "#2874f0", // Flipkart style blue
      color: "#fff",
      textAlign: "center",
      padding: "10px 0",
      position: "fixed",
      bottom: 0,
      left: 0,
      fontSize: "0.85rem",
      boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
      zIndex: 1000
    }}>
      &copy; {new Date().getFullYear()} SmartCart. All rights reserved.
    </footer>
  );
}

export default Footer;
