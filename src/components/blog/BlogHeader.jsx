import React from "react";
import { motion } from "framer-motion";

const BlogHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <p className="text-gray-400 font-poppins">Compartiendo conocimientos y experiencias</p>
    </motion.div>
  );
};

export default BlogHeader;

