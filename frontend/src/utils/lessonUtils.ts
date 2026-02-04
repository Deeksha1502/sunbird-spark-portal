export type ContentFilter = "all" | "video" | "interactive" | "doc";

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    contentType: "video" | "interactive" | "doc";
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export const generateLessons = (courseId: string, totalLessons: number): Module[] => {
    const modules = Math.ceil(totalLessons / 8);
    const modulesData: Module[] = [];

    let lessonIndex = 1;
    for (let m = 1; m <= modules; m++) {
        const lessonsInModule = Math.min(8, totalLessons - (m - 1) * 8);
        const lessons: Lesson[] = [];

        for (let l = 1; l <= lessonsInModule; l++) {
            const contentTypes = ["video", "interactive", "doc"];
            const contentType = contentTypes[Math.floor(Math.random() * 3)] as "video" | "interactive" | "doc";
            lessons.push({
                id: `${courseId}-${lessonIndex}`,
                title: `Content-${lessonIndex}00MB-Mp4`,
                duration: `${Math.floor(Math.random() * 20) + 5} min`,
                contentType,
            });
            lessonIndex++;
        }

        modulesData.push({
            id: `module-${m}`,
            title: `Textbook Unit${m}`,
            lessons,
        });
    }

    return modulesData;
};
