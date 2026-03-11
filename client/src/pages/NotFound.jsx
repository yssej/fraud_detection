import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6">
            <div className="text-center">

                {/* Code 404 */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        404
                    </h1>
                    <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
                </div>

                {/* Message */}
                <h2 className="text-3xl font-bold text-white mb-4">
                    Page introuvable
                </h2>
                <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto">
                    Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all duration-200"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Retour
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg"
                    >
                        <Home className="w-5 h-5" />
                        Accueil
                    </button>
                </div>

                {/* Illustration décorative */}
                <div className="mt-12 opacity-20">
                    <svg className="w-64 h-64 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" className="text-blue-400" />
                        <line x1="12" y1="8" x2="12" y2="12" className="text-blue-400" />
                        <line x1="12" y1="16" x2="12.01" y2="16" className="text-blue-400" />
                    </svg>
                </div>

            </div>
        </div>
    );
};

export default NotFound;
