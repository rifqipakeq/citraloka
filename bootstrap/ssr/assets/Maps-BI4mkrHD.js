import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, router } from "@inertiajs/react";
import { D as DestinationCard } from "./DestinationCard-CwLpCWdN.js";
import { D as Dropdown } from "./Dropdown-kDhTbc1Y.js";
import { a as optionsPriceRanges, b as optionsSorts } from "./constants-BHE6LNk3.js";
import { useState, useRef, useEffect } from "react";
import { U as UserLayout } from "./UserLayout-DN4sf-_Z.js";
import ReactPaginate from "react-paginate";
import { M as Map } from "./Map-96WLGMuI.js";
import "./helper-DadYwhGw.js";
import "react-leaflet";
import "leaflet";
function Maps({
  locations,
  filters,
  categories,
  regions,
  auth
}) {
  const [category, setCategory] = useState(filters.category || "all");
  const [location, setLocation] = useState(filters.region || "all");
  const [search, setSearch] = useState(filters.search || "");
  const [priceRange, setPriceRange] = useState(filters.price || "");
  const [sortBy, setSortBy] = useState(filters.sort || "");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationDetail, setSelectedLocationDetail] = useState(
    locations.data[0]
  );
  const mapRef = useRef();
  const handleStart = () => {
    var _a;
    (_a = mapRef.current) == null ? void 0 : _a.startNavigation();
  };
  const handleFilterChange = () => {
    router.get(
      route("location.maps"),
      {
        search,
        category,
        region: location,
        price_range: priceRange,
        sort: sortBy
      },
      {
        preserveState: true,
        preserveScroll: true
      }
    );
  };
  useEffect(() => {
    handleFilterChange();
  }, [category, location, priceRange, sortBy]);
  useEffect(() => {
    if (selectedLocation) {
      const selectedLocationData = locations.data.find(
        (item) => item.id === selectedLocation
      );
      setSelectedLocationDetail(selectedLocationData);
    }
  }, [selectedLocation, locations.data]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Maps" }),
    /* @__PURE__ */ jsxs(UserLayout, { auth, children: [
      /* @__PURE__ */ jsxs(
        "section",
        {
          className: "relative flex flex-col px-4 items-center font-poppins pt-40",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-full h-[37.5rem] locations-hero absolute top-0 left-0 -z-10" }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex flex-col md:flex-row gap-8 justify-between items-center container mx-auto",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold text-primary-opaque", children: "Maps" }),
                    /* @__PURE__ */ jsx("p", { className: "text-white mt-4", children: "Dapatkan Pengalaman Liburan Terbaik di sini" })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "form",
                    {
                      onSubmit: (e) => {
                        e.preventDefault();
                        handleFilterChange();
                      },
                      className: "flex flex-col sm:flex-row gap-4 w-full",
                      children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Search for a destination",
                            value: search,
                            onChange: (e) => setSearch(e.target.value),
                            className: "w-full h-12 px-4 rounded-xl border border-gray-300 bg-white"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "submit",
                            className: "py-3.5 px-8 text-white rounded-xl font-semibold bg-primary-opaque",
                            children: "Search"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-12 flex container mx-auto flex-wrap justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
                /* @__PURE__ */ jsx(
                  Dropdown,
                  {
                    options: [
                      { label: "Semua kategori", value: null },
                      ...categories.map((item) => ({
                        label: item.name,
                        value: item.id
                      }))
                    ],
                    value: category,
                    onChange: setCategory,
                    placeholder: "All Categories"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Dropdown,
                  {
                    options: [
                      { label: "Semua lokasi", value: null },
                      ...regions.map((item) => ({
                        label: item.name,
                        value: item.id
                      }))
                    ],
                    value: location,
                    onChange: setLocation,
                    placeholder: "All Locations"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Dropdown,
                  {
                    options: optionsPriceRanges,
                    value: priceRange,
                    onChange: setPriceRange,
                    placeholder: "All Price"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Dropdown,
                {
                  options: optionsSorts,
                  value: sortBy,
                  onChange: setSortBy
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "main",
        {
          className: "container relative mx-auto px-4 grid grid-cols-12 gap-4 sm:gap-12 mt-12 mb-32 z-10 font-poppins",
          children: locations.data.length === 0 ? /* @__PURE__ */ jsx("div", { className: "col-span-12 text-center py-20", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-gray-500", children: "No Locations Found" }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-12 col-span-12 md:col-span-4", children: locations.data.map((item, idx) => /* @__PURE__ */ jsx(
              DestinationCard,
              {
                item,
                action: () => setSelectedLocation(item.id)
              },
              idx
            )) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-12 md:col-span-8", children: /* @__PURE__ */ jsxs(
              "div",
              {
                id: "maps",
                className: "h-[600px] w-full sticky top-36",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "rounded-3xl overflow-hidden", children: /* @__PURE__ */ jsx(
                    Map,
                    {
                      lat: selectedLocationDetail.latitude,
                      long: selectedLocationDetail.longitude,
                      location: selectedLocationDetail,
                      ref: mapRef
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center mt-4", children: [
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
                ]
              }
            ) })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 mb-32 z-10 font-poppins", children: /* @__PURE__ */ jsx(
        ReactPaginate,
        {
          breakLabel: "...",
          nextLabel: "Next →",
          onPageChange: (e) => router.get(
            route("location.maps"),
            {
              search,
              category,
              region: location,
              price_range: priceRange,
              sort: sortBy,
              page: e.selected + 1
            },
            {
              preserveState: true,
              preserveScroll: true
            }
          ),
          pageRangeDisplayed: 5,
          forcePage: locations.current_page - 1,
          pageCount: locations.last_page,
          previousLabel: "← Previous",
          renderOnZeroPageCount: null,
          containerClassName: "list-unstyled py-4 flex items-center justify-center gap-4 w-full",
          previousClassName: "mr-auto font-poppins text-gray-500 font-medium hover:cursor-pointer",
          nextClassName: "ml-auto font-poppins text-gray-500 font-medium hover:cursor-pointer",
          pageClassName: "w-12 h-12 hover:cursor-pointer grid place-content-center rounded-full aspect-square text-gray-500 hover:bg-primary-transparent font-medium font-poppins",
          activeClassName: "w-12 h-12 hover:cursor-pointer grid place-content-center rounded-full aspect-square text-gray-500 bg-primary-transparent text-primary-opaque font-medium font-poppins"
        }
      ) })
    ] })
  ] });
}
export {
  Maps as default
};
