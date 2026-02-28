import React, { useState} from "react";
import {CheckCircle2, Mail, User, ArrowRight} from "lucide-react";

const CTA = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Email soumis: ${email}`);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Veuillez entrer une adresse email valide.');
            return;
        }
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
            setName('');
        }, 3000);
    }

    // Liste des avantages à afficher
    const benefits = [
        "Essai gratuit de 14 jours",
        "Aucune carte bancaire requise",
        "Support client 24/7",
        "Annulation à tout moment"
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-blue-200 via-blue-800 to-slate-900 text-white relative
        overflow-hidden">
            {/* Effets de fond décoratifs */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl">
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">

                    {/* Contenu principal */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Prêt à protéger vos actifs financiers ?
                        </h2>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Rejoignez des centaines d'entreprises qui font confiance à notre plateforme
                            pour surveiller leurs risques en temps réel.
                        </p>
                    </div>

                    {/* Formulaire d'inscription */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20
                    shadow-2xl">
                        {/* Affichage conditionnel : formulaire OU message de succès */}
                        {!isSubmitted ? (
                            <>
                                <form onSubmit={handleSubmit} className="mb-8">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Entrez votre nom"
                                                required
                                                className="w-full pl-12 pr-4 py-4 bg-white text-slate-900 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none transition-all duration-200 text-lg"
                                            />
                                        </div>
                                        <div className="flex-1 relative">
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Entrez votre email professionnel"
                                                required
                                                className="w-full pl-12 pr-4 py-4 bg-white text-slate-900 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none transition-all duration-200 text-lg"
                                            />
                                            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                                        </div>
                                        <button
                                            type="submit"
                                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
                                        >
                                            Commencer gratuitement
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </form>

                                {/* Liste des avantages avec .map() */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span className="text-blue-50">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                             // Liste des avantages avec .map()
                            <div className="text-center py-8 animate-fade-in">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Parfait ! {name}</h3>
                                <p className="text-blue-100">
                                    Nous vous avons envoyé un email de confirmation à {email}. Vérifiez votre boîte de réception.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Témoignages ou social proof */}
                    <div className="mt-12 text-center">
                        <p className="text-blue-200 mb-4">Déjà utilisé par plus de 500 entreprises</p>
                        <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
                            {/* Placeholders pour logos d'entreprises */}
                            <div className="px-6 py-3 bg-white/10 rounded-lg text-sm font-semibold">
                                FinTech Corp
                            </div>
                            <div className="px-6 py-3 bg-white/10 rounded-lg text-sm font-semibold">
                                Global Bank
                            </div>
                            <div className="px-6 py-3 bg-white/10 rounded-lg text-sm font-semibold">
                                Investment Ltd
                            </div>
                            <div className="px-6 py-3 bg-white/10 rounded-lg text-sm font-semibold">
                                Hedge Fund Pro
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default CTA;
