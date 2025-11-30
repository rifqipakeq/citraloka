const LocationCard = ({ location }) => (
    <div
        className="
            relative w-[400px] h-[600px] rounded-4xl shadow-xl overflow-hidden 
            hover:shadow transition duration-300 ease-in-out
            group 
        "
    >

        <div
            className="
                absolute inset-0 bg-cover bg-center 
                transform transition-transform duration-300 group-hover:scale-105
            "
            style={{
                backgroundImage: `url(${location.image})`,
            }}
        ></div>

        <div
            className="absolute inset-0  transition-opacity duration-300"
        ></div>

        <div
            className="
                absolute inset-0 
                flex flex-col justify-end
                text-white 
                items-start
            "
        >
            <div
                className="
                    h-60
                    w-full p-4 rounded-xl 
                    backdrop-blur-sm 
                    bg-white/1 
                    bg-gradient-to-t from-black/60 to-black/20
                    border border-white/20 
                "
            >
                <h3 className="text-xl font-bold drop-shadow-lg leading-tight">
                    {location.title}
                </h3>

                <p className="text-lg font-semibold mt-2 drop-shadow-md">
                    {location.distance.toFixed(2)} km from you
                </p>

                <p className="text-sm text-gray-200 mt-1 drop-shadow-sm">
                    Lat: {location.latitude}, Lng: {location.longitude}
                </p>
                <div className='flex'>

                    <button>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-block mt-4 px-4 py-2 
                                bg-amber-500 hover:bg-amber-600 
                                text-white font-semibold 
                                rounded-lg 
                                shadow-md hover:shadow-lg 
                                transition 
                                duration-300
                                w-[300px]text-center
                            "
                        >
                            View on Google Maps
                        </a>
                    </button>
                    <button>
                        <a
                            href={`/location/${location.id}`}
                            className="
                                inline-block mt-4 ml-4 px-4 py-2 
                                bg-green-500 hover:bg-green-600 
                                text-white font-semibold 
                                rounded-lg 
                                shadow-md hover:shadow-lg 
                                transition 
                                duration-300
                                w-[300px]text-center
                            "
                        >
                            Visit Destination Page
                        </a>
                    </button>
                </div>

            </div>
        </div>

    </div>
);

export default LocationCard;