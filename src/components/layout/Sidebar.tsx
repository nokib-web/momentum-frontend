import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, FolderKanban, Users, Settings } from 'lucide-react';

export const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'MANAGER', 'STAFF'] },
        { name: 'Projects', path: '/projects', icon: FolderKanban, roles: ['ADMIN', 'MANAGER', 'STAFF'] },
        { name: 'Users', path: '/users', icon: Users, roles: ['ADMIN'] },
        { name: 'Settings', path: '/settings', icon: Settings, roles: ['ADMIN', 'MANAGER', 'STAFF'] },
    ];

    const filteredItems = menuItems.filter(
        (item) => user && item.roles.includes(user.role)
    );

    return (
        <aside className="hidden lg:flex flex-col w-72 glass border-r border-gray-100 dark:border-gray-800 transition-all duration-300">
            <div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto px-4">
                <nav className="space-y-2">
                    {filteredItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                                    }`}
                            >
                                <Icon
                                    className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                                        }`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4">
                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Momentum Pro</p>
                    <p className="text-[10px] text-indigo-500/80 dark:text-indigo-400/60 leading-tight">Managing your projects with precision and speed.</p>
                </div>
            </div>
        </aside>
    );
};
