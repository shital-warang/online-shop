import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("userLoggedIn");

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
