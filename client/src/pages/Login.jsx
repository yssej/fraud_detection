import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
    // State pour les valeurs du formulaire - Pattern d'objet pour plusieurs inputs
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // State pour les erreurs de validation
    const [errors, setErrors] = useState({});

    // State pour afficher/masquer le mot de passe
    const [showPassword, setShowPassword] = useState(false);

    // State pour le chargement (pendant la connexion)
    const [isLoading, setIsLoading] = useState(false);

    // State pour l'erreur générale de connexion
    const [loginError, setLoginError] = useState('');

    // Fonction pour gérer le changement des inputs
    // Pattern professionnel : un seul handler pour tous les inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Met à jour la valeur dans formData
        setFormData(prev => ({
            ...prev,  // Garde les autres valeurs
            [name]: value  // Met à jour seulement le champ modifié
        }));

        // Efface l'erreur du champ dès que l'utilisateur tape
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Fonction de validation
    const validate = () => {
        const newErrors = {};

        // Validation email
        if (!formData.email) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "L'email n'est pas valide";
        }

        // Validation mot de passe
        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis";
        } else if (formData.password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
        }

        return newErrors;
    };

    // Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Efface l'erreur générale précédente
        setLoginError('');

        // Valide le formulaire
        const validationErrors = validate();

        // Si il y a des erreurs, on les affiche et on arrête
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Simulation d'un appel API
        setIsLoading(true);

        try {
            // Ici tu ferais un vrai appel API
            // const response = await fetch('/api/login', { ... });

            // Simulation avec setTimeout
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulation : si l'email contient "test", connexion réussie
            if (formData.email.includes('test')) {
                console.log('Connexion réussie !', formData);
                alert('Connexion réussie ! En production, tu serais redirigé vers le dashboard.');
                // Ici tu ferais : navigate('/dashboard');
            } else {
                // Simulation d'une erreur
                setLoginError('Email ou mot de passe incorrect');
            }

        } catch (error) {
            setLoginError('Une erreur est survenue. Veuillez réessayer.');
            console.error('Erreur de connexion:', error);
        } finally {
            // finally s'exécute toujours, même en cas d'erreur
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6 py-12">
            <div className="max-w-2xl w-full">

                {/* Carte de connexion */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">

                    {/* En-tête */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            Bon retour !
                        </h2>
                        <p className="text-slate-600">
                            Connectez-vous à votre compte RiskMonitor
                        </p>
                    </div>

                    {/* Erreur générale de connexion */}
                    {loginError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-red-800 text-sm">{loginError}</p>
                        </div>
                    )}

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Champ Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Adresse email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.email
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-slate-300 focus:ring-blue-500'
                                    }`}
                                    placeholder="vous@exemple.com"
                                />
                            </div>
                            {/* Message d'erreur pour l'email */}
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Champ Mot de passe */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.password
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-slate-300 focus:ring-blue-500'
                                    }`}
                                    placeholder="••••••••"
                                />
                                {/* Bouton pour afficher/masquer le mot de passe */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {/* Message d'erreur pour le mot de passe */}
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Options : Se souvenir de moi + Mot de passe oublié */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-slate-600">Se souvenir de moi</span>
                            </label>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                Mot de passe oublié ?
                            </a>
                        </div>

                        {/* Bouton de soumission */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                                isLoading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-105'
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Connexion en cours...
                </span>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>

                    {/* Séparateur */}
                    <div className="mt-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-slate-200"></div>
                        <span className="text-sm text-slate-500">ou</span>
                        <div className="flex-1 h-px bg-slate-200"></div>
                    </div>

                    {/* Lien vers l'inscription */}
                    <p className="mt-6 text-center text-sm text-slate-600">
                        Vous n'avez pas de compte ?{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Créer un compte
                        </a>
                    </p>

                    {/* Bouton retour vers landing page */}
                    <a
                        href="#"
                        className="mt-4 block text-center text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        ← Retour à l'accueil
                    </a>

                </div>

                {/* Note pour le test */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 text-center">
                        <strong>💡 Pour tester :</strong> Utilise un email contenant "test" (ex: test@example.com) et n'importe quel mot de passe de 6+ caractères.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;
