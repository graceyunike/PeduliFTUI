import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./Pages/RegistrationPage";
import LoginPage from "./Pages/LoginPage";

export default function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
        </Router>
    );
}
