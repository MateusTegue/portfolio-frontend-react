import React from "react";
import { motion } from "framer-motion";

const BlogHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
        Mi <span className="text-cyan-400">Blog</span>
      </h2>
      <p className="text-gray-400 font-poppins">Compartiendo conocimientos y experiencias</p>
    </motion.div>
  );
};

export default BlogHeader;

