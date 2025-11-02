import React from 'react';
import { AppView } from '../types';
import { HistoryIcon, MapIcon, ProfileIcon, ScanIcon } from './icons';

interface BottomNavProps {
    activeView: AppView;
    setView: (view: AppView) => void;
}

const NavButton: React.FC<{
    view: AppView;
    label: string;
    Icon: React.FC<{ className?: string }>;
    activeView: AppView;
    setView: (view: AppView) => void;
}> = ({ view, label, Icon, activeView, setView }) => {
    const isActive = activeView === view;
    return (
        <button
            onClick={() => setView(view)}
            className="flex flex-col items-center justify-center w-full h-full text-sm space-y-1 group"
            aria-current={isActive ? 'page' : undefined}
        >
            <div className={`p-2 rounded-full transition-colors duration-200 ${isActive ? 'bg-green-500' : 'bg-transparent'}`}>
                <Icon className={`w-6 h-6 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
            </div>
            <span className={`text-xs font-medium transition-colors duration-200 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'}`}>{label}</span>
        </button>
    );
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView }) => {
    return (
        <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-800 rounded-t-2xl shadow-[0_-2px_15px_rgba(0,0,0,0.08)] dark:shadow-[0_-2px_15px_rgba(0,0,0,0.2)] z-50">
            <div className="relative flex justify-around items-center h-20 max-w-lg mx-auto">
                <div className="w-1/4 h-full"><NavButton view='history' label='History' Icon={HistoryIcon} activeView={activeView} setView={setView} /></div>
                <div className="w-1/4 h-full"><NavButton view='map' label='Map' Icon={MapIcon} activeView={activeView} setView={setView} /></div>
                <div className="w-1/4 h-full"><NavButton view='profile' label='Profile' Icon={ProfileIcon} activeView={activeView} setView={setView} /></div>
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center pointer-events-none">
                     <button
                        onClick={() => setView('scanner')}
                        className="pointer-events-auto -translate-y-8 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg text-white transform hover:scale-110 transition-transform ring-4 ring-white dark:ring-gray-800"
                        aria-label="Scan Item"
                    >
                        <ScanIcon className="w-8 h-8" />
                    </button>
                 </div>
            </div>
        </nav>
    );
};

export default BottomNav;