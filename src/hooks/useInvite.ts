import { useMutation } from '@tanstack/react-query';
import { createInvite } from '../api/auth';
import type { Role } from '../types';

export const useCreateInvite = () => {
    return useMutation({
        mutationFn: ({ email, role }: { email: string; role: Role }) =>
            createInvite(email, role),
    });
};
