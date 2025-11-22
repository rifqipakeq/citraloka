import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-PUzc7cpw.js";
import { C as Container } from "./Container-D-XqGt6e.js";
import { useForm, Head } from "@inertiajs/react";
import { I as Input } from "./Input-DiNJxjYD.js";
import { B as Button } from "./Button-DC7PgICx.js";
import { C as Card } from "./Card-BNOqaah3.js";
import Swal from "sweetalert2";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "@tabler/icons-react";
function Create({ auth }) {
  const { data, setData, post, errors, progress } = useForm({
    name: "",
    image: null
  });
  const handleStoreData = async (e) => {
    e.preventDefault();
    post(route("categories.store"), {
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
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Create Category" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Category" }),
        /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Card, { title: "Create new Category", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleStoreData, children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Input, { label: "Category Name", type: "text", value: data.name, onChange: (e) => setData("name", e.target.value), errors: errors.name, placeholder: "Input category name.." }) }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block font-medium text-sm text-gray-700", children: "Category Image" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                className: "mt-1 block w-full text-sm text-gray-500\n                        file:mr-4 file:py-2 file:px-4\n                        file:rounded-lg file:border-0\n                        file:text-sm file:font-semibold\n                        file:bg-blue-50 file:text-blue-700\n                        hover:file:bg-blue-100",
                onChange: (e) => setData("image", e.target.files[0])
              }
            ),
            errors.image && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.image })
          ] }),
          progress && /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5 mb-4", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-blue-600 h-2.5 rounded-full",
              style: { width: `${progress}%` }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Button, { type: "submit" }),
            /* @__PURE__ */ jsx(Button, { type: "cancel", url: route("categories.index") })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  Create as default
};
