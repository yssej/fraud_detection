import React, {useEffect, useState} from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, Building, CheckCircle2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { getPasswordCriteria,calculatePasswordStrength,getPasswordStrengthLabel } from '../utils/PasswordUtils.js';
import userService from "../services/user.service.js";
import authService from "../services/auth.service.js";
import toast from "react-hot-toast";

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

    // Calculer la force du mot de passe actuel
    const passwordStrength = calculatePasswordStrength(watch('password'));
    const strengthInfo = getPasswordStrengthLabel(passwordStrength);

    // Critères de validation du mot de passe
    const passwordCriteria = getPasswordCriteria(password);

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
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                                    Nom d'utilisateur *
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        {...register('username', { required: 'Le champ nom est requis' })}
                                        className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            errors.username
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder="Jean Dupont"
                                    />
                                </div>
                                {errors?.username && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.username.message || 'errors occurs'}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                    Adresse email *
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        {...register('email', {
                                            required: 'Le champ email est requis',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Adresse email invalide'
                                            },
                                            validate: {
                                                async isUnique(value) {
                                                    const {data} = await userService.isEmailExist(value);
                                                    console.log('isEmailExists:', data);
                                                    if (data.isTaken) {
                                                        return 'Cet email existe déjà.  ';
                                                    }
                                                    return true;
                                                }
                                            }
                                        })}
                                        className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            errors.email
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder="vous@exemple.com"
                                    />
                                </div>
                                {errors?.email && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.email.message || 'errors occurs'}
                                    </p>
                                )}
                            </div>

                        </div>

                        {/* Entreprise (optionnel) */}
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                                Entreprise (optionnel)
                            </label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    {...register('company', {required: false})}
                                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.company
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-slate-300 focus:ring-blue-500'
                                    }`}
                                    placeholder="Votre entreprise"
                                />
                            </div>
                            {errors.company && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.company}
                                </p>
                            )}
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                Mot de passe *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
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
                                    className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.password
                                            ? 'border-red-300 focus:ring-red-500'
                                            : calculatePasswordStrength(watch('password')) > 4
                                                ? 'border-green-300 focus:ring-green-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                    }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Barre de force du mot de passe */}
                            {watch('password') && (
                                <div className="mt-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${strengthInfo.color} transition-all duration-300`}
                                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-sm font-medium ${
                                            strengthInfo.color === 'bg-red-500' ? 'text-red-600' :
                                                strengthInfo.color === 'bg-orange-500' ? 'text-orange-600' :
                                                    'text-green-600'
                                        }`}>
                                          {strengthInfo.text}
                                        </span>
                                    </div>

                                    {/* Liste des critères */}
                                    <div className="space-y-1">
                                        {passwordCriteria.map((criterion, index) => (
                                            <div key={index} className="flex items-center gap-2 text-xs">
                                                {criterion.met ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <X className="w-4 h-4 text-slate-400" />
                                                )}
                                                <span className={criterion.met ? 'text-green-700' : 'text-slate-500'}>
                                                    {criterion.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!watch('password') && errors?.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.password.message || 'errors occurs'}
                                </p>
                            )}
                        </div>

                        {/* Confirmation mot de passe */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                                Confirmer le mot de passe *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    {...register('confirmPassword', {
                                        required: "La confirmation est requise",
                                        validate: value => value === password || 'Les mots de passe ne correspondent pas'
                                    })}
                                    className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.confirmPassword
                                            ? 'border-red-300 focus:ring-red-500'
                                            : watch('confirmPassword') && watch('password') === watch('confirmPassword')
                                                ? 'border-green-300 focus:ring-green-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                    }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Indicateur de correspondance */}
                            {watch('confirmPassword') && !errors?.confirmPassword && (
                                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Les mots de passe correspondent
                                </p>
                            )}

                            {errors?.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

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
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Se connecter
                        </a>
                    </p>

                    {/* Note de test */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-800 text-center">
                            <strong>💡 Pour tester :</strong>
                            <br />
                            • L'email "existe@example.com" simule un email déjà utilisé
                            <br />
                            • Tout autre email réussira l'inscription
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Register;
