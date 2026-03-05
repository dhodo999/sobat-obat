import { motion } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/content/Hero";
import HowItWorks from "../components/content/HowItWorks";
import Feature from "../components/content/Features";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Feature />
      </main>
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
