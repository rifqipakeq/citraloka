import Navbar from "@/Components/ui/Navbar";

export default function UserLayout({ children, auth }) {
    return (
        <div>
            <Navbar auth={auth} />
            {children}
        </div>
    );
}
