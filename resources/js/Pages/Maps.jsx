import Navbar from "@/Components/ui/Navbar";
import { Head, router } from "@inertiajs/react";
import DestinationCard from "@/Components/frontend/DestinationCard";
import Dropdown from "@/Components/ui/Dropdown";
import { optionsPriceRanges, optionsSorts } from "@/Utils/constants";
import UserLayout from "@/Layouts/UserLayout";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

export default function Maps({
    locations,
    categories,
    filters,
    regions,
    auth,
}) {
    const [category, setCategory] = useState(filters.category || "all");
    const [location, setLocation] = useState(filters.region || "all");
    const [search, setSearch] = useState(filters.search || "");
    const [priceRange, setPriceRange] = useState(filters.price || "");
    const [sortBy, setSortBy] = useState(filters.sort || "");

    const handleFilterChange = () => {
        router.get(
            route("location.maps"),
            {
                search,
                category,
                region: location,
                price_range: priceRange,
                sort: sortBy,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    useEffect(() => {
        handleFilterChange();
    }, [category, location, sortBy, priceRange]);

    return (
        <>
            <Head title="Maps" />
            <UserLayout auth={auth}>
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
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleFilterChange();
                            }}
                            className="flex flex-col sm:flex-row gap-4 w-full"
                        >
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
                        </form>
                    </div>
                    <div className="mt-12 flex container mx-auto justify-between flex-wrap gap-4">
                        <div className="flex flex-wrap gap-4">
                            <Dropdown
                                options={[
                                    { label: "Semua Kategori", value: null },
                                    ...categories.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    })),
                                ]}
                                value={category}
                                onChange={setCategory}
                                placeholder="All Categories"
                            />
                            <Dropdown
                                options={[
                                    { label: "Semua Lokasi", value: null },
                                    ...regions.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    })),
                                ]}
                                value={location}
                                onChange={setLocation}
                                placeholder="All Locations"
                            />
                            <Dropdown
                                options={optionsPriceRanges}
                                value={priceRange}
                                onChange={setPriceRange}
                                placeholder="All Price"
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
                        {locations.data.map((item, id) => (
                            <DestinationCard item={item} key={id} />
                        ))}
                    </div>

                    <div className="col-span-12 md:col-span-8">
                        <div
                            id="maps"
                            className="h-[600px] w-full sticky top-36 rounded-3xl overflow-hidden"
                        ></div>
                    </div>
                </main>
                <div className="container mx-auto px-4 mb-32 z-10 font-poppins">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next →"
                        onPageChange={(e) =>
                            router.get(
                                route("location.maps"),
                                {
                                    search,
                                    category,
                                    region: location,
                                    price_range: priceRange,
                                    sort:sortBy,
                                    page: e.selected + 1,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                }
                            )
                        }
                        pageRangeDisplayed={5}
                        forcePage={locations.current_page - 1}
                        pageCount={locations.last_page}
                        previousLabel="← Prev"
                        renderOnZeroPageCount={null}
                        containerClassName="list-unstyled py-4 flex items-center justify-center gap-4 w-full"
                        previousClassName="mr-auto font-poppins text-gray-500 font-medium hover:cursor-pointer"
                        nextClassName="ml-auto font-poppins text-gray-500 font-medium hover:cursor-pointer"
                        pageClassName="w-12 h-12 hover:cursor-pointer grid place-content-center rounded-full aspect-square text-gray-500 hover:bg-primary-transparent font-medium font-poppins"
                        activeClassName="w-12 h-12 hover:cursor-pointer grid place-content-center rounded-full aspect-square text-gray-500 bg-primary-transparent text-primary-opaque font-medium font-poppins"
                    />
                </div>
            </UserLayout>
        </>
    );
}
