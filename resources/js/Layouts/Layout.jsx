import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <>
            <header>
                <nav className="bg-gray-900 text-white p-4 shadow-md">
                    <div className="container mx-auto flex justify-items-start items-center">
                        <div className="text-lg font-semibold">
                            <Link href="/" className="ml-4 hover:text-gray-400">Event</Link>
                        </div>
                        <div>
                            <Link href="/notification" className="ml-4 hover:text-gray-400 transition">Notification</Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="container mx-auto p-4">
                {children}
            </main>
        </>
    );
}
