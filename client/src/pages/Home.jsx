import HomeNavbar from "../components/home/HomeNavbar";
import HeroSection from "../components/home/HeroSection";
import FeatureCards from "../components/home/FeatureCards";
import HomeBottomNav from "../components/home/HomeBottomNav";
import LiquidBackground from "../components/home/LiquidBackground";

const Home = () => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#07100d] text-white">
            <LiquidBackground />

            <div className="relative z-10">
                <HomeNavbar />

                <HeroSection />

                <FeatureCards />
            </div>

            <HomeBottomNav />
        </main>
    );
};

export default Home;