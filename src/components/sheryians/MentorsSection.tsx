'use client';

import React from 'react';
import { 
  Users, 
  Sparkles, 
  Youtube, 
  Linkedin, 
  Twitter, 
  Github, 
  Code2, 
  Award,
  Terminal,
  ExternalLink
} from 'lucide-react';

export default function MentorsSection() {
  const mentors = [
    {
      name: 'Harsh Sharma',
      role: 'Founder & Lead Mentor',
      focus: 'Logic Building • GSAP & Creative Dev • Web Architecture',
      bio: "India's most beloved coding educator. Known for his unfiltered, highly practical teaching style that demystifies JavaScript and turns novices into creative engineers.",
      quote: '"Coding is not about memorizing syntax; it is about training your brain to think with uncompromising clarity."',
      studentsCount: '500K+ Students Mentored',
      imageBg: 'from-[#ff6a3d] to-[#e8602e]',
      youtubeLink: 'https://youtube.com/@sheryians',
      linkedinLink: 'https://linkedin.com/company/sheryians-coding-school',
      initials: 'HS',
    },
    {
      name: 'Sarthak Sharma',
      role: 'Co-Founder & Full-Stack Architect',
      focus: 'Full-Stack MERN • Next.js 15 • DSA & Competitive Logic',
      bio: 'Full-stack engineering maestro and systems designer. Has helped hundreds of developers crack top product engineering interviews through disciplined problem-solving frameworks.',
      quote: '"Build software as if millions of concurrent users are relying on your server this very second."',
      studentsCount: '350K+ Students Mentored',
      imageBg: 'from-[#e8602e] to-amber-500',
      youtubeLink: 'https://youtube.com/@sheryians',
      linkedinLink: 'https://linkedin.com/company/sheryians-coding-school',
      initials: 'SS',
    },
    {
      name: 'Dhananjay Bhavsar',
      role: 'Lead Backend & Distributed Systems Mentor',
      focus: 'Node.js Internals • Microservices • Redis • Kafka • Docker',
      bio: 'High-concurrency infrastructure specialist. Leads deep-dive backend masterclasses covering event loops, distributed caching, pub/sub architectures, and database internals.',
      quote: '"Real backend domination begins when you understand memory buffers, event loops, and database indexing."',
      studentsCount: '200K+ Students Mentored',
      imageBg: 'from-amber-500 to-rose-600',
      youtubeLink: 'https://youtube.com/@sheryians',
      linkedinLink: 'https://linkedin.com/company/sheryians-coding-school',
      initials: 'DB',
    },
  ];

  return (
    <section id="mentors" className="py-20 lg:py-28 bg-[#07080d] relative font-jakarta select-none">
      
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #e8602e 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161210] border border-[#e8602e]/30 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#e8602e]" />
            Learn from the Best
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight">
            Meet the Sheryians <span className="text-[#e8602e]">Mentors</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            No corporate suits or theoretical academics. Learn directly from engineers who build, ship, and teach with raw passion every single day.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((mentor, idx) => (
            <div
              key={idx}
              className="sheryians-card p-7 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-[#e8602e]/50 transition group relative overflow-hidden"
            >
              <div className="space-y-6">
                
                {/* Avatar with Glow & Initials */}
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${mentor.imageBg} p-1 shadow-[0_0_25px_rgba(232,96,46,0.35)] flex items-center justify-center text-white font-black text-2xl font-outfit group-hover:scale-105 transition-transform`}>
                      <div className="w-full h-full bg-[#0e1017] rounded-xl flex items-center justify-center text-[#ff7b47] font-black">
                        {mentor.initials}
                      </div>
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#e8602e] border-2 border-[#0e1017] shadow-[0_0_8px_#e8602e]" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-mono">
                    {mentor.studentsCount}
                  </span>
                </div>

                {/* Name & Title */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white font-outfit group-hover:text-[#ff7b47] transition">
                    {mentor.name}
                  </h3>
                  <div className="text-xs font-bold text-[#e8602e] uppercase tracking-wider font-space">
                    {mentor.role}
                  </div>
                </div>

                {/* Specialization tag */}
                <div className="p-3 rounded-xl bg-[#12141e] border border-white/5 text-zinc-300 text-xs font-mono">
                  {mentor.focus}
                </div>

                {/* Bio & Quote */}
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {mentor.bio}
                </p>

                <div className="p-4 rounded-2xl bg-black/40 border-l-2 border-[#e8602e] text-xs text-zinc-300 italic font-jakarta">
                  {mentor.quote}
                </div>

              </div>

              {/* Social links */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
                  Connect
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={mentor.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-600/20 text-zinc-400 hover:text-red-400 border border-white/10 transition"
                    aria-label={`${mentor.name} on YouTube`}
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href={mentor.linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-sky-600/20 text-zinc-400 hover:text-sky-400 border border-white/10 transition"
                    aria-label={`${mentor.name} on LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/sheryians"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition"
                    aria-label={`${mentor.name} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
