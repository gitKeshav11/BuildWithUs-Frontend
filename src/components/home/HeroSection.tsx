import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Star, Users, Code2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Earth3D } from '../3d/Earth';
import { GlowButton } from '../ui/GlowButton';

const rotatingLines = [
  'Turning code into reality.',
  'Ideas today, products tomorrow.',
  'Where innovation meets execution.',
];

const stats = [
  { icon: Users, value: '12K+', label: 'Developers' },
  { icon: Code2, value: '3.8K+', label: 'Projects' },
  { icon: Zap, value: '500+', label: 'Hackathons' },
  { icon: Star, value: '98%', label: 'Satisfaction' },
];

function TypingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentLine = rotatingLines[currentIndex];

    if (isTyping) {
      if (charIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentLine.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 60);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2200);
        return () => clearTimeout(timeout);
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentLine.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentIndex((prev) => (prev + 1) % rotatingLines.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, currentIndex]);

  return (
    <div className="h-10 flex items-center justify-center">
      <span className="text-2xl md:text-3xl font-light text-blue-300/90">
        {displayText}
        <span className="cursor-blink text-blue-400 ml-0.5">|</span>
      </span>
    </div>
  );
}

function StarField() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(29, 78, 216, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(6, 182, 212, 0.06) 0%, transparent 50%), #020817',
      }}
    >
      {/* Stars */}
      <StarField />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        style={{ x: springX, y: springY, background: 'radial-gradient(circle, #3b82f6, transparent)' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
      />
      <motion.div
        style={{ x: springX, y: springY, background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm text-blue-300"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              The Developer Platform of Tomorrow
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Build{' '}
                <span
                  className="relative"
                  style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  With Us
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <TypingText />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-slate-400 text-lg leading-relaxed max-w-lg"
            >
              Connect with elite developers, collaborate on real projects, discover 
              top opportunities, and accelerate your career with AI-powered tools.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/auth/sign-up">
                <GlowButton size="lg" className="w-full sm:w-auto">
                  <Zap className="w-4 h-4" />
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </GlowButton>
              </Link>
              <Link to="/developers">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl glass border border-blue-500/20 text-slate-300 hover:text-white hover:border-blue-400/40 transition-all font-semibold"
                >
                  <Play className="w-4 h-4 text-blue-400" />
                  Explore Developers
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-4 gap-4 pt-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - 3D Earth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* Glow ring behind earth */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-80 h-80 rounded-full opacity-20 blur-3xl"
                style={{ background: 'radial-gradient(circle, #3b82f6, #1d4ed8, transparent)' }}
              />
            </div>

            <Earth3D />

            {/* Floating cards around earth */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-16 -left-4 glass rounded-xl p-3 border border-blue-500/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">New Project</div>
                  <div className="text-xs text-slate-400">AI Dashboard</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-24 -right-4 glass rounded-xl p-3 border border-orange-500/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Rank #1</div>
                  <div className="text-xs text-slate-400">This Week</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-3, 7, -3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -right-8 glass rounded-xl p-3 border border-purple-500/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-slate-300">12 devs online</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent" />
    </div>
  );
}
