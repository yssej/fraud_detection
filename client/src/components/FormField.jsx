import React from 'react';
import {AlertCircle, CheckCircle2, X} from 'lucide-react';
import {calculatePasswordStrength, getPasswordCriteria, getPasswordStrengthLabel} from "../utils/PasswordUtils.js";

const FormField = ({
    label,
    id,
    icon: Icon,
    error,
    children,
    password = '',
    required = false
}) => {
    // Calculer la force du mot de passe actuel
    const passwordStrength = calculatePasswordStrength(password);
    const strengthInfo = getPasswordStrengthLabel(passwordStrength);

    // Critères de validation du mot de passe
    const passwordCriteria = getPasswordCriteria(password);
    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
                {label} {required && '*'}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                )}
                {children}
            </div>
            {password && (
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
            {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error.message || "Une erreur est survenue"}
                </p>
            )}
        </div>
    );
};

export default FormField;
