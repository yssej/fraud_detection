import React, { useState } from 'react';
import { useUser} from "../../context/userContext.jsx";
import { User, Mail, Building, Save, Camera } from 'lucide-react';

const ProfilePage = () => {
    const { userData } = useUser();

    const [formData, setFormData] = useState({
        name: userData?.username || '',
        email: userData?.email || '',
        company: userData?.company || '',
        phone: '',
        bio: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici tu ferais l'appel API pour mettre à jour le profil
        console.log('Profil mis à jour:', formData);
        setIsEditing(false);
        alert('Profil mis à jour avec succès !');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            {/* En-tête */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Profil utilisateur</h1>
                <p className="text-slate-600 mt-1">
                    Gérez vos informations personnelles et vos préférences
                </p>
            </div>

            {/* Carte de profil */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

                {/* Banner */}
                <div className="h-32 bg-gradient-to-br from-blue-600 to-cyan-600"></div>

                {/* Contenu */}
                <div className="px-8 pb-8">

                    {/* Photo de profil */}
                    <div className="relative -mt-16 mb-6">
                        <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-5xl font-bold text-blue-600">
                {userData?.username?.charAt(0) || 'U'}
              </span>
                        </div>
                        <button className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                            <Camera className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {userData?.name || 'Utilisateur'}
                                </h2>
                                <p className="text-slate-600">
                                    {userData?.email}
                                </p>
                            </div>

                            {!isEditing ? (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                                >
                                    Modifier le profil
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Enregistrer
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Champs du formulaire */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Nom */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Nom complet
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            isEditing ? 'bg-white' : 'bg-slate-50'
                                        }`}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            isEditing ? 'bg-white' : 'bg-slate-50'
                                        }`}
                                    />
                                </div>
                            </div>

                            {/* Entreprise */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Entreprise
                                </label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            isEditing ? 'bg-white' : 'bg-slate-50'
                                        }`}
                                    />
                                </div>
                            </div>

                            {/* Téléphone */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        isEditing ? 'bg-white' : 'bg-slate-50'
                                    }`}
                                    placeholder="+33 6 12 34 56 78"
                                />
                            </div>

                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Biographie
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows={4}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    isEditing ? 'bg-white' : 'bg-slate-50'
                                }`}
                                placeholder="Parlez-nous un peu de vous..."
                            />
                        </div>

                    </form>

                </div>

            </div>

            {/* Section sécurité */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Sécurité du compte
                </h3>

                <div className="space-y-3">
                    <button className="w-full md:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
                        Changer le mot de passe
                    </button>

                    <button className="w-full md:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors ml-0 md:ml-3">
                        Activer l'authentification à 2 facteurs
                    </button>
                </div>
            </div>

            {/* Section danger */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Zone de danger
                </h3>
                <p className="text-red-700 text-sm mb-4">
                    La suppression de votre compte est irréversible. Toutes vos données seront définitivement perdues.
                </p>
                <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                    Supprimer mon compte
                </button>
            </div>

        </div>
    );
};

export default ProfilePage;
