import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { useForm, Head, usePage } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Select2 from "@/Components/Select2";
import Swal from "sweetalert2";

export default function Create({ auth }) {
    const { roles } = usePage().props;

    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        selectedRoles: [],
        password: "",
        password_confirmation: "",
    });

    const formattedRoles = roles.map((role) => ({
        value: role.name,
        label: role.name,
    }));

    const handleSelectedRoles = (selected) => {
        const selectedValues = selected.map((option) => option.value);
        setData("selectedRoles", selectedValues);
    };

    const handleStoreData = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "User created successfully!",
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
                    Create User
                </h2>
            }
        >
            <Head title="Create Users" />
            <Container>
                <Card title="Create new user">
                    <form onSubmit={handleStoreData}>
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
                                placeholder="Choose role..."
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                errors={errors.password}
                                placeholder="Input password..."
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Password Confirmation"
                                type="password"
                                value={data.password_confirmation}
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
                            <Button type="submit">Save</Button>
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
