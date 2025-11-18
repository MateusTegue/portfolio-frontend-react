import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useLocation,} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectPage";
import ExpriencePage from "./pages/ExperiencePage";
import BlogPage from "./pages/BlogPage";
import HeaderComponent from "./components/header/HeaderComponent";
import FooterComponent from "./components/footer/FooterComponent";

// rutas para el Admin
import PrivateRouteComponent from "./components/PrivateRoute/PrivateRouteComponent";
import AdminPage from "./pages/Admin/AdminPage/AdminPage";
import DashboardPage from "./pages/Admin/AdminPage/DashboardPage";
import PageProjectAdmin from "./pages/Admin/AdminPage/ProjectPageAdmin";
import PerfilAdminPage from "./pages/Admin/AdminPage/PerfilAdminPage";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <HeaderComponent />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Projects" element={<ProjectsPage />} />
        <Route path="/Experience" element={<ExpriencePage />} />
        <Route path="/Blog" element={<BlogPage />} />

        {/* Rutas protegidas anidadas */}
        <Route path="/admin" element={<PrivateRouteComponent>  <AdminPage /></PrivateRouteComponent>}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<PageProjectAdmin />} />
          <Route path="educacion" element={<PerfilAdminPage />} />
          <Route path="perfil" element={<PerfilAdminPage />} />
        </Route>
      </Routes>

      {!isAdminRoute && <FooterComponent />}
      
      {/* Toast Container para notificaciones */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="toast-container"
      />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
