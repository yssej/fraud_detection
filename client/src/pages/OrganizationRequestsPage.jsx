import React, { useState, useEffect } from 'react';
import {
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Mail,
    Calendar,
    Search,
    Filter,
    UserPlus,
    AlertCircle
} from 'lucide-react';

const OrganizationRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('pending'); // 'all', 'pending', 'approved', 'rejected'
    const [processingId, setProcessingId] = useState(null);

    // Charger les demandes au montage
    useEffect(() => {
        fetchRequests();
    }, []);

    // Fonction pour charger les demandes
    const fetchRequests = async () => {
        setIsLoading(true);

        try {
            // Ici tu ferais un vrai appel API
            // const response = await fetch('/api/organization/requests', {
            //   credentials: 'include'
            // });
            // const data = await response.json();

            // Simulation avec données de démo
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockRequests = [
                {
                    id: 1,
                    user: {
                        name: 'Marie Dubois',
                        email: 'marie.dubois@example.com',
                        avatar: null
                    },
                    requestedAt: '2024-03-09T10:30:00Z',
                    status: 'pending',
                    message: 'Je souhaite rejoindre votre organisation pour collaborer sur les projets de gestion des risques financiers.'
                },
                {
                    id: 2,
                    user: {
                        name: 'Pierre Martin',
                        email: 'pierre.martin@example.com',
                        avatar: null
                    },
                    requestedAt: '2024-03-09T09:15:00Z',
                    status: 'pending',
                    message: 'Analyste financier avec 5 ans d\'expérience, intéressé par vos outils d\'analyse.'
                },
                {
                    id: 3,
                    user: {
                        name: 'Sophie Laurent',
                        email: 'sophie.laurent@example.com',
                        avatar: null
                    },
                    requestedAt: '2024-03-08T14:20:00Z',
                    status: 'approved',
                    message: 'Expert en gestion de portefeuille cherchant à utiliser vos solutions.',
                    approvedAt: '2024-03-08T15:00:00Z',
                    approvedBy: 'John Doe'
                },
                {
                    id: 4,
                    user: {
                        name: 'Luc Bernard',
                        email: 'luc.bernard@example.com',
                        avatar: null
                    },
                    requestedAt: '2024-03-08T11:00:00Z',
                    status: 'rejected',
                    message: 'Je voudrais accéder à la plateforme.',
                    rejectedAt: '2024-03-08T11:30:00Z',
                    rejectedBy: 'Jane Smith',
                    rejectionReason: 'Informations insuffisantes'
                },
                {
                    id: 5,
                    user: {
                        name: 'Emma Rousseau',
                        email: 'emma.rousseau@example.com',
                        avatar: null
                    },
                    requestedAt: '2024-03-09T08:00:00Z',
                    status: 'pending',
                    message: 'Responsable de la gestion des risques chez TechCorp, souhaite évaluer votre solution.'
                }
            ];

            setRequests(mockRequests);

        } catch (error) {
            console.error('Erreur chargement demandes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fonction pour approuver une demande
    const handleApprove = async (requestId) => {
        setProcessingId(requestId);

        try {
            // Ici tu ferais un appel API
            // const response = await fetch(`/api/organization/requests/${requestId}/approve`, {
            //   method: 'POST',
            //   credentials: 'include'
            // });

            // Simulation
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mettre à jour l'état local
            setRequests(prev => prev.map(req =>
                req.id === requestId
                    ? {
                        ...req,
                        status: 'approved',
                        approvedAt: new Date().toISOString(),
                        approvedBy: 'Vous'
                    }
                    : req
            ));

            alert('✅ Demande approuvée avec succès !');

        } catch (error) {
            console.error('Erreur approbation:', error);
            alert('❌ Erreur lors de l\'approbation');
        } finally {
            setProcessingId(null);
        }
    };

    // Fonction pour rejeter une demande
    const handleReject = async (requestId) => {
        const reason = prompt('Raison du rejet (optionnel) :');

        if (reason === null) return; // Annulé

        setProcessingId(requestId);

        try {
            // Ici tu ferais un appel API
            // const response = await fetch(`/api/organization/requests/${requestId}/reject`, {
            //   method: 'POST',
            //   credentials: 'include',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ reason })
            // });

            // Simulation
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mettre à jour l'état local
            setRequests(prev => prev.map(req =>
                req.id === requestId
                    ? {
                        ...req,
                        status: 'rejected',
                        rejectedAt: new Date().toISOString(),
                        rejectedBy: 'Vous',
                        rejectionReason: reason || 'Aucune raison spécifiée'
                    }
                    : req
            ));

            alert('✅ Demande rejetée');

        } catch (error) {
            console.error('Erreur rejet:', error);
            alert('❌ Erreur lors du rejet');
        } finally {
            setProcessingId(null);
        }
    };

    // Filtrer les demandes
    const filteredRequests = requests.filter(request => {
        const matchesSearch =
            request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || request.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // Statistiques
    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === 'pending').length,
        approved: requests.filter(r => r.status === 'approved').length,
        rejected: requests.filter(r => r.status === 'rejected').length
    };

    // Fonction helper pour le statut
    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            approved: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200'
        };

        const labels = {
            pending: 'En attente',
            approved: 'Approuvée',
            rejected: 'Rejetée'
        };

        const icons = {
            pending: Clock,
            approved: CheckCircle,
            rejected: XCircle
        };

        const Icon = icons[status];

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        <Icon className="w-3 h-3" />
                {labels[status]}
      </span>
        );
    };

    // Formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `Il y a ${diffMins} min`;
        if (diffHours < 24) return `Il y a ${diffHours}h`;
        if (diffDays === 1) return 'Hier';
        if (diffDays < 7) return `Il y a ${diffDays} jours`;

        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Affichage du loader
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Chargement des demandes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* En-tête */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Demandes d'adhésion
                </h1>
                <p className="text-slate-600 mt-1">
                    Gérez les demandes pour rejoindre votre organisation
                </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Total</p>
                            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                        </div>
                        <Users className="w-8 h-8 text-slate-400" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">En attente</p>
                            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-400" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Approuvées</p>
                            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Rejetées</p>
                            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                        </div>
                        <XCircle className="w-8 h-8 text-red-400" />
                    </div>
                </div>
            </div>

            {/* Filtres et recherche */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Barre de recherche */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher par nom ou email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Filtre par statut */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="pending">En attente</option>
                            <option value="approved">Approuvées</option>
                            <option value="rejected">Rejetées</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Liste des demandes */}
            <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                        <UserPlus className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">Aucune demande trouvée</p>
                    </div>
                ) : (
                    filteredRequests.map((request) => (
                        <div
                            key={request.id}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                                {/* Informations utilisateur */}
                                <div className="flex-1">
                                    <div className="flex items-start gap-4">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-lg">
                        {request.user.name.charAt(0)}
                      </span>
                                        </div>

                                        {/* Détails */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    {request.user.name}
                                                </h3>
                                                {getStatusBadge(request.status)}
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                            {request.user.email}
                        </span>
                                                <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                                                    {formatDate(request.requestedAt)}
                        </span>
                                            </div>

                                            {/* Message de la demande */}
                                            <div className="bg-slate-50 rounded-lg p-3 mb-3">
                                                <p className="text-sm text-slate-700 italic">
                                                    "{request.message}"
                                                </p>
                                            </div>

                                            {/* Informations supplémentaires selon le statut */}
                                            {request.status === 'approved' && (
                                                <div className="text-xs text-green-700 bg-green-50 rounded px-2 py-1 inline-block">
                                                    Approuvée par {request.approvedBy} le {formatDate(request.approvedAt)}
                                                </div>
                                            )}

                                            {request.status === 'rejected' && (
                                                <div className="text-xs text-red-700 bg-red-50 rounded px-3 py-2">
                                                    <p className="font-semibold mb-1">
                                                        Rejetée par {request.rejectedBy} le {formatDate(request.rejectedAt)}
                                                    </p>
                                                    <p>Raison : {request.rejectionReason}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                {request.status === 'pending' && (
                                    <div className="flex gap-2 lg:flex-col">
                                        <button
                                            onClick={() => handleApprove(request.id)}
                                            disabled={processingId === request.id}
                                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processingId === request.id ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Traitement...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-4 h-4" />
                                                    Approuver
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => handleReject(request.id)}
                                            disabled={processingId === request.id}
                                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Rejeter
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default OrganizationRequestsPage;
