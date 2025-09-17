import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm, usePage } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import { Editor } from "@tinymce/tinymce-react";

export default function Create({ auth }) {
    const { categories, tickets } = usePage().props;

    const { data, setData, post, errors, progress } = useForm({
        title: "",
        description: "",
        officehours: "",
        category_id: "",
        ticket_id: "",
        phone: "",
        address: "",
        latitude: "",
        longitude: "",
        image: [],
    });

    const handleEditorChange = (content, editor) => {
        setData("description", content);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("locations.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add New Location
                </h2>
            }
        >
            <Head title={"Add Location"} />
            <Container>
                <Card title="Add Location">
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            errors={errors.title}
                        />
                        <label className="block mb-1 font-semibold mt-4">
                            Description
                        </label>
                        <Editor
                            apiKey="cl0dxs6vbwcuq9g63g2ql2fgihcqbszq6x2vpkycc70tp3ni" // Ganti dengan API Key TinyMCE
                            value={data.description}
                            onEditorChange={handleEditorChange}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins:
                                    "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                                toolbar:
                                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            }}
                        />
                        {errors.description && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </div>
                        )}
                        <Input
                            className="mt-4"
                            label="Office Hours"
                            value={data.officehours}
                            onChange={(e) =>
                                setData("officehours", e.target.value)
                            }
                            errors={errors.officehours}
                        />
                        <Input
                            className="mt-4"
                            label="Phone"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            errors={errors.phone}
                        />
                        <Input
                            className="mt-4"
                            label="Address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            errors={errors.address}
                        />
                        <Input
                            className="mt-4"
                            label="Latitude"
                            value={data.latitude}
                            onChange={(e) =>
                                setData("latitude", e.target.value)
                            }
                            errors={errors.latitude}
                        />
                        <Input
                            className="mt-4"
                            label="Longitude"
                            value={data.longitude}
                            onChange={(e) =>
                                setData("longitude", e.target.value)
                            }
                            errors={errors.longitude}
                        />

                        <label className="block mt-4">Category</label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.category_id}
                            </div>
                        )}

                        <label className="block mt-4">Ticket</label>
                        <select
                            value={data.ticket_id}
                            onChange={(e) =>
                                setData("ticket_id", e.target.value)
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Ticket</option>
                            {tickets.map((ticket) => (
                                <option key={ticket.id} value={ticket.id}>
                                    {ticket.ticket_code}
                                </option>
                            ))}
                        </select>
                        {errors.ticket_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.ticket_id}
                            </div>
                        )}

                        <label className="block mb-1 font-semibold mt-4">
                            Images (multiple allowed)
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setData("image", e.target.files)}
                            className="mt-2"
                        />
                        {errors.image && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.image}
                            </div>
                        )}

                        {progress && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${progress.percentage}%` }}
                                ></div>
                            </div>
                        )}

                        <div className="flex items-center gap-2 mt-4">
                            <Button type={"submit"} label="Submit" />
                            <Button
                                type={"cancel"}
                                label="Cancel"
                                url={route("locations.index")}
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
