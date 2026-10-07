'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, X, BarChart3, Users, CheckSquare, FileText, 
  BookOpen, Megaphone, Video, MessageSquare, CreditCard, Newspaper,
  ExternalLink, LogOut, Radio, UserCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

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

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.replace('/login');
    } catch (err) {
      console.error('Logout error:', err);
      router.replace('/login');
    } finally {
      setLoggingOut(false);
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/fees', icon: CreditCard, label: 'Fee Management' },
    { path: '/admin/students', icon: Users, label: 'Students' },
    { path: '/admin/teacher-applications', icon: UserCheck, label: 'Teacher Apps' },
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
    <div className="min-h-screen bg-[#06080f] text-white flex flex-col">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed w-64 bg-[#0a0c16] border-r border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-transform duration-300 ease-out z-50 top-0 left-0 bottom-0 overflow-y-auto flex flex-col justify-between`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#0e111e]">
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center p-1.5 flex-shrink-0 group-hover:border-[#34d399]/40 transition-colors">
                <img 
                  src="/logo.png" 
                  alt="RAVEN Logo" 
                  className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                />
              </div>
              <div>
                <div className="text-base font-black text-white font-outfit leading-tight tracking-tight">
                  RAVEN
                </div>
                <span className="text-[10px] font-bold uppercase font-space px-2 py-0.5 bg-[#10b981]/20 border border-[#10b981]/40 rounded-full text-[#34d399]">
                  ADMIN
                </span>
              </div>
            </Link>

            {/* Close button for mobile */}
            {!isDesktop && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg border border-white/15 text-white hover:bg-white/10 cursor-pointer"
                aria-label="Close sidebar"
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
                      ? 'bg-gradient-to-r from-[#10b981] to-[#34d399] text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]'
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
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold font-outfit transition-all text-white bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#6ee7b7] shadow-[0_4px_16px_rgba(16,185,129,0.35)] active:scale-[0.98]"
              >
                <Megaphone size={16} />
                <span>Post Notice</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0e111e] space-y-2">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/30 text-zinc-300 hover:text-rose-400 text-xs font-bold font-outfit transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span>{loggingOut ? 'Logging out...' : 'Log Out Admin'}</span>
          </button>
          <div className="text-center pt-1">
            <p className="text-[10px] font-space font-bold text-[#34d399] uppercase">
              Academic Control Console
            </p>
            <p className="text-[9px] text-zinc-500 font-medium font-jakarta">
              Raven Tutorials Patna
            </p>
          </div>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div className={`flex-1 flex flex-col ${sidebarOpen && isDesktop ? 'lg:pl-64' : 'pl-0'} transition-all duration-300`}>
        {/* Dedicated Admin Top Bar (Clean, NO Public Navbar) */}
        <header className="sticky top-0 z-30 bg-[#070914]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-space font-bold uppercase tracking-wider text-zinc-400">
                Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-space font-bold uppercase">
              <Radio size={12} className="animate-pulse" />
              <span>Live System</span>
            </div>

            {/* Visit Website Link */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-jakarta transition-colors"
            >
              <span>View Site</span>
              <ExternalLink size={12} />
            </Link>

            {/* Direct Quick Logout */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="p-1.5 sm:px-3 sm:py-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-jakarta font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Logout"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
