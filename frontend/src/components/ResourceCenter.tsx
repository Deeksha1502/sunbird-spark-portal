import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppI18n } from "@/hooks/useAppI18n";
import resourceRobotHand from "@/assets/resource-robot-hand.svg";
import resourceVR from "@/assets/resource-vr.svg";
import resourceHardware from "@/assets/resource-hardware.svg";
import resourceBitcoin from "@/assets/resource-bitcoin.svg";
import resourceHacker from "@/assets/resource-hacker.svg";
import resourceEthereum from "@/assets/resource-ethereum.svg";

interface ResourceCard {
    id: string;
    title: string;
    type: "Video" | "PDF" | "HTML" | "Epub";
    image: string;
}

const ResourceCenter = () => {
    const { t } = useAppI18n();

    return (
        <section className="pt-6 md:pt-8 pb-0 bg-sunbird-ivory">
            <div className="w-full pl-[6.75rem] pr-[5.125rem]">
                {/* Header with lines */}
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="h-px w-16 bg-gray-300" />
                    <div className="text-sm font-medium text-foreground">
                        {t("resource.header")}
                    </div>
                    <div className="h-px w-16 bg-gray-300" />
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-foreground text-center mb-10 md:mb-14">
                    {t("resource.title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Column 1 - Left */}
                    <div className="flex flex-col gap-5">
                        {/* Tall card - Robot Hand */}
                        <ResourceCardComponent
                            id="1"
                            title="Elm Partners with Udacity to Build a Graduate Development Program"
                            type="Video"
                            image={resourceRobotHand}
                            aspectClass="aspect-[360/459]"
                        />
                        {/* Short card - Bitcoin */}
                        <ResourceCardComponent
                            id="4"
                            title="Bitcoin Engineering Foundations"
                            type="Epub"
                            image={resourceBitcoin}
                            aspectClass="aspect-[5/4]"
                        />
                    </div>

                    {/* Column 2 - Middle */}
                    <div className="flex flex-col gap-5">
                        {/* Short card - VR */}
                        <ResourceCardComponent
                            id="2"
                            title="Data Engineering Foundations"
                            type="PDF"
                            image={resourceVR}
                            aspectClass="aspect-[4/3]"
                        />
                        {/* Tall card - Hacker */}
                        <ResourceCardComponent
                            id="5"
                            title="Generative AI for Cybersecurity Professionals"
                            type="Video"
                            image={resourceHacker}
                            aspectClass="aspect-[360/459]"
                        />
                    </div>

                    {/* Column 3 - Right */}
                    <div className="flex flex-col gap-5">
                        {/* Tall card - Hardware */}
                        <ResourceCardComponent
                            id="3"
                            title="Generative AI for Cybersecurity Professionals"
                            type="HTML"
                            image={resourceHardware}
                            aspectClass="aspect-[360/459]"
                        />
                        {/* Short card - Ethereum */}
                        <ResourceCardComponent
                            id="6"
                            title="Data Engineering Foundations"
                            type="Video"
                            image={resourceEthereum}
                            aspectClass="aspect-[4/3]"
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
    aspectClass,
}: {
    id: string;
    title: string;
    type: "Video" | "PDF" | "HTML" | "Epub";
    image: string;
    aspectClass: string;
}) => {
    const { t, isRTL } = useAppI18n();

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
        <Link to={`/course/${id}`} className="block w-full">
            <div className="group w-full rounded-2xl overflow-hidden cursor-pointer">
                <div className={`relative w-full ${aspectClass}`}>
                    <img
                        src={image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="relative z-10 p-7 flex flex-col h-full items-start">
                        {/* Type Badge */}
                        <span className="inline-block bg-white text-foreground text-[14px] px-4 py-1.5 rounded-[4px] shadow-sm mb-auto">
                            {type}
                        </span>

                        {/* Content */}
                        <div className="w-full mt-auto" style={{ paddingBottom: '90px' }}>
                            <h3
                                className="text-white font-semibold text-lg md:text-xl leading-tight max-w-[92%] text-shadow-card"
                            >
                                {title}
                            </h3>
                            <p
                                className="text-white/90 text-[0.8125rem] md:text-sm font-medium flex items-center gap-2 hover:opacity-80 transition-opacity text-shadow-card-sm"
                                style={{ paddingTop: '45px' }}
                            >
                                {getViewLabel(type)}
                                <FiArrowRight className="w-3.5 h-3.5" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ResourceCenter;
