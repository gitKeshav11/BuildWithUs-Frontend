import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Minus, Star, Crown, Zap, Award } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

const mockLeaderboard = Array.from({ length: 20 }, (_, i) => ({
  rank: i + 1,
  name: ['Alex Chen', 'Sarah Mitchell', 'Rahul Sharma', 'Emma Wilson', 'Marcus Johnson', 'Priya Patel', 'James Lee', 'Aisha Mohammed', 'Carlos Rivera', 'Nina Petrov', 'David Kim', 'Fatima Hassan', 'Tom Anderson', 'Lisa Zhang', 'Omar Abdullah', 'Julia Santos', 'Wei Liu', 'Anna Kowalski', 'Raj Patel', 'Maria Garcia'][i],
  username: `dev${i + 1}`,
  score: Math.floor(10000 - i * 350 + Math.random() * 100),
  change: [2, 5, -1, 3, 1, -2, 4, 0, 2, -3, 1, 6, -1, 2, 0, 3, -2, 1, 4, -1][i],
  badge: ['🏆', '⚡', '🔥', '💎', '🚀', '🌟', '🥇', '💡', '👑', '✨', '🎯', '💎', '🔥', '⚡', '🏆', '🚀', '🌟', '🥇', '💡', '🎯'][i],
  isVerified: i < 8,
  skills: [['React', 'Node.js'], ['Vue', 'Python'], ['Java', 'AWS'], ['DevOps', 'K8s'], ['Mobile', 'Flutter'], ['ML', 'Python'], ['Blockchain', 'Rust'], ['Cloud', 'Go'], ['React', 'TypeScript'], ['Python', 'FastAPI']][i % 10],
}));

const badges = [
  { icon: '🏆', name: 'Top Builder', desc: 'Built 10+ projects', color: 'amber' },
  { icon: '🔥', name: 'Code Master', desc: 'Perfect code review score', color: 'red' },
  { icon: '⚡', name: 'Speed Hacker', desc: 'Won 3+ hackathons', color: 'yellow' },
  { icon: '💎', name: 'Elite Dev', desc: 'Top 1% developer', color: 'cyan' },
  { icon: '🚀', name: 'Launcher', desc: 'Shipped 5+ live products', color: 'blue' },
  { icon: '🤝', name: 'Team Player', desc: 'Collaborated on 10+ projects', color: 'green' },
  { icon: '🌟', name: 'Mentor', desc: 'Helped 50+ developers', color: 'purple' },
  { icon: '💡', name: 'Innovator', desc: 'Created breakthrough project', color: 'orange' },
];

export function LeaderboardPage() {
  const [period, setPeriod] = useState<'ALL_TIME' | 'MONTHLY' | 'WEEKLY'>('ALL_TIME');

  return (
    <div className="min-h-screen bg-[#020817]">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Developer{' '}
              <span style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Leaderboard</span>
            </h1>
            <p className="text-slate-400 text-lg">The most active and impactful developers in our community</p>
          </motion.div>

          {/* Period toggle */}
          <div className="flex justify-center mb-10">
            <div className="flex glass rounded-xl p-1 border border-blue-500/20">
              {(['ALL_TIME', 'MONTHLY', 'WEEKLY'] as const).map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    period === p ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}>
                  {p.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            {[mockLeaderboard[1], mockLeaderboard[0], mockLeaderboard[2]].map((entry, podiumIndex) => {
              const actualRank = podiumIndex === 1 ? 1 : podiumIndex === 0 ? 2 : 3;
              const heights = ['h-32', 'h-40', 'h-28'];
              const crowns = ['🥈', '🏆', '🥉'];
              return (
                <motion.div key={entry.rank} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: podiumIndex * 0.1 }}
                  className={`flex flex-col items-center justify-end ${heights[podiumIndex]} glass rounded-2xl border ${
                    actualRank === 1 ? 'border-amber-500/30' : actualRank === 2 ? 'border-slate-500/30' : 'border-orange-500/30'
                  } p-4`}>
                  <span className="text-2xl mb-2">{crowns[podiumIndex]}</span>
                  <Avatar name={entry.name} size="md" isVerified={entry.isVerified} />
                  <div className="text-white font-semibold text-sm mt-2 text-center">{entry.name.split(' ')[0]}</div>
                  <div className="text-blue-400 font-bold text-sm">{entry.score.toLocaleString()}</div>
                  <div className="text-slate-500 text-xs">#{actualRank}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Leaderboard list */}
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {mockLeaderboard.map((entry, i) => (
                  <motion.div key={entry.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }} whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 glass rounded-xl border border-blue-500/10 hover:border-blue-500/20 transition-all">
                    <span className={`text-lg font-bold w-8 text-center ${
                      entry.rank === 1 ? 'text-amber-400' : entry.rank === 2 ? 'text-slate-300' : entry.rank === 3 ? 'text-orange-400' : 'text-slate-500'
                    }`}>#{entry.rank}</span>
                    <Avatar name={entry.name} size="sm" isVerified={entry.isVerified} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm">{entry.name}</span>
                        <span className="text-lg">{entry.badge}</span>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {entry.skills.slice(0, 2).map(s => <Badge key={s} variant="default" size="sm">{s}</Badge>)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{entry.score.toLocaleString()}</div>
                      <div className={`text-xs flex items-center gap-0.5 justify-end ${
                        entry.change > 0 ? 'text-emerald-400' : entry.change < 0 ? 'text-red-400' : 'text-slate-500'
                      }`}>
                        {entry.change > 0 ? <TrendingUp className="w-3 h-3" /> : entry.change < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                        {Math.abs(entry.change)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Achievement Badges</h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, i) => (
                  <motion.div key={badge.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.05 }}
                    className="glass rounded-xl p-4 border border-blue-500/10 text-center">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="text-white font-semibold text-xs mb-1">{badge.name}</div>
                    <div className="text-slate-500 text-xs">{badge.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
