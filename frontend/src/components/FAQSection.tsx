import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/accordion";
import faqImage from "@/assets/faq-image.png";
import { useAppI18n } from "@/hooks/useAppI18n";

const FAQSection = () => {
    const { t } = useAppI18n();
    const faqs = [
        {
            question: "What kind of courses are available on this platform?",
            answer: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
        },
        {
            question: "What if I need help during the course?",
            answer: "Our dedicated support team is available 24/7 to assist you. You can reach out through our help center, community forums, or contact us directly via email.",
        },
        {
            question: "Are the courses accredited or do they offer certification?",
            answer: "Yes, many of our courses offer industry-recognized certifications upon completion. Check each course page for specific certification details.",
        },
        {
            question: "Can I learn in offline mode?",
            answer: "Absolutely! Our mobile app allows you to download course content and learn offline at your convenience. Perfect for learning on the go.",
        },
        {
            question: "Who are the trainers?",
            answer: "Our trainers are industry experts with years of practical experience. Each trainer is carefully vetted to ensure high-quality instruction.",
        },
    ];

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* FAQ Accordion */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
                            {t("faq.title")}
                        </h2>

                        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="rounded-xl px-5 border border-border/50 bg-white shadow-sm"
                                >
                                    <AccordionTrigger className="text-left text-[14px] md:text-[15px] font-medium hover:no-underline py-4 text-foreground">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-[13px] pb-4 text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Image */}
                    <div className="hidden lg:flex justify-end">
                        <img
                            src={faqImage}
                            alt="Student learning online"
                            className="w-full max-w-md h-auto object-cover rounded-3xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
