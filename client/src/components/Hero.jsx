import React from 'react';

const Hero = () => {
    const enterpriseLength = 69;
    const averageLatency = 120;
    return (
        <section id="hero" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
            <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen">

                {/* Badge - Petit élément pour attirer l'attention */}
                <div className="mb-6 inline-flex items-center rounded-full bg-blue-500/10 px-4 py-2 text-sm
                    font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400
                    opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                    Monitoring en temps réel
                </div>

                {/* Titre principal - Le message clé */}
                <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 leading-tight">
                    Surveillez vos risques
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        financiers en temps réel
                    </span>
                </h1>

                {/* Sous-titre - Explique la valeur ajoutée */}
                <p className="text-xl md:text-2xl text-slate-300 text-center max-w-3xl mb-10">
                    Anticipez les menaces, protégez vos actifs et prenez des décisions éclairées
                    grâce à notre plateforme d'analyse de risques alimentée par l'IA.
                </p>

                {/* CTA Buttons - Appels à l'action */}
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                        Démarrer gratuitement
                    </button>
                    <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-lg transition-all duration-200 border border-slate-600">
                        Voir une démo
                    </button>
                </div>

                {/* Stats - Crédibilité sociale */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl pt-8 border-t border-slate-700">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
                        <div className="text-slate-400">Uptime garanti</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400 mb-2">{'<'+averageLatency}ms</div>
                        <div className="text-slate-400">Latence moyenne</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400 mb-2">{enterpriseLength}+</div>
                        <div className="text-slate-400">Entreprises protégées</div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
