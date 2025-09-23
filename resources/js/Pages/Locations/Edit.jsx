import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm, usePage } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import { Editor } from "@tinymce/tinymce-react";

export default function Edit({ auth }) {
    //destruct props
    const { location, categories, tickets } = usePage().props;

    //define state with helper inertia
    const { data, setData, post, errors, progress } = useForm({
        title: location.title || "",
        description: location.description || "",
        officehours: location.officehours || "", // FIX: Nama disesuaikan
        category_id: location.category_id || "",
        ticket_id: location.ticket_id || "", // FIX: Tambahkan ticket_id
        region_id: location.region_id || "",
        phone: location.phone || "",
        address: location.address || "",
        latitude: location.latitude || "",
        longitude: location.longitude || "",
        image: null, //wajib upload ulang
        _method: "put",
    });

    // FIX: Menambahkan handler untuk TinyMCE
    const handleEditorChange = (content, editor) => {
        setData("description", content);
    };

    //handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // Saat mengirim file dengan method PUT/PATCH, Inertia membutuhkan 'post'
        post(route("locations.update", location.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Location
                </h2>
            }
        >
            <Head title={"Edit Location"} />

            <Container>
                <Card title="Edit Location">
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            errors={errors.title}
                        />
                        <label className="block mb-1 font-semibold">
                            Description
                        </label>
                        <Editor
                            apiKey="cl0dxs6vbwcuq9g63g2ql2fgihcqbszq6x2vpkycc70tp3ni" // Ganti dengan API Key Anda yang valid
                            value={data.description}
                            // FIX: Tambahkan onEditorChange untuk update state
                            onEditorChange={handleEditorChange}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic backcolor | " +
                                    "alignleft aligncenter alignright alignjustify | " +
                                    "bullist numlist outdent indent | removeformat | help",
                            }}
                        />
                        {errors.description && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </div>
                        )}
                        <Input
                            label="Office Hours"
                            value={data.officehours}
                            onChange={(e) =>
                                setData("officehours", e.target.value)
                            }
                            errors={errors.officehours}
                        />
                        <Input
                            label="Phone"
                            value={data.phone}
                            // FIX: Typo onChane -> onChange
                            onChange={(e) => setData("phone", e.target.value)}
                            errors={errors.phone}
                        />
                        <Input
                            label="Address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            errors={errors.address}
                        />
                        <Input
                            label="Latitude"
                            value={data.latitude}
                            onChange={(e) =>
                                setData("latitude", e.target.value)
                            }
                            errors={errors.latitude}
                        />
                        <Input
                            label="Longitude"
                            value={data.longitude}
                            onChange={(e) =>
                                setData("longitude", e.target.value)
                            }
                            errors={errors.longitude}
                        />

                        {/* category */}
                        <label className="block">Category</label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="w-full p-2 border rounded-sm mb-4"
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

                        {/* ticket */}
                        <label className="block">Ticket</label>
                        <select
                            // FIX: Tambahkan value agar terikat dengan state
                            value={data.ticket_id}
                            onChange={(e) =>
                                setData("ticket_id", e.target.value)
                            }
                            className="w-full p-2 border rounded-sm mb-4"
                        >
                            <option value="">Select Ticket</option>
                            {tickets.map((ticket) => (
                                <option key={ticket.id} value={ticket.id}>
                                    {/* FIX: Menggunakan ticket_code */}
                                    {ticket.ticket_code}
                                </option>
                            ))}
                        </select>
                        {errors.ticket_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.ticket_id}
                            </div>
                        )}

                        {/* multiple image upload */}
                        <label className="block mb-1 font-semibold">
                            Images (multiple allowed, wajib upload ulang)
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

                        {/* upload progress */}
                        {progress && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${progress.percentage}%` }}
                                ></div>
                            </div>
                        )}

                        <div className="flex items-center gap-2 mt-4">
                            <Button type={"submit"} label="Update" />
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
