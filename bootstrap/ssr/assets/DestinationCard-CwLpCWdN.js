import { jsxs, jsx } from "react/jsx-runtime";
import { router } from "@inertiajs/react";
import { c as categoryColors } from "./constants-BHE6LNk3.js";
import { t as toIDR } from "./helper-DadYwhGw.js";
function DestinationCard({ item, action }) {
  const handleClick = () => {
    if (typeof action === "function") {
      action();
    } else {
      router.get(route("detail.index", item.id));
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "p-2.5 rounded-3xl border border-gray-300 bg-white hover:cursor-pointer hover:shadow-lg transition-all",
      onClick: handleClick,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: item.image_urls[0],
              alt: item.title,
              className: "w-full rounded-2xl overflow-hidden aspect-video object-cover"
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: `text-sm text-white font-semibold px-5 py-2.5 rounded-full w-fit absolute bottom-4 left-4 ${categoryColors[item.category.id]}`,
              children: item.category.name
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xyellow w-fit absolute bottom-4 right-4", children: [
            /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
            " ",
            /* @__PURE__ */ jsx("span", { children: item.average_rating || "-" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-2.5 pb-8", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex justify-between items-end mt-5 text-lg font-semibold",
              children: [
                /* @__PURE__ */ jsx("p", { children: item.title }),
                /* @__PURE__ */ jsx("p", { className: "text-primary-opaque text-right", children: toIDR(item.start_from) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "mt-3 text-sm text-gray-400 flex items-center gap-2 font-semibold",
              children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-clock-fill" }),
                /* @__PURE__ */ jsx("p", { children: item.officehours })
              ]
            }
          ),
          /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-300" }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-wrap line-clamp-2 text-sm text-gray-400 font-medium",
              dangerouslySetInnerHTML: { __html: item.description }
            }
          )
        ] })
      ]
    }
  );
}
export {
  DestinationCard as D
};
