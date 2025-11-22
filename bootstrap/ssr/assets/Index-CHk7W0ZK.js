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
const RatingStars = ({ rating, max = 5 }) => {
  const filledStars = "⭐".repeat(rating);
  const emptyStars = "☆".repeat(max - rating);
  return /* @__PURE__ */ jsxs("span", { children: [
    filledStars,
    emptyStars
  ] });
};
function Index({ auth }) {
  const { reviews, filters, can } = usePage().props;
  auth.user.roles.includes("admin");
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Reviews" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Reviews" }),
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [
            hasAnyPermission(["reviews create"]) && /* @__PURE__ */ jsx(Button, { type: "add", url: route("reviews.create") }),
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-4.6", children: /* @__PURE__ */ jsx(
              Search,
              {
                url: route("reviews.index"),
                placeholder: "Search reviews data by name...",
                filter: filters
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Table.Card, { title: "Reviews", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Th, { children: "#" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "User" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Location" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Transaction" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Kebersihan" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Keakuratan" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Check In" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Komunikasi" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Lokasi" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Nilai Ekonomis" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: reviews.data.map((review, i) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Td, { children: ++i + (reviews.current_page - 1) * reviews.per_page }),
              /* @__PURE__ */ jsx(Table.Td, { children: review.user.name }),
              /* @__PURE__ */ jsx(Table.Td, { children: review.location.title }),
              /* @__PURE__ */ jsx(Table.Td, { children: review.transaction.code }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(RatingStars, { rating: review.rate_kebersihan }) }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(RatingStars, { rating: review.rate_keakuratan }) }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(RatingStars, { rating: review.rate_checkin }) }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(RatingStars, { rating: review.rate_komunikasi }) }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(RatingStars, { rating: review.rate_lokasi }) }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(RatingStars, { rating: review.rate_nilaiekonomis }) }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs("div", { className: "flex item-center gap-2", children: [
                (can == null ? void 0 : can.edit) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "edit",
                    url: route("reviews.edit", review.id)
                  }
                ),
                (can == null ? void 0 : can.delete) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "delete",
                    url: route("reviews.destroy", review.id)
                  }
                )
              ] }) })
            ] }, i)) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "fle item-center justity-center", children: reviews.last_page !== 1 && /* @__PURE__ */ jsx(Pagination, { links: reviews.links }) })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
