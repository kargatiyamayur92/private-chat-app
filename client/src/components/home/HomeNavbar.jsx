import { Link } from "react-router-dom";

const HomeNavbar = () => {
    return (
        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

            <Link
                to="/"
                className="flex items-center gap-3"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl
                    border border-white/20 bg-white/10 shadow-lg backdrop-blur-xl">
                    <span className="text-xl">💬</span>
                </div>

                <span className="text-lg font-semibold tracking-tight">
                    PrivateChat
                </span>
            </Link>

            <nav className="hidden items-center gap-3 md:flex">

                <Link
                    to="/login"
                    className="rounded-full px-5 py-2.5 text-sm text-white/75
                    transition hover:bg-white/10 hover:text-white"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="rounded-full border border-white/20 bg-white/10
                    px-5 py-2.5 text-sm font-medium backdrop-blur-xl
                    transition hover:bg-white/20"
                >
                    Register
                </Link>

            </nav>
        </header>
    );
};

export default HomeNavbar;