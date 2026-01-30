import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    register?: UseFormRegisterReturn;
}

export const Input = ({
    label,
    error,
    register,
    className = '',
    id,
    autoComplete,
    ...props
}: InputProps) => {
    const inputId = id || props.name;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={inputId}
                    autoComplete={autoComplete || (props.type === 'password' ? 'current-password' : props.type === 'email' ? 'email' : 'off')}
                    className={`
            block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400
            ${error
                            ? 'border-red-300 text-red-900 dark:border-red-600 dark:text-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }
            disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400
          `}
                    {...register}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400" id={`${inputId}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
};
