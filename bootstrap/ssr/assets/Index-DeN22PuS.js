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
  const { users, filters } = usePage().props;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Users" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Users" }),
        /* @__PURE__ */ jsxs(Container, { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [
            hasAnyPermission(["users create"]) && /* @__PURE__ */ jsx(Button, { type: "add", url: route("users.create") }),
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-4.6", children: /* @__PURE__ */ jsx(Search, { url: route("users.index"), placeholder: "Search users data by name...", filter: filters }) })
          ] }),
          /* @__PURE__ */ jsx(Table.Card, { title: "users", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Th, { children: "#" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "User" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Phone" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Roles" }),
              /* @__PURE__ */ jsx(Table.Th, { children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx(Table.Tbody, { children: users.data.map((user, i) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(Table.Td, { children: ++i + (users.current_page - 1) * users.per_page }),
              /* @__PURE__ */ jsxs(Table.Td, { children: [
                user.name,
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400", children: user.email })
              ] }),
              /* @__PURE__ */ jsx(Table.Td, { children: user.phone }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 flex-wrap", children: user.roles.map((role, i2) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-flex items-center px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-700",
                  children: role.name
                },
                i2
              )) }) }),
              /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsxs("div", { className: "flex item-center gap-2", children: [
                hasAnyPermission([
                  "users edit"
                ]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "edit",
                    url: route("users.edit", user.id)
                  }
                ),
                hasAnyPermission([
                  "users delete"
                ]) && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "delete",
                    url: route("users.destroy", user.id)
                  }
                )
              ] }) })
            ] }, { i })) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "fle item-center justity-center", children: users.last_page !== 1 && /* @__PURE__ */ jsx(Pagination, { links: users.links }) })
        ] })
      ]
    }
  );
}
export {
  Index as default
};
