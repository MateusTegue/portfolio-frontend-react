import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    BsLinkedin, 
    BsGithub, 
    BsInstagram, 
    BsTwitter,
    BsEnvelope,
    BsCodeSquare
} from "react-icons/bs";
import { FaHome, FaProjectDiagram, FaBriefcase, FaBlog } from "react-icons/fa";

const FooterComponent = () => {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { path: "/Home", label: "Inicio", icon: <FaHome /> },
        { path: "/Projects", label: "Proyectos", icon: <FaProjectDiagram /> },
        { path: "/Experience", label: "Experiencia", icon: <FaBriefcase /> },
        { path: "/Blog", label: "Blog", icon: <FaBlog /> },
    ];

    const socialLinks = [
        { 
            href: "https://www.linkedin.com/in/mateus-tegue/", 
            icon: <BsLinkedin />, 
            label: "LinkedIn",
            color: "hover:text-blue-500"
        },
        { 
            href: "https://github.com/MateusTegue", 
            icon: <BsGithub />, 
            label: "GitHub",
            color: "hover:text-gray-300"
        },
        { 
            href: "#", 
            icon: <BsInstagram />, 
            label: "Instagram",
            color: "hover:text-pink-500"
        },
        { 
            href: "#", 
            icon: <BsTwitter />, 
            label: "Twitter",
            color: "hover:text-blue-400"
        },
    ];

    return (
        <footer className="relative bg-gradient-to-b from-gray-900 via-black to-black border-t border-gray-800/50 mt-auto">
            {/* Efecto de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Información del Portfolio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <BsCodeSquare className="text-cyan-400 text-2xl" />
                            <h3 className="text-xl font-bold text-white font-poppins">
                                M <span className="text-cyan-400">Tegue</span>
                            </h3>
                        </div>
                        <p className="text-gray-400 text-sm font-poppins leading-relaxed mb-4">
                            Desarrollador Full Stack apasionado por crear soluciones innovadoras y experiencias digitales excepcionales.
                        </p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <BsEnvelope className="text-cyan-400" />
                            <span className="font-poppins">teusteguetorres2001@gmail.com</span>
                        </div>
                    </motion.div>

                    {/* Enlaces de Navegación */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-white font-semibold font-poppins mb-4 text-lg">Navegación</h4>
                        <ul className="space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.li
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-poppins text-sm group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {link.icon}
                                        </span>
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Redes Sociales */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-white font-semibold font-poppins mb-4 text-lg">Redes Sociales</h4>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target={social.href !== "#" ? "_blank" : undefined}
                                    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-10 h-10 flex items-center justify-center bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-400 ${social.color} transition-all duration-200 hover:border-cyan-500/50 hover:bg-gray-800`}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Línea divisoria y Copyright */}
                <div className="border-t border-gray-800/50 pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm font-poppins text-center sm:text-left">
                            © {currentYear} <span className="text-cyan-400 font-semibold">Mateus Tegue</span>. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400 font-poppins">
                            <span>Hecho con</span>
                            <span className="text-red-500 animate-pulse">❤️</span>
                            <span>y</span>
                            <span className="text-cyan-400">React</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
