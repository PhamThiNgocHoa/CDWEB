import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {MonthlyRevenueResponse} from "../../../models/response/MonthlyRevenueResponse";

interface RevenueChartProps {
    data: MonthlyRevenueResponse[];
}

function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Biểu đồ doanh thu theo tháng</h3>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#c62129" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RevenueChart;
