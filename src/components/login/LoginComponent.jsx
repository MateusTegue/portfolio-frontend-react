import React, { useState, useEffect } from 'react';
import { login } from '../../api/auth.login.js';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { SlEnvolope, SlLock } from "react-icons/sl";
import { FaEye, FaEyeSlash, FaShieldAlt, FaClock } from 'react-icons/fa';
import adminIcon  from '../../images/admin.jpg';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockTime, setLockTime] = useState(0);
    const navigate = useNavigate();

    const MAX_ATTEMPTS = 5;
    const LOCKOUT_TIME = 300; // 5 minutos en segundos

    // Validar formato de email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validar contraseña
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // Sanitizar input (solo trim, sin eliminar caracteres que puedan ser válidos)
    const sanitizeInput = (input) => {
        return input.trim();
    };

    // Verificar si está bloqueado
    useEffect(() => {
        const storedAttempts = parseInt(localStorage.getItem('loginAttempts') || '0');
        const lastAttemptTime = parseInt(localStorage.getItem('lastAttemptTime') || '0');
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (storedAttempts >= MAX_ATTEMPTS) {
            const timeSinceLastAttempt = currentTime - lastAttemptTime;
            if (timeSinceLastAttempt < LOCKOUT_TIME) {
                setIsLocked(true);
                setLockTime(LOCKOUT_TIME - timeSinceLastAttempt);
            } else {
                // Resetear intentos después del tiempo de bloqueo
                localStorage.removeItem('loginAttempts');
                localStorage.removeItem('lastAttemptTime');
                setAttempts(0);
            }
        } else {
            setAttempts(storedAttempts);
        }
    }, []);

    // Contador de tiempo de bloqueo
    useEffect(() => {
        if (isLocked && lockTime > 0) {
            const timer = setInterval(() => {
                setLockTime((prev) => {
                    if (prev <= 1) {
                        setIsLocked(false);
                        localStorage.removeItem('loginAttempts');
                        localStorage.removeItem('lastAttemptTime');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isLocked, lockTime]);

    // Redirigir si ya hay un token guardado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Verificar si el token es válido antes de redirigir
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.role === 'admin') {
                navigate('/admin');
            }
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Validaciones de seguridad
        if (isLocked) {
            const errorMessage = `Cuenta bloqueada temporalmente. Intenta nuevamente en ${Math.floor(lockTime / 60)}:${String(lockTime % 60).padStart(2, '0')}`;
            setError(errorMessage);
            toast.warning(errorMessage, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        // Sanitizar inputs
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedPassword = password.trim();

        // Validar email
        if (!sanitizedEmail) {
            const errorMessage = 'Por favor, ingresa tu email';
            setError(errorMessage);
            toast.warning(errorMessage, {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        if (!validateEmail(sanitizedEmail)) {
            const errorMessage = 'Por favor, ingresa un email válido';
            setError(errorMessage);
            toast.warning(errorMessage, {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        // Validar contraseña
        if (!sanitizedPassword) {
            const errorMessage = 'Por favor, ingresa tu contraseña';
            setError(errorMessage);
            toast.warning(errorMessage, {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        if (!validatePassword(sanitizedPassword)) {
            const errorMessage = 'La contraseña debe tener al menos 6 caracteres';
            setError(errorMessage);
            toast.warning(errorMessage, {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const userData = await login(sanitizedEmail, sanitizedPassword);
            
            // Limpiar intentos fallidos en caso de éxito
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('lastAttemptTime');
            setAttempts(0);

            // Validar que se recibió el token
            if (!userData || !userData.token) {
                throw new Error("No se recibió un token válido del servidor");
            }

            // Guardar token de forma segura
            localStorage.setItem('token', userData.token);
            localStorage.setItem('user', JSON.stringify({ 
                id: userData.id, 
                email: userData.email, 
                role: userData.role 
            }));

            // Limpiar campos sensibles
            setEmail('');
            setPassword('');

            // Mostrar notificación de éxito
            toast.success('¡Inicio de sesión exitoso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Redirigir según el rol
            if (userData.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/Home');
            }
        } catch (err) {
            // Incrementar intentos fallidos
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            localStorage.setItem('loginAttempts', newAttempts.toString());
            localStorage.setItem('lastAttemptTime', Math.floor(Date.now() / 1000).toString());

            // Bloquear después de MAX_ATTEMPTS intentos
            if (newAttempts >= MAX_ATTEMPTS) {
                setIsLocked(true);
                setLockTime(LOCKOUT_TIME);
                const errorMessage = `Demasiados intentos fallidos. Tu cuenta ha sido bloqueada por ${Math.floor(LOCKOUT_TIME / 60)} minutos.`;
                setError(errorMessage);
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                // Mensaje de error genérico (no revelar información sensible)
                const errorMessage = 'Credenciales inválidas. Intento ' + newAttempts + ' de ' + MAX_ATTEMPTS;
                setError(errorMessage);
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }

            // Limpiar contraseña después de error
            setPassword('');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <main className='min-h-screen flex items-center justify-center m-0 p-4 bg-black'>
            <section className='w-full max-w-6xl flex flex-col md:flex-row items-center gap-8'>
                <article className='w-full md:w-1/2 flex justify-center'>
                    {/* <div className='w-full max-w-md"> 
                        <img src={inagenLogin} alt="Imagen de login" className='w-full h-auto object-cover rounded-lg'/>
                    </div> */}
                </article>
                <motion.article 
                    className='w-[350px] max-w-md p-8 m-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl border border-gray-800/50'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='flex flex-col items-center justify-center mb-8'>
                        <motion.div
                            className="relative mb-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl" />
                            <div className="relative bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 p-1 rounded-full">
                                <img 
                                    src={adminIcon} 
                                    alt="Admin Icon" 
                                    className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/30" 
                                />
                            </div>
                        </motion.div>
                        <h2 className='text-2xl font-bold font-poppins text-white tracking-tight'>
                            Panel de Administrador
                        </h2>
                    </div>
                    <div>
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Campo Email */}
                            <div className="group">
                                <div className="flex items-center gap-3 pb-3 border-b border-gray-700 focus-within:border-cyan-500 transition-colors duration-200">
                                    <SlEnvolope className='text-gray-400 text-2xl group-focus-within:text-cyan-400 transition-colors flex-shrink-0' />
                                    <input 
                                        type="email" 
                                        placeholder="Email" 
                                        className='border-0 w-full focus:outline-none bg-transparent text-white placeholder-gray-500 font-poppins text-sm py-1' 
                                        required 
                                        value={email} 
                                        onChange={(e)=> setEmail(e.target.value)}
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            {/* Campo Password */}
                            <div className="group">
                                <div className="flex items-center gap-3 pb-3 border-b border-gray-700 focus-within:border-cyan-500 transition-colors duration-200">
                                    <SlLock className='text-gray-400 text-2xl group-focus-within:text-cyan-400 transition-colors flex-shrink-0' />
                                    <input 
                                        type={showPassword ? "text" : "password"}  
                                        placeholder="Password" 
                                        className='border-0 w-full focus:outline-none bg-transparent text-white placeholder-gray-500 font-poppins text-sm py-1'  
                                        required 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)} 
                                        className="ml-auto text-gray-400 hover:text-cyan-400 focus:outline-none transition-colors p-1"
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        tabIndex={0}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="text-lg" />
                                        ) : (
                                            <FaEye className="text-lg" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Mensaje de error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-poppins flex items-start gap-2"
                                >
                                    <FaShieldAlt className="text-red-400 mt-0.5 flex-shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            {/* Advertencia de intentos */}
                            {attempts > 0 && attempts < MAX_ATTEMPTS && !isLocked && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-xs font-poppins"
                                >
                                    Intento {attempts} de {MAX_ATTEMPTS}. Después de {MAX_ATTEMPTS} intentos fallidos, tu cuenta será bloqueada temporalmente.
                                </motion.div>
                            )}

                            {/* Botón Submit */}
                            <motion.button 
                                type="submit" 
                                disabled={isLoading || isLocked}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 font-poppins"
                                whileHover={{ scale: isLoading || isLocked ? 1 : 1.02 }}
                                whileTap={{ scale: isLoading || isLocked ? 1 : 0.98 }}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Verificando...</span>
                                    </>
                                ) : isLocked ? (
                                    <>
                                        <FaClock />
                                        <span>Cuenta Bloqueada</span>
                                    </>
                                ) : (
                                    <span>Iniciar Sesión</span>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.article>
            </section>
        </main>
    );
 };


export default LoginComponent;
