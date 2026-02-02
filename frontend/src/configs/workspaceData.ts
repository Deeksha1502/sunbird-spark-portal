// Workspace Mock Data

export type ContentStatus = 'draft' | 'review' | 'published';
export type ContentType = 'course' | 'content' | 'quiz' | 'collection';

export interface WorkspaceItem {
    id: string;
    title: string;
    description: string;
    type: ContentType;
    status: ContentStatus;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
    author: string;
}

export interface CreateOption {
    id: string;
    title: string;
    description: string;
    icon: string;
    type: ContentType;
}

export const createOptions: CreateOption[] = [
    {
        id: 'course',
        title: 'Course',
        description: 'Design courses using collections and resources. Courses are for a duration, to achieve an objective.',
        icon: 'book-open',
        type: 'course',
    },
    {
        id: 'content',
        title: 'Content',
        description: 'Create different resources like story, game, activity, audio, video, using the inbuilt authoring tools.',
        icon: 'file-text',
        type: 'content',
    },
    {
        id: 'quiz',
        title: 'Quiz',
        description: 'Create assessments with multiple question types to evaluate learner understanding.',
        icon: 'help-circle',
        type: 'quiz',
    },
    {
        id: 'collection',
        title: 'Collection',
        description: 'Compile and organize multiple resources of your choice into a structured collection.',
        icon: 'folder',
        type: 'collection',
    },
];

export const workspaceItems: WorkspaceItem[] = [
    {
        id: '1',
        title: 'Introduction to Leadership',
        description: 'A comprehensive course on modern leadership principles',
        type: 'course',
        status: 'published',
        thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
        createdAt: '2026-01-15T10:30:00Z',
        updatedAt: '2026-01-20T14:45:00Z',
        author: 'Content Creator',
    },
    {
        id: '2',
        title: 'Python Basics Quiz',
        description: 'Assessment for Python fundamentals',
        type: 'quiz',
        status: 'published',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop',
        createdAt: '2026-01-12T09:00:00Z',
        updatedAt: '2026-01-18T16:20:00Z',
        author: 'Content Creator',
    },
    {
        id: '3',
        title: 'Communication Skills Module',
        description: 'Interactive content on effective communication',
        type: 'content',
        status: 'review',
        thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=225&fit=crop',
        createdAt: '2026-01-18T11:15:00Z',
        updatedAt: '2026-01-21T10:30:00Z',
        author: 'Content Creator',
    },
    {
        id: '4',
        title: 'Data Analytics Course',
        description: 'Learn data analysis with practical examples',
        type: 'course',
        status: 'draft',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
        createdAt: '2026-01-20T15:00:00Z',
        updatedAt: '2026-01-22T09:00:00Z',
        author: 'Content Creator',
    },
    {
        id: '5',
        title: 'Project Management Essentials',
        description: 'Core concepts of project management',
        type: 'course',
        status: 'draft',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop',
        createdAt: '2026-01-19T08:30:00Z',
        updatedAt: '2026-01-21T17:45:00Z',
        author: 'Content Creator',
    },
    {
        id: '6',
        title: 'Cloud Computing Quiz',
        description: 'Test your cloud computing knowledge',
        type: 'quiz',
        status: 'review',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop',
        createdAt: '2026-01-17T13:45:00Z',
        updatedAt: '2026-01-20T11:15:00Z',
        author: 'Content Creator',
    },
    {
        id: '7',
        title: 'Design Thinking Workshop',
        description: 'Interactive workshop on design thinking methodology',
        type: 'content',
        status: 'published',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
        createdAt: '2026-01-10T10:00:00Z',
        updatedAt: '2026-01-15T14:30:00Z',
        author: 'Content Creator',
    },
    {
        id: '8',
        title: 'Marketing Fundamentals',
        description: 'Introduction to marketing concepts and strategies',
        type: 'course',
        status: 'published',
        thumbnail: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=225&fit=crop',
        createdAt: '2026-01-08T09:15:00Z',
        updatedAt: '2026-01-12T16:00:00Z',
        author: 'Content Creator',
    },
    {
        id: '9',
        title: 'Cybersecurity Basics',
        description: 'Learn essential cybersecurity practices',
        type: 'content',
        status: 'draft',
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop',
        createdAt: '2026-01-21T11:30:00Z',
        updatedAt: '2026-01-22T08:45:00Z',
        author: 'Content Creator',
    },
    {
        id: '10',
        title: 'Learning Resources Collection',
        description: 'Curated collection of learning materials',
        type: 'collection',
        status: 'published',
        thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop',
        createdAt: '2026-01-05T14:00:00Z',
        updatedAt: '2026-01-10T10:30:00Z',
        author: 'Content Creator',
    },
];

export const getItemsByStatus = (status: ContentStatus) =>
    workspaceItems.filter(item => item.status === status);

export const getItemsByType = (type: ContentType) =>
    workspaceItems.filter(item => item.type === type);

export const getItemCounts = () => ({
    all: workspaceItems.length,
    drafts: workspaceItems.filter(i => i.status === 'draft').length,
    review: workspaceItems.filter(i => i.status === 'review').length,
    published: workspaceItems.filter(i => i.status === 'published').length,
});
