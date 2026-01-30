import api from '../lib/axios';
import type { User, Role, UserStatus, PaginatedResponse } from '../types';

export const getUsers = async (page = 1, limit = 10): Promise<PaginatedResponse<User[]>> => {
    const response = await api.get<PaginatedResponse<User[]>>('/users', {
        params: { page, limit },
    });
    return response.data;
};

export const updateUserRole = async (userId: string, role: Role): Promise<User> => {
    const response = await api.patch<{ success: boolean; user: User }>(`/users/${userId}/role`, {
        role,
    });
    return response.data.user;
};

export const updateUserStatus = async (userId: string, status: UserStatus): Promise<User> => {
    const response = await api.patch<{ success: boolean; user: User }>(`/users/${userId}/status`, {
        status,
    });
    return response.data.user;
};
