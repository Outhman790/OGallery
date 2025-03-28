import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./Components/Gallery";
import Login from "./pages/Login";
import Signup from "./pages/signUp";
import MyProfile from "./pages/Myprofile";
import MyAccount from "./pages/MyAccount";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./Components/protectedRoute";
import GuestRoute from "./Components/GuestRoute";
import { BounceLoader } from "react-spinners";
import { useAuth } from "./Context/AuthContext";
const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <BounceLoader color="#4f46e5" size={50} />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute>
            <Signup />
          </GuestRoute>
        }
      />
      <Route
        path="/myprofile"
        element={
          <ProtectedRoute allowedRoles="user">
            <MyProfile />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/myaccount"
        element={
          <ProtectedRoute allowedRoles="user">
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adminDashboard"
        element={
          <ProtectedRoute allowedRoles="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
