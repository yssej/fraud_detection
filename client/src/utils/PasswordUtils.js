export const getPasswordCriteria = (password = '') => {
    return [
        {
            label: 'Au moins 8 caractères',
            met: password.length >= 8
        },
        {
            label: 'Une lettre majuscule',
            met: /[A-Z]/.test(password)
        },
        {
            label: 'Une lettre minuscule',
            met: /[a-z]/.test(password)
        },
        {
            label: 'Un chiffre',
            met: /[0-9]/.test(password)
        },
        {
            label: 'Un caractère spécial (@, #, $, etc.)',
            met: /[^A-Za-z0-9]/.test(password)
        }
    ];
};

export const calculatePasswordStrength = (password) => {
    let strength = 0;

    if(!password) return ;
    if (password.length >= 8) strength += 1;
    // if (password.length >= 12) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
};

export const getPasswordStrengthLabel = (strength) => {
    if (strength <= 2) return { text: 'Faible', color: 'bg-red-500' };
    if (strength <= 4) return { text: 'Moyen', color: 'bg-orange-500' };
    return { text: 'Fort', color: 'bg-green-500' };
};
