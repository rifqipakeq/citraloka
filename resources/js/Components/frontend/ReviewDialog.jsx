import { calculateRating, getStars } from "@/Utils/helper";
import ReviewCard from "./ReviewCard";
import Dropdown from "../ui/Dropdown";
import { useEffect, useState } from "react";
import { optionSortByDate } from "@/Utils/constants";

export default function ReviewDialog({ isOpen, setIsOpen, reviews, ratings }) {
    const [orderBy, setOrderBy] = useState("");
    const [search, setSearch] = useState("");
    const [filteredReviews, setFilteredReviews] = useState(reviews);

    useEffect(() => {
        if (orderBy === "newest") {
            setFilteredReviews((prev) =>
                [...prev].sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                }),
            );
        } else if (orderBy === "oldest") {
            setFilteredReviews((prev) =>
                [...prev].sort((a, b) => {
                    return new Date(a.created_at) - new Date(b.created_at);
                }),
            );
        } else {
            setFilteredReviews(reviews);
        }
    }, [orderBy, reviews]);

    const handleBackdropClick = (event) => {
        if (!event) return;

        const dialog = event.target;
        if (dialog.tagName === "DIALOG") {
            setIsOpen(false);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value)
        const filtered = reviews.filter((review) =>
            review.review.toLowerCase().includes(e.target.value.toLowerCase()),
        );
        setFilteredReviews(filtered);
    }

    return (
        <dialog
            open={isOpen}
            onClick={handleBackdropClick}
            className={`group fixed left-0 top-0 !z-[999] m-0 grid h-screen w-screen place-content-center p-0",
                ${isOpen ? "block" : "hidden"}`}
        >
            <div className="flex items-center justify-center rounded-xl bg-white p-6 w-full md:w-[700px] lg:w-[800px]">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-3xl text-primary-opaque font-semibold">
                                Ulasan
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:cursor-pointer"
                        >
                            <i className="bi bi-x-lg text-2xl text-gray-500 hover:text-gray-700"></i>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div className="col-span-1 px-4">
                            <div className="flex flex-col items-center justify-center px-12">
                                <img
                                    src="/assets/badge.webp"
                                    alt="Score badge"
                                    draggable="false"
                                    className=""
                                />
                                <p className="font-bold text-white text-4xl -mt-21 z-10">
                                    {calculateRating(ratings)}
                                </p>
                            </div>
                            <div className="flex items-center justify-evenly gap-1 mt-16 w-full px-12">
                                {getStars(calculateRating(ratings), "text-xl text-xyellow", false)}
                            </div>
                            <div className="text-center mt-4">
                                <p className="text-lg font-semibold text-gray-600">
                                    Pilihan Tamu
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Rumah ini menjadi favorit tamu berdasarkan
                                    penilaian, ulasan, dan keandalannya
                                </p>
                            </div>
                            <div className="mt-4 w-full">
                                <p className="font-medium text-gray-600 text-sm">
                                    Nilai Keseluruhan
                                </p>
                                <div className="flex items-center justify-between gap-2 mt-2">
                                    <span className="text-xs text-gray-500">
                                        {ratings.rate_kebersihan}
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value={ratings.rate_kebersihan}
                                        max="5"
                                    ></progress>
                                </div>
                                <div className="flex items-center justify-between gap-2 mt-2">
                                    <span className="text-xs text-gray-500">
                                        {ratings.rate_keakuratan}
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value={ratings.rate_keakuratan}
                                        max="5"
                                    ></progress>
                                </div>
                                <div className="flex items-center justify-between gap-2 mt-2">
                                    <span className="text-xs text-gray-500">
                                        {ratings.rate_checkin}
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value={ratings.rate_checkin}
                                        max="5"
                                    ></progress>
                                </div>
                                <div className="flex items-center justify-between gap-2 mt-2">
                                    <span className="text-xs text-gray-500">
                                        {ratings.rate_komunikasi}
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value={ratings.rate_komunikasi}
                                        max="5"
                                    ></progress>
                                </div>
                                <div className="flex items-center justify-between gap-2 mt-2">
                                    <span className="text-xs text-gray-500">
                                        {ratings.rate_lokasi}
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value={ratings.rate_lokasi}
                                        max="5"
                                    ></progress>
                                </div>
                                <div className="flex items-center justify-between gap-2 mt-2">
                                    <span className="text-xs text-gray-500">
                                        {ratings.rate_nilaiekonomis}
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value={ratings.rate_nilaiekonomis}
                                        max="5"
                                    ></progress>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/assets/icon_broom.svg"
                                            alt="Kebersihan"
                                        />
                                        <p className="font-medium">
                                            Kebersihan
                                        </p>
                                    </div>
                                    <p>
                                        <i className="bi bi-star-fill mr-2" />
                                        <span className="font-semibold">
                                            {ratings.rate_kebersihan}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/assets/icon_location.svg"
                                            alt="Keakuratan"
                                        />
                                        <p className="font-medium">
                                            Keakuratan
                                        </p>
                                    </div>
                                    <p>
                                        <i className="bi bi-star-fill mr-2" />
                                        <span className="font-semibold">
                                            {ratings.rate_keakuratan}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/assets/icon_key.svg"
                                            alt="Check-in"
                                        />
                                        <p className="font-medium">Check-in</p>
                                    </div>
                                    <p>
                                        <i className="bi bi-star-fill mr-2" />
                                        <span className="font-semibold">
                                            {ratings.rate_checkin}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/assets/icon_chat.svg"
                                            alt="Komunikasi"
                                        />
                                        <p className="font-medium">
                                            Komunikasi
                                        </p>
                                    </div>
                                    <p>
                                        <i className="bi bi-star-fill mr-2" />
                                        <span className="font-semibold">
                                            {ratings.rate_komunikasi}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/assets/icon_map.svg"
                                            alt="Lokasi"
                                        />
                                        <p className="font-medium">Lokasi</p>
                                    </div>
                                    <p>
                                        <i className="bi bi-star-fill mr-2" />
                                        <span className="font-semibold">
                                            {ratings.rate_lokasi}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/assets/icon_wallet.svg"
                                            alt="Nilai Ekonomis"
                                        />
                                        <p className="font-medium">
                                            Nilai Ekonomis
                                        </p>
                                    </div>
                                    <p>
                                        <i className="bi bi-star-fill mr-2" />
                                        <span className="font-semibold">
                                            {ratings.rate_nilaiekonomis}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto mt-8 md:col-span-2 ml-4">
                            <div className="mb-6 flex w-full items-center justify-between px-1">
                                <p className="text-gray-500 text-xl">
                                    Semua Ulasan{" "}
                                    <span className="font-semibold text-gray-600">
                                        ({reviews.length})
                                    </span>
                                </p>
                                <Dropdown
                                    options={optionSortByDate}
                                    value={orderBy}
                                    onChange={setOrderBy}
                                    placeholder="Paling Baru"
                                />
                            </div>
                            <search className="mb-6">
                                <div className="relative w-full px-1">
                                    <input
                                        type="text"
                                        className="w-full rounded-full border border-gray-300 placeholder:text-sm placeholder:text-gray-500"
                                        placeholder="Cari Ulasan"
                                        value={search}
                                        onChange={handleSearch}
                                    />
                                    <i className="bi bi-search absolute top-1/2 -translate-y-1/2 right-4"></i>
                                </div>
                            </search>
                            {filteredReviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
