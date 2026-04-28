import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuthStore } from '../../store/authStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera, Save, Plus, X, Github, Linkedin, Globe, Twitter } from 'lucide-react';
import { GlowButton } from '../../components/ui/GlowButton';
import { Avatar } from '../../components/ui/Avatar';
import { profileService } from '../../services/profile.service';
import { toast } from 'sonner';

const schema = z.object({
  fullName: z.string().min(2),
  headline: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().optional(),
  githubUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  isAvailable: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function ProfileEditPage() {
  const { user, setUser } = useAuthStore();

  // 🔥 FIX: normalize skills
  const initialSkills: string[] = Array.isArray(user?.skills)
    ? user!.skills.map((s: any) => (typeof s === 'string' ? s : s.name))
    : [];

  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user?.fullName || '',
      headline: user?.headline || '',
      bio: user?.bio || '',
      githubUrl: user?.githubUrl || '',
      linkedinUrl: user?.linkedinUrl || '',
      portfolioUrl: user?.portfolioUrl || '',
      twitterUrl: user?.twitterUrl || '',
      isAvailable: user?.isAvailable || false,
    },
  });

  const addSkill = () => {
    const value = skillInput.trim();
    if (value && !skills.includes(value)) {
      setSkills((prev) => [...prev, value]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      const updated = await profileService.updateProfile({
        ...data,
        skills,
      });

      setUser(updated);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors';

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Edit Profile</h1>
          <p className="text-slate-400">Update your developer profile and public information</p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Photo */}
          <div className="glass rounded-2xl p-6 border border-blue-500/10">
            <h3 className="text-white font-semibold mb-4">Profile Photo</h3>
            <div className="flex items-center gap-6">
              <Avatar name={user?.fullName || 'U'} src={user?.profilePhotoUrl} size="xl" />
            </div>
          </div>

          {/* Basic Info */}
          <div className="glass rounded-2xl p-6 border border-blue-500/10 space-y-4">
            <h3 className="text-white font-semibold">Basic Information</h3>

            <input {...register('fullName')} className={inputClass} placeholder="Full Name" />
            {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}

            <input {...register('headline')} className={inputClass} placeholder="Headline" />

            <textarea {...register('bio')} rows={4} className={inputClass} placeholder="Bio" />

            <label className="flex items-center gap-2 text-slate-300 text-sm">
              <input type="checkbox" {...register('isAvailable')} />
              Open to opportunities
            </label>
          </div>

          {/* Skills */}
          <div className="glass rounded-2xl p-6 border border-blue-500/10">
            <h3 className="text-white font-semibold mb-4">Skills</h3>

            <div className="flex gap-2 mb-4">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 px-4 py-2 glass border border-blue-500/20 rounded-xl text-white"
              />
              <button type="button" onClick={addSkill}>
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-blue-500/20 rounded-full flex items-center gap-1">
                  {skill}
                  <button onClick={() => removeSkill(skill)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <GlowButton type="submit" loading={saving}>
            <Save className="w-4 h-4" />
            Save Changes
          </GlowButton>
        </form>
      </div>
    </DashboardLayout>
  );
}