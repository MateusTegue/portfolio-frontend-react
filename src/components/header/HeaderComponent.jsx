import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BsCodeSquare } from "react-icons/bs";

const HeaderComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    const navLinks = [
        { path: "/Home", label: "Inicio" },
        { path: "/Projects", label: "Proyectos" },
        { path: "/Experience", label: "Experiencia" },
        { path: "/Blog", label: "Blog" },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? "bg-black/80 backdrop-blur-xl shadow-lg shadow-cyan-500/10" 
                    : "bg-black/40 backdrop-blur-md"
            }`}
        >
            <nav className="px-4 lg:px-8 py-4">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
                    <Link 
                        to="/Home" 
                        className="flex items-center group"
                        onClick={handleCloseMenu}
                    >   <BsCodeSquare className="text-cyan-400 text-3xl mr-2" />
                        <motion.span 
                            className="text-3xl font-bold font-poppins text-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            M <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">Tegue</span>
                        </motion.span>
                    </Link>
                    
                    <div className="flex items-center lg:order-2 gap-3">
                        <Link 
                            to="/Login" 
                            className="hidden sm:block relative px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium rounded-full hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
                        >
                            Login
                        </Link>
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            type="button" 
                            className="inline-flex items-center p-2.5 text-sm text-white rounded-lg lg:hidden bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 focus:outline-none transition-all duration-300"
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.svg
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </motion.svg>
                                ) : (
                                    <motion.svg
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2z"
                                            clipRule="evenodd"
                                        />
                                    </motion.svg>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                    
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="w-full lg:hidden overflow-hidden"
                            >
                                <div className="bg-black/95 backdrop-blur-xl rounded-2xl mt-4 p-6 border border-cyan-500/20">
                                    <ul className="flex flex-col space-y-4">
                                        {navLinks.map((link, index) => (
                                            <motion.li
                                                key={link.path}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link
                                                    to={link.path}
                                                    onClick={handleCloseMenu}
                                                    className={`block px-4 py-3 rounded-lg font-semibold font-poppins transition-all duration-300 ${
                                                        location.pathname === link.path
                                                            ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                                                            : "text-white hover:bg-cyan-500/20 hover:text-cyan-400"
                                                    }`}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.li>
                                        ))}
                                        <motion.li
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: navLinks.length * 0.1 }}
                                        >
                                            <Link
                                                to="/Login"
                                                onClick={handleCloseMenu}
                                                className="block px-4 py-3 rounded-lg font-semibold font-poppins bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-center hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300"
                                            >
                                                Login
                                            </Link>
                                        </motion.li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <div className="hidden lg:flex lg:w-auto lg:order-1">
                        <ul className="flex items-center space-x-1 font-semibold font-poppins">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                                            location.pathname === link.path
                                                ? "text-cyan-400"
                                                : "text-white hover:text-cyan-400"
                                        }`}
                                    >
                                        {link.label}
                                        {location.pathname === link.path && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600"
                                                layoutId="underline"
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
