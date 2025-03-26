import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./Components/Gallery";
import Login from "./pages/Login";
import Signup from "./pages/signUp";
import MyProfile from "./pages/Myprofile";
import AdminDashboard from "./pages/AdminDashboard";
import GlobalProvider from "./Context/GlobalState";
import AuthProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/myprofile"
              element={
                <ProtectedRoute allowedRoles={"user"}>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminDashboard"
              element={
                <ProtectedRoute allowedRoles={"admin"}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
