import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-PUzc7cpw.js";
import { C as Container } from "./Container-D-XqGt6e.js";
import { C as Card } from "./Card-BNOqaah3.js";
import { I as Input } from "./Input-DiNJxjYD.js";
import { B as Button } from "./Button-DC7PgICx.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";
import { M as Map } from "./Map-96WLGMuI.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "@tabler/icons-react";
import "sweetalert2";
import "react-leaflet";
import "./constants-BHE6LNk3.js";
import "./helper-DadYwhGw.js";
import "leaflet";
function Edit({ auth }) {
  const { location, categories, tickets, regions, progress } = usePage().props;
  const { data, setData, post, errors } = useForm({
    title: location.title,
    description: location.description,
    officehours: location.officehours,
    category_id: location.category_id,
    ticket_ids: location.ticket_ids || {},
    region_id: location.region_id,
    phone: location.phone,
    address: location.address,
    latitude: location.latitude,
    longitude: location.longitude,
    image: null,
    // Wajib upload ulang
    _method: "put"
  });
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState([data.latitude, data.longitude]);
  const [markerText, setMarkerText] = useState("Default Location");
  const inputRef = useRef();
  useEffect(() => {
    const lat = parseFloat(data.latitude);
    const lng = parseFloat(data.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      setPosition([lat, lng]);
    }
  }, [data.latitude, data.longitude]);
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("locations.update", location.id));
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    const query = encodeURIComponent(search);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
    try {
      const res = await fetch(url);
      const data2 = await res.json();
      if (data2.length > 0) {
        const lat = parseFloat(data2[0].lat);
        const lon = parseFloat(data2[0].lon);
        setPosition([lat, lon]);
        setData("latitude", lat);
        setData("longitude", lon);
        setData("address", data2[0].display_name);
        setMarkerText(data2[0].display_name);
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Location not found!",
          icon: "error",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text: "Failed to search location!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch(e);
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Edit Location" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Edit Location" }),
        /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Card, { title: "Edit Location", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx(Input, { label: "Title", value: data.title, onChange: (e) => setData("title", e.target.value), errors: errors.title }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block mb-2", children: "Description" }),
            /* @__PURE__ */ jsx(
              Editor,
              {
                apiKey: "zht8uetqj2ra0t0q9nf5ueeiz4pjutf881gfnps3iq6kjhu5",
                value: data.description,
                init: {
                  height: 300,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount"
                  ],
                  toolbar: "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
                },
                onEditorChange: (content) => setData("description", content)
              }
            ),
            errors.description && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.description }),
            /* @__PURE__ */ jsx(Input, { label: "Office Hours", value: data.officehours, onChange: (e) => setData("officehours", e.target.value), errors: errors.officehours }),
            /* @__PURE__ */ jsx(Input, { label: "Phone", value: data.phone, onChange: (e) => setData("phone", e.target.value), errors: errors.phone }),
            /* @__PURE__ */ jsx(Input, { label: "Address", value: data.address, onChange: (e) => setData("address", e.target.value), errors: errors.address }),
            /* @__PURE__ */ jsx(Input, { label: "Latitude", value: data.latitude, onChange: (e) => setData("latitude", e.target.value), errors: errors.latitude }),
            /* @__PURE__ */ jsx(Input, { label: "Longitude", value: data.longitude, onChange: (e) => setData("longitude", e.target.value), errors: errors.longitude }),
            /* @__PURE__ */ jsxs("div", { className: "my-4", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Search Location",
                  type: "text",
                  ref: inputRef,
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  onKeyDown: handleKeyDown,
                  placeholder: "Search for a place..."
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "w-full mt-5", children: /* @__PURE__ */ jsx(
                "div",
                {
                  id: "maps",
                  className: "h-[600px] w-full sticky top-36 rounded-3xl overflow-hidden",
                  children: /* @__PURE__ */ jsx(
                    Map,
                    {
                      lat: position[0],
                      long: position[1],
                      onMarkerDragEnd: ({ lat, lng }) => {
                        setData("latitude", lat);
                        setData("longitude", lng);
                        setPosition([lat, lng]);
                      },
                      customMarker: markerText
                    }
                  )
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("label", { className: "block mb-2", children: "Category" }),
            /* @__PURE__ */ jsxs("select", { value: data.category_id, onChange: (e) => setData("category_id", e.target.value), className: "w-full p-2 border rounded-sm", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Category" }),
              categories.map((category) => /* @__PURE__ */ jsx("option", { value: category.id, children: category.name }, category.id))
            ] }),
            errors.category_id && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.category_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block", children: "Region" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.region_id,
                onChange: (e) => setData("region_id", e.target.value),
                className: "w-full p-2 border rounded-sm mb-4",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Region" }),
                  regions.map((region) => /* @__PURE__ */ jsx("option", { value: region.id, children: region.name }, region.id))
                ]
              }
            ),
            errors.region_id && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.region_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block", children: "Ticket" }),
            Object.entries(tickets).map(
              ([category, ticketList]) => /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-sm font-semibold text-gray-600 mb-1 block", children: [
                  category,
                  " Tickets"
                ] }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: data.ticket_ids[category] || "",
                    onChange: (e) => setData("ticket_ids", {
                      ...data.ticket_ids,
                      [category]: e.target.value
                    }),
                    className: "w-full p-2 border rounded-sm",
                    children: [
                      /* @__PURE__ */ jsxs("option", { value: "", children: [
                        "Select ",
                        category,
                        " Ticket"
                      ] }),
                      ticketList.map((ticket) => /* @__PURE__ */ jsx(
                        "option",
                        {
                          value: ticket.id,
                          children: ticket.ticket_code
                        },
                        ticket.id
                      ))
                    ]
                  }
                )
              ] }, category)
            ),
            errors.ticket_ids && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.ticket_ids })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block mb-1 font-semibold", children: [
            "Upload New Images",
            " "
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              multiple: true,
              onChange: (e) => setData("image", e.target.files),
              className: "mt-2"
            }
          ),
          errors.image && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.image }),
          progress && /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5 mt-4", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-600 h-2.5 rounded-full", style: { width: `${progress.percentage}%` } }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-6", children: [
            /* @__PURE__ */ jsx(Button, { type: "submit", label: "Save Changes" }),
            /* @__PURE__ */ jsx(Button, { type: "cancel", url: route("locations.index"), label: "cancel" })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  Edit as default
};
