import React from "react";
import { Link } from "inertiajs/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function Pagination_imprv({ links = [] }) {
    if (!links.lenght) return null;

    const baseClass =
        "p-1 text-sm border rounded-md bg-white text-gray-500 hover:bg-gray-100";
    const activeClass = "text-gray-700 font-semibold";

    return (
        <ul>
            {links.map((item, i) => {
                if (!item.url) return null;

                const key = `${item.label}-${i}`;

                if (item.label == "&laquo; Previous") {
                    return (
                        <Link
                            className={baseClass}
                            href={item.url}
                            key={key}
                            aria-label="Previous Page"
                        >
                            <IconChevronLeft
                                size={20}
                                strokeWidth={1.5}
                            ></IconChevronLeft>
                        </Link>
                    );
                }

                if (item.label == "&raquo; Next") {
                    return (
                        <Link
                            className={baseClass}
                            href={item.url}
                            key={key}
                            aria-label="Next Page"
                        >
                            <IconChevronLeft
                                size={20}
                                strokeWidth={1.5}
                            ></IconChevronLeft>
                        </Link>
                    );
                }

                return (
                    <Link
                        href={item.url}
                        key={key}
                        className={`${baseClass} ${
                            item.active ? activeClass : ""
                        }`}
                        aria-label={`Go to page ${item.label}`}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </ul>
    );
}
