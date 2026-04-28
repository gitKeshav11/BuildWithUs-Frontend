import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Plus, Zap, ArrowRight, UserPlus } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Badge } from '../components/ui/Badge';
import { GlowButton } from '../components/ui/GlowButton';
import { Avatar } from '../components/ui/Avatar';

const mockTeamPosts = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1),
  title: ['Looking for React + AI teammates for Global AI Hackathon', 'Need Backend Dev for FinTech Sprint', 'Building a Web3 team for ETHGlobal', 'Solo dev looking for a team to join', 'Need ML Engineer for Climate Hackathon', 'Full team except designer needed', 'Looking for co-founder for EdTech startup', 'React Native dev looking for backend partner', 'Need DevOps for weekend hackathon'][i],
  description: 'We are building something amazing and need the right people to join our mission. Come build with us!',
  type: ['LOOKING_FOR_MEMBERS', 'LOOKING_FOR_MEMBERS', 'LOOKING_FOR_MEMBERS', 'LOOKING_FOR_TEAM', 'LOOKING_FOR_MEMBERS', 'LOOKING_FOR_MEMBERS', 'LOOKING_FOR_TEAM', 'LOOKING_FOR_TEAM', 'LOOKING_FOR_MEMBERS'][i] as any,
  rolesNeeded: [['React Dev', 'AI Engineer'], ['Backend Dev', 'Node.js'], ['Solidity Dev', 'Web3'], ['Any Stack'], ['ML Engineer', 'Data Scientist'], ['UI/UX Designer'], ['Co-founder', 'Backend Dev'], ['Backend Dev', 'API'], ['DevOps', 'AWS']][i],
  teamSize: [4, 3, 5, 4, 3, 4, 2, 3, 4][i],
  currentSize: [2, 1, 3, 1, 2, 3, 1, 1, 3][i],
  owner: { fullName: ['Alex Chen', 'Sarah M', 'Rahul S', 'Emma W', 'Marcus J', 'Priya P', 'James L', 'Aisha M', 'Carlos R'][i], username: `dev${i + 1}`, isVerified: i % 3 === 0 },
  hackathon: i < 6 ? { title: ['Global AI Hackathon', 'FinTech Sprint', 'ETHGlobal', '', 'Climate Hack', 'EdTech Cup'][i] } : null,
}));

export function TeamFinderPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'LOOKING_FOR_TEAM' | 'LOOKING_FOR_MEMBERS'>('ALL');

  const filtered = mockTeamPosts
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(p => filter === 'ALL' || p.type === filter);

  return (
    <div className="min-h-screen bg-[#020817]">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white mb-2">
                Team <span style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Finder</span>
              </motion.h1>
              <p className="text-slate-400">Find your perfect hackathon team or recruit talented developers</p>
            </div>
            <GlowButton>
              <Plus className="w-4 h-4" />
              Post Your Team
            </GlowButton>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search teams or roles..."
                className="w-full pl-12 pr-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors" />
            </div>
            <div className="flex gap-2">
              {[['ALL', 'All'], ['LOOKING_FOR_TEAM', 'Need Team'], ['LOOKING_FOR_MEMBERS', 'Need Members']].map(([val, label]) => (
                <button key={val} onClick={() => setFilter(val as any)}
                  className={`px-4 py-3 rounded-xl border transition-all text-sm font-medium whitespace-nowrap ${
                    filter === val ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' : 'glass border-blue-500/20 text-slate-400 hover:text-white'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }} whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 border border-blue-500/10 hover:border-blue-500/20 transition-all flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={post.type === 'LOOKING_FOR_TEAM' ? 'orange' : 'blue'} size="sm">
                    {post.type === 'LOOKING_FOR_TEAM' ? '🔍 Need Team' : '👥 Need Members'}
                  </Badge>
                  {post.hackathon && (
                    <Badge variant="purple" size="sm">
                      <Zap className="w-3 h-3" />
                      {post.hackathon.title}
                    </Badge>
                  )}
                </div>

                <h3 className="text-white font-bold mb-2 leading-tight">{post.title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-1">{post.description}</p>

                <div className="mb-4">
                  <div className="text-xs text-slate-500 mb-2">Roles Needed</div>
                  <div className="flex flex-wrap gap-1.5">
                    {post.rolesNeeded.map((role) => (
                      <Badge key={role} variant="cyan" size="sm">{role}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={post.owner.fullName} size="xs" isVerified={post.owner.isVerified} />
                    <span className="text-slate-400 text-xs">{post.owner.fullName}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    <Users className="w-3 h-3 inline mr-1" />
                    {post.currentSize}/{post.teamSize} members
                  </div>
                </div>

                {/* Team size bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                    style={{ width: `${(post.currentSize / post.teamSize) * 100}%` }}
                  />
                </div>

                <GlowButton size="sm" variant="outline" className="w-full justify-center">
                  <UserPlus className="w-3.5 h-3.5" />
                  {post.type === 'LOOKING_FOR_TEAM' ? 'Invite to Team' : 'Request to Join'}
                </GlowButton>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
