import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-PUzc7cpw.js";
import { C as Container } from "./Container-D-XqGt6e.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { B as Button } from "./Button-DC7PgICx.js";
import { C as Card } from "./Card-BNOqaah3.js";
import Swal from "sweetalert2";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "@tabler/icons-react";
const InteractiveRatingStars = ({ label, rating, max = 5, onChange }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-gray-700 mb-1", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
      Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        return /* @__PURE__ */ jsx(
          "span",
          {
            onClick: () => onChange(starValue),
            className: `text-3xl cursor-pointer ${starValue <= rating ? "text-yellow-400" : "text-gray-300"}`,
            children: "★"
          },
          index
        );
      }),
      /* @__PURE__ */ jsxs("span", { className: "ml-2 text-gray-600 text-sm", children: [
        "(",
        rating,
        " / ",
        max,
        ")"
      ] })
    ] })
  ] });
};
function Edit({ auth }) {
  const { review, locations, transactions } = usePage().props;
  const { data, setData, put, errors } = useForm({
    location_id: review.location_id,
    transaction_id: review.transaction_id,
    review: review.review,
    rate_kebersihan: review.rate_kebersihan,
    rate_keakuratan: review.rate_keakuratan,
    rate_checkin: review.rate_checkin,
    rate_komunikasi: review.rate_komunikasi,
    rate_lokasi: review.rate_lokasi,
    rate_nilaiekonomis: review.rate_nilaiekonomis,
    _method: "put"
  });
  const handleUpdate = (e) => {
    e.preventDefault();
    put(route("reviews.update", review.id), {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Review updated successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };
  const selectedLocation = locations.find((location) => location.id == data.location_id);
  const selectedTransaction = transactions.find((transaction) => transaction.id == data.transaction_id);
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Edit Review" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Edit Review" }),
        /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Card, { title: "Edit Review", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleUpdate, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-gray-700", children: "User" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border-gray-300 rounded-md shadow-xs bg-gray-100",
                value: auth.user.name,
                disabled: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-gray-700", children: "Location" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border-gray-300 rounded-md shadow-xs bg-gray-100",
                value: selectedLocation ? selectedLocation.title : "Unknown",
                disabled: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-gray-700", children: "Transaction" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border-gray-300 rounded-md shadow-xs bg-gray-100",
                value: selectedTransaction ? selectedTransaction.code : "Unknown",
                disabled: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
            /* @__PURE__ */ jsx(
              InteractiveRatingStars,
              {
                label: "Kebersihan",
                rating: data.rate_kebersihan,
                onChange: (val) => setData("rate_kebersihan", val)
              }
            ),
            /* @__PURE__ */ jsx(
              InteractiveRatingStars,
              {
                label: "Keakuratan",
                rating: data.rate_keakuratan,
                onChange: (val) => setData("rate_keakuratan", val)
              }
            ),
            /* @__PURE__ */ jsx(
              InteractiveRatingStars,
              {
                label: "Check In",
                rating: data.rate_checkin,
                onChange: (val) => setData("rate_checkin", val)
              }
            ),
            /* @__PURE__ */ jsx(
              InteractiveRatingStars,
              {
                label: "Komunikasi",
                rating: data.rate_komunikasi,
                onChange: (val) => setData("rate_komunikasi", val)
              }
            ),
            /* @__PURE__ */ jsx(
              InteractiveRatingStars,
              {
                label: "Lokasi",
                rating: data.rate_lokasi,
                onChange: (val) => setData("rate_lokasi", val)
              }
            ),
            /* @__PURE__ */ jsx(
              InteractiveRatingStars,
              {
                label: "Nilai Ekonomis",
                rating: data.rate_nilaiekonomis,
                onChange: (val) => setData("rate_nilaiekonomis", val)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Button, { type: "submit", children: "Update" }),
            /* @__PURE__ */ jsx(Button, { type: "cancel", url: route("reviews.index"), children: "Cancel" })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  InteractiveRatingStars,
  Edit as default
};
