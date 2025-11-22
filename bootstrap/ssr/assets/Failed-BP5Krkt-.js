import { jsxs, jsx } from "react/jsx-runtime";
function Failed() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center font-poppins h-screen", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "Payment failed!" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Please try again later." }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/",
        className: "px-4 py-2 rounded-full bg-primary-opaque text-white font-semibold mt-4",
        children: "Back to home"
      }
    )
  ] });
}
export {
  Failed as default
};
