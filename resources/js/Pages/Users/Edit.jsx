import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm, usePage } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Swal from "sweetalert2";
import Select2 from "@/Components/Select2";

export default function Edit({ auth }) {
    const { user, roles } = usePage().props;

    const { data, setData, post, errors } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        selectedRoles: user.roles.map((role) => role.name),
        _method: "put",
    });

    const formattedRoles = roles.map((role) => ({
        value: role.name,
        label: role.name,
    }));

    const defaultRoles = user.roles.map((role) => ({
        value: role.name,
        label: role.name,
    }));

    const handleSelectedRoles = (selected) => {
        const selectedValues = selected.map((option) => option.value);
        setData("selectedRoles", selectedValues);
    };

    const handleUpdateData = (e) => {
        e.preventDefault();
        post(route("users.update", user.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "User updated successfully!",
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
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />

            <Container>
                <Card title="Edit user">
                    <form onSubmit={handleUpdateData}>
                        <div className="mb-4">
                            <Input
                                label="Name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                errors={errors.name}
                                placeholder="Input user name..."
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                errors={errors.email}
                                placeholder="Input email..."
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Phone"
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                errors={errors.phone}
                                placeholder="Input phone..."
                            />
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                Roles
                            </div>
                            <Select2
                                onChange={handleSelectedRoles}
                                options={formattedRoles}
                                defaultValue={defaultRoles}
                                placeholder="Choose role..."
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Password"
                                type="password"
                                value={data.password || ""}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                errors={errors.password}
                                placeholder="Input password (leave blank if unchanged)"
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Password Confirmation"
                                type="password"
                                value={data.password_confirmation || ""}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                errors={errors.password_confirmation}
                                placeholder="Confirm password..."
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button type="submit">Update</Button>
                            <Button type="cancel" url={route("users.index")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
