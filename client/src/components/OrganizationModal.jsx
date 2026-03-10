import React, { useState } from 'react';
import {Building, Plus, Users, X, ArrowRight} from 'lucide-react';
import Input from "./Input.jsx";
import FormField from "./FormField.jsx";
import {useForm} from "react-hook-form";
import organizationService from "../services/organization.service.js";

const OrganizationModal = ({ isOpen, onClose, onCreateOrg, onContinueWithout }) => {
    const [isCreating, setIsCreating] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm(
        {
            mode: 'onBlur',
            defaultValues: {
                companyName: ''
            }
        }
    );

    // Fermer le modal si on clique en dehors (optionnel)
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            // Ne pas permettre de fermer en cliquant en dehors
            // Car c'est une action importante
            // onClose();
        }
    };

    const handleCreateOrganization = async (data) => {

        try {
            const { name } = data;
            await onCreateOrg(name);
            setIsCreating(false);
        } catch (error) {
            console.error('Erreur création organisation:', error);
        }
    };

    const handleContinue = () => {
        onContinueWithout();
    };

    // Ne rien afficher si le modal n'est pas ouvert
    if (!isOpen) return null;

    return (
        // Backdrop
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-scale-in"
            onClick={handleBackdropClick}
        >
            {/* Modal */}
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in">

                {!isCreating ? (
                    // Vue principale : Choix entre créer ou continuer
                    <>
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">
                                Bienvenue sur RiskMonitor !
                            </h2>
                            <p className="text-blue-100">
                                Vous n'êtes membre d'aucune organisation
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">
                            <p className="text-slate-600 text-center text-lg">
                                Pour profiter pleinement de la plateforme, nous vous recommandons de rejoindre ou créer une organisation.
                            </p>

                            {/* Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Option 1 : Créer une organisation */}
                                <button
                                    onClick={() => setIsCreating(true)}
                                    className="group p-6 border-2 border-blue-200 hover:border-blue-500 rounded-xl transition-all duration-200 hover:shadow-lg"
                                >
                                    <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center mb-4 transition-colors">
                                        <Plus className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                        Créer une organisation
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        Créez votre propre organisation et invitez votre équipe
                                    </p>
                                    <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700 font-medium">
                                        Commencer
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>

                                {/* Option 2 : Rejoindre une organisation */}
                                <button
                                    onClick={() => alert('Fonctionnalité à venir : rejoindre une organisation via invitation')}
                                    className="group p-6 border-2 border-slate-200 hover:border-slate-400 rounded-xl transition-all duration-200 hover:shadow-lg"
                                >
                                    <div className="w-12 h-12 bg-slate-100 group-hover:bg-slate-200 rounded-lg flex items-center justify-center mb-4 transition-colors">
                                        <Users className="w-6 h-6 text-slate-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                        Rejoindre une organisation
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        Vous avez reçu une invitation ? Rejoignez une équipe existante
                                    </p>
                                    <div className="mt-4 flex items-center text-slate-600 group-hover:text-slate-700 font-medium">
                                        Rejoindre
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>

                            </div>

                            {/* Option 3 : Continuer sans organisation */}
                            <div className="pt-6 border-t border-slate-200">
                                <button
                                    onClick={handleContinue}
                                    className="w-full py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                                >
                                    Continuer sans organisation pour le moment
                                </button>
                                <p className="text-xs text-slate-500 text-center mt-2">
                                    Vous pourrez en créer une ou rejoindre une plus tard depuis votre profil
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    // Vue création : Formulaire de création d'organisation
                    <>
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">
                                    Créer une organisation
                                </h2>
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(handleCreateOrganization)} className="p-8 space-y-6">
                            <div>
                                <div className="relative">
                                    <FormField label="Nom de l'organisation" id="username" icon={Building} error={errors.name} required>
                                        <Input
                                            id="name"
                                            placeholder="My company"
                                            error={errors.name}
                                            {...register('name', {
                                                required: 'Ce champ est requis',
                                                validate: {
                                                    isUnique: async (v) => {
                                                        const { data } = await organizationService.isNameTaken(v);
                                                        return !data.isTaken || 'Ce nom est déjà prise. Veuillez en choisir un autre.';
                                                    }
                                                }
                                            })}
                                        />
                                    </FormField>
                                </div>
                                <p className="mt-2 text-sm text-slate-500">
                                    Ce nom sera visible par tous les membres de votre organisation
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-900 mb-2">
                                    Ce que vous pourrez faire ensuite :
                                </h4>
                                <ul className="space-y-2 text-sm text-blue-800">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">✓</span>
                                        Inviter des membres à rejoindre votre organisation
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">✓</span>
                                        Partager des risques et analyses en équipe
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">✓</span>
                                        Gérer les permissions et rôles
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">✓</span>
                                        Accéder aux tableaux de bord collaboratifs
                                    </li>
                                </ul>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsCreating(false)}
                                    className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
                                >
                                    Retour
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Créer l'organisation
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default OrganizationModal;
