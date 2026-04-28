import { motion } from 'framer-motion';
import { UserPlus, Search, Code2, Rocket } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '../ui/SectionWrapper';

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create Your Profile',
    description: 'Sign up and build your developer profile. Showcase your skills, projects, GitHub, and what you\'re working on.',
    color: 'blue',
  },
  {
    icon: Search,
    step: '02',
    title: 'Discover & Connect',
    description: 'Explore developers, projects, jobs, and hackathons. Follow builders who inspire you and grow your network.',
    color: 'purple',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Collaborate & Build',
    description: 'Join projects, find teammates, collaborate on real products, and use AI tools to accelerate your work.',
    color: 'cyan',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Launch & Grow',
    description: 'Land opportunities, earn badges, climb the leaderboard, and build your reputation in the developer community.',
    color: 'orange',
  },
];

const colorMap: Record<string, { icon: string; line: string; num: string }> = {
  blue: { icon: 'text-blue-400 bg-blue-500/15 border-blue-500/30', line: 'from-blue-500', num: 'text-blue-400' },
  purple: { icon: 'text-purple-400 bg-purple-500/15 border-purple-500/30', line: 'from-purple-500', num: 'text-purple-400' },
  cyan: { icon: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30', line: 'from-cyan-500', num: 'text-cyan-400' },
  orange: { icon: 'text-orange-400 bg-orange-500/15 border-orange-500/30', line: 'from-orange-500', num: 'text-orange-400' },
};

export function HowItWorksSection() {
  return (
    <SectionWrapper className="py-24" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How It Works"
          title={'From zero to <span style="background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">launch-ready</span>'}
          subtitle="Get started in minutes. Build your developer presence, find opportunities, and accelerate your growth."
        />

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="relative inline-block mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl border ${colorMap[step.color].icon} flex items-center justify-center mx-auto`}
                  >
                    <step.icon className="w-7 h-7" />
                  </motion.div>
                  <span className={`absolute -top-3 -right-3 text-xs font-bold ${colorMap[step.color].num} bg-slate-900 border border-current rounded-full w-6 h-6 flex items-center justify-center`}>
                    {step.step}
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
