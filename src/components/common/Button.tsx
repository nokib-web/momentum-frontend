import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    loading?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    loading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:ring-indigo-500',
        danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner size="sm" className="mr-2 text-current" />}
            {children}
        </button>
    );
};
