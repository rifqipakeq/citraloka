import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-PUzc7cpw.js";
import { C as Container } from "./Container-D-XqGt6e.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { I as Input } from "./Input-DiNJxjYD.js";
import { B as Button } from "./Button-DC7PgICx.js";
import { C as Card } from "./Card-BNOqaah3.js";
import Swal from "sweetalert2";
import { f as formatDate } from "./helper-DadYwhGw.js";
import { InteractiveRatingStars } from "./Edit-DOppnx4l.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "@tabler/icons-react";
function Create({ auth }) {
  const { transactions } = usePage().props;
  const { data, setData, post, errors } = useForm({
    transaction_id: "",
    rate_checkin: 0,
    rate_lokasi: 0,
    rate_kebersihan: 0,
    rate_komunikasi: 0,
    rate_keakuratan: 0,
    rate_nilaiekonomis: 0,
    review: ""
  });
  const handleCreate = (e) => {
    e.preventDefault();
    post(route("reviews.store"), {
      onSuccess: () => {
        Swal.fire({
          title: "Success",
          text: "Data created successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };
  const selectedLocation = transactions.find((transaction) => transaction.id == data.transaction_id);
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Create Review" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Review" }),
        /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Card, { title: "Create Review", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleCreate, children: [
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
            /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-gray-700", children: "Transaction" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "w-full border-gray-300 rounded-md shadow-xs",
                value: data.transaction_id,
                onChange: (e) => setData("transaction_id", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Transaction" }),
                  transactions.map((transaction) => {
                    var _a;
                    return /* @__PURE__ */ jsxs(
                      "option",
                      {
                        value: transaction.id,
                        children: [
                          transaction.code,
                          " -",
                          " ",
                          (_a = transaction.location) == null ? void 0 : _a.title,
                          " -",
                          " ",
                          formatDate(transaction.updated_at)
                        ]
                      },
                      transaction.id
                    );
                  })
                ]
              }
            ),
            errors.transaction_id && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.transaction_id })
          ] }),
          selectedLocation && selectedLocation.location.image_urls && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-gray-700", children: "Preview Image" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-2", children: selectedLocation.location.image_urls.length > 0 && selectedLocation.location.image_urls.map(
              (item) => /* @__PURE__ */ jsx(
                "img",
                {
                  src: item,
                  alt: "Image " + item,
                  className: "w-full h-48 object-cover overflow-hidden rounded-md shadow-sm"
                }
              )
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
            Input,
            {
              label: "Review",
              type: "textarea",
              value: data.review,
              onChange: (e) => setData("review", e.target.value),
              errors: errors.review,
              placeholder: "Write your review..."
            }
          ) }),
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
            /* @__PURE__ */ jsx(Button, { type: "submit" }),
            /* @__PURE__ */ jsx(Button, { type: "cancel", url: route("reviews.index") })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  Create as default
};
