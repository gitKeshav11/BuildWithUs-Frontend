import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, UserPlus, Linkedin, Github, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { GlowButton } from '../components/ui/GlowButton';
import { profileService } from '../services/profile.service';
import type { Profile } from '../types';

function getSkillName(skill: any): string {
  return typeof skill === 'string' ? skill : skill?.name || '';
}

export function DevelopersPage() {
  const [search, setSearch] = useState('');
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [developers, setDevelopers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDevelopers = async () => {
    try {
      setLoading(true);

      const response = await profileService.getAllDevelopers({
        page: 0,
        size: 100,
      });

      setDevelopers(response.content ?? []);
    } catch (error) {
      console.error('Failed to load developers:', error);
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const filtered = developers
    .filter((dev) => {
      const q = search.toLowerCase();
      const skills = (dev.skills ?? []).map(getSkillName);

      return (
        dev.fullName?.toLowerCase().includes(q) ||
        dev.username?.toLowerCase().includes(q) ||
        dev.headline?.toLowerCase().includes(q) ||
        skills.some((s) => s.toLowerCase().includes(q))
      );
    })
    .filter((dev) => !filterAvailable || dev.isAvailable);

  return (
    <div className="min-h-screen bg-[#020817]">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold text-white mb-3">
              Developer{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Community
              </span>
            </h1>
            <p className="text-slate-400 text-lg">
              Discover and connect with real developers from your platform
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, skill, or technology..."
                className="w-full pl-12 pr-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={() => setFilterAvailable(!filterAvailable)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all font-medium ${
                filterAvailable
                  ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                  : 'glass border-blue-500/20 text-slate-400 hover:text-white'
              }`}
            >
              <Filter className="w-4 h-4" />
              Available Only
            </button>
          </div>

          {loading ? (
            <div className="text-center text-slate-400 py-20">Loading developers...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-slate-400 py-20">No developers found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((dev, i) => {
                const skills = (dev.skills ?? []).map(getSkillName).filter(Boolean);
                const profileUrl = `/developers/${dev.username}`;

                return (
                  <motion.div
                    key={dev.id || dev.username}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="glass rounded-2xl p-5 border border-blue-500/10 hover:border-blue-500/20 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Avatar
                        name={dev.fullName || dev.username || 'User'}
                        src={dev.profilePhotoUrl}
                        size="lg"
                        isVerified={dev.isVerified || dev.emailVerified}
                      />

                      {dev.isAvailable && (
                        <Badge variant="green">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Available
                        </Badge>
                      )}
                    </div>

                    <Link to={profileUrl}>
                      <h3 className="text-white font-bold hover:text-blue-400 transition-colors">
                        {dev.fullName || dev.username || 'Unknown Developer'}
                      </h3>
                    </Link>

                    <p className="text-slate-400 text-sm mt-0.5 mb-3">
                      {dev.headline || 'Developer'}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {skills.length > 0 ? (
                        skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="blue" size="sm">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="default" size="sm">
                          No skills added
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span>
                        <Users className="w-3 h-3 inline mr-1" />
                        {dev.followersCount ?? 0} followers
                      </span>
                      <span>{dev.projectsCount ?? 0} projects</span>
                    </div>

                    <div className="flex gap-2 mb-3">
                      {dev.linkedinUrl && (
                        <a
                          href={dev.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-blue-500/20 text-blue-400 hover:bg-blue-500/10 text-sm"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          LinkedIn
                        </a>
                      )}

                      {dev.githubUrl && (
                        <a
                          href={dev.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center px-3 py-2 rounded-xl border border-slate-500/20 text-slate-300 hover:bg-white/5"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {dev.portfolioUrl && (
                        <a
                          href={dev.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center px-3 py-2 rounded-xl border border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <GlowButton size="sm" variant="outline" className="w-full justify-center">
                      <UserPlus className="w-3.5 h-3.5" />
                      Follow
                    </GlowButton>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}