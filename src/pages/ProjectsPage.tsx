import { useState } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useAuth } from '../hooks/useAuth';
import {
    useProjects,
    useCreateProject,
    useUpdateProject,
    useDeleteProject,
} from '../hooks/useProjects';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Pagination } from '../components/common/Pagination';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectForm } from '../components/projects/ProjectForm';
import { Plus, Filter } from 'lucide-react';
import type { Project, ProjectStatus } from '../types';

export const ProjectsPage = () => {
    useRequireAuth();
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';

    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'ALL'>('ALL');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const limit = 12;
    const filterStatus = statusFilter === 'ALL' ? undefined : statusFilter;

    const { data, isLoading, error } = useProjects(currentPage, limit, filterStatus);
    const createMutation = useCreateProject();
    const updateMutation = useUpdateProject();
    const deleteMutation = useDeleteProject();

    const handleCreateProject = (formData: { name: string; description: string }) => {
        createMutation.mutate(formData, {
            onSuccess: () => {
                setShowCreateModal(false);
            },
        });
    };

    const handleEditProject = (formData: { name: string; description: string; status?: ProjectStatus }) => {
        if (!selectedProject) return;
        updateMutation.mutate(
            { id: selectedProject._id, data: formData },
            {
                onSuccess: () => {
                    setShowEditModal(false);
                    setSelectedProject(null);
                },
            }
        );
    };

    const handleDeleteProject = () => {
        if (!selectedProject) return;
        deleteMutation.mutate(selectedProject._id, {
            onSuccess: () => {
                setShowDeleteModal(false);
                setSelectedProject(null);
            },
        });
    };

    const openEditModal = (project: Project) => {
        setSelectedProject(project);
        setShowEditModal(true);
    };

    const openDeleteModal = (project: Project) => {
        setSelectedProject(project);
        setShowDeleteModal(true);
    };

    if (isLoading && !data) {
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
                        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage and track all your projects
                        </p>
                    </div>
                    <Button onClick={() => setShowCreateModal(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Project
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value as ProjectStatus | 'ALL');
                            setCurrentPage(1);
                        }}
                        className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    >
                        <option value="ALL">All Projects</option>
                        <option value="ACTIVE">Active</option>
                        <option value="ARCHIVED">Archived</option>
                    </select>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        Failed to load projects. Please try again.
                    </div>
                )}

                {data?.projects && data.projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.projects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                onEdit={isAdmin ? openEditModal : undefined}
                                onDelete={isAdmin ? openDeleteModal : undefined}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-500">No projects found</p>
                        <Button onClick={() => setShowCreateModal(true)} className="mt-4">
                            Create Your First Project
                        </Button>
                    </div>
                )}

                {data?.pagination && data.pagination.totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={data.pagination.totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {/* Create Project Modal */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Create New Project"
            >
                <ProjectForm
                    mode="create"
                    onSubmit={handleCreateProject}
                    isLoading={createMutation.isPending}
                />
            </Modal>

            {/* Edit Project Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedProject(null);
                }}
                title="Edit Project"
            >
                {selectedProject && (
                    <ProjectForm
                        mode="edit"
                        initialData={selectedProject}
                        onSubmit={handleEditProject}
                        isLoading={updateMutation.isPending}
                    />
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedProject(null);
                }}
                title="Delete Project"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete <span className="font-semibold">{selectedProject?.name}</span>?
                        This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setSelectedProject(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDeleteProject}
                            loading={deleteMutation.isPending}
                            disabled={deleteMutation.isPending}
                        >
                            Delete Project
                        </Button>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};
