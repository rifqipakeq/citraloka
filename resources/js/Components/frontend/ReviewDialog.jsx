import { getStars } from "@/Utils/helper";
import ReviewCard from "./ReviewCard";
import Dropdown from "../ui/Dropdown";
import { useState } from "react";
import { optionsSortByDate } from "@/Utils/constants";

export default function ReviewDialog({ isOpen, setIsOpen, reviews }) {
    const [orderBy, setOrderBy] = useState("");

    const handleBackdropClick = (e) => {
        if (!e) return;

        if (e.target.tagName === "DIALOG") {
            setIsOpen(false);
        }
    };

    return (
        <dialog
            open={isOpen}
            onClick={handleBackdropClick}
            className={`fixed left-0 top-0 !z-[999] m-0 grid h-screen w-screen place-content-center bg-black bg-opacity-50 p-4`}
        >
            <div className="flex max-h-[90vh] w-full flex-col rounded-xl bg-white p-6 md:w-[700px] lg:w-[800px]">
                <div className="mb-4 flex flex-shrink-0 items-center justify-between border-b pb-4">
                    <p className="text-2xl font-semibold text-primary-opaque md:text-3xl">
                        Ulasan
                    </p>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="hover:cursor-pointer"
                    >
                        <i className="bi bi-x-lg text-2xl text-gray-500 hover:text-gray-700"></i>
                    </button>
                </div>

                <div className="grid flex-grow grid-cols-1 gap-8 overflow-y-auto md:grid-cols-3">
                    <div className="md:col-span-1">
                        <div className="mb-6 flex flex-col items-center justify-center">
                            <div className="relative">
                                <img
                                    src="/assets/badge.webp"
                                    alt="Score Badge"
                                    draggable="false"
                                    className="h-32 w-32"
                                />
                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white">
                                    4
                                </p>
                            </div>
                            <div className="mt-2 flex items-center justify-evenly gap-1">
                                {getStars(4, "text-xl text-xyellow", false)}
                            </div>
                            <div className="mt-2 text-center">
                                <p className="text-lg font-semibold text-gray-600">
                                    Pilihan Tamu
                                </p>
                                <p className="text-sm text-gray-500">
                                    Salah satu favorit di platform kami.
                                </p>
                            </div>
                        </div>

                        <div className="mb-6 w-full">
                            <p className="mb-2 text-sm font-medium text-gray-600">
                                Nilai Keseluruhan
                            </p>
                            <div className="mt-2 flex items-center justify-between gap-4">
                                <span className="text-xs text-gray-500">5</span>
                                <progress
                                    className="rating-progress"
                                    value="90"
                                    max="100"
                                ></progress>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-4">
                                <span className="text-xs text-gray-500">4</span>
                                <progress
                                    className="rating-progress"
                                    value="75"
                                    max="100"
                                ></progress>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-4">
                                <span className="text-xs text-gray-500">3</span>
                                <progress
                                    className="rating-progress"
                                    value="30"
                                    max="100"
                                ></progress>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-4">
                                <span className="text-xs text-gray-500">2</span>
                                <progress
                                    className="rating-progress"
                                    value="10"
                                    max="100"
                                ></progress>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-4">
                                <span className="text-xs text-gray-500">1</span>
                                <progress
                                    className="rating-progress"
                                    value="5"
                                    max="100"
                                ></progress>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between py-3 border-b text-sm text-gray-600">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/icon_broom.svg"
                                        alt="Kebersihan"
                                        className="h-5 w-5"
                                    />
                                    <p className="font-medium">Kebersihan</p>
                                </div>
                                <p className="flex items-center font-semibold">
                                    <i className="bi bi-star-fill mr-2 text-xyellow" />{" "}
                                    4.5
                                </p>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b text-sm text-gray-600">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/icon_location.svg"
                                        alt="Keakuratan"
                                        className="h-5 w-5"
                                    />
                                    <p className="font-medium">Keakuratan</p>
                                </div>
                                <p className="flex items-center font-semibold">
                                    <i className="bi bi-star-fill mr-2 text-xyellow" />{" "}
                                    4.8
                                </p>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/icon_key.svg"
                                        alt="Check-In"
                                    />
                                    <p className="font-medium">Check-In</p>
                                </div>
                                <p>
                                    <i className="bi bi-star-fill mr-2" />
                                    <span className="font-semibold">4,5</span>
                                </p>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/icon_chat.svg"
                                        alt="Komunikasi"
                                    />
                                    <p className="font-medium">Komunikasi</p>
                                </div>
                                <p>
                                    <i className="bi bi-star-fill mr-2" />
                                    <span className="font-semibold">4,5</span>
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
                                    <span className="font-semibold">4,5</span>
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
                                    <span className="font-semibold">4,5</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="mb-4 flex w-full items-center justify-between">
                            <p className="text-xl text-gray-500">
                                Semua Ulasan{" "}
                                <span className="font-semibold text-gray-600">
                                    ({reviews.length})
                                </span>
                            </p>
                            <Dropdown
                                options={optionsSortByDate}
                                value={orderBy}
                                onChange={setOrderBy}
                                placeholder="Paling Baru"
                            />
                        </div>
                        <div className="relative mb-6 w-full">
                            <i className="bi bi-search absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 placeholder:text-sm"
                                placeholder="Cari Ulasan"
                            />
                        </div>

                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <ReviewCard key={review.id} user={review} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
