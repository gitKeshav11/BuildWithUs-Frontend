import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  Platform: [
    { label: 'Developers', href: '/developers' },
    { label: 'Projects', href: '/projects' },
    { label: 'Jobs & Internships', href: '/jobs' },
    { label: 'Hackathons', href: '/hackathons' },
    { label: 'Leaderboard', href: '/leaderboard' },
  ],
  Features: [
    { label: 'AI Code Review', href: '/dashboard/code-review' },
    { label: 'AI Dev Assistant', href: '/dashboard/ai-chat' },
    { label: 'Team Finder', href: '/team-finder' },
    { label: 'Developer Badges', href: '/leaderboard' },
    { label: 'Verification', href: '/dashboard/verification' },
  ],
  Community: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-blue-500/10 bg-[#020817]">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/uploads/upload_1.png" alt="Build With Us" className="h-10 w-auto" />
              <span className="text-white font-bold text-xl">
                Build <span className="text-blue-400">With Us</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              The premier developer platform where innovation meets execution. 
              Connect, build, and grow with the world's most ambitious developers.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: '#', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-500/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Build With Us. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms</Link>
            <Link to="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy</Link>
            <Link to="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
