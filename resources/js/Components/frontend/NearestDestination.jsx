import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React, { useEffect, useRef, useState } from 'react';
import LocationCard from './LocationCard';
import Map from './Map';

export default function NearestLocations() {

    const [userLocation, setUserLocation] = useState(null);
    const [locations, setLocations] = useState([]);
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const isLoading = false;
    const mapRef = useRef(null);


    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    console.log("Lokasi pengguna:", lat, lng);
                    setUserLocation({ lat, lng });
                },
                (error) => {
                    console.error("Error mendapatkan lokasi:", error);
                }
            );
        } else {
            console.error("Geolocation tidak didukung oleh browser ini.");
        }
    };

    const fetchNearestDestinations = async (userLoc, maxDistanceKm) => {
        try {
            const response = await fetch('/api/nearest-destinations?lat=' + userLoc.lat + '&lng=' + userLoc.lng + '&max_distance_km=' + maxDistanceKm);
            const data = await response.json();
            console.log("Data destinasi terdekat dari API:", data);
            return data;

        } catch (error) {
            console.log("Error fetching nearest destinations:", error);
        }
    };

    useEffect(() => {
        if (userLocation) {
            fetchNearestDestinations(userLocation, 10).then(data => {
                if (data && data.locations && data.locations.length > 0) {
                    setLocations(data.locations);
                    setCurrentLocationIndex(0);
                    setSelectedLocation(data.locations[0]);
                } else {
                    setLocations([]);
                    setSelectedLocation(null);
                }
            });
        }
    }, [userLocation]);

    useEffect(() => {
        if (locations.length > 0 && currentLocationIndex >= 0 && currentLocationIndex < locations.length) {
            setSelectedLocation(locations[currentLocationIndex]);
        }
    }, [currentLocationIndex, locations]);

    useEffect(() => {
        mapRef.current?.startNavigation();
    }, [currentLocationIndex]);

    useEffect(() => {
        getUserLocation();
    }, []);

    if (isLoading) {
        return <div className="p-4">Memuat lokasi terdekat...</div>;
    }

    if (!userLocation || locations.length === 0) {
        return null;
    }

    const handlePreviousClick = (e) => {
        if (currentLocationIndex > 0) {
            const newIndex = currentLocationIndex - 1;
            setCurrentLocationIndex(newIndex);
            setSelectedLocation(locations[newIndex]);
            console.log(`Pindah ke lokasi index: ${newIndex}`);
        } else {
            console.log("Sudah di awal daftar.");
        }
    };

    const handleNextClick = (e) => {
        if (currentLocationIndex < locations.length - 1) {
            const newIndex = currentLocationIndex + 1;
            setCurrentLocationIndex(newIndex);
            setSelectedLocation(locations[newIndex]);
            console.log(`Pindah ke lokasi index: ${newIndex}`);
        } else {
            console.log("Sudah di akhir daftar.");
        }
    };


    return (
        <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl shadow-xl border border-blue-200">
            <div>
                <header className="p-6 bg-gradient-to-r from-sky-400 to-blue-500 rounded-t-2xl">
                    <h2 className="text-4xl font-bold text-white drop-shadow-lg">Wisata Terdekat</h2>
                    <p className="text-blue-100 mt-2">Temukan destinasi menarik di sekitar Anda</p>
                </header>
            </div>
            <div className="p-6 flex flex-wrap gap-3 justify-center bg-white/50 backdrop-blur-sm">
                <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                    500 Meter
                </button>
                <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                    1 Kilometer
                </button>
                <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                    5 Kilometer
                </button>
                <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                    10 Kilometer
                </button>
                <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                    20 Kilometer
                </button>
            </div>
            <div className='flex p-6 gap-6 justify-center items-stretch'>
                <div className='w-1/2 relative bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg'>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {locations.map(location => (
                                <CarouselItem key={location.id} className="pl-4">
                                    <LocationCard location={location} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 bg-sky-500 hover:bg-sky-600 text-white border-none shadow-lg" onClick={handlePreviousClick} />
                        <CarouselNext className="right-2 bg-sky-500 hover:bg-sky-600 text-white border-none shadow-lg" onClick={handleNextClick} />
                    </Carousel>
                </div>

                <div className="w-1/2 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <Map
                        lat={
                            selectedLocation.latitude
                        }
                        long={
                            selectedLocation.longitude
                        }
                        location={selectedLocation}
                        ref={mapRef}
                    />
                </div>
            </div>
        </div>
    );
}