import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing/LandingPage";
import AssessmentPage from "../pages/assessment/AssessmentPage";
import SupportPage from "../pages/support/SupportPage";
import CounsellorDashboard from "../pages/counsellor/CounsellorDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/assessment" element={<AssessmentPage />} />

      <Route path="/support" element={<SupportPage />} />

      <Route path="/counsellor" element={<CounsellorDashboard />} />

      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;
