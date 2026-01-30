import type { ReactNode } from 'react';

interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => ReactNode);
    className?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (item: T) => string | number;
    emptyMessage?: string;
    loading?: boolean;
}

export const Table = <T,>({
    columns,
    data,
    keyExtractor,
    emptyMessage = 'No data available',
    loading = false,
}: TableProps<T>) => {
    return (
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                scope="col"
                                className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-6 ${column.className || ''}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="py-10 text-center">
                                <div className="flex justify-center flex-col items-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                                    <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading data...</span>
                                </div>
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={keyExtractor(item)} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                {columns.map((column, index) => (
                                    <td
                                        key={index}
                                        className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 dark:text-gray-400 sm:pl-6 ${column.className || ''}`}
                                    >
                                        {typeof column.accessor === 'function'
                                            ? column.accessor(item)
                                            : (item[column.accessor] as ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
