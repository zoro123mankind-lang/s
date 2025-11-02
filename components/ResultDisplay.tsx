import React from 'react';
import { AnalysisResult } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface ResultDisplayProps {
    result: AnalysisResult;
    imageUri: string;
    onScanAgain?: () => void; // Kept for original use case in Scanner
    onButtonClick?: () => void;
    buttonText?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, imageUri, onScanAgain, onButtonClick, buttonText }) => {
    const { itemName, recyclable, recyclabilityScore, instructions, alternatives, ecoFriendlyTip } = result;

    const scoreColor = recyclabilityScore > 75 ? 'bg-green-500' : recyclabilityScore > 40 ? 'bg-yellow-500' : 'bg-red-500';

    const handleButtonClick = onButtonClick || onScanAgain;
    const mainButtonText = buttonText || 'Scan Another Item';

    return (
        <div className="animate-fade-in space-y-4">
            <img src={imageUri} alt={itemName} className="w-full h-48 object-cover rounded-xl mb-4 shadow-md" />

            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{itemName}</h2>
                <div className={`mt-1 text-xl font-bold flex items-center justify-center ${recyclable === 'Yes' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {recyclable === 'Yes' ? (
                        <CheckCircleIcon className="w-6 h-6 mr-2" />
                    ) : (
                        <XCircleIcon className="w-6 h-6 mr-2" />
                    )}
                    <span>
                        {recyclable === 'Yes' ? 'Recyclable' : recyclable === 'No' ? 'Not Recyclable' : 'Uncertain'}
                    </span>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400" id="recyclability-score-label">Recyclability Score</h3>
                <div 
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-1"
                    role="progressbar"
                    aria-valuenow={recyclabilityScore}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-labelledby="recyclability-score-label"
                >
                    <div className={`${scoreColor} h-2.5 rounded-full`} style={{ width: `${recyclabilityScore}%` }}></div>
                </div>
                <p className="text-right font-bold text-sm text-gray-500 dark:text-gray-500">{recyclabilityScore}/100</p>
            </div>
            
            <div className="space-y-3 pt-2">
                 <div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">Instructions</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{instructions}</p>
                </div>
                
                {alternatives && alternatives.length > 0 && (
                     <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Eco-Friendly Alternatives</h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm space-y-1 pl-2">
                            {alternatives.map((alt, index) => <li key={index}>{alt}</li>)}
                        </ul>
                    </div>
                )}
                
                <div className="p-3 bg-green-50 dark:bg-green-900/50 rounded-lg">
                     <h3 className="font-semibold text-green-800 dark:text-green-300 text-sm">Eco Tip</h3>
                     <p className="text-green-700 dark:text-green-400 text-sm italic">"{ecoFriendlyTip}"</p>
                </div>
            </div>

            <button
                onClick={handleButtonClick}
                className="w-full mt-4 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors"
            >
                {mainButtonText}
            </button>
        </div>
    );
};

export default ResultDisplay;