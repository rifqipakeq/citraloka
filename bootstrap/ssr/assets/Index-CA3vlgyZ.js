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
function Index({ auth }) {
  const { permissions, filters } = usePage().props;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Permissions" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Permissions" }),
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [
            hasAnyPermission(["permissions create"]) && /* @__PURE__ */ jsx(Button, { type: "add", url: route("permissions.create") }),
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-4.6", children: /* @__PURE__ */ jsx(Search, { url: route("permissions.index"), placeholder: "Search permissions data by name...", filter: filters }) })
          ] }),
          /* @__PURE__ */ jsx(Table.Card, { title: "Permissions", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Th, { children: "#" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Permissions Name" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: permissions.data.map((permission, i) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Td, { children: ++i + (permissions.current_page - 1) * permissions.per_page }),
              /* @__PURE__ */ jsx(Table.Td, { children: permission.name }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs("div", { className: "flex item-center gap-2", children: [
                hasAnyPermission(["permissions edit"]) && /* @__PURE__ */ jsx(Button, { type: "edit", url: route("permissions.edit", permission.id) }),
                hasAnyPermission(["permissions delete"]) && /* @__PURE__ */ jsx(Button, { type: "delete", url: route("permissions.destroy", permission.id) })
              ] }) })
            ] }, { i })) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "fle item-center justity-center", children: permissions.last_page !== 1 && /* @__PURE__ */ jsx(Pagination, { links: permissions.links }) })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
