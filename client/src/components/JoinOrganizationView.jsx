import React, { useState } from 'react';
import { Users, Key, AlertCircle, CheckCircle, ArrowLeft, Loader } from 'lucide-react';

const JoinOrganizationView = ({ onJoinOrg, onBack }) => {
    const [inviteCode, setInviteCode] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [validationResult, setValidationResult] = useState(null);
    const [error, setError] = useState('');

    // Fonction pour valider le code d'invitation en temps réel
    const validateInviteCode = async (code) => {
        if (code.length < 6) {
            setValidationResult(null);
            return;
        }

        setIsValidating(true);
        setError('');

        try {
            // Ici tu ferais un appel API pour vérifier le code
            // const response = await fetch(`/api/invitations/validate/${code}`, {
            //   credentials: 'include'
            // });
            // const data = await response.json();

            // Simulation d'API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulation : codes valides pour la démo
            const validCodes = {
                'ABC123': {
                    organizationName: 'Acme Corporation',
                    invitedBy: 'John Doe',
                    role: 'Membre',
                    memberCount: 15
                },
                'XYZ789': {
                    organizationName: 'Tech Startup Inc',
                    invitedBy: 'Jane Smith',
                    role: 'Analyste',
                    memberCount: 8
                }
            };

            if (validCodes[code]) {
                setValidationResult(validCodes[code]);
                setError('');
            } else {
                setValidationResult(null);
                setError('Code d\'invitation invalide ou expiré');
            }

        } catch (err) {
            setError('Erreur lors de la validation du code');
            setValidationResult(null);
        } finally {
            setIsValidating(false);
        }
    };

    // Fonction pour gérer le changement du code
    const handleCodeChange = (e) => {
        const code = e.target.value.toUpperCase().trim();
        setInviteCode(code);

        // Valider automatiquement si le code a la bonne longueur
        if (code.length === 6) {
            validateInviteCode(code);
        } else {
            setValidationResult(null);
            setError('');
        }
    };

    // Fonction pour rejoindre l'organisation
    const handleJoinOrganization = async () => {
        if (!validationResult) return;

        try {
            await onJoinOrg(inviteCode, validationResult);
        } catch (err) {
            setError('Erreur lors de l\'adhésion à l\'organisation');
        }
    };

    return (
        <>
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">
                            Rejoindre une organisation
                        </h2>
                        <p className="text-purple-100 text-sm">
                            Entrez le code d'invitation que vous avez reçu
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 animate-fade-in">

                {/* Explication */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        Comment obtenir un code d'invitation ?
                    </h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Demandez à un administrateur de votre organisation</li>
                        <li>• Vérifiez votre boîte email si vous avez reçu une invitation</li>
                        <li>• Le code est composé de 6 caractères (lettres et chiffres)</li>
                    </ul>
                </div>

                {/* Formulaire de saisie du code */}
                <div>
                    <label htmlFor="inviteCode" className="block text-sm font-medium text-slate-700 mb-2">
                        Code d'invitation *
                    </label>
                    <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            id="inviteCode"
                            value={inviteCode}
                            onChange={handleCodeChange}
                            maxLength={6}
                            className={`w-full pl-11 pr-12 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 text-center text-2xl font-mono tracking-widest uppercase transition-all ${
                                error
                                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                    : validationResult
                                        ? 'border-green-300 focus:ring-green-500 bg-green-50'
                                        : 'border-slate-300 focus:ring-purple-500'
                            }`}
                            placeholder="ABC123"
                            autoFocus
                        />

                        {/* Indicateur de statut */}
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {isValidating && (
                                <Loader className="w-5 h-5 text-purple-600 animate-spin" />
                            )}
                            {!isValidating && validationResult && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                            {!isValidating && error && (
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            )}
                        </div>
                    </div>

                    {/* Message d'erreur */}
                    {error && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </p>
                    )}

                    {/* Helper text */}
                    {!error && !validationResult && (
                        <p className="mt-2 text-sm text-slate-500">
                            Entrez les 6 caractères de votre code d'invitation
                        </p>
                    )}
                </div>

                {/* Résultat de la validation */}
                {validationResult && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 space-y-4 animate-fade-in">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-green-900 mb-1">
                                    Code valide !
                                </h3>
                                <p className="text-sm text-green-700">
                                    Vous êtes sur le point de rejoindre une organisation
                                </p>
                            </div>
                        </div>

                        {/* Détails de l'organisation */}
                        <div className="bg-white rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Organisation :</span>
                                <span className="font-semibold text-slate-900">
                  {validationResult.organizationName}
                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Invité par :</span>
                                <span className="font-medium text-slate-900">
                  {validationResult.invitedBy}
                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Votre rôle :</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {validationResult.role}
                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Membres :</span>
                                <span className="font-medium text-slate-900">
                  {validationResult.memberCount} personnes
                </span>
                            </div>
                        </div>

                        {/* Bouton de confirmation */}
                        <button
                            onClick={handleJoinOrganization}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Rejoindre {validationResult.organizationName}
                        </button>
                    </div>
                )}

                {/* Exemple de codes (pour la démo) */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-xs text-slate-600 mb-2">
                        <strong>💡 Codes de démonstration :</strong>
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => {
                                setInviteCode('ABC123');
                                validateInviteCode('ABC123');
                            }}
                            className="px-3 py-2 bg-white border border-slate-300 rounded text-sm font-mono hover:bg-slate-50 transition-colors"
                        >
                            ABC123
                        </button>
                        <button
                            onClick={() => {
                                setInviteCode('XYZ789');
                                validateInviteCode('XYZ789');
                            }}
                            className="px-3 py-2 bg-white border border-slate-300 rounded text-sm font-mono hover:bg-slate-50 transition-colors"
                        >
                            XYZ789
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        Cliquez sur un code pour tester
                    </p>
                </div>

            </div>
        </>
    );
};

export default JoinOrganizationView;
