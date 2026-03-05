import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import KotakObat from "./pages/KotakObat";
import Edukasi from "./pages/Edukasi";
import Riwayat from "./pages/Riwayat";
import AboutUs from "./components/content/AboutUs";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/kotak-obat" element={<KotakObat />} />
                <Route path="/edukasi" element={<Edukasi />} />
                <Route path="/riwayat" element={<Riwayat />} />
                <Route path="/tentang-kami" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
