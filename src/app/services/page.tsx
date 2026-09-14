'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Microscope, 
  FileText, 
  BarChart3, 
  Book, 
  Rocket, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { LMSFooter } from '@/components/lms';
import WavyHeading from '@/components/WavyHeading';
import { 
  animateFromUp, 
  animateFromDown, 
  scrollFromUp, 
  scrollFromDown, 
  scrollStaggerDirectional 
} from '@/lib/gsap';

const Services: React.FC = () => {
  const router = useRouter();

  // GSAP refs
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const detailsSectionRef = useRef<HTMLElement>(null);
  const detailsHeaderRef = useRef<HTMLDivElement>(null);
  const classCardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    animateFromUp(badgeRef.current, { distance: 25, duration: 0.6 });
    animateFromDown(titleRef.current, { distance: 30, duration: 0.7, delay: 0.1 });
    animateFromDown(heroSubRef.current, { distance: 25, duration: 0.7, delay: 0.2 });

    if (servicesGridRef.current) {
      scrollStaggerDirectional(servicesGridRef.current.children, 'cross', 0.08, { distance: 35 });
    }

    if (detailsHeaderRef.current) {
      scrollFromUp(detailsHeaderRef.current, { distance: 30 });
    }

    if (classCardsRef.current) {
      scrollStaggerDirectional(classCardsRef.current.children, 'alternating', 0.15, { distance: 40 });
    }

    if (ctaRef.current) {
      scrollFromDown(ctaRef.current, { distance: 35 });
    }
  }, []);

  const services = [
    {
      icon: BookOpen,
      title: 'Full Week Classroom Sessions',
      description: 'Systematic daily lectures conducted throughout the week with dedicated doubt-clearing sessions on Sundays.',
    },
    {
      icon: GraduationCap,
      title: 'Career & Olympiad Workshops',
      description: 'Special seminars aimed at guiding students toward competitive examinations, Olympiads, and STEM career opportunities.',
    },
    {
      icon: Users,
      title: '1-on-1 Individual Mentorship',
      description: 'Personalized diagnostic sessions designed to resolve specific learning bottlenecks for each individual student.',
    },
    {
      icon: Microscope,
      title: 'Science Practical Demonstrations',
      description: 'Hands-on laboratory simulations and experiment breakdowns ensuring intuitive real-world comprehension.',
    },
    {
      icon: FileText,
      title: 'Monthly Benchmarking Tests',
      description: 'Rigorous monthly assessments designed to track academic velocity, subject retention, and time management.',
    },
    {
      icon: BarChart3,
      title: 'Board Pattern Proctored Exams',
      description: 'Full-syllabus mock tests strictly matching CBSE, ICSE, and BSEB board patterns for Classes 10 and 12.',
    },
    {
      icon: Book,
      title: 'Specialized Revision Batches',
      description: 'Focused revision modules and formula-sheet reviews before pre-boards and national level competitive exams.',
    },
    {
      icon: Rocket,
      title: 'High-Impact Crash Courses',
      description: 'Fast-track intensive programs covering key high-weightage topics and previous years question (PYQ) solving.',
    }
  ];

  const serviceColors = [
    'bg-[#f0fdf4]',
    'bg-[#dcfce7]',
    'bg-[#bbf7d0]',
    'bg-[#ecfdf5]',
    'bg-[#e6f9ee]',
    'bg-[#d1fae5]',
    'bg-[#f0fdf4]',
    'bg-[#dcfce7]'
  ];

  const iconColors = [
    'bg-emerald-300',
    'bg-emerald-200',
    'bg-[#86efac]',
    'bg-emerald-300',
    'bg-emerald-200',
    'bg-[#86efac]',
    'bg-emerald-300',
    'bg-emerald-200'
  ];

  return (
    <>
      <div ref={containerRef} className="min-h-screen bg-transparent text-neutral-900 selection:bg-emerald-300 selection:text-black relative overflow-hidden">
        <div className="relative z-10">
          {/* Header Section */}
          <section className="pt-36 pb-14 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-center">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dcfce7] border-2 border-black text-emerald-950 text-xs sm:text-sm font-space font-bold shadow-[2px_2px_0px_#000] mx-auto">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Comprehensive Academic Offerings</span>
            </div>

            <div ref={titleRef} className="w-full">
              <WavyHeading
                text="Academic"
                gradientText="Services & Programs"
                className="text-4xl sm:text-6xl md:text-7xl font-black text-black font-outfit tracking-tight leading-[1.1] text-center w-full"
              />
            </div>

            <p
              ref={heroSubRef}
              className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto font-jakarta font-medium leading-relaxed text-center"
            >
              Tailored classroom pedagogy, intensive mock testing series, and individualized doubt mentorship built to guarantee rank improvements.
            </p>
          </section>

          {/* Services Matrix */}
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div ref={servicesGridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`service-card ${serviceColors[index % serviceColors.length]} border-[2.5px] border-black shadow-[5px_5px_0px_#000] p-7 sm:p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[7px_7px_0px_#000] flex flex-col justify-between`}
                >
                  <div>
                    <div className={`w-14 h-14 rounded-2xl ${iconColors[index % iconColors.length]} border-2 border-black flex items-center justify-center text-black mb-6 shadow-[3px_3px_0px_#000]`}>
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-black text-black mb-3 font-outfit">
                      {service.title}
                    </h3>
                    <p className="text-neutral-800 text-sm leading-relaxed font-jakarta font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Class, Batch & Subject Details */}
          <section ref={detailsSectionRef} className="py-24 bg-transparent border-t-3 border-black px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div ref={detailsHeaderRef} className="text-center mb-14">
                <span className="pill-badge mb-4">Batch Framework</span>
                <WavyHeading
                  text="Class & Subject"
                  gradientText="Structure"
                  as="h2"
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-black font-outfit tracking-tight"
                />
                <p className="mt-3 text-base text-neutral-700 max-w-2xl mx-auto font-jakarta font-medium">
                  Explore curriculum tracks across foundational and senior secondary standards.
                </p>
              </div>

              {/* Class Cards Grid */}
              <div ref={classCardsRef} className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {/* Class XII */}
                <div className="class-card p-8 rounded-3xl bg-[#f0fdf4] border-[2.5px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-all">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center text-black font-black text-2xl font-outfit shadow-[3px_3px_0px_#000]">
                        12
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-black font-outfit">Class XII</h3>
                        <p className="text-xs text-neutral-800 font-space font-bold uppercase">Senior Secondary & Boards</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#dcfce7] border-2 border-black text-black rounded-full text-xs font-bold shadow-[2px_2px_0px_#000]">Subject-wise</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 font-jakarta text-sm">
                    <div className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                      <p className="font-black text-black font-outfit mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-black" />
                        Annual Batch
                      </p>
                      <ul className="space-y-1.5 text-neutral-800 text-xs font-medium">
                        <li>• Physics (Theory + Numericals)</li>
                        <li>• Chemistry (Organic, Inorganic, Physical)</li>
                        <li>• Biology (Zoology & Botany)</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                      <p className="font-black text-black font-outfit mb-2 flex items-center gap-1.5">
                        <Rocket className="w-4 h-4 text-black" />
                        Crash Course
                      </p>
                      <ul className="space-y-1.5 text-neutral-800 text-xs font-medium">
                        <li>• Rapid Board PYQ Solving</li>
                        <li>• High-Weightage Concept Blitz</li>
                        <li>• Proctored Sample Paper Series</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Class XI */}
                <div className="class-card p-8 rounded-3xl bg-[#f0fdf4] border-[2.5px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-all">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#86efac] border-2 border-black flex items-center justify-center text-black font-black text-2xl font-outfit shadow-[3px_3px_0px_#000]">
                        11
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-black font-outfit">Class XI</h3>
                        <p className="text-xs text-neutral-800 font-space font-bold uppercase">Foundation for Competitive Exams</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#dcfce7] border-2 border-black text-black rounded-full text-xs font-bold shadow-[2px_2px_0px_#000]">Subject-wise</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 font-jakarta text-sm">
                    <div className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                      <p className="font-black text-black font-outfit mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-black" />
                        Annual Batch
                      </p>
                      <ul className="space-y-1.5 text-neutral-800 text-xs font-medium">
                        <li>• Physics (Mechanics & Waves)</li>
                        <li>• Chemistry (Fundamental Principles)</li>
                        <li>• Biology (Cell & Diversity)</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                      <p className="font-black text-black font-outfit mb-2 flex items-center gap-1.5">
                        <Rocket className="w-4 h-4 text-black" />
                        Competitive Edge
                      </p>
                      <ul className="space-y-1.5 text-neutral-800 text-xs font-medium">
                        <li>• JEE / NEET Problem Drills</li>
                        <li>• Advanced DPPs & Numerical Sets</li>
                        <li>• Continuous Speed Benchmarking</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Class X */}
                <div className="class-card p-8 rounded-3xl bg-[#f0fdf4] border-[2.5px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-all">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center text-black font-black text-2xl font-outfit shadow-[3px_3px_0px_#000]">
                        10
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-black font-outfit">Class X</h3>
                        <p className="text-xs text-neutral-800 font-space font-bold uppercase">Board Target Batch</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#dcfce7] border-2 border-black text-black rounded-full text-xs font-bold shadow-[2px_2px_0px_#000]">Full Syllabus</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 font-jakarta text-sm">
                    <div className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                      <p className="font-black text-black font-outfit mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-black" />
                        Comprehensive Batch
                      </p>
                      <ul className="space-y-1.5 text-neutral-800 text-xs font-medium">
                        <li>• Mathematics & Higher Geometry</li>
                        <li>• Science (Physics, Chem, Bio)</li>
                        <li>• Social Science & English</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                      <p className="font-black text-black font-outfit mb-2 flex items-center gap-1.5">
                        <Rocket className="w-4 h-4 text-black" />
                        Pre-Board Crash Batch
                      </p>
                      <ul className="space-y-1.5 text-neutral-800 text-xs font-medium">
                        <li>• Full Mock Paper Simulations</li>
                        <li>• Answer Writing Optimization</li>
                        <li>• 100% Board Syllabus Review</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Class IX */}
                <div className="class-card p-8 rounded-3xl bg-[#f0fdf4] border-[2.5px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-all">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#86efac] border-2 border-black flex items-center justify-center text-black font-black text-2xl font-outfit shadow-[3px_3px_0px_#000]">
                        09
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-black font-outfit">Class IX</h3>
                        <p className="text-xs text-neutral-800 font-space font-bold uppercase">Foundation Building</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#dcfce7] border-2 border-black text-black rounded-full text-xs font-bold shadow-[2px_2px_0px_#000]">Full Syllabus</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 font-jakarta text-sm">
                    <div className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                      <p className="font-black text-black font-outfit mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-black" />
                        Annual Program
                      </p>
                      <ul className="space-y-1.5 text-neutral-800 text-xs font-medium">
                        <li>• Mathematics & Logical Reasoning</li>
                        <li>• General Science Foundations</li>
                        <li>• English & Social Studies</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                      <p className="font-black text-black font-outfit mb-2 flex items-center gap-1.5">
                        <Rocket className="w-4 h-4 text-black" />
                        Exam Revision
                      </p>
                      <ul className="space-y-1.5 text-neutral-800 text-xs font-medium">
                        <li>• School Exam Question Banks</li>
                        <li>• Weekly Timed Tests</li>
                        <li>• Conceptual Doubt Resolution</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section ref={ctaRef} className="py-20 border-t-3 border-black px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-4xl mx-auto p-10 sm:p-14 bg-[#dcfce7] border-3 border-black rounded-3xl shadow-[8px_8px_0px_#000] space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black font-outfit">
                Ready to Join a Batch?
              </h2>
              <p className="text-neutral-900 max-w-xl mx-auto font-jakarta text-base font-semibold">
                Secure your admission today and start your journey toward academic distinction.
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <Link
                  href="/admission"
                  className="btn-cartoon px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl shadow-[4px_4px_0px_#000] border-2 border-black transition-all font-outfit inline-flex items-center gap-2 text-lg"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-5 h-5 text-black" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <LMSFooter />
    </>
  );
};

export default Services;


