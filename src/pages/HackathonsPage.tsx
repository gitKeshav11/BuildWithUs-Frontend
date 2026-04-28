import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Trophy, Users, MapPin, ExternalLink, Plus, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Badge } from '../components/ui/Badge';
import { GlowButton } from '../components/ui/GlowButton';

const mockHackathons = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  title: ['Global AI Hackathon 2025', 'Web3 Build Sprint', 'Climate Tech Challenge', 'FinTech Innovation Cup', 'HealthTech Hackathon', 'EdTech Global Sprint', 'Cybersecurity Challenge', 'Space Tech Hackathon'][i],
  organizer: ['DevCommunity', 'Web3 Foundation', 'GreenTech Alliance', 'FinTech Hub', 'HealthTech Labs', 'EduTech Global', 'CyberSec Institute', 'SpaceTech Corp'][i],
  prize: ['$50,000', '$25,000', '$30,000', '$40,000', '$35,000', '$20,000', '$45,000', '$60,000'][i],
  startDate: '2025-07-01',
  endDate: '2025-07-03',
  registrationDeadline: '2025-06-28',
  mode: ['ONLINE', 'ONLINE', 'HYBRID', 'OFFLINE', 'ONLINE', 'ONLINE', 'HYBRID', 'ONLINE'][i] as any,
  participantsCount: [1240, 890, 560, 780, 430, 320, 650, 980][i],
  tags: [['AI', 'ML', 'Python'], ['Blockchain', 'Web3', 'Solidity'], ['GreenTech', 'IoT', 'Data'], ['FinTech', 'Payments', 'API'], ['Health', 'ML', 'IoT'], ['EdTech', 'React', 'AI'], ['Security', 'Crypto', 'Network'], ['Space', 'Python', 'Data']][i],
  daysLeft: [3, 7, 14, 5, 21, 10, 2, 30][i],
}));

export function HackathonsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#020817]">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white mb-2">
                <span style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hackathons</span>
              </motion.h1>
              <p className="text-slate-400">Compete, build, and win with the global developer community</p>
            </div>
            <Link to="/team-finder">
              <GlowButton variant="secondary">
                <Users className="w-4 h-4" />
                Find a Team
              </GlowButton>
            </Link>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hackathons..."
              className="w-full pl-12 pr-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockHackathons.filter(h => h.title.toLowerCase().includes(search.toLowerCase())).map((hack, i) => (
              <motion.div key={hack.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} whileHover={{ y: -6 }}
                className="glass rounded-2xl overflow-hidden border border-blue-500/10 hover:border-blue-500/20 transition-all">
                <div className="h-3 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg">{hack.title}</h3>
                      <p className="text-slate-400 text-sm">{hack.organizer}</p>
                    </div>
                    <Badge variant={hack.daysLeft <= 3 ? 'red' : hack.daysLeft <= 7 ? 'orange' : 'green'} size="sm">
                      {hack.daysLeft}d left
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-400 font-bold text-lg">{hack.prize}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hack.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="blue" size="sm">{tag}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-5">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{hack.participantsCount.toLocaleString()} registered</span>
                    <Badge variant={hack.mode === 'ONLINE' ? 'blue' : hack.mode === 'HYBRID' ? 'purple' : 'orange'} size="sm">{hack.mode}</Badge>
                  </div>

                  <GlowButton size="sm" className="w-full justify-center">
                    <Zap className="w-3.5 h-3.5" />
                    Register Now
                  </GlowButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
