import React from 'react';
import { IconType } from 'react-icons';

interface StatCardProps {
    icon: IconType;
    label: string;
    value: string | number;
    color: string;
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
    const IconComponent = Icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;

    return (
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <IconComponent className={`text-${color}-500 text-3xl`} />
            <div>
                <p className="text-gray-500">{label}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    );
}

export default StatCard;
