import Navbar from "@/Components/ui/Navbar";
import { Head } from "@inertiajs/react";
import DestinationCard from "@/Components/frontend/DestinationCard";
import Dropdown from "@/Components/ui/Dropdown";
import {
    optionsCategories,
    optionsLocations,
    optionsPriceRanges,
    optionsSorts,
} from "@/Utils/constants";
import { useState } from "react";

export default function Maps() {
    const [category, setCategory] = useState("all");
    const [location, setLocation] = useState("all");
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [sortBy, setSortBy] = useState("");

    const destinations = [
        {
            id: 1,
            title: "Labuan Bajo",
            category: "Mountain",
            price: 500000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "lorem ipsum dolor sit amet",
        },
        {
            id: 2,
            title: "Labuan Bajo",
            category: "Beach",
            price: 500000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "lorem ipsum dolor sit amet",
        },
        {
            id: 3,
            title: "Labuan Bajo",
            category: "Shop & Market",
            price: 500000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "lorem ipsum dolor sit amet",
        },
        {
            id: 4,
            title: "Labuan Bajo",
            category: "History & Education",
            price: 500000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "lorem ipsum dolor sit amet",
        },
        {
            id: 5,
            title: "Arts & Culture",
            category: "Mountain",
            price: 500000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "lorem ipsum dolor sit amet",
        },
        {
            id: 6,
            title: "Labuan Bajo",
            category: "Theme Park",
            price: 500000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "lorem ipsum dolor sit amet",
        },
    ];

    return (
        <>
            <Head title="Maps" />
            <div>
                <Navbar />
                <section className="relative flex flex-col px-4 items-center font-poppins pt-40">
                    <div className="w-full h-[37.5rem] locations-hero absolute top-0 left-0 -z-10"></div>
                    <div className="flex flex-col md:flex-row gap-8 justify-between items-center container mx-auto">
                        <div className="w-full">
                            <h1 className="text-4xl font-semibold text-primary-opaque">
                                Maps
                            </h1>
                            <p className="text-white mt-4">
                                Dapatkan Pengalaman Liburan Terbaik di sini
                            </p>
                        </div>
                        <search className="flex flex-col sm:flex-row gap-4 w-full">
                            <input
                                type="text"
                                placeholder="Search for a destination"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white"
                            />
                            <button
                                type="submit"
                                className="py-3.5 px-8 text-white rounded-xl font-semibold bg-primary-opaque"
                            >
                                Search
                            </button>
                        </search>
                    </div>
                    <div className="mt-12 flex container mx-auto justify-between flex-wrap gap-4">
                        <div className="flex flex-wrap gap-4">
                            <Dropdown
                                options={optionsCategories}
                                value={category}
                                onChange={setCategory}
                            />
                            <Dropdown
                                options={optionsLocations}
                                value={location}
                                onChange={setLocation}
                            />
                            <Dropdown
                                options={optionsPriceRanges}
                                value={priceRange}
                                onChange={setPriceRange}
                            />
                        </div>
                        <Dropdown
                            options={optionsSorts}
                            value={sortBy}
                            onChange={setSortBy}
                        />
                    </div>
                </section>

                <main className="container relative mx-auto px-4 grid grid-cols-12 gap-4 sm:gap-12 mt-12 mb-32 z-10 font-poppins">
                    <div className="flex flex-col gap-12 col-span-12 md:col-span-4">
                        {destinations.map((item) => (
                            <DestinationCard item={item} />
                        ))}
                    </div>

                    <div className="col-span-12 md:col-span-8">
                        <div
                            id="maps"
                            className="h-[600px] w-full sticky top-36 rounded-3xl overflow-hidden"
                        ></div>
                    </div>
                </main>
            </div>
        </>
    );
}
