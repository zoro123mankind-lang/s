
import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg z-10">
            <div className="w-16 h-16 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
