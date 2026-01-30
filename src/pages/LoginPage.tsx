import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { login } from '../api/auth';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Shield, Briefcase, User, Mail, Send, CheckCircle2 } from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const contactSchema = z.object({
    name: z.string().min(2, 'Name is too short'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type ContactFormData = z.infer<typeof contactSchema>;
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const demoAccounts = [
    {
        role: 'Admin',
        email: 'admin@momentum.com',
        password: 'Admin123!',
        icon: Shield,
        color: 'from-purple-500 to-purple-600',
        hoverColor: 'hover:from-purple-600 hover:to-purple-700',
        description: 'Full access to all features',
    },
    {
        role: 'Manager',
        email: 'manager@momentum.com',
        password: 'Manager123!',
        icon: Briefcase,
        color: 'from-blue-500 to-blue-600',
        hoverColor: 'hover:from-blue-600 hover:to-blue-700',
        description: 'Manage projects and teams',
    },
    {
        role: 'Staff',
        email: 'nokib@momentum.com',
        password: 'Staff123!',
        icon: User,
        color: 'from-green-500 to-green-600',
        hoverColor: 'hover:from-green-600 hover:to-green-700',
        description: 'View and create projects',
    },
];

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const contactForm = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const forgotForm = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            setError('');
            const response = await login(data.email, data.password);
            authLogin(response);
            navigate('/dashboard');
        } catch (err: unknown) {
            const error = err as { message?: string };
            setError(error.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            setError('');
            const response = await login(email, password);
            authLogin(response);
            navigate('/dashboard');
        } catch (err: unknown) {
            const error = err as { message?: string };
            setError(error.message || 'Demo login failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const onContactSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Contact form data:', data);
        setIsSubmitting(false);
        setSubmittedSuccessfully(true);
        toast.success('Your request has been sent to the administrator.');
        setTimeout(() => {
            setShowContactModal(false);
            setSubmittedSuccessfully(false);
            contactForm.reset();
        }, 2000);
    };

    const onForgotSubmit = async (data: ForgotPasswordFormData) => {
        setIsSubmitting(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Reset password for:', data.email);
        setIsSubmitting(false);
        toast.success('Password reset instructions sent to your email.');
        setShowForgotModal(false);
        forgotForm.reset();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-md w-full relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Logo & Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center group mb-2">
                        <div className="relative h-14 w-14 flex items-center justify-center bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20 dark:shadow-none mr-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <span className="text-white font-black text-2xl">M</span>
                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                        </div>
                        <span className="text-4xl font-black tracking-tighter text-gray-900 dark:text-gray-100 italic">
                            MOMEN<span className="text-indigo-600 dark:text-indigo-400">TUM</span>
                        </span>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">Welcome back</h2>
                        <p className="text-base text-gray-500 dark:text-gray-400">Sign in to manage your high-growth initiatives.</p>
                    </div>
                </div>

                {/* Main Content Card */}
                <Card className="glass !bg-white/80 dark:!bg-gray-900/80 !border-gray-200/50 dark:!border-gray-800/50 backdrop-blur-xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            register={register('email')}
                            error={errors.email?.message}
                            required
                        />

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotModal(true)}
                                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all"
                                >
                                    Forgot?
                                </button>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                register={register('password')}
                                error={errors.password?.message}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full !py-3 !text-base shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:scale-[1.02]"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Sign in to Dashboard
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                                <span className="px-3 bg-white dark:bg-gray-900 text-gray-400">One-Tap Demo Access</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {demoAccounts.map((account) => {
                                const Icon = account.icon;
                                return (
                                    <button
                                        key={account.role}
                                        onClick={() => handleDemoLogin(account.email, account.password)}
                                        disabled={isLoading}
                                        className="group relative flex items-center p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all duration-300 text-left disabled:opacity-50"
                                    >
                                        <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br ${account.color} text-white shadow-lg shadow-indigo-500/10 transition-transform group-hover:scale-110`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-none">Login as {account.role}</p>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{account.description}</p>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                            <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </Card>

                <div className="text-center space-y-1 pb-10">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Don't have an account?
                    </p>
                    <button
                        onClick={() => setShowContactModal(true)}
                        className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline transition-all"
                    >
                        Contact your manager for an invitation
                    </button>
                </div>

                {/* Contact Modal */}
                <Modal
                    isOpen={showContactModal}
                    onClose={() => setShowContactModal(false)}
                    title="Request an Invitation"
                >
                    {submittedSuccessfully ? (
                        <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                <CheckCircle2 className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Message Sent!</h3>
                            <p className="text-gray-500 dark:text-gray-400">We've received your request. Our team will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-5">
                            <Input
                                label="Your Name"
                                placeholder="Enter your full name"
                                register={contactForm.register('name')}
                                error={contactForm.formState.errors.name?.message}
                            />
                            <Input
                                label="Official Email"
                                placeholder="name@company.com"
                                register={contactForm.register('email')}
                                error={contactForm.formState.errors.email?.message}
                            />
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <textarea
                                    rows={4}
                                    {...contactForm.register('message')}
                                    placeholder="Tell us about your team or project..."
                                    className={`block w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all ${contactForm.formState.errors.message ? 'border-red-300' : 'border-gray-300'}`}
                                />
                                {contactForm.formState.errors.message && (
                                    <p className="text-xs text-red-600 mt-1">{contactForm.formState.errors.message.message}</p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                loading={isSubmitting}
                            >
                                <Send className="h-4 w-4 mr-2" />
                                Send Request
                            </Button>
                        </form>
                    )}
                </Modal>

                {/* Forgot Password Modal */}
                <Modal
                    isOpen={showForgotModal}
                    onClose={() => setShowForgotModal(false)}
                    title="Reset Password"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mx-auto">
                            <Shield className="h-6 w-6" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Enter your email address and we'll send you instructions to reset your password.
                            </p>
                        </div>
                        <form onSubmit={forgotForm.handleSubmit(onForgotSubmit)} className="space-y-5">
                            <Input
                                label="Email Address"
                                placeholder="name@company.com"
                                register={forgotForm.register('email')}
                                error={forgotForm.formState.errors.email?.message}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                loading={isSubmitting}
                            >
                                <Mail className="h-4 w-4 mr-2" />
                                Send Reset Link
                            </Button>
                        </form>
                    </div>
                </Modal>
            </div>

            {/* Footer */}
            <div className="fixed bottom-6 text-center w-full px-4 animate-in fade-in duration-1000">
                <p className="text-xs text-gray-400 dark:text-gray-600 font-bold tracking-[0.2em] uppercase">
                    &copy; 2026 MOMENTUM CLOUD • SECURE ENTERPRISE AUTHENTICATION
                </p>
            </div>
        </div>
    );
};
