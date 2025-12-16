// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import CarList from "./pages/CarList";
import CarDetail from "./pages/CarDetail";
import BookingForm from "./pages/BookingForm";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarSearch from "./pages/CarSearch";

function App() {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => setOpen(!open);

  return (
    <BrowserRouter>
      <Navbar />

      {/* Sidebar controlled by App */}
      <Sidebar open={open} toggle={toggleSidebar} />

      {/* Content area */}
      <div
        className="content"
        onClick={() => open && setOpen(false)}   // 👈 คลิกแล้วปิด Sidebar
        style={{
          marginLeft: open ? "200px" : "60px",
          marginTop: "60px",
          padding: "20px",
          transition: "0.3s",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<CarSearch />} />
          
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
