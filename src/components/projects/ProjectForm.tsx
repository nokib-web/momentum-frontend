import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import type { Project, ProjectStatus } from '../../types';

const projectSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name must be less than 100 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
    status: z.enum(['ACTIVE', 'ARCHIVED', 'DELETED']).optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    mode: 'create' | 'edit';
    initialData?: Partial<Project>;
    onSubmit: (data: ProjectFormData) => void;
    isLoading?: boolean;
}

export const ProjectForm = ({ mode, initialData, onSubmit, isLoading }: ProjectFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
            status: initialData?.status || 'ACTIVE',
        },
    });

    const statusOptions = [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'ARCHIVED', label: 'Archived' },
        { value: 'DELETED', label: 'Deleted' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Project Name"
                type="text"
                placeholder="Enter project name"
                register={register('name')}
                error={errors.name?.message}
                required
            />

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    rows={4}
                    className={`
            block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
            ${errors.description ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
          `}
                    placeholder="Enter project description"
                    {...register('description')}
                />
                {errors.description && (
                    <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            {mode === 'edit' && (
                <Select
                    label="Status"
                    options={statusOptions}
                    register={register('status')}
                    error={errors.status?.message}
                />
            )}

            <Button type="submit" loading={isLoading} disabled={isLoading} className="w-full">
                {mode === 'create' ? 'Create Project' : 'Update Project'}
            </Button>
        </form>
    );
};
