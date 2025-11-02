import React, { useState } from 'react';
import { HistoryItem } from '../types';
import ResultDisplay from './ResultDisplay';
import { RefreshCwIcon } from './icons';

const HistoryCard: React.FC<{ item: HistoryItem; onViewDetails: (item: HistoryItem) => void; }> = ({ item, onViewDetails }) => {
    const { result, timestamp, image } = item;
    const score = result.recyclabilityScore;
    
    const scoreColor = score > 75 ? 'bg-green-500' : score > 40 ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <li className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 flex items-center space-x-3 transition-shadow hover:shadow-lg">
            <img src={image} alt={result.itemName} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
            
            <div className="flex-grow">
                <h3 className="font-bold text-md text-gray-800 dark:text-gray-200 truncate">{result.itemName}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="mt-1">
                     <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className={`${scoreColor} h-1.5 rounded-full`} style={{ width: `${score}%` }}></div>
                    </div>
                </div>
            </div>

            <button 
                onClick={() => onViewDetails(item)}
                className="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 dark:text-green-400 dark:bg-green-900/50 dark:hover:bg-green-900/75 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 flex-shrink-0"
            >
                View Details
            </button>
        </li>
    );
};

const History: React.FC<{ history: HistoryItem[] }> = ({ history }) => {
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullStart, setPullStart] = useState<number | null>(null);
    const [pullPosition, setPullPosition] = useState(0);

    const REFRESH_THRESHOLD = 80;

    const handleViewDetails = (item: HistoryItem) => {
        setSelectedItem(item);
    };

    const handleBackToList = () => {
        setSelectedItem(null);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (window.scrollY === 0 && !isRefreshing) {
            setPullStart(e.touches[0].clientY);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (pullStart === null || isRefreshing) return;

        const touchY = e.touches[0].clientY;
        const pullDelta = touchY - pullStart;
        
        if (pullDelta > 0) {
             if (e.cancelable) e.preventDefault();
             const resistance = 0.5;
             setPullPosition(pullDelta * resistance);
        } else {
             setPullStart(null);
             setPullPosition(0);
        }
    };

    const handleTouchEnd = () => {
        if (isRefreshing || pullStart === null) return;
        
        if (pullPosition > REFRESH_THRESHOLD) {
            setIsRefreshing(true);
            setTimeout(() => {
                setIsRefreshing(false);
            }, 1500);
        }
        setPullStart(null);
        setPullPosition(0);
    };

    if (selectedItem) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
                 <ResultDisplay 
                    result={selectedItem.result} 
                    imageUri={selectedItem.image} 
                    onButtonClick={handleBackToList}
                    buttonText="Back to History"
                />
            </div>
        )
    }

    return (
        <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative"
        >
             <div 
                className="absolute top-0 left-0 right-0 flex justify-center items-center h-12 transition-opacity"
                style={{ opacity: isRefreshing || pullPosition > 0 ? 1 : 0 }}
                aria-hidden="true"
            >
                <div className="bg-white dark:bg-gray-700 rounded-full shadow-lg p-2">
                    {isRefreshing ? (
                        <RefreshCwIcon className="w-6 h-6 text-green-500 animate-spin" />
                    ) : (
                        <RefreshCwIcon 
                            className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-200" 
                            style={{ transform: `rotate(${Math.min(pullPosition, REFRESH_THRESHOLD) / REFRESH_THRESHOLD * 270}deg)` }}
                        />
                    )}
                </div>
            </div>

            <div
                className="transition-transform duration-300"
                style={{ transform: `translateY(${isRefreshing ? '50px' : pullPosition > 0 ? pullPosition + 'px' : '0px'})` }}
            >
                {history.length === 0 ? (
                    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md text-gray-600 dark:text-gray-400 mt-2 min-h-[200px] flex flex-col justify-center">
                        <p className="font-semibold">Your scanning history is empty.</p>
                        <p className="text-sm mt-1">Scanned items will appear here.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {history.map((item) => <HistoryCard key={item.id} item={item} onViewDetails={handleViewDetails} />)}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default History;