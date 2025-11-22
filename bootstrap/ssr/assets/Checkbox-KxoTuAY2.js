import { jsx, Fragment, jsxs } from "react/jsx-runtime";
function Checkbox({ label, ...props }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-2", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        type: "checkbox",
        className: "rounded-md bg-white border-gray-200 checked:bg-teal-500"
      }
    ),
    /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-700", children: label })
  ] }) });
}
export {
  Checkbox as C
};
