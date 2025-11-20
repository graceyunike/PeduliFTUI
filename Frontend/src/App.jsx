import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";   // ← Tambahkan ini
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import EventCampaignPage from "./Pages/EventCampaignPage";
import EventDetailPage from "./Pages/EventDetailPage";
import DashboardPage from "./Pages/DashboardPage";
import PaymentPage from "./Pages/PaymentPage";
import PostDetailPage from "./Pages/PostDetailPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Event */}
        <Route path="/event-campaign" element={<EventCampaignPage />} />
        <Route path="/event-detail/:id" element={<EventDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/donate" element={<PaymentPage />} />
        <Route path="/post-detail/:postId" element={<PostDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
