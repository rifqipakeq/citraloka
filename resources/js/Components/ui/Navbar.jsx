import { Link } from "@inertiajs/react";

export default function Navbar({ auth }) {
    return (
        <header className="fixed top-0 left-0 w-full z-50 px-4">
            <nav className="container mx-auto flex items-center bg-white justify-between px-8 py-3.5 font-poppins rounded-full mt-8">
                <Link href={route("home")}>
                    <img
                        src="/assets/logo.png"
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                </Link>
                <ul className="flex gap-12 items-center text-gray-500 text-lg">
                    <li>
                        <Link
                            href={route("home")}
                            className={
                                route().current("home")
                                    ? "text-primary-opaque border-b-3 py-1 border-primary-opaque"
                                    : ""
                            }
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("location.index")}
                            className={
                                route().current("location.index")
                                    ? "text-primary-opaque border-b-3 py-1 border-primary-opaque"
                                    : ""
                            }
                        >
                            Location
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("location.maps")}
                            className={
                                route().current("location.maps")
                                    ? "text-primary-opaque border-b-3 py-1 border-primary-opaque"
                                    : ""
                            }
                        >
                            Maps
                        </Link>
                    </li>
                </ul>
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="bg-primary-opaque rounded-full text-white font-semibold hover:bg-primary-hover transition-all hover:cursor-pointer"
                    >
                        <img
                            src={
                                auth.user.profile_picture ||
                                "/assets/profile_placeholder.png"
                            }
                            alt="User"
                            className="h-12 w-12 rounded-full overflow-hidden"
                        />
                    </Link>
                ) : (
                    <Link
                        href={route("login")}
                        className="px-16 py-4 bg-primary-opaque rounded-full text-white font-semibold hover:bg-primary-hover transition-all hover:cursor-pointer"
                    >
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
}
