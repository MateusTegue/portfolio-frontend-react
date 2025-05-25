import React from "react";
import project1 from "../../images/DataAnalitic.png";
const ProjectsComponent = () => {
    return (
        <section className="container w-3/4 mt-32 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
            <div className="w-full  bg-white rounded-2xl shadow-lg p-4 flex flex-col  hover:scale-105 transition-transform duration-300">
                <img src={project1} alt="Proyecto 1" className="w-full h-48 object-cover rounded-t-lg" />
                <h2 className="text-xl font-bold text-blue-600 mb-2">Proyecto 1</h2>
                <hr />
                <p className="text-gray-700">Descripción breve del proyecto 1</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">ver</button>
            </div>
            <div className="w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col  hover:scale-105 transition-transform duration-300">
                <img src={project1} alt="Proyecto 2" className="w-full h-48 object-cover rounded-t-lg" />
                <h2 className="text-xl font-bold text-blue-600 mb-2">Proyecto 2</h2>
                <hr />
                <p className="text-gray-700">Descripción breve del proyecto 2</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">ver</button>
            </div>
            <div className="w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col  hover:scale-105 transition-transform duration-300">
                <img src={project1} alt="Proyecto 3" className="w-full h-48 object-cover rounded-t-lg" />
                <h2 className="text-xl font-bold text-blue-600 mb-2">Proyecto 3</h2>
                <hr />
                <p className="text-gray-700">Descripción breve del proyecto 3</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">ver</button>
            </div>
                <div className="w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col  hover:scale-105 transition-transform duration-300">
                <img src={project1} alt="Proyecto 4" className="w-full h-48 object-cover rounded-t-lg" />
                <h2 className="text-xl font-bold text-blue-600 mb-2">Proyecto 4</h2>
                <hr />
                <p className="text-gray-700">Descripción breve del proyecto 4</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">ver</button>
            </div>
            <div className="w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col  hover:scale-105 transition-transform duration-300">
                <img src={project1} alt="Proyecto 5" className="w-full h-48 object-cover rounded-t-lg" />
                <h2 className="text-xl font-bold text-blue-600 mb-2">Proyecto 5</h2>
                <hr />
                <p className="text-gray-700">Descripción breve del proyecto 5</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">ver</button>
            </div>
            <div className="w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col   hover:scale-105 transition-transform duration-300">
                <img src={project1} alt="Proyecto 6" className="w-full h-48 object-cover rounded-t-lg" />
                <h2 className="text-xl font-bold text-blue-600 mb-2">Proyecto 6</h2>
                <hr />
                <p className="text-gray-700">Descripción breve del proyecto 6</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">ver</button>
            </div>
      </section>
      
    )
}

export default ProjectsComponent;