import { motion } from 'framer-motion';
import { Users, Code2, Briefcase, Trophy, Zap, Star } from 'lucide-react';

const stats = [
  { icon: Users, value: '12,000+', label: 'Developers', color: 'text-blue-400' },
  { icon: Code2, value: '3,800+', label: 'Projects Built', color: 'text-purple-400' },
  { icon: Briefcase, value: '1,200+', label: 'Jobs Posted', color: 'text-orange-400' },
  { icon: Zap, value: '500+', label: 'Hackathons', color: 'text-cyan-400' },
  { icon: Trophy, value: '8,000+', label: 'Badges Earned', color: 'text-amber-400' },
  { icon: Star, value: '98%', label: 'Satisfaction Rate', color: 'text-emerald-400' },
];

export function StatsSection() {
  return (
    <div className="relative py-16 overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.05) 0%, transparent 50%, rgba(139, 92, 246, 0.05) 100%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center group"
            >
              <div className={`w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold text-white mb-1`}>{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
