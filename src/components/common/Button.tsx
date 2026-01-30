import type { ButtonHTMLAttributes } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const baseStyles = 'inline-flex items-center justify-center border border-transparent font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-indigo-500',
        danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
    };

    return (
        <button
            className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner size="sm" className="mr-2 text-current" />}
            {children}
        </button>
    );
};
