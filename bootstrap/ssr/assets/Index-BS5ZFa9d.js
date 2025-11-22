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
  const { ticketCategories, filters } = usePage().props;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: 'Ticket Categories"' }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Ticket Categories" }),
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [
            hasAnyPermission(["tickets create"]) && /* @__PURE__ */ jsx(Button, { type: "add", url: route("ticket-categories.create") }),
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-4/6", children: /* @__PURE__ */ jsx(
              Search,
              {
                url: route("ticket-categories.index"),
                placeholder: "Search ticket category by name...",
                filter: filters
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Table.Card, { title: "Ticket Categories", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Th, { children: "#" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Ticket Category Name" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: ticketCategories.data.map((ticketCategory, i) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Td, { children: ++i + (ticketCategories.current_page - 1) * ticketCategories.per_page }),
              /* @__PURE__ */ jsx(Table.Td, { children: ticketCategory.name }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                hasAnyPermission([
                  "tickets edit"
                ]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "edit",
                    url: route(
                      "ticket-categories.edit",
                      ticketCategory.id
                    )
                  }
                ),
                hasAnyPermission([
                  "tickets delete"
                ]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "delete",
                    url: route(
                      "ticket-categories.destroy",
                      ticketCategory.id
                    )
                  }
                )
              ] }) })
            ] }, i)) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: ticketCategories.last_page !== 1 && /* @__PURE__ */ jsx(Pagination, { links: ticketCategories.links }) })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
