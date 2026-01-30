import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateInvite } from '../../hooks/useInvite';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Copy, Check } from 'lucide-react';
import type { Role } from '../../types';

const inviteSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    role: z.enum(['ADMIN', 'MANAGER', 'STAFF'], {
        message: 'Please select a valid role',
    }),
});

type InviteFormData = z.infer<typeof inviteSchema>;

export const InviteForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [inviteLink, setInviteLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const { mutate: createInvite, isPending } = useCreateInvite();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InviteFormData>({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            role: 'STAFF',
        },
    });

    const roleOptions = [
        { value: 'STAFF', label: 'Staff' },
        { value: 'MANAGER', label: 'Manager' },
        { value: 'ADMIN', label: 'Admin' },
    ];

    const onSubmit = async (data: InviteFormData) => {
        setError('');
        createInvite(
            { email: data.email, role: data.role as Role },
            {
                onSuccess: (response) => {
                    const baseUrl = window.location.origin;
                    const link = `${baseUrl}/register?token=${response.inviteToken}`;
                    setInviteLink(link);
                    setShowModal(true);
                    reset();
                },
                onError: (err: any) => {
                    setError(err.message || 'Failed to create invite. Please try again.');
                },
            }
        );
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCopied(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="user@example.com"
                    register={register('email')}
                    error={errors.email?.message}
                    required
                />

                <Select
                    label="Role"
                    options={roleOptions}
                    register={register('role')}
                    error={errors.role?.message}
                    required
                />

                <Button type="submit" loading={isPending} disabled={isPending} className="w-full">
                    Create Invite
                </Button>
            </form>

            <Modal isOpen={showModal} onClose={handleCloseModal} title="Invite Created Successfully">
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Share this invite link with the user. The link will expire in 48 hours.
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                        <p className="text-sm font-mono text-gray-800 break-all">{inviteLink}</p>
                    </div>

                    <Button
                        onClick={copyToClipboard}
                        variant="secondary"
                        className="w-full"
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 mr-2" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy to Clipboard
                            </>
                        )}
                    </Button>

                    <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-md text-sm text-blue-700">
                        <p className="font-medium">Important:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                            <li>This link can only be used once</li>
                            <li>It will expire in 48 hours</li>
                            <li>Send it securely to the intended recipient</li>
                        </ul>
                    </div>
                </div>
            </Modal>
        </>
    );
};
