import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { Head, useForm, usePage } from "@inertiajs/react";
import Card from "@/Components/Card";
import { Editor } from "@tinymce/tinymce-react";

export default function Create({ auth }) {
    const { categories, tickets } = usePage().props;

    const { data, setData, post, errors, progress } = useForm({
        title: "",
        description: "",
        officehours: "",
        category_id: "",
        ticket_id: "",
        phone: "",
        address: "",
        latitude: "",
        longitude: "",
        image: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("officehours", data.officehours);
        formData.append("category_id", data.category_id);
        formData.append("ticket_id", data.ticket_id);
        formData.append("phone", data.phone);
        formData.append("address", data.address);
        formData.append("latitude", data.latitude);
        formData.append("longitude", data.longitude);

        for (let i = 0; i < data.image.length; i++) {
            formData.append("image[]", data.image[i]);
        }

        post(route("locations.store"), {
            data: formData,
            forceFormData: true,
        });
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
                        onEditorChange={(content) => setData('description', content)}
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
                            className="w-full p-2 border rounded mb-4"
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

                        <label className="block">Ticket</label>
                        <select
                            value={data.ticket_id}
                            onChange={(e) =>
                                setData("ticket_id", e.target.value)
                            }
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="">Select Ticket</option>
                            {tickets.map((ticket) => (
                                <option value={ticket.id} key={ticket.id}>
                                    {ticket.ticket_code}
                                </option>
                            ))}
                        </select>
                        {errors.ticket_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.ticket_id}
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
