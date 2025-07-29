import Navbar from "@/Components/ui/Navbar";

export default function UserLayout({ auth, children }) {
    return (
        <div>
            <Navbar auth={auth} />
            {children}
        </div>
    );
}
