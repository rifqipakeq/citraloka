import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { Head, useForm, usePage } from "@inertiajs/react";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

export default function Edit(auth) {
    const { permission } = usePage().props;

    const { data, setData, post, errors } = useForm({
        name: Permissions.name,
        _method: "put",
    });

    const handleUpdateData = async () => {
        e.preventDefault;

        post(route("permissions.update", permission.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Data updated successfully",
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
                    Edit Permission
            </h2>
            }
        >
            <Head title={"Edit Permission"} />
            <Container>
                <Card title={"Edit New Permission"}>
                    <form onSubmit={handleUpdateData}>
                        <div className="mb-4">
                            <Input
                                label={"Permission Name"}
                                type={"text"}
                                value={data.name}
                                onChange={(e) => setData("name", e.targetValue)}
                                errors={errors.name}
                                placeholder="Input Permission Name.."
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type={"submit"} />
                            <Button
                                type={"cancel"}
                                url={route("permissions.index")}
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
