import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '../ui/SectionWrapper';
import { Avatar } from '../ui/Avatar';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Senior Full Stack Developer',
    company: 'ex-Google',
    avatar: '',
    content: 'Build With Us completely changed how I find collaborators. I launched my SaaS product with a team I found here in just 2 weeks. The AI code review caught 3 critical security issues.',
    rating: 5,
  },
  {
    name: 'Sarah Mitchell',
    role: 'Frontend Engineer',
    company: 'Startup Founder',
    avatar: '',
    content: 'The hackathon team finder is incredible. I\'ve won 2 hackathons with teams I met here. The platform just feels premium — like GitHub but for finding people, not just code.',
    rating: 5,
  },
  {
    name: 'Rahul Sharma',
    role: 'Backend Developer',
    company: 'Freelancer',
    avatar: '',
    content: 'Got my first $80k job through the jobs board here. The verification badge definitely helped. The AI assistant helped me prep for interviews with real architectural questions.',
    rating: 5,
  },
  {
    name: 'Emma Wilson',
    role: 'DevOps Engineer',
    company: 'Tech Lead',
    avatar: '',
    content: 'Best developer community I\'ve been part of. The quality of people here is exceptional. I\'ve made connections that turned into real partnerships and a 6-figure consulting gig.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Mobile Developer',
    company: 'App Studio',
    avatar: '',
    content: 'The leaderboard system is surprisingly motivating. I went from rank 500 to top 50 in 3 months just by being active and contributing quality projects.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'ML Engineer',
    company: 'AI Startup',
    avatar: '',
    content: 'Found my co-founder here. We\'ve been building together for 8 months and just closed our seed round. This platform is where serious builders come.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <SectionWrapper className="py-24 mesh-bg" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Community Love"
          title={`What builders <span style="background: linear-gradient(135deg, #f97316, #fb923c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">say</span>`}
          subtitle="Join thousands of developers who are already building, connecting, and growing with Build With Us."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 border border-blue-500/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
              
              <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
              
              <div className="flex mb-3">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6">"{testimonial.content}"</p>
              
              <div className="flex items-center gap-3">
                <Avatar name={testimonial.name} size="sm" />
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-slate-500 text-xs">{testimonial.role} · {testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
