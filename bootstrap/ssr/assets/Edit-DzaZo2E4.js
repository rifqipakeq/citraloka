import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-PUzc7cpw.js";
import { C as Container } from "./Container-D-XqGt6e.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { I as Input } from "./Input-DiNJxjYD.js";
import { B as Button } from "./Button-DC7PgICx.js";
import { C as Card } from "./Card-BNOqaah3.js";
import Swal from "sweetalert2";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "@tabler/icons-react";
function Edit({ auth }) {
  const { ticket, categories } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    name: ticket.name,
    ticket_category_id: ticket.ticket_category_id,
    qty: ticket.qty,
    price: ticket.price_per_pack,
    _method: "put"
  });
  const handleUpdateData = (e) => {
    e.preventDefault();
    post(route("tickets.update"), {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Ticket created successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Ticket" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Edit Ticket" }),
        /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Card, { title: "Edit Ticket", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleUpdateData, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-gray-700", children: "Ticket Type" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                className: "mt-1 block w-full border-gray-300 rounded-md shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50",
                value: data.ticket_category_id,
                onChange: (e) => setData("ticket_category_id", e.target.value),
                children: categories.map((category) => {
                  /* @__PURE__ */ jsx("option", { value: category.id, children: category.name }, category.id);
                })
              }
            ),
            errors.ticket_category_id && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.ticket_category_id })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
            Input,
            {
              label: "Price (Rp)",
              type: "number",
              value: data.price_per_pack,
              onChange: (e) => setData("price_per_pack", e.target.value ? parseFloat(e.target.value) : 0),
              errors: errors.price_per_pack,
              placeholder: "Enter ticket price..."
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
            Input,
            {
              label: "Quantity",
              type: "number",
              value: data.qty,
              onChange: (e) => setData("qty", e.target.value ? parseInt(e.target.value) : 0),
              errors: errors.qty,
              placeholder: "Enter ticket quantity..."
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Button, { type: "submit", children: " Save " }),
            /* @__PURE__ */ jsx(Button, { type: "cancel", url: route("tickets.index"), children: "Cancel" })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  Edit as default
};
