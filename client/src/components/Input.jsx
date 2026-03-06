import React, { forwardRef } from 'react';

const Input = forwardRef(({ error, hasIcon = true, className = '', ...props }, ref) => {
    return (
        <input
            ref={ref}
            {...props}
            className={`w-full ${hasIcon ? 'pl-11' : 'px-4'} pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                error
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-slate-300 focus:ring-blue-500'
            } ${className}`}
        />
    );
});

Input.displayName = 'Input';
export default Input;
