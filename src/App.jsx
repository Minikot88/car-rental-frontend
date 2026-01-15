// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SubNav from "./components/SubNav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CarList from "./pages/CarList";
import CarDetail from "./pages/CarDetail";
import Booking from "./pages/Booking";
import SearchPage from "./pages/SearchPage"; 

import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";

function App() {
  return (
    <>
      <Navbar />
      <SubNav />

      <div
        className="content"
        style={{
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carslist" element={<CarList />} />
            <Route path="/carsdetail/:id" element={<CarDetail />} />
            <Route path="/booking/:id" element={<Booking />} />

            <Route path="/search" element={<SearchPage />} /> {/* ✅ แก้ตรงนี้ */}

            <Route path="/payment" element={<Payment />} />
         
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
