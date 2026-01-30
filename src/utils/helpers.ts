import type { Role, UserStatus, ProjectStatus } from '../types';

/**
 * Formats a date string or Date object into a readable format
 */
export const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

/**
 * Truncates text to a maximum length and adds ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Returns Tailwind color classes for role badges
 */
export const getRoleBadgeColor = (role: Role): string => {
    const colors = {
        ADMIN: 'bg-purple-100 text-purple-800 border-purple-200',
        MANAGER: 'bg-blue-100 text-blue-800 border-blue-200',
        STAFF: 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[role] || 'bg-gray-100 text-gray-800 border-gray-200';
};

/**
 * Returns Tailwind color classes for status badges
 */
export const getStatusBadgeColor = (status: UserStatus | ProjectStatus): string => {
    const colors = {
        ACTIVE: 'bg-green-100 text-green-800 border-green-200',
        INACTIVE: 'bg-red-100 text-red-800 border-red-200',
        ARCHIVED: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        DELETED: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formats a role or status for display
 */
export const formatLabel = (value: string): string => {
    return value
        .split('_')
        .map(word => capitalize(word))
        .join(' ');
};
