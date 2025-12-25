'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BarChart3, Users, CheckSquare, FileText, BookOpen, Megaphone, Video, MessageSquare } from 'lucide-react';
import Navbar from '../Navbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1024;
      setIsDesktop(newIsDesktop);
      if (newIsDesktop) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Initialize on mount
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && !isDesktop) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [sidebarOpen, isDesktop]);

  const menuItems = [
    { path: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/students', icon: Users, label: 'Students' },
    { path: '/admin/attendance', icon: CheckSquare, label: 'Attendance' },
    { path: '/admin/tests', icon: FileText, label: 'Tests' },
    { path: '/admin/study-materials', icon: BookOpen, label: 'Study Materials' },
    { path: '/admin/videos', icon: Video, label: 'Videos' },
    { path: '/admin/live-classes', icon: Video, label: 'Live Classes' },
    { path: '/admin/feedbacks', icon: MessageSquare, label: 'Feedbacks' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 transition-colors duration-300">
      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes fadeInOverlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.5;
          }
        }

        @keyframes menuItemSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .sidebar-animate-open {
          animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .sidebar-animate-close {
          animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .overlay-animate {
          animation: fadeInOverlay 0.3s ease-out;
        }

        .menu-item-animate {
          animation: menuItemSlideIn 0.4s ease-out;
        }
      `}</style>

      {/* Regular Navbar - Hidden on mobile/tablet when sidebar is open */}
      {!(sidebarOpen && !isDesktop) && <Navbar />}
      
      {/* Mobile Menu Toggle Button */}
      <div className={`lg:hidden fixed top-16 right-4 z-20 pt-2 transition-all duration-300 ${sidebarOpen && !isDesktop ? 'hidden' : ''}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 duration-200"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X size={24} className="text-gray-800 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu size={24} className="text-gray-800 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden overlay-animate"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className={`flex pt-16 ${sidebarOpen && !isDesktop ? 'max-h-screen overflow-hidden' : ''}`}>
        {/* Sidebar - Fixed position, scrollable content */}
        <aside
          className={`${
            sidebarOpen ? 'sidebar-animate-open lg:translate-x-0' : 'sidebar-animate-close lg:translate-x-0'
          } lg:!animate-none fixed w-64 bg-white shadow-lg lg:shadow-md transition-all duration-300 ease-out z-10 ${sidebarOpen && !isDesktop ? 'top-0' : 'top-16'} left-0 bottom-0 overflow-y-auto`}
        >
          <nav className="mt-4 sm:mt-5 md:mt-6">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 sm:px-5 md:px-6 py-3 sm:py-3 md:py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 gap-3 relative overflow-hidden group ${
                  pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 shadow-md' : ''
                }`}
                style={{ 
                  animation: sidebarOpen ? `menuItemSlideIn 0.4s ease-out ${index * 0.05}s both` : 'none',
                }}
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300"></div>
                
                <item.icon size={22} className="flex-shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium text-sm sm:text-base relative z-10">{item.label}</span>
              </Link>
            ))}
            {/* Post Notice Button */}
            <Link
              href="/admin/notices"
              className={`flex items-center px-4 sm:px-5 md:px-6 py-3 sm:py-3 md:py-4 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 gap-3 relative overflow-hidden group ${
                pathname === '/admin/notices' ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600 shadow-md' : ''
              }`}
              style={{ 
                animation: sidebarOpen ? `menuItemSlideIn 0.4s ease-out ${menuItems.length * 0.05}s both` : 'none',
              }}
            >
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-indigo-500/10 transition-all duration-300"></div>
              
              <Megaphone size={22} className="flex-shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium text-sm sm:text-base relative z-10">Post Notice</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content - Scrollable area with fixed sidebar on desktop */}
        <main className={`flex-1 w-full ${sidebarOpen && isDesktop ? 'ml-64' : 'ml-0'} p-4 sm:p-5 md:p-6 lg:p-8 min-h-[calc(100vh-4rem)] overflow-y-auto`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
