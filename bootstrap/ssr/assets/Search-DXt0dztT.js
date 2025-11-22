import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { IconSearch } from "@tabler/icons-react";
import "react";
function Search({ url, placeholder }) {
  const { data, setData, get } = useForm({
    search: ""
  });
  const handleSearchData = (e) => {
    e.preventDefault();
    get(`${url}?search=${data.search}`);
  };
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSearchData, children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: data.search,
        onChange: (e) => setData("search", e.target.value),
        className: "py-2 px-4 pr-11 block w-full rounded-lg text-sm border focus:outline-hidden focus:ring-0 focus:ring-gray-400 text-gray-700 bg-white border-gray-200 focus:border-gray-200",
        placeholder
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pointer-events-none pr-4", children: /* @__PURE__ */ jsx(IconSearch, { size: 18, strokeWidth: 1.5 }) })
  ] }) });
}
export {
  Search as S
};
