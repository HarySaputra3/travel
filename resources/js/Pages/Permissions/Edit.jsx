import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm, usePage } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

export default function Edit({ auth }) {
    // ambil permission dari inertia
    const { permission } = usePage().props;

    // form state
    const { data, setData, post, processing, errors } = useForm({
        name: permission.name || "",
        _method: "put",
    });

    // handle update data
    const handleUpdateData = (e) => {
        e.preventDefault();

        post(route("permissions.update", permission.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Data updated successfully!",
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
                    Edit Permission
                </h2>
            }
        >
            <Head title="Edit Permissions" />

            <Container>
                <Card title="Edit permission">
                    <form onSubmit={handleUpdateData}>
                        <div className="mb-4">
                            <Input
                                label="Permission Name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                errors={errors.name}
                                placeholder="Input permission name..."
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="submit" disabled={processing} />
                            <Button
                                type="cancel"
                                url={route("permissions.index")}
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
