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

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCars from "./pages/admin/AdminCars";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminUserDetail from "./pages/admin/AdminUserDetail";

import AdminUserEdit from "./pages/admin/AdminUserEdit";
import AdminUserBookings from "./pages/admin/AdminUserBookings";


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
            <Route path="/search" element={<SearchPage />} />
            <Route path="/payment" element={<Payment />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="cars" element={<AdminCars />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="users" element={<AdminUsers />} />

              <Route path="users/:id" element={<AdminUserDetail />} />
              <Route path="users/:id/edit" element={<AdminUserEdit />} />
              <Route path="users/:id/bookings" element={<AdminUserBookings />} />
              
              <Route path="settings" element={<AdminSettings />} />
            </Route>

          </Routes>



        </div>
        <Footer />


      </div>
    </>
  );
}

export default App;
