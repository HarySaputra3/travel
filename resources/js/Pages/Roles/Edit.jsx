import React from "react";
import { useForm, usePage, Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";

export default function Edit({ auth }) {
    // ambil role dan permissions dari props
    const { role, permissions } = usePage().props;

    // state form inertia
    const { data, setData, post, errors } = useForm({
        name: role.name,
        selectedPermissions: role.permissions.map((p) => p.name),
        _method: "put",
    });

    // handle checkbox permission
    const handleSelectedPermissions = (e) => {
        const value = e.target.value;
        let updated = [...data.selectedPermissions];

        if (updated.includes(value)) {
            updated = updated.filter((item) => item !== value);
        } else {
            updated.push(value);
        }

        setData("selectedPermissions", updated);
    };

    // update role
    const handleUpdateData = (e) => {
        e.preventDefault();

        post(route("roles.update", role.id), {
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
                    Edit Role
                </h2>
            }
        >
            <Head title="Edit Role" />

            <Container>
                <Card title="Edit role">
                    <form onSubmit={handleUpdateData}>
                        <div className="mb-4">
                            <Input
                                label="Role Name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                errors={errors.name}
                                placeholder="Input role name..."
                            />
                        </div>

                        <div className="mb-4">
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(permissions).map(
                                    ([group, permissionItems], i) => (
                                        <div
                                            key={i}
                                            className="p-4 bg-white rounded-lg shadow-md"
                                        >
                                            <h3 className="font-bold text-lg mb-2">
                                                {group}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {permissionItems.map(
                                                    (permission) => (
                                                        <Checkbox
                                                            key={permission}
                                                            label={permission}
                                                            value={permission}
                                                            onChange={
                                                                handleSelectedPermissions
                                                            }
                                                            defaultChecked={data.selectedPermissions.includes(
                                                                permission
                                                            )}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            {errors?.selectedPermissions && (
                                <div className="text-xs text-red-500 mt-2">
                                    {errors.selectedPermissions}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button type="submit">Update</Button>
                            <Button type="cancel" url={route("roles.index")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
