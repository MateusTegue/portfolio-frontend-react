import React from "react";
import { motion } from "framer-motion";

const BlogErrorState = ({ error }) => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 lg:py-20 mt-24">
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm"
        >
          <p className="text-red-400 font-poppins">Error: {error}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogErrorState;

