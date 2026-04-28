import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, ChevronDown, Menu, X, Code2, Zap, Users, Briefcase,
  Trophy, Bot, LogOut, Settings, User, LayoutDashboard
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../ui/Avatar';
import { GlowButton } from '../ui/GlowButton';

const navLinks = [
  { label: 'Developers', href: '/developers', icon: Users },
  { label: 'Projects', href: '/projects', icon: Code2 },
  { label: 'Jobs', href: '/jobs', icon: Briefcase },
  { label: 'Hackathons', href: '/hackathons', icon: Zap },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { label: 'AI Tools', href: '/dashboard/ai-chat', icon: Bot },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong border-b border-blue-500/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src="/uploads/upload_1.png"
              alt="Build With Us"
              className="h-9 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
            <motion.span
              className="text-white font-bold text-lg hidden sm:block"
              whileHover={{ color: '#60a5fa' }}
            >
              Build <span className="text-blue-400">With Us</span>
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  location.pathname === link.href
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </span>
                {location.pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Area */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                {/* Notifications */}
                <Link
                  to="/dashboard/notifications"
                  className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <Avatar src={user.profilePhotoUrl} name={user.fullName} size="sm" isVerified={user.isVerified} />
                    <span className="hidden md:block text-sm text-white font-medium">{user.fullName.split(' ')[0]}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-2xl border border-blue-500/10 overflow-hidden shadow-xl"
                      >
                        <div className="p-3 border-b border-blue-500/10">
                          <p className="text-sm font-semibold text-white">{user.fullName}</p>
                          <p className="text-xs text-slate-400">@{user.username}</p>
                        </div>
                        <div className="p-2">
                          {[
                            { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
                            { icon: User, label: 'Profile', href: `/developers/${user.username}` },
                            { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <item.icon className="w-4 h-4 text-blue-400" />
                              {item.label}
                            </Link>
                          ))}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth/sign-in"
                  className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
                >
                  Sign In
                </Link>
                <GlowButton size="sm" onClick={() => navigate('/auth/sign-up')}>
                  Get Started
                </GlowButton>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-blue-500/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <link.icon className="w-4 h-4 text-blue-400" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {!isAuthenticated && (
                <div className="pt-4 flex flex-col gap-2">
                  <Link to="/auth/sign-in" className="px-4 py-3 text-center text-slate-300 hover:text-white border border-blue-500/20 rounded-xl">
                    Sign In
                  </Link>
                  <Link to="/auth/sign-up" className="px-4 py-3 text-center text-white bg-blue-600 rounded-xl font-semibold">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
