import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm, usePage } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

const InteractiveRatingStars = ({ label, rating, max = 5, onChange }) => (
    <div className="mb-4">
        <label className="block font-medium text-sm text-gray-700 mb-1">
            {label}
        </label>
        <div className="flex items-center gap-1">
            {Array.from({ length: max }, (_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={index}
                        onClick={() => onChange(starValue)}
                        className={`text-3xl cursor-pointer transition-colors ${
                            starValue <= rating
                                ? "text-yellow-400"
                                : "text-gray-300 hover:text-yellow-200"
                        }`}
                        style={{ marginTop: "-5px" }}
                    >
                        ★
                    </span>
                );
            })}
            <span className="ml-2 text-gray-600 text-sm">
                ({rating}/{max})
            </span>
        </div>
    </div>
);

export default function Edit({ auth }) {
    const { review } = usePage().props;

    const { data, setData, put, errors } = useForm({
        review: review.review,
        rate_kebersihan: review.rate_kebersihan,
        rate_keakuratan: review.rate_keakuratan,
        rate_checkin: review.rate_checkin,
        rate_komunikasi: review.rate_komunikasi,
        rate_lokasi: review.rate_lokasi,
        rate_nilaiekonomis: review.rate_nilaiekonomis,
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("reviews.update", review.id), {
            onSuccess: () =>
                Swal.fire({
                    title: "Success",
                    text: "Review updated successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                }),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Review
                </h2>
            }
        >
            <Head title={"Edit Review"} />
            <Container>
                <Card title={`Edit Review for ${review.location.title}`}>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label className="block font-medium text-sm text-gray-700">
                                Transaction Code
                            </label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                                value={review.transaction.code}
                                disabled
                            />
                        </div>

                        <InteractiveRatingStars
                            label="Kebersihan"
                            rating={data.rate_kebersihan}
                            onChange={(val) => setData("rate_kebersihan", val)}
                        />
                        <InteractiveRatingStars
                            label="Keakuratan"
                            rating={data.rate_keakuratan}
                            onChange={(val) => setData("rate_keakuratan", val)}
                        />
                        <InteractiveRatingStars
                            label="Check In"
                            rating={data.rate_checkin}
                            onChange={(val) => setData("rate_checkin", val)}
                        />
                        <InteractiveRatingStars
                            label="Komunikasi"
                            rating={data.rate_komunikasi}
                            onChange={(val) => setData("rate_komunikasi", val)}
                        />
                        <InteractiveRatingStars
                            label="Lokasi"
                            rating={data.rate_lokasi}
                            onChange={(val) => setData("rate_lokasi", val)}
                        />
                        <InteractiveRatingStars
                            label="Nilai Ekonomis"
                            rating={data.rate_nilaiekonomis}
                            onChange={(val) =>
                                setData("rate_nilaiekonomis", val)
                            }
                        />

                        <div className="mb-4">
                            <Input
                                label="Review"
                                type="textarea"
                                value={data.review}
                                onChange={(e) =>
                                    setData("review", e.target.value)
                                }
                                errors={errors.review}
                                placeholder="Write your review..."
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button type={"submit"} label="Update" />
                            <Button
                                type={"cancel"}
                                label="Cancel"
                                url={route("reviews.index")}
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
