import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Shield, CheckCircle, Clock, XCircle, Send } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { GlowButton } from '../../components/ui/GlowButton';
import { verificationService } from '../../services/verification.service';
import { toast } from 'sonner';

const criteria = [
  { icon: '💼', title: 'Active Projects', desc: 'Have at least 3 public projects', done: true },
  { icon: '👥', title: 'Community Engagement', desc: 'Follow and interact with 10+ developers', done: true },
  { icon: '🔗', title: 'GitHub Connected', desc: 'Link your GitHub profile', done: true },
  { icon: '📝', title: 'Complete Profile', desc: 'Fill all profile sections (bio, skills, links)', done: false },
  { icon: '🏆', title: 'Platform Contributions', desc: 'Earn 500+ leaderboard points', done: false },
];

export function VerificationPage() {
  const { user } = useAuthStore();
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const status = user?.verificationStatus || 'NONE';

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast.error('Please provide a reason for verification');
      return;
    }

    setSubmitting(true);
    try {
      // ✅ FIX: send correct payload
      await verificationService.requestVerification({
        notes: reason, // 🔥 IMPORTANT CHANGE
      });

      toast.success("Verification request submitted! We'll review it within 48 hours.");
    } catch {
      toast.error('Failed to submit verification request');
    } finally {
      setSubmitting(false);
    }
  };

  const statusConfig = {
    NONE: { icon: Shield, color: 'text-slate-400', bg: 'bg-slate-500/15 border-slate-500/20', label: 'Not Verified' },
    PENDING: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/20', label: 'Under Review' },
    APPROVED: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20', label: 'Verified ✓' },
    REJECTED: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/20', label: 'Not Approved' },
  };

  const config = statusConfig[status];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Developer Verification</h1>
          <p className="text-slate-400">Get verified to stand out and unlock exclusive platform features</p>
        </motion.div>

        {/* Status Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className={`glass rounded-2xl p-6 border ${config.bg} mb-8`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${config.bg} border flex items-center justify-center`}>
              <config.icon className={`w-7 h-7 ${config.color}`} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Current Status</h3>
              <p className={`font-semibold ${config.color}`}>{config.label}</p>
            </div>
          </div>
        </motion.div>

        {/* Apply Form */}
        {(status === 'NONE' || status === 'REJECTED') && (
          <div className="glass rounded-2xl p-6 border border-blue-500/10">
            <h3 className="text-white font-bold mb-4">Apply for Verification</h3>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              placeholder="Describe your contributions, achievements..."
              className="w-full px-4 py-3 glass border border-blue-500/20 rounded-xl text-white"
            />

            <GlowButton onClick={handleSubmit} loading={submitting}>
              <Send className="w-4 h-4" />
              Submit Verification Request
            </GlowButton>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}