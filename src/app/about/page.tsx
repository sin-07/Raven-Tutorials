'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Target, BookOpen, Users, X, ZoomIn, Sparkles } from 'lucide-react';
import { LMSFooter } from '@/components/lms';
import WavyHeading from '@/components/WavyHeading';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { 
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

  const pillarStyles = [
    { cardBg: 'bg-[#f0fdf4]', iconBg: 'bg-emerald-300' },
    { cardBg: 'bg-[#dcfce7]', iconBg: 'bg-[#86efac]' },
    { cardBg: 'bg-[#bbf7d0]', iconBg: 'bg-emerald-200' },
  ];

  const facultyColors = [
    'bg-[#f0fdf4]', 'bg-[#dcfce7]', 'bg-[#bbf7d0]', 'bg-[#ecfdf5]', 'bg-[#e6f9ee]'
  ];
  const facultyBadgeColors = [
    'bg-emerald-300', 'bg-[#86efac]', 'bg-emerald-200', 'bg-emerald-300', 'bg-[#86efac]'
  ];

  return (
    <>
      <div ref={containerRef} className="min-h-screen bg-transparent text-neutral-900 selection:bg-emerald-300 selection:text-black relative overflow-hidden">
        <div className="relative z-10">
          {/* Header Section */}
          <section className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-center">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dcfce7] border-2 border-black text-emerald-950 text-xs sm:text-sm font-space font-bold shadow-[2px_2px_0px_#000] mx-auto">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>About RAVEN Tutorials</span>
            </div>

            <div ref={titleRef} className="w-full">
              <WavyHeading
                text="Architecting"
                gradientText="Academic Excellence"
                className="text-4xl sm:text-6xl md:text-7xl font-black text-black font-outfit tracking-tight leading-[1.1] text-center w-full"
              />
            </div>

            <p
              ref={heroSubRef}
              className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto font-jakarta font-medium leading-relaxed text-center"
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
                  className={`${pillarStyles[index % pillarStyles.length].cardBg} border-[2.5px] border-black shadow-[6px_6px_0px_#000] p-8 rounded-3xl transition-all duration-300 group hover:-translate-y-1.5`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${pillarStyles[index % pillarStyles.length].iconBg} border-2 border-black flex items-center justify-center text-black mb-6 shadow-[3px_3px_0px_#000] group-hover:scale-105 transition-transform`}>
                    <pillar.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-black font-outfit mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-800 text-sm font-jakarta font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Faculty Showcase */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-3 border-black content-auto">
            <div ref={facultyHeaderRef} className="text-center mb-14">
              <span className="pill-badge mb-4">Master Mentors</span>
              <WavyHeading
                text="Our Distinguished"
                gradientText="Faculty"
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-black font-outfit tracking-tight"
              />
              <p className="mt-3 text-base text-neutral-700 max-w-2xl mx-auto font-jakarta font-medium">
                Educators with decades of collective experience producing top 100 ranks across Board and National competitive exams.
              </p>
            </div>

            <div ref={facultyGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {faculty.map((member, index) => (
                <div
                  key={index}
                  className={`faculty-card ${facultyColors[index % facultyColors.length]} border-[2.5px] border-black p-6 rounded-3xl shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:-translate-y-1 flex flex-col justify-between transition-all duration-300`}
                >
                  <div>
                    <div className={`w-20 h-20 rounded-2xl ${facultyBadgeColors[index % facultyBadgeColors.length]} border-2 border-black flex items-center justify-center text-black mb-5 mx-auto font-black text-2xl font-outfit shadow-[3px_3px_0px_#000]`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-space font-bold uppercase text-black bg-white px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
                        {member.dept}
                      </span>
                      <h3 className="text-xl font-black text-black font-outfit mt-3 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-xs text-neutral-600 font-jakarta font-semibold mb-3">
                        {member.qualification}
                      </p>
                      <p className="text-xs text-neutral-800 font-jakarta leading-relaxed font-medium">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Hall of Excellence & Academic Milestones */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-3 border-black content-auto">
            <div className="text-center mb-14">
              <span className="pill-badge mb-4">Track Record of Success</span>
              <WavyHeading
                text="Hall of Excellence &"
                gradientText="Academic Milestones"
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-black font-outfit tracking-tight"
              />
              <p className="mt-3 text-base text-neutral-700 max-w-2xl mx-auto font-jakarta font-medium">
                Over a decade of mentorship helping students from Patna achieve stellar ranks in JEE, NEET, and Board Examinations.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="p-6 rounded-3xl bg-[#f0fdf4] border-3 border-black shadow-[5px_5px_0px_#000] text-center">
                <p className="text-4xl sm:text-5xl font-black font-outfit text-emerald-800">94%</p>
                <p className="font-black text-black font-outfit text-sm sm:text-base mt-2">Selection Rate</p>
                <p className="text-xs text-neutral-600 font-bold font-jakarta mt-1">In competitive entrance tests</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#dcfce7] border-3 border-black shadow-[5px_5px_0px_#000] text-center">
                <p className="text-4xl sm:text-5xl font-black font-outfit text-black">150+</p>
                <p className="font-black text-black font-outfit text-sm sm:text-base mt-2">IIT & NIT Selections</p>
                <p className="text-xs text-neutral-600 font-bold font-jakarta mt-1">Top Engineering branches</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#bbf7d0] border-3 border-black shadow-[5px_5px_0px_#000] text-center">
                <p className="text-4xl sm:text-5xl font-black font-outfit text-emerald-950">85+</p>
                <p className="font-black text-black font-outfit text-sm sm:text-base mt-2">AIIMS & Govt MBBS</p>
                <p className="text-xs text-neutral-600 font-bold font-jakarta mt-1">Medical entrance ranks</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#fef9c3] border-3 border-black shadow-[5px_5px_0px_#000] text-center">
                <p className="text-4xl sm:text-5xl font-black font-outfit text-amber-950">500+</p>
                <p className="font-black text-black font-outfit text-sm sm:text-base mt-2">90%+ in Boards</p>
                <p className="text-xs text-neutral-600 font-bold font-jakarta mt-1">CBSE Class 10th & 12th</p>
              </div>
            </div>
          </section>

          {/* Technology & Development Team */}
          <section ref={devSectionRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-3 border-black content-auto">
            <div className="text-center mb-14">
              <span className="pill-badge mb-4">Engineering & Architecture</span>
              <WavyHeading
                text="Digital Infrastructure &"
                gradientText="Development"
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-black font-outfit tracking-tight"
              />
              <p className="mt-3 text-base text-neutral-700 max-w-2xl mx-auto font-jakarta font-medium">
                The core technology stack and digital learning engineering powering RAVEN Tutorials.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              {devTeam.map((dev, index) => (
                <div
                  key={index}
                  ref={devCardRef}
                  className="p-8 sm:p-10 rounded-3xl bg-[#f0fdf4] border-3 border-black shadow-[8px_8px_0px_#000] text-center space-y-6 transition-all"
                >
                  <div 
                    className="relative w-36 h-36 mx-auto rounded-3xl overflow-hidden border-3 border-black shadow-[4px_4px_0px_#000] group cursor-pointer"
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
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-outfit font-black">
                      <ZoomIn className="w-4 h-4 text-emerald-300" />
                      <span>View Photo</span>
                    </div>
                  </div>

                  <div>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-[#4ade80] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-space tracking-wider">
                      {dev.role}
                    </span>
                    <h3 className="text-3xl font-black text-black font-outfit mt-3">
                      {dev.name}
                    </h3>
                    <p className="text-sm text-neutral-700 font-jakarta font-medium mt-1">
                      {dev.education}
                    </p>
                  </div>

                  <p className="text-neutral-800 text-sm font-jakarta font-medium leading-relaxed">
                    {dev.bio}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {dev.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 bg-white text-black font-bold rounded-xl text-xs border-2 border-black shadow-[2px_2px_0px_#000]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-cartoon w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl transition-all duration-300 shadow-[4px_4px_0px_#000] border-2 border-black text-sm font-outfit active:translate-x-1 active:translate-y-1"
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999999] p-4 sm:p-6 overflow-y-auto overscroll-contain" 
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-[#f0fdf4] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain border-3 border-black shadow-[10px_10px_0px_#000] overflow-hidden relative z-[1000000] my-auto text-black" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#86efac] border-b-3 border-black p-8 relative text-black">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-rose-200 rounded-full p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-24 h-24 mx-auto mb-3 rounded-full border-3 border-black overflow-hidden shadow-[4px_4px_0px_#000] relative">
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
              <p className="text-black text-center font-space text-sm font-bold tracking-wider uppercase mt-1">
                {devTeam[0].role}
              </p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 font-jakarta">
              <div>
                <h4 className="text-lg font-black text-black font-outfit mb-2">About Me</h4>
                <p className="text-neutral-800 text-sm leading-relaxed font-medium">
                  {devTeam[0].fullProfile.about}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-black text-black font-outfit mb-3">Core Skills & Technologies</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {devTeam[0].fullProfile.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="bg-[#dcfce7] border-2 border-black text-black px-3 py-2 rounded-xl text-center text-xs font-bold font-space shadow-[2px_2px_0px_#000]"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#dcfce7] border-2 border-black shadow-[3px_3px_0px_#000]">
                  <p className="text-xs text-neutral-800 font-space font-bold uppercase">Education</p>
                  <p className="text-sm text-black font-bold mt-1">{devTeam[0].fullProfile.education}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#dcfce7] border-2 border-black shadow-[3px_3px_0px_#000]">
                  <p className="text-xs text-neutral-800 font-space font-bold uppercase">Experience</p>
                  <p className="text-sm text-black font-bold mt-1">{devTeam[0].fullProfile.experience}</p>
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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999999] p-4 overscroll-contain" 
          onClick={() => setShowImageModal(false)}
        >
          <button 
            onClick={() => setShowImageModal(false)}
            className="absolute top-6 right-6 text-black bg-emerald-300 border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-emerald-200 rounded-full p-3 transition z-[1000000]"
          >
            <X className="w-6 h-6" />
          </button>
          <div 
            className="relative max-w-2xl max-h-[85vh] rounded-3xl overflow-hidden border-3 border-black shadow-[10px_10px_0px_#000] bg-white my-auto" 
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
