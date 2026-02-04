import { useNavigate } from "react-router-dom";

const inProgressItems = [
    {
        id: "1",
        type: "Course",
        title: "Data Engineering Foundations",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=120&fit=crop",
        progress: 70,
    },
    {
        id: "2",
        type: "Textbook",
        title: "The AI Engineer Course 2026: Compl...",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=120&fit=crop",
        progress: 30,
    },
    {
        id: "3",
        type: "Textbook",
        title: "The AI Engineer Course 2026: Compl...",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=120&fit=crop",
        progress: 30,
    },
    {
        id: "4",
        type: "Course",
        title: "Data Engineering Foundations",
        thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=200&h=120&fit=crop",
        progress: 50,
    },
    {
        id: "5",
        type: "Textbook",
        title: "The AI Engineer Course 2026: Compl...",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=120&fit=crop",
        progress: 80,
    },
    {
        id: "6",
        type: "Textbook",
        title: "The AI Engineer Course 2026: Compl...",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=120&fit=crop",
        progress: 80,
    },
];

const HomeInProgressGrid = () => {
    const navigate = useNavigate();

    return (
        <section className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">In Progress Contents</h3>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inProgressItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/course/${item.id}`)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                {/* Type Badge */}
                                <span className="inline-block mb-2 text-xs font-medium px-3 py-1 rounded-full bg-sunbird-ivory border border-sunbird-ginger text-foreground">
                                    {item.type}
                                </span>

                                {/* Title */}
                                <h4 className="font-medium text-foreground text-sm line-clamp-2 mb-2">
                                    {item.title}
                                </h4>

                                {/* Progress Bar */}
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-sunbird-brick rounded-full"
                                            style={{ width: `${item.progress}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-400 shrink-0">{item.progress}%</span>
                                </div>
                            </div>

                            {/* Thumbnail */}
                            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeInProgressGrid;
