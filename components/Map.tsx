import React, { useState, useEffect } from 'react';
import { LocationPinIcon, SendIcon } from './icons';

interface Coordinates {
    lat: number;
    lng: number;
}

interface RecyclingCenter {
    id: number;
    name: string;
    address: string;
    coordinates: Coordinates;
    distance?: number;
}

const getDistance = (coords1: Coordinates, coords2: Coordinates): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (coords2.lat - coords1.lat) * (Math.PI / 180);
    const dLng = (coords2.lng - coords1.lng) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coords1.lat * (Math.PI / 180)) * Math.cos(coords2.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const recyclingCentersData: RecyclingCenter[] = [
    { id: 1, name: 'Eco-Friendly Recyclers', address: '123 Green Way, Chennai', coordinates: { lat: 13.0827, lng: 80.2707 } },
    { id: 2, name: 'SIDCO Industrial Estate', address: '26, Thirumazhisai, Chennai, Tamil Nadu 600124', coordinates: { lat: 13.05, lng: 80.05 } },
    { id: 3, name: 'Chennai Waste Management', address: '456 Recycle Ave, Chennai', coordinates: { lat: 13.01, lng: 80.23 } },
    { id: 4, name: 'Planet Savers Inc.', address: '789 Earth St, Chennai', coordinates: { lat: 13.1, lng: 80.15 } },
];

const Map: React.FC = () => {
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
    const [sortedCenters, setSortedCenters] = useState<RecyclingCenter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const location = { lat: latitude, lng: longitude };
                setUserLocation(location);

                const centersWithDistance = recyclingCentersData.map(center => ({
                    ...center,
                    distance: getDistance(location, center.coordinates)
                }));
                
                centersWithDistance.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
                setSortedCenters(centersWithDistance);
                setLoading(false);
            },
            (err) => {
                setError(`Location access denied`);
                setLoading(false);
            }
        );
    }, []);

    return (
        <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                 <div className="flex items-center space-x-3">
                    <SendIcon className="w-6 h-6 text-green-500" />
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Your Location</h3>
                        {loading && <p className="text-sm text-gray-500 dark:text-gray-400">Fetching location...</p>}
                        {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
                        {userLocation && <p className="text-sm text-gray-500 dark:text-gray-400">Location access granted</p>}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Recycling Centers</h3>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{sortedCenters.length} found</span>
            </div>

            {loading ? (
                 <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md" role="status">
                     <div className="w-8 h-8 border-2 border-t-transparent border-green-500 rounded-full animate-spin mx-auto"></div>
                 </div>
            ) : sortedCenters.length > 0 ? (
                <ul className="space-y-3">
                    {sortedCenters.map((center, index) => (
                        <li key={center.id} 
                             className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-4">
                                     <LocationPinIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1" />
                                     <div>
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200">{center.name}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{center.address}</p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-2">
                                    <p className="font-bold text-green-600 dark:text-green-400">{center.distance?.toFixed(1)} km</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : !error && (
                 <div className="text-center p-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <p>Could not find any recycling centers near you.</p>
                </div>
            )}
        </div>
    );
};

export default Map;