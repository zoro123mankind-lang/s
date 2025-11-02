import React, { useMemo } from 'react';
import { HistoryItem } from '../types';
import { GlobeIcon, HundredIcon, SparkleIcon, TargetIcon, TreeIcon, WaterDropIcon } from './icons';

interface ProfileProps {
    history: HistoryItem[];
}

const StatCard: React.FC<{ value: number | string; label: string }> = ({ value, label }) => (
    <div className="bg-green-50 dark:bg-gray-800 p-4 rounded-xl text-center">
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
);

const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) {
        return <div className="w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-full" />;
    }
    
    let cumulative = 0;
    const gradients = data.map(item => {
        const percent = (item.value / total) * 100;
        const start = cumulative;
        const end = cumulative + percent;
        cumulative = end;
        return `${item.color} ${start}% ${end}%`;
    });

    return (
        <div 
            className="w-40 h-40 rounded-full"
            style={{
                background: `conic-gradient(${gradients.join(', ')})`,
                mask: 'radial-gradient(transparent 55%, black 56%)',
                WebkitMask: 'radial-gradient(transparent 55%, black 56%)'
            }}
        />
    );
};

const AchievementCard: React.FC<{ Icon: React.FC<{className?: string}>, title: string, subtitle: string, unlocked: boolean }> = ({ Icon, title, subtitle, unlocked }) => (
    <div className={`p-4 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 ${unlocked ? 'bg-white dark:bg-gray-700 shadow-md' : 'bg-gray-100 dark:bg-gray-800/50'}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${unlocked ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gray-200 dark:bg-gray-700/50'}`}>
            <Icon className={`w-6 h-6 ${unlocked ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
        </div>
        <p className={`font-bold text-sm ${unlocked ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-500'}`}>{title}</p>
        <p className={`text-xs ${unlocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}`}>{subtitle}</p>
    </div>
);

const Profile: React.FC<ProfileProps> = ({ history }) => {
    const stats = useMemo(() => {
        const totalScans = history.length;
        const totalPoints = history.reduce((sum, item) => sum + item.points, 0);
        const bestScore = history.reduce((max, item) => Math.max(max, item.result.recyclabilityScore), 0);

        const categoryCounts = history.reduce((acc, item) => {
            const category = item.result.category || 'General Waste';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });
        
        return {
            totalScans,
            totalPoints,
            bestScore,
            categoryCounts,
        };
    }, [history]);

    const chartData = [
        { label: 'Recyclable', value: stats.categoryCounts.Recyclable || 0, color: '#34d399' }, // emerald-400
        { label: 'Organic', value: stats.categoryCounts.Organic || 0, color: '#f59e0b' }, // amber-500
        { label: 'Hazardous', value: stats.categoryCounts.Hazardous || 0, color: '#ef4444' }, // red-500
        { label: 'General', value: stats.categoryCounts['General Waste'] || 0, color: '#9ca3af' }, // gray-400
    ];

    const achievements = [
        { Icon: SparkleIcon, title: "First Scan", subtitle: "Scan your first item", unlocked: stats.totalScans >= 1 },
        { Icon: TargetIcon, title: "Recycling Pro", subtitle: "Scan 10 recyclables", unlocked: (stats.categoryCounts.Recyclable || 0) >= 10 },
        { Icon: HundredIcon, title: "Perfect Score", subtitle: "Get a 100 score", unlocked: stats.bestScore === 100 },
        { Icon: TreeIcon, title: "Tree Hugger", subtitle: "Scan 25 items", unlocked: stats.totalScans >= 25 },
        { Icon: WaterDropIcon, title: "Hydration Hero", subtitle: "Scan 5 bottles", unlocked: false }, // Placeholder
        { Icon: GlobeIcon, title: "Eco-Master", subtitle: "Reach 1000 points", unlocked: stats.totalPoints >= 1000 },
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
                <StatCard value={stats.totalScans} label="Total Scans" />
                <StatCard value={stats.totalPoints} label="Eco Points" />
                <StatCard value={stats.bestScore} label="Best Score" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Scan Breakdown</h3>
                <div className="flex flex-col md:flex-row items-center justify-around gap-4">
                     <div className="relative flex items-center justify-center">
                        <DonutChart data={chartData} />
                         <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">{stats.totalScans}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Scans</span>
                        </div>
                    </div>
                    <ul className="space-y-2">
                        {chartData.map(item => (
                            <li key={item.label} className="flex items-center space-x-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                                <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Achievements</h3>
                <div className="grid grid-cols-3 gap-3">
                    {achievements.map((ach, index) => (
                        <AchievementCard key={index} {...ach} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;