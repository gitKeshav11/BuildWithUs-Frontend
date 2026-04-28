import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Pages
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { DevelopersPage } from './pages/DevelopersPage';
import { DeveloperProfilePage } from './pages/DeveloperProfilePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { JobsPage } from './pages/JobsPage';
import { HackathonsPage } from './pages/HackathonsPage';
import { TeamFinderPage } from './pages/TeamFinderPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AICodeReviewPage } from './pages/dashboard/AICodeReviewPage';
import { AIChatPage } from './pages/dashboard/AIChatPage';
import { ProfileEditPage } from './pages/dashboard/ProfileEditPage';
import { VerificationPage } from './pages/dashboard/VerificationPage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { ProjectsCreatePage } from './pages/dashboard/ProjectsCreatePage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { OAuthCallbackPage } from './pages/OAuthCallbackPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function getStoredUser() {
  try {
    const rawUser = localStorage.getItem('bwu_user');
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
}

function isAuthenticated() {
  const token = localStorage.getItem('bwu_access_token');
  const user = getStoredUser();
  return !!token && !!user;
}

function isAdmin() {
  const user = getStoredUser();
  if (!user) return false;

  if (Array.isArray(user.roles)) {
    return user.roles.includes('ADMIN');
  }

  if (typeof user.role === 'string') {
    return user.role === 'ADMIN';
  }

  return false;
}

function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

function AdminRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />;
  }

  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/developers" element={<DevelopersPage />} />
      <Route path="/developers/:username" element={<DeveloperProfilePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/hackathons" element={<HackathonsPage />} />
      <Route path="/team-finder" element={<TeamFinderPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />

      {/* Auth */}
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/oauth2/redirect" element={<OAuthCallbackPage />} />

      {/* Dashboard protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/profile" element={<DeveloperProfilePage />} />
        <Route path="/dashboard/profile/edit" element={<ProfileEditPage />} />
        <Route path="/dashboard/projects" element={<ProjectsPage />} />
        <Route path="/dashboard/projects/create" element={<ProjectsCreatePage />} />
        <Route path="/dashboard/jobs/saved" element={<JobsPage />} />
        <Route path="/dashboard/code-review" element={<AICodeReviewPage />} />
        <Route path="/dashboard/ai-chat" element={<AIChatPage />} />
        <Route path="/dashboard/verification" element={<VerificationPage />} />
        <Route path="/dashboard/hackathons" element={<HackathonsPage />} />
        <Route path="/dashboard/team-posts" element={<TeamFinderPage />} />
        <Route path="/dashboard/notifications" element={<NotificationsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/following" element={<DevelopersPage />} />
        <Route path="/dashboard/followers" element={<DevelopersPage />} />
        <Route path="/dashboard/collaborations" element={<ProjectsPage />} />
      </Route>

      {/* Admin protected */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminDashboard />} />
        <Route path="/admin/jobs" element={<AdminDashboard />} />
        <Route path="/admin/verifications" element={<AdminDashboard />} />
        <Route path="/admin/projects" element={<AdminDashboard />} />
        <Route path="/admin/hackathons" element={<AdminDashboard />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0f172a',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              color: '#e2e8f0',
            },
          }}
          richColors
        />
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;