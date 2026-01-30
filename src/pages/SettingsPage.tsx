import { Layout } from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../hooks/useAuth';
import { User, Shield, Bell, Palette } from 'lucide-react';

export const SettingsPage = () => {
    const { user } = useAuth();

    return (
        <Layout>
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="pb-6 border-b border-gray-100 dark:border-gray-800">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">Settings</h1>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                        Manage your account preferences and application settings.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Navigation */}
                    <div className="lg:col-span-1 space-y-2">
                        <button className="w-full flex items-center space-x-3 px-4 py-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-xl font-semibold transition-all">
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl font-medium transition-all">
                            <Shield className="h-5 w-5" />
                            <span>Security</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl font-medium transition-all">
                            <Bell className="h-5 w-5" />
                            <span>Notifications</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl font-medium transition-all">
                            <Palette className="h-5 w-5" />
                            <span>Appearance</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card title="Profile Information">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-6">
                                    <div className="relative">
                                        <div className="h-20 w-20 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm">
                                            <User className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 p-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-gray-500 hover:text-indigo-600 transition-colors">
                                            <Palette className="h-3 w-3" />
                                        </button>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">{user?.name}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role} Account</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Display Name"
                                        defaultValue={user?.name}
                                        placeholder="Your full name"
                                    />
                                    <Input
                                        label="Email Address"
                                        defaultValue={user?.email}
                                        disabled
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button className="px-8">Save Changes</Button>
                                </div>
                            </div>
                        </Card>

                        <Card title="Account Security">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                                    <div>
                                        <h5 className="font-semibold text-gray-900 dark:text-gray-100">Password</h5>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
                                    </div>
                                    <Button variant="secondary" size="sm">Update</Button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                                    <div>
                                        <h5 className="font-semibold text-gray-900 dark:text-gray-100">Two-Factor Authentication</h5>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Protect your account with an extra layer of security</p>
                                    </div>
                                    <Button variant="secondary" size="sm">Enable</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
