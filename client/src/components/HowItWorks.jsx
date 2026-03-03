import React from 'react';
import { UserPlus, Settings, TrendingUp, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
    // Données des étapes - Structure similaire à Features
    const steps = [
        {
            id: 1,
            number: "01",
            icon: UserPlus,
            title: "Créez votre compte",
            description: "Inscrivez-vous en quelques minutes et connectez vos sources de données financières en toute sécurité.",
            color: "blue"
        },
        {
            id: 2,
            number: "02",
            icon: Settings,
            title: "Configurez vos paramètres",
            description: "Définissez vos seuils de risque, vos préférences d'alerte et personnalisez votre tableau de bord.",
            color: "purple"
        },
        {
            id: 3,
            number: "03",
            icon: Settings,
            title: "Importer vos transactions",
            description: "Importez vos transactions csv.",
            color: "red"
        },
        {
            id: 4,
            number: "04",
            icon: TrendingUp,
            title: "Surveillez en temps réel",
            description: "Visualisez l'évolution de vos risques avec des graphiques interactifs et des analyses prédictives.",
            color: "cyan"
        },
        {
            id: 5,
            number: "05",
            icon: CheckCircle,
            title: "Agissez rapidement",
            description: "Recevez des alertes instantanées et prenez des décisions éclairées pour protéger vos actifs.",
            color: "green"
        }
    ];

    // Fonction helper pour générer les classes de couleur dynamiquement
    // Pattern senior : éviter la duplication de code
    const getColorClasses = (color) => {
        const colors = {
            blue: {
                bg: "bg-blue-100",
                hover: "group-hover:bg-blue-600",
                text: "text-blue-600",
                hoverText: "group-hover:text-white",
                border: "border-blue-200",
                line: "bg-blue-300"
            },
            purple: {
                bg: "bg-purple-100",
                hover: "group-hover:bg-purple-600",
                text: "text-purple-600",
                hoverText: "group-hover:text-white",
                border: "border-purple-200",
                line: "bg-purple-300"
            },
            red: {
                bg: "bg-red-100",
                hover: "group-hover:bg-red-600",
                text: "text-red-600",
                hoverText: "group-hover:text-white",
                border: "border-red-200",
                line: "bg-red-300"
            },
            cyan: {
                bg: "bg-cyan-100",
                hover: "group-hover:bg-cyan-600",
                text: "text-cyan-600",
                hoverText: "group-hover:text-white",
                border: "border-cyan-200",
                line: "bg-cyan-300"
            },
            green: {
                bg: "bg-green-100",
                hover: "group-hover:bg-green-600",
                text: "text-green-600",
                hoverText: "group-hover:text-white",
                border: "border-green-200",
                line: "bg-green-300"
            }
        };
        return colors[color];
    };

    return (
        <section id="how-it-works" className="py-20 bg-white">
            <div className="container mx-auto px-6">

                {/* En-tête */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Comment ça fonctionne ?
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Commencez à surveiller vos risques financiers en 4 étapes simples
                    </p>
                </div>

                {/* Container pour les étapes avec layout desktop */}
                <div className="max-w-6xl mx-auto">
                    {/* Version Desktop : affichage horizontal avec lignes connectrices */}
                    <div className="hidden lg:block">
                        <div className="relative">
                            {/* Ligne connectrice horizontale */}
                            <div className="absolute top-16 left-0 right-0 h-1 bg-slate-200 -z-10"></div>

                            <div className="grid grid-cols-4 gap-8">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    const colorClasses = getColorClasses(step.color);

                                    return (
                                        <div key={step.id} className="relative group h-full">

                                            {/* Carte de l'étape */}
                                            <div className={`relative h-full flex flex-col bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 ${colorClasses.border} hover:border-opacity-50`}>
                                                {/* Icône avec effet hover */}
                                                <div className={`w-14 h-14 mt-7 ${colorClasses.bg} ${colorClasses.hover} rounded-lg flex items-center justify-center mb-6 mx-auto transition-colors duration-300`}>
                                                    <Icon className={`w-7 h-7 ${colorClasses.text} ${colorClasses.hoverText} transition-colors duration-300`} />
                                                </div>
                                                {/* Numéro de l'étape */}
                                                <div className={`absolute -top-6 mt-4 left-1/2 transform -translate-x-1/2 text-6xl font-bold ${colorClasses.text} opacity-20`}>
                                                    {step.number}
                                                </div>

                                                <h3 className="text-lg font-semibold text-slate-900 mb-3 text-center">
                                                    {step.title}
                                                </h3>

                                                <p className="text-slate-600 text-sm leading-relaxed text-center">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Version Mobile/Tablet : affichage vertical */}
                    <div className="lg:hidden space-y-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const colorClasses = getColorClasses(step.color);
                            const isLast = index === steps.length - 1;

                            return (
                                <div key={step.id} className="relative group">
                                    {/* Ligne verticale connectrice (sauf pour le dernier) */}
                                    {!isLast && (
                                        <div className={`absolute left-7 top-16 bottom-0 w-0.5 ${colorClasses.line} -z-10`}></div>
                                    )}

                                    <div className="flex gap-6">
                                        {/* Colonne de gauche : Numéro et icône */}
                                        <div className="flex flex-col items-center">
                                            <div className={`w-14 h-14 ${colorClasses.bg} ${colorClasses.hover} rounded-lg flex items-center justify-center transition-colors duration-300 relative z-10`}>
                                                <Icon className={`w-7 h-7 ${colorClasses.text} ${colorClasses.hoverText} transition-colors duration-300`} />
                                            </div>
                                        </div>

                                        {/* Colonne de droite : Contenu */}
                                        <div className="flex-1 pb-8">
                                            <div className={`text-5xl font-bold ${colorClasses.text} opacity-20 mb-2`}>
                                                {step.number}
                                            </div>
                                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA en bas */}
                <div className="text-center mt-16">
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                        Commencer maintenant
                    </button>
                    <p className="mt-4 text-slate-600">
                        Aucune carte bancaire requise • Essai gratuit de 14 jours
                    </p>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
