import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import { Head, usePage } from "@inertiajs/react";
import Search from "@/Components/Search";
import hasAnyPermission from "@/Utils/Permissions";

export default function Index({ auth }) {
    const { locations, filters } = usePage().props;
    const [selectedImage, setSelectedImage] = useState(null);

    // Komponen kecil untuk menampilkan gambar yang tumpang tindih
    const ImageStack = ({ images }) => {
        if (!images) {
            return <span className="text-gray-500">No Image</span>;
        }

        const imageArray = images.split("|");
        const maxVisible = 3; // Tampilkan maksimal 3 gambar
        const visibleImages = imageArray.slice(0, maxVisible);
        const remainingCount = imageArray.length - maxVisible;

        return (
            <div className="flex items-center">
                {visibleImages.map((img, idx) => (
                    <img
                        key={idx}
                        onClick={() => setSelectedImage(`/storage/${img}`)}
                        className={`h-10 w-10 rounded-full border-2 border-white object-cover dark:border-gray-800 ${
                            idx > 0 ? "-ml-3" : "" // Terapkan margin negatif untuk tumpang tindih
                        } cursor-pointer hover:z-10 transition-transform hover:scale-110`}
                        src={`/storage/${img}`}
                        alt={`Location Image ${idx + 1}`}
                    />
                ))}
                {remainingCount > 0 && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-semibold text-gray-600 dark:border-gray-800 -ml-3">
                        +{remainingCount}
                    </div>
                )}
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Locations
                </h2>
            }
        >
            <Head title="Locations" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(["locations create"]) && (
                        <Button type="add" url={route("locations.create")} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route("locations.index")}
                            placeholder="Search locations data by name..."
                            filters={filters}
                        />
                    </div>
                </div>

                <Table.Card title={"Locations"}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Title</Table.Th>
                                <Table.Th>Image</Table.Th>
                                <Table.Th>Description</Table.Th>
                                <Table.Th>Office Hours</Table.Th>
                                <Table.Th>Phone</Table.Th>
                                <Table.Th>Address</Table.Th>
                                <Table.Th>Category</Table.Th>
                                <Table.Th>Ticket Code</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {locations.data.map((location, i) => (
                                <tr key={location.id}>
                                    <Table.Td>
                                        {i +
                                            1 +
                                            (locations.current_page - 1) *
                                                locations.per_page}
                                    </Table.Td>
                                    <Table.Td>{location.title}</Table.Td>

                                    {/* REVISI: Tampilan Gambar Diubah di Sini */}
                                    <Table.Td>
                                        <ImageStack images={location.image} />
                                    </Table.Td>

                                    <Table.Td>
                                        <div
                                            className="prose max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: location.description,
                                            }}
                                        />
                                    </Table.Td>
                                    <Table.Td>{location.officehours}</Table.Td>
                                    <Table.Td>{location.phone}</Table.Td>
                                    <Table.Td>{location.address}</Table.Td>
                                    <Table.Td>
                                        {location.category
                                            ? location.category.name
                                            : "N/A"}
                                    </Table.Td>
                                    <Table.Td>
                                        {location.ticket
                                            ? location.ticket.ticket_code
                                            : "N/A"}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermission([
                                                "locations edit",
                                            ]) && (
                                                <Button
                                                    type={"edit"}
                                                    url={route(
                                                        "locations.edit",
                                                        location.id
                                                    )}
                                                />
                                            )}
                                            {hasAnyPermission([
                                                "locations delete",
                                            ]) && (
                                                <Button
                                                    type={"delete"}
                                                    url={route(
                                                        "locations.destroy",
                                                        location.id
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
                <div className="flex items-center justify-center mt-4">
                    {locations.last_page !== 1 && (
                        <Pagination links={locations.links} />
                    )}
                </div>
            </Container>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-4xl mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
