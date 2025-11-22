import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { U as UserLayout } from "./UserLayout-DN4sf-_Z.js";
function Welcome({ categories: categories2, auth }) {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("location.index"), {
      search
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs(UserLayout, { auth, children: [
      /* @__PURE__ */ jsxs(
        "section",
        {
          className: "relative flex flex-col items-center w-full h-[60vh] homepage-hero font-poppins",
          children: [
            /* @__PURE__ */ jsx(
              "h1",
              {
                className: "text-5xl font-semibold text-[#38505C] text-center mt-48 sm:mt-64",
                children: "Find The Best Vacation Spots"
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "absolute left-1/2 bottom-[-4rem] transform -translate-x-1/2 bg-white rounded-4xl shadow-custom px-8 py-10 w-[90%] max-w-[800px] z-10",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-6 sm:mb-10", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold mb-1.5 text-primary-opaque", children: "Find Destinations" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Discover the Best Destination in Indonesia" })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "form",
                    {
                      className: "flex flex-col sm:flex-row gap-4 w-full",
                      onSubmit: handleSearch,
                      children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Search for a destination",
                            value: search,
                            onChange: (e) => setSearch(e.target.value),
                            className: "w-full h-12 px-4 rounded-xl border border-gray-300"
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
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "main",
        {
          className: "container mx-auto grid md:grid-cols-3 grid-cols-1 gap-12 my-32 px-4",
          children: categories2.map((category, index) => /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => router.get(route("location.index"), {
                category: category.id
              }),
              className: "relative flex flex-col items-center hover:cursor-pointer",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: category.image_url,
                  alt: category.name,
                  className: "w-full",
                  draggable: "false"
                }
              )
            },
            index
          ))
        }
      )
    ] })
  ] });
}
export {
  Welcome as default
};
