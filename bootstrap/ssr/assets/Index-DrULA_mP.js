import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout, h as hasAnyPermission } from "./AuthenticatedLayout-PUzc7cpw.js";
import { C as Container } from "./Container-D-XqGt6e.js";
import { T as Table, P as Pagination } from "./Pagination-dEpSWpR2.js";
import { B as Button } from "./Button-DC7PgICx.js";
import { usePage, Head } from "@inertiajs/react";
import { S as Search } from "./Search-DXt0dztT.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "@tabler/icons-react";
import "sweetalert2";
function Index({ auth }) {
  const { locations, filters } = usePage().props;
  const [selectedImage, setSelectedImage] = useState(null);
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Locations" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Locations" }),
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [
            hasAnyPermission(["locations create"]) && /* @__PURE__ */ jsx(Button, { type: "add", url: route("locations.create") }),
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-4.6", children: /* @__PURE__ */ jsx(
              Search,
              {
                url: route("locations.index"),
                placeholder: "Search locations data by name...",
                filter: filters
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Table.Card, { title: "Locations", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Th, { children: "#" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Title" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Image" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Description" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Office Hours" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Phone" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Address" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Latitude" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Longitude" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Category" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Ticket Code" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: locations.data.map((location, i) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Td, { children: ++i + (locations.current_page - 1) * locations.per_page }),
              /* @__PURE__ */ jsx(Table.Td, { children: location.title }),
              /* @__PURE__ */ jsx(Table.Td, { children: location.image_urls ? /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: location.image_urls.map((img, idx) => /* @__PURE__ */ jsx(
                "img",
                {
                  src: img,
                  alt: `Image ${idx + 1}`,
                  className: "w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-75 transition",
                  onClick: () => setSelectedImage(img)
                },
                idx
              )) }) : /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "No Image" }) }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(
                "div",
                {
                  dangerouslySetInnerHTML: { __html: location.description }
                }
              ) }),
              /* @__PURE__ */ jsx(Table.Td, { children: location.officehours }),
              /* @__PURE__ */ jsx(Table.Td, { children: location.phone }),
              /* @__PURE__ */ jsx(Table.Td, { children: location.address }),
              /* @__PURE__ */ jsx(Table.Td, { children: location.latitude }),
              /* @__PURE__ */ jsx(Table.Td, { children: location.longitude }),
              /* @__PURE__ */ jsx(Table.Td, { children: location.category ? location.category.name : "N/A" }),
              /* @__PURE__ */ jsx(Table.Td, { children: location.ticket ? location.ticket.ticket_code : "N/A" }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs("div", { className: "flex item-center gap-2", children: [
                hasAnyPermission(["locations edit"]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "edit",
                    url: route("locations.edit", location.id)
                  }
                ),
                hasAnyPermission(["locations delete"]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "delete",
                    url: route("locations.destroy", location.id)
                  }
                )
              ] }) })
            ] }, i)) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "fle item-center justity-center", children: locations.last_page !== 1 && /* @__PURE__ */ jsx(Pagination, { links: locations.links }) })
        ] }),
        selectedImage && /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50",
            onClick: () => setSelectedImage(null),
            children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: selectedImage,
                  alt: "Preview",
                  className: "max-w-full max-h-[90vh] rounded-lg shadow-lg"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setSelectedImage(null),
                  className: "absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg",
                  children: "✕"
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
export {
  Index as default
};
