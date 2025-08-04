import DestinationCard from "@/Components/frontend/DestinationCard";
import ReactPaginate from "react-paginate";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Location({ locations, filters, categories, auth }) {
    const [selectedCategory, setSelectedCategory] = useState(
        filters.category || ""
    );
    const [search, setSearch] = useState(filters.search || "");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route("location.index"), {
            search: search,
            category: selectedCategory,
        });
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        router.get(route("location.index"), {
            search: search,
            category: categoryId,
        });
    };

    return (
        <>
            <Head title="Welcome" />
            <UserLayout auth={auth}>
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
                        <form
                            onSubmit={handleSearchSubmit}
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
                                className="py-3.5 px-8 text-white rounded-xl font-semibold bg-primary-opaque hover:cursor-pointer hover:bg-primary-hover transition-all"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="mt-12 flex container mx-auto flex-wrap gap-4">
                        <button
                            key="all"
                            onClick={() => handleCategoryClick("")}
                            className={`text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-3.5 rounded-full hover:cursor-pointer ${
                                selectedCategory === ""
                                    ? "bg-primary-opaque text-white"
                                    : "bg-white text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            All
                        </button>
                        {categories.map((category) => {
                            const isSelected = selectedCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() =>
                                        handleCategoryClick(category.id)
                                    }
                                    className={`text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all ${
                                        isSelected
                                            ? "bg-primary-opaque text-white"
                                            : "bg-white text-gray-500  hover:bg-gray-100"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                </section>

                <main className="container px-4 relative mx-auto mt-12 mb-32 z-10 font-poppins">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
                        {locations.data &&
                            locations.data.map((item, id) => (
                                <DestinationCard item={item} key={id} />
                            ))}
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next →"
                            onPageChange={(e) =>
                                router.get(route("location.index"), {
                                    search: search,
                                    category: selectedCategory,
                                    page: e.selected + 1,
                                })
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
                </main>
            </UserLayout>
        </>
    );
}
