import { jsx } from "react/jsx-runtime";
import "react";
import Select from "react-select";
function Select2({ options, onChange, placeholder, defaultOptions }) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#4CAF50" : "#ccc",
      // Warna border saat fokus
      boxShadow: state.isFocused ? "0 0 5px rgba(76, 175, 80, 0.5)" : "none",
      outline: "none",
      // Menghilangkan garis biru
      "&:hover": {
        borderColor: "#4CAF50"
        // Warna border saat hover
      }
    })
  };
  return /* @__PURE__ */ jsx(
    Select,
    {
      options,
      onChange,
      className: "basic-multi-select",
      defaultValue: defaultOptions || null,
      classNamePrefix: "select",
      placeholder: placeholder || "Pilih opsi...",
      isMulti: true,
      styles: customStyles
    }
  );
}
export {
  Select2 as S
};
