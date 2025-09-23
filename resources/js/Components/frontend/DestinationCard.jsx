export default function DestinationCard() {
    const categoryColors = {
        Mountain: "bg-xgreen",
        Beach: "bg-xorange",
        "Shop & Market": "bg-xgray",
        "History & Education": "bg-xpurple",
        "Art & Culture": "bg-xred",
        "Theme Park": "bg-xdarkgreen",
    };

    return (
        <div
            key={item.id}
            className="p-2.5 rounded-3xl border border-gray-300 bg-white"
        >
            <div className="relative">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full rounded-2xl overflow-hidden aspect-video object-cover"
                />
                <p
                    className={`text-sm text-white font-semibold px-5 py-2.5 rounded-full w-fit absolute bottom-4 left-4 ${
                        categoryColors[item.category]
                    }`}
                >
                    {item.category}
                </p>
                <p className="text-sm text-white font-semibold px-5 py-2.5 rounded-full bg-xyellow w-fit absolute bottom-4 right-4">
                    <i className="bi bi-star-fill"></i>{" "}
                    <span>{item.rating}</span>
                </p>
            </div>
            <div class="px-2.5 pb-8">
                <div class="flex justify-between items-center mt-5 text-lg font-semibold">
                    <p>{item.title}</p>
                    <p class="text-primary-opaque">
                        Rp.{item.price.toLocaleString("id-ID")}
                    </p>
                </div>
                <div class="mt-3 text-sm text-gray-400 flex items-center gap-2 font-semibold">
                    <i class="bi bi-clock-fill"></i>
                    <p>{item.time}</p>
                </div>
                <hr class="my-4 border-gray-300" />
                <p class="text-wrap line-clamp-2 text-sm text-gray-400 font-medium">
                    {item.description}
                </p>
            </div>
        </div>
    );
}
