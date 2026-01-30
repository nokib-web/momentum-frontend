export type Role = 'ADMIN' | 'MANAGER' | 'STAFF';
export type UserStatus = 'ACTIVE' | 'INACTIVE';
export type ProjectStatus = 'ACTIVE' | 'ARCHIVED' | 'DELETED';

export interface User {
    _id: string;
    id: string;
    name: string;
    email: string;
    role: Role;
    status: UserStatus;
    createdAt: string;
}

export interface Project {
    _id: string;
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    isDeleted: boolean;
    createdBy: {
        _id: string;
        id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface Invite {
    email: string;
    role: Role;
    token: string;
    expiresAt?: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
    message?: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PaginatedResponse<T> {
    success: boolean;
    users?: T;
    projects?: T;
    pagination: Pagination;
}

export interface ApiError {
    message: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}
