// Global type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  uptime: number;
  version: string;
}

export interface DashboardCourse {
    id: string;
    title: string;
    author: string;
    thumbnail: string;
    badges: string[];
    category: string;
    language: string;
    rating: number;
    duration: string;
}

export interface DashboardNotification {
    id: string;
    message: string;
    date: string;
}

export interface Lesson {
    id: string;
    title: string;
    description?: string;
    duration: string;
    thumbnail?: string;
    videoUrl?: string;
    isCompleted?: boolean;
    isLocked?: boolean;
}

export type ContentType = "Course" | "Textbook" | "Video" | "PDF" | "Epub" | "Collection" | "Resource" | "Content Playlist" | "Course Assessment" | "Digital Textbook";

export interface SearchItem {
    id: string;
    title: string;
    image: string;
    type: ContentType | string;
    rating?: number;
    learners?: string;
    lessons?: number;
    lastUpdatedOn?: string;
    description?: string;
    isResource?: boolean;
}

export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  enableLogging: boolean;
  features: {
    enableDarkMode: boolean;
    enableNotifications: boolean;
    enableAnalytics: boolean;
  };
}

export interface LocaleData {
  [key: string]: string | LocaleData;
}

export type Theme = 'light' | 'dark' | 'auto';