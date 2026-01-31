import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Edit, Trash2, User, Calendar } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
    project: Project;
    onEdit?: (project: Project) => void;
    onDelete?: (project: Project) => void;
    isAdmin: boolean;
}

export const ProjectCard = ({ project, onEdit, onDelete, isAdmin }: ProjectCardProps) => {
    const statusColors = {
        ACTIVE: 'bg-green-100 text-green-800',
        ARCHIVED: 'bg-yellow-100 text-yellow-800',
        DELETED: 'bg-red-100 text-red-800',
    };

    return (
        <Card className="h-full group flex flex-col card-hover border-opacity-50 hover:border-indigo-500/50 transition-all">
            <div className="flex-1 p-1">
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm ${statusColors[project.status].replace('100', '900/50').replace('800', '300')}`}>
                            {project.status === 'ACTIVE' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1.5 align-middle" />}
                            <span className="align-middle">{project.status}</span>
                        </span>
                        {/* Optional: Add an icon or other metadata here if needed */}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.name}
                    </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800/50">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 mr-3">
                            <User className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium truncate">Created by <span className="text-gray-900 dark:text-gray-200">{project.createdBy.name}</span></span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 mr-3">
                            <Calendar className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium">
                            {new Date(project.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {isAdmin && (onEdit || onDelete) && (
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/50">
                    {onEdit && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit(project)}
                            className="flex-1 !bg-transparent hover:!bg-indigo-50 dark:hover:!bg-indigo-900/30 !border-transparent hover:!border-indigo-100 dark:hover:!border-indigo-800 !text-indigo-600 dark:!text-indigo-400"
                        >
                            <Edit className="h-4 w-4 mr-1.5" />
                            Edit
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onDelete(project)}
                            className="flex-1 !bg-transparent hover:!bg-red-50 dark:hover:!bg-red-900/30 !border-transparent hover:!border-red-100 dark:hover:!border-red-800 !text-red-600 dark:!text-red-400"
                        >
                            <Trash2 className="h-4 w-4 mr-1.5" />
                            Delete
                        </Button>
                    )}
                </div>
            )}
        </Card>
    );
};
