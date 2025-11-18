import React from "react";
import { Outlet } from "react-router-dom";
import SidebarComponent from "../../../components/Admin/SidebarComponent";

const AdminPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidebarComponent />
            <main className="flex-1 ml-64 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
                <div className="p-6 lg:p-8">
                    <Outlet /> 
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
