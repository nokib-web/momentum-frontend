import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import type { Role } from '../types';

export const useRequireRole = (allowedRoles: Role[]) => {
    const { user, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                navigate('/login');
            } else if (user && !allowedRoles.includes(user.role)) {
                console.error('Access denied: Unauthorized role');
                navigate('/dashboard'); // Or another appropriate route
            }
        }
    }, [user, isAuthenticated, loading, allowedRoles, navigate]);

    return { user, loading };
};
