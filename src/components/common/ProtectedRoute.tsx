import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { Role } from '../../types';
import type { ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: Role[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
                    <p className="text-gray-600 mb-6">You do not have permission to access this page.</p>
                    <Navigate to="/dashboard" replace />
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
