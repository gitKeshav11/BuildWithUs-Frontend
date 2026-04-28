import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Github, ExternalLink, Users, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Badge } from '../components/ui/Badge';
import { GlowButton } from '../components/ui/GlowButton';
import { Avatar } from '../components/ui/Avatar';
import { projectsService } from '../services/projects.service';
import type { Project } from '../types';

function normalizeProjects(data: any): Project[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data?.content)) return data.data.content;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [filterCollab, setFilterCollab] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsService.getProjects({ size: 100 });
      setProjects(normalizeProjects(data));
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filtered = projects
    .filter((p) => {
      const q = search.toLowerCase();

      return (
        p.title?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.detailedDescription?.toLowerCase().includes(q) ||
        p.techStack?.some((t) => t?.toLowerCase().includes(q))
      );
    })
    .filter(
      (p) =>
        !filterCollab ||
        p.collaborationStatus === 'OPEN' ||
        p.collaborationStatus === 'OPEN_FOR_COLLAB'
    );

  return (
    <div className="min-h-screen bg-[#020817]">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white mb-2"
              >
                Open <span className="text-blue-400">Projects</span>
              </motion.h1>
              <p className="text-slate-400">Discover projects and collaborate</p>
            </div>

            <Link to="/dashboard/projects/create">
              <GlowButton>
                <Plus className="w-4 h-4" />
                Post Project
              </GlowButton>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-12 pr-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60"
              />
            </div>

            <button
              type="button"
              onClick={() => setFilterCollab(!filterCollab)}
              className={`px-5 py-3 rounded-xl border transition-colors ${
                filterCollab
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  : 'text-slate-400 border-blue-500/20 hover:text-white'
              }`}
            >
              Open for Collab
            </button>
          </div>

          {loading ? (
            <div className="text-center text-slate-400 py-20">
              Loading projects...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-slate-400 py-20">
              No projects found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-6 border border-blue-500/10 flex flex-col"
                >
                  <h3 className="text-white font-bold text-lg mb-2">
                    {project.title}
                  </h3>

                  {(project.collaborationStatus === 'OPEN' ||
                    project.collaborationStatus === 'OPEN_FOR_COLLAB') && (
                    <div className="mb-2">
                      <Badge variant="blue" size="sm">
                        <Users className="w-3 h-3" /> Open for Collab
                      </Badge>
                    </div>
                  )}

                  <p className="text-slate-400 text-sm my-3 line-clamp-5">
                    {project.shortDescription ||
                      project.detailedDescription ||
                      'No description available.'}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(project.techStack ?? []).map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <Avatar
                      name={
                        project.ownerFullName ||
                        project.ownerUsername ||
                        project.ownerName ||
                        'User'
                      }
                      src={project.ownerProfilePhotoUrl}
                      size="xs"
                    />
                    <span className="text-slate-400 text-xs">
                      {project.ownerFullName ||
                        project.ownerUsername ||
                        project.ownerName ||
                        'Unknown'}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    {(project.githubUrl || project.githubRepoUrl) && (
                      <a
                        href={project.githubUrl || project.githubRepoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 text-blue-400"
                      >
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                    )}

                    {(project.liveDemoUrl || project.liveUrl) && (
                      <a
                        href={project.liveDemoUrl || project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 text-purple-400"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}