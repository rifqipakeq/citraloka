import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function Navbar({ auth }) {
  return /* @__PURE__ */ jsx("header", { className: "fixed top-0 left-0 w-full z-50 px-4", children: /* @__PURE__ */ jsxs("nav", { className: "container mx-auto flex items-center bg-white justify-between px-8 py-3.5 font-poppins rounded-full mt-8", children: [
    /* @__PURE__ */ jsx(Link, { href: route("home"), children: /* @__PURE__ */ jsx("img", { src: "/assets/logofix.png", alt: "Logo", className: "h-10 w-auto" }) }),
    /* @__PURE__ */ jsxs("ul", { className: "flex gap-12 items-center text-gray-500 text-lg", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          href: route("home"),
          className: route().current("home") ? "text-primary-opaque border-b-3 py-1 border-primary-opaque" : "",
          children: "Home"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          href: route("location.index"),
          className: route().current("location.index") ? "text-primary-opaque border-b-3 py-1 border-primary-opaque" : "",
          children: "Location"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          href: route("location.maps"),
          className: route().current("location.maps") ? "text-primary-opaque border-b-3 py-1 border-primary-opaque" : "",
          children: "Maps"
        }
      ) })
    ] }),
    auth.user ? /* @__PURE__ */ jsx(
      Link,
      {
        href: route("dashboard"),
        className: " bg-primary-opaque rounded-full text-white font-semibold hover:bg-primary-hover transition-all hover:cursor-pointer",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: auth.user.profile_picture || "/assets/profile_placeholder.png",
            alt: "User",
            className: "h-12 w-12 rounded-full overflow-hidden"
          }
        )
      }
    ) : /* @__PURE__ */ jsx(
      Link,
      {
        href: route("login"),
        className: "px-16 py-4 bg-primary-opaque rounded-full text-white font-semibold hover:bg-primary-hover transition-all hover:cursor-pointer",
        children: "Login"
      }
    )
  ] }) });
}
function UserLayout({ children, auth }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Navbar, { auth }),
    children
  ] });
}
export {
  UserLayout as U
};
