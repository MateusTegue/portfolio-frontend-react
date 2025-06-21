import React from "react";
import { Outlet } from "react-router-dom";
import SidebarComponent from "../../../components/Admin/SidebarComponent";

const AdminPage = () => {
    return (
        <div className="flex">
            <SidebarComponent />
            <main className=" bg-white flex-1  p-4 ml-64  min-h-screen">
                <Outlet /> 
            </main>
        </div>
    );
};

export default AdminPage;
