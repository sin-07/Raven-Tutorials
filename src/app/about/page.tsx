'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Target, BookOpen, Users, X, ZoomIn, Sparkles } from 'lucide-react';
import { LMSFooter } from '@/components/lms';
import WavyHeading from '@/components/WavyHeading';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { 
  gsap,
  animateFromUp, 
  animateFromDown, 
  scrollFromUp, 
  scrollFromDown, 
  scrollStaggerDirectional 
} from '@/lib/gsap';

interface FacultyMember {
  name: string;
  role: string;
  description: string;
  image?: string;
  specialty: string;
  dept: string;
  qualification: string;
}

interface DevTeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  bio: string;
  education: string;
  skills: string[];
  fullProfile: {
    about: string;
    skills: string[];
    education: string;
    experience: string;
  };
}

const AboutUs: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // GSAP refs
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const missionGridRef = useRef<HTMLDivElement>(null);
  const facultyHeaderRef = useRef<HTMLDivElement>(null);
  const facultyGridRef = useRef<HTMLDivElement>(null);
  const devSectionRef = useRef<HTMLElement>(null);
  const devCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    animateFromUp(badgeRef.current, { distance: 25, duration: 0.6 });
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        y: -4,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.6,
      });
    }
    animateFromDown(titleRef.current, { distance: 30, duration: 0.7, delay: 0.1 });
    animateFromDown(heroSubRef.current, { distance: 25, duration: 0.7, delay: 0.2 });

    if (missionGridRef.current) {
      scrollStaggerDirectional(missionGridRef.current.children, 'cross', 0.12, { distance: 35 });
    }

    if (facultyHeaderRef.current) {
      scrollFromUp(facultyHeaderRef.current, { distance: 30 });
    }

    if (facultyGridRef.current) {
      scrollStaggerDirectional(facultyGridRef.current.children, 'cross', 0.1, { distance: 35 });
    }

    if (devCardRef.current) {
      scrollFromDown(devCardRef.current, { distance: 40 });
    }
  }, []);

  const pillars = [
    {
      icon: Target,
      title: 'Our Mission',
      desc: 'To provide accessible, high-impact education that builds rock-solid conceptual mastery and moral discipline, equipping students to conquer competitive exams and future careers.',
    },
    {
      icon: BookOpen,
      title: 'Our Approach',
      desc: 'Detailed theory reinforced with real-life visualization, graded Daily Practice Papers (DPPs), periodic proctored mock exams, and instant 1-on-1 doubt resolution clinics.',
    },
    {
      icon: Users,
      title: 'Our Philosophy',
      desc: 'We believe true mentorship requires educators to be passionate lifelong learners. We cultivate curiosity, discipline, and critical thinking in every single classroom session.',
    },
  ];

  const faculty: FacultyMember[] = [
    {
      name: 'S. Nandan Verma',
      role: 'Faculty & Operations Head',
      dept: 'Life Sciences',
      specialty: 'Life Sciences & Biology',
      qualification: 'M.Sc Life Sciences',
      description: 'Dedicated to developing an inquisitive aptitude in students regarding their education and competitive career paths.',
    },
    {
      name: 'Rakesh Ranjan',
      role: 'CEO & Senior Faculty',
      dept: 'Medical Pedagogy',
      specialty: 'Medical Sciences & Pedagogy',
      qualification: 'MBBS (Pursuing), NMCH',
      description: 'Experienced educator focusing on concept-first pedagogy. Committed to creating a premier platform for aspiring medical students.',
    },
    {
      name: 'Abhinay Gupta',
      role: 'Chief Project Officer',
      dept: 'Management & Logistics',
      specialty: 'Commerce & Management',
      qualification: 'M.Com, Educational Strategy',
      description: 'Ensuring structured operational excellence and seamless academic batch scheduling across all branches.',
    },
    {
      name: 'Niraj Kumar',
      role: 'Faculty & CPRO',
      dept: 'Foundational Sciences',
      specialty: 'Foundational Pedagogy',
      qualification: 'B.A-B.Ed (BRABU), CTET Qualified',
      description: 'Extensive teaching expertise in conceptual clarity, child psychology, and structured board preparations.',
    },
    {
      name: 'Guddu Kumar',
      role: 'Senior Mathematics Faculty',
      dept: 'Higher Mathematics',
      specialty: 'Higher Mathematics & Logic',
      qualification: 'B.Sc. Mathematics',
      description: 'Passionate about transforming complex mathematical formulas and calculus into intuitive problem-solving models.',
    },
  ];

  const devTeam: DevTeamMember[] = [
    {
      name: 'ANIKET SINGH',
      role: 'CTO & Lead Architect',
      education: 'ITER College - Computer Science Engineering',
      bio: 'Full-stack software architect and CTO at RAVEN Tutorials. Specializing in high-performance cloud architectures, real-time student portals, and fluid user experiences.',
      description: 'Full-stack software engineer & CTO at RAVEN Tutorials with 5+ years of software development experience.',
      image: '/AniketSingh.jpg',
      skills: ['Next.js 14', 'React.js', 'Node.js', 'MongoDB', 'TypeScript', 'GSAP Animation', 'Express.js', 'Python'],
      fullProfile: {
        about: 'Passionate full-stack developer and CTO at RAVEN Tutorials with expertise across Next.js, Node.js, and MongoDB. Currently pursuing Computer Science Engineering at ITER College, I specialize in crafting high-performance, real-time educational systems and seamless digital learning portals.',
        skills: [
          'Next.js 14',
          'React.js',
          'TypeScript',
          'Node.js',
          'MongoDB',
          'Express.js',
          'Python',
          'UI/UX & GSAP'
        ],
        education: 'ITER College - Computer Science Engineering',
        experience: '5+ years in Full Stack Architecture & Engineering'
      }
    }
  ];



  // Freeze background when modal is active
  useBodyScrollLock(showModal || showImageModal);

  return (
    <>
      <div ref={containerRef} className="min-h-screen bg-transparent text-white selection:bg-[#10b981] selection:text-white relative overflow-hidden">
        <div className="relative z-10">
          {/* Header Section */}
          <section className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-center">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161922] border border-[#10b981]/30 text-[#34d399] text-xs sm:text-sm font-space font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] mx-auto">
              <Sparkles className="w-4 h-4 text-[#10b981]" />
              <span>About RAVEN Tutorials</span>
            </div>

            <div ref={titleRef} className="w-full">
              <WavyHeading
                text="Architecting"
                gradientText="Academic Excellence"
                className="text-4xl sm:text-6xl md:text-7xl font-black text-white font-outfit tracking-tight leading-[1.1] text-center w-full"
              />
            </div>

            <p
              ref={heroSubRef}
              className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-jakarta font-medium leading-relaxed text-center"
            >
              A premier educational institution in Patna, Bihar dedicated to empowering students through rigorous conceptual clarity, empathetic mentorship, and modern digital learning.
            </p>
          </section>

          {/* Core Pillars: Mission, Approach & Philosophy */}
          <section ref={missionRef} className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div ref={missionGridRef} className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 hover:border-[#10b981]/50 p-8 rounded-3xl transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#161922] border border-[#10b981]/30 flex items-center justify-center text-[#10b981] mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform">
                    <pillar.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-white font-outfit mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-jakarta font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Faculty Showcase */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 content-auto">
            <div ref={facultyHeaderRef} className="text-center mb-14">
              <span className="pill-badge mb-4">Master Mentors</span>
              <WavyHeading
                text="Our Distinguished"
                gradientText="Faculty"
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-outfit tracking-tight"
              />
              <p className="mt-3 text-base text-neutral-400 max-w-2xl mx-auto font-jakarta font-medium">
                Educators with decades of collective experience producing top 100 ranks across Board and National competitive exams.
              </p>
            </div>

            <div ref={facultyGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {faculty.map((member, index) => (
                <div
                  key={index}
                  className="bg-[#0f111a]/85 backdrop-blur-xl border border-white/10 hover:border-[#10b981]/50 p-6 rounded-3xl shadow-xl hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="w-20 h-20 rounded-2xl bg-[#161922] border border-[#10b981]/30 flex items-center justify-center text-[#34d399] mb-5 mx-auto font-black text-2xl font-outfit shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-space font-bold uppercase text-[#6ee7b7] bg-[#14120e] px-3 py-1 rounded-full border border-[#6ee7b7]/30 shadow-sm">
                        {member.dept}
                      </span>
                      <h3 className="text-xl font-black text-white font-outfit mt-3 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-xs text-neutral-400 font-jakarta font-semibold mb-3">
                        {member.qualification}
                      </p>
                      <p className="text-xs text-neutral-400 font-jakarta leading-relaxed font-medium">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Hall of Excellence & Academic Milestones */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 content-auto">
            <div className="text-center mb-14">
              <span className="pill-badge mb-4">Track Record of Success</span>
              <WavyHeading
                text="Hall of Excellence &"
                gradientText="Academic Milestones"
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-outfit tracking-tight"
              />
              <p className="mt-3 text-base text-neutral-400 max-w-2xl mx-auto font-jakarta font-medium">
                Over a decade of mentorship helping students from Patna achieve stellar ranks in JEE, NEET, and Board Examinations.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="p-6 rounded-3xl bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 hover:border-[#10b981]/40 shadow-xl text-center transition-colors">
                <p className="text-4xl sm:text-5xl font-black font-outfit text-[#34d399]">94%</p>
                <p className="font-black text-white font-outfit text-sm sm:text-base mt-2">Selection Rate</p>
                <p className="text-xs text-neutral-400 font-medium font-jakarta mt-1">In competitive entrance tests</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 hover:border-[#10b981]/40 shadow-xl text-center transition-colors">
                <p className="text-4xl sm:text-5xl font-black font-outfit text-white">150+</p>
                <p className="font-black text-white font-outfit text-sm sm:text-base mt-2">IIT & NIT Selections</p>
                <p className="text-xs text-neutral-400 font-medium font-jakarta mt-1">Top Engineering branches</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 hover:border-[#10b981]/40 shadow-xl text-center transition-colors">
                <p className="text-4xl sm:text-5xl font-black font-outfit text-[#6ee7b7]">85+</p>
                <p className="font-black text-white font-outfit text-sm sm:text-base mt-2">AIIMS & Govt MBBS</p>
                <p className="text-xs text-neutral-400 font-medium font-jakarta mt-1">Medical entrance ranks</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 hover:border-[#10b981]/40 shadow-xl text-center transition-colors">
                <p className="text-4xl sm:text-5xl font-black font-outfit text-[#34d399]">500+</p>
                <p className="font-black text-white font-outfit text-sm sm:text-base mt-2">90%+ in Boards</p>
                <p className="text-xs text-neutral-400 font-medium font-jakarta mt-1">CBSE Class 10th & 12th</p>
              </div>
            </div>
          </section>

          {/* Technology & Development Team */}
          <section ref={devSectionRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 content-auto">
            <div className="text-center mb-14">
              <span className="pill-badge mb-4">Engineering & Architecture</span>
              <WavyHeading
                text="Digital Infrastructure &"
                gradientText="Development"
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-outfit tracking-tight"
              />
              <p className="mt-3 text-base text-neutral-400 max-w-2xl mx-auto font-jakarta font-medium">
                The core technology stack and digital learning engineering powering RAVEN Tutorials.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              {devTeam.map((dev, index) => (
                <div
                  key={index}
                  ref={devCardRef}
                  className="p-8 sm:p-10 rounded-3xl bg-[#0f111a]/90 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center space-y-6 transition-all"
                >
                  <div 
                    className="relative w-36 h-36 mx-auto rounded-3xl overflow-hidden border-2 border-[#10b981]/40 shadow-[0_0_25px_rgba(16,185,129,0.3)] group cursor-pointer"
                    onClick={() => setShowImageModal(true)}
                  >
                    <Image
                      src={dev.image || "/AniketSingh.jpg"}
                      alt={dev.name}
                      fill
                      unoptimized
                      priority
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-outfit font-black">
                      <ZoomIn className="w-4 h-4 text-[#34d399]" />
                      <span>View Photo</span>
                    </div>
                  </div>

                  <div>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-[#1a1412] text-[#34d399] border border-[#10b981]/40 shadow-sm font-space tracking-wider">
                      {dev.role}
                    </span>
                    <h3 className="text-3xl font-black text-white font-outfit mt-3">
                      {dev.name}
                    </h3>
                    <p className="text-sm text-neutral-400 font-jakarta font-medium mt-1">
                      {dev.education}
                    </p>
                  </div>

                  <p className="text-neutral-300 text-sm font-jakarta font-medium leading-relaxed">
                    {dev.bio}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {dev.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 bg-[#161922] text-neutral-300 font-bold rounded-xl text-xs border border-white/10 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-sheryians w-full py-4 text-sm font-outfit uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                  >
                    View Full Profile & Tech Stack
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Global High-Priority Modal rendered via React Portal directly into body */}
      {mounted && showModal && createPortal(
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[999999] p-4 sm:p-6 overflow-y-auto overscroll-contain" 
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-[#0f111a] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden relative z-[1000000] my-auto text-white" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-b from-[#1a1412] to-[#0f111a] border-b border-white/10 p-8 relative text-white">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-[#161922] text-white border border-white/15 shadow-lg hover:text-[#10b981] rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-24 h-24 mx-auto mb-3 rounded-full border-2 border-[#10b981]/50 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.3)] relative">
                <Image
                  src={devTeam[0].image || "/AniketSingh.jpg"}
                  alt={devTeam[0].name}
                  fill
                  unoptimized
                  priority
                  className="object-cover object-top"
                />
              </div>
              <h2 className="text-3xl font-black text-center font-outfit">
                {devTeam[0].name}
              </h2>
              <p className="text-[#34d399] text-center font-space text-sm font-bold tracking-wider uppercase mt-1">
                {devTeam[0].role}
              </p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 font-jakarta">
              <div>
                <h4 className="text-lg font-black text-white font-outfit mb-2">About Me</h4>
                <p className="text-neutral-300 text-sm leading-relaxed font-medium">
                  {devTeam[0].fullProfile.about}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-black text-white font-outfit mb-3">Core Skills & Technologies</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {devTeam[0].fullProfile.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="bg-[#161922] border border-[#10b981]/30 text-[#34d399] px-3 py-2 rounded-xl text-center text-xs font-bold font-space shadow-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#08090d] border border-white/10 shadow-lg">
                  <p className="text-xs text-neutral-400 font-space font-bold uppercase">Education</p>
                  <p className="text-sm text-white font-bold mt-1">{devTeam[0].fullProfile.education}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#08090d] border border-white/10 shadow-lg">
                  <p className="text-xs text-neutral-400 font-space font-bold uppercase">Experience</p>
                  <p className="text-sm text-white font-bold mt-1">{devTeam[0].fullProfile.experience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Global Photo Modal rendered via React Portal */}
      {mounted && showImageModal && createPortal(
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[999999] p-4 overscroll-contain" 
          onClick={() => setShowImageModal(false)}
        >
          <button 
            onClick={() => setShowImageModal(false)}
            className="absolute top-6 right-6 text-white bg-[#161922] border border-[#10b981]/40 shadow-xl hover:text-[#10b981] rounded-full p-3 transition z-[1000000]"
          >
            <X className="w-6 h-6" />
          </button>
          <div 
            className="relative max-w-2xl max-h-[85vh] rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-[#08090d] my-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={devTeam[0].image || "/AniketSingh.jpg"}
              alt="Aniket Singh"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>,
        document.body
      )}

      <LMSFooter />
    </>
  );
};

export default AboutUs;
