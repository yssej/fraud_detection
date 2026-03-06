import React, {useState} from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, Building, CheckCircle2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import userService from "../services/user.service.js";
import authService from "../services/auth.service.js";
import toast from "react-hot-toast";
import Input from "../components/Input.jsx";
import FormField from "../components/FormField.jsx";
import {Link} from "react-router-dom";

const Register = () => {
    // State pour les valeurs du formulaire
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm(
        {
            mode: 'onBlur',
            defaultValues: {
                username: '',
                email: '',
                company: '',
                password: '',
                confirmPassword: '',
                terms: false
            }
        }
    );

    const password = watch("password");

    // State pour afficher/masquer les mots de passe
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State pour le chargement
    const [isLoading, setIsLoading] = useState(false);

    // State pour le succès de l'inscription
    const [isSuccess, setIsSuccess] = useState(false);

    // Fonction de soumission
    const onSubmit = async (data) => {
        // e.preventDefault();
        const { username, email, company, password } = data;
        setIsLoading(true);

        try {
            await authService.register({username, email, company, password});
            toast.success('Inscription réussie !');
            setIsSuccess(true);

        } catch (error) {
            toast.error('Erreur lors de l\'inscription');
            console.error('Erreur inscription:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Affichage du message de succès
    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6 py-12">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            Bienvenue sur RiskMonitor !
                        </h2>

                        <p className="text-slate-600 mb-6">
                            Votre compte a été créé avec succès. Nous vous avons envoyé un email de confirmation à <strong>{watch('email')}</strong>.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.href = '/login'}
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200"
                            >
                                Se connecter maintenant
                            </button>

                            <button
                                onClick={() => setIsSuccess(false)}
                                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-all duration-200"
                            >
                                Créer un autre compte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6 py-12">
            <div className="max-w-2xl w-full">

                {/* Carte d'inscription */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">

                    {/* En-tête */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            Créer un compte
                        </h2>
                        <p className="text-slate-600">
                            Commencez à surveiller vos risques financiers dès aujourd'hui
                        </p>
                    </div>

                    {/* Erreur générale de soumission */}
                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-red-800 text-sm">{errors.submit}</p>
                        </div>
                    )}

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Ligne 1 : Nom et Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Nom complet */}
                            <FormField label="Nom d'utilisateur" id="username" icon={User} error={errors.username} required>
                                <Input
                                    id="username"
                                    placeholder="Jean Dupont"
                                    error={errors.username}
                                    {...register('username', {
                                        required: 'Le champ nom est requis',
                                        validate: {
                                            isUnique: async (v) => {
                                                const { data } = await userService.isUsernameExist(v);
                                                console.log('data = ', data);
                                                return !data.isTaken || 'Ce nom d\'utilisateur existe déjà.';
                                            }
                                        }
                                    })}
                                />
                            </FormField>

                            {/* Email */}
                            <FormField label="Adresse email" id="email" icon={Mail} error={errors.email} required>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="vous@exemple.com"
                                    error={errors.email}
                                    {...register('email', {
                                        required: 'Le champ email est requis',
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' },
                                        validate: {
                                            isUnique: async (v) => {
                                                const { data } = await userService.isEmailExist(v);
                                                return !data.isTaken || 'Cet email existe déjà.';
                                            }
                                        }
                                    })}
                                />
                            </FormField>
                        </div>

                        {/* Entreprise (optionnel) */}
                        <FormField label="Entreprise (optionnel)" id="company" icon={Building} error={errors.company}>
                            <Input
                                id="company"
                                placeholder="Votre entreprise"
                                {...register('company')}
                            />
                        </FormField>

                        {/* Mot de passe */}
                        <FormField label="Mot de passe" id="password" icon={Lock} error={errors.password} password={password} required>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="pr-12"
                                error={errors.password}
                                {...register('password', {
                                    required: 'Le mot de passe est requis',
                                    validate: {
                                        minLength: (v) => v.length >= 8 || 'Au moins 8 caractères',
                                        uppercase: (v) => /[A-Z]/.test(v) || 'Une lettre majuscule',
                                        lowercase: (v) => /[a-z]/.test(v) || 'Une lettre minuscule',
                                        number: (v) => /[0-9]/.test(v) || 'Un chiffre',
                                        special: (v) => /[^A-Za-z0-9]/.test(v) || 'Un caractère spécial',
                                    }
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </FormField>

                        {/* Confirmation mot de passe */}
                        <FormField label="Mot de passe" id="password" icon={Lock} error={errors.confirmPassword} required>
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                className="pr-12"
                                error={errors.confirmPassword}
                                {...register('confirmPassword', {
                                    required: "La confirmation est requise",
                                    validate: value => value === password || 'Les mots de passe ne correspondent pas'
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            {watch('confirmPassword') && !errors?.confirmPassword && (
                                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Les mots de passe correspondent
                                </p>
                            )}
                        </FormField>

                        {/* Acceptation des CGU */}
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register('terms', { required: 'Vous devez accepter les conditions d\'utilisation' })}
                                    className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mt-0.5"
                                />
                                <span className="text-sm text-slate-600">
                                    J'accepte les{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                        conditions d'utilisation
                                    </a>
                                    {' '}et la{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                        politique de confidentialité
                                    </a>
                                </span>
                            </label>
                            {errors?.terms && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.terms.message || 'errors occurs'}
                                </p>
                            )}
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
                                  Création en cours...
                                </span>
                            ) : (
                                "Créer mon compte"
                            )}
                        </button>

                    </form>

                    {/* Lien vers le login */}
                    <p className="mt-6 text-center text-sm text-slate-600">
                        Vous avez déjà un compte ?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Se connecter
                        </Link>
                    </p>

                </div>

            </div>
        </div>
    );
};

export default Register;
