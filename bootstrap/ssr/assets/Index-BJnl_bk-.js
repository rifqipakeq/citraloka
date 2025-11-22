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
  const { regions, filters } = usePage().props;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Regions" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Regions" }),
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [
            hasAnyPermission(["regions create"]) && /* @__PURE__ */ jsx(Button, { type: "add", url: route("regions.create") }),
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-4/6", children: /* @__PURE__ */ jsx(
              Search,
              {
                url: route("regions.index"),
                placeholder: "Search regions by name...",
                filter: filters
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Table.Card, { title: "Regions", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Th, { children: "#" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Region Name" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: regions.data.map((region, i) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Td, { children: ++i + (regions.current_page - 1) * regions.per_page }),
              /* @__PURE__ */ jsx(Table.Td, { children: region.name }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                hasAnyPermission([
                  "regions edit"
                ]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "edit",
                    url: route(
                      "regions.edit",
                      region.id
                    )
                  }
                ),
                hasAnyPermission([
                  "regions delete"
                ]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "delete",
                    url: route(
                      "regions.destroy",
                      region.id
                    )
                  }
                )
              ] }) })
            ] }, i)) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: regions.last_page !== 1 && /* @__PURE__ */ jsx(Pagination, { links: regions.links }) })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
