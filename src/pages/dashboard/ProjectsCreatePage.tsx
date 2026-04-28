import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X, Github, Globe, Save } from 'lucide-react';
import { GlowButton } from '../../components/ui/GlowButton';
import { projectsService } from '../../services/projects.service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  shortDescription: z.string().min(20, 'Short description must be at least 20 characters'),
  detailedDescription: z.string().optional(),
  githubRepoUrl: z.string().url().optional().or(z.literal('')),
  liveDemoUrl: z.string().url().optional().or(z.literal('')),
  isOpenForCollaboration: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function ProjectsCreatePage() {
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      isOpenForCollaboration: false,
      detailedDescription: '',
      githubRepoUrl: '',
      liveDemoUrl: '',
    },
  });

  const addTech = () => {
    const value = techInput.trim();
    if (value && !techStack.includes(value)) {
      setTechStack((prev) => [...prev, value]);
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setTechStack((prev) => prev.filter((t) => t !== tech));
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);

    try {
      await projectsService.createProject({
        title: data.title,
        shortDescription: data.shortDescription,
        detailedDescription: data.detailedDescription || data.shortDescription,
        techStack,
        githubRepoUrl: data.githubRepoUrl || undefined,
        liveDemoUrl: data.liveDemoUrl || undefined,
        collaborationStatus: data.isOpenForCollaboration ? 'OPEN' : 'CLOSED',
        isVisible: true,
      } as any);

      toast.success('Project created successfully!');
      navigate('/projects');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to create project');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors';

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-1">Create Project</h1>
          <p className="text-slate-400">Share what you're building with the community</p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-blue-500/10 space-y-4">
            <h3 className="text-white font-semibold">Project Details</h3>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Project Title *</label>
              <input
                {...register('title')}
                className={inputClass}
                placeholder="My Awesome Project"
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Short Description *
              </label>
              <textarea
                {...register('shortDescription')}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Short summary of your project..."
              />
              {errors.shortDescription && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Detailed Description
              </label>
              <textarea
                {...register('detailedDescription')}
                rows={6}
                className={`${inputClass} resize-none`}
                placeholder="Explain features, goals, tech decisions, collaboration needs..."
              />
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-blue-500/10 space-y-4">
            <h3 className="text-white font-semibold">Tech Stack</h3>

            <div className="flex gap-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTech();
                  }
                }}
                placeholder="Add technology e.g., React, Spring Boot"
                className="flex-1 px-4 py-2.5 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 text-sm"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4 py-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 border border-blue-500/20 rounded-full text-blue-400 text-sm"
                >
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)}>
                    <X className="w-3 h-3 hover:text-red-400" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-blue-500/10 space-y-4">
            <h3 className="text-white font-semibold">Links</h3>

            <div className="relative">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                {...register('githubRepoUrl')}
                className={`${inputClass} pl-12`}
                placeholder="https://github.com/username/repo"
              />
              {errors.githubRepoUrl && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.githubRepoUrl.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                {...register('liveDemoUrl')}
                className={`${inputClass} pl-12`}
                placeholder="https://yourproject.com"
              />
              {errors.liveDemoUrl && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.liveDemoUrl.message}
                </p>
              )}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-blue-500/10">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('isOpenForCollaboration')}
                id="collab"
                className="w-4 h-4"
              />
              <label htmlFor="collab" className="text-white font-medium">
                Open for Collaboration
              </label>
            </div>
            <p className="text-slate-400 text-sm mt-2 ml-7">
              Allow other developers to request to join your project
            </p>
          </div>

          <GlowButton type="submit" loading={saving} size="lg">
            <Save className="w-4 h-4" />
            Publish Project
          </GlowButton>
        </form>
      </div>
    </DashboardLayout>
  );
}