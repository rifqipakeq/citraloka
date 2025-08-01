import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { Head, useForm, usePage } from "@inertiajs/react";
import Card from "@/Components/Card";
import { Editor } from "@tinymce/tinymce-react";

export default function Edit({ auth }) {
    const { regions, categories, tickets, location } = usePage().props;

    const { data, setData, post, errors, progress } = useForm({
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
        _method: "put",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("locations.update", location.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Location
                </h2>
            }
        >
            <Head title={"Edit Location"} />
            <Container>
                <Card title={"Edit Location"}>
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

                        <div>
                            <label className="block">Ticket</label>
                            {Object.entries(tickets).map(
                                ([category, ticketList]) => (
                                    <div key={category} className="mb-4">
                                        <label className="text-sm font-semibold text-gray-600 mb-1 block">
                                            {category} Tickets
                                        </label>
                                        <select
                                            value={
                                                data.ticket_ids[category] || ""
                                            }
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
                        </div>

                        <label className="block mb-1 font-semibold">
                            Upload New Images
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
