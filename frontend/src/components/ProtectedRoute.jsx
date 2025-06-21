import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If not logged in or role mismatch
  if (!token || !user || user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children; // Render protected component
}
