import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { registerViaInvite } from '../api/auth';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login: authLogin } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inviteToken = searchParams.get('token');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    useEffect(() => {
        if (!inviteToken) {
            setError('Invalid or missing invite token. Please use the invite link provided by your administrator.');
        }
    }, [inviteToken]);

    const onSubmit = async (data: RegisterFormData) => {
        if (!inviteToken) {
            setError('No invite token found');
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            const response = await registerViaInvite(data.name, data.password, inviteToken);
            authLogin(response);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again or contact your administrator.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-indigo-600 mb-2">Momentum</h1>
                    <h2 className="text-2xl font-semibold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">Complete your registration to get started</p>
                </div>

                <Card className="mt-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            register={register('name')}
                            error={errors.name?.message}
                            required
                            disabled={!inviteToken}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a strong password"
                            register={register('password')}
                            error={errors.password?.message}
                            required
                            disabled={!inviteToken}
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="Re-enter your password"
                            register={register('confirmPassword')}
                            error={errors.confirmPassword?.message}
                            required
                            disabled={!inviteToken}
                        />

                        <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-md text-sm text-blue-700">
                            <p className="font-medium mb-1">Password requirements:</p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                                <li>At least 6 characters long</li>
                                <li>Contains uppercase and lowercase letters</li>
                                <li>Contains at least one number</li>
                            </ul>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            loading={isLoading}
                            disabled={isLoading || !inviteToken}
                        >
                            Create Account
                        </Button>
                    </form>
                </Card>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-indigo-600 font-medium hover:text-indigo-500"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
};
