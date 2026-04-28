import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Users, Briefcase, FolderOpen, Zap, TrendingUp, Shield, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Users', value: '12,450', icon: Users, color: 'blue', change: '+124 today' },
  { label: 'Total Projects', value: '3,820', icon: FolderOpen, color: 'purple', change: '+38 today' },
  { label: 'Active Jobs', value: '1,240', icon: Briefcase, color: 'orange', change: '+12 today' },
  { label: 'Hackathons', value: '89', icon: Zap, color: 'cyan', change: '+2 this week' },
];

const colorMap: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-500/15 border-blue-500/20',
  purple: 'text-purple-400 bg-purple-500/15 border-purple-500/20',
  orange: 'text-orange-400 bg-orange-500/15 border-orange-500/20',
  cyan: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/20',
};

export function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
          <p className="text-slate-400">Platform overview and management</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 border border-blue-500/10">
              <div className={`w-10 h-10 rounded-xl ${colorMap[stat.color]} border flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{stat.label}</div>
              <div className="text-xs text-emerald-400 mt-1">{stat.change}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6 border border-blue-500/10">
            <h3 className="text-white font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Manage Users', href: '/admin/users', icon: Users },
                { label: 'Manage Jobs', href: '/admin/jobs', icon: Briefcase },
                { label: 'Verifications', href: '/admin/verifications', icon: Shield },
                { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
              ].map((action) => (
                <Link key={action.href} to={action.href}
                  className="flex items-center gap-3 p-4 glass rounded-xl border border-blue-500/10 hover:border-blue-500/20 transition-all text-slate-300 hover:text-white">
                  <action.icon className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-amber-500/20">
            <h3 className="text-white font-bold mb-4">Pending Verifications</h3>
            <div className="space-y-3">
              {['Alex Chen', 'Sarah Mitchell', 'Rahul Sharma'].map((name, i) => (
                <div key={name} className="flex items-center gap-3 p-3 glass rounded-xl border border-blue-500/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{name}</div>
                    <div className="text-slate-500 text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> Pending review</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 bg-emerald-500/15 border border-emerald-500/20 rounded-lg text-emerald-400 hover:bg-emerald-500/25">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
