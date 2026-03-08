/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { User, AuthResponse } from '../types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: AuthResponse) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }, []);

    const login = useCallback((data: AuthResponse) => {
        const { token: authToken, user: authUser } = data;
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(authUser));
        setToken(authToken);
        setUser(authUser);
    }, []);

    useEffect(() => {
        if (token) {
            try {
                // Basic check if token is expired
                const decoded: { exp: number } = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    setTimeout(() => logout(), 0);
                }
            } catch (error) {
                console.error('Invalid token', error);
                // Defer logout to avoid setState in effect warning
                setTimeout(() => logout(), 0);
            }
        }
        // Defer setLoading to avoid setState in effect warning
        setTimeout(() => setLoading(false), 0);
    }, [token, logout]);

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

