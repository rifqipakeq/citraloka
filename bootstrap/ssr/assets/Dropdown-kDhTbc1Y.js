import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Urutkan berdasarkan"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative inline-block min-w-32", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "w-full bg-white text-gray-600 hover:cursor-pointer hover:bg-gray-100 font-medium py-2 px-4 text-sm rounded-full border flex justify-between items-center",
        children: [
          /* @__PURE__ */ jsx("span", { children: selectedOption ? selectedOption.label : placeholder }),
          /* @__PURE__ */ jsx("i", { className: "bi bi-chevron-down ml-2" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("ul", { className: "absolute z-20 mt-2 w-full bg-white rounded-lg border py-2 text-left", children: options.map((option) => /* @__PURE__ */ jsx(
      "li",
      {
        onClick: () => handleSelect(option),
        className: "px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium text-sm text-gray-600",
        children: option.label
      },
      option.value
    )) })
  ] });
}
export {
  Dropdown as D
};
