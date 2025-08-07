import { useState, useRef, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { Head, useForm, usePage } from "@inertiajs/react";
import Card from "@/Components/Card";
import { Editor } from "@tinymce/tinymce-react";
import Map from "@/Components/frontend/Map";
import Swal from "sweetalert2";

export default function Create({ auth }) {
    const { categories, tickets, regions } = usePage().props;
    console.log(tickets);

    const { data, setData, post, errors, progress } = useForm({
        title: "",
        description: "",
        officehours: "",
        category_id: "",
        region_id: "",
        ticket_ids: {},
        phone: "",
        address: "",
        latitude: "",
        longitude: "",
        image: [],
    });

    const [search, setSearch] = useState("");
    const [position, setPosition] = useState([51.505, -0.09]);
    const [markerText, setMarkerText] = useState("Default Location");
    const inputRef = useRef();

    useEffect(() => {
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        if (!isNan(lat) && !isNan(lng)) {
            setPosition([lat, lng]);
        }
    }, [data.latitude, data.longitude]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("officehours", data.officehours);
        formData.append("category_id", data.category_id);
        formData.append("phone", data.phone);
        formData.append("address", data.address);
        formData.append("latitude", data.latitude);
        formData.append("longitude", data.longitude);

        for (let i = 0; i < data.image.length; i++) {
            formData.append("image[]", data.image[i]);
        }

        const selectedTicketIds = Object.values(data.ticket_ids).filter(
            Boolean
        );
        selectedTicketIds.forEach((id, index) => {
            formData.append(`ticket_ids[${index}]`, id);
        });

        post(route("locations.store"), {
            data: formData,
            forceFormData: true,
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        const query = encodeURIComponent(search);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lng = parseFloat(data[0].lng);
                setPosition([lat, lng]);
                setData("latitude: ", lat);
                setData("longitude: ", lng);
                setData("address: ", data[0].display_name);
                setMarkerText(data[0].display_name);
            } else {
                Swal.fire({
                    title: "Failed!",
                    text: "Location Not Found",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (err) {
            Swal.fire({
                title: "Failed!",
                text: "Location Not Found",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch(e);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add New Location
                </h2>
            }
        >
            <Head title={"Add Location"} />
            <Container>
                <Card title={"Add Location"}>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            errors={errors.title}
                        />
                        <label className="block mb-1 font-semibold">
                            Description
                        </label>
                        <Editor
                            apiKey="r0u8dhzg622xhn9z31wbjhn8dqe3mvze5zypqygsuwb4lbe0"
                            value={data.description}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visulablocks code fullscreen",
                                    "insertdatatime media table paste code help wordcount",
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic backcolor | " +
                                    "alignleft aligncenter alignright alignjustify | " +
                                    "bullist numlist outdent indent | removeformat | help",
                            }}
                            onEditorChange={(content) =>
                                setData("description", content)
                            }
                        />
                        {errors.description && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </div>
                        )}

                        <Input
                            label="Office Hours"
                            value={data.officehours}
                            onChange={(e) =>
                                setData("officehours", e.target.value)
                            }
                            errors={errors.officehours}
                        />
                        <Input
                            label="Phone"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            errors={errors.phone}
                        />
                        <Input
                            label="Address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            errors={errors.address}
                        />
                        <Input
                            label="Latitude"
                            value={data.latitude}
                            onChange={(e) =>
                                setData("latitude", e.target.value)
                            }
                            errors={errors.latitude}
                        />
                        <Input
                            label="Longitude"
                            value={data.longitude}
                            onChange={(e) =>
                                setData("longitude", e.target.value)
                            }
                            errors={errors.longitude}
                        />

                        <div className="my-4">
                            <Input
                                label="Search Location"
                                type="text"
                                ref={inputRef}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search for a place.."
                            />
                            <div className="w-full mt-5">
                                <div
                                    id="maps"
                                    className="h-[600px] w-full sticky top-36 rounded-3xl overflow-hidden"
                                >
                                    <Map
                                        lat={position[0]}
                                        long={position[1]}
                                        onMarkerDragEnd={({ lat, lng }) => {
                                            setData("latitude: ", lat);
                                            setData("longitude: ", lng);
                                            setPosition([lat, lng]);
                                        }}
                                        customMarker = {markerText}
                                    />
                                </div>
                            </div>
                        </div>

                        <label className="block">Category</label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="w-full p-2 border rounded-sm mb-4"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option value={category.id} key={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.category_id}
                            </div>
                        )}

                        <label className="block">Region</label>
                        <select
                            value={data.region_id}
                            onChange={(e) =>
                                setData("region_id", e.target.value)
                            }
                            className="w-full p-2 border rounded-sm mb-4"
                        >
                            <option value="">Select Region</option>
                            {regions.map((region) => (
                                <option value={region.id} key={region.id}>
                                    {region.name}
                                </option>
                            ))}
                        </select>
                        {errors.region_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.region_id}
                            </div>
                        )}

                        <label className="block">Ticket</label>
                        {Object.entries(tickets).map(
                            ([category, ticketList]) => (
                                <div key={category} className="mb-4">
                                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                                        {category} Tickets
                                    </label>
                                    <select
                                        value={data.ticket_ids[category] || ""}
                                        onChange={(e) => {
                                            setData("ticket_ids", {
                                                ...data.ticket_ids,
                                                [category]: e.target.value,
                                            });
                                        }}
                                        className="w-full p-2 border rounded-sm"
                                    >
                                        <option value="">
                                            Select {category} Ticket
                                        </option>
                                        {ticketList.map((ticket) => {
                                            <option
                                                value={ticket.id}
                                                key={ticket.id}
                                            >
                                                {ticket.ticket_code}
                                            </option>;
                                        })}
                                    </select>
                                </div>
                            )
                        )}
                        {errors.ticket_ids && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.ticket_ids}
                            </div>
                        )}

                        <label className="block mb-1 font-semibold">
                            Images (mulltiple allowed)
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setData("image", e.target.files)}
                            className="mt-2"
                        />
                        {errors.image && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.image}
                            </div>
                        )}

                        {progress && (
                            <div
                                className="w-full bg-gray-200 rounded-full h-2.5 mt-4"
                                style={{ width: `${progress.percentage}%` }}
                            ></div>
                        )}

                        <div className="flex items-center gap-2">
                            <Button type={"submit"} label="Submit" />
                            <Button
                                type={"cancel"}
                                url={route("locations.index")}
                                label="cancel"
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
