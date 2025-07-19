import React from "react";
import DestinationCard from "@/Components/frontend/DestinationCard";
import ReactPaginate from "react-paginate";
import Navbar from "@/Components/ui/navbar";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Location() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState("");

    const categories = [
        {
            label: "All",
            value: "all",
        },
        {
            label: "Popular",
            value: "popular",
        },
        {
            label: "Nature",
            value: "nature",
        },
        {
            label: "Culinary",
            value: "culinary",
        },
        {
            label: "History & Education",
            value: "history_education",
        },
        {
            label: "Arts & Culture",
            value: "arts_culture",
        },
        {
            label: "Shop & Market",
            value: "shop_market",
        },
        {
            label: "Theme Park",
            value: "theme_park",
        },
    ];

    const destinations = [
        {
            id: 1,
            title: "Labuan Bajo",
            category: "Mountain",
            price: 5000000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "Lorem ipsum dolor sit amet",
        },
        {
            id: 2,
            title: "Labuan Bajo",
            category: "Beach",
            price: 5000000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "Lorem ipsum dolor sit amet",
        },
        {
            id: 3,
            title: "Labuan Bajo",
            category: "Shop & Market",
            price: 5000000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "Lorem ipsum dolor sit amet",
        },
        {
            id: 4,
            title: "Labuan Bajo",
            category: "History & Education",
            price: 5000000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "Lorem ipsum dolor sit amet",
        },
        {
            id: 5,
            title: "Labuan Bajo",
            category: "Arts & Culture",
            price: 5000000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "Lorem ipsum dolor sit amet",
        },
        {
            id: 6,
            title: "Labuan Bajo",
            category: "Theme Park",
            price: 5000000,
            time: "8.00AM - 9.30AM",
            rating: 4.5,
            image: "/assets/flores.jpg",
            description: "Lorem ipsum dolor sit amet",
        },
    ];

    const endOffset = itemOffset + 3;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = destinations.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(destinations.length / 3);

    const handlePageClick = (e) => {
        const newOffset = (e.selected * 3) % destinations.length;
        console.log(
            `User requested page number ${e.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Head title="Welcome" />
            <div>
                <Navbar />
                <section className="relative flex flex-col px-4 items-center font-poppins pt-40">
                    <div className="w-full h-[37.5rem] locations-hero absolute top-0 left-0 -z-10"></div>
                    <div className="flex flex-col md:flex-row gap-8 justify-between items-center container mx-auto">
                        <div className="w-full">
                            <h1 className="text-4xl font-semibold text-primary-opaque">
                                Location
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
                                className="py-3.5 px-8 text-white rounded-xl font-semibold bg-primary-opaque hover:cursor-pointer hover:bg-primary-hover transition-all"
                            >
                                Search
                            </button>
                        </search>
                    </div>
                    <div className="mt-12 flex container mx-auto flex-wrap gap-4">
                        {categories.map((category) => {
                            const isSelected =
                                selectedCategory === category.value;
                            return (
                                <button
                                    key={category.value}
                                    onClick={() =>
                                        setSelectedCategory(category.value)
                                    }
                                    className={`text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all ${
                                        isSelected
                                            ? "bg-primary-opaque text-white"
                                            : "bg-white text-gray-500  hover:bg-gray-100"
                                    }`}
                                >
                                    {category.label}
                                </button>
                            );
                        })}
                    </div>
                </section>

                <main className="container px-4 relative mx-auto mt-12 mb-32 z-10 font-poppins">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
                        {destinations.map((item) => (
                            <DestinationCard item={item} />
                        ))}
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next →"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="← Prev"
                            renderOnZeroPageCount={null}
                            containerClassName="list-unstyled py-4 flex items-center justify-center gap-4 w-full"
                            previousClassName="mr-auto font-poppins text-gray-500 font-medium hover:cursor-pointer"
                            nextClassName="ml-auto font-poppins text-gray-500 font-medium hover:cursor-pointer"
                            pageClassName="w-12 h-12 hover:cursor-pointer grid place-content-center rounded-full aspect-square text-gray-500 hover:bg-primary-transparent font-medium font-popping"
                            activeClassName="w-12 h-12 hover:cursor-pointer grid place-content-center rounded-full aspect-squre text-gray-500 bg-primary-transparent text-primary-opaque font-medium font-poppins"
                        />
                    </div>
                </main>
            </div>
        </>
    );
}
