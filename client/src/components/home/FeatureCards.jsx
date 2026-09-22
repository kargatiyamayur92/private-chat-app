const features = [
    {
        icon: "💬",
        title: "Real-time Chat",
        description: "Send and receive messages instantly."
    },
    {
        icon: "🔒",
        title: "Private",
        description: "Your conversations stay between you and your contact."
    },
    {
        icon: "⚡",
        title: "Fast",
        description: "Built with modern real-time technology."
    }
];

const FeatureCards = () => {
    return (
        <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-28
            md:grid-cols-3 lg:px-8">

            {features.map((feature) => (
                <div
                    key={feature.title}
                    className="rounded-3xl border border-white/10
                    bg-white/[0.06] p-6 backdrop-blur-2xl
                    shadow-2xl transition duration-300
                    hover:-translate-y-1 hover:bg-white/[0.09]"
                >

                    <div className="mb-5 flex h-12 w-12 items-center
                        justify-center rounded-2xl border border-white/10
                        bg-white/10 text-xl">
                        {feature.icon}
                    </div>

                    <h3 className="text-lg font-semibold">
                        {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/50">
                        {feature.description}
                    </p>

                </div>
            ))}

        </section>
    );
};

export default FeatureCards;