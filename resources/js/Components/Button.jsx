import React from "react";
import { Link, useForm } from "@inertiajs/react";
import {
    IconArrowBack,
    IconCheck,
    IconPencil,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import Swal from "sweetalert2";

export default function Button({
    type,
    url = "#", // default supaya tidak undefined
    className = "",
    children,
    ...props
}) {
    const { delete: destroy } = useForm();

    const handleDeleteData = (e) => {
        e.preventDefault();
        if (!url || url === "#") {
            console.error("❌ Button delete: URL is missing");
            return;
        }

        Swal.fire({
            title: "Are you sure you want to delete this?",
            text: "Data is unrecoverable!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(url, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Success!",
                            text: "Data deleted successfully!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    },
                });
            }
        });
    };

    return (
        <>
            {type === "add" && (
                <Link
                    href={url ?? "#"}
                    className={`px-4 py-2 text-sm border rounded-lg bg-white text-gray-700 flex items-center gap-2 hover:bg-gray-100 ${className}`}
                >
                    <IconPlus size={18} strokeWidth={1.5} />
                    <span className="hidden lg:flex">Create New Data</span>
                </Link>
            )}

            {type === "modal" && (
                <button
                    {...props}
                    type="button"
                    className={`px-4 py-2 text-sm border rounded-lg flex items-center gap-2 ${className}`}
                >
                    {children}
                </button>
            )}

            {type === "submit" && (
                <button
                    type="submit"
                    className={`px-4 py-2 text-sm rounded-lg border border-teal-100 bg-teal-50 text-teal-500 flex items-center gap-2 hover:bg-teal-100 ${className}`}
                >
                    <IconCheck size={16} strokeWidth={1.5} /> Save Data
                </button>
            )}

            {type === "cancel" && (
                <Link
                    href={url ?? "#"}
                    {...props}
                    className={`px-4 py-2 text-sm rounded-lg border border-rose-100 bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100 ${className}`}
                >
                    <IconArrowBack size={16} strokeWidth={1.5} /> Go Back
                </Link>
            )}

            {type === "edit" && (
                <Link
                    href={url ?? "#"}
                    {...props}
                    className={`px-4 py-2 rounded-lg bg-orange-50 text-orange-500 flex items-center gap-2 hover:bg-orange-100 ${className}`}
                >
                    <IconPencil size={16} strokeWidth={1.5} /> Edit
                </Link>
            )}

            {type === "delete" && (
                <button
                    onClick={handleDeleteData}
                    className={`px-4 py-2 rounded-lg bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100 ${className}`}
                >
                    <IconTrash size={18} strokeWidth={1.5} />
                    Delete
                </button>
            )}
        </>
    );
}
