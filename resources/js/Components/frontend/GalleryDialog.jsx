import Masonry from "react-masonry-css";

export default function GalleryDialog({
    isOpen,
    setIsOpen,
    destination,
    pictures,
}) {
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
            className={`group fixed left-0 top-0 !z-[999] m-0 grid h-screen w-screen place-content-center p-0 ${
                isOpen ? "block" : "hidden"
            }`}
        >
            <div className="flex items-center justify-center rounded-xl bg-white p-6 w-full md:w-[600px] lg:w-[700px]">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-3xl text-primary-opaque font-semibold">
                                {destination}
                            </p>
                            <p className="text-gray-500 mt-2">
                                Semua Foto{" "}
                                <span className="font-bold text-gray-500">
                                    ({pictures.length})
                                </span>
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:cursor-pointer"
                        >
                            <i className="bi bi-x-lg text-2xl text-gray-500 hover:text-gray-700"></i>
                        </button>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto mt-8">
                        <Masonry
                            breakpointCols={{ default: 2 }}
                            className="flex ml-4 w-auto"
                            columnClassName="pl-4 bg-clip-padding"
                        >
                            {pictures.map((pin, index) => (
                                <img
                                    src={pin}
                                    key={index}
                                    className="w-full mb-4"
                                />
                            ))}
                        </Masonry>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
