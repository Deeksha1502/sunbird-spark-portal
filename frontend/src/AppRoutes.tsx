import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { withRoles } from './rbac/withRoles';

import UnauthorizedPage from './pages/UnauthorizedPage';
import AdminPage from './pages/AdminPage';
import WorkspacePage from './pages/WorkspacePage';
import ReportsPage from './pages/ReportsPage';
import CreateContentPage from './pages/CreateContentPage';
import Index from './pages/Index';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import Courses from './pages/Courses';
import Explore from './pages/Explore';
import CollectionDetail from './pages/CollectionDetail';
import Search from './pages/Search';
import SearchResults from './pages/SearchResults';
import ContentRead from './pages/ContentRead';
import LessonPlayer from './pages/LessonPlayer';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import MyLearning from './pages/MyLearning';
import Profile from './pages/Profile'
import Workspace from './pages/Workspace';
import NotFound from './pages/NotFound';
import CourseDetail from './pages/CourseDetail';
import Onboarding from './pages/Onboarding';

import ScrollToHash from './components/ScrollToHash';

const AdminProtected = withRoles(['admin'])(AdminPage);
const WorkspaceProtected = withRoles(['content_creator', 'content_reviewer'])(WorkspacePage);
const ReportsProtected = withRoles(['admin'])(ReportsPage);
const CreateContentProtected = withRoles(['content_creator'])(CreateContentPage);

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <ScrollToHash />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/collection/:collectionId" element={<CollectionDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/content/:contentId" element={<ContentRead />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPlayer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />


        {/* Protected routes */}
        <Route path="/admin" element={<AdminProtected />} />
        <Route path="/workspace" element={<WorkspaceProtected />} />
        <Route path="/reports" element={<ReportsProtected />} />
        <Route path="/create" element={<CreateContentProtected />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
