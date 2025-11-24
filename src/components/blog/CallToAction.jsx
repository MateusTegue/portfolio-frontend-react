import React from "react";
import { motion } from "framer-motion";
import { FaDownload, FaEnvelope, FaCode } from "react-icons/fa";

const CallToAction = () => {
  const ctas = [
    {
      title: "Descarga mi CV",
      description: "Obtén mi currículum actualizado",
      icon: <FaDownload />,
      href: "/CV_MateusTegue.pdf",
      download: true,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Contáctame",
      description: "Hablemos sobre tu proyecto",
      icon: <FaEnvelope />,
      href: "mailto:mateus.tegue@example.com",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Ver Proyectos",
      description: "Explora mi portafolio",
      icon: <FaCode />,
      href: "/Projects",
      color: "from-blue-500 to-blue-600"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6 shadow-xl">
      <h3 className="text-lg font-bold font-poppins text-white mb-4">
        <span className="text-cyan-400">Acciones</span> Rápidas
      </h3>

      <div className="space-y-3">
        {ctas.map((cta, index) => (
          <motion.a
            key={index}
            href={cta.href}
            download={cta.download}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`block p-4 bg-gradient-to-r ${cta.color} rounded-lg text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl`}
          >
            <div className="flex items-center gap-3">
              <div className="text-xl">{cta.icon}</div>
              <div className="flex-1">
                <h4 className="font-poppins text-sm font-bold">{cta.title}</h4>
                <p className="text-xs opacity-90 font-poppins">{cta.description}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default CallToAction;

