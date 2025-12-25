'use client';

import React from "react";
import { ArrowRight, Microscope, Trophy, Sparkles, Rocket, Image, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  const router = useRouter();

  const coreValues = [
    {
      icon: Microscope,
      title: 'Scientific Excellence',
      description: 'Developing evidence-based understanding through hands-on experiments and critical thinking.',
      color: 'blue' as const
    },
    {
      icon: Trophy,
      title: 'Competitive Edge',
      description: 'Building resilient mindsets through structured challenges and achievement-oriented learning.',
      color: 'yellow' as const
    },
    {
      icon: Sparkles,
      title: 'Nurturing Growth',
      description: 'Creating inclusive spaces where students feel valued and empowered to reach their potential.',
      color: 'purple' as const
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Implementing cutting-edge methodologies that bridge theory with practical applications.',
      color: 'green' as const
    }
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600'
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24 pt-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                Premier Educational Institution · Est. 2020
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6 animate-slide-up">
                RAVEN Tutorials
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Advancing scientific education through innovative methodologies
                and evidence-based learning approaches
              </p>
              
              <button
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 font-semibold text-lg inline-flex items-center gap-2 shadow-xl animate-slide-up"
                style={{ animationDelay: '0.4s' }}
                onClick={() => router.push('/services')}
              >
                Explore Programs
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Our Core Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in">Our Core Values</h2>
              <div className="max-w-3xl mx-auto mb-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We are dedicated to transforming education through innovative teaching methodologies, 
                  fostering scientific thinking, and creating an environment where every student can thrive and excel.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {coreValues.map((value, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${colorClasses[value.color]} rounded-xl mb-6`}>
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Excellence Gallery Section */}
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold mb-6 animate-bounce-slow">
                  <Image className="w-5 h-5" />
                  Gallery
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-up">
                  Visual Excellence Gallery
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  Witness the journey of excellence through our curated collection of achievements, milestones, 
                  and unforgettable moments that showcase our commitment to educational greatness.
                </p>
              </div>

              {/* Coming Soon Card */}
              <div className="bg-white rounded-2xl border-2 border-blue-200 p-12 text-center shadow-lg">
                <div className="flex justify-center gap-3 mb-6">
                  <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
                  <Sparkles className="w-12 h-12 text-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <Sparkles className="w-12 h-12 text-purple-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg mb-6">
                  <Clock className="w-5 h-5" />
                  Launching Soon
                </div>
                
                <p className="text-gray-600 leading-relaxed text-lg max-w-2xl mx-auto">
                  Our spectacular gallery featuring student success stories, campus life, achievement ceremonies, 
                  and memorable educational journeys is being carefully curated. Get ready for an inspiring visual experience!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
