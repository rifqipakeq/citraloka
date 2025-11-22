import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import "react";
function Card({ title, children, className }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `p-4 rounded-t-lg border ${className} bg-white`, children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 font-semibold text-sm text-gray-700 capitalize", children: title }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white p-4 border border-t-0 border-b rounded-b-lg", children })
  ] });
}
export {
  Card as C
};
