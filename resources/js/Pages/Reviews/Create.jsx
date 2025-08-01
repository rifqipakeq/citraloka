import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { usePage, Head, useForm } from "@inertiajs/react";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

export default function Create({ auth }) {
    const { transactions } = usePage().props;

    const { data, setData, post, errors } = useForm({
        transaction_id: "",
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

    const selectedTransaction = transactions.find(
        (transaction) => transaction.id == data.transaction_id
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
                                Transaction
                            </label>
                            <select
                                className="w-full border-gray-300 rounded-md shadow-xs"
                                value={data.transaction_id}
                                onChange={(e) =>
                                    setData("transaction_id", e.target.value)
                                }
                            >
                                <option value="">Select Location</option>
                                {transactions.map((transaction) => (
                                    <option
                                        key={transaction.id}
                                        value={transaction.id}
                                    >
                                        {transaction.code}
                                    </option>
                                ))}
                            </select>
                            {errors.transaction_id && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.transaction_id}
                                </div>
                            )}
                        </div>

                        {selectedTransaction && selectedTransaction.image && (
                            <div className="mb-4">
                                <label className="block font-medium text-sm text-gray-700">
                                    Preview Image
                                </label>
                                <img
                                    src={selectedTransaction.image}
                                    alt={selectedTransaction.title}
                                    className="w-full h-48 object-cover rounded-md shadow-sm"
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
