import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import { Head, usePage } from "@inertiajs/react";
import Search from "@/Components/Search";
import hasAnyPermission from "@/Utils/Permission";

export default function Create(auth) {
    const { data, setData, post, errors } = useForm({
        name: "",
    });

    const handleStoreData = async () => {
        e.preventDefault;

        post(route("permissions.store"), {
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
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Permission
                    </h2>
                }
            >
                <Head title={"Create Permission"} />
                <Container>
                    <Card title={"Create New Permission"}>
                        <form onSubmit={handleStoreData}>
                            <div className="mb-4">
                                <input
                                    label={"Permission Name"}
                                    type={"text"}
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.targetValue)
                                    }
                                    errors={errors.name}
                                    placeholder="Input Permission Name.."
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button type={'submit'} />
                                <Button
                                    type={'cancel'}
                                    url={route("permissions.index")}
                                />
                            </div>
                        </form>
                    </Card>
                </Container>
            </AuthenticatedLayout>
        </div>
    );
}
