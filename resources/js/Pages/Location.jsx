import DestinationCard from "@/Components/frontend/DestinationCard";
import ReactPaginate from "react-paginate";
import Navbar from "@/Components/ui/Navbar";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Location() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState("");

    const categories = [
        { label: "All", value: "all" },
        { label: "Popular", value: "popular" },
        { label: "Nature", value: "nature" },
        { label: "Culinary", value: "culinary" },
        { label: "History & Education", value: "history_education" },
        { label: "Art & Culture", value: "arts_culture" },
        { label: "Shop & Market", value: "shop_market" },
        { label: "Theme Park", value: "theme_park" },
    ];

    const destinations = [
        {
            id: 1,
            title: "Raja Ampat",
            category: "beach",
            price: 7500000,
            time: "7.00AM - 11.00AM",
            rating: 4.8,
            image: "/assets/flores.jpeg",
            description:
                "Nikmati keindahan bawah laut Raja Ampat yang terkenal dengan terumbu karang dan biota lautnya. Cocok untuk diving dan snorkeling.",
        },
        {
            id: 2,
            title: "Bromo Sunrise",
            category: "Mountain",
            price: 3500000,
            time: "3.00AM - 9.00AM",
            rating: 4.7,
            image: "/assets/flores.jpeg",
            description:
                "Pengalaman seru menyaksikan matahari terbit di Gunung Bromo dengan pemandangan lautan pasir dan gunung-gunung di sekitarnya.",
        },
    ];

    // Pagination
    const itemsPerPage = 3;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = destinations.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(destinations.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % destinations.length;
        setItemOffset(newOffset);
    };

    // Filter berdasarkan search & kategori
    const filteredItems = currentItems.filter((item) => {
        const matchCategory =
            selectedCategory === "all" || item.category === selectedCategory;
        const matchSearch = item.title
            .toLowerCase()
            .includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <>
            <Head title="Location" />
            <div>
                <Navbar />
                <section className="relative flex flex-col px-4 items-center font-poppins pt-40">
                    <div className="w-full h-150 locations-hero absolute top-0 left-0 -z-10"></div>
                    <div className="flex flex-col md:flex-row gap-8 justify-between items-center container mx-auto">
                        <div className="w-full">
                            <h1 className="text-4xl font-semibold text-primary-opaque">
                                Location
                            </h1>
                            <p className="text-white mt-4">
                                Dapatkan Pengalaman Liburan Terbaik di sini
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <input
                                type="text"
                                placeholder="Search for a destination"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white"
                            />
                            <button
                                type="button"
                                className="py-3.5 px-8 text-white rounded-xl font-semibold bg-primary-opaque hover:cursor-pointer hover:bg-primary-hover transition-all"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Category Buttons */}
                    <div className="mt-12 flex container mx-auto flex-wrap gap-4">
                        {categories.map((category) => {
                            const isSelected =
                                selectedCategory === category.value;
                            return (
                                <button
                                    key={category.value}
                                    onClick={() =>
                                        setSelectedCategory(category.value)
                                    }
                                    className={`text-sm sm:text-base px-3 py-1.5 sm:py-3.5 sm:px-5 rounded-full hover:cursor-pointer transition-all
                                     ${
                                         isSelected
                                             ? "bg-primary-opaque text-white"
                                             : "bg-white text-gray-500 hover:bg-gray-100"
                                     }`}
                                >
                                    {category.label}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Destination List */}
                <main className="container px-4 relative mx-auto mt-12 mb-32 z-10 font-poppins">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <DestinationCard key={item.id} item={item} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-3">
                                No destinations found
                            </p>
                        )}
                    </div>

                    {/* Pagination */}
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next →"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="← Previous"
                        renderOnZeroPageCount={null}
                        containerClassName="list-unstyled py-8 flex items-center justify-center gap-4 w-full"
                        previousClassName="mr-auto font-poppins text-gray-500 font-medium hover:cursor-pointer"
                        nextClassName="ml-auto font-poppins text-gray-500 font-medium hover:cursor-pointer"
                        pageClassName="w-12 h-12 hover:cursor-pointer grid place-content-center rounded-full aspect-square text-gray-500 hover:bg-primary-transparent font-medium font-poppins"
                        activeClassName="w-12 h-12 hover:cursor-pointer grid place-content-center rounded-full aspect-square text-gray-500 bg-primary-transparent text-primary-opaque font-medium font-poppins"
                    />
                </main>
            </div>
        </>
    );
}
