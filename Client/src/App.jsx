import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/signUp";
import MyProfile from "./pages/Myprofile";
import GlobalProvider from "./Context/GlobalState";
function App() {
  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<MyProfile />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
