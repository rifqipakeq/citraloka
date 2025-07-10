import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { Head, useForm } from "@inertiajs/react";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

export default function Create({ auth }) {
    const { data, setData, post, errors, progress } = useForm({
        name: "",
        image: null,
    });

    const handleStoreData = async () => {
        e.preventDefault;

        post(route("categories.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Data created successfully",
                    icon: "Success",
                    showConfrimButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Categories
                </h2>
            }
        >
            <Head title={"Create Category"} />
            <Container>
                <Card title={"Create New Category"}>
                    <form onSubmit={handleStoreData}>
                        <div className="mb-4">
                            <Input
                                label={"Category Name"}
                                type={"text"}
                                value={data.name}
                                onChange={(e) => setData("name", e.targetValue)}
                                errors={errors.name}
                                placeholder="Input Category Name.."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium text-sm text-gray-700"></label>
                            <input
                                type="file"
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                            />
                            {errors.image && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.image}
                                </div>
                            )}
                        </div>

                        {progress && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <Button type={"submit"} />
                            <Button
                                type={"cancel"}
                                url={route("categories.index")}
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
