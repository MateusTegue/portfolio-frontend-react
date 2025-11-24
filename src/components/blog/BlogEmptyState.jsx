import React from "react";
import { motion } from "framer-motion";

const BlogEmptyState = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 lg:py-20 mt-24">
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8"
        >
          <p className="text-gray-400 font-poppins text-lg">No hay blogs disponibles.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogEmptyState;

