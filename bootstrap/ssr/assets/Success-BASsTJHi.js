import { jsxs, jsx } from "react/jsx-runtime";
function Success() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-screen font-poppins", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "Payment Successful!" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Thank you for your purchase." }),
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
  Success as default
};
