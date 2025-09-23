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

    // FIX: Gunakan `put` untuk update, dan sesuaikan nama state `price_per_pack`
    const { data, setData, put, errors, processing } = useForm({
        name: ticket.name,
        qty: ticket.qty,
        price_per_pack: ticket.price_per_pack, // FIX: Nama state disesuaikan
    });

    const handleUpdateData = (e) => {
        e.preventDefault();
        // FIX: Panggil route update dengan ID tiket dan gunakan method `put`
        put(route("tickets.update", ticket.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Ticket updated successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // FIX: Seharusnya auth.user, bukan auth.auth.user
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Ticket
                </h2>
            }
        >
            <Head title={"Edit Ticket"} /> {/* FIX: Judul disesuaikan */}
            <Container>
                <Card title="Edit Ticket">
                    <form onSubmit={handleUpdateData}>
                        {/* Pilihan jenis tiket */}
                        <div className="mb-4">
                            <label className="block font-medium text-sm text-gray-700">
                                Ticket Type
                            </label>
                            <select
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-xs focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50"
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

                        {/* Input harga tiket */}
                        <div className="mb-4">
                            <Input
                                label="Price (Rp)"
                                type="number"
                                value={data.price_per_pack} // FIX: Disesuaikan dengan state
                                onChange={
                                    (e) =>
                                        setData(
                                            "price_per_pack",
                                            e.target.value
                                        ) // FIX: Disesuaikan dengan state
                                }
                                errors={errors.price_per_pack} // FIX: Disesuaikan dengan state
                                placeholder="Enter ticket price..."
                            />
                        </div>

                        {/* Input jumlah tiket */}
                        <div className="mb-4">
                            <Input
                                label="Quantity"
                                type="number"
                                value={data.qty}
                                onChange={(e) => setData("qty", e.target.value)}
                                errors={errors.qty}
                                placeholder="Enter ticket quantity..."
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button type={"submit"} disabled={processing}>
                                Save
                            </Button>
                            <Button
                                type={"cancel"}
                                url={route("tickets.index")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
