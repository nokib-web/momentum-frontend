import type { SelectHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Option[];
    error?: string;
    register?: UseFormRegisterReturn;
}

export const Select = ({
    label,
    options,
    error,
    register,
    className = '',
    id,
    ...props
}: SelectProps) => {
    const selectId = id || props.name;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`
          block w-full px-3 py-2 border rounded-md shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
          dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
          ${error ? 'border-red-300 text-red-900 dark:border-red-600 dark:text-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}
          disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400
        `}
                {...register}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400" id={`${selectId}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
};
