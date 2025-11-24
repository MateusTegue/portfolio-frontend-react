import React from "react";
import BlogCard from "./BlogCard.jsx";
import BlogPagination from "./BlogPagination.jsx";

const BlogMainContent = ({ blogs, currentPage, blogsPerPage, onReadMore, onPageChange }) => {
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="flex-1 lg:w-3/4 xl:w-4/5">
      <div className="w-full grid grid-cols-1 gap-6">
        {currentBlogs.map((blog, index) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            index={index}
            onReadMore={onReadMore}
          />
        ))}
      </div>

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default BlogMainContent;

