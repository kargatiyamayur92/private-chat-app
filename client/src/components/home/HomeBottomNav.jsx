import { Link, useLocation } from "react-router-dom";

const HomeBottomNav = () => {

    const location = useLocation();

    const items = [
        {
            name: "Home",
            icon: "⌂",
            path: "/"
        },
        {
            name: "Features",
            icon: "✦",
            path: "/"
        },
        {
            name: "Login",
            icon: "↗",
            path: "/login"
        },
        {
            name: "Register",
            icon: "↗",
            path: "/register"
        }
    ];

    return (
        <nav className="fixed bottom-4 left-1/2 z-50
            flex -translate-x-1/2 items-center gap-1
            rounded-[28px] border border-white/15
            bg-black/45 p-2 shadow-2xl backdrop-blur-2xl
            md:hidden">

            {items.map((item) => {

                const active = location.pathname === item.path;

                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex min-w-[72px] flex-col items-center
                            gap-1 rounded-[22px] px-4 py-2 text-xs
                            transition ${
                                active
                                    ? "bg-white text-black"
                                    : "text-white/55 hover:bg-white/10"
                            }`}
                    >

                        <span className="text-lg leading-none">
                            {item.icon}
                        </span>

                        <span>
                            {item.name}
                        </span>

                    </Link>
                );
            })}

        </nav>
    );
};

export default HomeBottomNav;