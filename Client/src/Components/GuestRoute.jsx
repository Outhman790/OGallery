import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? (
    <Navigate to={user.role === "admin" ? "/adminDashboard" : "/myprofile"} />
  ) : (
    children
  );
};

export default GuestRoute;
