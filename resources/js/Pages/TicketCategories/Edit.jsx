import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { Head, useForm, usePage } from "@inertiajs/react";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

export default function Edit({ auth }) {
    const { ticketCategory } = usePage().props;

    const { data, setData, post, errors } = useForm({
        name: ticketCategory.name,
        _method: "put",
    });

    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route("ticket-categories.update", ticketCategory.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Data updated successfully",
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
                    Edit Ticket Category
                </h2>
            }
        >
            <Head title={"Edit Ticket Category"} />
            <Container>
                <Card title={"Edit New Ticket Category"}>
                    <form onSubmit={handleUpdateData}>
                        <div className="mb-4">
                            <Input
                                label={"Ticket Category Name"}
                                type={"text"}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
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
