import { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, Code2, Briefcase, Bot, Shield, Zap,
  Users, Bell, Settings, ChevronLeft, ChevronRight, LogOut,
  FolderOpen, MessageSquare, Star, Trophy
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../ui/Avatar';
import type { ReactNode } from 'react';

const sidebarLinks = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
  { label: 'Projects', href: '/dashboard/projects', icon: FolderOpen },
  { label: 'Collaborations', href: '/dashboard/collaborations', icon: Code2 },
  { label: 'Saved Jobs', href: '/dashboard/jobs/saved', icon: Briefcase },
  { label: 'AI Code Review', href: '/dashboard/code-review', icon: Code2 },
  { label: 'AI Assistant', href: '/dashboard/ai-chat', icon: Bot },
  { label: 'Hackathons', href: '/dashboard/hackathons', icon: Zap },
  { label: 'Team Posts', href: '/dashboard/team-posts', icon: Users },
  { label: 'Following', href: '/dashboard/following', icon: Star },
  { label: 'Followers', href: '/dashboard/followers', icon: Users },
  { label: 'Verification', href: '/dashboard/verification', icon: Shield },
  { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#020817]">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 h-full glass-strong border-r border-blue-500/10 z-40 overflow-hidden flex flex-col"
      >
        {/* Logo */}
        <div className="p-4 border-b border-blue-500/10 flex items-center gap-3">
          <Link to="/" className="flex-shrink-0">
            <img src="/uploads/upload_1.png" alt="Build With Us" className="h-8 w-auto" />
          </Link>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-white font-bold text-sm whitespace-nowrap"
              >
                Build <span className="text-blue-400">With Us</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'}`} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-blue-500/10">
          {user && (
            <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors`}>
              <Avatar src={user.profilePhotoUrl} name={user.fullName} size="sm" isVerified={user.isVerified} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 min-w-0"
                  >
                    <p className="text-sm font-semibold text-white truncate">{user.fullName}</p>
                    <p className="text-xs text-slate-400 truncate">@{user.username}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <button
            onClick={() => logout()}
            className={`mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors w-full`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-colors z-10"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        animate={{ marginLeft: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 min-h-screen"
      >
        {children}
      </motion.main>
    </div>
  );
}
