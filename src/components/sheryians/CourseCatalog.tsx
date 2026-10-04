'use client';

import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Star,
  Layers,
  Code,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';

export interface SheryiansCourse {
  id: string;
  title: string;
  category: 'all' | 'bootcamp' | 'frontend' | 'backend' | 'dsa' | 'free';
  tag: string;
  badgeColor?: string;
  mentor: string;
  mentorRole: string;
  duration: string;
  level: string;
  projectsCount: string;
  price: number;
  originalPrice: number;
  discount: string;
  techStack: string[];
  description: string;
  highlights: string[];
  syllabusOverview: {
    week: string;
    topic: string;
    details: string;
  }[];
}

export const sheryiansCourses: SheryiansCourse[] = [
  {
    id: 'ai-fullstack-cohort',
    title: 'Job-Ready AI Full-Stack Web Development Cohort',
    category: 'bootcamp',
    tag: 'Flagship Bestseller',
    badgeColor: 'bg-[#e8602e] text-white',
    mentor: 'Harsh Sharma & Sarthak Sharma',
    mentorRole: 'Founder & Full-Stack Architect',
    duration: '6 Months (Live + Weekend Labs)',
    level: 'Beginner to Advanced',
    projectsCount: '12 Production Projects',
    price: 5999,
    originalPrice: 12999,
    discount: '54% OFF',
    techStack: ['React 19', 'Next.js 15', 'Node.js', 'MongoDB', 'Docker', 'GenAI APIs', 'TypeScript'],
    description: 'Transform from raw beginner into an industry-grade software engineer. Build real SaaS platforms, integrate GenAI agents, and prepare for placement interviews with FAANG mentors.',
    highlights: [
      '12+ Production-grade portfolio projects',
      '24/7 dedicated Discord Mentor Debugging Lounge',
      'Resume roast, portfolio reviews & mock interviews',
      'Direct interview drives with 350+ hiring partners',
      'Lifetime access to recordings & course community',
    ],
    syllabusOverview: [
      { week: 'Month 1', topic: 'Logic Building & JavaScript Mastery', details: 'Execution context, closures, event loop, prototypes, asynchronous JS & DOM.' },
      { week: 'Month 2', topic: 'Modern Frontend with React 19 & Tailwind', details: 'Hooks, custom hooks, Redux Toolkit, Framer Motion, and scalable component architecture.' },
      { week: 'Month 3', topic: 'Production Backend & RESTful Microservices', details: 'Node.js, Express, MongoDB, Aggregation pipelines, JWT authentication, and secure cookies.' },
      { week: 'Month 4', topic: 'Next.js 15 App Router & Full-Stack Cloud', details: 'Server Actions, SSR, ISR, Turbopack, Prisma ORM, and Dockerized deployment on AWS.' },
      { week: 'Month 5', topic: 'AI Integration & Advanced Engineering', details: 'LangChain, OpenAI API, vector embeddings, WebSockets for real-time chat & WebRTC.' },
      { week: 'Month 6', topic: 'Placement Bootcamp & Mock Interviews', details: 'DSA coding rounds, system design for juniors, behavioral prep, and hiring drives.' },
    ],
  },
  {
    id: 'frontend-gsap-domination',
    title: 'Front-End DOMination with GSAP & Three.js',
    category: 'frontend',
    tag: 'Awwwards Level',
    badgeColor: 'bg-gradient-to-r from-amber-500 to-[#e8602e] text-white',
    mentor: 'Harsh Sharma',
    mentorRole: 'Creative Dev Pioneer',
    duration: '2.5 Months (Self-Paced + Live Doubt Clear)',
    level: 'Intermediate',
    projectsCount: '5 Award-Winning Clones',
    price: 3499,
    originalPrice: 7999,
    discount: '56% OFF',
    techStack: ['Advanced JS', 'GSAP 3.0', 'ScrollTrigger', 'Three.js', 'Canvas API', 'Locomotive'],
    description: 'The course that put Sheryians on the global map! Master buttery-smooth web animations, 3D interactive graphics, shaders, and create websites that win Awwwards Site of the Day.',
    highlights: [
      'Clone 5 world-class award-winning websites (Apple, Ray-Ban, Magma)',
      'Master GSAP timeline, ScrollTrigger, and SVG morphing',
      'Three.js 3D models, shaders, particle systems & orbit controls',
      'Build a portfolio that blows international recruiters away',
      'Exclusive access to Sheryians Creative Dev Hall of Fame',
    ],
    syllabusOverview: [
      { week: 'Week 1-2', topic: 'Deep DOM & Canvas Fundamentals', details: 'HTML5 Canvas rendering, physics simulation, custom cursors, and magnetic buttons.' },
      { week: 'Week 3-4', topic: 'GSAP 3.0 & ScrollTrigger Dominance', details: 'Complex timelines, pin scrolling, scrub animations, text reveals, and batch triggers.' },
      { week: 'Week 5-7', topic: 'Interactive 3D Web with Three.js', details: 'Meshes, geometries, GLTF/GLB models, camera movement, lights, and post-processing.' },
      { week: 'Week 8-10', topic: 'Awwwards Capstone & Optimization', details: '60fps rendering performance, responsive canvas scaling, and deployment.' },
    ],
  },
  {
    id: 'backend-domination',
    title: 'Backend Domination: Node.js, Microservices & System Design',
    category: 'backend',
    tag: 'Industry Heavy',
    badgeColor: 'bg-[#1e2238] border border-white/20 text-[#ffaa40]',
    mentor: 'Dhananjay Bhavsar & Sarthak Sharma',
    mentorRole: 'Lead Distributed Systems Architects',
    duration: '3.5 Months (Live Weekend Classes)',
    level: 'Intermediate to Advanced',
    projectsCount: '6 Production Microservices',
    price: 4299,
    originalPrice: 8999,
    discount: '52% OFF',
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'WebSockets'],
    description: 'Learn to build rock-solid backend infrastructure that handles 100,000+ concurrent requests. Master caching with Redis, message queues with Kafka, and clean microservices architecture.',
    highlights: [
      'Build a high-scale real-time chat & video streaming platform',
      'Database optimization, indexing, and MongoDB aggregation mastery',
      'Distributed caching with Redis & pub/sub messaging with Kafka',
      'Docker containerization, rate limiters, and reverse proxies',
      'Comprehensive system design interviews preparation',
    ],
    syllabusOverview: [
      { week: 'Module 1', topic: 'Advanced Node.js Internals & Event Loop', details: 'Libuv, worker threads, streams, buffers, clustering, and memory leaks.' },
      { week: 'Module 2', topic: 'Relational & NoSQL Database Architecture', details: 'PostgreSQL schema design, ACID transactions, MongoDB indexing & complex lookups.' },
      { week: 'Module 3', topic: 'Scalability: Redis Caching & Message Queues', details: 'Distributed locks, session store, rate limiting, and Kafka message brokers.' },
      { week: 'Module 4', topic: 'Microservices, Docker & Production Deployment', details: 'Docker containers, API gateways, load balancing with NGINX, and CI/CD.' },
    ],
  },
  {
    id: '100-day-bootcamp',
    title: '100-Day Intensive Coding Bootcamp (Zero to Job-Ready)',
    category: 'bootcamp',
    tag: 'Intensive Full-Time',
    badgeColor: 'bg-gradient-to-r from-red-600 to-[#e8602e] text-white',
    mentor: 'Harsh Sharma, Sarthak & Senior Mentors',
    mentorRole: 'Comprehensive Core Faculty',
    duration: '100 Days (Daily 6 Hours Immersion)',
    level: 'Complete Beginner to Pro',
    projectsCount: '20+ Projects & SaaS',
    price: 14999,
    originalPrice: 29999,
    discount: '50% OFF',
    techStack: ['Full Stack MERN', 'DSA in Java', 'System Design', 'DevOps', 'Git & CI/CD'],
    description: 'The ultimate immersive coding experience. 100 days of disciplined code, daily assignments, mentor reviews, live problem solving, and guaranteed interview opportunities.',
    highlights: [
      '6 hours daily live coding & mentor pair programming',
      'Personal dedicated mentor assigned to track daily progress',
      'Weekly hackathons, code reviews, and leaderboard standings',
      'Direct interview drives with unicorn startups and product firms',
      'Available both Online and at Sheryians Offline Campus (Bhopal)',
    ],
    syllabusOverview: [
      { week: 'Days 1-25', topic: 'Logic & Problem Solving Fundamentals', details: 'Algorithms, data structures, and mastering JavaScript from ground zero.' },
      { week: 'Days 26-55', topic: 'Advanced Frontend & Interactive Engineering', details: 'React, Next.js, state management, animations, and responsive UI perfection.' },
      { week: 'Days 56-80', topic: 'Production Backend & Cloud Systems', details: 'Node, Express, databases, authentication, security, and cloud deployment.' },
      { week: 'Days 81-100', topic: 'Capstone SaaS, Placement Drives & Hiring', details: 'Building an enterprise-scale SaaS, mock interviews, and recruiter rounds.' },
    ],
  },
  {
    id: 'java-dsa-masterclass',
    title: 'Java + Data Structures & Algorithms (The Logic Masterclass)',
    category: 'dsa',
    tag: 'Crack Top Tech Rounds',
    badgeColor: 'bg-emerald-600 text-white',
    mentor: 'Sarthak Sharma',
    mentorRole: 'Competitive Programming Expert',
    duration: '4 Months (Live Sessions)',
    level: 'Beginner to Intermediate',
    projectsCount: '300+ Curated Problems',
    price: 3899,
    originalPrice: 7500,
    discount: '48% OFF',
    techStack: ['Java 21', 'Big-O', 'Recursion', 'DP', 'Trees', 'Graphs', 'LeetCode'],
    description: 'Master algorithmic thinking and conquer technical coding rounds at Google, Amazon, Microsoft, and high-paying startups with Sheryians intuitive problem-solving patterns.',
    highlights: [
      '300+ handpicked LeetCode medium & hard problems solved live',
      'Master Dynamic Programming, Graphs, and Tree traversals with ease',
      'Step-by-step intuition for pattern recognition in coding interviews',
      'Timed mock coding contests on Sheryians internal assessment portal',
      'Direct preparation for FAANG and Tier-1 product interviews',
    ],
    syllabusOverview: [
      { week: 'Phase 1', topic: 'Java OOPs & Time Complexity (Big-O)', details: 'Memory management, pointers intuition in Java, arrays, and space-time tradeoffs.' },
      { week: 'Phase 2', topic: 'Recursion, Backtracking & Linked Lists', details: 'Mastering recursion tree diagrams, permutations, subsets, and fast-slow pointers.' },
      { week: 'Phase 3', topic: 'Stacks, Queues, Binary Trees & BSTs', details: 'Monotonic stack patterns, DFS/BFS traversals, LCA, and tree balance.' },
      { week: 'Phase 4', topic: 'Graphs & Dynamic Programming Mastery', details: 'Dijkstra, Topological sort, 0/1 Knapsack, LCS, and interval DP problems.' },
    ],
  },
  {
    id: 'free-javascript-logic',
    title: 'Free Logic Building & JavaScript Starter Pack',
    category: 'free',
    tag: '100% Free Forever',
    badgeColor: 'bg-zinc-700 text-white',
    mentor: 'Harsh Sharma',
    mentorRole: 'Lead Instructor',
    duration: '2 Weeks (Self-Paced)',
    level: 'Absolute Beginners',
    projectsCount: '3 Mini Projects',
    price: 0,
    originalPrice: 2999,
    discount: 'FREE',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Logic Building', 'DOM'],
    description: 'Start your coding journey the right way. No credit card required. Learn the fundamental building blocks of programming, conditional logic, arrays, and basic DOM manipulation.',
    highlights: [
      '50+ beginner coding problems with video solutions',
      'Build an interactive music player and to-do list app',
      'Access to the Sheryians Discord community of 150,000+ coders',
      'Certificate of completion to kickstart your portfolio',
    ],
    syllabusOverview: [
      { week: 'Week 1', topic: 'Variables, Conditionals & Loops', details: 'Understanding how a computer thinks, if-else, while/for loops, and math operations.' },
      { week: 'Week 2', topic: 'Arrays, Objects & Basic DOM Events', details: 'Manipulating lists, objects, button click events, and modifying webpage elements.' },
    ],
  },
];

