// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectPage";
import CertificationsPage from "./pages/CertificationsPages";
import AboutPage from "./pages/AboutPage";
import HeaderComponent from "./components/header/HeaderComponent";
import FooterComponent from "./components/footer/FooterComponent";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="flex-grow"
  > {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/Home" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/Login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/Projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
        <Route path="/Educacion" element={<PageWrapper><CertificationsPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        {/* ...más rutas */}
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <HeaderComponent />
        <AnimatedRoutes />
        <FooterComponent />
      </Router>
    </div>
  );
};

export default App;

