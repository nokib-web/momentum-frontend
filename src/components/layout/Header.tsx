import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { LogOut, Menu, User as UserIcon, Moon, Sun, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
        setIsMobileMenuOpen(false);
    };

    const confirmLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', roles: ['ADMIN', 'MANAGER', 'STAFF'] },
        { name: 'Projects', path: '/projects', roles: ['ADMIN', 'MANAGER', 'STAFF'] },
        { name: 'Users', path: '/users', roles: ['ADMIN'] },
        { name: 'Settings', path: '/settings', roles: ['ADMIN', 'MANAGER', 'STAFF'] },
    ];

    const filteredLinks = navLinks.filter(
        (link) => user && link.roles.includes(user.role)
    );

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center group">
                            <div className="relative h-9 w-9 flex items-center justify-center bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none mr-3 transform group-hover:rotate-12 transition-all duration-300">
                                <span className="text-white font-black text-xl">M</span>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                            </div>
                            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100 italic">
                                MOMEN<span className="text-indigo-600 dark:text-indigo-400">TUM</span>
                            </span>
                        </Link>
                        <nav className="hidden md:ml-8 md:flex md:space-x-4">
                            {filteredLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname.startsWith(link.path)
                                        ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                                        : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated && user && (
                            <div className="flex items-center space-x-3 mr-4 border-r border-gray-200 dark:border-gray-700 pr-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{user.role}</p>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                    <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </div>
                        )}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="Toggle dark mode"
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleLogoutClick}
                            className="!py-1.5"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass border-b border-gray-200 dark:border-gray-700 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-4 pb-6 space-y-4">
                        {isAuthenticated && user && (
                            <div className="flex items-center space-x-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                                    <UserIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{user.role}</p>
                                </div>
                            </div>
                        )}
                        <div className="space-y-1">
                            {filteredLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${location.pathname.startsWith(link.path)
                                        ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 font-medium"
                            >
                                {theme === 'dark' ? (
                                    <><Sun className="h-5 w-5" /> <span>Light Mode</span></>
                                ) : (
                                    <><Moon className="h-5 w-5" /> <span>Dark Mode</span></>
                                )}
                            </button>
                            <button
                                onClick={handleLogoutClick}
                                className="flex items-center space-x-2 text-red-600 font-medium"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Logout Confirmation Modal */}
            <Modal
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                title="Confirm Logout"
            >
                <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-red-100 dark:bg-red-900/40 rounded-xl text-red-600 dark:text-red-400">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Are you sure you want to logout?</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You will need to login again to access your dashboard.</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                            variant="secondary"
                            className="flex-1"
                            onClick={() => setShowLogoutConfirm(false)}
                        >
                            Stay Logged In
                        </Button>
                        <Button
                            variant="danger"
                            className="flex-1"
                            onClick={confirmLogout}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout Now
                        </Button>
                    </div>
                </div>
            </Modal>
        </header>
    );
};
