import React, { useState, useMemo } from 'react';
import { AnalysisResult, HistoryItem } from '../types';
import { analyzeImage } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import ResultDisplay from './ResultDisplay';
import { HazardIcon, LeafIcon, RecycleIcon } from './icons';

interface ScannerProps {
    onAddToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
    history: HistoryItem[];
}

const SummaryCard: React.FC<{
    Icon: React.FC<{className?: string}>;
    category: string;
    percentage: number;
    color: 'green' | 'yellow' | 'red';
}> = ({ Icon, category, percentage, color }) => {
    
    const colorClasses = {
        green: {
            bg: 'bg-green-100 dark:bg-green-900/50',
            text: 'text-green-600 dark:text-green-400'
        },
        yellow: {
            bg: 'bg-yellow-100 dark:bg-yellow-900/50',
            text: 'text-yellow-600 dark:text-yellow-400'
        },
        red: {
            bg: 'bg-red-100 dark:bg-red-900/50',
            text: 'text-red-600 dark:text-red-400'
        }
    };

    return (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color].bg}`}>
                <Icon className={`w-6 h-6 ${colorClasses[color].text}`} />
            </div>
            <p className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-200">{percentage}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{category}</p>
        </div>
    )
}

const Summary: React.FC<{ history: HistoryItem[] }> = ({ history }) => {
    const stats = useMemo(() => {
        const total = history.length;
        if (total === 0) return { recyclable: 0, organic: 0, hazardous: 0 };

        const counts = history.reduce((acc, item) => {
            const category = item.result.category;
            if (category === 'Recyclable') acc.recyclable++;
            else if (category === 'Organic') acc.organic++;
            else if (category === 'Hazardous') acc.hazardous++;
            return acc;
        }, { recyclable: 0, organic: 0, hazardous: 0 });

        return {
            recyclable: Math.round((counts.recyclable / total) * 100),
            organic: Math.round((counts.organic / total) * 100),
            hazardous: Math.round((counts.hazardous / total) * 100),
        };
    }, [history]);

    return (
         <div className="grid grid-cols-3 gap-3">
            <SummaryCard Icon={RecycleIcon} category="Recyclable" percentage={stats.recyclable} color="green" />
            <SummaryCard Icon={LeafIcon} category="Organic" percentage={stats.organic} color="yellow" />
            <SummaryCard Icon={HazardIcon} category="Hazardous" percentage={stats.hazardous} color="red" />
        </div>
    )
}

const Scanner: React.FC<ScannerProps> = ({ onAddToHistory, history }) => {
    const [image, setImage] = useState<{data: string, uri: string} | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = async (base64Data: string, mimeType: string) => {
        const fullDataUri = `data:${mimeType};base64,${base64Data}`;
        setImage({ data: base64Data, uri: fullDataUri });
        setIsLoading(true);
        setResult(null);
        setError(null);
        try {
            const analysisResult = await analyzeImage(base64Data, mimeType);
            setResult(analysisResult);
            onAddToHistory({
                image: fullDataUri,
                result: analysisResult,
                points: Math.round(analysisResult.recyclabilityScore / 10), // Example points logic
            });
        } catch (e: any) {
            console.error(e);
            setError(e.message || 'Failed to analyze image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleScanAgain = () => {
        setResult(null);
        setImage(null);
        setError(null);
    };

    return (
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
            {error && (
                <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 dark:bg-red-900/50 dark:text-red-200 rounded-lg" role="alert">
                    <span className="font-medium">Error!</span> {error}
                </div>
            )}
            
            {!result ? (
                <div className="space-y-4">
                    <ImageUploader 
                        onImageUpload={handleImageUpload} 
                        isLoading={isLoading} 
                        imagePreviewUrl={image?.uri} 
                    />
                    <Summary history={history} />
                </div>
            ) : image && (
                <ResultDisplay result={result} onScanAgain={handleScanAgain} imageUri={image.uri} />
            )}
        </div>
    );
};

export default Scanner;