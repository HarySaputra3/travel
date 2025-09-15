import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm, usePage } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import { Editor } from "@tinymce/tinymce-react";

export default function Create({ auth }) {
    const { categories, ticket } = usePage().props;
    //define state  with helper  inertia
    const { data, setData, post, errors, progress } = useForm({
        title: "",
        description: "",
        officehour: "",
        category_id: "",
        region_id: "",
        phone: "",
        address: "",
        latitude: "",
        longitude: "",
        image: [], //set array cause multiply images
    });

    //define method handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        //membuat form data manual agar file multiple bisa dikirim
        const formData = new FileReaderormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("officehours", data.officehours);
        formData.append("category_id", data.category_id);
        formData.append("ticket_id", data.ticket_id);
        formData.append("region_id", data.region_id);
        formData.append("phone", data.phone);
        formData.append("address", data.address);
        formData.append("latitude", data.latitude);
        formData.append("longitude", data.longitude);

        //loop file dan tambahkan ke formData
        for (let i = 0; i < data.image.length; i++) {
            formData.append("image[]", data.image[i]);
        }

        post(route("locations.store"), {
            data: formData,
            forceFormData: true, //supaya inertia tau ini formdata
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.auth.user}
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
                        <label className="block mb-1 font-semibold">
                            Description
                        </label>

                        <Editor
                            apiKey="cl0dxs6vbwcuq9g63g2ql2fgihcqbszq6x2vpkycc70tp3ni"
                            value={data.description}
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
                            onChane={(e) =>
                                setData("officehours", e.target.value)
                            }
                            errors={errors.officehours}
                        />
                        <Input
                            label="Phone"
                            value={data.phone}
                            onChane={(e) => setData("phone", e.target.value)}
                            errors={errors.phone}
                        />
                        <Input
                            label="Address"
                            value={data.address}
                            onChane={(e) => setData("address", e.target.value)}
                            errors={errors.address}
                        />
                        <Input
                            label="Latitude"
                            value={data.latitude}
                            onChane={(e) => setData("latitude", e.target.value)}
                            errors={errors.latitude}
                        />
                        <Input
                            label="Longitude"
                            value={data.longitude}
                            onChane={(e) =>
                                setData("longitude", e.target.value)
                            }
                            errors={errors.longitude}
                        />

                        {/* category select */}
                        <label className="block">Category</label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="w-full p-2 border rounded mb-4"
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

                        {/* ticket select */}
                        <label className="block">Ticket</label>
                        <select
                            value={data.ticket_id}
                            onChange={(e) =>
                                setData("ticket_id", e.target.value)
                            }
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="">Select Category</option>
                            {tickets.map((ticket) => (
                                <option key={ticket.id} value={ticket.id}>
                                    {ticket.name}
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
                            Images (multiple allowed)
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setData("image", e.target.files)}
                            className="mt-2"
                        />
                        {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}

                        {/* upload progress */}
                        {progress && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `$progress.` }}>

                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
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
