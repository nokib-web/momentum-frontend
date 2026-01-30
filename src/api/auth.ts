import api from '../lib/axios';
import type { AuthResponse, Role } from '../types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
};

export const registerViaInvite = async (
    name: string,
    password: string,
    inviteToken: string
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register-via-invite', {
        name,
        password,
        inviteToken,
    });
    return response.data;
};

export const createInvite = async (email: string, role: Role) => {
    const response = await api.post('/auth/invite', { email, role });
    return response.data;
};
