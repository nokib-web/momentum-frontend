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
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">Projects</h1>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                            Manage and track all your active initiatives.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-full sm:w-auto">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value as ProjectStatus | 'ALL');
                                    setCurrentPage(1);
                                }}
                                className="w-full sm:w-auto pl-10 pr-10 py-2.5 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-medium transition-all cursor-pointer appearance-none"
                            >
                                <option value="ALL">All Status</option>
                                <option value="ACTIVE">Active Only</option>
                                <option value="ARCHIVED">Archived</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            className="w-full sm:w-auto shadow-indigo-200 dark:shadow-none hover:shadow-lg transition-all px-6"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            New Project
                        </Button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 px-6 py-4 rounded-xl flex items-center gap-3">
                        <div className="p-1 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" /></svg>
                        </div>
                        <span>Failed to load projects. Please try again later.</span>
                    </div>
                )}

                {data?.projects && data.projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
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
                    <div className="text-center py-24 glass rounded-3xl border-dashed border-2 border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-500">
                        <div className="inline-flex p-6 rounded-full bg-gray-50 dark:bg-gray-900 mb-6">
                            <Plus className="h-10 w-10 text-gray-300 dark:text-gray-700" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No projects found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">Get started by creating your first project and inviting your team.</p>
                        <Button onClick={() => setShowCreateModal(true)} className="px-8 py-3">
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-gray-100">{selectedProject?.name}</span>?
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
