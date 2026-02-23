// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";


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

import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import ReservationDetail from "./pages/ReservationDetail";

/* ================= ADMIN ================= */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCars from "./pages/admin/AdminCars";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminUserDetail from "./pages/admin/AdminUserDetail";
import AdminUserEdit from "./pages/admin/AdminUserEdit";
import AdminUserBookings from "./pages/admin/AdminUserBookings";
import AdminToday from "./components/admin/AdminToday";
import AdminCheckin from "./pages/admin/AdminCheckin";
import AdminCheckout from "./pages/admin/AdminCheckout";
import AdminOperations from "./pages/admin/AdminOperations";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Waiting from "./pages/Waiting";
import Adminbar from "./components/admin/adminbar";

function App() {
  const location = useLocation();

  // เช็คว่าอยู่หน้า admin ไหม
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>

      <Navbar />
      <SubNav />
     {isAdmin && <Adminbar />}

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

            {/* ================= PUBLIC ROUTES ================= */}
            <Route path="/" element={<Home />} />
            <Route path="/carslist" element={<CarList />} />
            <Route path="/carsdetail/:id" element={<CarDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="/payment" element={<Payment />} />
            <Route path="/payment/:id" element={<Payment />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/reservations/:id" element={<ReservationDetail />} />
            <Route path="/waiting/:id" element={<Waiting />} />


            {/* ================= ADMIN ROUTES ================= */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="cars" element={<AdminCars />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:id" element={<AdminUserDetail />} />
              <Route path="users/:id/edit" element={<AdminUserEdit />} />
              <Route path="users/:id/bookings" element={<AdminUserBookings />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="today" element={<AdminToday />} />
              <Route path="checkin" element={<AdminCheckin />} />
              <Route path="checkout" element={<AdminCheckout />} />
              <Route path="operations" element={<AdminOperations />} />
            </Route>

          </Routes>
        </div>

        {/* ซ่อน Footer ถ้าอยู่หน้า Admin */}
        {!isAdmin && <Footer />}
      </div>
    </>
  );
}

export default App;
