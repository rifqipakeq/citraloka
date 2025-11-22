import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Link } from "@inertiajs/react";
import { IconPlus, IconCheck, IconArrowBack, IconPencilCog, IconTrash } from "@tabler/icons-react";
import "react";
import Swal from "sweetalert2";
function Button({ type, url, className, children, ...props }) {
  const { delete: destroy } = useForm();
  const handleDeleteData = async (url2) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      text: "Data is unrecoverable!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        destroy(url2);
        Swal.fire({
          title: "Success!",
          text: "Data deleted successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    type === "add" && /* @__PURE__ */ jsxs(
      Link,
      {
        href: url,
        className: "px-4 py-2 text-sm border whitespace-nowrap rounded-lg bg-white text-gray-700 flex items-center gap-2 hover:bg-gray-100",
        children: [
          /* @__PURE__ */ jsx(IconPlus, { size: 18, strokeWidth: 1.5 }),
          " ",
          /* @__PURE__ */ jsx("span", { className: "hidden lg:flex", children: "Create New Data" })
        ]
      }
    ),
    type === "modal" && /* @__PURE__ */ jsx(
      "button",
      {
        ...props,
        type: "button",
        className: `${className} px-4 py-2 text-sm border rounded-lg flex items-center gap-2`,
        children
      }
    ),
    type === "submit" && /* @__PURE__ */ jsxs(
      "button",
      {
        type: "submit",
        className: "px-4 py-2 text-sm rounded-lg border border-teal-100 bg-teal-50 text-teal-500 flex items-center gap-2 hover:bg-teal-100",
        children: [
          /* @__PURE__ */ jsx(IconCheck, { size: 16, strokeWidth: 1.5 }),
          " Save Data"
        ]
      }
    ),
    type === "cancel" && /* @__PURE__ */ jsxs(
      Link,
      {
        href: url,
        className: "px-4 py-2 text-sm rounded-lg border border-rose-100 bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100",
        children: [
          /* @__PURE__ */ jsx(IconArrowBack, { size: 16, strokeWidth: 1.5 }),
          " Go Back"
        ]
      }
    ),
    type === "edit" && /* @__PURE__ */ jsx(
      Link,
      {
        href: url,
        className: "px-4 py-2 rounded-lg bg-orange-50 text-orange-500 flex items-center gap-2 hover:bg-orange-100",
        children: /* @__PURE__ */ jsx(IconPencilCog, { size: 16, strokeWidth: 1.5 })
      }
    ),
    type === "delete" && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleDeleteData(url),
        className: "px-4 py-2 rounded-lg bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100",
        children: /* @__PURE__ */ jsx(IconTrash, { size: 18, strokeWidth: 1.5 })
      }
    )
  ] });
}
export {
  Button as B
};
