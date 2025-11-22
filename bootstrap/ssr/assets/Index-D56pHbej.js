import { jsxs, jsx } from "react/jsx-runtime";
import "react";
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
  const { categories, filters } = usePage().props;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Categories" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Categories" }),
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [
            hasAnyPermission(["categories create"]) && /* @__PURE__ */ jsx(Button, { type: "add", url: route("categories.create") }),
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-4.6", children: /* @__PURE__ */ jsx(
              Search,
              {
                url: route("categories.index"),
                placeholder: "Search categories by name...",
                filter: filters
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Table.Card, { title: "categories", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Th, { children: "#" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Categories Name" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Image" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: categories.data.map((category, i) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Td, { children: ++i + (categories.current_page - 1) * categories.per_page }),
              /* @__PURE__ */ jsx(Table.Td, { children: category.name }),
              /* @__PURE__ */ jsx(Table.Td, { children: category.image ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: `/storage/${category.image}`,
                  alt: category.name,
                  className: "w-16 h-16 object-cover rounded-md"
                }
              ) : /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "No Image" }) }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs("div", { className: "flex item-center gap-2", children: [
                hasAnyPermission(["categories edit"]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "edit",
                    url: route("categories.edit", category.id)
                  }
                ),
                hasAnyPermission(["categories delete"]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "delete",
                    url: route("categories.destroy", category.id)
                  }
                )
              ] }) })
            ] }, i)) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "fle item-center justity-center", children: categories.last_page !== 1 && /* @__PURE__ */ jsx(Pagination, { links: categories.links }) })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
