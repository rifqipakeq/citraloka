import React, { use } from "react";
import ReviewCard from "@/Components/frontend/ReviewCard";
import Navbar from "@/Components/ui/Navbar";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import GalleryDialog from "@/Components/frontend/GalleryDialog";
import ReviewDialog from "@/Components/frontend/ReviewDialog";
import Dropdown from "@/Components/ui/Dropdown";

export default function Location() {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const [ticketAmount, setTicketAmount] = useState(1);
    const [ticketType, setTicketType] = useState("regular");

    const users = [
        {
            id: 1,
            name: "John Doe",
            profile_picture: "/assets/flores.jpg",
            rating: 4.5,
            review: "This place is amazing",
            created_at: "01-10-2023",
        },
    ];

    const pictures = [
        "/assets/flores.jpg",
        "/assets/flores.jpg",
        "/assets/flores.jpg",
        "/assets/flores.jpg",
        "/assets/flores.jpg",
        "/assets/flores.jpg",
        "/assets/flores.jpg",
    ];

    const calculateTicketPrice = () => {
        const ticketPrice = 100000;
        const tax = 10000;

        const totalPrice = ticketAmount * ticketPrice + tax;
        return totalPrice.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });
    };

    return (
        <>
            <Head title="Details" />
            <div>
                <Navbar />
                <section className="relative flex flex-col items-center font-poppins pt-40 px-4">
                    <div className="w-full h-[37.5rem] details-hero absolute top-0 left-0 -z-10"></div>
                    <div className="container mx-auto">
                        <div className="w-full">
                            <h1 className="text-4xl font-semibold">
                                <span className="text-white">
                                    Location &gt;{" "}
                                </span>
                                <span className="text-gray-500">
                                    Labuan Bajo
                                </span>
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 relative">
                            <div className="overflow-hidden object-cover aspect-[16/9.2]">
                                <img
                                    src="../public/assets/flores.jpeg"
                                    alt="Flores"
                                    className="w-full"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {pictures.slice(1, 5).map((picture, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="overflow-hidden object-cover aspect-video"
                                        >
                                            <img
                                                src={picture}
                                                alt={`Picture ${index + 1}`}
                                                className="w-full"
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                className="py-2.5 px-4.5 bg-white text-gray-400 rounded-full font-medium absolute right-4 bottom-4 text-xs"
                                onClick={() => setIsGalleryOpen(true)}
                            >
                                Tampilkan Semua Foto{" "}
                                <i className="bi bi-arrow-right"></i>
                            </button>

                            <GalleryDialog
                                isOpen={isGalleryOpen}
                                setIsOpen={setIsGalleryOpen}
                                destination="Labuan Bajo"
                                picture={pictures}
                            />
                        </div>
                    </div>
                </section>

                <main className="container mx-auto font-poppins mt-6 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
                        <div className="col-span-1 md:col-span-8">
                            <p className="py-1.5 px-6 bg-xgreen text-white rounded-full w-fit">
                                Mountain
                            </p>
                            <div className="mt-8">
                                <h2 className="text-3xl text-primary-opaque font-semibold">
                                    Labuan Bajo
                                </h2>
                                <div className="text-lg font-semibold">
                                    <span className="text-xorange">
                                        <i className="bi bi-star-fill"></i>{" "}
                                        <span>4.5</span>
                                    </span>
                                    <span className="text-gray-500">
                                        {" "}
                                        ● 188 Reviews
                                    </span>
                                </div>
                            </div>
                            <hr className="border my-9 border-gray-200" />
                            <div>
                                <h3 className="text-2xl font-semibold">
                                    <i className="bi bi-info-circle-fill text-gray-300"></i>
                                    <span className="text-gray-500">
                                        Information
                                    </span>
                                </h3>
                                <div className="flex gap-2.5 mt-4 items-center">
                                    <i className="bi bi-geo-alt text-gray-600"></i>
                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Address
                                        </p>
                                        <p className="text-gray-600 font-medium">
                                            Nusa Tenggara Selatan, Indonesia
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2.5 mt-4 items-center">
                                    <i className="bi bi-telephone text-gray-600"></i>
                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Phone
                                        </p>
                                        <p className="text-gray-600 font-medium">
                                            +23504-405-696
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2.5 mt-4 items-center">
                                    <i className="bi bi-clock text-gray-600"></i>
                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Office Hours
                                        </p>
                                        <p className="text-gray-600 font-medium">
                                            8.00 AM - 9.30 AM
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr className="border my-9 border-gray-200" />
                            <div>
                                <h3 className="mb-5 text-2xl font-semibold text-gray-500">
                                    Description
                                </h3>
                                <p className="text-gray-600">
                                    Gunung Semeru, dengan puncaknya yang dikenal
                                    sebagai Mahameru, adalah gunung tertinggi di
                                    Pulau Jawa dengan ketinggian 3.676 meter di
                                    atas permukaan laut. Gunung ini menjadi
                                    favorit para pendaki yang ingin menantang
                                    diri mereka untuk mencapai puncaknya yang
                                    megah. Salah satu daya tarik utama Semeru
                                    adalah Ranu Kumbolo, sebuah danau berair
                                    jernih yang menjadi tempat peristirahatan
                                    bagi para pendaki sebelum melanjutkan
                                    perjalanan menuju puncak.
                                </p>
                            </div>
                            <hr className="border my-9 border-gray-200" />
                            <div>
                                <h3 className="mb-5 text-2xl font-semibold text-gray-500">
                                    Maps
                                </h3>
                                <div className="flex gap-2.5 mt-4 items-center">
                                    <i className="bi bi-geo-alt text-gray-600"></i>
                                    <div>
                                        <p className="text-gray-600 font-medium">
                                            Nusa Tenggara Selatan, Indonesia
                                        </p>
                                        <p className="text-sm text-gray-400 underline">
                                            See in Maps
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <div
                                        id="maps"
                                        className="h-[600px] w-full sticky top-36 rounded-3xl overflow-hidden"
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-4">
                            <div className="flex gap-5 items-center py-5 w-full rounded-2xl bg-white shadow-lg justify-center border border-gray-200">
                                <i className="bi bi-tag-fill text-primary-opaque text-3xl scale-x-[-1]"></i>
                                <p className="font-semibold text-gray-500">
                                    The price includes all costs
                                </p>
                            </div>
                            <div className="p-6 w-full rounded-2xl bg-white shadow-lg border border-gray-200 mt-8">
                                <div className="bg-primary-transparent text-primary-opaque w-fit font-semibold py-3 px-6 rounded-xl">
                                    <i className="bi bi-ticket-perforated"></i>
                                    <span>123 Available Tickets</span>
                                </div>
                                <div className="w-full flex justify-between items-start mt-8">
                                    <span className="font-semibold text-gray-400">
                                        Ticket Type
                                    </span>
                                    <Dropdown
                                        options={[
                                            {
                                                label: "Regular",
                                                value: "regular",
                                            },
                                            {
                                                label: "VIP",
                                                value: "vip",
                                            },
                                        ]}
                                        value={ticketType}
                                        onChange={setTicketType}
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        <p className="text-sm text-gray-300">
                                            Ticket Price x1
                                        </p>
                                        <p className="text-xl font-semibold text-gray-600">
                                            Rp100.000,00
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6 justify-center">
                                        <button
                                            className="rounded-md bg-gray-200 transition-all hover:bg-gray-400 w-8 h-8 hover:cursor-pointer"
                                            onClick={() =>
                                                setTicketAmount(
                                                    ticketAmount - 1
                                                )
                                            }
                                            disabled={ticketAmount <= 1}
                                        >
                                            <i className="bi bi-dash"></i>
                                        </button>
                                        <p className="text-lg font-semibold text-gray-600">
                                            {ticketAmount}
                                        </p>
                                        <button
                                            className="rounded-md bg-gray-200 transition-all hover:bg-gray-400 w-8 h-8 hover:cursor-pointer"
                                            onClick={() =>
                                                setTicketAmount(
                                                    ticketAmount + 1
                                                )
                                            }
                                            disabled={ticketAmount >= 999}
                                        >
                                            <i className="bi bi-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <hr className="border my-9 border-gray-200" />
                                <div className="mb-9">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium text-gray-400">
                                            PPN
                                        </p>
                                        <p className="text-lg font-semibold text-gray-500">
                                            Rp10.000,00
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <p className="font-medium text-gray-400">
                                            Total Price
                                        </p>
                                        <p className="text-lg font-semibold text-gray-500">
                                            {calculateTicketPrice}
                                        </p>
                                    </div>
                                </div>
                                <button className="text-white bg-primary-opaque py-4 w-full rounded-xl font-semibold hover:bg-primary-hover transition-all hover:cursor-pointer">
                                    Pesan Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                <section className="container mx-auto font-poppins mb-32 px-4">
                    <hr className="border my-9 border-gray-200" />
                    <h3 className="text-2xl font-semibold text-gray-500">
                        <span>
                            <i className="bi bi-star-fill"></i> <span>4.5</span>
                        </span>
                        <span> ● 188 Reviews</span>
                    </h3>
                    <div className="grid grid-cols-2 md:flex flex-1 gap-4 mt-9">
                        <div className="border-0 md:border-r md:border-gray-200 px-4 w-full">
                            <p className="font-medium text-gray-600 text-sm">
                                Nilai Keseluruhan
                            </p>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">4</span>
                                <progress
                                    className="rating-progress"
                                    value="4"
                                    max="5"
                                ></progress>
                            </div>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">2</span>
                                <progress
                                    className="rating-progress"
                                    value="2"
                                    max="5"
                                ></progress>
                            </div>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">5</span>
                                <progress
                                    className="rating-progress"
                                    value="5"
                                    max="5"
                                ></progress>
                            </div>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">1</span>
                                <progress
                                    className="rating-progress"
                                    value="1"
                                    max="5"
                                ></progress>
                            </div>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">3</span>
                                <progress
                                    className="rating-progress"
                                    value="3"
                                    max="5"
                                ></progress>
                            </div>
                        </div>
                        <div className="border-0 md:border-r md:border-gray-200 px-4 w-full">
                            <p className="font-medium text-gray-600 text-sm">
                                Kebersihan
                            </p>
                            <div className="mt-4 text-sm text-gray-600 font-semibold">
                                <span>
                                    <i className="bi bi-star-fill"></i>{" "}
                                    <span>4.5</span>
                                </span>
                            </div>
                        </div>
                        <div className="border-0 md:border-r md:border-gray-200 px-4 w-full">
                            <p className="font-medium text-gray-600 text-sm">
                                Keakuratan
                            </p>
                            <div className="mt-4 text-sm text-gray-600 font-semibold">
                                <span>
                                    <i className="bi bi-star-fill"></i>{" "}
                                    <span>4.5</span>
                                </span>
                            </div>
                        </div>
                        <div className="border-0 md:border-r md:border-gray-200 px-4 w-full">
                            <p className="font-medium text-gray-600 text-sm">
                                Check-In
                            </p>
                            <div className="mt-4 text-sm text-gray-600 font-semibold">
                                <span>
                                    <i className="bi bi-star-fill"></i>{" "}
                                    <span>4.5</span>
                                </span>
                            </div>
                        </div>
                        <div className="border-0 md:border-r md:border-gray-200 px-4 w-full">
                            <p className="font-medium text-gray-600 text-sm">
                                Komunikasi
                            </p>
                            <div className="mt-4 text-sm text-gray-600 font-semibold">
                                <span>
                                    <i className="bi bi-star-fill"></i>{" "}
                                    <span>4.5</span>
                                </span>
                            </div>
                        </div>
                        <div className="border-0 md:border-r md:border-gray-200 px-4 w-full">
                            <p className="font-medium text-gray-600 text-sm">
                                Lokasi
                            </p>
                            <div className="mt-4 text-sm text-gray-600 font-semibold">
                                <span>
                                    <i className="bi bi-star-fill"></i>{" "}
                                    <span>4.5</span>
                                </span>
                            </div>
                        </div>
                        <div className="px-4 w-full">
                            <p className="font-medium text-gray-600 text-sm">
                                Nilai Ekonomis
                            </p>
                            <div className="mt-4 text-sm text-gray-600 font-semibold">
                                <span>
                                    <i className="bi bi-star-fill"></i>{" "}
                                    <span>4.5</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-16">
                        <div>
                            {users.map((user) => {
                                return (
                                    <ReviewCard key={user.id} user={user.id} />
                                );
                            })}
                        </div>
                    </div>

                    <button
                        className="py-3.5 px-6 rounded-lg border border-gray-400 text-gray-500 mt-8 font-medium hover:cursor-pointer hover:bg-gray-100 transition-all"
                        onClick={() => setIsReviewOpen(true)}
                    >
                        Tampilkan Semua
                        <span className="font-semibold text-gray-600">
                            253
                        </span>{" "}
                        Ulasan
                    </button>
                    <ReviewDialog
                        isOpen={isReviewOpen}
                        setIsOpen={setIsReviewOpen}
                        reviews={users}
                    />
                </section>
            </div>
        </>
    );
}
