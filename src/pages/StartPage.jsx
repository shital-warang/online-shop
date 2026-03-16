


import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function StartPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "'Roboto', sans-serif",
      color: "#fff",
      textAlign: "center",
      padding: "40px",
      gap: "50px",
      background: "linear-gradient(270deg, #667eea, #764ba2, #ff6a00, #f83600)",
      backgroundSize: "800% 800%",
      animation: "gradientAnimation 20s ease infinite",
      overflow: "hidden",
    }}>
      
      <h1 style={{
        fontSize: "4rem",
        fontWeight: "900",
        margin: 0,
        textShadow: "4px 4px 15px rgba(0,0,0,0.3)",
      }}>
        Welcome to SmartCart
      </h1>
      
      <p style={{
        fontSize: "1.4rem",
        margin: 0,
        opacity: 0.85,
        maxWidth: "500px",
        lineHeight: "1.6",
      }}>
        Login to continue or register a new account
      </p>

      <div style={{
        display: "flex",
        gap: "25px",
        flexWrap: "wrap",
      }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "16px 40px",
            borderRadius: "14px",
            border: "none",
            backgroundColor: "rgba(255,255,255,0.9)",
            color: "#667eea",
            fontWeight: "700",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.transform = "translateY(-3px) scale(1.08)";
            e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.5)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.9)";
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "16px 40px",
            borderRadius: "14px",
            border: "2px solid #fff",
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "#fff",
            fontWeight: "700",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.95)";
            e.currentTarget.style.color = "#667eea";
            e.currentTarget.style.transform = "translateY(-3px) scale(1.08)";
            e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.5)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
          }}
        >
          Register
        </button>
      </div>

      <Footer />

      <style>
        {`
          @keyframes gradientAnimation {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
    </div>
  );
}

export default StartPage;