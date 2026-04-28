import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import {
  Code2,
  Send,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Shield,
  TrendingUp,
  ChevronDown,
} from 'lucide-react';
import { GlowButton } from '../../components/ui/GlowButton';
import { codeReviewService } from '../../services/codeReview.service';
import { toast } from 'sonner';
import type { CodeReviewResult } from '../../types';

const LANGUAGES = [
  'Java',
  'JavaScript',
  'TypeScript',
  'Python',
  'Go',
  'Rust',
  'C++',
  'C#',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
];

const EXAMPLE_CODE = `public void deleteUser(int id) {
    try {
        Statement stmt = connection.createStatement();
        stmt.executeUpdate("DELETE FROM users WHERE id=" + id);
    } catch (Exception e) {
        System.out.println("Error");
    }
}`;

export function AICodeReviewPage() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Java');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CodeReviewResult | null>(null);
  const [langOpen, setLangOpen] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('Please paste your code first');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await codeReviewService.submitReview({
        code,
        language,
        title,
      });

      setResult(res);
      toast.success('Code review complete!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Code review failed');
    } finally {
      setLoading(false);
    }
  };

  const score = result?.score ?? 0;

  const scoreColor =
    score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-red-400';

  const severityConfig = {
    ERROR: {
      icon: AlertTriangle,
      color: 'text-red-400 bg-red-500/10 border-red-500/20',
    },
    WARNING: {
      icon: AlertTriangle,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    INFO: {
      icon: Info,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-1">AI Code Review</h1>
          <p className="text-slate-400">
            Get detailed feedback on your code quality, security, and performance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Title optional
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., User authentication function"
                  className="w-full px-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Language
                </label>
                <button
                  type="button"
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-4 py-3 glass border border-blue-500/20 rounded-xl text-white hover:border-blue-400/40 transition-colors min-w-[130px]"
                >
                  <Code2 className="w-4 h-4 text-blue-400" />
                  {language}
                  <ChevronDown
                    className={`w-4 h-4 ml-auto transition-transform ${
                      langOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full mt-2 left-0 w-48 glass-strong rounded-xl border border-blue-500/20 overflow-hidden z-20 shadow-xl"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            setLanguage(lang);
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            language === lang
                              ? 'text-blue-400 bg-blue-500/15'
                              : 'text-slate-300 hover:bg-white/5'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Your Code</label>
                <button
                  type="button"
                  onClick={() => setCode(EXAMPLE_CODE)}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Load Java example
                </button>
              </div>

              <div className="relative code-editor rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-500/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-slate-500 text-xs ml-2">
                    {language.toLowerCase()}
                  </span>
                </div>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`Paste your ${language} code here...`}
                  rows={20}
                  className="w-full p-4 bg-transparent text-slate-200 font-mono text-sm resize-none focus:outline-none placeholder-slate-600"
                  spellCheck={false}
                />
              </div>
            </div>

            <GlowButton
              onClick={handleSubmit}
              loading={loading}
              size="lg"
              className="w-full justify-center"
            >
              <Zap className="w-5 h-5" />
              Review My Code
              <Send className="w-4 h-4" />
            </GlowButton>
          </div>

          <div>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-96 glass rounded-2xl border border-blue-500/20"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Code2 className="w-8 h-8 text-blue-400" />
                    </motion.div>
                  </div>
                  <p className="text-white font-semibold">Analyzing your code...</p>
                  <p className="text-slate-400 text-sm mt-2">
                    Sending code to backend AI review service
                  </p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="glass rounded-2xl p-6 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-bold text-lg">Code Quality Score</h3>
                      <span className={`text-3xl font-bold ${scoreColor}`}>
                        {score}/100
                      </span>
                    </div>

                    <div className="w-full h-3 bg-slate-800 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          score >= 80
                            ? 'bg-emerald-500'
                            : score >= 60
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                      />
                    </div>

                    <p className="text-slate-400 text-sm mt-4 whitespace-pre-wrap">
                      {result.summary}
                    </p>
                  </div>

                  <div className="glass rounded-2xl p-6 border border-blue-500/20">
                    <h3 className="text-white font-bold mb-4">
                      Issues Found ({result.issues?.length || 0})
                    </h3>

                    <div className="space-y-3">
                      {result.issues?.length ? (
                        result.issues.map((issue, i) => {
                          const config = severityConfig[issue.severity] || severityConfig.INFO;
                          return (
                            <div key={i} className={`p-3 rounded-xl border ${config.color}`}>
                              <div className="flex items-start gap-2">
                                <config.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                  {issue.line && (
                                    <span className="text-xs opacity-70 mr-2">
                                      Line {issue.line}
                                    </span>
                                  )}
                                  <span className="text-sm font-medium">
                                    {issue.message}
                                  </span>
                                  {issue.suggestion && (
                                    <p className="text-xs opacity-70 mt-1">
                                      → {issue.suggestion}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-slate-400 text-sm">No structured issues returned.</p>
                      )}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-6 border border-blue-500/20">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      Improvements
                    </h3>
                    <ul className="space-y-2">
                      {result.improvements?.length ? (
                        result.improvements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))
                      ) : (
                        <p className="text-slate-400 text-sm">No improvements returned.</p>
                      )}
                    </ul>
                  </div>

                  <div className="glass rounded-2xl p-6 border border-red-500/20">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-400" />
                      Security Notes
                    </h3>
                    <ul className="space-y-2">
                      {result.securityNotes?.length ? (
                        result.securityNotes.map((note, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            {note}
                          </li>
                        ))
                      ) : (
                        <p className="text-slate-400 text-sm">No security notes returned.</p>
                      )}
                    </ul>
                  </div>

                  {result.optimizations?.length > 0 && (
                    <div className="glass rounded-2xl p-6 border border-emerald-500/20">
                      <h3 className="text-white font-bold mb-4">Optimizations</h3>
                      <ul className="space-y-2">
                        {result.optimizations.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-96 glass rounded-2xl border border-blue-500/20"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                    <Code2 className="w-8 h-8 text-blue-400/50" />
                  </div>
                  <p className="text-slate-400 text-center">
                    Paste your code on the left
                    <br />
                    and click "Review My Code"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}