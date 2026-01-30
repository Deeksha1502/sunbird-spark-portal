import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const performanceData = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 25 },
    { month: "Apr", value: 45 },
    { month: "May", value: 40 },
    { month: "Jun", value: 55 },
];

const HomePerformanceChart = () => {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm h-full">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Performance</h3>

            {/* Chart */}
            <div className="h-24 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#9CA3AF' }}
                        />
                        <YAxis hide />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#CC8545"
                            strokeWidth={2}
                            dot={{ fill: '#CC8545', strokeWidth: 0, r: 3 }}
                            activeDot={{ fill: '#CC8545', strokeWidth: 0, r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-home-ink">40%</span>
                <span className="text-xs text-gray-400 leading-tight">
                    Your productivity is 40% higher as<br />compared to last month
                </span>
            </div>
        </div>
    );
};

export default HomePerformanceChart;
