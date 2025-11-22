import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout, h as hasAnyPermission } from "./AuthenticatedLayout-PUzc7cpw.js";
import { C as Container } from "./Container-D-XqGt6e.js";
import { T as Table, P as Pagination } from "./Pagination-dEpSWpR2.js";
import { B as Button } from "./Button-DC7PgICx.js";
import { usePage, Head } from "@inertiajs/react";
import { S as Search } from "./Search-DXt0dztT.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "@tabler/icons-react";
import "sweetalert2";
function Index(auth) {
  const { roles, filters } = usePage().props;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font semibold text-xl text-gray-800 leading-tight", children: "Roles" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Roles" }),
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [
            hasAnyPermission(["roles create"]) && /* @__PURE__ */ jsx(Button, { type: "add", url: route("roles.create") }),
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-4/6", children: /* @__PURE__ */ jsx(
              Search,
              {
                url: route("roles.index"),
                placeholder: "Search roles data by name...",
                filters
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Table.Card, { title: "Roles", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Th, { children: "#" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Role Name" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Permissions" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: roles.data.map((role, i) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Td, { children: ++i + (roles.current_page - 1) * roles.per_page }),
              /* @__PURE__ */ jsx(Table.Td, { children: role.name }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 flex-wrap", children: role.name == "admin" ? /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-700", children: "all-permissions" }) : role.permissions.map((permission, i2) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-flex items-center px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-700",
                  children: role.name == "admin" ? "all-permissions" : permission.name
                },
                i2
              )) }) }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                hasAnyPermission(["roles edit"]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "edit",
                    url: route("roles.edit", role.id)
                  }
                ),
                hasAnyPermission(["roles delete"]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "delete",
                    url: route("roles.destroy", role.id)
                  }
                )
              ] }) })
            ] }, i)) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: roles.last_page !== 1 && /* @__PURE__ */ jsx(Pagination, { links: roles.links }) })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
