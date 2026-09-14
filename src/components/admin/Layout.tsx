'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, BarChart3, Users, CheckSquare, FileText, 
  BookOpen, Megaphone, Video, MessageSquare, Sparkles 
} from 'lucide-react';
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
    { path: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { path: '/admin/attendance', icon: CheckSquare, label: 'Attendance' },
    { path: '/admin/tests', icon: FileText, label: 'Tests' },
    { path: '/admin/study-materials', icon: BookOpen, label: 'Study Materials' },
    { path: '/admin/videos', icon: Video, label: 'Videos' },
    { path: '/admin/live-classes', icon: Video, label: 'Live Classes' },
    { path: '/admin/feedbacks', icon: MessageSquare, label: 'Feedbacks' },
  ];

  return (
    <div className="min-h-screen bg-[#f6fcf8] relative overflow-hidden selection:bg-emerald-300 selection:text-black">
      {/* Regular Navbar - Hidden on mobile/tablet when sidebar is open */}
      {!(sidebarOpen && !isDesktop) && <Navbar />}
      
      {/* Mobile Menu Toggle Button */}
      <div className={`lg:hidden fixed top-20 right-4 z-30 transition-all duration-300 ${sidebarOpen && !isDesktop ? 'hidden' : ''}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn-cartoon p-2.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#dcfce7] transition-all active:translate-x-0.5 active:translate-y-0.5"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X size={20} className="text-black" />
          ) : (
            <Menu size={20} className="text-black" />
          )}
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`flex pt-16 ${sidebarOpen && !isDesktop ? 'max-h-screen overflow-hidden' : ''}`}>
        {/* Cartoon Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } fixed w-64 bg-[#f0fdf4] border-r-3 border-black shadow-[4px_0px_0px_#000] transition-transform duration-300 ease-out z-20 ${
            sidebarOpen && !isDesktop ? 'top-0' : 'top-16'
          } left-0 bottom-0 overflow-y-auto flex flex-col justify-between`}
        >
          <div>
            {/* Sidebar Brand Header */}
            <div className="p-4 sm:p-5 border-b-2 border-black/15 flex items-center justify-between">
              <Link href="/admin/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-black shadow-[1.5px_1.5px_0px_#000] flex items-center justify-center p-1.5 flex-shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="RAVEN Logo" 
                    className="h-full w-full object-contain filter invert-0"
                  />
                </div>
                <div>
                  <div className="text-base font-black text-black font-outfit leading-tight tracking-tight">
                    RAVEN
                  </div>
                  <span className="text-[10px] font-black uppercase font-space px-1.5 py-0.2 bg-[#86efac] border border-black rounded text-black">
                    ADMIN
                  </span>
                </div>
              </Link>

              {/* Close button for mobile */}
              {!isDesktop && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg border border-black hover:bg-rose-100"
                >
                  <X size={18} className="text-black" />
                </button>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="p-3 space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => !isDesktop && setSidebarOpen(false)}
                    className={`flex items-center px-3.5 py-2.5 rounded-xl font-outfit text-sm transition-all duration-150 gap-3 ${
                      isActive
                        ? 'bg-emerald-400 text-black font-black border-2 border-black shadow-[2px_2px_0px_#000] translate-x-0.5'
                        : 'text-neutral-700 hover:text-black hover:bg-[#dcfce7] font-bold border border-transparent'
                    }`}
                  >
                    <item.icon size={18} className="flex-shrink-0 text-black" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Post Notice Quick Action */}
              <div className="pt-3 mt-3 border-t-2 border-black/10">
                <Link
                  href="/admin/notices"
                  onClick={() => !isDesktop && setSidebarOpen(false)}
                  className={`btn-cartoon flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-black text-sm font-black font-outfit transition-all shadow-[2px_2px_0px_#000] ${
                    pathname === '/admin/notices'
                      ? 'bg-emerald-400 text-black'
                      : 'bg-[#86efac] hover:bg-[#4ade80] text-black'
                  }`}
                >
                  <Megaphone size={16} className="text-black" />
                  <span>Post Notice</span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Sidebar Footer Badge */}
          <div className="p-4 border-t-2 border-black/15 bg-[#dcfce7] text-center">
            <p className="text-[11px] font-space font-black text-black uppercase">
              Academic Control v2.0
            </p>
            <p className="text-[10px] text-neutral-600 font-medium font-jakarta mt-0.5">
              Raven Tutorials Administration
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 w-full ${sidebarOpen && isDesktop ? 'ml-64' : 'ml-0'} p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] overflow-y-auto`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
