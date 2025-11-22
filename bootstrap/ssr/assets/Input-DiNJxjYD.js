import { jsxs, jsx } from "react/jsx-runtime";
import "react";
function Input({ label, type, className, errors, ...props }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx("label", { className: "text-gray-600 text-sm", children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: `w-full px-4 py-2 border text-sm rounded-md focus:outline-hidden focus:ring-0 bg-white text-gray-700 focus:border-gray-200 border-gray-200 ${className}`,
        ...props
      }
    ),
    errors && /* @__PURE__ */ jsx("small", { className: "text-xs text-red-500", children: errors })
  ] });
}
export {
  Input as I
};
