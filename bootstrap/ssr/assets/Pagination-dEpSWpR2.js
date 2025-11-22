import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import "react";
import { Link } from "@inertiajs/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
const Card = ({ title, className, children }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `p-4 rounded-t-lg border ${className} bg-white`, children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 font-semibold text-sm text-gray-700 uppercase", children: title }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-b-lg border-t-0", children })
  ] });
};
const Table = ({ children }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden overflow-x-auto border-collapse rounded-b-lg border border-t-0", children: /* @__PURE__ */ jsx("table", { className: "w-full text-sm", children }) }) });
};
const Thead = ({ className, children }) => {
  return /* @__PURE__ */ jsx("thead", { className: `${className} border-b bg-gray-50`, children });
};
const Tbody = ({ className, children }) => {
  return /* @__PURE__ */ jsx("tbody", { className: `${className} divide-y bg-white`, children });
};
const Td = ({ className, children }) => {
  return /* @__PURE__ */ jsx(
    "td",
    {
      className: `${className} whitespace-nowrap p-4 align-middle text-gray-700`,
      children
    }
  );
};
const Th = ({ className, children }) => {
  return /* @__PURE__ */ jsx(
    "th",
    {
      scope: "col",
      className: `${className} h-12 px-4 text-left align-middle font-medium text-gray-700`,
      children
    }
  );
};
const Empty = ({ colSpan, message, children }) => {
  return /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan, children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-96", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "mt-5", children: message })
  ] }) }) }) });
};
Table.Card = Card;
Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Td = Td;
Table.Th = Th;
Table.Empty = Empty;
function Pagination({ links }) {
  const style = "p-1 text-sm border rounded-md bg-white text-gray-500 hover:bg-gray-100";
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("ul", { className: "mt-2 lg:mt-5 justify-end flex items-center gap-1", children: links.map((item, i) => {
    return item.url != null ? item.label.includes("Previous") ? /* @__PURE__ */ jsx(Link, { className: style, href: item.url, children: /* @__PURE__ */ jsx(IconChevronLeft, { size: "20", strokeWidth: "1.5" }) }, i) : item.label.includes("Next") ? /* @__PURE__ */ jsx(Link, { className: style, href: item.url, children: /* @__PURE__ */ jsx(IconChevronRight, { size: "20", strokeWidth: "1.5" }) }, i) : /* @__PURE__ */ jsx(Link, { className: `px-2 py-1 text-sm border  rounded-md text-gray-500 hover:bg-gray-100 ${item.active ? "bg-white text-gray-700" : "bg-white"}`, href: item.url, children: item.label }, i) : null;
  }) }) });
}
export {
  Pagination as P,
  Table as T
};
