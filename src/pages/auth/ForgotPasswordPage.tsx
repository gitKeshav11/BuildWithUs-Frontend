import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { authService } from '../../services/auth.service';
import { GlowButton } from '../../components/ui/GlowButton';
import { toast } from 'sonner';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <img src="/uploads/upload_1.png" alt="Build With Us" className="h-8 w-auto" />
          <span className="text-white font-bold text-lg">Build <span className="text-blue-400">With Us</span></span>
        </Link>

        {sent ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Check your email</h1>
            <p className="text-slate-400 mb-8">We sent a password reset link to <span className="text-white">{email}</span></p>
            <Link to="/auth/sign-in" className="text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white mb-2">Forgot password?</h1>
            <p className="text-slate-400 mb-8">Enter your email and we'll send you a reset link.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors" />
                </div>
              </div>
              <GlowButton type="submit" loading={loading} className="w-full justify-center">Send Reset Link</GlowButton>
            </form>
            <Link to="/auth/sign-in" className="flex items-center gap-2 text-slate-400 hover:text-white mt-6">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}
