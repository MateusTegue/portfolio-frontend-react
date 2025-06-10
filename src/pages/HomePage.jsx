import React from "react";
import HomePageComponent from "../components/home/HomePageComponent.jsx";

const HomePage = () => {
    return (
        <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="   p-4">
                <HomePageComponent />
            </div>
        </main>
    );
};

export default HomePage;

