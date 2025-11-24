import React from "react";
import { motion } from "framer-motion";
import NewsAside from "./NewsAside.jsx";

const BlogSidebar = ({ noticias, loadingNoticias }) => {
  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="sticky top-24"
      >
        {/* Noticias */}
        <NewsAside noticias={noticias} loading={loadingNoticias} />
      </motion.div>
    </aside>
  );
};

export default BlogSidebar;

