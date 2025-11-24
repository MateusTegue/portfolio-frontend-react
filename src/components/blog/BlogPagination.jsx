import React from "react";

const BlogPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12">
      <nav className="inline-flex gap-2 bg-gray-900/50 backdrop-blur-sm p-2 rounded-full border border-cyan-500/20">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 rounded-full font-semibold font-poppins transition-all duration-300 ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30 scale-105"
                : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BlogPagination;

