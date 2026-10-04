'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, BarChart3, Users, CheckSquare, FileText, 
  BookOpen, Megaphone, Video, MessageSquare, CreditCard, Newspaper 
} from 'lucide-react';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useBodyScrollLock(sidebarOpen && !isDesktop);

  const menuItems = [
    { path: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/fees', icon: CreditCard, label: 'Fee Management' },
    { path: '/admin/students', icon: Users, label: 'Students' },
    { path: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { path: '/admin/articles', icon: Newspaper, label: 'Articles' },
    { path: '/admin/attendance', icon: CheckSquare, label: 'Attendance' },
    { path: '/admin/tests', icon: FileText, label: 'Tests' },
    { path: '/admin/study-materials', icon: BookOpen, label: 'Study Materials' },
    { path: '/admin/videos', icon: Video, label: 'Videos' },
    { path: '/admin/live-classes', icon: Video, label: 'Live Classes' },
    { path: '/admin/feedbacks', icon: MessageSquare, label: 'Feedbacks' },
  ];

  return (
    <div className="min-h-screen bg-[#06080f] text-white relative overflow-hidden">
      {/* Mobile Menu Toggle Button */}
      <div className={`lg:hidden fixed top-20 right-4 z-30 transition-all duration-300 ${sidebarOpen && !isDesktop ? 'hidden' : ''}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 rounded-xl bg-[#121522] border border-white/15 text-white shadow-lg hover:border-white/30 transition-all cursor-pointer"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/70 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`flex pt-16 ${sidebarOpen && !isDesktop ? 'max-h-screen overflow-hidden' : ''}`}>
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } fixed w-64 bg-[#0a0c14] border-r border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out z-20 ${
            sidebarOpen && !isDesktop ? 'top-0' : 'top-16'
          } left-0 bottom-0 overflow-y-auto flex flex-col justify-between`}
        >
          <div>
            {/* Sidebar Brand Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#0e101a]">
              <Link href="/admin/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center p-1.5 flex-shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="RAVEN Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-base font-black text-white font-outfit leading-tight tracking-tight">
                    RAVEN
                  </div>
                  <span className="text-[10px] font-bold uppercase font-space px-2 py-0.5 bg-[#e8602e]/20 border border-[#e8602e]/40 rounded-full text-[#ff7b47]">
                    ADMIN
                  </span>
                </div>
              </Link>

              {/* Close button for mobile */}
              {!isDesktop && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg border border-white/15 text-white hover:bg-white/10 cursor-pointer"
                >
                  <X size={18} />
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
                        ? 'bg-[#e8602e] text-white font-bold shadow-[0_0_20px_rgba(232,96,46,0.4)]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5 font-medium'
                    }`}
                  >
                    <item.icon size={18} className="flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Post Notice Quick Action */}
              <div className="pt-3 mt-3 border-t border-white/10">
                <Link
                  href="/admin/notices"
                  onClick={() => !isDesktop && setSidebarOpen(false)}
                  className={`btn-sheryians flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold font-outfit transition-all text-white shadow-[0_0_20px_rgba(232,96,46,0.35)]`}
                >
                  <Megaphone size={16} />
                  <span>Post Notice</span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Sidebar Footer Badge */}
          <div className="p-4 border-t border-white/10 bg-[#0e101a] text-center">
            <p className="text-[11px] font-space font-bold text-[#ff814e] uppercase">
              Academic Control v2.0
            </p>
            <p className="text-[10px] text-zinc-500 font-medium font-jakarta mt-0.5">
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
