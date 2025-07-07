import React from "react";
import Select from "react-select";

export default function Select2({
    options,
    onChange,
    defaultOptions,
    placeholder,
}) {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? "#4CAF50" : "#ccc",
            boxShadow: state.isFocused
                ? "0 0 5px rgba(76, 175, 80, 0.5"
                : "none",
            outline: "none",
            "&hover": {
                borderColor: "#4CAF50",
            },
        }),
    };

    return (
        <Select
            options={options}
            onChange="basic-multi-select"
            defaultValue={defaultOptions || null}
            classNamePrefix="select"
            placeholder={placeholder || "Pilih Opsi..."}
            isMulti
            styles={customStyles}
        />
    );
}
