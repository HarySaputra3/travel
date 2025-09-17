import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";
import { Head, usePage } from "@inertiajs/react";
import Search from "@/Components/Search";

// Fungsi untuk memformat angka menjadi format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
};

// Komponen untuk menampilkan status pembayaran dengan warna
const PaymentStatusBadge = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    let statusClasses = "";

    switch (status.toUpperCase()) {
        case "PAID":
        case "SETTLED":
            statusClasses = "bg-green-100 text-green-800";
            break;
        case "PENDING":
            statusClasses = "bg-yellow-100 text-yellow-800";
            break;
        case "EXPIRED":
        case "FAILED":
            statusClasses = "bg-red-100 text-red-800";
            break;
        default:
            statusClasses = "bg-gray-100 text-gray-800";
    }

    return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
};

export default function Index({ auth }) {
    // REVISI: Nama variabel diubah menjadi `transactions` (plural) agar konsisten
    const { transactions, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Transactions
                </h2>
            }
        >
            <Head title="Transactions" />
            <Container>
                <div className="mb-4">
                    <Search
                        url={route("transactions.index")}
                        placeholder="Search by transaction code..."
                        filters={filters}
                    />
                </div>
                <Table.Card title={"Transactions"}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Code</Table.Th>
                                <Table.Th>User</Table.Th>
                                <Table.Th>Ticket</Table.Th>
                                <Table.Th>Total</Table.Th>
                                <Table.Th>Payment Method</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Checkout Link</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {transactions.data.map((transaction, i) => (
                                <tr key={transaction.id}>
                                    <Table.Td>
                                        {/* REVISI: Rumus penomoran yang lebih aman */}
                                        {i +
                                            1 +
                                            (transactions.current_page - 1) *
                                                transactions.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="font-mono text-sm">
                                            {transaction.code}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {transaction.external_id}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        {transaction.user.name}
                                        <div className="text-sm text-gray-400">
                                            {transaction.user.email}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        {transaction.ticket.ticket_code}
                                        <div className="text-sm text-gray-400">
                                            {transaction.qty} x{" "}
                                            {formatRupiah(
                                                transaction.price_per_pack
                                            )}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        {formatRupiah(transaction.total)}
                                    </Table.Td>
                                    <Table.Td>
                                        {transaction.payment_method}
                                    </Table.Td>
                                    <Table.Td>
                                        <PaymentStatusBadge
                                            status={transaction.payment_status}
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        <a
                                            href={transaction.checkout_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            Pay Now
                                        </a>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className="flex items-center justify-center mt-4">
                    {/* REVISI: Pagination harus menggunakan links dari `transactions` */}
                    {transactions.last_page !== 1 && (
                        <Pagination links={transactions.links} />
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
