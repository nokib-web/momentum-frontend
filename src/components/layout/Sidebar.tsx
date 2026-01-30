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
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                    {filteredItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon
                                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                                        }`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};
