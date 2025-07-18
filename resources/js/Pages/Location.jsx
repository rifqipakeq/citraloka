<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
        />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
        />
        <link href="./output.css" rel="stylesheet" />
        <title>MyTravel - Travel & Tour</title>
    </head>
    <body>
        <header class="fixed top-0 left-0 w-full z-50 px-4">
            <nav
                class="container mx-auto flex items-center bg-white justify-between px-8 py-3.5 font-poppins rounded-full mt-8"
            >
                <a href="/">
                    <img
                        src="../public/assets/logo.png"
                        alt="Logo"
                        class="h-10 w-auto"
                    />
                </a>
                <ul class="flex gap-12 items-center text-gray-500 text-lg">
                    <li>
                        <a href="./index.html">Home</a>
                    </li>
                    <li>
                        <a
                            href="./locations.html"
                            class="text-primary-opaque border-b-3 py-1 border-primary-opaque"
                            >Location</a
                        >
                    </li>
                    <li>
                        <a href="./maps.html">Maps</a>
                    </li>
                </ul>
                <a
                    href="./login.html"
                    class="px-16 py-4 bg-primary-opaque rounded-full text-white font-semibold hover:bg-primary-hover transition-all hover:cursor-pointer"
                    >Login</a
                >
            </nav>
        </header>

        <section
            class="relative flex flex-col px-4 items-center font-poppins pt-40"
        >
            <div
                class="w-full h-[37.5rem] locations-hero absolute top-0 left-0 -z-10"
            ></div>
            <div
                class="flex flex-col md:flex-row gap-8 justify-between items-center container mx-auto"
            >
                <div class="w-full">
                    <h1 class="text-4xl font-semibold text-primary-opaque">
                        Location
                    </h1>
                    <p class="text-white mt-4">
                        Dapatkan Pengalaman Liburan Terbaik di sini
                    </p>
                </div>
                <search class="flex flex-col sm:flex-row gap-4 w-full">
                    <input
                        type="text"
                        placeholder="Search for a destination"
                        class="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white"
                    />
                    <button
                        type="submit"
                        class="py-3.5 px-8 text-white rounded-xl font-semibold bg-primary-opaque hover:cursor-pointer hover:bg-primary-hover transition-all"
                    >
                        Search
                    </button>
                </search>
            </div>
            <div class="mt-12 flex container mx-auto flex-wrap gap-4">
                <button
                    class="text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all hover:bg-primary-hover bg-primary-opaque text-white"
                >
                    All
                </button>
                <button
                    class="text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all hover:bg-gray-100 bg-white text-gray-500"
                >
                    Popular
                </button>
                <button
                    class="text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all hover:bg-gray-100 bg-white text-gray-500"
                >
                    Nature
                </button>
                <button
                    class="text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all hover:bg-gray-100 bg-white text-gray-500"
                >
                    Culinary
                </button>
                <button
                    class="text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all hover:bg-gray-100 bg-white text-gray-500"
                >
                    Theme Park
                </button>
                <button
                    class="text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all hover:bg-gray-100 bg-white text-gray-500"
                >
                    History & Education
                </button>
                <button
                    class="text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all hover:bg-gray-100 bg-white text-gray-500"
                >
                    Arts & Culture
                </button>
                <button
                    class="text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all hover:bg-gray-100 bg-white text-gray-500"
                >
                    Shop & Market
                </button>
            </div>
        </section>

        <main
            class="container px-4 relative mx-auto mt-12 mb-32 z-10 font-poppins"
        >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="p-2.5 rounded-3xl border border-gray-300 bg-white">
                    <div class="relative">
                        <img
                            src="../public/assets/flores.jpeg"
                            alt="Location"
                            class="w-full rounded-2xl overflow-hidden aspect-video object-cover"
                        />
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xgreen w-fit absolute bottom-4 left-4"
                        >
                            Mountain
                        </p>
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xyellow w-fit absolute bottom-4 right-4"
                        >
                            <i class="bi bi-star-fill"></i>
                            <span> 4.5 </span>
                        </p>
                    </div>
                    <div class="px-2.5 pb-8">
                        <div
                            class="flex justify-between items-center mt-5 text-lg font-semibold"
                        >
                            <p>Labuan Bajo</p>
                            <p class="text-primary-opaque">Rp5.000.000</p>
                        </div>
                        <div
                            class="mt-3 text-sm text-gray-400 flex items-center gap-2 font-semibold"
                        >
                            <i class="bi bi-clock-fill"></i>
                            <p>8.00AM - 9.30AM</p>
                        </div>
                        <hr class="my-4 border-gray-300" />
                        <p
                            class="text-wrap line-clamp-2 text-sm text-gray-400 font-medium"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Asperiores explicabo aliquid velit.
                            Necessitatibus culpa, eum ipsum asperiores quisquam
                            quaerat ducimus voluptatum corporis ullam
                            exercitationem. Velit quis ex id perspiciatis est?
                        </p>
                    </div>
                </div>
                <div class="p-2.5 rounded-3xl border border-gray-300 bg-white">
                    <div class="relative">
                        <img
                            src="../public/assets/flores.jpeg"
                            alt="Location"
                            class="w-full rounded-2xl overflow-hidden aspect-video object-cover"
                        />
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xorange w-fit absolute bottom-4 left-4"
                        >
                            Beach
                        </p>
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xyellow w-fit absolute bottom-4 right-4"
                        >
                            <i class="bi bi-star-fill"></i>
                            <span> 4.5 </span>
                        </p>
                    </div>
                    <div class="px-2.5 pb-8">
                        <div
                            class="flex justify-between items-center mt-5 text-lg font-semibold"
                        >
                            <p>Labuan Bajo</p>
                            <p class="text-primary-opaque">Rp5.000.000</p>
                        </div>
                        <div
                            class="mt-3 text-sm text-gray-400 flex items-center gap-2 font-semibold"
                        >
                            <i class="bi bi-clock-fill"></i>
                            <p>8.00AM - 9.30AM</p>
                        </div>
                        <hr class="my-4 border-gray-300" />
                        <p
                            class="text-wrap line-clamp-2 text-sm text-gray-400 font-medium"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Asperiores explicabo aliquid velit.
                            Necessitatibus culpa, eum ipsum asperiores quisquam
                            quaerat ducimus voluptatum corporis ullam
                            exercitationem. Velit quis ex id perspiciatis est?
                        </p>
                    </div>
                </div>
                <div class="p-2.5 rounded-3xl border border-gray-300 bg-white">
                    <div class="relative">
                        <img
                            src="../public/assets/flores.jpeg"
                            alt="Location"
                            class="w-full rounded-2xl overflow-hidden aspect-video object-cover"
                        />
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xgray w-fit absolute bottom-4 left-4"
                        >
                            Shop & Market
                        </p>
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xyellow w-fit absolute bottom-4 right-4"
                        >
                            <i class="bi bi-star-fill"></i>
                            <span> 4.5 </span>
                        </p>
                    </div>
                    <div class="px-2.5 pb-8">
                        <div
                            class="flex justify-between items-center mt-5 text-lg font-semibold"
                        >
                            <p>Labuan Bajo</p>
                            <p class="text-primary-opaque">Rp5.000.000</p>
                        </div>
                        <div
                            class="mt-3 text-sm text-gray-400 flex items-center gap-2 font-semibold"
                        >
                            <i class="bi bi-clock-fill"></i>
                            <p>8.00AM - 9.30AM</p>
                        </div>
                        <hr class="my-4 border-gray-300" />
                        <p
                            class="text-wrap line-clamp-2 text-sm text-gray-400 font-medium"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Asperiores explicabo aliquid velit.
                            Necessitatibus culpa, eum ipsum asperiores quisquam
                            quaerat ducimus voluptatum corporis ullam
                            exercitationem. Velit quis ex id perspiciatis est?
                        </p>
                    </div>
                </div>
                <div class="p-2.5 rounded-3xl border border-gray-300 bg-white">
                    <div class="relative">
                        <img
                            src="../public/assets/flores.jpeg"
                            alt="Location"
                            class="w-full rounded-2xl overflow-hidden aspect-video object-cover"
                        />
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xpurple w-fit absolute bottom-4 left-4"
                        >
                            History & Education
                        </p>
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xyellow w-fit absolute bottom-4 right-4"
                        >
                            <i class="bi bi-star-fill"></i>
                            <span> 4.5 </span>
                        </p>
                    </div>
                    <div class="px-2.5 pb-8">
                        <div
                            class="flex justify-between items-center mt-5 text-lg font-semibold"
                        >
                            <p>Labuan Bajo</p>
                            <p class="text-primary-opaque">Rp5.000.000</p>
                        </div>
                        <div
                            class="mt-3 text-sm text-gray-400 flex items-center gap-2 font-semibold"
                        >
                            <i class="bi bi-clock-fill"></i>
                            <p>8.00AM - 9.30AM</p>
                        </div>
                        <hr class="my-4 border-gray-300" />
                        <p
                            class="text-wrap line-clamp-2 text-sm text-gray-400 font-medium"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Asperiores explicabo aliquid velit.
                            Necessitatibus culpa, eum ipsum asperiores quisquam
                            quaerat ducimus voluptatum corporis ullam
                            exercitationem. Velit quis ex id perspiciatis est?
                        </p>
                    </div>
                </div>
                <div class="p-2.5 rounded-3xl border border-gray-300 bg-white">
                    <div class="relative">
                        <img
                            src="../public/assets/flores.jpeg"
                            alt="Location"
                            class="w-full rounded-2xl overflow-hidden aspect-video object-cover"
                        />
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xred w-fit absolute bottom-4 left-4"
                        >
                            Art & Culture
                        </p>
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xyellow w-fit absolute bottom-4 right-4"
                        >
                            <i class="bi bi-star-fill"></i>
                            <span> 4.5 </span>
                        </p>
                    </div>
                    <div class="px-2.5 pb-8">
                        <div
                            class="flex justify-between items-center mt-5 text-lg font-semibold"
                        >
                            <p>Labuan Bajo</p>
                            <p class="text-primary-opaque">Rp5.000.000</p>
                        </div>
                        <div
                            class="mt-3 text-sm text-gray-400 flex items-center gap-2 font-semibold"
                        >
                            <i class="bi bi-clock-fill"></i>
                            <p>8.00AM - 9.30AM</p>
                        </div>
                        <hr class="my-4 border-gray-300" />
                        <p
                            class="text-wrap line-clamp-2 text-sm text-gray-400 font-medium"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Asperiores explicabo aliquid velit.
                            Necessitatibus culpa, eum ipsum asperiores quisquam
                            quaerat ducimus voluptatum corporis ullam
                            exercitationem. Velit quis ex id perspiciatis est?
                        </p>
                    </div>
                </div>
                <div class="p-2.5 rounded-3xl border border-gray-300 bg-white">
                    <div class="relative">
                        <img
                            src="../public/assets/flores.jpeg"
                            alt="Location"
                            class="w-full rounded-2xl overflow-hidden aspect-video object-cover"
                        />
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xdarkgreen w-fit absolute bottom-4 left-4"
                        >
                            Theme Park
                        </p>
                        <p
                            class="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xyellow w-fit absolute bottom-4 right-4"
                        >
                            <i class="bi bi-star-fill"></i>
                            <span> 4.5 </span>
                        </p>
                    </div>
                    <div class="px-2.5 pb-8">
                        <div
                            class="flex justify-between items-center mt-5 text-lg font-semibold"
                        >
                            <p>Labuan Bajo</p>
                            <p class="text-primary-opaque">Rp5.000.000</p>
                        </div>
                        <div
                            class="mt-3 text-sm text-gray-400 flex items-center gap-2 font-semibold"
                        >
                            <i class="bi bi-clock-fill"></i>
                            <p>8.00AM - 9.30AM</p>
                        </div>
                        <hr class="my-4 border-gray-300" />
                        <p
                            class="text-wrap line-clamp-2 text-sm text-gray-400 font-medium"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Asperiores explicabo aliquid velit.
                            Necessitatibus culpa, eum ipsum asperiores quisquam
                            quaerat ducimus voluptatum corporis ullam
                            exercitationem. Velit quis ex id perspiciatis est?
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </body>
</html>
