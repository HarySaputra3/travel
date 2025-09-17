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

export default function Create({ auth }) {
    const { transactions } = usePage().props;

    const { data, setData, post, errors } = useForm({
        transaction_id: "",
        location_id: "",
        review: "",
        rate_kebersihan: 0,
        rate_keakuratan: 0,
        rate_checkin: 0,
        rate_komunikasi: 0,
        rate_lokasi: 0,
        rate_nilaiekonomis: 0,
    });

    const handleCreate = (e) => {
        e.preventDefault();
        post(route("reviews.store"), {
            onSuccess: () =>
                Swal.fire({
                    title: "Success",
                    text: "Review created successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                }),
        });
    };

    const handleTransactionChange = (e) => {
        const transactionId = e.target.value;
        const selectedTransaction = transactions.find(
            (t) => t.id == transactionId
        );

        setData({
            ...data,
            transaction_id: transactionId,
            location_id: selectedTransaction
                ? selectedTransaction.location_id
                : "",
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Review
                </h2>
            }
        >
            <Head title={"Create Review"} />
            <Container>
                <Card title="Create Review">
                    <form onSubmit={handleCreate}>
                        <div className="mb-4">
                            <label className="block font-medium text-sm text-gray-700">
                                Transaction
                            </label>
                            <select
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                value={data.transaction_id}
                                onChange={handleTransactionChange}
                            >
                                <option value="">Select a Transaction</option>
                                {transactions.map((transaction) => (
                                    <option
                                        key={transaction.id}
                                        value={transaction.id}
                                    >
                                        {transaction.code} -{" "}
                                        {transaction.location.title}
                                    </option>
                                ))}
                            </select>
                            {errors.transaction_id && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.transaction_id}
                                </div>
                            )}
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
                            <Button type={"submit"} label="Submit" />
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
