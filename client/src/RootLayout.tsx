import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/layout/Navbar";
import Footer from "./components/footer/Footer";

export default function RootLayout() {
    return (
        <>
            <NavBar
                items={[
                    { name: "Home", href: "/" },
                    { name: "About", href: "/about" },
                    { name: "Work", href: "/work" },
                    { name: "Blog", href: "/blog" },
                    {
                        name: "More",
                        href: "#",
                        hasDropdown: true,
                        items: [
                            { name: "Guestbook", href: "/more/guestbook" },
                            { name: "Bucket List", href: "/more/bucket-list" },
                            { name: "Links", href: "/more/links" },
                            { name: "Uses", href: "/more/uses" },
                            { name: "Attribution", href: "/more/attribution" },
                        ],
                    },
                ]}
            />

            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}