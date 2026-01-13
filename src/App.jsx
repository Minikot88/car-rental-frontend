// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SubNav from "./components/SubNav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CarList from "./pages/CarList";
import CarDetail from "./pages/CarDetail";
import Booking from "./pages/Booking";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarSearch from "./pages/CarSearch";

function App() {
  return (
    <>
      <Navbar />
      <SubNav />

      <div
        className="content"
        style={{
          marginTop: "120px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
 
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<CarSearch />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
