import { motion } from 'framer-motion';
import { Bot, Code2, MessageSquare, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionWrapper, SectionHeader } from '../ui/SectionWrapper';

export function AISection() {
  return (
    <SectionWrapper className="py-24" id="ai-tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI-Powered Tools"
          title={`Supercharge your dev workflow with <span style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">AI</span>`}
          subtitle="Two powerful AI tools built specifically for developers. Review code instantly, get expert guidance, and build faster."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Review Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="relative group p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 to-cyan-600/5 border border-blue-500/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
                <Code2 className="w-7 h-7 text-blue-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">AI Code Review</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Paste your code and get instant, detailed reviews covering quality, security vulnerabilities, 
                performance optimizations, and best practices.
              </p>

              {/* Mock code preview */}
              <div className="code-editor rounded-xl p-4 mb-6 text-xs font-mono">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-slate-500">review.ts</span>
                </div>
                <div className="space-y-1">
                  <div><span className="text-purple-400">const</span> <span className="text-blue-300">fetchData</span> = <span className="text-yellow-300">async</span> () =&gt; {'{'}</div>
                  <div className="pl-4"><span className="text-green-400">// ✓ Good: async/await pattern</span></div>
                  <div className="pl-4"><span className="text-red-400">// ⚠ Missing: error handling</span></div>
                  <div>{'}'}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {['Security', 'Performance', 'Best Practices', 'Optimization'].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">{tag}</span>
                ))}
              </div>

              <Link
                to="/dashboard/code-review"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm group"
              >
                Try Code Review
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* AI Chat Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="relative group p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-pink-600/5 border border-purple-500/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
                <Bot className="w-7 h-7 text-purple-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">AI Dev Assistant</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Your always-available AI developer companion. Get advice on architecture, tech stack choices, 
                project ideas, and career guidance.
              </p>

              {/* Mock chat preview */}
              <div className="space-y-3 mb-6">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="glass rounded-xl rounded-tl-sm px-3 py-2 text-xs text-slate-300 max-w-xs">
                    What tech stack should I use for a real-time chat app?
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-purple-600/20 border border-purple-500/20 rounded-xl rounded-tr-sm px-3 py-2 text-xs text-purple-200 max-w-xs">
                    I'd recommend Next.js + Socket.io + Redis for real-time features...
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {['Startup Ideas', 'Tech Stack', 'Architecture', 'Career Advice'].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20">{tag}</span>
                ))}
              </div>

              <Link
                to="/dashboard/ai-chat"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-sm group"
              >
                Start Chatting
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
