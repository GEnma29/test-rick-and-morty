import React from 'react';

export const TableSkeleton = () => (
    <tbody className="divide-y divide-gray-800">
        {[...Array(5)].map((_, index) => (
            <tr key={index} className="animate-pulse">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                    <div className="bg-gray-600 w-32 h-4 rounded"></div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    <div className="bg-gray-600 w-24 h-4 rounded"></div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    <div className="bg-gray-600 w-48 h-4 rounded"></div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    <div className="bg-gray-600 w-24 h-4 rounded"></div>
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <div className="bg-gray-600 w-24 h-4 rounded"></div>
                </td>
            </tr>
        ))}
    </tbody>
);