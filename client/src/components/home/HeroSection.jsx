import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="mx-auto flex min-h-[75vh] max-w-5xl
            items-center justify-center px-5 py-16 text-center">

            <div className="max-w-3xl">

                <div className="mb-6 inline-flex items-center gap-2 rounded-full
                    border border-white/15 bg-white/10 px-4 py-2
                    text-sm text-white/70 shadow-xl backdrop-blur-xl">

                    <span className="h-2 w-2 rounded-full bg-emerald-400" />

                    Real-time private messaging
                </div>

                <h1 className="text-5xl font-semibold leading-[1.05]
                    tracking-tight sm:text-6xl lg:text-8xl">

                    Talk freely.
                    <br />

                    <span className="bg-gradient-to-r from-emerald-300
                        via-cyan-200 to-white bg-clip-text text-transparent">
                        Stay connected.
                    </span>

                </h1>

                <p className="mx-auto mt-7 max-w-2xl text-base leading-7
                    text-white/55 sm:text-lg">
                    A simple private space for real-time conversations,
                    built to keep your messages personal, fast and connected.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3
                    sm:flex-row">

                    <Link
                        to="/chat"
                        className="group rounded-2xl border border-white/20
                        bg-white px-7 py-3.5 font-semibold text-black
                        shadow-2xl transition duration-300
                        hover:-translate-y-1"
                    >
                        Get Started
                        <span className="ml-2 transition group-hover:ml-3">
                            →
                        </span>
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-2xl border border-white/15
                        bg-white/10 px-7 py-3.5 font-medium
                        text-white backdrop-blur-xl transition
                        hover:bg-white/15"
                    >
                        Create Account
                    </Link>

                </div>

            </div>
        </section>
    );
};

export default HeroSection;