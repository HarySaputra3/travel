import { getStars } from "@/Utils/helper";
import ReviewCard from "./ReviewCard";
import Dropdown from "../ui/Dropdown";
import { useState } from "react";
import { optionSortByDate } from "@/Utils/constants";

export default function ReviewDialog({ isOpen, setIsOpen, reviews }) {
    const [orderBy, setOrderBy] = useState("");

    const handleBackdropClick = (event) => {
        if (!event) return;

        const dialog = event.target;
        if (dialog.tagName === "DIALOG") {
            setIsOpen(false);
        }
    };

    return (
        <dialog
            open={isOpen}
            onClick={handleBackdropClick}
            className={`group fixed left-0 top-0 z-[999] m-0 grid h-screen w-screen place-content-center p-0 
                ${isOpen ? "block" : "hidden"}`}
        >
            <div className="flex items-center justify-center rounded-xl bg-white p-6 w-full md:w-[600px] lg:w-[700px]">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-3xl text-primary-opaque font-semibold">
                                Ulasan
                            </p>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:cursor-pointer"
                        >
                            <i className="bi bi-x-lg text-2xl text-gray-500 hover:text-gray-700"></i>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div className="col-span-1 px-4">
                            <div className="flex flex-col items-center justify-center px-12">
                                <img
                                    src="/assets/badge.webp"
                                    alt="Score badge"
                                    draggable="false"
                                    className=""
                                />
                                <p className="font-bold text-white text-4xl -mt-21 z-10">
                                    4
                                </p>
                            </div>
                            <div className="flex items-center justify-evenly gap-1 mt-16 w-full px-12">
                                {getStars(4, "text-xl text-xyellow", false)}
                            </div>
                            <div className="text-center mt-4">
                                <p className="text-lg font-semibold text-gray-600">
                                    Pilihan Tamu
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Rumah ini menjadi favorit tamu berdasarkan
                                    penilaian, ulasan, dan keandalannya
                                </p>
                            </div>

                            <div className="mt-4 w-full">
                                <p className="font-medium text-gray-600 text-sm">
                                    Nilai Keseluruhan
                                </p>
                                <div className="flex items-center justify-between gap-4 mt-2">
                                    <span className="text-xs text-gray-500">
                                        4
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value="4"
                                        max="5"
                                    ></progress>
                                </div>
                                <div className="flex items-center justify-between gap-4 mt-2">
                                    <span className="text-xs text-gray-500">
                                        2
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value="2"
                                        max="5"
                                    ></progress>
                                </div>
                                <div className="flex items-center justify-between gap-4 mt-2">
                                    <span className="text-xs text-gray-500">
                                        5
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value="5"
                                        max="5"
                                    ></progress>
                                </div>
                                <div className="flex items-center justify-between gap-4 mt-2">
                                    <span className="text-xs text-gray-500">
                                        1
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value="1"
                                        max="5"
                                    ></progress>
                                </div>
                                <div className="flex items-center justify-between gap-4 mt-2">
                                    <span className="text-xs text-gray-500">
                                        3
                                    </span>
                                    <progress
                                        className="rating-progress"
                                        value="3"
                                        max="5"
                                    ></progress>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="/assets/icons/icon_broom.svg"
                                                alt="Kebersihan"
                                            />
                                            <p className="font-medium">
                                                Kebersihan
                                            </p>
                                        </div>
                                        <p>
                                            <i className="bi bi-star-fill mr-2" />
                                            <span className="font-semibold">
                                                4,5
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="/assets/icons/icon_broom.svg"
                                                alt="keakuratan"
                                            />
                                            <p className="font-medium">
                                                keakuratan
                                            </p>
                                        </div>
                                        <p>
                                            <i className="bi bi-star-fill mr-2" />
                                            <span className="font-semibold">
                                                4,5
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="/assets/icons/icon_broom.svg"
                                                alt="check-in"
                                            />
                                            <p className="font-medium">
                                                check-in
                                            </p>
                                        </div>
                                        <p>
                                            <i className="bi bi-star-fill mr-2" />
                                            <span className="font-semibold">
                                                4,5
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="/assets/icons/icon_broom.svg"
                                                alt="Komunikasi"
                                            />
                                            <p className="font-medium">
                                                Komunikasi
                                            </p>
                                        </div>
                                        <p>
                                            <i className="bi bi-star-fill mr-2" />
                                            <span className="font-semibold">
                                                4,5
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b-2 text-gray-500 text-sm">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="/assets/icons/icon_broom.svg"
                                                alt="Lokasi"
                                            />
                                            <p className="font-medium">
                                                Lokasi
                                            </p>
                                        </div>
                                        <p>
                                            <i className="bi bi-star-fill mr-2" />
                                            <span className="font-semibold">
                                                4,5
                                            </span>
                                        </p>
                                    </div>

                                    <div className="max-h-[60vh] overflow-y-auto mt-8 md:col-span-2 ml-4">
                                        <div className="mb-6 flex w-full items-center justify-between px-1">
                                            <p className="text-gray-500 text-xl">
                                                Semua Ulasan{" "}
                                                <span className="font-semibold text-gray-600">
                                                    (200)
                                                </span>
                                            </p>
                                            <Dropdown
                                                options={optionSortByDate}
                                                value={orderBy}
                                                onChange={setOrderBy}
                                                placeholder="Paling Baru"
                                            />
                                        </div>
                                        <search className="mb-6">
                                            <div className="relative w-full px-1">
                                                <input
                                                    type="text"
                                                    className="w-full rounded-full border border-gray-300 placeholder:text-sm"
                                                    placeholder="Cari Ulasan"
                                                />
                                                <i class="bi bi-search absolute top-1/2 -translate-y-1/2 right-4"></i>
                                            </div>
                                        </search>
                                        {reviews.map((review) => (
                                            <ReviewCard
                                                key={review.id}
                                                user={review}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
