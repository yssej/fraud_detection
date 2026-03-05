import { useForm } from "react-hook-form";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock } from "lucide-react";
import React, { useState, useEffect } from "react";

const Draft = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        trigger // Nécessaire pour revalider dynamiquement.
    } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    const password = watch('password');

    // Surveiller les changements dans le mot de passe pour revalider `confirmPassword`
    useEffect(() => {
        trigger('confirmPassword');
    }, [password, trigger]);

    return (
        <>
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
                        {...register('password', { required: "Le mot de passe est requis" })}
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

                {errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.password.message}
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
                            validate: value => value === password || 'Les mots de passe ne correspondent pas' // Validation
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
                {watch('password') === watch('confirmPassword') && (
                    <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Les mots de passe correspondent
                    </p>
                )}

                {watch('password') !== watch('confirmPassword') && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Les mots de passe ne correspondent pas
                    </p>
                )}
            </div>
        </>
    );
};

export default Draft;
