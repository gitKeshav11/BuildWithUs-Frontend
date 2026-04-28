import { motion } from 'framer-motion';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import {
  Code2, Briefcase, Users, Shield, Bot, Zap, ArrowRight,
  TrendingUp, Star, Bell, FolderOpen, CheckCircle
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Avatar } from '../components/ui/Avatar';

const quickActions = [
  { icon: Code2, label: 'AI Code Review', href: '/dashboard/code-review', color: 'blue', desc: 'Review your code instantly' },
  { icon: Bot, label: 'AI Assistant', href: '/dashboard/ai-chat', color: 'purple', desc: 'Chat with your dev AI' },
  { icon: FolderOpen, label: 'New Project', href: '/dashboard/projects/create', color: 'cyan', desc: 'Share what you\'re building' },
  { icon: Zap, label: 'Hackathons', href: '/dashboard/hackathons', color: 'orange', desc: 'Find your next challenge' },
];

const colorMap: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-500/15 border-blue-500/20',
  purple: 'text-purple-400 bg-purple-500/15 border-purple-500/20',
  cyan: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/20',
  orange: 'text-orange-400 bg-orange-500/15 border-orange-500/20',
};

export function DashboardPage() {
  const { user } = useAuthStore();

  const statCards = [
    { label: 'Followers', value: user?.followersCount || 0, icon: Users, color: 'blue' },
    { label: 'Following', value: user?.followingCount || 0, icon: Star, color: 'purple' },
    { label: 'Projects', value: user?.projectsCount || 0, icon: FolderOpen, color: 'cyan' },
    { label: 'Score', value: user?.leaderboardScore || 0, icon: TrendingUp, color: 'orange' },
  ];

  const profileCompletion = [
    { label: 'Profile Photo', done: !!user?.profilePhotoUrl },
    { label: 'Bio', done: !!user?.bio },
    { label: 'Skills Added', done: (user?.skills?.length || 0) > 0 },
    { label: 'GitHub Linked', done: !!user?.githubUrl },
    { label: 'LinkedIn Linked', done: !!user?.linkedinUrl },
  ];
  const completedCount = profileCompletion.filter(p => p.done).length;
  const completionPercent = Math.round((completedCount / profileCompletion.length) * 100);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, <span className="text-blue-400">{user?.fullName?.split(' ')[0] || 'Developer'}</span> 👋
            </h1>
            <p className="text-slate-400 mt-1">Here's what's happening in your world</p>
          </div>
          <Link to="/dashboard/notifications" className="relative p-2.5 glass rounded-xl border border-blue-500/20 text-slate-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 border border-blue-500/10"
            >
              <div className={`w-10 h-10 rounded-xl ${colorMap[stat.color]} border flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</div>
              <div className="text-sm text-slate-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <Link
                    to={action.href}
                    className={`flex flex-col gap-3 p-5 rounded-2xl border ${colorMap[action.color]} transition-all duration-300 hover:shadow-lg`}
                  >
                    <action.icon className="w-6 h-6" />
                    <div>
                      <div className="text-white font-semibold text-sm">{action.label}</div>
                      <div className="text-xs opacity-70 mt-0.5">{action.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 self-end" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Profile Completion */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Profile Completion</h2>
            <div className="glass rounded-2xl p-5 border border-blue-500/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-sm">Progress</span>
                <span className="text-blue-400 font-bold">{completionPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full mb-5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercent}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                />
              </div>
              <div className="space-y-2">
                {profileCompletion.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <CheckCircle className={`w-4 h-4 ${item.done ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className={`text-sm ${item.done ? 'text-slate-300' : 'text-slate-500'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
              <Link to="/dashboard/profile/edit" className="mt-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
                Complete Profile <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        {user?.verificationStatus !== 'APPROVED' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-5 border border-amber-500/20 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">Get Verified</div>
              <div className="text-slate-400 text-sm mt-0.5">Stand out with a verified badge and unlock exclusive features</div>
            </div>
            <Link to="/dashboard/verification">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-500/30 transition-colors"
              >
                Apply Now
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
