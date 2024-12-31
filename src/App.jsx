import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/signUp";
import MyProfile from "./pages/Myprofile";
import TodoProvider from "./Context/TodoContext";
function App() {
  return (
    <TodoProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<MyProfile />} />
        </Routes>
      </Router>
    </TodoProvider>
  );
}

export default App;
