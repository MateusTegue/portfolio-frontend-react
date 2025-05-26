import React from 'react';
import { useState } from 'react';
import { SlEnvolope, SlLock } from "react-icons/sl";
import adminIcon  from '../../images/admin.jpg';
import inagenLogin from '../../images/imagenLogin.png';




const LoginComponent = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className='min-h-screen flex items-center justify-center m-0 p-0'>
            <section className='w-full max-w-6xl flex flex-col md:flex-row items-center gap-8  '>
                <artticle className='w-full md:w-1/2 flex justify-center'>
                    <div className='w-full max-w-md'> 
                        <img src={inagenLogin} alt="Imagen de login" className='w-full h-auto object-cover rounded-lg'/>
                    </div>
                </artticle>
                <artticle className='w-98 p-4 m-auto'>
                    <div className='flex flex-col items-center justify-center mb-10'>
                        <img src={adminIcon} alt="Admin Icon" className="w-24 rounded-full m-0" />
                        <h2 className='font-bold ...'>Panel de Administrador</h2>
                    </div>
                    <div className=" ">
                        <form  className="login-form">
                            <div className="mb-8 border-b border-black flex items-center">
                                <SlEnvolope className='mr-2 text-3xl' />
                                <input type="email" placeholder="Email" className='border-0 w-full focus:outline-none' />
                            </div>
                            <div className="mb-14 border-b border-black flex items-center">
                                <SlLock className='mr-2 text-3xl' />
                                <input type={showPassword ? "text" : "password"}  placeholder="Password" className='border-0 w-full focus:outline-none'  required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                  {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            <button type="submit"  onClick={() => setShowPassword(!showPassword)} className="bg-blue-500 text-white block w-full p-2 rounded-2xl">Iniciar Sesion</button>
                        </form>
                    </div>
                </artticle>
        </section>
        </main>
    );
};

export default LoginComponent;