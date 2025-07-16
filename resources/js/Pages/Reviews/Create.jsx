import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { usePage, Head, useForm } from "@inertiajs/react";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

export default function Create({ auth }) {
    const { locations } = usePage().props;

    const { data, setData, post, errors } = useForm({
        location_id: "",
        review: "",
    });

    const handleCreate = (e) => {
        e.preventDefault();

        post(route("reviews.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Data created successfully",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    const selectedLocation = locations.find(
        (location) => location.id == data.location_id
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Review
                </h2>
            }
        >
            <Head title={"Create Review"} />
            <Container>
                <Card title={"Create New Review"}>
                    <form onSubmit={handleCreate}>
                        <div className="mb-4">
                            <label className="block font-medium text-sm text-gray-700">
                                User
                            </label>
                            <Input
                                type="text"
                                className="w-full border-gray-300 rounded-md shadow-md bg-gray-100"
                                value={auth.user.name}
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-sm text-gray-700">
                                Location
                            </label>
                            <select
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                value={data.location_id}
                                onChange={(e) =>
                                    setData("location_id", e.target.value)
                                }
                            >
                                <option value="">Select Location</option>
                                {locations.map((location) => (
                                    <option
                                        key={location.id}
                                        value={location.id}
                                    >
                                        {location.title}
                                    </option>
                                ))}
                            </select>
                            {errors.location_id && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.location_id}
                                </div>
                            )}
                        </div>

                        {selectedLocation && selectedLocation.image && (
                            <div className="mb-4">
                                <label className="block font-medium text-sm text-gray-700">
                                    Preview Image
                                </label>
                                <img
                                    src={selectedLocation.image}
                                    alt={selectedLocation.title}
                                    className="w-full h-48 object-cover rounded-md shadow"
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <Input
                                label="Review"
                                type="textarea"
                                value={data.review}
                                onChange={(e) =>
                                    setData("review", e.target.value)
                                }
                                errors={errors.review}
                                placeholder="Write yout review.."
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button type={"submit"} />
                            <Button
                                type={"cancel"}
                                url={route("reviews.index")}
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
