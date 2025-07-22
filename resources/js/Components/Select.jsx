import React from "react";

export default function Select({
    name,
    value,
    onChange,
    className,
    children,
    ...props
}) {
    return (
        <Select
            name={name}
            value={value}
            onChange={onChange}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-xs ${className}`}
        >
            {children}
        </Select>
    );
}
