import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlowButton } from '../ui/GlowButton';

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(29, 78, 216, 0.15) 0%, transparent 70%), #020817',
        }}
      />
      
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Join 12,000+ developers today
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Ready to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Build With Us?
            </span>
          </h2>

          <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto">
            Join the fastest-growing developer community. Build projects, find opportunities, 
            and accelerate your career with AI-powered tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/sign-up">
              <GlowButton size="lg">
                <Zap className="w-5 h-5" />
                Start Building Free
                <ArrowRight className="w-5 h-5" />
              </GlowButton>
            </Link>
            <Link to="/developers">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-8 py-4 rounded-xl glass border border-blue-500/20 text-slate-300 hover:text-white hover:border-blue-400/40 transition-all font-semibold"
              >
                Explore the Community
              </motion.button>
            </Link>
          </div>

          <p className="text-slate-600 text-sm">No credit card required · Free forever plan · Join in 30 seconds</p>
        </motion.div>
      </div>
    </section>
  );
}
