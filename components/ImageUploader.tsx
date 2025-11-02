import React, { useRef } from 'react';
import { CameraIcon, RecycleIcon } from './icons';

interface ImageUploaderProps {
    onImageUpload: (base64: string, mimeType: string) => void;
    isLoading?: boolean;
    imagePreviewUrl?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading = false, imagePreviewUrl }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            if (base64String) {
                onImageUpload(base64String, file.type);
            } else {
                console.error("Could not read file as base64 string.");
                alert("There was an error processing your image. Please try another one.");
            }
        };
        reader.onerror = () => {
            console.error("FileReader error");
            alert("There was an error reading your file. Please try again.");
        };
        reader.readAsDataURL(file);
    };

    const handleAreaClick = () => {
        fileInputRef.current?.click();
    };

    if (isLoading && imagePreviewUrl) {
        return (
            <div className="relative flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 min-h-[300px] shadow-sm overflow-hidden">
                <img src={imagePreviewUrl} alt="Preview" className="max-h-52 w-auto object-contain rounded-lg blur-sm scale-105" />
                <div className="absolute inset-0 bg-white/60 dark:bg-black/60 flex flex-col items-center justify-center text-center p-4" role="status">
                    <div className="relative flex items-center justify-center w-20 h-20">
                        <div className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" aria-hidden="true"></div>
                        <div className="relative inline-flex rounded-full h-16 w-16 bg-green-500 items-center justify-center">
                            <RecycleIcon className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <p className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-200 animate-pulse">Analyzing your item...</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Our AI is taking a close look.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload Image"
            />
            <button
                type="button"
                onClick={handleAreaClick}
                className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-green-400 transition-colors duration-300 rounded-2xl bg-white dark:bg-gray-800 min-h-[300px] shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-green-500"
            >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                    <CameraIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Tap to capture or upload</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Camera Preview</p>
            </button>
        </>
    );
};

export default ImageUploader;