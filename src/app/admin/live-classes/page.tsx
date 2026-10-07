'use client';

import React, { useState, useEffect } from 'react';
import { Video, Plus, Edit, Trash2, Play, Square, Calendar, Clock, Users, Filter, Radio, X, Zap, Copy, Check, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import { Loader } from '@/components';
import { STANDARDS, STANDARD_LABELS } from '@/constants/classes';
import { CartoonDropdown } from '@/components/ui/CartoonDropdown';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

interface LiveClassData {
  _id: string;
  classId: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  teacherName?: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  maxParticipants: number;
  isRecordingEnabled: boolean;
  status: 'Scheduled' | 'Live' | 'Completed' | 'Cancelled';
  participants?: string[];
}

interface FormData {
  title: string;
  description: string;
  subject: string;
  class: string;
  teacherName: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  duration: string | number;
  maxParticipants: number;
  isRecordingEnabled: boolean;
}

const AdminLiveClasses: React.FC = () => {
  const [liveClasses, setLiveClasses] = useState<LiveClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Freeze background when modal is open
  useBodyScrollLock(showModal);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterClass, setFilterClass] = useState('');

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    subject: '',
    class: '',
    teacherName: 'Er. Sandeep Verma',
    scheduledDate: '',
    startTime: '',
    endTime: '',
    duration: '',
    maxParticipants: 100,
    isRecordingEnabled: false
  });

  const subjects = ['Mathematics', 'Social Science', 'Biology', 'Chemistry', 'Physics', 'English', 'Computer Science', 'General'];

  useEffect(() => {
    fetchLiveClasses();
  }, [filterStatus, filterClass]);

  const fetchLiveClasses = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filterStatus) queryParams.append('status', filterStatus);
      if (filterClass) queryParams.append('class', filterClass);

      const res = await fetch(`/api/admin/live-classes?${queryParams}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setLiveClasses(data.data);
      }
    } catch (error) {
      toast.error('Error loading live classes');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateDuration = () => {
    if (formData.startTime && formData.endTime) {
      const [startHour, startMin] = formData.startTime.split(':').map(Number);
      const [endHour, endMin] = formData.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      const duration = endMinutes - startMinutes;
      setFormData(prev => ({ ...prev, duration: duration > 0 ? duration : '' }));
    }
  };

  useEffect(() => {
    calculateDuration();
  }, [formData.startTime, formData.endTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.subject || !formData.class || !formData.scheduledDate || !formData.startTime || !formData.endTime) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!formData.duration || Number(formData.duration) <= 0) {
      toast.error('End time must be after start time');
      return;
    }

    try {
      const res = await fetch(
        editingClassId ? `/api/admin/live-classes/${editingClassId}` : '/api/admin/live-classes',
        {
          method: editingClassId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData)
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success(editingClassId ? 'Live class updated successfully' : 'Live class created successfully');
        setShowModal(false);
        resetForm();
        fetchLiveClasses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(editingClassId ? 'Error updating live class' : 'Error creating live class');
    }
  };

  const handleEdit = (liveClass: LiveClassData) => {
    setEditingClassId(liveClass.classId);
    setFormData({
      title: liveClass.title,
      description: liveClass.description || '',
      subject: liveClass.subject,
      class: liveClass.class,
      teacherName: liveClass.teacherName || 'Er. Sandeep Verma',
      scheduledDate: new Date(liveClass.scheduledDate).toISOString().split('T')[0],
      startTime: liveClass.startTime,
      endTime: liveClass.endTime,
      duration: liveClass.duration,
      maxParticipants: liveClass.maxParticipants,
      isRecordingEnabled: liveClass.isRecordingEnabled
    });
    setShowModal(true);
  };

  const handleCopyInviteLink = (classId: string) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/live-class/${classId}`;
      navigator.clipboard.writeText(url);
      setCopiedId(classId);
      toast.success('Live class invite link copied!');
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleDelete = async (classId: string) => {
    if (!window.confirm('Are you sure you want to delete this live class?')) return;

    try {
      const res = await fetch(`/api/admin/live-classes/${classId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Live class deleted successfully');
        fetchLiveClasses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error deleting live class');
    }
  };

  const handleStartClass = async (classId: string) => {
    try {
      const res = await fetch(`/api/admin/live-classes/${classId}/start`, {
        method: 'PATCH',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Live class started! Launching Faculty Classroom...');
        fetchLiveClasses();
        window.open(`/live-class/${classId}`, '_blank');
      }
    } catch (error) {
      toast.error('Error starting live class');
    }
  };

  const handleEndClass = async (classId: string) => {
    if (!window.confirm('Are you sure you want to end this live class?')) return;

    try {
      const res = await fetch(`/api/admin/live-classes/${classId}/end`, {
        method: 'PATCH',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Live class ended');
        fetchLiveClasses();
      }
    } catch (error) {
      toast.error('Error ending live class');
    }
  };

  const handleJoinClass = (classId: string) => {
    window.open(`/live-class/${classId}`, '_blank');
  };

  const resetForm = () => {
    setEditingClassId(null);
    setFormData({
      title: '',
      description: '',
      subject: '',
      class: '',
      teacherName: 'Er. Sandeep Verma',
      scheduledDate: '',
      startTime: '',
      endTime: '',
      duration: '',
      maxParticipants: 100,
      isRecordingEnabled: false
    });
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string; label: string }> = {
      Scheduled: { bg: 'bg-amber-500/15 border border-amber-500/30', text: 'text-amber-300', label: 'Scheduled' },
      Live: { bg: 'bg-rose-500/20 border border-rose-500/40 animate-pulse', text: 'text-rose-400', label: 'Live Now' },
      Completed: { bg: 'bg-emerald-500/15 border border-emerald-500/30', text: 'text-emerald-400', label: 'Completed' },
      Cancelled: { bg: 'bg-white/5 border border-white/10', text: 'text-zinc-400', label: 'Cancelled' }
    };

    const current = config[status] || { bg: 'bg-white/5 border border-white/10', text: 'text-zinc-300', label: status };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-space font-bold uppercase shadow-sm ${current.bg} ${current.text}`}>
        {current.label}
      </span>
    );
  };

  if (loading) return <AdminLayout><Loader /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Executive Header Banner */}
        <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/50 to-transparent" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#10b981]" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-[#6ee7b7] text-xs font-bold font-space uppercase mb-2 shadow-sm">
                <Radio size={14} className="animate-pulse" />
                <span>Broadcast Center</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
                Live Classes
              </h1>
              <p className="text-zinc-400 font-jakarta font-medium text-xs sm:text-sm mt-1">
                Host and manage real-time online classes powered by Jitsi Meet
              </p>
            </div>
            <button
              onClick={() => { resetForm(); setShowModal(true); }}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit px-5 py-3 rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(16,185,129,0.35)] text-sm transition-all cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>Schedule Live Class</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#34d399]/15 border border-[#34d399]/30 flex items-center justify-center text-[#6ee7b7]">
              <Filter className="w-4 h-4" />
            </div>
            <h3 className="font-outfit font-bold text-lg text-white">Filter Classes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase font-space text-zinc-400 mb-1">Class Status</label>
              <CartoonDropdown
                value={filterStatus}
                onChange={(val) => setFilterStatus(val)}
                placeholder="All Statuses"
                options={[
                  { value: '', label: 'All Statuses' },
                  { value: 'Scheduled', label: 'Scheduled' },
                  { value: 'Live', label: 'Live' },
                  { value: 'Completed', label: 'Completed' },
                  { value: 'Cancelled', label: 'Cancelled' },
                ]}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase font-space text-zinc-400 mb-1">Standard / Grade</label>
              <CartoonDropdown
                value={filterClass}
                onChange={(val) => setFilterClass(val)}
                placeholder="All Classes"
                options={[
                  { value: '', label: 'All Classes' },
                  ...STANDARDS.map(std => ({ value: std, label: STANDARD_LABELS[std] || std })),
                  { value: 'All', label: 'All Students' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Live Classes Grid */}
        <div className="grid gap-5">
          {liveClasses.length === 0 ? (
            <div className="bg-[#0b0e1a]/90 rounded-2xl p-12 text-center border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              <Video className="w-16 h-16 text-zinc-600 mx-auto mb-3" />
              <p className="font-outfit font-bold text-xl text-white">No live classes found</p>
              <p className="text-sm font-jakarta font-medium text-zinc-400 mt-1">
                Schedule a class to start teaching in real-time with high quality video.
              </p>
            </div>
          ) : (
            liveClasses.map(liveClass => (
              <div 
                key={liveClass._id} 
                className="bg-[#0b0e1a]/90 rounded-2xl p-6 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-white/20 transition-all text-white"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-outfit font-bold text-white">{liveClass.title}</h3>
                      {getStatusBadge(liveClass.status)}
                    </div>
                    {liveClass.description && (
                      <p className="text-zinc-300 font-jakarta font-medium text-sm mb-4">{liveClass.description}</p>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                        <Calendar className="w-4 h-4 text-[#6ee7b7] shrink-0" />
                        <span className="font-mono font-medium text-zinc-200 text-xs">
                          {new Date(liveClass.scheduledDate).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                        <Clock className="w-4 h-4 text-[#6ee7b7] shrink-0" />
                        <span className="font-mono font-medium text-zinc-200 text-xs">
                          {liveClass.startTime} - {liveClass.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                        <Users className="w-4 h-4 text-[#6ee7b7] shrink-0" />
                        <span className="font-jakarta font-medium text-zinc-200 text-xs">
                          {liveClass.participants?.length || 0} enrolled
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#34d399]/15 border border-[#34d399]/30 px-3 py-2 rounded-xl">
                        <span className="font-space font-bold uppercase text-xs text-[#6ee7b7] truncate">
                          {liveClass.subject}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono font-medium text-zinc-400">
                      <span>Standard: <strong className="text-white">{liveClass.class}</strong></span>
                      <span>•</span>
                      <span>Faculty: <strong className="text-[#6ee7b7]">{liveClass.teacherName || 'Raven Faculty'}</strong></span>
                      <span>•</span>
                      <span>Duration: <strong className="text-white">{liveClass.duration} mins</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-end md:self-start">
                    {/* Copy Student Invite Link button */}
                    <button
                      onClick={() => handleCopyInviteLink(liveClass.classId)}
                      className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 px-3 py-2 rounded-xl font-jakarta text-xs transition-all cursor-pointer"
                      title="Copy student invite link"
                    >
                      {copiedId === liveClass.classId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#34d399]" />}
                      <span>{copiedId === liveClass.classId ? 'Copied' : 'Invite'}</span>
                    </button>

                    {liveClass.status === 'Scheduled' && (
                      <>
                        <button
                          onClick={() => handleStartClass(liveClass.classId)}
                          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white border border-white/10 px-3.5 py-2 rounded-xl font-outfit font-bold text-xs sm:text-sm shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all cursor-pointer active:scale-95"
                          title="Start Live Class and Host as Teacher"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>Teach Now</span>
                        </button>
                        <button
                          onClick={() => handleEdit(liveClass)}
                          className="inline-flex items-center justify-center p-2 bg-white/5 text-zinc-300 hover:text-white border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                          title="Edit Class"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {liveClass.status === 'Live' && (
                      <>
                        <button
                          onClick={() => handleJoinClass(liveClass.classId)}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white border border-white/10 px-4 py-2 rounded-xl font-outfit font-bold text-xs sm:text-sm shadow-[0_8px_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
                        >
                          <Video className="w-4 h-4" />
                          <span>Enter as Host</span>
                        </button>
                        <button
                          onClick={() => handleEndClass(liveClass.classId)}
                          className="inline-flex items-center justify-center p-2 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-xl hover:bg-rose-500/30 transition-colors cursor-pointer"
                          title="End Class Now"
                        >
                          <Square className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(liveClass.classId)}
                      className="inline-flex items-center justify-center p-2 bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-xl hover:bg-rose-500/25 transition-colors cursor-pointer"
                      title="Delete Class"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-[100] overscroll-contain">
            <div className="bg-[#0c0f1c] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] my-auto text-white">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#34d399]/15 border border-[#34d399]/30 flex items-center justify-center text-[#6ee7b7] shadow-sm">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-outfit font-black text-white">
                        {editingClassId ? 'Edit Live Class' : 'Schedule Live Class'}
                      </h2>
                      <p className="text-xs font-space font-bold text-zinc-400 uppercase">Configure schedule & meeting options</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                      Class Title <span className="text-[#34d399]">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl font-jakarta font-medium text-white focus:outline-none focus:border-[#34d399] placeholder-zinc-500 text-sm"
                      placeholder="e.g. Physics Wave Optics Masterclass"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                      Faculty / Teacher Name <span className="text-[#34d399]">*</span>
                    </label>
                    <input
                      type="text"
                      name="teacherName"
                      value={formData.teacherName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl font-jakarta font-medium text-white focus:outline-none focus:border-[#34d399] placeholder-zinc-500 text-sm"
                      placeholder="e.g. Er. Sandeep Verma (IIT Alumni)"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Description / Agenda</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl font-jakarta font-medium text-white focus:outline-none focus:border-[#34d399] placeholder-zinc-500 text-sm"
                      placeholder="Enter session summary, prerequisites, or topics to be covered..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                        Subject <span className="text-[#34d399]">*</span>
                      </label>
                      <CartoonDropdown
                        value={formData.subject}
                        onChange={(val) => setFormData(prev => ({ ...prev, subject: val }))}
                        placeholder="Select Subject"
                        options={[
                          { value: '', label: 'Select Subject' },
                          ...subjects.map(sub => ({ value: sub, label: sub }))
                        ]}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                        Target Standard <span className="text-[#34d399]">*</span>
                      </label>
                      <CartoonDropdown
                        value={formData.class}
                        onChange={(val) => setFormData(prev => ({ ...prev, class: val }))}
                        placeholder="Select Class"
                        options={[
                          { value: '', label: 'Select Class' },
                          ...STANDARDS.map(std => ({ value: std, label: STANDARD_LABELS[std] || std })),
                          { value: 'All', label: 'All Students' },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                        Date <span className="text-[#34d399]">*</span>
                      </label>
                      <input
                        type="date"
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 bg-[#070914] border border-white/10 rounded-xl font-mono font-bold text-white focus:outline-none focus:border-[#34d399] text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                        Start Time <span className="text-[#34d399]">*</span>
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-[#070914] border border-white/10 rounded-xl font-mono font-bold text-white focus:outline-none focus:border-[#34d399] text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                        End Time <span className="text-[#34d399]">*</span>
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-[#070914] border border-white/10 rounded-xl font-mono font-bold text-white focus:outline-none focus:border-[#34d399] text-sm"
                        required
                      />
                    </div>
                  </div>

                  {Number(formData.duration) > 0 && (
                    <div className="bg-[#34d399]/15 border border-[#34d399]/30 p-3.5 rounded-xl shadow-sm">
                      <p className="text-xs font-mono font-bold text-[#6ee7b7] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 inline" />
                        <span>DURATION: {formData.duration} minutes ({Math.floor(Number(formData.duration) / 60)}h {Number(formData.duration) % 60}m)</span>
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">Max Participants</label>
                    <input
                      type="number"
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleInputChange}
                      min="1"
                      max="500"
                      className="w-full px-4 py-2 bg-[#070914] border border-white/10 rounded-xl font-mono font-bold text-white focus:outline-none focus:border-[#34d399] text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                    <input
                      type="checkbox"
                      id="isRecordingEnabled"
                      name="isRecordingEnabled"
                      checked={formData.isRecordingEnabled}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-[#34d399] border border-white/10 rounded cursor-pointer"
                    />
                    <label htmlFor="isRecordingEnabled" className="text-sm font-jakarta font-medium text-zinc-200 cursor-pointer">
                      Enable Cloud Recording (Optional)
                    </label>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white py-3 px-4 rounded-xl border border-white/10 font-outfit font-bold text-sm shadow-[0_8px_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
                    >
                      {editingClassId ? 'Update Class' : 'Schedule Live Class'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowModal(false); resetForm(); }}
                      className="bg-white/5 hover:bg-white/10 text-zinc-300 py-3 px-6 rounded-xl border border-white/10 font-outfit font-bold text-sm transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// Wrap with AdminProtectedRoute for security
const ProtectedAdminLiveClasses = () => (
  <AdminProtectedRoute>
    <AdminLiveClasses />
  </AdminProtectedRoute>
);

export default ProtectedAdminLiveClasses;
