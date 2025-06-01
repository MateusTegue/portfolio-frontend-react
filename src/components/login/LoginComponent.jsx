import React, { useState, useEffect } from 'react';
import { login } from '../../api/auth.login.js';
import { useNavigate } from 'react-router-dom';
import { SlEnvolope, SlLock } from "react-icons/sl";
import adminIcon  from '../../images/admin.jpg';
import inagenLogin from '../../images/imagenLogin.png';




const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Redirigir si ya hay un token guardado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        // navigate('/Projects'); // o tu ruta protegida
        }
    }, [navigate]);

   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      localStorage.setItem('token', userData.token); // Guardar el token en localStorage
      localStorage.setItem('user', JSON.stringify({ id: userData.id, email: userData.email }));
      setError(''); // Limpiar errores
      alert('Inicio de sesión exitoso');
    //   navigate('/Projects'); // Redirigir al panel de administrador
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };


    return (
        <main className='min-h-screen flex items-center justify-center m-0 p-0'>
            <section className='w-full max-w-6xl flex flex-col md:flex-row items-center gap-8  '>
                <article className='w-full md:w-1/2 flex justify-center'>
                    <div className='w-full max-w-md'> 
                        <img src={inagenLogin} alt="Imagen de login" className='w-full h-auto object-cover rounded-lg'/>
                    </div>
                </article>
                <article className='w-98 p-4 m-auto'>
                    <div className='flex flex-col items-center justify-center mb-10'>
                        <img src={adminIcon} alt="Admin Icon" className="w-24 rounded-full m-0" />
                        <h2 className='font-bold ...'>Panel de Administrador</h2>
                    </div>
                    <div className=" ">
                        <form onSubmit={handleLogin}  className="login-form">
                            <div className="mb-8 border-b border-black flex items-center">
                                <SlEnvolope className='mr-2 text-3xl' />
                                <input type="email" placeholder="Email" className='border-0 w-full focus:outline-none' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-14 border-b border-black flex items-center">
                                <SlLock className='mr-2 text-3xl' />
                                <input type={showPassword ? "text" : "password"}  placeholder="Password" className='border-0 w-full focus:outline-none'  required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                  {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            <button type="submit"  onClick={() => setShowPassword(!showPassword)} className="bg-blue-500 text-white block w-full p-2 rounded-2xl">Iniciar Sesion</button>
                        </form>
                    </div>
                </article>
        </section>
        </main>
    );
 };


export default LoginComponent;