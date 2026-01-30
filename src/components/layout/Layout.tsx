import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-200">
            <Header />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto focus:outline-none scroll-smooth">
                    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
