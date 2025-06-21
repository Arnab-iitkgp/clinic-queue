import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Receptionist from "./pages/Receptionist";
import Patient from "./pages/Patient";
import Display from "./pages/Display";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Layout from "./components/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Admin dashboard protected */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ You can protect these later similarly */}
        <Route path="/receptionist" element={<Receptionist />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/display" element={<Display />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
