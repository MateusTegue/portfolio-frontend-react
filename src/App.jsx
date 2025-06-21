import React from "react";
import { Navigate } from "react-router-dom"; 
import { BrowserRouter as Router, Routes, Route, useLocation,} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectPage";
import CertificationsPage from "./pages/CertificationsPages";
import AboutPage from "./pages/AboutPage";
import HeaderComponent from "./components/header/HeaderComponent";
import FooterComponent from "./components/footer/FooterComponent";

// rutas para el Admin
import PrivateRouteComponent from "./components/PrivateRoute/PrivateRouteComponent";
import AdminPage from "./pages/Admin/AdminPage/AdminPage";
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
        <Route path="/Educacion" element={<CertificationsPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Panel admin con protección */}
        {/* <Route path="/admin" element={ <PrivateRouteComponent> <AdminPage /> </PrivateRouteComponent> } /> */}
        {/* Rutas protegidas anidadas */}
        <Route
          path="/admin"
          element={
            <PrivateRouteComponent>
              <AdminPage />
            </PrivateRouteComponent>
          }
        >
          <Route index element={<Navigate to="/admin" replace />} /> {/* Redirección por defecto */}
          <Route path="projects" element={<PageProjectAdmin />} />
          <Route path="educacion" element={<PerfilAdminPage />} />
          <Route path="perfil" element={<PerfilAdminPage />} />
        </Route>
      </Routes>

      {!isAdminRoute && <FooterComponent />}
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

// // App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import ProjectsPage from "./pages/ProjectPage";
// import CertificationsPage from "./pages/CertificationsPages";
// import AboutPage from "./pages/AboutPage";
// import HeaderComponent from "./components/header/HeaderComponent";
// import FooterComponent from "./components/footer/FooterComponent";
// import AdminPage from "./pages/Admin/AdminPage/AdminPage";
// import PrivateRouteComponent from "./components/PrivateRoute/PrivateRouteComponent";

// const App = () => {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith("/admin")


//   return (
//     <div className="flex flex-col min-h-screen">
//       {!isAdminRoute && <HeaderComponent />}
//       <Router>
//         <HeaderComponent />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/Home" element={<HomePage />} />
//           <Route path="/Login" element={<LoginPage />} />
//           <Route path="/Projects" element={<ProjectsPage />} />
//           <Route path="/Educacion" element={<CertificationsPage />} />
//           <Route path="/about" element={<AboutPage />} />

//           <Route path="/admin" element={<PrivateRouteComponent> <AdminPage /> </PrivateRouteComponent>}/>
//         </Routes>
//         <FooterComponent />
//       </Router>
//     </div>
//   );
// };

// export default App;







