import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects';
import { useAuth } from './useAuth';
import type { ProjectStatus, Project } from '../types';

export const useProjects = (page = 1, limit = 10, status?: ProjectStatus, search?: string) => {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: ['projects', page, limit, status, search],
        queryFn: () => getProjects(page, limit, status, search),
        enabled: isAuthenticated,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ name, description }: { name: string; description: string }) =>
            createProject(name, description),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
            updateProject(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};
