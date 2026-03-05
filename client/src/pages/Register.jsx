import React, {useEffect, useState} from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, Building, CheckCircle2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Register = () => {
    // State pour les valeurs du formulaire
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm(
        {
            defaultValues: {
                name: '',
                email: '',
                company: '',
                password: '',
                confirmPassword: '',
                terms: false
            }
        }
    );

    const password = watch("password");

    // State pour les erreurs de validation
    // const [errors, setErrors] = useState({});

    // State pour afficher/masquer les mots de passe
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State pour le chargement
    const [isLoading, setIsLoading] = useState(false);

    // State pour le succès de l'inscription
    const [isSuccess, setIsSuccess] = useState(false);

    // State pour l'acceptation des CGU
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    // Fonction pour calculer la force du mot de passe
    const calculatePasswordStrength = (password) => {
        let strength = 0;

        if(!password) return ;
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        return strength;
    };

    // Fonction pour obtenir le label de force
    const getPasswordStrengthLabel = (strength) => {
        if (strength <= 2) return { text: 'Faible', color: 'bg-red-500' };
        if (strength <= 4) return { text: 'Moyen', color: 'bg-orange-500' };
        return { text: 'Fort', color: 'bg-green-500' };
    };

    // Calculer la force du mot de passe actuel
    const passwordStrength = calculatePasswordStrength(watch('password'));
    const strengthInfo = getPasswordStrengthLabel(passwordStrength);

    // Critères de validation du mot de passe
    const passwordCriteria = [
        {
            label: 'Au moins 8 caractères',
            met: watch('password')?.length >= 8
        },
        {
            label: 'Une lettre majuscule',
            met: /[A-Z]/.test(watch('password'))
        },
        {
            label: 'Une lettre minuscule',
            met: /[a-z]/.test(watch('password'))
        },
        {
            label: 'Un chiffre',
            met: /[0-9]/.test(watch('password'))
        },
        {
            label: 'Un caractère spécial (@, #, $, etc.)',
            met: /[^A-Za-z0-9]/.test(watch('password'))
        }
    ];

    // Fonction pour gérer le changement des inputs
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    //
    //     // Efface l'erreur du champ dès que l'utilisateur tape
    //     if (errors[name]) {
    //         setErrors(prev => ({
    //             ...prev,
    //             [name]: ''
    //         }));
    //     }
    //
    //     // Validation en temps réel pour confirmPassword
    //     if (name === 'confirmPassword' || name === 'password') {
    //         if (name === 'confirmPassword' && value !== formData.password) {
    //             setErrors(prev => ({
    //                 ...prev,
    //                 confirmPassword: 'Les mots de passe ne correspondent pas'
    //             }));
    //         } else if (name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
    //             setErrors(prev => ({
    //                 ...prev,
    //                 confirmPassword: 'Les mots de passe ne correspondent pas'
    //             }));
    //         } else {
    //             setErrors(prev => ({
    //                 ...prev,
    //                 confirmPassword: ''
    //             }));
    //         }
    //     }
    // };

    // Fonction de validation complète
    const validate = () => {
        const newErrors = {};

        // Validation nom
        if (!watch('name').trim()) {
            newErrors.name = "Le nom est requis";
        } else if (watch('name').trim().length < 2) {
            newErrors.name = "Le nom doit contenir au moins 2 caractères";
        }

        // Validation email
        if (!watch('email')) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(watch('email'))) {
            newErrors.email = "L'email n'est pas valide";
        }

        // Validation entreprise (optionnelle mais si remplie, minimum 2 caractères)
        if (watch('company') && watch('company').trim().length < 2) {
            newErrors.company = "Le nom de l'entreprise doit contenir au moins 2 caractères";
        }

        // Validation mot de passe
        if (!watch('password')) {
            newErrors.password = "Le mot de passe est requis";
        } else {
            if (watch('password').length < 8) {
                newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
            }
            if (!/[A-Z]/.test(watch('password'))) {
                newErrors.password = "Le mot de passe doit contenir au moins une majuscule";
            }
            if (!/[a-z]/.test(watch('password'))) {
                newErrors.password = "Le mot de passe doit contenir au moins une minuscule";
            }
            if (!/[0-9]/.test(watch('password'))) {
                newErrors.password = "Le mot de passe doit contenir au moins un chiffre";
            }
        }

        // Validation confirmation mot de passe
        if (!watch('confirmPassword')) {
            newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
        } else if (watch('password') !== watch('confirmPassword')) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }

        // Validation CGU
        if (!acceptedTerms) {
            newErrors.terms = "Vous devez accepter les conditions d'utilisation";
        }

        return newErrors;
    };

    // Fonction de soumission
    const submit = async (e) => {
        e.preventDefault();

        // Valide le formulaire
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        try {
            // Simulation d'appel API
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulation : vérifier si l'email existe déjà
            if (watch('email') === 'existe@example.com') {
                setErrors({
                    email: 'Cet email est déjà utilisé. Essayez de vous connecter.'
                });
                setIsLoading(false);
                return;
            }

            // Ici tu ferais l'appel API réel
            // const response = await fetch('/api/auth/register', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   credentials: 'include',
            //   body: JSON.stringify({
            //     name: formData.name,
            //     email: formData.email,
            //     company: formData.company,
            //     password: formData.password
            //   })
            // });

            console.log('✅ Inscription réussie !', {
                name: watch('name'),
                email: watch('email'),
                company: watch('company')
            });

            // Afficher le message de succès
            setIsSuccess(true);

        } catch (error) {
            setErrors({
                submit: 'Une erreur est survenue. Veuillez réessayer.'
            });
            console.error('Erreur inscription:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Errors:', errors);
    }, [errors])

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
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Ligne 1 : Nom et Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Nom complet */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                    Nom complet *
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        {...register('name', { required: true })}
                                        className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            errors.name
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder="Jean Dupont"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.name}
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
                                        {...register('email', { required: true })}
                                        className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                            errors.email
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder="vous@exemple.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.email}
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
                                    {...register('password', { required: true })}
                                    className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        errors.password
                                            ? 'border-red-300 focus:ring-red-500'
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
                                                style={{ width: `${(passwordStrength / 6) * 100}%` }}
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

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.password}
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
                            {watch('confirmPassword') && watch ('password') === watch('confirmPassword') && (
                                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Les mots de passe correspondent
                                </p>
                            )}

                            {watch('confirmPassword') && watch ('password') !== watch('confirmPassword') && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    Les mots de passe ne correspondent pas
                                </p>
                            )}
                        </div>

                        {/* Acceptation des CGU */}
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(e) => {
                                        setAcceptedTerms(e.target.checked);
                                        if (e.target.checked && errors.terms) {
                                            setErrors(prev => ({ ...prev, terms: '' }));
                                        }
                                    }}
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
                            {errors.terms && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.terms}
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
