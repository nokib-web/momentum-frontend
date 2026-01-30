import { useState } from 'react';
import { useRequireRole } from '../hooks/useRequireRole';
import { useUsers, useUpdateUserRole, useUpdateUserStatus } from '../hooks/useUsers';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Table } from '../components/common/Table';
import { Pagination } from '../components/common/Pagination';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { InviteForm } from '../components/auth/InviteForm';
import { UserPlus } from 'lucide-react';
import type { User, Role, UserStatus } from '../types';

export const UsersPage = () => {
    useRequireRole(['ADMIN']);

    const [currentPage, setCurrentPage] = useState(1);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const limit = 10;

    const { data, isLoading, error } = useUsers(currentPage, limit);
    const updateRoleMutation = useUpdateUserRole();
    const updateStatusMutation = useUpdateUserStatus();

    const handleRoleChange = async (userId: string, newRole: Role) => {
        updateRoleMutation.mutate({ userId, role: newRole });
    };

    const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
        updateStatusMutation.mutate({ userId, status: newStatus });
    };

    const columns = [
        {
            header: 'Name',
            accessor: (user: User) => (
                <div className="font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
            ),
        },
        {
            header: 'Email',
            accessor: (user: User) => (
                <div className="text-gray-500 dark:text-gray-400">{user.email}</div>
            ),
        },
        {
            header: 'Role',
            accessor: (user: User) => (
                <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value as Role)}
                    disabled={updateRoleMutation.isPending}
                    className="text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="STAFF">Staff</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                </select>
            ),
        },
        {
            header: 'Status',
            accessor: (user: User) => (
                <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user._id, e.target.value as UserStatus)}
                    disabled={updateStatusMutation.isPending}
                    className={`text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${user.status === 'ACTIVE' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                        }`}
                >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
            ),
        },
        {
            header: 'Created At',
            accessor: (user: User) => (
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </div>
            ),
        },
    ];

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <LoadingSpinner size="lg" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Manage user accounts, roles, and permissions
                        </p>
                    </div>
                    <Button onClick={() => setShowInviteModal(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite New User
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md">
                        Failed to load users. Please try again.
                    </div>
                )}

                <Card>
                    <Table
                        columns={columns}
                        data={data?.users || []}
                        keyExtractor={(user) => user._id}
                        emptyMessage="No users found"
                        loading={isLoading}
                    />
                </Card>

                {data?.pagination && data.pagination.totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={data.pagination.totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            <Modal
                isOpen={showInviteModal}
                onClose={() => setShowInviteModal(false)}
                title="Invite New User"
            >
                <InviteForm />
            </Modal>
        </Layout>
    );
};
