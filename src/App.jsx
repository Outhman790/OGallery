import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./Components/Gallery";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/signUp";
import MyProfile from "./pages/Myprofile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
