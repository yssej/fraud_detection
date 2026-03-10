import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/userContext.jsx';
import { TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import OrganizationModal from '../../components/OrganizationModal';
import membershipService from "../../services/membership.service.js";
import organizationService from "../../services/organization.service.js";
import toast from "react-hot-toast";

const DashboardHome = () => {
    const { userData } = useUser();

    // État pour le modal d'organisation
    const [showOrgModal, setShowOrgModal] = useState(false);
    const [userHasOrganization, setUserHasOrganization] = useState(null);
    const [isCheckingOrg, setIsCheckingOrg] = useState(true);

    // Vérifier si l'utilisateur a une organisation au montage
    useEffect(() => {
        checkUserOrganization().then(r => {});
    }, []);

    // Fonction pour vérifier si l'utilisateur a une organisation
    const checkUserOrganization = async () => {
        setIsCheckingOrg(true);

        try {
            const response = await membershipService.isUserMemberOfAnyOrganization();
            const {hasOrganization} = await response.data;
            setUserHasOrganization(hasOrganization);
            if (!hasOrganization) {
                setShowOrgModal(true);
            }

        } catch (error) {
            toast.error('Erreur lors de la vérification de l\'organisation:', error);
            setUserHasOrganization(false);
        } finally {
            setIsCheckingOrg(false);
        }
    };

    // Fonction appelée quand l'utilisateur crée une organisation
    const handleCreateOrganization = async (orgName) => {
        try {
            console.log('Création de l\'organisation:', orgName);

            // Ici tu ferais un appel API pour créer l'organisation
            const response = await organizationService.create(orgName);

            // Mettre à jour l'état
            setUserHasOrganization(true);
            setShowOrgModal(false);

            // Afficher un message de succès
            toast.success(`Organisation "${orgName}" créée avec succès ! 🎉`);

        } catch (error) {
            toast.error('Erreur lors de la création de l\'organisation');
        }
    };

    // Fonction appelée quand l'utilisateur choisit de continuer sans organisation
    const handleContinueWithout = () => {
        console.log('L\'utilisateur continue sans organisation');

        // Sauvegarder le choix pour ne pas redemander à chaque fois
        localStorage.setItem('skipOrganizationPrompt', 'true');

        setShowOrgModal(false);
    };

    // Données de démonstration
    const stats = [
        {
            title: 'Risques actifs',
            value: '24',
            change: '+12%',
            trend: 'up',
            icon: AlertTriangle,
            color: 'orange'
        },
        {
            title: "Alertes aujourd'hui",
            value: '8',
            change: '-5%',
            trend: 'down',
            icon: Activity,
            color: 'blue'
        },
        {
            title: 'Risques résolus',
            value: '156',
            change: '+23%',
            trend: 'up',
            icon: CheckCircle,
            color: 'green'
        },
        {
            title: 'Score de santé',
            value: '92%',
            change: '+3%',
            trend: 'up',
            icon: TrendingUp,
            color: 'purple'
        }
    ];

    const recentRisks = [
        {
            id: 1,
            title: 'Volatilité élevée sur EUR/USD',
            severity: 'high',
            time: 'Il y a 2h'
        },
        {
            id: 2,
            title: 'Exposition dépassant le seuil',
            severity: 'medium',
            time: 'Il y a 5h'
        },
        {
            id: 3,
            title: 'Corrélation inhabituelle détectée',
            severity: 'low',
            time: 'Il y a 1j'
        }
    ];

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getStatColor = (color) => {
        const colors = {
            orange: 'bg-orange-100 text-orange-600',
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600'
        };
        return colors[color] || 'bg-slate-100 text-slate-600';
    };

    // Affichage du loader pendant la vérification
    if (isCheckingOrg) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Chargement de votre espace...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Modal d'organisation */}
            <OrganizationModal
                isOpen={showOrgModal}
                onClose={() => setShowOrgModal(false)}
                onCreateOrg={handleCreateOrganization}
                onContinueWithout={handleContinueWithout}
            />

            {/* Contenu du dashboard */}
            <div className="space-y-6">

                {/* En-tête */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Bienvenue, {userData?.name || 'Utilisateur'} !
                    </h1>
                    <p className="text-slate-600 mt-1">
                        Voici un aperçu de vos risques financiers en temps réel
                    </p>
                </div>

                {/* Alerte si pas d'organisation */}
                {!userHasOrganization && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Activity className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-blue-900 mb-1">
                                    Vous n'avez pas encore d'organisation
                                </h3>
                                <p className="text-sm text-blue-700 mb-3">
                                    Créez ou rejoignez une organisation pour collaborer avec votre équipe et accéder à toutes les fonctionnalités.
                                </p>
                                <button
                                    onClick={() => setShowOrgModal(true)}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    Configurer mon organisation
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Grille de statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg ${getStatColor(stat.color)} flex items-center justify-center`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-sm font-semibold ${
                                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {stat.change}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                                    {stat.value}
                                </h3>
                                <p className="text-sm text-slate-600">
                                    {stat.title}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Section des risques récents */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Risques récents */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">
                            Risques récents
                        </h2>

                        <div className="space-y-3">
                            {recentRisks.map((risk) => (
                                <div
                                    key={risk.id}
                                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-medium text-slate-900 mb-1">
                                            {risk.title}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {risk.time}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(risk.severity)}`}>
                    {risk.severity === 'high' ? 'Élevé' : risk.severity === 'medium' ? 'Moyen' : 'Faible'}
                  </span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            Voir tous les risques →
                        </button>
                    </div>

                    {/* Graphique placeholder */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">
                            Évolution des risques
                        </h2>

                        <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <Activity className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                                <p className="text-slate-600">
                                    Graphique d'évolution
                                </p>
                                <p className="text-sm text-slate-500 mt-1">
                                    (À implémenter avec Chart.js ou Recharts)
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Actions rapides */}
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg p-8 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                        Besoin d'analyser un nouveau risque ?
                    </h2>
                    <p className="text-blue-100 mb-6">
                        Utilisez notre outil d'analyse pour évaluer rapidement l'impact d'un nouveau facteur de risque
                    </p>
                    <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                        Lancer une analyse
                    </button>
                </div>

            </div>
        </>
    );
};

export default DashboardHome;
