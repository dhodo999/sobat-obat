import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Feature from "../components/landing/Features";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <HowItWorks />
                <Feature />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
