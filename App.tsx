import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import History from './components/History';
import Map from './components/Map';
import Profile from './components/Profile';
import Scanner from './components/Scanner';
import { HistoryItem, AppView } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { HistoryIcon, MapIcon, ProfileIcon, RecycleIcon } from './components/icons';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
    const [view, setView] = useState<AppView>('scanner');
    const [history, setHistory] = useLocalStorage<HistoryItem[]>('scanHistory', []);

    const handleAddToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
        const newItem: HistoryItem = {
            ...item,
            id: new Date().toISOString() + Math.random(),
            timestamp: new Date().toISOString(),
        };
        // Prevent duplicates and limit history size
        setHistory(prev => [newItem, ...prev.filter(h => h.id !== newItem.id)].slice(0, 50));
    };

    const HeaderContent: React.FC<{ view: AppView, historyCount: number }> = ({ view, historyCount }) => {
        const content = {
            scanner: { Icon: RecycleIcon, title: 'EcoSort AI', subtitle: 'Sorting waste has never been easier. Use AI to detect and classify your daily waste instantly.' },
            map: { Icon: MapIcon, title: 'Nearby Centers', subtitle: 'Find recycling centers close to you.' },
            profile: { Icon: ProfileIcon, title: 'Eco Warrior', subtitle: `Member since ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}` },
            history: { Icon: HistoryIcon, title: 'Detection History', subtitle: `${historyCount} items scanned` },
        };

        const current = content[view] || content.scanner;

        if (view === 'history') {
             return (
                <div className="pt-8 px-4">
                    <div className="container mx-auto max-w-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{current.title}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{current.subtitle}</p>
                            </div>
                            <div className="w-10 h-10 p-2 rounded-full text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-green-500">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-gradient-to-b from-green-400 to-emerald-500 p-6 rounded-b-3xl text-white shadow-lg">
                <div className="container mx-auto max-w-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <current.Icon className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold">{current.title}</h1>
                            </div>
                            <p className="text-sm opacity-90">{current.subtitle}</p>
                        </div>
                        <div className="w-10 h-10 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/20 focus-within:ring-2 focus-within:ring-white">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderView = () => {
        switch (view) {
            case 'scanner':
                return <Scanner onAddToHistory={handleAddToHistory} history={history} />;
            case 'history':
                return <History history={history} />;
            case 'map':
                return <Map />;
            case 'profile':
                return <Profile history={history} />;
            default:
                // Fallback to scanner
                return <Scanner onAddToHistory={handleAddToHistory} history={history} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
            <div className="relative pb-24">
                <header>
                    <HeaderContent view={view} historyCount={history.length} />
                </header>
                <main className={`container mx-auto max-w-lg p-4 ${view !== 'history' ? '-mt-12' : 'pt-4'}`}>
                    {renderView()}
                </main>
            </div>
            <BottomNav activeView={view} setView={setView} />
        </div>
    );
};

export default App;