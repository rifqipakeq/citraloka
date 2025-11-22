import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { g as getStars, c as calculateRating, f as formatDate, t as toIDR } from "./helper-DadYwhGw.js";
import { Head, router } from "@inertiajs/react";
import { useState, useEffect, useRef, useMemo } from "react";
import { D as Dropdown } from "./Dropdown-kDhTbc1Y.js";
import { o as optionSortByDate, c as categoryColors } from "./constants-BHE6LNk3.js";
import { U as UserLayout } from "./UserLayout-DN4sf-_Z.js";
import { M as Map } from "./Map-96WLGMuI.js";
import "react-leaflet";
import "leaflet";
function ReviewCard({ review }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-5 items-center", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: review.user.profile_picture || "/assets/profile_placeholder.png",
          alt: review.user.name,
          className: "aspect-square rounded-full object-cover max-w-12"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-600", children: review.user.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-4 text-gray-400 font-medium text-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: getStars(calculateRating(review)) }),
      /* @__PURE__ */ jsxs("span", { children: [
        " ● ",
        formatDate(review.created_at)
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-4", children: review.review })
  ] });
}
function GalleryDialog({
  isOpen,
  setIsOpen,
  destination,
  pictures
}) {
  const handleBackdropClick = (event) => {
    if (!event) return;
    const dialog = event.target;
    if (dialog.tagName === "DIALOG") {
      setIsOpen(false);
    }
  };
  return /* @__PURE__ */ jsx(
    "dialog",
    {
      open: isOpen,
      onClick: handleBackdropClick,
      className: `group fixed left-0 top-0 !z-[999] m-0 grid h-screen w-screen place-content-center p-0 ${isOpen ? "block" : "hidden"}`,
      children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center rounded-xl bg-white p-6 w-full md:w-[600px] lg:w-[900px]", children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-3xl text-primary-opaque font-semibold", children: destination }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mt-2", children: [
              "Semua Foto",
              " ",
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-gray-600", children: [
                "(",
                pictures.length,
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsOpen(false),
              className: "hover:cursor-pointer",
              children: /* @__PURE__ */ jsx("i", { className: "bi bi-x-lg text-2xl text-gray-500 hover:text-gray-700" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-h-[60vh] overflow-y-auto mt-8", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 auto-rows-[150px]", children: pictures.map((src, idx) => {
          const groupIndex = Math.floor(idx / 3);
          const posInGroup = idx % 3;
          let gridStyle = "";
          if (groupIndex % 2 === 0) {
            if (posInGroup === 0) {
              gridStyle = "col-span-2 row-span-2";
            } else {
              gridStyle = "col-span-1 row-span-1";
            }
          } else {
            if (posInGroup === 1) {
              gridStyle = "col-span-2 row-span-2";
            } else {
              gridStyle = "col-span-1 row-span-1";
            }
          }
          return /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt: `${destination} photo ${idx + 1}`,
              className: `rounded-lg object-cover w-full h-full ${gridStyle}`
            },
            idx
          );
        }) }) })
      ] }) })
    }
  );
}
function ReviewDialog({ isOpen, setIsOpen, reviews, ratings }) {
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  useEffect(() => {
    if (orderBy === "newest") {
      setFilteredReviews(
        (prev) => [...prev].sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
      );
    } else if (orderBy === "oldest") {
      setFilteredReviews(
        (prev) => [...prev].sort((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        })
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
    setSearch(e.target.value);
    const filtered = reviews.filter(
      (review) => review.review.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredReviews(filtered);
  };
  return /* @__PURE__ */ jsx(
    "dialog",
    {
      open: isOpen,
      onClick: handleBackdropClick,
      className: `group fixed left-0 top-0 !z-[999] m-0 grid h-screen w-screen place-content-center p-0",
                ${isOpen ? "block" : "hidden"}`,
      children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center rounded-xl bg-white p-6 w-full md:w-[700px] lg:w-[800px]", children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-3xl text-primary-opaque font-semibold", children: "Ulasan" }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsOpen(false),
              className: "hover:cursor-pointer",
              children: /* @__PURE__ */ jsx("i", { className: "bi bi-x-lg text-2xl text-gray-500 hover:text-gray-700" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 mt-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-1 px-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center px-12", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/assets/badge.webp",
                  alt: "Score badge",
                  draggable: "false",
                  className: ""
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-white text-4xl -mt-21 z-10", children: calculateRating(ratings) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-evenly gap-1 mt-16 w-full px-12", children: getStars(calculateRating(ratings), "text-xl text-xyellow", false) }),
            /* @__PURE__ */ jsxs("div", { className: "text-center mt-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-gray-600", children: "Pilihan Tamu" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Rumah ini menjadi favorit tamu berdasarkan penilaian, ulasan, dan keandalannya" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 w-full", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-600 text-sm", children: "Nilai Keseluruhan" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratings.rate_kebersihan }),
                /* @__PURE__ */ jsx(
                  "progress",
                  {
                    className: "rating-progress",
                    value: ratings.rate_kebersihan,
                    max: "5"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratings.rate_keakuratan }),
                /* @__PURE__ */ jsx(
                  "progress",
                  {
                    className: "rating-progress",
                    value: ratings.rate_keakuratan,
                    max: "5"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratings.rate_checkin }),
                /* @__PURE__ */ jsx(
                  "progress",
                  {
                    className: "rating-progress",
                    value: ratings.rate_checkin,
                    max: "5"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratings.rate_komunikasi }),
                /* @__PURE__ */ jsx(
                  "progress",
                  {
                    className: "rating-progress",
                    value: ratings.rate_komunikasi,
                    max: "5"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratings.rate_lokasi }),
                /* @__PURE__ */ jsx(
                  "progress",
                  {
                    className: "rating-progress",
                    value: ratings.rate_lokasi,
                    max: "5"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratings.rate_nilaiekonomis }),
                /* @__PURE__ */ jsx(
                  "progress",
                  {
                    className: "rating-progress",
                    value: ratings.rate_nilaiekonomis,
                    max: "5"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "/assets/icon_broom.svg",
                      alt: "Kebersihan"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Kebersihan" })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ratings.rate_kebersihan })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "/assets/icon_location.svg",
                      alt: "Keakuratan"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Keakuratan" })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ratings.rate_keakuratan })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "/assets/icon_key.svg",
                      alt: "Check-in"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Check-in" })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ratings.rate_checkin })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "/assets/icon_chat.svg",
                      alt: "Komunikasi"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Komunikasi" })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ratings.rate_komunikasi })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "/assets/icon_map.svg",
                      alt: "Lokasi"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Lokasi" })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ratings.rate_lokasi })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: "/assets/icon_wallet.svg",
                      alt: "Nilai Ekonomis"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Nilai Ekonomis" })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ratings.rate_nilaiekonomis })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "max-h-[60vh] overflow-y-auto mt-8 md:col-span-2 ml-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex w-full items-center justify-between px-1", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xl", children: [
                "Semua Ulasan",
                " ",
                /* @__PURE__ */ jsxs("span", { className: "font-semibold text-gray-600", children: [
                  "(",
                  reviews.length,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                Dropdown,
                {
                  options: optionSortByDate,
                  value: orderBy,
                  onChange: setOrderBy,
                  placeholder: "Paling Baru"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("search", { className: "mb-6", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full px-1", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full rounded-full border border-gray-300 placeholder:text-sm placeholder:text-gray-500",
                  placeholder: "Cari Ulasan",
                  value: search,
                  onChange: handleSearch
                }
              ),
              /* @__PURE__ */ jsx("i", { className: "bi bi-search absolute top-1/2 -translate-y-1/2 right-4" })
            ] }) }),
            filteredReviews.map((review) => /* @__PURE__ */ jsx(ReviewCard, { review }, review.id))
          ] })
        ] })
      ] }) })
    }
  );
}
function Location({
  location,
  ratingAverages,
  ticketCategories,
  auth
}) {
  var _a, _b, _c;
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(1);
  const [ticketType, setTicketType] = useState((_a = ticketCategories[0]) == null ? void 0 : _a.id);
  const [ticketPrice, setTicketPrice] = useState(
    (_b = location.ticket.find((t) => t.ticket_category_id === ticketType)) == null ? void 0 : _b.price_per_pack
  );
  const mapRef = useRef();
  useEffect(() => {
    const ticket = location.ticket.find(
      (ticket2) => ticket2.ticket_category_id === ticketType
    );
    setTicketPrice((ticket == null ? void 0 : ticket.price_per_pack) ?? 0);
  }, [ticketType, location.ticket]);
  const totalPrice = useMemo(() => {
    const tax = ticketPrice * 0.1 * ticketAmount;
    return ticketAmount * ticketPrice + tax;
  }, [ticketPrice, ticketAmount]);
  const calculateTicketPrice = () => {
    return totalPrice.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR"
    });
  };
  const orderTicket = () => {
    var _a2;
    if (!auth.user) {
      router.get(route("login"));
      return;
    }
    const tax = ticketPrice * 0.1 * ticketAmount;
    router.post(
      route("payment.handle"),
      {
        location_id: location.id,
        ticket_price: ticketPrice,
        ticket_quantity: ticketAmount,
        tax,
        total_price: totalPrice,
        action: "pay",
        ticket_id: (_a2 = location.ticket.find(
          (ticket) => ticket.ticket_category_id === ticketType
        )) == null ? void 0 : _a2.id
      },
      {
        onError: (error) => {
          Swal.fire({
            title: "Gagal!",
            text: "Transaksi gagal!",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  };
  const handleStart = () => {
    var _a2;
    (_a2 = mapRef.current) == null ? void 0 : _a2.startNavigation();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Details" }),
    /* @__PURE__ */ jsxs(UserLayout, { auth, children: [
      /* @__PURE__ */ jsxs("section", { className: "relative flex flex-col items-center font-poppins pt-40 px-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full h-[37.5rem] details-hero absolute top-0 left-0 -z-10" }),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-semibold", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-white", children: [
              "Location >",
              " "
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: location.title })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 relative", children: [
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden object-cover aspect-[16/9.2]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: location.image_urls[0],
                alt: location.title,
                className: "w-full"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: location.image_urls.slice(1, 5).map((picture, index) => {
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: "overflow-hidden object-cover aspect-video",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: picture,
                      alt: `Picture ${index + 1}`,
                      className: "w-full"
                    }
                  )
                },
                index
              );
            }) }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: "py-2.5 px-4.5 bg-white hover:cursor-pointer text-gray-400 rounded-full font-medium absolute right-4 bottom-4 text-xs",
                onClick: () => setIsGalleryOpen(true),
                children: [
                  "Tampilkan Semua Foto",
                  " ",
                  /* @__PURE__ */ jsx("i", { className: "bi bi-arrow-right" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              GalleryDialog,
              {
                isOpen: isGalleryOpen,
                setIsOpen: setIsGalleryOpen,
                destination: location.title,
                pictures: location.image_urls
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "container mx-auto font-poppins mt-6 px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-12 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-8", children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: `py-1.5 px-6 ${categoryColors[location.category.id]} text-white rounded-full w-fit`,
              children: location.category.name
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl text-primary-opaque font-semibold", children: location.title }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "text-lg font-semibold hover:cursor-pointer w-fit",
                onClick: () => setIsReviewOpen(true),
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xorange", children: [
                    /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
                    " ",
                    /* @__PURE__ */ jsx("span", { children: calculateRating(ratingAverages) })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                    " ",
                    "● ",
                    location.reviews.length || 0,
                    " Reviews"
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "border my-9 border-gray-200" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-semibold", children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-info-circle-fill text-gray-300 mr-2" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Information" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 mt-4 items-center", children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-geo-alt text-gray-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Address" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 font-medium", children: location.address })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 mt-4 items-center", children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-telephone text-gray-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Phone" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 font-medium", children: location.phone })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 mt-4 items-center", children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-clock text-gray-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Office Hours" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 font-medium", children: location.officehours })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "border my-9 border-gray-200" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-5 text-2xl font-semibold text-gray-500", children: "Description" }),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-gray-600",
                dangerouslySetInnerHTML: {
                  __html: location.description
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "border my-9 border-gray-200" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-5 text-2xl font-semibold text-gray-500", children: "Maps" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 mt-4 items-center", children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-geo-alt text-gray-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 font-medium", children: location.address }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`,
                      target: "_blank",
                      className: "text-sm text-gray-400 underline",
                      children: "See in Google Maps"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "or" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "hover:cursor-pointer text-sm text-gray-400 underline",
                      onClick: handleStart,
                      children: "Navigate"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full mt-5", children: /* @__PURE__ */ jsx(
              "div",
              {
                id: "maps",
                className: "h-[600px] w-full sticky top-36 rounded-3xl overflow-hidden",
                children: /* @__PURE__ */ jsx(
                  Map,
                  {
                    lat: Number(location.latitude),
                    long: Number(location.longitude),
                    location,
                    ref: mapRef
                  }
                )
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-5 items-center py-5 w-full rounded-2xl bg-white shadow-lg justify-center border border-gray-200", children: [
            /* @__PURE__ */ jsx("i", { className: "bi bi-tag-fill text-primary-opaque text-3xl scale-x-[-1]" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-500", children: "The price includes all costs" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 w-full rounded-2xl bg-white shadow-lg border border-gray-200 mt-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-primary-transparent text-primary-opaque w-fit font-semibold py-3 px-6 rounded-xl", children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-ticket-perforated mr-2" }),
              /* @__PURE__ */ jsxs("span", { children: [
                (_c = location.ticket.find(
                  (ticket) => ticket.ticket_category_id === ticketType
                )) == null ? void 0 : _c.qty,
                " ",
                "Available Tickets"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between items-start mt-8", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-400", children: "Ticket Type" }),
              /* @__PURE__ */ jsx(
                Dropdown,
                {
                  options: ticketCategories.map(
                    (category) => {
                      return {
                        label: category.name,
                        value: category.id
                      };
                    }
                  ),
                  value: ticketType,
                  onChange: setTicketType
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Ticket Price x1" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold text-gray-600", children: toIDR(ticketPrice) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 justify-center", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "rounded-md bg-gray-200 transition-all hover:bg-gray-400 w-8 h-8 hover:cursor-pointer disabled:cursor-not-allowed",
                    onClick: () => setTicketAmount(
                      ticketAmount - 1
                    ),
                    disabled: ticketAmount <= 1 || !auth.user,
                    children: /* @__PURE__ */ jsx("i", { className: "bi bi-dash" })
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-gray-600", children: ticketAmount }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "rounded-md bg-gray-200 transition-all hover:bg-gray-400 w-8 h-8 hover:cursor-pointer disabled:cursor-not-allowed",
                    onClick: () => setTicketAmount(
                      ticketAmount + 1
                    ),
                    disabled: ticketAmount >= 999 || !auth.user,
                    children: /* @__PURE__ */ jsx("i", { className: "bi bi-plus" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("hr", { className: "border my-9 border-gray-200" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-9", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-400", children: "PPN" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-gray-500", children: toIDR(
                  ticketPrice * 0.1 * ticketAmount
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-4", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-400", children: "Total Price" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-gray-500", children: calculateTicketPrice() })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: orderTicket,
                className: "text-white bg-primary-opaque py-4 w-full rounded-xl font-semibold hover:bg-primary-hover transition-all hover:cursor-pointer",
                children: "Pesan Sekarang"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "container mx-auto font-poppins mb-32 px-4", children: [
        /* @__PURE__ */ jsx("hr", { className: "border my-9 border-gray-200" }),
        /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-semibold text-gray-500", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
            " ",
            /* @__PURE__ */ jsx("span", { children: calculateRating(ratingAverages) })
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            " ● ",
            location.reviews.length || 0,
            " Reviews"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:flex flex-1 gap-4 mt-9", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-0 md:border-r md:border-gray-200 px-4 w-full", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-600 text-sm", children: "Nilai Keseluruhan" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratingAverages.rate_kebersihan }),
              /* @__PURE__ */ jsx(
                "progress",
                {
                  className: "rating-progress",
                  value: ratingAverages.rate_kebersihan,
                  max: "5"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratingAverages.rate_keakuratan }),
              /* @__PURE__ */ jsx(
                "progress",
                {
                  className: "rating-progress",
                  value: ratingAverages.rate_keakuratan,
                  max: "5"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratingAverages.rate_checkin }),
              /* @__PURE__ */ jsx(
                "progress",
                {
                  className: "rating-progress",
                  value: ratingAverages.rate_checkin,
                  max: "5"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratingAverages.rate_komunikasi }),
              /* @__PURE__ */ jsx(
                "progress",
                {
                  className: "rating-progress",
                  value: ratingAverages.rate_komunikasi,
                  max: "5"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratingAverages.rate_lokasi }),
              /* @__PURE__ */ jsx(
                "progress",
                {
                  className: "rating-progress",
                  value: ratingAverages.rate_lokasi,
                  max: "5"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: ratingAverages.rate_nilaiekonomis }),
              /* @__PURE__ */ jsx(
                "progress",
                {
                  className: "rating-progress",
                  value: ratingAverages.rate_nilaiekonomis,
                  max: "5"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-0 md:border-r md:border-gray-200 px-4 w-full", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-600 text-sm", children: "Kebersihan" }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-gray-600 font-semibold", children: /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: ratingAverages.rate_kebersihan })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-0 md:border-r md:border-gray-200 px-4 w-full", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-600 text-sm", children: "Keakuratan" }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-gray-600 font-semibold", children: /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: ratingAverages.rate_keakuratan })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-0 md:border-r md:border-gray-200 px-4 w-full", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-600 text-sm", children: "Check-In" }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-gray-600 font-semibold", children: /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: ratingAverages.rate_checkin })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-0 md:border-r md:border-gray-200 px-4 w-full", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-600 text-sm", children: "Komunikasi" }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-gray-600 font-semibold", children: /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: ratingAverages.rate_komunikasi })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-0 md:border-r md:border-gray-200 px-4 w-full", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-600 text-sm", children: "Lokasi" }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-gray-600 font-semibold", children: /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: ratingAverages.rate_lokasi })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "px-4 w-full", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-600 text-sm", children: "Nilai Ekonomis" }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-gray-600 font-semibold", children: /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: ratingAverages.rate_nilaiekonomis })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-20 mt-16", children: location.reviews.slice(0, 5).map((review, idx) => {
          return /* @__PURE__ */ jsx(ReviewCard, { review }, idx);
        }) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "py-3.5 px-6 rounded-lg border border-gray-400 text-gray-500 mt-8 font-medium hover:cursor-pointer hover:bg-gray-100 transition-all",
            onClick: () => setIsReviewOpen(true),
            children: [
              "Tampilkan Semua",
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-600", children: location.reviews.length || 0 }),
              " ",
              "Ulasan"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          ReviewDialog,
          {
            isOpen: isReviewOpen,
            setIsOpen: setIsReviewOpen,
            reviews: location.reviews,
            ratings: ratingAverages
          }
        )
      ] })
    ] })
  ] });
}
export {
  Location as default
};
