import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

export default function Create({ auth }) {
    // State untuk form dengan Inertia.js
    const { data, setData, post, errors } = useForm({
        name: "",
    });

    // Handle submit form
    const handleCreateData = async (e) => {
        e.preventDefault();

        post(route("regions.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Region created successfully!",
                    icon: "success",
                    showConfirmButton: false,
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
                    Create Region
                </h2>
            }
        >
            <Head title="Create Region" />
            <Container>
                <Card title="Create Region">
                    <form
                        onSubmit={handleCreateData}
                        encType="multipart/form-data"
                    >
                        {/* Input Nama Kategori */}
                        <div className="mb-4">
                            <Input
                                label="Region Name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                errors={errors.name}
                                placeholder="Input region name..."
                            />
                        </div>

                        {/* Tombol Simpan dan Batal */}
                        <div className="flex items-center gap-2">
                            <Button type="submit" />
                            <Button
                                type="cancel"
                                url={route("regions.index")}
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
