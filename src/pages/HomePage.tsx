import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { AISection } from '../components/home/AISection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CTASection } from '../components/home/CTASection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Users, Briefcase, Trophy, ArrowRight, Code2, GitBranch } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '../components/ui/SectionWrapper';

const ecosystemCategories = [
  { icon: Code2, label: 'Frontend', count: '2.4K devs', color: 'blue' },
  { icon: GitBranch, label: 'Backend', count: '1.8K devs', color: 'purple' },
  { icon: Zap, label: 'DevOps', count: '890 devs', color: 'cyan' },
  { icon: Users, label: 'Mobile', count: '1.2K devs', color: 'orange' },
  { icon: Trophy, label: 'ML/AI', count: '760 devs', color: 'amber' },
  { icon: Briefcase, label: 'Blockchain', count: '430 devs', color: 'green' },
];

const colorMap: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 hover:border-blue-400/40',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 hover:border-purple-400/40',
  cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-400/40',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20 hover:border-orange-400/40',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:border-amber-400/40',
  green: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-400/40',
};

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#020817]">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />

      {/* Ecosystem */}
      <SectionWrapper className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Developer Ecosystem"
            title={`Find developers by <span style="background: linear-gradient(135deg, #60a5fa, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">specialty</span>`}
            subtitle="Browse our diverse community of developers across every technology and domain."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ecosystemCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                <Link
                  to={`/developers?skills=${cat.label}`}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300 ${colorMap[cat.color]}`}
                >
                  <cat.icon className="w-8 h-8" />
                  <div className="text-center">
                    <div className="text-white font-semibold text-sm">{cat.label}</div>
                    <div className="text-xs opacity-70 mt-0.5">{cat.count}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <AISection />

      {/* Hackathon highlight */}
      <SectionWrapper className="py-24 mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-cyan-500" />
                Hackathons & Team Finder
                <span className="w-8 h-px bg-cyan-500" />
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Find your perfect{' '}
                <span style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  team
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Discover upcoming hackathons and connect with the right teammates. 
                Post your skills or find the exact expertise your team needs.
              </p>
              <div className="flex gap-4">
                <Link to="/hackathons">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
                  >
                    <Zap className="w-4 h-4" />
                    Browse Hackathons
                  </motion.button>
                </Link>
                <Link to="/team-finder">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    className="flex items-center gap-2 px-6 py-3 glass border border-cyan-500/20 text-cyan-400 rounded-xl font-semibold hover:border-cyan-400/40 transition-all"
                  >
                    <Users className="w-4 h-4" />
                    Find a Team
                  </motion.button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Global AI Hackathon 2025', prize: '$50,000', teams: 234, deadline: '3 days left', color: 'blue' },
                { title: 'Web3 Build Sprint', prize: '$25,000', teams: 156, deadline: '1 week left', color: 'purple' },
                { title: 'Climate Tech Challenge', prize: '$30,000', teams: 89, deadline: '2 weeks left', color: 'green' },
                { title: 'FinTech Innovation Cup', prize: '$40,000', teams: 178, deadline: '5 days left', color: 'orange' },
              ].map((hack, i) => (
                <motion.div
                  key={hack.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-4 border border-blue-500/10"
                >
                  <div className="text-xs text-blue-400 font-semibold mb-2">{hack.deadline}</div>
                  <div className="text-white font-semibold text-sm mb-1">{hack.title}</div>
                  <div className="text-emerald-400 font-bold">{hack.prize}</div>
                  <div className="text-slate-500 text-xs mt-1">{hack.teams} teams registered</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Leaderboard preview */}
      <SectionWrapper className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              {[
                { rank: 1, name: 'Alex Chen', score: 9840, badge: '🏆', change: '+2' },
                { rank: 2, name: 'Sarah Mitchell', score: 9210, badge: '⚡', change: '+5' },
                { rank: 3, name: 'Rahul Sharma', score: 8750, badge: '🔥', change: '-1' },
                { rank: 4, name: 'Emma Wilson', score: 8340, badge: '💎', change: '+3' },
                { rank: 5, name: 'Marcus Johnson', score: 7920, badge: '🚀', change: '+1' },
              ].map((entry, i) => (
                <motion.div
                  key={entry.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 glass rounded-xl mb-3 border border-blue-500/10 hover:border-blue-500/20 transition-colors"
                >
                  <span className={`text-lg font-bold w-8 text-center ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-orange-400' : 'text-slate-500'}`}>
                    #{entry.rank}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm">
                    {entry.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{entry.name}</div>
                    <div className="text-slate-500 text-xs">{entry.score.toLocaleString()} pts</div>
                  </div>
                  <span className="text-lg">{entry.badge}</span>
                  <span className={`text-xs font-semibold ${entry.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {entry.change}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-amber-500" />
                Leaderboard & Badges
                <span className="w-8 h-px bg-amber-500" />
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Earn recognition,{' '}
                <span style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  climb the ranks
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Every contribution counts. Build projects, help others, win hackathons, 
                and earn exclusive badges that showcase your expertise.
              </p>
              <Link to="/leaderboard">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/20"
                >
                  <Trophy className="w-4 h-4" />
                  View Full Leaderboard
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
