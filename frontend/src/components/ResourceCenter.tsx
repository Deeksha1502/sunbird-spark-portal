import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppI18n } from "@/hooks/useAppI18n";
import resourceRobotHand from "@/assets/resource-robot-hand.svg";
import resourceVR from "@/assets/resource-vr.svg";
import resourceHardware from "@/assets/resource-hardware.svg";
import resourceBitcoin from "@/assets/resource-bitcoin.svg";
import resourceHacker from "@/assets/resource-hacker.svg";
import resourceEthereum from "@/assets/resource-ethereum.svg";

interface ResourceCardProps {
    id: string;
    title: string;
    type: "Video" | "PDF" | "HTML" | "Epub";
    image: string;
    aspectRatio: string;
}

const ResourceCenter = () => {
    const { t } = useAppI18n();

    return (
        <section className="py-12 md:py-16 bg-[#F6F1E9]">
            <div className="w-full pl-[108px] pr-[82px]">
                {/* Header with lines */}
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="h-px w-14 bg-[#333333]/15" />
                    <div className="text-[14px] font-medium text-[#333333] tracking-widest uppercase">
                        {t("resource.header")}
                    </div>
                    <div className="h-px w-14 bg-[#333333]/15" />
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-[#333333] text-center mb-10 md:mb-14 leading-tight">
                    {t("resource.title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Column 1 - Left: Tall top (Video), Short bottom (Epub) */}
                    <div className="flex flex-col gap-6">
                        <ResourceCardComponent
                            id="1"
                            title="Elm Partners with Udacity to Build a Graduate Development Program"
                            type="Video"
                            image={resourceRobotHand}
                            aspectRatio="aspect-[360/459]"
                        />
                        <ResourceCardComponent
                            id="4"
                            title="Bitcoin Engineering Foundations"
                            type="Epub"
                            image={resourceBitcoin}
                            aspectRatio="aspect-[4/3]"
                        />
                    </div>

                    {/* Column 2 - Middle: Short top (PDF), Tall bottom (Video) */}
                    <div className="flex flex-col gap-6">
                        <ResourceCardComponent
                            id="2"
                            title="Data Engineering Foundations"
                            type="PDF"
                            image={resourceVR}
                            aspectRatio="aspect-[4/3]"
                        />
                        <ResourceCardComponent
                            id="5"
                            title="Generative AI for Cybersecurity Professionals"
                            type="Video"
                            image={resourceHacker}
                            aspectRatio="aspect-[360/459]"
                        />
                    </div>

                    {/* Column 3 - Right: Tall top (HTML), Short bottom (Video) */}
                    <div className="flex flex-col gap-6">
                        <ResourceCardComponent
                            id="3"
                            title="Generative AI for Cybersecurity Professionals"
                            type="HTML"
                            image={resourceHardware}
                            aspectRatio="aspect-[360/459]"
                        />
                        <ResourceCardComponent
                            id="6"
                            title="Data Engineering Foundations"
                            type="Video"
                            image={resourceEthereum}
                            aspectRatio="aspect-[4/3]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ResourceCardComponent = ({
    id,
    title,
    type,
    image,
    aspectRatio,
}: ResourceCardProps) => {
    const { t } = useAppI18n();

    const getViewLabel = (type: string) => {
        switch (type) {
            case "Video": return t("resource.viewVideo");
            case "PDF": return t("resource.viewPdf");
            case "HTML": return t("resource.viewHtml");
            case "Epub": return t("resource.viewEpub");
            default: return t("view");
        }
    };

    return (
        <Link to={`/collection/${id}`} className="block group w-full">
            <div className={`relative w-full ${aspectRatio} rounded-[20px] overflow-hidden`}>
                {/* Background Image Container */}
                <div className="absolute inset-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                </div>

                {/* Bottom Gradient Overlay (Exact 40% height) */}
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 to-transparent z-[1]" />

                {/* Top-left Badge - Exact 44x38 dimensions */}
                <div className="absolute top-[24px] left-[24px] z-10">
                    <span className="flex items-center justify-center bg-white text-black text-[14px] font-bold w-[44px] h-[38px] rounded-[4px] shadow-sm">
                        {type}
                    </span>
                </div>

                {/* Bottom Content - Aligned exactly at bottom-left corner */}
                <div className="absolute bottom-[32px] left-[24px] right-[24px] z-10 flex flex-col items-start gap-1.5">
                    <h3 className="text-white font-bold text-[18px] md:text-[20px] leading-[1.25] [text-wrap:balance]">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/95 font-semibold text-[15px] group-hover:underline transition-all">
                        {getViewLabel(type)}
                        <FiArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ResourceCenter;
