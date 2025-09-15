import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm, usePage } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

export default function Edit({ auth }) {
    const { ticket } = usePage().props;

    const { data, setData, post, errors, processing } = useForm({
        name: ticket.name,
        qty: ticket.qty,
        price: ticket.price_per_pack,
        __method: "put",
    });

    const handleUpdateData = (e) => {
        e.preventDefault();

        post(
            route("tickets.update", {
                onSuccess: () => {
                    Swal.fire({
                        title: "success!",
                        text: "Tiket berhasil ditambahkan!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            })
        );
    };
    return (
        <AuthenticatedLayout
            user={auth.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Tickets
                </h2>
            }
        >
            <Head title={"Create Tickets"} />

            <Container>
                <Card title="Edit Ticket">
                    <form onSubmit={handleUpdateData}>
                        {/*pilihan jenis tiket*/}
                        <div className="mb-4">
                            <label className="block font-medium text-sm text-gray-700">
                                Ticket Type
                            </label>
                            <select
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            >
                                <option value="Regular">Regular</option>
                                <option value="VIP">VIP</option>
                            </select>
                            {errors.name && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        {/*input harga tiket*/}
                        <div className="mb-4">
                            <Input
                                label="Price (Rp)"
                                type="number"
                                value={data.price_per_pack}
                                onChange={(e) =>
                                    setData(
                                        "price_per_pack",
                                        e.target.value
                                            ? parseFloat(e.target.value)
                                            : 0
                                    )
                                }
                                errors={errors.price_per_pack}
                                placeholder="Enter ticket price..."
                            />
                        </div>

                        {/*input jumlah tiket*/}
                        <div className="mb-4">
                            <Input
                                label="Qty"
                                type="number"
                                value={data.qty}
                                onChange={(e) =>
                                    setData(
                                        "qty",
                                        e.target.value
                                            ? parseInt(e.target.value)
                                            : 0
                                    )
                                }
                                errors={errors.qty}
                                placeholder="Enter ticket quantity..."
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button type={"submit"}>save</Button>
                            <Button
                                type={"button"}
                                url={route("tickets.index")}
                            >
                                cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
