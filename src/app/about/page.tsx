'use client';

import React, { useState } from 'react';
import { Target, BookOpen, Users, Code, X, ZoomIn } from 'lucide-react';
import { LMSNavbar, LMSFooter } from '@/components/lms';

interface FacultyMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

interface DevTeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  fullProfile: {
    about: string;
    skills: string[];
    education: string;
    experience: string;
  };
}

// Sheryians-style accent color
const ACCENT = '#00E5A8';

const AboutUs: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  
  const faculty: FacultyMember[] = [
    {
      name: 'S. Nandan Verma',
      role: 'Faculty & Operations Head',
      description: 'Being a student of Life Sciences, I cherish life and its forms. Want to develop an inquisitive aptitude in students regarding their education and career.',
      image: '/faculty/nandan.jpg'
    },
    {
      name: 'Rakesh Ranjan',
      role: 'CEO',
      description: 'Pursuing MBBS at NMCH, Patna. Ardent reader. Teaching students for previous 3-4 years as freelancer. Exploring academia for delectational pedagogy with student community in focus. Want to develop a platform for students having dreams of exploration other than trendy profession.',
      image: '/faculty/rakesh.jpg'
    },
    {
      name: 'Abhinay Gupta',
      role: 'Chief Project Officer',
      description: 'Expertise in Commerce, Digital Marketing, Social media Coordinator. B.com Graduate Having a strong foundation in business principle, finance, taxation, accounting, Auditing, Business Management. My degree reflects my passion to do business in effective and efficient manner.',
      image: '/faculty/abhinay.jpg'
    },
    {
      name: 'Niraj Kumar',
      role: 'Faculty & CPRO',
      description: 'Pursuing Integrated B.Ed(B.A-B.Ed) from BRABU. CTET Qualified. Expertise in teaching.',
      image: '/faculty/niraj.jpg'
    },
    {
      name: 'Guddu Kumar',
      role: 'Faculty',
      description: 'B. Sc. Graduate in Mathematics. I have a passion for teaching and interacting with students coming from different backgrounds. An experience of 4 years as a full-time teacher has enabled me to unlock my problem-solving aptitude for my students.',
      image: '/faculty/guddu.jpg'
    }
  ];

  const devTeam: DevTeamMember[] = [
    {
      name: 'ANIKET SINGH',
      role: 'CTO',
      description: 'This one is Full-stack developer with 5+ years of experience and mental aging thanks to debugging. Passionate about web development, problem-solving, and pretending I understand every new technology released each week. Code, coffee, chaos and that\'s my life.',
      image: '/team/aniket.jpg',
      fullProfile: {
        about: 'Passionate full-stack developer and CTO at RAVEN Tutorials with expertise in the MERN stack. Currently pursuing Computer Science Engineering at ITER College, I specialize in creating innovative educational platforms and web applications. My journey in technology is driven by the desire to make learning accessible and engaging for everyone.',
        skills: [
          'React.js',
          'Node.js',
          'MongoDB',
          'Express.js',
          'JavaScript',
          'Python',
          'UI/UX Design',
          'Full Stack Development'
        ],
        education: 'ITER College - Computer Science Engineering',
        experience: '5+ years in Full Stack Development'
      }
    }
  ];

  return (
    <>
      <LMSNavbar />
      <div className="min-h-screen bg-[#0b0b0b] relative overflow-hidden">
        {/* Green Radial Glow Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_top,_rgba(0,229,168,0.2)_0%,_rgba(0,229,168,0.1)_30%,_transparent_70%)]"></div>
        </div>

        <div className="relative z-10">
        {/* Header */}
        <section className="py-16 pt-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up font-machina">About <span className="text-[#00E5A8]">RAVEN</span> Tutorials</h1>
              <p className="text-lg text-gray-400 animate-fade-in font-helvetica" style={{ animationDelay: '0.2s' }}>
                A home-based institution dedicated to providing affordable and comprehensive learning
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6 animate-slide-up">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#00E5A8]/10 border border-[#00E5A8]/30 rounded-lg">
                  <Target className="w-6 h-6 text-[#00E5A8]" />
                </div>
                <h2 className="text-3xl font-bold text-white font-machina">Our Mission</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg animate-fade-in font-helvetica" style={{ animationDelay: '0.2s' }}>
                Welcome to RAVEN Tutorials, a home-based institution dedicated to providing an affordable 
                and comprehensive learning experience. We boost each student&apos;s potential, both academically 
                and morally, to maximize their future opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="bg-[#080808] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6 animate-slide-up">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#00E5A8]/10 border border-[#00E5A8]/30 rounded-lg">
                  <BookOpen className="w-6 h-6 text-[#00E5A8]" />
                </div>
                <h2 className="text-3xl font-bold text-white font-machina">Our Approach</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg animate-fade-in font-helvetica" style={{ animationDelay: '0.2s' }}>
                As a science-themed institute, we emphasize Science and Mathematics through detailed theory, 
                practical sessions, and lab work. Our clear concepts and hands-on approach ensure a thorough 
                understanding of subjects.
              </p>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6 animate-slide-up">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#00E5A8]/10 border border-[#00E5A8]/30 rounded-lg">
                  <Users className="w-6 h-6 text-[#00E5A8]" />
                </div>
                <h2 className="text-3xl font-bold text-white font-machina">Our Philosophy</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg animate-fade-in font-helvetica" style={{ animationDelay: '0.2s' }}>
                Our team members are lifelong learners, constantly improving their skills and knowledge. 
                We believe that to be a good teacher, one must also be an excellent learner.
              </p>
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="bg-[#080808] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4 text-center font-machina">Meet Our Faculty</h2>
              <p className="text-gray-400 text-center mb-12 font-helvetica">
                Dedicated educators committed to excellence in teaching and student development
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {faculty.map((member, index) => (
                  <div 
                    key={index} 
                    className="bg-[#111111] rounded-xl border border-gray-800 p-6 hover:shadow-lg hover:border-[#00E5A8]/30 hover:scale-105 transition-all duration-300 animate-fade-in" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-24 h-24 bg-[#00E5A8]/10 border border-[#00E5A8]/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-[#00E5A8]" />
                    </div>
                    <h3 className="text-xl font-bold text-white text-center mb-1 font-machina">
                      {member.name}
                    </h3>
                    <p className="text-[#00E5A8] text-sm text-center mb-4">
                      {member.role} @ RAVEN Tutorials
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed font-helvetica">
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Development Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4 text-center">Development Team</h2>
              <p className="text-gray-400 text-center mb-12">
                Technology professionals bringing innovative solutions to education
              </p>
              
              <div className="max-w-md mx-auto">
                {devTeam.map((member, index) => (
                  <div 
                    key={index} 
                    className="bg-[#111111] rounded-xl border border-gray-800 p-8 hover:shadow-xl hover:border-[#00E5A8]/30 transition-all duration-300"
                  >
                    {/* Image with hover effect */}
                    <div 
                      className="relative w-32 h-32 mx-auto mb-4 group cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowImageModal(true);
                      }}
                    >
                      <img 
                        src="https://res.cloudinary.com/dxli2mlbq/image/upload/v1764952898/raven-tutorials/team/aniket-singh-developer.jpg" 
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover border-4 border-[#00E5A8] shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white text-center mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#00E5A8] text-sm text-center mb-4">
                      {member.role} @ RAVEN Tutorials
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed text-center">
                      {member.description}
                    </p>
                    
                    {/* Tap for details button */}
                    <button
                      onClick={() => setShowModal(true)}
                      className="mt-4 w-full bg-[#00E5A8] hover:bg-[#00E5A8]/90 text-black py-2 px-4 rounded-full transition-all duration-300 font-medium text-sm hover:scale-105 active:scale-95"
                    >
                      Tap for details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Modal for Aniket Singh Details */}
        {showModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={() => setShowModal(false)}
          >
            <div 
              className="bg-[#0b0b0b] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-up border border-gray-800" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#00E5A8] to-[#00B386] p-8 relative">
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-black hover:bg-black/20 rounded-full p-2 transition-all duration-300 hover:rotate-90"
                >
                  <X className="w-6 h-6" />
                </button>
                <img 
                  src="https://res.cloudinary.com/dxli2mlbq/image/upload/v1764952898/raven-tutorials/team/aniket-singh-developer.jpg" 
                  alt={devTeam[0].name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-black shadow-xl object-cover"
                />
                <h2 className="text-3xl font-bold text-black text-center mb-2">
                  {devTeam[0].name}
                </h2>
                <p className="text-black/70 text-center">
                  {devTeam[0].role} @ RAVEN Tutorials
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* About Me */}
                <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <h3 className="text-2xl font-bold text-white mb-4">About Me</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {devTeam[0].fullProfile.about}
                  </p>
                </div>

                {/* Skills & Expertise */}
                <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-2xl font-bold text-white mb-4">Skills & Expertise</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {devTeam[0].fullProfile.skills.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="bg-[#00E5A8]/10 border border-[#00E5A8]/30 text-[#00E5A8] px-4 py-2 rounded-lg text-center font-medium text-sm hover:bg-[#00E5A8]/20 hover:scale-105 transition-all duration-300"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <h3 className="text-2xl font-bold text-white mb-4">Education</h3>
                  <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg hover:border-[#00E5A8]/30 transition-colors duration-300">
                    <p className="text-gray-300 font-medium">
                      {devTeam[0].fullProfile.education}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <h3 className="text-2xl font-bold text-white mb-4">Experience</h3>
                  <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg hover:border-[#00E5A8]/30 transition-colors duration-300">
                    <p className="text-gray-300 font-medium">
                      {devTeam[0].fullProfile.experience}
                    </p>
                  </div>
                </div>

                {/* Get In Touch */}
                <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
                  <button className="bg-[#00E5A8] text-black px-8 py-3 rounded-full hover:bg-[#00E5A8]/90 transition-all duration-300 font-medium hover:scale-105 active:scale-95">
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal for Full View */}
        {showImageModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={() => setShowImageModal(false)}
          >
            <button 
              onClick={() => setShowImageModal(false)}
              className="absolute top-6 right-6 text-white bg-[#111111]/50 backdrop-blur-sm hover:bg-red-500 rounded-full p-3 transition-all duration-300 hover:rotate-180 hover:scale-110 z-10 group border border-gray-800"
            >
              <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <div 
              className="relative max-w-3xl max-h-[90vh] animate-zoom-in"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src="https://res.cloudinary.com/dxli2mlbq/image/upload/v1764952898/raven-tutorials/team/aniket-singh-developer.jpg" 
                alt="Aniket Singh"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0b0b0b]/80 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-[#00E5A8]/30">
                <p className="font-semibold">ANIKET SINGH - <span className="text-[#00E5A8]">CTO</span></p>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      <LMSFooter />

      <style jsx>{`
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-up { animation: scale-up 0.3s ease-out; }
        .animate-zoom-in { animation: zoom-in 0.4s ease-out; }
      `}</style>
    </>
  );
};

export default AboutUs;
