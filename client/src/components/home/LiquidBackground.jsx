const LiquidBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="absolute -left-32 top-20 h-80 w-80
                animate-pulse rounded-full bg-emerald-400/20
                blur-[100px]" />

            <div className="absolute right-[-120px] top-1/3 h-96 w-96
                rounded-full bg-cyan-300/10 blur-[120px]" />

            <div className="absolute bottom-[-150px] left-1/3 h-96 w-96
                rounded-full bg-lime-300/10 blur-[120px]" />

            <div className="absolute inset-0 bg-[radial-gradient(
                circle_at_center,
                transparent_0%,
                rgba(0,0,0,0.35)_100%
            )]" />

        </div>
    );
};

export default LiquidBackground;