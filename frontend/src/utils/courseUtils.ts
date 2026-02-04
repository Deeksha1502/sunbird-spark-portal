export interface Lesson {
    id: string;
    title: string;
    duration: string;
    isCompleted: boolean;
    isLocked: boolean;
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

const getLessonTitle = (index: number) => {
    const titles = [
        "Introduction & Overview",
        "Getting Started",
        "Core Concepts",
        "Fundamental Principles",
        "Practical Applications",
        "Advanced Techniques",
        "Best Practices",
        "Case Studies",
        "Hands-on Project",
        "Review & Assessment",
        "Deep Dive Analysis",
        "Expert Insights",
    ];
    return titles[(index - 1) % titles.length];
};

const getModuleTitle = (index: number) => {
    const titles = [
        "Foundation & Basics",
        "Core Competencies",
        "Intermediate Skills",
        "Advanced Concepts",
        "Professional Application",
        "Mastery & Certification",
    ];
    return titles[(index - 1) % titles.length];
};

export const generateLessons = (courseId: string, totalLessons: number): Module[] => {
    const modules = Math.ceil(totalLessons / 8);
    const modulesData: Module[] = [];

    let lessonIndex = 1;
    for (let m = 1; m <= modules; m++) {
        const lessonsInModule = Math.min(8, totalLessons - (m - 1) * 8);
        const lessons: Lesson[] = [];

        for (let l = 1; l <= lessonsInModule; l++) {
            const isCompleted = Math.random() > 0.6; // Random completion for demo
            lessons.push({
                id: `${courseId}-${lessonIndex}`,
                title: `Lesson ${lessonIndex}: ${getLessonTitle(lessonIndex)}`,
                duration: `${Math.floor(Math.random() * 20) + 5} min`,
                isCompleted,
                isLocked: lessonIndex > 3 && !isCompleted && Math.random() > 0.5,
            });
            lessonIndex++;
        }

        modulesData.push({
            id: `module-${m}`,
            title: `Module ${m}: ${getModuleTitle(m)}`,
            lessons,
        });
    }

    return modulesData;
};
