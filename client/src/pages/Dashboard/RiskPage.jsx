import React, { useState } from 'react';
import { Plus, Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';

const RisksPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSeverity, setFilterSeverity] = useState('all');

    // Données de démonstration
    const risks = [
        {
            id: 1,
            title: 'Volatilité élevée sur EUR/USD',
            description: 'La paire EUR/USD montre une volatilité inhabituelle au-dessus de 2 écarts-types',
            severity: 'high',
            status: 'active',
            category: 'Marché',
            impact: 'Élevé',
            probability: '85%',
            lastUpdated: '2024-03-05 14:30'
        },
        {
            id: 2,
            title: 'Exposition dépassant le seuil sur actions Tech',
            description: "L'exposition aux actions technologiques dépasse la limite de 30% fixée",
            severity: 'medium',
            status: 'active',
            category: 'Portefeuille',
            impact: 'Moyen',
            probability: '65%',
            lastUpdated: '2024-03-05 11:15'
        },
        {
            id: 3,
            title: 'Corrélation inhabituelle détectée',
            description: 'Corrélation anormale entre actifs normalement décorrélés',
            severity: 'low',
            status: 'monitoring',
            category: 'Analyse',
            impact: 'Faible',
            probability: '40%',
            lastUpdated: '2024-03-04 16:45'
        },
        {
            id: 4,
            title: 'Risque de liquidité sur obligations',
            description: 'Diminution significative de la liquidité sur certaines obligations corporatives',
            severity: 'high',
            status: 'active',
            category: 'Liquidité',
            impact: 'Élevé',
            probability: '70%',
            lastUpdated: '2024-03-05 09:20'
        },
        {
            id: 5,
            title: 'Concentration géographique',
            description: 'Exposition élevée à une seule région géographique (Asie-Pacifique)',
            severity: 'medium',
            status: 'resolved',
            category: 'Diversification',
            impact: 'Moyen',
            probability: '55%',
            lastUpdated: '2024-03-03 13:10'
        }
    ];

    // Filtrage des risques
    const filteredRisks = risks.filter(risk => {
        const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            risk.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeverity = filterSeverity === 'all' || risk.severity === filterSeverity;
        return matchesSearch && matchesSeverity;
    });

    // Fonctions helper pour les couleurs
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-red-100 text-red-800';
            case 'monitoring': return 'bg-blue-100 text-blue-800';
            case 'resolved': return 'bg-green-100 text-green-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'active': return 'Actif';
            case 'monitoring': return 'Surveillance';
            case 'resolved': return 'Résolu';
            default: return status;
        }
    };

    return (
        <div className="space-y-6">

            {/* En-tête */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Gestion des risques</h1>
                    <p className="text-slate-600 mt-1">
                        {filteredRisks.length} risque{filteredRisks.length > 1 ? 's' : ''} détecté{filteredRisks.length > 1 ? 's' : ''}
                    </p>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                    <Plus className="w-5 h-5" />
                    Nouveau risque
                </button>
            </div>

            {/* Filtres et recherche */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Barre de recherche */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher un risque..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Filtre par sévérité */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <select
                            value={filterSeverity}
                            onChange={(e) => setFilterSeverity(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="all">Toutes les sévérités</option>
                            <option value="high">Sévérité élevée</option>
                            <option value="medium">Sévérité moyenne</option>
                            <option value="low">Sévérité faible</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Liste des risques */}
            <div className="space-y-4">
                {filteredRisks.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                        <p className="text-slate-500">Aucun risque trouvé</p>
                    </div>
                ) : (
                    filteredRisks.map((risk) => (
                        <div
                            key={risk.id}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                                {/* Contenu principal */}
                                <div className="flex-1">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                {risk.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm">
                                                {risk.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(risk.severity)}`}>
                      Sévérité: {risk.severity === 'high' ? 'Élevée' : risk.severity === 'medium' ? 'Moyenne' : 'Faible'}
                    </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(risk.status)}`}>
                      {getStatusLabel(risk.status)}
                    </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {risk.category}
                    </span>
                                    </div>
                                </div>

                                {/* Statistiques */}
                                <div className="lg:w-64 space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600">Impact:</span>
                                        <span className="font-semibold text-slate-900">{risk.impact}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600">Probabilité:</span>
                                        <span className="font-semibold text-slate-900">{risk.probability}</span>
                                    </div>
                                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                                        Mis à jour: {risk.lastUpdated}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default RisksPage;
