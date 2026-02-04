import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import { useAppI18n } from "@/hooks/useAppI18n";
import heroWoman from "@/assets/hero-woman-new.svg";
import creamWave from "@/assets/cream-wave.svg";
import tealShape from "@/assets/teal-shape.svg";
import HeroStats from "./HeroStats";

const HeroWithStats = () => {
    const { t, isRTL } = useAppI18n();

    return (
        <section className="relative bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white pb-24 lg:pb-32">
                {/* Cream Wave Background - positioned at bottom */}
                <div className="absolute bottom-8 left-0 right-0 w-full">
                    <img
                        src={creamWave}
                        alt=""
                        className="w-full h-auto object-cover min-h-[23.75rem]"
                    />
                </div>

                {/* Decorative dots - positioned conditionally based on direction */}
                <div
                    className={`absolute w-8 h-8 rounded-full hidden lg:block bg-sunbird-brick top-[20.5%] ${isRTL ? 'left-[38%]' : 'right-[38%]'}`}
                />
                <div
                    className={`absolute w-10 h-10 rounded-full hidden lg:block bg-sunbird-yellow top-[49.71%] ${isRTL ? 'left-[48%]' : 'right-[48%]'}`}
                />
                <div
                    className={`absolute w-4 h-4 rounded-full hidden lg:block bg-sunbird-brick top-[50.73%] ${isRTL ? 'left-[8%]' : 'right-[8%]'}`}
                />

                <div className="w-full relative z-10 pl-[6.75rem] pr-[5.125rem]">
                    <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[26.25rem] py-8 lg:py-12" style={{ paddingTop: '0px' }}>
                        {/* Content - Left Side (becomes Right in RTL grid) */}
                        <div className="max-w-xl">
                            <h1
                                className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.1] mb-6 text-gray-900"
                            >
                                {t("hero.title", "Knowledge that moves you forward.").split(/(\n)/).map((line, i) =>
                                    line === "\n" ? <br key={i} /> : line
                                )}
                            </h1>

                            <p
                                className="text-[0.9375rem] md:text-base mb-8 leading-relaxed max-w-md text-gray-500"
                            >
                                {t("hero.subtitle")}
                            </p>

                            <Link to="/explore">
                                <Button
                                    size="lg"
                                    className="text-white font-semibold text-[0.9375rem] w-[17.5rem] h-[3.125rem] px-0 rounded-[12px] shadow-md hover:shadow-lg transition-all flex items-center justify-center bg-sunbird-brick"
                                >
                                    {t("hero.cta")}
                                    {isRTL ? (
                                        <FiArrowRight className="w-4 h-4 mr-2 rotate-180" />
                                    ) : (
                                        <FiArrowRight className="w-4 h-4 ml-2" />
                                    )}
                                </Button>
                            </Link>
                        </div>

                        {/* Hero Image with teal shape - Right Side (becomes Left in RTL grid) */}
                        <div className="hidden lg:flex justify-end items-end relative h-[25rem]">
                            <div className="absolute bottom-0 right-0 w-[21.25rem]">
                                <img
                                    src={tealShape}
                                    alt=""
                                    className="w-full h-auto rotate-[-0.2deg] origin-center pb-[1.75rem]"
                                    style={{ paddingBottom: '70px' }}
                                />
                            </div>
                            <div className="relative z-10 flex items-end justify-center h-full">
                                <img
                                    src={heroWoman}
                                    alt="Professional learning"
                                    className="w-[22.5rem] h-auto object-contain"
                                    style={{ width: '400px', height: '450px', paddingBottom: '12px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Stats Cards - Positioned to overlap and align with hero content */}
            <div className="relative z-20 -mt-24 lg:-mt-36">
                <div className="w-full px-4 lg:px-0 lg:pl-[6.75rem] lg:pr-[5.125rem]">
                    <HeroStats />
                </div>
            </div>
        </section>
    );
};

export default HeroWithStats;
