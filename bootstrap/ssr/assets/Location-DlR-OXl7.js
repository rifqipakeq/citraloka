import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { D as DestinationCard } from "./DestinationCard-CwLpCWdN.js";
import ReactPaginate from "react-paginate";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { U as UserLayout } from "./UserLayout-DN4sf-_Z.js";
import "./constants-BHE6LNk3.js";
import "./helper-DadYwhGw.js";
function Location({ locations, filters, categories, auth }) {
  const [search, setSearch] = useState(filters.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    filters.category || ""
  );
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.get(route("location.index"), {
      search,
      category: selectedCategory
    });
  };
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    router.get(route("location.index"), {
      search,
      category: categoryId
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs(UserLayout, { auth, children: [
      /* @__PURE__ */ jsxs(
        "section",
        {
          className: "relative flex flex-col px-4 items-center font-poppins pt-40",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-full h-[37.5rem] locations-hero absolute top-0 left-0 -z-10"
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex flex-col md:flex-row gap-8 justify-between items-center container mx-auto",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold text-primary-opaque", children: "Location" }),
                    /* @__PURE__ */ jsx("p", { className: "text-white mt-4", children: "Dapatkan Pengalaman Liburan Terbaik di sini" })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "form",
                    {
                      onSubmit: handleSearchSubmit,
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
                            className: "py-3.5 px-8 text-white rounded-xl font-semibold bg-primary-opaque hover:cursor-pointer hover:bg-primary-hover transition-all",
                            children: "Search"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-12 flex container mx-auto flex-wrap gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleCategoryClick(""),
                  className: `text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all ${selectedCategory === "" ? "bg-primary-opaque text-white" : "bg-white text-gray-500 hover:bg-gray-100"}`,
                  children: "All"
                },
                "all"
              ),
              categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                return /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleCategoryClick(category.id),
                    className: `text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all 
                                    ${isSelected ? "bg-primary-opaque text-white" : "bg-white text-gray-500 hover:bg-gray-100"}`,
                    children: category.name
                  },
                  category.value
                );
              })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "main",
        {
          className: "container px-4 relative mx-auto mt-12 mb-32 z-10 font-poppins",
          children: [
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 mb-8", children: locations.data.length > 0 ? locations.data.map((item, idx) => /* @__PURE__ */ jsx(DestinationCard, { item }, idx)) : /* @__PURE__ */ jsx("div", { className: "col-span-12 text-center py-20", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-gray-500", children: "No Locations Found" }) }) }),
            /* @__PURE__ */ jsx(
              ReactPaginate,
              {
                breakLabel: "...",
                nextLabel: "Next →",
                onPageChange: (e) => router.get(route("location.index"), {
                  search,
                  category: selectedCategory,
                  page: e.selected + 1
                }),
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
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  Location as default
};
