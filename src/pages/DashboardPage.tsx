import { useRequireAuth } from '../hooks/useRequireAuth';
import { useAuth } from '../hooks/useAuth';
import { useProjects } from '../hooks/useProjects';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';
import { FolderKanban, Users, ArrowRight, Briefcase } from 'lucide-react';

export const DashboardPage = () => {
    useRequireAuth();
    const { user } = useAuth();
    const { data: projectsData, isLoading } = useProjects(1, 5);

    const isAdmin = user?.role === 'ADMIN';

    const roleColors = {
        ADMIN: 'bg-purple-100 text-purple-800',
        MANAGER: 'bg-blue-100 text-blue-800',
        STAFF: 'bg-green-100 text-green-800',
    };

    const quickActions = [
        {
            title: 'View Projects',
            description: 'Browse and manage all projects',
            icon: FolderKanban,
            link: '/projects',
            color: 'bg-indigo-50 text-indigo-600',
            show: true,
        },
        {
            title: 'Manage Users',
            description: 'Invite and manage team members',
            icon: Users,
            link: '/users',
            color: 'bg-purple-50 text-purple-600',
            show: isAdmin,
        },
    ];

    return (
        <Layout>
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                    <p className="text-indigo-100 mb-4">Here's what's happening with your projects today.</p>
                    <div className="inline-flex items-center gap-2">
                        <span className="text-sm">Your role:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleColors[user?.role || 'STAFF']}`}>
                            {user?.role}
                        </span>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <FolderKanban className="h-6 w-6 text-indigo-600" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Projects</p>
                                {isLoading ? (
                                    <LoadingSpinner size="sm" />
                                ) : (
                                    <p className="text-2xl font-bold text-gray-900">{projectsData?.pagination.total || 0}</p>
                                )}
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Briefcase className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                                {isLoading ? (
                                    <LoadingSpinner size="sm" />
                                ) : (
                                    <p className="text-2xl font-bold text-gray-900">
                                        {projectsData?.projects?.filter(p => p.status === 'ACTIVE').length || 0}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Users className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Your Role</p>
                                <p className="text-2xl font-bold text-gray-900">{user?.role}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quickActions.filter(action => action.show).map((action) => {
                            const Icon = action.icon;
                            return (
                                <Link key={action.link} to={action.link}>
                                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                        <div className="flex items-start">
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{action.title}</h3>
                                                <p className="text-sm text-gray-600">{action.description}</p>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                        </div>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Projects */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
                        <Link to="/projects">
                            <Button variant="secondary" size="sm">
                                View All
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <LoadingSpinner size="lg" />
                        </div>
                    ) : projectsData?.projects && projectsData.projects.length > 0 ? (
                        <Card>
                            <div className="divide-y divide-gray-200">
                                {projectsData.projects.slice(0, 5).map((project) => (
                                    <div key={project._id} className="py-4 first:pt-0 last:pb-0">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 truncate">{project.name}</h3>
                                                <p className="text-sm text-gray-500 truncate">{project.description}</p>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                                        project.status === 'ARCHIVED' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ) : (
                        <Card>
                            <div className="text-center py-8">
                                <FolderKanban className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                <p className="text-gray-500 mb-4">No projects yet</p>
                                <Link to="/projects">
                                    <Button>Create Your First Project</Button>
                                </Link>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </Layout>
    );
};
