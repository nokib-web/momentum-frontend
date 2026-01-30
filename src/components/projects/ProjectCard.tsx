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
        <Card className="h-full flex flex-col">
            <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{project.name}</h3>
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusColors[project.status]}`}>
                        {project.status}
                    </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">Created by {project.createdBy.name}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>
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
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    {onEdit && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit(project)}
                            className="flex-1"
                        >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete(project)}
                            className="flex-1"
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                        </Button>
                    )}
                </div>
            )}
        </Card>
    );
};
