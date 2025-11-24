import React from "react";
import { PropagateLoader } from "react-spinners";

const BlogLoadingState = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 lg:py-20 mt-24">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <PropagateLoader color="#06b6d4" size={15} />
          <p className="mt-4 text-cyan-400 font-poppins">Cargando blogs...</p>
        </div>
      </div>
    </section>
  );
};

export default BlogLoadingState;

