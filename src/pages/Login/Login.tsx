import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginInput } from '../../model/usuario/usuario';
import { AuthContext } from '../../contexts/AuthContext';
import { CircleLoader } from 'react-spinners';

export function Login() {
    const [loginData, setLoginData] = useState<LoginInput>({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { handleLogin, isLoading, handleLogout } = useContext( AuthContext );

    const logarUsuario = async () => {
        try {
            await handleLogin(loginData);
        } catch (error) {
            setError('Falha ao entrar. Verifique suas credenciais.');
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        logarUsuario();

        if (!error) {
            navigate('/produtos');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full">
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full mb-3 sm:mb-4">
                        <img src="/logo.webp" alt="Logo" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">DeliveryApp</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Entre com sua conta</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Email</label>
                        <input
                            type="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            placeholder="seu@email.com"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Senha</label>
                        <input
                            type="password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            placeholder="Digite sua senha"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2.5 sm:py-3 rounded-lg hover:bg-orange-600 transition font-semibold text-sm sm:text-base"
                    >
                        {isLoading ? 
                        
                        <CircleLoader size={24} color="#ffffff" /> : 'Entrar'}
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-gray-600 text-xs sm:text-sm">
                            Não tem uma conta?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/cadastro')}
                                className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer"
                            >
                                Cadastre-se
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
