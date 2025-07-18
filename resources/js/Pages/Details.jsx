<!DOCTYPE html>
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
    <script src="../public/OpenLayers-2.13.1/OpenLayers.js"></script>
    <title>MyTravel - Travel & Tour</title>
  </head>
  <body>
    <header class="fixed top-0 left-0 w-full z-50 px-4">
      <nav
        class="container mx-auto flex items-center bg-white justify-between px-8 py-3.5 font-poppins rounded-full mt-8"
      >
        <a href="/">
          <img src="../public/assets/logo.png" alt="Logo" class="h-10 w-auto" />
        </a>
        <ul class="flex gap-12 items-center text-gray-500 text-lg">
          <li>
            <a href="./index.html">Home</a>
          </li>
          <li>
            <a href="./locations.html">Location</a>
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
      class="relative flex flex-col items-center font-poppins pt-40 px-4"
    >
      <div
        class="w-full h-[37.5rem] details-hero absolute top-0 left-0 -z-10"
      ></div>
      <div class="container mx-auto">
        <div class="w-full">
          <h1 class="text-4xl font-semibold">
            <span class="text-white">Location ></span>
            <span class="text-gray-500">Labuan Bajo</span>
          </h1>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 relative">
          <div class="overflow-hidden object-cover aspect-[16/9.2]">
            <img
              src="../public/assets/flores.jpeg"
              alt="Flores"
              class="w-full"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="aspect-video overflow-hidden object-cover">
              <img
                src="../public/assets/flores.jpeg"
                alt="Komodo Island"
                class="w-full"
              />
            </div>
            <div class="aspect-video overflow-hidden object-cover">
              <img
                src="../public/assets/flores.jpeg"
                alt="Kanawa Island"
                class="w-full"
              />
            </div>
            <div class="aspect-video overflow-hidden object-cover">
              <img
                src="../public/assets/flores.jpeg"
                alt="Kalong Island"
                class="w-full"
              />
            </div>
            <div class="aspect-video overflow-hidden object-cover">
              <img
                src="../public/assets/flores.jpeg"
                alt="Kalong Island"
                class="w-full"
              />
            </div>
          </div>

          <button
            class="py-2.5 px-4.5 bg-white text-gray-400 rounded-full font-medium absolute right-4 bottom-4 text-xs"
          >
            Tampilkan Semua Foto <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>

    <main class="container mx-auto font-poppins mt-6 px-4">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
        <div class="col-span-1 md:col-span-8">
          <p class="py-1.5 px-6 bg-xgreen text-white rounded-full w-fit">
            Mountain
          </p>
          <div class="mt-8">
            <h2 class="text-3xl text-primary-opaque font-semibold">
              Labuan Bajo
            </h2>
            <div class="text-lg font-semibold">
              <span class="text-xorange"
                ><i class="bi bi-star-fill"></i> <span>4.5</span></span
              >
              <span class="text-gray-500"> ● 188 Reviews</span>
            </div>
          </div>
          <hr class="border my-9 border-gray-200" />
          <div>
            <h3 class="text-2xl font-semibold">
              <i class="bi bi-info-circle-fill text-gray-300"></i>
              <span class="text-gray-500">Information</span>
            </h3>
            <div class="flex gap-2.5 mt-4 items-center">
              <i class="bi bi-geo-alt text-gray-600"></i>
              <div>
                <p class="text-sm text-gray-400">Address</p>
                <p class="text-gray-600 font-medium">
                  Nusa Tenggara Selatan, Indonesia
                </p>
              </div>
            </div>
            <div class="flex gap-2.5 mt-4 items-center">
              <i class="bi bi-telephone text-gray-600"></i>
              <div>
                <p class="text-sm text-gray-400">Phone</p>
                <p class="text-gray-600 font-medium">+23504-405-696</p>
              </div>
            </div>
            <div class="flex gap-2.5 mt-4 items-center">
              <i class="bi bi-clock text-gray-600"></i>
              <div>
                <p class="text-sm text-gray-400">Office Hours</p>
                <p class="text-gray-600 font-medium">8.00 AM - 9.30 AM</p>
              </div>
            </div>
          </div>
          <hr class="border my-9 border-gray-200" />
          <div>
            <h3 class="mb-5 text-2xl font-semibold text-gray-500">
              Description
            </h3>
            <p class="text-gray-600">
              Gunung Semeru, dengan puncaknya yang dikenal sebagai Mahameru,
              adalah gunung tertinggi di Pulau Jawa dengan ketinggian 3.676
              meter di atas permukaan laut. Gunung ini menjadi favorit para
              pendaki yang ingin menantang diri mereka untuk mencapai puncaknya
              yang megah. Salah satu daya tarik utama Semeru adalah Ranu
              Kumbolo, sebuah danau berair jernih yang menjadi tempat
              peristirahatan bagi para pendaki sebelum melanjutkan perjalanan
              menuju puncak.
            </p>
          </div>
          <hr class="border my-9 border-gray-200" />
          <div>
            <h3 class="mb-5 text-2xl font-semibold text-gray-500">Maps</h3>
            <div class="flex gap-2.5 mt-4 items-center">
              <i class="bi bi-geo-alt text-gray-600"></i>
              <div>
                <p class="text-gray-600 font-medium">
                  Nusa Tenggara Selatan, Indonesia
                </p>
                <p class="text-sm text-gray-400 underline">See in Maps</p>
              </div>
            </div>
            <div class="w-full mt-5">
              <div
                id="maps"
                class="h-[600px] w-full sticky top-36 rounded-3xl overflow-hidden"
              ></div>
            </div>
          </div>
        </div>

        <div class="col-span-1 md:col-span-4">
          <div
            class="flex gap-5 items-center py-5 w-full rounded-2xl bg-white shadow-lg justify-center border border-gray-200"
          >
            <i
              class="bi bi-tag-fill text-primary-opaque text-3xl scale-x-[-1]"
            ></i>
            <p class="font-semibold text-gray-500">
              The price includes all costs
            </p>
          </div>
          <div
            class="p-6 w-full rounded-2xl bg-white shadow-lg border border-gray-200 mt-8"
          >
            <div
              class="bg-primary-transparent text-primary-opaque w-fit font-semibold py-3 px-6 rounded-xl"
            >
              <i class="bi bi-ticket-perforated"></i>
              <span>123 Available Tickets</span>
            </div>
            <div class="w-full flex justify-between items-start mt-8">
              <span class="font-semibold text-gray-400">Ticket Type</span>
              <div>Dropdown</div>
            </div>
            <div class="flex items-center justify-between mt-4">
              <div>
                <p class="text-sm text-gray-300">Ticket Price x1</p>
                <p class="text-xl font-semibold text-gray-600">Rp100.000,00</p>
              </div>
              <div class="flex items-center gap-6 justify-center">
                <button
                  class="rounded-md bg-gray-200 transition-all hover:bg-gray-400 w-8 h-8 hover:cursor-pointer"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <p class="text-lg font-semibold text-gray-600">1</p>
                <button
                  class="rounded-md bg-gray-200 transition-all hover:bg-gray-400 w-8 h-8 hover:cursor-pointer"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
            <hr class="border my-9 border-gray-200" />
            <div class="mb-9">
              <div class="flex items-center justify-between">
                <p class="font-medium text-gray-400">PPN</p>
                <p class="text-lg font-semibold text-gray-500">Rp10.000,00</p>
              </div>
              <div class="flex items-center justify-between mt-4">
                <p class="font-medium text-gray-400">Total Price</p>
                <p class="text-lg font-semibold text-gray-500">Rp110.000,00</p>
              </div>
            </div>
            <button
              class="text-white bg-primary-opaque py-4 w-full rounded-xl font-semibold hover:bg-primary-hover transition-all hover:cursor-pointer"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
    </main>

    <section class="container mx-auto font-poppins mb-32 px-4">
      <hr class="border my-9 border-gray-200" />
      <h3 class="text-2xl font-semibold text-gray-500">
        <span><i class="bi bi-star-fill"></i> <span>4.5</span></span>
        <span> ● 188 Reviews</span>
      </h3>
      <div class="grid grid-cols-2 md:flex flex-1 gap-4 mt-9">
        <div class="border-0 md:border-r md:border-gray-200 px-4 w-full">
          <p class="font-medium text-gray-600 text-sm">Nilai Keseluruhan</p>
          <div class="flex items-center justify-between gap-4 mt-2">
            <span class="text-xs text-gray-500">4</span>
            <progress class="rating-progress" value="4" max="5"></progress>
          </div>
          <div class="flex items-center justify-between gap-4 mt-2">
            <span class="text-xs text-gray-500">2</span>
            <progress class="rating-progress" value="2" max="5"></progress>
          </div>
          <div class="flex items-center justify-between gap-4 mt-2">
            <span class="text-xs text-gray-500">5</span>
            <progress class="rating-progress" value="5" max="5"></progress>
          </div>
          <div class="flex items-center justify-between gap-4 mt-2">
            <span class="text-xs text-gray-500">1</span>
            <progress class="rating-progress" value="1" max="5"></progress>
          </div>
          <div class="flex items-center justify-between gap-4 mt-2">
            <span class="text-xs text-gray-500">3</span>
            <progress class="rating-progress" value="3" max="5"></progress>
          </div>
        </div>
        <div class="border-0 md:border-r md:border-gray-200 px-4 w-full">
          <p class="font-medium text-gray-600 text-sm">Kebersihan</p>
          <div class="mt-4 text-sm text-gray-600 font-semibold">
            <span><i class="bi bi-star-fill"></i> <span>4.5</span></span>
          </div>
        </div>
        <div class="border-0 md:border-r md:border-gray-200 px-4 w-full">
          <p class="font-medium text-gray-600 text-sm">Keakuratan</p>
          <div class="mt-4 text-sm text-gray-600 font-semibold">
            <span><i class="bi bi-star-fill"></i> <span>4.5</span></span>
          </div>
        </div>
        <div class="border-0 md:border-r md:border-gray-200 px-4 w-full">
          <p class="font-medium text-gray-600 text-sm">Check-In</p>
          <div class="mt-4 text-sm text-gray-600 font-semibold">
            <span><i class="bi bi-star-fill"></i> <span>4.5</span></span>
          </div>
        </div>
        <div class="border-0 md:border-r md:border-gray-200 px-4 w-full">
          <p class="font-medium text-gray-600 text-sm">Komunikasi</p>
          <div class="mt-4 text-sm text-gray-600 font-semibold">
            <span><i class="bi bi-star-fill"></i> <span>4.5</span></span>
          </div>
        </div>
        <div class="border-0 md:border-r md:border-gray-200 px-4 w-full">
          <p class="font-medium text-gray-600 text-sm">Lokasi</p>
          <div class="mt-4 text-sm text-gray-600 font-semibold">
            <span><i class="bi bi-star-fill"></i> <span>4.5</span></span>
          </div>
        </div>
        <div class="px-4 w-full">
          <p class="font-medium text-gray-600 text-sm">Nilai Ekonomis</p>
          <div class="mt-4 text-sm text-gray-600 font-semibold">
            <span><i class="bi bi-star-fill"></i> <span>4.5</span></span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-20 mt-16">
        <div>
          <div class="flex gap-5 items-center">
            <img
              src="../public/assets/user1.jpeg"
              alt="User1"
              class="aspect-square rounded-full object-cover max-w-16"
            />
            <p class="font-semibold text-gray-600">John Doe</p>
          </div>
          <div
            class="flex items-center gap-2 mt-4 text-gray-400 font-medium text-sm"
          >
            <div class="flex items-center gap-1">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <span> ● 188 Reviews</span>
          </div>
          <p class="text-gray-500 mt-4">
            Cool Place with best nature and the place so clean, makes you relax
            so recommended
          </p>
        </div>
        <div>
          <div class="flex gap-5 items-center">
            <img
              src="../public/assets/user1.jpeg"
              alt="User1"
              class="aspect-square rounded-full object-cover max-w-16"
            />
            <p class="font-semibold text-gray-600">John Doe</p>
          </div>
          <div
            class="flex items-center gap-2 mt-4 text-gray-400 font-medium text-sm"
          >
            <div class="flex items-center gap-1">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <span> ● 188 Reviews</span>
          </div>
          <p class="text-gray-500 mt-4">
            Cool Place with best nature and the place so clean, makes you relax
            so recommended
          </p>
        </div>
        <div>
          <div class="flex gap-5 items-center">
            <img
              src="../public/assets/user1.jpeg"
              alt="User1"
              class="aspect-square rounded-full object-cover max-w-16"
            />
            <p class="font-semibold text-gray-600">John Doe</p>
          </div>
          <div
            class="flex items-center gap-2 mt-4 text-gray-400 font-medium text-sm"
          >
            <div class="flex items-center gap-1">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <span> ● 188 Reviews</span>
          </div>
          <p class="text-gray-500 mt-4">
            Cool Place with best nature and the place so clean, makes you relax
            so recommended
          </p>
        </div>
        <div>
          <div class="flex gap-5 items-center">
            <img
              src="../public/assets/user1.jpeg"
              alt="User1"
              class="aspect-square rounded-full object-cover max-w-16"
            />
            <p class="font-semibold text-gray-600">John Doe</p>
          </div>
          <div
            class="flex items-center gap-2 mt-4 text-gray-400 font-medium text-sm"
          >
            <div class="flex items-center gap-1">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <span> ● 188 Reviews</span>
          </div>
          <p class="text-gray-500 mt-4">
            Cool Place with best nature and the place so clean, makes you relax
            so recommended
          </p>
        </div>
        <div>
          <div class="flex gap-5 items-center">
            <img
              src="../public/assets/user1.jpeg"
              alt="User1"
              class="aspect-square rounded-full object-cover max-w-16"
            />
            <p class="font-semibold text-gray-600">John Doe</p>
          </div>
          <div
            class="flex items-center gap-2 mt-4 text-gray-400 font-medium text-sm"
          >
            <div class="flex items-center gap-1">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <span> ● 188 Reviews</span>
          </div>
          <p class="text-gray-500 mt-4">
            Cool Place with best nature and the place so clean, makes you relax
            so recommended
          </p>
        </div>
        <div>
          <div class="flex gap-5 items-center">
            <img
              src="../public/assets/user1.jpeg"
              alt="User1"
              class="aspect-square rounded-full object-cover max-w-16"
            />
            <p class="font-semibold text-gray-600">John Doe</p>
          </div>
          <div
            class="flex items-center gap-2 mt-4 text-gray-400 font-medium text-sm"
          >
            <div class="flex items-center gap-1">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <span> ● 188 Reviews</span>
          </div>
          <p class="text-gray-500 mt-4">
            Cool Place with best nature and the place so clean, makes you relax
            so recommended
          </p>
        </div>
      </div>

      <button
        class="py-3.5 px-6 rounded-lg border border-gray-400 text-gray-500 mt-8 font-medium hover:cursor-pointer hover:bg-gray-100 transition-all"
      >
        Tampilkan Semua
        <span class="font-semibold text-gray-600">253</span> Ulasan
      </button>
    </section>
  </body>

  <script>
    var lat = 47.35387;
    var lon = 8.43609;
    var zoom = 18;

    var fromProjection = new OpenLayers.Projection("EPSG:4326");
    var toProjection = new OpenLayers.Projection("EPSG:900913");
    var position = new OpenLayers.LonLat(lon, lat).transform(
      fromProjection,
      toProjection
    );

    map = new OpenLayers.Map("maps");
    var mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);

    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(position));

    map.setCenter(position, zoom);
  </script>
</html>
