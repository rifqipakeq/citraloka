import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import { Head, usePage } from "@inertiajs/react";
import Search from "@/Components/Search";
import hasAnyPermission from "@/Utils/Permissions";

export default function Index({ auth }) {
    const { regions, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Regions
                </h2>
            }
        >
            <Head title="Regions" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(["regions create"]) && (
                        <Button type={"add"} url={route("regions.create")} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route("regions.index")}
                            placeholder="Search Regions By Name.."
                            filter={filters}
                        />
                    </div>
                </div>
                <Table.Card title="Regions">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Region Name</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {regions.data.map((region, i) => (
                                <tr key={i}>
                                    <Table.Td>
                                        
                                        {++i +
                                            (regions.current_page - 1) *
                                                regions.per_page}
                                    </Table.Td>
                                    <Table.Td>{region.name}</Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermission([
                                                "regions edit",
                                            ]) && (
                                                <Button
                                                    type={"edit"}
                                                    url={route(
                                                        "regions.edit",
                                                        region.id
                                                    )}
                                                />
                                            )}
                                            {hasAnyPermission([
                                                "regions delete",
                                            ]) && (
                                                <Button
                                                    type={"delete"}
                                                    url={route(
                                                        "regions.destroy",
                                                        region.id
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className="flex items-center justify-center">
                    {regions.last_page !== 1 && (
                        <Pagination links={regions.links} />
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
