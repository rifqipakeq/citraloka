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
  const { tickets, filters } = usePage().props;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Tickets" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Tickets" }),
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [
            hasAnyPermission(["tickets create"]) && /* @__PURE__ */ jsx(Button, { type: "add", url: route("tickets.create") }),
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-4.6", children: /* @__PURE__ */ jsx(Search, { url: route("tickets.index"), placeholder: "Search tickets data by name...", filter: filters }) })
          ] }),
          /* @__PURE__ */ jsx(Table.Card, { title: "Tickets", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Th, { children: "#" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Ticket Code" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Ticket Type" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Price" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Quantity" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: tickets.data.map((ticket, i) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Td, { children: ++i + (tickets.current_page - 1) * tickets.per_page }),
              /* @__PURE__ */ jsx(Table.Td, { children: ticket.ticket_code }),
              /* @__PURE__ */ jsx(Table.Td, { children: ticket.name }),
              /* @__PURE__ */ jsxs(Table.Td, { children: [
                "Rp",
                ticket.price_per_pack.toLocaleString()
              ] }),
              /* @__PURE__ */ jsx(Table.Td, { children: ticket.qty }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs("div", { className: "flex item-center gap-2", children: [
                hasAnyPermission(["tickets edit"]) && /* @__PURE__ */ jsx(Button, { type: "edit", url: route("tickets.edit", ticket.id) }),
                hasAnyPermission(["tickets delete"]) && /* @__PURE__ */ jsx(Button, { type: "delete", url: route("tickets.destroy", ticket.id) })
              ] }) })
            ] }, { i })) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "fle item-center justity-center", children: tickets.last_page !== 1 && /* @__PURE__ */ jsx(Pagination, { links: tickets.links }) })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
