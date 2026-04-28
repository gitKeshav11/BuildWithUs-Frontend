import { motion } from 'framer-motion';
import { Code2, Users, Briefcase, Bot, Zap, Trophy, Shield, GitBranch, MessageSquare } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '../ui/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';

const features = [
  {
    icon: Users,
    title: 'Developer Network',
    description: 'Connect with thousands of elite developers. Follow, collaborate, and grow your professional network.',
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Code2,
    title: 'Project Collaboration',
    description: 'Post your projects, find collaborators, and build amazing products together with the right team.',
    color: 'purple',
    gradient: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Bot,
    title: 'AI Code Review',
    description: 'Get instant AI-powered code reviews with detailed feedback on quality, security, and performance.',
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: MessageSquare,
    title: 'AI Dev Assistant',
    description: 'Your personal AI developer assistant for architecture decisions, tech stack advice, and more.',
    color: 'green',
    gradient: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Briefcase,
    title: 'Jobs & Internships',
    description: 'Discover top-tier developer jobs and internships. Apply directly and save opportunities.',
    color: 'orange',
    gradient: 'from-orange-500/20 to-orange-600/10',
    border: 'border-orange-500/20',
  },
  {
    icon: Zap,
    title: 'Hackathons',
    description: 'Find hackathons, form teams, and compete. Our team finder matches you with the perfect collaborators.',
    color: 'yellow',
    gradient: 'from-yellow-500/20 to-yellow-600/10',
    border: 'border-yellow-500/20',
  },
  {
    icon: Trophy,
    title: 'Leaderboard & Badges',
    description: 'Earn badges, climb the leaderboard, and showcase your achievements to the developer community.',
    color: 'amber',
    gradient: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Shield,
    title: 'Developer Verification',
    description: 'Get verified to stand out. Verified developers get priority visibility and exclusive opportunities.',
    color: 'blue',
    gradient: 'from-blue-600/20 to-indigo-600/10',
    border: 'border-indigo-500/20',
  },
  {
    icon: GitBranch,
    title: 'GitHub Integration',
    description: 'Seamlessly connect your GitHub repos, showcase your contributions, and link live demos.',
    color: 'slate',
    gradient: 'from-slate-500/20 to-slate-600/10',
    border: 'border-slate-500/20',
  },
];

const colorMap: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-500/15',
  purple: 'text-purple-400 bg-purple-500/15',
  cyan: 'text-cyan-400 bg-cyan-500/15',
  green: 'text-emerald-400 bg-emerald-500/15',
  orange: 'text-orange-400 bg-orange-500/15',
  yellow: 'text-yellow-400 bg-yellow-500/15',
  amber: 'text-amber-400 bg-amber-500/15',
  slate: 'text-slate-300 bg-slate-500/15',
};

export function FeaturesSection() {
  return (
    <SectionWrapper className="py-24 mesh-bg" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Platform Features"
          title='Everything you need to <span style="background: linear-gradient(135deg, #60a5fa, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">build & grow</span>'
          subtitle="A complete ecosystem designed for developers who want to build, connect, and accelerate their careers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border ${feature.border} backdrop-blur-sm cursor-default overflow-hidden`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
              
              <div className={`w-12 h-12 rounded-xl ${colorMap[feature.color]} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
