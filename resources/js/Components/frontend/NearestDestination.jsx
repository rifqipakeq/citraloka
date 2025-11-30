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
        <div className="rounded-2xl shadow-xl border border-blue-200">
            <div>
                <header className="p-2 bg-white text-black rounded-t-2xl flex flex-col items-center justify-center drop-shadow-md">
                    <h2 className="text-lg font-semibold mb-1.5 text-primary-opaque">Nearest Destinations</h2>
                    <p className="text-gray-500 mt-2">Discover exciting destinations around you</p>
                </header>
            </div>
            <div className='flex p-6 justify-center'>
                <div className='w-1/2 relative bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg'>
                    <Carousel className="flex items-center justify-center">
                        <CarouselContent>
                            {locations.map(location => (
                                <CarouselItem key={location.id} className="flex items-center justify-center">
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