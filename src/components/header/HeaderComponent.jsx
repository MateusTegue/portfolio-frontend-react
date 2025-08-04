import React, { useState } from "react";
//import "./HeaderComponent.css";
import { Link } from "react-router-dom";


const HeaderComponent = () => {
     const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full  bg-black text-cyan-50 shadow-md z-50">
            <nav className="bg-black-100 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/Home" className="flex items-center">
                        <span className="text-4xl font-bold font-poppins dark:text-white">M <span className="text-cyan-400">Tegue</span></span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link to="/Login" className="bg-cyan-500 text-white hover:bg-cyan-600 font-medium rounded-lg text-sm px-4 py-2 mr-2" > Login </Link>
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center p-2 text-sm text-gray-50 rounded-lg lg:hidden bg-cyan-500 focus:outline-none">
                          <span className="sr-only">Open main menu</span>
                            {/* Ícono de hamburguesa */}
                            <svg
                                className={`${isOpen ? "hidden" : "block"} w-6 h-5`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                fillRule="evenodd"
                                d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2z"
                                clipRule="evenodd"
                                />
                            </svg>
                            {/* Ícono de cerrar */}
                            <svg
                                className={`${isOpen ? "block" : "hidden"} w-6 h-5`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className={`${isOpen ? "block bg-cyan-500": "hidden"} w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                    <ul className="flex flex-col space-y-4 m-4 mt-4 lg:mt-0 lg:flex-row lg:space-y-0 lg:space-x-8 font-bold font-poppins">
                        <li>
                        <Link to="/Home" className="block text-white hover:text-cyan-400 transition">
                            Inicio
                        </Link>
                        </li>
                        <li>
                        <Link to="/Projects" className="block text-white hover:text-cyan-400 transition">
                            Proyectos
                        </Link>
                        </li>
                        {/* <li>
                        <Link to="/Educacion" className="block text-white hover:text-cyan-400 transition">
                            Educación
                        </Link>
                        </li> */}
                        <li>
                        <Link to="/Experience" className="block text-white hover:text-cyan-400 transition">
                            Experiencia
                        </Link>
                        </li>
                        <li>
                        <Link to="/Blog" className="block text-white hover:text-cyan-400 transition">
                            Blog
                        </Link>
                        </li>
                        
                    </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default HeaderComponent;

                          
                           
                    


