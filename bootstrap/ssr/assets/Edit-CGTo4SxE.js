import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-PUzc7cpw.js";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./DeleteUserForm-DpM-9I6v.js";
import UpdatePasswordForm from "./UpdatePasswordForm-D4KlLZjf.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-gW9W2X5J.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "react";
import "./TextInput-CmFuSx21.js";
import "./InputLabel-CE_n4Upz.js";
import "./PrimaryButton-DR_oO6M-.js";
function Edit({ mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow-sm sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow-sm sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow-sm sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
