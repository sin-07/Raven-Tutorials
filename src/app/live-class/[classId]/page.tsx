'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Video,
  AlertCircle,
  Users,
  Copy,
  Check,
  LogOut,
  Radio,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface LiveClassData {
  _id: string;
  classId: string;
  title: string;
  subject: string;
  class: string;
  teacherName?: string;
  roomName: string;
  isRecordingEnabled?: boolean;
  status?: string;
  description?: string;
}

interface UserInfo {
  name: string;
  email: string;
  role: 'teacher' | 'student' | 'guest';
}

export default function LiveClassPage() {
  const { classId } = useParams();
  const router = useRouter();
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  const [liveClass, setLiveClass] = useState<LiveClassData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isModerator, setIsModerator] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);

  // Initialize Class data and authentication
  const initializeClass = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch Class details (try admin first then public/student endpoint)
      let classData: LiveClassData | null = null;
      try {
        const adminRes = await fetch(`/api/admin/live-classes/${classId}`, {
          credentials: 'include',
        });
        if (adminRes.ok) {
          const resJson = await adminRes.json();
          classData = resJson.data;
        }
      } catch (e) {
        console.warn('Admin class fetch skipped:', e);
      }

      if (!classData) {
        const studentRes = await fetch(`/api/student/live-classes/${classId}`, {
          credentials: 'include',
        });
        if (studentRes.ok) {
          const resJson = await studentRes.json();
          classData = resJson.data;
        }
      }

      if (!classData) {
        throw new Error('Live classroom not found or invalid session link');
      }

      setLiveClass(classData);

      // 2. Identify Authenticated User (Teacher / Admin vs Student)
      let resolvedUser: UserInfo | null = null;
      let isTeacher = false;

      // Check Teacher/Admin Auth
      try {
        const adminAuthRes = await fetch('/api/admin/verify', {
          credentials: 'include',
        });
        if (adminAuthRes.ok) {
          const adminJson = await adminAuthRes.json();
          if (adminJson.success && adminJson.admin) {
            resolvedUser = {
              name: `${adminJson.admin.name || classData.teacherName || 'Faculty Host'} (Host)`,
              email: adminJson.admin.email || 'faculty@raventutorials.com',
              role: 'teacher',
            };
            isTeacher = true;
            setIsModerator(true);
          }
        }
      } catch (e) {
        console.warn('Admin auth check skipped:', e);
      }

      // If not Teacher, check Student Auth
      if (!resolvedUser) {
        try {
          const studentAuthRes = await fetch('/api/auth/verify', {
            credentials: 'include',
          });
          if (studentAuthRes.ok) {
            const studentJson = await studentAuthRes.json();
            if (studentJson.success && studentJson.student) {
              resolvedUser = {
                name: studentJson.student.studentName || 'Student',
                email: studentJson.student.email || '',
                role: 'student',
              };
              setIsModerator(false);
            }
          }
        } catch (e) {
          console.warn('Student auth check skipped:', e);
        }
      }

      // 3. If authenticated, record join and start Jitsi
      if (resolvedUser) {
        setUserInfo(resolvedUser);

        if (resolvedUser.role === 'student') {
          try {
            await fetch(`/api/student/live-classes/${classId}/join`, {
              method: 'POST',
              credentials: 'include',
            });
          } catch (e) {
            console.error('Error logging student attendance:', e);
          }
        }

        loadJitsi(classData, resolvedUser, isTeacher);
      } else {
        // User not logged in, show Guest Name Prompt or Login prompt
        setShowGuestPrompt(true);
      }
    } catch (err: any) {
      console.error('Classroom init error:', err);
      setError(err.message || 'Failed to initialize live classroom');
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    initializeClass();

    return () => {
      if (jitsiApiRef.current) {
        try {
          jitsiApiRef.current.dispose();
        } catch (e) {
          console.warn('Jitsi dispose error:', e);
        }
      }
    };
  }, [initializeClass]);

  const loadJitsi = (classData: LiveClassData, user: UserInfo, isTeacher: boolean) => {
    if (!window.JitsiMeetExternalAPI) {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => initializeJitsiInstance(classData, user, isTeacher);
      script.onerror = () => {
        setError('Unable to load video streaming engine. Please check your internet connection.');
        toast.error('Failed to load video engine');
      };
      document.body.appendChild(script);
    } else {
      initializeJitsiInstance(classData, user, isTeacher);
    }
  };

  const initializeJitsiInstance = (
    classData: LiveClassData,
    user: UserInfo,
    isTeacher: boolean
  ) => {
    if (!jitsiContainerRef.current) return;

    // Clean any prior instance
    if (jitsiApiRef.current) {
      try {
        jitsiApiRef.current.dispose();
      } catch (e) {
        console.warn('Dispose error:', e);
      }
    }

    const domain = 'meet.jit.si';
    const room = classData.roomName || `raven-live-${classData.classId || classId}`;

    const teacherToolbarButtons = [
      'microphone',
      'camera',
      'desktop',
      'whiteboard',
      'chat',
      'raisehand',
      'participants-pane',
      'tileview',
      'recording',
      'security',
      'settings',
      'fullscreen',
      'hangup',
      'videoquality',
      'shareaudio',
      'sharedvideo',
    ];

    const studentToolbarButtons = [
      'microphone',
      'camera',
      'chat',
      'raisehand',
      'tileview',
      'settings',
      'fullscreen',
      'hangup',
    ];

    const options = {
      roomName: room,
      width: '100%',
      height: '100%',
      parentNode: jitsiContainerRef.current,
      configOverwrite: {
        startWithAudioMuted: !isTeacher,
        startWithVideoMuted: false,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        defaultLanguage: 'en',
        enableNoisyMicDetection: true,
        resolution: 720,
        disableRecording: !classData.isRecordingEnabled && !isTeacher,
        toolbarButtons: isTeacher ? teacherToolbarButtons : studentToolbarButtons,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        BRAND_WATERMARK_LINK: '',
        DEFAULT_BACKGROUND: '#070914',
        DEFAULT_REMOTE_DISPLAY_NAME: 'Student',
        DEFAULT_LOCAL_DISPLAY_NAME: user.name,
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
        DISABLE_PRESENCE_STATUS: false,
        DISPLAY_WELCOME_PAGE_CONTENT: false,
        ENABLE_DIAL_OUT: false,
        FILM_STRIP_MAX_HEIGHT: 120,
        MOBILE_APP_PROMO: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
        TOOLBAR_ALWAYS_VISIBLE: true,
        VERTICAL_FILMSTRIP: true,
      },
      userInfo: {
        displayName: user.name,
        email: user.email,
      },
    };

    try {
      const api = new window.JitsiMeetExternalAPI(domain, options);
      jitsiApiRef.current = api;

      api.addEventListener('videoConferenceJoined', () => {
        toast.success(`Joined ${classData.title}!`);
        if (isTeacher) {
          try {
            api.executeCommand('toggleLobby', false);
          } catch (e) {
            console.warn('Lobby toggle error:', e);
          }
        }
      });

      api.addEventListener('videoConferenceLeft', () => {
        handleLeaveRoom();
      });

      api.addEventListener('readyToClose', () => {
        handleLeaveRoom();
      });

      api.addEventListener('errorOccurred', (e: any) => {
        console.error('Jitsi error:', e);
      });
    } catch (e: any) {
      console.error('Jitsi init failed:', e);
      setError(e.message || 'Error creating video room');
    }
  };

  const handleJoinAsGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!liveClass) return;

    const guestUser: UserInfo = {
      name: `${guestName.trim()} (Guest)`,
      email: '',
      role: 'guest',
    };

    setUserInfo(guestUser);
    setShowGuestPrompt(false);
    loadJitsi(liveClass, guestUser, false);
  };

  const handleCopyInviteLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      toast.success('Live class invite link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      if (userInfo?.role === 'student') {
        await fetch(`/api/student/live-classes/${classId}/leave`, {
          method: 'POST',
          credentials: 'include',
        });
      }
    } catch (e) {
      console.warn('Leave logging error:', e);
    } finally {
      if (isModerator) {
        router.push('/admin/live-classes');
      } else {
        router.push('/dashboard');
      }
    }
  };

  if (loading) {
    return (
      <Loader
        fullScreen
        size="lg"
        text="Entering Virtual Classroom"
        subtitle="Connecting to secure Raven Video Stream..."
      />
    );
  }

  if (error || !liveClass) {
    return (
      <div className="min-h-screen bg-[#06080f] flex items-center justify-center p-4">
        <div className="bg-[#0b0e1a] border border-white/10 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold font-outfit text-white mb-2">Classroom Unavailable</h2>
          <p className="text-sm font-jakarta text-zinc-400 mb-6">{error || 'Class not found'}</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-3 bg-gradient-to-r from-[#10b981] to-[#34d399] text-white font-bold font-outfit text-sm rounded-xl shadow-[0_4px_16px_rgba(16,185,129,0.35)] cursor-pointer"
            >
              Go to Student Dashboard
            </button>
            <button
              onClick={() => router.push('/admin/live-classes')}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-bold font-outfit text-xs rounded-xl cursor-pointer"
            >
              Admin Live Classes Desk
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Guest Prompt / Sign-In Dialog if not yet authenticated
  if (showGuestPrompt && !userInfo) {
    return (
      <div className="min-h-screen bg-[#06080f] flex items-center justify-center p-4">
        <div className="relative bg-gradient-to-b from-[#0c0f1c] to-[#070914] border border-white/15 rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399] to-transparent" />

          {/* Classroom Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-[#6ee7b7] text-xs font-bold font-space uppercase mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#34d399]" />
              <span>Virtual Live Classroom</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-outfit text-white tracking-tight mb-2">
              {liveClass.title}
            </h1>
            <p className="text-xs font-jakarta text-zinc-400 font-medium">
              Subject: <span className="text-white font-bold">{liveClass.subject}</span> • Class: <span className="text-white font-bold">{liveClass.class}</span>
            </p>
            <p className="text-xs font-jakarta text-zinc-400 font-medium mt-1">
              Faculty Host: <span className="text-[#6ee7b7] font-bold">{liveClass.teacherName || 'Raven Senior Faculty'}</span>
            </p>
          </div>

          {/* Form to enter as guest */}
          <form onSubmit={handleJoinAsGuest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold font-space uppercase text-zinc-300 mb-1.5">
                Enter Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Kumar"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-3 bg-[#070914] border border-white/10 rounded-xl text-sm font-semibold font-jakarta text-white placeholder-zinc-500 focus:outline-none focus:border-[#34d399]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit text-sm uppercase tracking-wider rounded-xl border border-white/10 shadow-[0_6px_20px_rgba(16,185,129,0.4)] cursor-pointer transition-all active:scale-[0.98]"
            >
              Enter Classroom Now
            </button>
          </form>

          {/* Options to login as Teacher or Student */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5 text-center">
            <p className="text-xs text-zinc-400 font-jakarta">Have a registered Raven account?</p>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/login"
                className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold font-outfit text-zinc-200 transition text-center"
              >
                Student Login
              </Link>
              <Link
                href="/login"
                className="py-2.5 px-3 rounded-xl bg-[#34d399]/10 hover:bg-[#34d399]/20 border border-[#34d399]/30 text-xs font-bold font-outfit text-[#6ee7b7] transition text-center"
              >
                Teacher / Host Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-[#06080f] flex flex-col overflow-hidden">
      {/* ── TOP EXECUTIVE HUD / CONTROL BAR ── */}
      <header className="h-16 bg-[#0c0f1c]/95 border-b border-white/10 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#34d399]/15 border border-[#34d399]/30 flex items-center justify-center shrink-0">
            <Video className="w-5 h-5 text-[#34d399]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[10px] font-bold font-space uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>LIVE</span>
              </span>
              <h1 className="font-outfit font-black text-sm sm:text-base text-white truncate max-w-xs sm:max-w-md">
                {liveClass.title}
              </h1>
            </div>
            <p className="text-[11px] font-space text-zinc-400 truncate">
              {liveClass.subject} • Class {liveClass.class} • <span className="text-[#6ee7b7] font-semibold">Faculty: {liveClass.teacherName || 'Faculty'}</span>
            </p>
          </div>
        </div>

        {/* HUD Center & Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Moderator / Teacher Badge */}
          {isModerator ? (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#34d399]/20 border border-[#34d399]/40 text-[#6ee7b7] text-xs font-bold font-space uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Host / Moderator</span>
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold font-space uppercase">
              <GraduationCap className="w-3.5 h-3.5 text-[#34d399]" />
              <span>Attendee</span>
            </span>
          )}

          {/* Copy Share Link */}
          <button
            onClick={handleCopyInviteLink}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-jakarta flex items-center gap-1.5 transition cursor-pointer"
            title="Copy classroom link to invite students"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#34d399]" />}
            <span className="hidden md:inline">{copiedLink ? 'Link Copied!' : 'Invite Link'}</span>
          </button>

          {/* Leave Classroom Button */}
          <button
            onClick={handleLeaveRoom}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold font-outfit flex items-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isModerator ? 'End / Exit' : 'Leave'}</span>
          </button>
        </div>
      </header>

      {/* ── JITSI VIDEO CONTAINER ── */}
      <div className="flex-1 w-full relative bg-[#070914] overflow-hidden">
        <div ref={jitsiContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
