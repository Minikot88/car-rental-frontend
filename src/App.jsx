// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import SubNav from "./components/SubNav";
import Footer from "./components/Footer";
import Adminbar from "./components/admin/adminbar";

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
import Waiting from "./pages/Waiting";
import Terms from "./pages/Terms";
import TermsPDF from "./pages/TermsPDF";
import NotFound from "./pages/NotFound";

/* ADMIN */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCars from "./pages/admin/AdminCars";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminToday from "./components/admin/AdminToday";
import AdminCheckin from "./pages/admin/AdminCheckin";
import AdminCheckout from "./pages/admin/AdminCheckout";
import AdminOperations from "./pages/admin/AdminOperations";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && (
        <>
          <Navbar />
          <SubNav />
        </>
      )}

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

            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/carslist" element={<CarList />} />
            <Route path="/carsdetail/:id" element={<CarDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/terms-pdf" element={<TermsPDF />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/waiting/:id" element={<Waiting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/reservations/:id" element={<ReservationDetail />} />
            <Route path="*" element={<NotFound />} />

            {/* ADMIN */}
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
              <Route path="today" element={<AdminToday />} />
              <Route path="checkin" element={<AdminCheckin />} />
              <Route path="checkout" element={<AdminCheckout />} />
              <Route path="operations" element={<AdminOperations />} />
            </Route>

          </Routes>
        </div>

        {!isAdmin && <Footer />}
      </div>
    </>
  );
}

export default App;