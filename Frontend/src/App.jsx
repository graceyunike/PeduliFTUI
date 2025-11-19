import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/event-campaign" element={<EventCampaignPage />} />
        <Route path="/event-detail/:id" element={<EventDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/donate" element={<PaymentPage />} />
        <Route path="/post-detail/:postId" element={<PostDetailPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
