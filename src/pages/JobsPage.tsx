import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Bookmark, ExternalLink } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Badge } from '../components/ui/Badge';
import { GlowButton } from '../components/ui/GlowButton';
import { jobsService } from '../services/jobs.service';
import type { Job } from '../types';

const typeColors: Record<string, 'blue' | 'purple' | 'orange' | 'green' | 'cyan'> = {
  FULL_TIME: 'blue',
  PART_TIME: 'purple',
  CONTRACT: 'orange',
  INTERNSHIP: 'green',
  FREELANCE: 'cyan',
};

const modeColors: Record<string, 'green' | 'blue'> = {
  REMOTE: 'green',
  HYBRID: 'blue',
  ONSITE: 'blue',
};

export function JobsPage() {
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [filterMode, setFilterMode] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobsService.getJobs();

        const jobsList = data?.content ?? [];
        setJobs(jobsList);

        const saved = new Set(
          jobsList.filter((j) => j.isSaved).map((j) => j.id)
        );
        setSavedJobs(saved);
      } catch {
        console.error('Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, []);

  const toggleSave = async (id: string) => {
    try {
      if (savedJobs.has(id)) {
        await jobsService.unsaveJob(id);
      } else {
        await jobsService.saveJob(id);
      }

      setSavedJobs((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    } catch {
      console.error('Failed to toggle save');
    }
  };

  const filtered = jobs
    .filter(
      (j) =>
        j.title?.toLowerCase().includes(search.toLowerCase()) ||
        j.companyName?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((j) => !filterMode || j.workMode === filterMode);

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
            <h1 className="text-4xl font-bold text-white mb-2">
              Jobs & <span className="text-orange-400">Internships</span>
            </h1>
            <p className="text-slate-400">Discover top developer opportunities</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs..."
                className="w-full pl-12 pr-4 py-3 glass border border-blue-500/20 rounded-xl text-white"
              />
            </div>

            <div className="flex gap-2">
              {['REMOTE', 'HYBRID', 'ONSITE'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(filterMode === mode ? null : mode)}
                  className={`px-4 py-3 rounded-xl border text-sm ${
                    filterMode === mode
                      ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                      : 'text-slate-400'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-2xl p-6 border border-blue-500/10"
              >
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold">{job.title}</h3>
                    <p className="text-slate-400 text-sm">{job.companyName}</p>
                  </div>

                  <button onClick={() => toggleSave(job.id)}>
                    <Bookmark
                      className={`w-4 h-4 ${
                        savedJobs.has(job.id)
                          ? 'text-blue-400 fill-current'
                          : 'text-slate-500'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-2 mb-3">
                  <Badge variant={typeColors[job.jobType]} size="sm">
                    {job.jobType}
                  </Badge>
                  <Badge variant={modeColors[job.workMode]} size="sm">
                    {job.workMode}
                  </Badge>
                </div>

                <div className="text-slate-400 text-sm mb-4 flex gap-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3" />
                    {job.location}
                  </span>

                  {job.salaryRange && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3" />
                      {job.salaryRange}
                    </span>
                  )}
                </div>

                <a href={job.applyLink} target="_blank" rel="noreferrer">
                  <GlowButton size="sm" className="w-full justify-center">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Apply
                  </GlowButton>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}