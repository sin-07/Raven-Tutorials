'use client';

import React, { useState } from 'react';
import { 
  GitBranch, 
  Code, 
  Terminal, 
  Server, 
  Cpu, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Sparkles
} from 'lucide-react';

export default function RoadmapSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Logic Building & JavaScript Mastery',
      tagline: 'The Foundation of Everything',
      duration: 'Weeks 1 - 4',
      icon: Terminal,
      skills: ['Execution Context', 'Event Loop', 'Closures & Scope', 'Prototypes', 'ES6+ Features', 'DOM Manipulation'],
      description: 'Before writing complex applications, we wire your brain to think algorithmically. You master how JavaScript executes behind the scenes in the browser V8 engine.',
      project: 'Build an interactive game engine & dynamic music player without any framework.',
    },
    {
      step: '02',
      title: 'Modern Frontend & Web Animations',
      tagline: 'Award-Winning UI Engineering',
      duration: 'Weeks 5 - 10',
      icon: Code,
      skills: ['React 19 Hooks', 'Custom Hooks', 'Tailwind CSS', 'Redux Toolkit', 'GSAP 3.0 Timeline', 'Canvas API'],
      description: 'Master component architecture, state machines, and buttery smooth 60fps animations that separate average frontends from top-tier creative engineers.',
      project: 'Build an Awwwards-level interactive 3D product showcase website.',
    },
    {
      step: '03',
      title: 'Production Backend & Microservices',
      tagline: 'High-Concurrency Infrastructure',
      duration: 'Weeks 11 - 16',
      icon: Server,
      skills: ['Node.js Internals', 'Express REST APIs', 'MongoDB Aggregation', 'PostgreSQL', 'Redis Caching', 'JWT & OAuth'],
      description: 'Build backend architectures capable of handling 100k+ concurrent requests. Master indexing, distributed locks, database transactions, and WebSockets.',
      project: 'Build a distributed real-time chat & video streaming engine with Redis and WebSockets.',
    },
    {
      step: '04',
      title: 'Full Stack Integration & Cloud DevOps',
      tagline: 'End-to-End SaaS Engineering',
      duration: 'Weeks 17 - 21',
      icon: Cpu,
      skills: ['Next.js 15 App Router', 'Server Actions', 'Docker Containers', 'Prisma ORM', 'AWS Deployment', 'CI/CD Pipelines'],
      description: 'Bring frontend and backend together into production-ready software. Learn containerization with Docker, automatic CI/CD deployment, and cloud security.',
      project: 'Build and deploy a multi-tenant AI-powered SaaS platform with payment gateway.',
    },
    {
      step: '05',
      title: 'Resume Roast & Placement Hiring Drives',
      tagline: 'Getting You Hired',
      duration: 'Weeks 22 - 24',
      icon: Briefcase,
      skills: ['FAANG Mock Interviews', 'System Design Basics', 'LeetCode DSA Rounds', 'Resume Optimization', 'Direct Recruiter Drives'],
      description: 'You undergo ruthless resume roasts, GitHub code reviews, and live 1-on-1 mock interviews with engineers from top tech companies to guarantee you stand out.',
      project: 'Direct interview introductions to our network of 350+ tech hiring partners.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#050609] relative font-jakarta select-none">
      
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, #e8602e 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161210] border border-[#e8602e]/30 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider">
            <GitBranch className="w-3.5 h-3.5 text-[#e8602e]" />
            The Proven Roadmap
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight">
            From Zero to Hired: <br />
            <span className="text-[#e8602e]">The 5-Phase Transformation</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            A battle-tested engineering journey designed to turn anyone willing to put in the discipline into an industry-grade software developer.
          </p>
        </div>

        {/* Step Selector Tabs (Desktop & Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {steps.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                activeStep === idx
                  ? 'bg-[#151724] border-[#e8602e] shadow-[0_0_20px_rgba(232,96,46,0.3)]'
                  : 'bg-[#0d0e15] border-white/5 hover:border-white/20 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold ${activeStep === idx ? 'text-[#ff7b47]' : 'text-zinc-500'}`}>
                  Phase {item.step}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
                  {item.duration}
                </span>
              </div>
              <div className={`mt-2 font-black text-xs sm:text-sm font-outfit leading-tight line-clamp-2 ${activeStep === idx ? 'text-white' : 'text-zinc-300'}`}>
                {item.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Card */}
        {(() => {
          const current = steps[activeStep];
          const Icon = current.icon;
          return (
            <div className="sheryians-card p-8 sm:p-12 border border-[#e8602e]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(232,96,46,0.15)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-center">
                
                {/* Left 2 Cols: Details */}
                <div className="lg:col-span-2 space-y-6">
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff6a3d] to-[#e8602e] flex items-center justify-center text-white shadow-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#ff7b47] uppercase tracking-wider">
                        Phase {current.step} • {current.duration}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white font-outfit">
                        {current.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {current.description}
                  </p>

                  {/* Skills tags */}
                  <div>
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5 font-space">
                      Core Skills Mastered:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {current.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-xl bg-[#141724] border border-white/10 text-xs font-mono text-zinc-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right 1 Col: Milestone Project */}
                <div className="p-6 rounded-2xl bg-[#0e1017] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#ffaa40] font-space uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#ffaa40]" />
                    <span>Capstone Milestone</span>
                  </div>

                  <p className="text-sm font-bold text-white font-outfit leading-relaxed">
                    {current.project}
                  </p>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                    <span>Verified in Discord TA Lounge</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
}
