import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { LogOut, Menu, User as UserIcon, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', roles: ['ADMIN', 'MANAGER', 'STAFF'] },
        { name: 'Projects', path: '/projects', roles: ['ADMIN', 'MANAGER', 'STAFF'] },
        { name: 'Users', path: '/users', roles: ['ADMIN'] },
    ];

    const filteredLinks = navLinks.filter(
        (link) => user && link.roles.includes(user.role)
    );

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Momentum</span>
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
                            onClick={handleLogout}
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
                <div className="md:hidden bg-white border-b border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {filteredLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.startsWith(link.path)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};
