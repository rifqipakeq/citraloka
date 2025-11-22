import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';
import Badge from "@/Components/Badge";

export default function Index({auth}) {

    // Destructure transactions dan filters dari props
    const { transactions, filters } = usePage().props;
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Transactions</h2>}
        >
            <Head title="Transactions" />
            <Container>
                <Table.Card title="Transactions">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Code</Table.Th>
                                <Table.Th>External ID</Table.Th>
                                <Table.Th>Checkout Link</Table.Th>
                                <Table.Th>Payment Method</Table.Th>
                                <Table.Th>Payment Status</Table.Th>
                                <Table.Th>User</Table.Th>
                                <Table.Th>Ticket Code</Table.Th>
                                <Table.Th>Price</Table.Th>
                                <Table.Th>Quantity</Table.Th>
                                <Table.Th>PPN</Table.Th>
                                <Table.Th>Total</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {transactions.data.map((transaction, i) => (
                                <tr key={i}>
                                    <Table.Td>{++i + (transactions.current_page - 1) * transactions.per_page}</Table.Td>
                                    <Table.Td>{transaction.code}</Table.Td>
                                    <Table.Td>{transaction.external_id}</Table.Td>
                                    <Table.Td>{transaction.checkout_link}</Table.Td>
                                    <Table.Td>{transaction.payment_method}</Table.Td>
                                    <Table.Td>
                                        <Badge
                                            status={transaction.payment_status}
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        {transaction.user.name}
                                        <div className = "text-sm text-gray-400">
                                            {transaction.user.email}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>{transaction.ticket.ticket_code}</Table.Td>
                                    <Table.Td>{transaction.price_per_pack}</Table.Td>
                                    <Table.Td>{transaction.qty}</Table.Td>
                                    <Table.Td>{transaction.ppn}</Table.Td>
                                    <Table.Td>{transaction.total}</Table.Td>                                        
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className="flex items-center justify-center">
                    {transactions.last_page !== 1 && (
                        <Pagination links={transactions.links}/>
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
