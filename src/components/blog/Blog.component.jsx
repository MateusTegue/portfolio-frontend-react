import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../api/blog.js"; 
import { getNoticias } from "../../api/newsApi.js";
import { BlogModal } from "../blogModal/BlogModal.jsx";
import BlogMainContent from "./BlogMainContent.jsx";
import BlogSidebar from "./BlogSidebar.jsx";
import BlogHeader from "./BlogHeader.jsx";
import BlogLoadingState from "./BlogLoadingState.jsx";
import BlogErrorState from "./BlogErrorState.jsx";
import BlogEmptyState from "./BlogEmptyState.jsx";

const BlogComponent = () => {
    const [blogs, setBlogs] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingNoticias, setLoadingNoticias] = useState(true);
    const [error, setError] = useState(null);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage, setBlogsPerPage] = useState(6);

    const handleOpenModal = (blog) => {
      setSelectedBlog(blog);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedBlog(null);
    };

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    useEffect(() => {
      const getAllBlogsData = async () => {
        try {
          const dataBlogs = await getAllBlogs();
          setBlogs(dataBlogs);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      getAllBlogsData();
    }, []);

    useEffect(() => {
      const getNoticiasData = async () => {
        try {
          const dataNoticias = await getNoticias();
          console.log("Noticias obtenidas:", dataNoticias); // Debug
          setNoticias(dataNoticias || []);
        } catch (err) {
          console.error("Error al obtener noticias:", err);
          setNoticias([]);
        } finally {
          setLoadingNoticias(false);
        }
      };
      getNoticiasData();
    }, []);

    useEffect(() => {
      const updateBlogsPerPage = () => {
        if (window.innerWidth < 640) {
          setBlogsPerPage(3); 
        } else if (window.innerWidth < 1024) {
          setBlogsPerPage(4);
        } else {
          setBlogsPerPage(5); 
        }
      };

      updateBlogsPerPage(); 
      window.addEventListener('resize', updateBlogsPerPage);
      return () => window.removeEventListener('resize', updateBlogsPerPage);
    }, []);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    if (loading) {
        return <BlogLoadingState />;
    }

    if (error) {
        return <BlogErrorState error={error} />;
    }

    if (blogs.length === 0) {
        return <BlogEmptyState />;
    }
    
    return (
        <section className="container container-fluid relative mx-auto px-4 py-12 lg:py-20 mt-24 bg-red-500">
            <BlogHeader />

            {/* Layout de dos columnas: Main Content (2/3) y Sidebar (1/3) */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Contenido principal - Blogs destacados o más recientes */}
              <BlogMainContent
                blogs={blogs}
                currentPage={currentPage}
                blogsPerPage={blogsPerPage}
                onReadMore={handleOpenModal}
                onPageChange={handlePageChange}
              />

              {/* Sidebar - Noticias */}
              <BlogSidebar
                noticias={noticias}
                loadingNoticias={loadingNoticias}
              />
            </div>

            <BlogModal blog={selectedBlog} isOpen={isModalOpen} onClose={handleCloseModal} />
        </section>
    );
};

export default BlogComponent;
