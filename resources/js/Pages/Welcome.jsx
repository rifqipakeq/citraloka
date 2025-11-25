import Navbar from "@/Components/ui/Navbar";
import { Head } from "@inertiajs/react";
import { categories } from "@/Utils/constants";
import { useState } from "react";

import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import NearestDestination from "@/Components/frontend/NearestDestination.jsx";
import NearestLocations from "@/Components/frontend/NearestDestination.jsx";



export default function Welcome({categories, auth }) {
    const [search, setSearch] = useState("");


    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("location.index"), {
            search: search,
        });
    };



    // Fake data for demonstration
    const fakeDestinations = [
        {
            id: 1,
            name: "Bali Beach Resort",
            location: "Bali, Indonesia",
            distance: "2.5 km away",
            image_url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop"
        },
        {
            id: 2,
            name: "Yogyakarta Palace",
            location: "Yogyakarta, Indonesia", 
            distance: "1.2 km away",
            image_url: "https://images.unsplash.com/photo-1555400113-bdc8463e4cb1?w=400&h=300&fit=crop"
        },
        {
            id: 3,
            name: "Mount Bromo",
            location: "East Java, Indonesia",
            distance: "5.8 km away", 
            image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
        }
    ];

    const fakeCategoriesData = categories.length > 0 ? categories : [
        {
            id: 1,
            name: "Beach",
            image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"
        },
        {
            id: 2, 
            name: "Mountain",
            image_url: "https://images.unsplash.com/photo-1464822759844-d150baec013c?w=400&h=300&fit=crop"
        },
        {
            id: 3,
            name: "Cultural",
            image_url: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=300&fit=crop"
        }
    ];

    return (
        <>
            <Head title="Welcome"/>
                <UserLayout auth={auth}>
                    <section
                        className="relative flex flex-col items-center w-full h-[60vh] homepage-hero font-poppins"
                        >
                        <h1
                            className="text-5xl font-semibold text-[#38505C] text-center mt-48 sm:mt-64"
                        >
                            Find The Best Vacation Spots
                        </h1>

                        <div
                            className="absolute left-1/2 bottom-[-4rem] transform -translate-x-1/2 bg-white rounded-4xl shadow-custom px-8 py-10 w-[90%] max-w-[800px] z-10"
                        >
                            <div className="mb-6 sm:mb-10">
                            <p className="text-lg font-semibold mb-1.5 text-primary-opaque">
                                Find Destinations
                            </p>
                            <p className="text-gray-500">
                                Discover the Best Destination in Indonesia
                            </p>
                            </div>
                            <form 
                                className="flex flex-col sm:flex-row gap-4 w-full"
                                onSubmit={handleSearch}
                            >
                                <input
                                    type="text"
                                    placeholder="Search for a destination"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl border border-gray-300"
                                />
                                <button
                                    type="submit"
                                    className="py-3.5 px-8 text-white rounded-xl font-semibold bg-primary-opaque hover:cursor-pointer hover:bg-primary-hover transition-all"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </section>

                    <main
                        className="container mx-auto grid grid-cols-1 gap-12 my-32 px-4"
                        >
                            <div>
                                <NearestLocations />
                            </div>
                            <div className="container mx-auto grid md:grid-cols-4 grid-cols-1 gap-12 my-32 px-4">
                                {categories.map((category, index) => (
                                    <div 
                                        key={index}
                                        onClick={() =>
                                            router.get(route("location.index"), {
                                                category: category.id,
                                            })
                                        }
                                        className="relative flex flex-col items-center hover:cursor-pointer"
                                    >
                                        <img
                                            src={category.image_url}
                                            alt={category.name}
                                            className="w-full"
                                            draggable="false"
                                        />
                                        
                                    </div>
                                ))}
                            </div>
                    </main>
                </UserLayout>    
        </>
    )
}
