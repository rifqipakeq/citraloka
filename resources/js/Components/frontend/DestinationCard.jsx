export default function DestinationCard({ item }) {
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
            className="p-2.5 rounded-3xl border-gray-300 bg-white"
            // key={item.id}
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
                <p className="text-sm text-white font-semibold px-5 py-2.5 rounde-full bg-xyellow w-fit absolute bottom-4 right-4">
                    <i className="b bi-star-fill"></i>{" "}
                    <span>{item.rating}</span>
                </p>
            </div>
            <div className="px-2.5 pb-8">
                <div className="flex justify-between items-center mt-5 text-lg font-semibold">
                    <p>{item.title}</p>
                    <p className="text-primary-opaque">
                        Rp{item.price.toLocaleString("id-ID")}
                    </p>
                </div>
                <div className="mt-3 text-sm text-gray-400 flex items-center gap-2 font-semibold">
                    <i className="bi bi-clock-fill"></i>
                    <p>{item.time}</p>
                </div>
                <hr className="my-4 border-gray-300" />
                <p className="text-wrap line-clamp-2 text-sm text-gray-400 font-medium">
                    {item.description}
                </p>
            </div>
        </div>
    );
}
