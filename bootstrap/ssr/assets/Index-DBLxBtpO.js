import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-PUzc7cpw.js";
import { C as Container } from "./Container-D-XqGt6e.js";
import { T as Table, P as Pagination } from "./Pagination-dEpSWpR2.js";
import { usePage, Head } from "@inertiajs/react";
import "sweetalert2";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "@tabler/icons-react";
const statusStyles = {
  PAID: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  PENDING: "bg-yellow-100 text-yellow-800"
};
function Badge({ status }) {
  const normalizedStatus = (status == null ? void 0 : status.toUpperCase()) || "PENDING";
  const style = statusStyles[normalizedStatus] || "bg-gray-100 text-gray-800";
  return /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${style}`, children: normalizedStatus });
}
function Index({ auth }) {
  const { transactions, filters } = usePage().props;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Transactions" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Transactions" }),
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsx(Table.Card, { title: "Transactions", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Th, { children: "#" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Code" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "External ID" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Checkout Link" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Payment Method" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Payment Status" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "User" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Ticket Code" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Price" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Quantity" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "PPN" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Total" })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: transactions.data.map((transaction, i) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Td, { children: ++i + (transactions.current_page - 1) * transactions.per_page }),
              /* @__PURE__ */ jsx(Table.Td, { children: transaction.code }),
              /* @__PURE__ */ jsx(Table.Td, { children: transaction.external_id }),
              /* @__PURE__ */ jsx(Table.Td, { children: transaction.checkout_link }),
              /* @__PURE__ */ jsx(Table.Td, { children: transaction.payment_method }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(
                Badge,
                {
                  status: transaction.payment_status
                }
              ) }),
              /* @__PURE__ */ jsxs(Table.Td, { children: [
                transaction.user.name,
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400", children: transaction.user.email })
              ] }),
              /* @__PURE__ */ jsx(Table.Td, { children: transaction.ticket.ticket_code }),
              /* @__PURE__ */ jsx(Table.Td, { children: transaction.price_per_pack }),
              /* @__PURE__ */ jsx(Table.Td, { children: transaction.qty }),
              /* @__PURE__ */ jsx(Table.Td, { children: transaction.ppn }),
              /* @__PURE__ */ jsx(Table.Td, { children: transaction.total })
            ] }, i)) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: transactions.last_page !== 1 && /* @__PURE__ */ jsx(Pagination, { links: transactions.links }) })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
