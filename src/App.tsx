import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import KotakObat from "./pages/KotakObat";
import Edukasi from "./pages/Edukasi";
import Riwayat from "./pages/Riwayat";
import AboutUs from "./components/content/AboutUs";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/edukasi" element={<Edukasi />} />
        <Route path="/tentang-kami" element={<AboutUs />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/register" element={<Auth />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
