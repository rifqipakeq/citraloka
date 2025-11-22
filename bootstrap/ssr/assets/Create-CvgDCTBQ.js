import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-PUzc7cpw.js";
import { C as Container } from "./Container-D-XqGt6e.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { I as Input } from "./Input-DiNJxjYD.js";
import { B as Button } from "./Button-DC7PgICx.js";
import { C as Card } from "./Card-BNOqaah3.js";
import { S as Select2 } from "./Select2-Bya9AlYZ.js";
import Swal from "sweetalert2";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "@tabler/icons-react";
import "react-select";
function Create({ auth }) {
  const { roles } = usePage().props;
  const { data, setData, post, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    selectedRoles: [],
    password: "",
    password_confirmation: ""
  });
  const formattedRoles = roles.map((role) => ({
    value: role.name,
    label: role.name
  }));
  const handleSelectedRoles = (selected) => {
    const selectedValues = selected.map((option) => option.value);
    setData("selectedRoles", selectedValues);
  };
  const handleStoreData = async (e) => {
    e.preventDefault();
    post(route("users.store"), {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Data created successfully!",
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
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Create User" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Users" }),
        /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Card, { title: "Create new User", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleStoreData, children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Input, { label: "Name", type: "text", value: data.name, onChange: (e) => setData("name", e.target.value), errors: errors.name, placeholder: "Input name user.." }) }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Input, { label: "Email", type: "email", value: data.email, onChange: (e) => setData("email", e.target.value), errors: errors.email, placeholder: "Input email user.." }) }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Input, { label: "Phone", type: "phone", value: data.phone, onChange: (e) => setData("phone", e.target.value), errors: errors.phone, placeholder: "Input phone user.." }) }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 text-sm text-gray-700", children: "Roles" }),
            /* @__PURE__ */ jsx(Select2, { onChange: handleSelectedRoles, options: formattedRoles, placeholder: "Pilih Role..." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Input, { label: "Password", type: "password", value: data.password, onChange: (e) => setData("password", e.target.value), errors: errors.password, placeholder: "Input password user.." }) }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Input, { label: "Password Confirmation", type: "password", value: data.password_confirmation, onChange: (e) => setData("password_confirmation", e.target.value), errors: errors.password_confirmation, placeholder: "Input password confirmation..." }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Button, { type: "submit" }),
            /* @__PURE__ */ jsx(Button, { type: "cancel", url: route("users.index") })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  Create as default
};