interface CourseCatalogProps {
  onSelectCourse: (course: SheryiansCourse) => void;
  onOpenCounseling: () => void;
}

export default function CourseCatalog({ onSelectCourse, onOpenCounseling }: CourseCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'bootcamp', label: 'Flagship Bootcamps' },
    { id: 'frontend', label: 'Frontend & Creative (GSAP/3D)' },
    { id: 'backend', label: 'Backend & Cloud' },
    { id: 'dsa', label: 'DSA & Interview Prep' },
    { id: 'free', label: 'Free Starter Packs' },
  ];

  const filteredCourses = activeCategory === 'all'
    ? sheryiansCourses
    : sheryiansCourses.filter((course) => course.category === activeCategory);

  return (
    <section id="courses" className="py-20 lg:py-28 bg-[#06070a] relative font-jakarta select-none">
      
      {/* Background radial glow */}
      <div 
        className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #e8602e 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161210] border border-[#e8602e]/30 text-[#ff7b47] text-xs font-space font-extrabold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#e8602e]" />
            Industry-Grade Curriculum
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-outfit tracking-tight">
            Flagship Programs & <span className="text-[#e8602e]">Cohorts</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Curated by engineers from top product companies. Designed to take you from writing your first line of code to building production software that gets you hired.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#e8602e] text-white shadow-[0_0_20px_rgba(232,96,46,0.45)]'
                  : 'bg-[#10121a] text-zinc-400 hover:text-white hover:bg-[#181a26] border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="sheryians-card flex flex-col justify-between p-6 sm:p-7 relative group overflow-hidden border border-white/10 hover:border-[#e8602e]/50"
            >
              {/* Top Accent Strip */}
              <div className="space-y-4">
                
                {/* Header Tag & Discount Ribbon */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-space font-extrabold uppercase tracking-wider ${course.badgeColor || 'bg-[#e8602e] text-white'}`}>
                    {course.tag}
                  </span>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                    {course.discount}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white font-outfit leading-tight group-hover:text-[#ff7b47] transition">
                  {course.title}
                </h3>

                {/* Short Description */}
                <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {course.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-[#141622] border border-white/10 text-zinc-300 text-[11px] font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Meta details */}
                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-zinc-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#e8602e]" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#e8602e]" />
                    <span>{course.projectsCount}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="pt-2 space-y-2">
                  {course.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#e8602e] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Price & Action Buttons */}
              <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                
                {/* Mentor Info & Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
                      Mentor
                    </div>
                    <div className="text-xs font-bold text-white font-outfit">
                      {course.mentor}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white font-outfit">
                        {course.price === 0 ? 'FREE' : `₹${course.price.toLocaleString('en-IN')}`}
                      </span>
                      {course.price > 0 && (
                        <span className="text-xs text-zinc-500 line-through font-mono">
                          ₹{course.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      Limited seats per batch
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="btn-sheryians-outline w-full py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Syllabus</span>
                  </button>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="btn-sheryians w-full py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Counseling Help Box */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#11121c] via-[#17141f] to-[#11121c] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-black text-white font-outfit">
              Confused about which program fits your goals?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              Speak directly with our senior developer counselors. Get a tailored learning roadmap.
            </p>
          </div>

          <button
            onClick={onOpenCounseling}
            className="btn-sheryians px-6 py-3 text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer"
          >
            Request 1:1 Counseling
          </button>
        </div>

      </div>
    </section>
  );
}
