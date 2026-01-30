import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, updateUserRole, updateUserStatus } from '../api/users';
import { useAuth } from './useAuth';
import type { Role, UserStatus } from '../types';

export const useUsers = (page = 1, limit = 10) => {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: ['users', page, limit],
        queryFn: () => getUsers(page, limit),
        enabled: isAuthenticated,
    });
};

export const useUpdateUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, role }: { userId: string; role: Role }) =>
            updateUserRole(userId, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

export const useUpdateUserStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, status }: { userId: string; status: UserStatus }) =>
            updateUserStatus(userId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};
