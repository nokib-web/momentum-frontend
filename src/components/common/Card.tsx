import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

export const Card = ({ children, title, className = '' }: CardProps) => {
    return (
        <div className={`bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200 ${className}`}>
            {title && (
                <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{title}</h3>
                </div>
            )}
            <div className="px-4 py-5 sm:p-6">{children}</div>
        </div>
    );
};
