interface BadgeProps {
    text: string;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
    className?: string;
}

export const Badge = ({ text, variant = 'default', className = '' }: BadgeProps) => {
    const variants = {
        primary: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        success: 'bg-green-100 text-green-800 border-green-200',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        danger: 'bg-red-100 text-red-800 border-red-200',
        info: 'bg-blue-100 text-blue-800 border-blue-200',
        default: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
        >
            {text}
        </span>
    );
};
