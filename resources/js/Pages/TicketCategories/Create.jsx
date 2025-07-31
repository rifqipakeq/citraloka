import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { Head, useForm } from "@inertiajs/react";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

export default function Create({auth}) {
    const { data, setData, post, errors } = useForm({
        name: "",
    });

    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route("ticket-categories.store"), {
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ticket Category
                </h2>
            }
        >
            <Head title={"Create Ticket Category"} />
            <Container>
                <Card title={"Create New Ticket Category"}>
                    <form onSubmit={handleStoreData}>
                        <div className="mb-4">
                            <Input
                                label={"Ticket Category Name"}
                                type={"text"}
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                errors={errors.name}
                                placeholder="Input Ticket Category Name.."
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type={"submit"} />
                            <Button
                                type={"cancel"}
                                url={route("ticket-categories.index")}
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
