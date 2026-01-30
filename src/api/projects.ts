import api from '../lib/axios';
import type { Project, ProjectStatus, PaginatedResponse } from '../types';

export const getProjects = async (
    page = 1,
    limit = 10,
    status?: ProjectStatus
): Promise<PaginatedResponse<Project[]>> => {
    const response = await api.get<PaginatedResponse<Project[]>>('/projects', {
        params: { page, limit, status },
    });
    return response.data;
};

export const createProject = async (name: string, description: string): Promise<Project> => {
    const response = await api.post<{ success: boolean; project: Project }>('/projects', {
        name,
        description,
    });
    return response.data.project;
};

export const updateProject = async (id: string, data: Partial<Project>): Promise<Project> => {
    const response = await api.patch<{ success: boolean; project: Project }>(`/projects/${id}`, data);
    return response.data.project;
};

export const deleteProject = async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
};
