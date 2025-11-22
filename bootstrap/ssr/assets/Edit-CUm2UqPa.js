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
  const { ticketCategory } = usePage().props;
  const { data, setData, post, errors } = useForm({
    name: ticketCategory.name,
    _method: "put"
  });
  const handleUpdateData = async (e) => {
    e.preventDefault();
    post(route("ticket-categories.update", ticketCategory.id), {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Ticket category updated successfully!",
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
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Edit Ticket Category" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Edit Ticket Category" }),
        /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Card, { title: "Edit Ticket Category", children: /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: handleUpdateData,
            encType: "multipart/form-data",
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Ticket Category Name",
                  type: "text",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value),
                  errors: errors.name,
                  placeholder: "Input Ticket Category name..."
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Button, { type: "submit" }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "cancel",
                    url: route("ticket-categories.index")
                  }
                )
              ] })
            ]
          }
        ) }) })
      ]
    }
  );
}
export {
  Edit as default
};
