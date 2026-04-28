import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, AtSign, ArrowRight, Github, Linkedin } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';
import { GlowButton } from '../../components/ui/GlowButton';

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-z0-9_]+$/, 'Username can only contain lowercase letters, numbers, and underscores'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data);
      navigate('/dashboard');
    } catch {
      // error handled in hook
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(29, 78, 216, 0.2) 0%, transparent 50%), #020817',
        }}
      >
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: Math.random() * 2 + 0.5, height: Math.random() * 2 + 0.5 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, delay: Math.random() * 5, repeat: Infinity }}
          />
        ))}

        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link to="/" className="flex items-center gap-3 mb-16">
            <img src="/uploads/upload_1.png" alt="Build With Us" className="h-10 w-auto" />
            <span className="text-white font-bold text-xl">Build <span className="text-blue-400">With Us</span></span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Start your
              <br />
              <span style={{ background: 'linear-gradient(135deg, #a78bfa, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                developer journey
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Create your free account and join a community of builders, innovators, and creators.
            </p>
            <div className="space-y-4">
              {['Free forever plan', 'AI code review (5 free/month)', 'Access to all hackathons', 'Developer verification badge'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#020817]">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <img src="/uploads/upload_1.png" alt="Build With Us" className="h-8 w-auto" />
            <span className="text-white font-bold text-lg">Build <span className="text-blue-400">With Us</span></span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-slate-400 mb-8">Join thousands of developers building the future</p>

          <div className="space-y-3 mb-6">
            {[
              { label: 'Continue with Google', action: () => authService.googleAuth(), icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )},
              { label: 'Continue with GitHub', action: () => authService.githubAuth(), icon: <Github className="w-5 h-5" /> },
              { label: 'Continue with LinkedIn', action: () => authService.linkedinAuth(), icon: <Linkedin className="w-5 h-5 text-blue-400" /> },
            ].map((btn) => (
              <motion.button key={btn.label} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={btn.action}
                className="w-full flex items-center justify-center gap-3 py-3 glass border border-blue-500/20 rounded-xl text-white hover:border-blue-400/40 transition-all font-medium">
                {btn.icon}
                {btn.label}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-blue-500/10" />
            <span className="text-slate-500 text-sm">or</span>
            <div className="flex-1 h-px bg-blue-500/10" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input {...register('fullName')} placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors" />
                </div>
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input {...register('username')} placeholder="johndoe"
                    className="w-full pl-10 pr-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors" />
                </div>
                {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input {...register('email')} type="email" placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors" />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-12 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <GlowButton type="submit" loading={isLoading} className="w-full justify-center">
              Create Account
              <ArrowRight className="w-4 h-4" />
            </GlowButton>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/auth/sign-in" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
