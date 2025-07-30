import ReviewCard from "@/Components/frontend/ReviewCard";
import Navbar from "@/Components/ui/Navbar";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import GalleryDialog from "@/Components/frontend/GalleryDialog";
import ReviewDialog from "@/Components/frontend/ReviewDialog";
import { categoryColors } from "@/Utils/constants";
import { toIDR } from "@/Utils/helper";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Location({
    auth,
    ratingAverages,
    ticketCategories,
    location,
}) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const [ticketAmount, setTicketAmount] = useState(1);
    const [ticketType, setTicketType] = useState(
        ticketCategories?.[0]?.id || null
    );

    const [ticketPrice, setTicketPrice] = useState(
        location.ticket
            .filter((ticket) => ticket.ticket_category_id === ticketType)
            .map((ticket) => ticket.price_per_pack)[0]
    );

    // potential error
    // useEffect(() => {
    //     setTicketPrice(
    //         location.ticket
    //             .filter((ticket) => ticket.ticket_category_id === ticketType)
    //             .map((ticket) => ticket.price_per_pack)[0]
    //     );
    // }, [ticketType, location.ticket]);

    useEffect(() => {
        const price = location.ticket.find(
            (ticket) => ticket.ticket_category_id === ticketType
        )?.price_per_pack;
        setTicketPrice(price || 0);
    }, [ticketType, location.ticket]);

    const calculateTicketPrice = () => {
        const tax = ticketPrice * 0.1 * ticketAmount;
        const totalPrice = ticketAmount * ticketPrice + tax;
        return totalPrice.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });
    };

    const orderTicket = () => {
        if (!auth.user) {
            router.get(route("login"));
            return;
        }
    };

    return (
        <>
            <Head title="Details" />
            <UserLayout auth={auth}>
                <section className="relative flex flex-col items-center font-poppins pt-40 px-4">
                    <div className="w-full h-[37.5rem] details-hero absolute top-0 left-0 -z-10"></div>
                    <div className="container mx-auto">
                        <div className="w-full">
                            <h1 className="text-4xl font-semibold">
                                <span className="text-white">
                                    Location &gt;{" "}
                                </span>
                                <span className="text-gray-500">
                                    {location.title}
                                </span>
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 relative">
                            <div className="overflow-hidden object-cover aspect-[16/9.2]">
                                {location.image_urls?.length > 0 && (
                                    <img
                                        src={location.image_urls[0]}
                                        alt={location.title}
                                        className="w-full"
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {location.image_urls
                                    .slice(1, 5)
                                    .map((picture, index) => {
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
                                destination={location.title}
                                pictures={location.image_urls}
                            />
                        </div>
                    </div>
                </section>

                <main className="container mx-auto font-poppins mt-6 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
                        <div className="col-span-1 md:col-span-8">
                            <p
                                className={`py-1.5 px-6 ${
                                    categoryColors[location.category.id]
                                } text-white rounded-full w-fit`}
                            >
                                {location.category.name}
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
                                        ● {location.reviews.length || 0} Reviews
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
                                            {location.address}
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
                                            {location.phone}
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
                                            {location.officehours}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr className="border my-9 border-gray-200" />
                            <div>
                                <h3 className="mb-5 text-2xl font-semibold text-gray-500">
                                    Description
                                </h3>
                                <p
                                    className="text-gray-600"
                                    dangerouslySetInnerHTML={{
                                        __html: location.description,
                                    }}
                                ></p>
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
                                            {location.address}
                                        </p>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
                                            target="_blank"
                                            rel="noopener noreffer"
                                            className="text-sm text-gray-400 underline"
                                        >
                                            See in Maps
                                        </a>
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
                                    <span>
                                        {location.ticket.qty} Available Tickets
                                    </span>
                                </div>
                                <div className="w-full flex justify-between items-start mt-8">
                                    <span className="font-semibold text-gray-400">
                                        Ticket Type
                                    </span>
                                    <Dropdown
                                        options={ticketCategories.map(
                                            (category) => {
                                                return {
                                                    label: category.name,
                                                    value: category.id,
                                                };
                                            }
                                        )}
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
                                            {toIDR(ticketPrice)}
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
                                            disabled={
                                                ticketAmount >= 999 ||
                                                !auth.user
                                            }
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
                                            {toIDR(
                                                ticketPrice * 0.1 * ticketAmount
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <p className="font-medium text-gray-400">
                                            Total Price
                                        </p>
                                        <p className="text-lg font-semibold text-gray-500">
                                            {calculateTicketPrice()}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={orderTicket}
                                    className="text-white bg-primary-opaque py-4 w-full rounded-xl font-semibold hover:bg-primary-hover transition-all hover:cursor-pointer"
                                >
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
                        <span> ● {location.reviews.length || 0} Reviews</span>
                    </h3>
                    <div className="grid grid-cols-2 md:flex flex-1 gap-4 mt-9">
                        <div className="border-0 md:border-r md:border-gray-200 px-4 w-full">
                            <p className="font-medium text-gray-600 text-sm">
                                Nilai Keseluruhan
                            </p>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">
                                    {ratingAverages.rate_kebersihan}
                                </span>
                                <progress
                                    className="rating-progress"
                                    value={ratingAverages.rate_kebersihan}
                                    max="5"
                                ></progress>
                            </div>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">
                                    {ratingAverages.rate_keakuratan}
                                </span>
                                <progress
                                    className="rating-progress"
                                    value={ratingAverages.rate_keakuratan}
                                    max="5"
                                ></progress>
                            </div>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">
                                    {ratingAverages.rate_checkin}
                                </span>
                                <progress
                                    className="rating-progress"
                                    value={ratingAverages.rate_checkin}
                                    max="5"
                                ></progress>
                            </div>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">
                                    {ratingAverages.rate_komunikasi}
                                </span>
                                <progress
                                    className="rating-progress"
                                    value={ratingAverages.rate_komunikasi}
                                    max="5"
                                ></progress>
                            </div>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">
                                    {ratingAverages.rate_lokasi}
                                </span>
                                <progress
                                    className="rating-progress"
                                    value={ratingAverages.rate_lokasi}
                                    max="5"
                                ></progress>
                            </div>
                            <div className="flex items-center justify-between gap-4 mt-2">
                                <span className="text-xs text-gray-500">
                                    {ratingAverages.rate_nilaiekonomis}
                                </span>
                                <progress
                                    className="rating-progress"
                                    value={ratingAverages.rate_nilaiekonomis}
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
                                    <span>
                                        {ratingAverages.rate_kebersihan}
                                    </span>
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
                                    <span>
                                        {ratingAverages.rate_keakuratan}
                                    </span>
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
                                    <span>{ratingAverages.rate_checkin}</span>
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
                                    <span>
                                        {ratingAverages.rate_komunikasi}
                                    </span>
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
                                    <span>{ratingAverages.rate_lokasi}</span>
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
                                    <span>
                                        {ratingAverages.rate_nilaiekonomis}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-16">
                        <div>
                            {location.reviews.slice(0, 5).map((review, id) => {
                                return <ReviewCard key={id} review={review} />;
                            })}
                        </div>
                    </div>

                    <button
                        className="py-3.5 px-6 rounded-lg border border-gray-400 text-gray-500 mt-8 font-medium hover:cursor-pointer hover:bg-gray-100 transition-all"
                        onClick={() => setIsReviewOpen(true)}
                    >
                        Tampilkan Semua
                        <span className="font-semibold text-gray-600">
                            {location.reviews.length || 0}
                        </span>{" "}
                        Ulasan
                    </button>
                    <ReviewDialog
                        isOpen={isReviewOpen}
                        setIsOpen={setIsReviewOpen}
                        reviews={location.reviews}
                        ratings={ratingAverages}
                    />
                </section>
            </UserLayout>
        </>
    );
}
