'use client';

import React, { useState, useEffect } from 'react';
import { Video, Plus, Edit, Trash2, Play, Square, Calendar, Clock, Users, Filter, Radio, X, Zap } from 'lucide-react';
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
      scheduledDate: new Date(liveClass.scheduledDate).toISOString().split('T')[0],
      startTime: liveClass.startTime,
      endTime: liveClass.endTime,
      duration: liveClass.duration,
      maxParticipants: liveClass.maxParticipants,
      isRecordingEnabled: liveClass.isRecordingEnabled
    });
    setShowModal(true);
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
        toast.success('Live class started');
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
      Scheduled: { bg: 'bg-[#bfdbfe]', text: 'text-blue-900', label: 'Scheduled' },
      Live: { bg: 'bg-rose-500 text-white animate-pulse', text: 'text-white', label: 'Live Now' },
      Completed: { bg: 'bg-neutral-200', text: 'text-neutral-800', label: 'Completed' },
      Cancelled: { bg: 'bg-rose-200', text: 'text-rose-900', label: 'Cancelled' }
    };

    const current = config[status] || { bg: 'bg-neutral-200', text: 'text-black', label: status };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-space font-black uppercase border-2 border-black shadow-[1px_1px_0px_#000] ${current.bg} ${current.text}`}>
        {current.label}
      </span>
    );
  };

  if (loading) return <AdminLayout><Loader /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black text-xs font-space font-black uppercase mb-2 shadow-[2px_2px_0px_#000]">
              <Radio size={14} className="text-black animate-pulse" />
              <span>Broadcast Center</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-outfit font-black text-black tracking-tight">
              Live Classes
            </h1>
            <p className="text-black/80 font-jakarta font-semibold mt-1">
              Host and manage real-time online classes powered by Jitsi Meet
            </p>
          </div>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="inline-flex items-center justify-center gap-2 bg-[#fef08a] text-black border-2 border-black px-6 py-3 rounded-2xl font-outfit font-black text-base shadow-[4px_4px_0px_#000] hover:bg-[#fde047] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Schedule Live Class
          </button>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white rounded-3xl p-5 border-3 border-black shadow-[5px_5px_0px_#000]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#86efac] border-2 border-black flex items-center justify-center">
              <Filter className="w-4 h-4 text-black" />
            </div>
            <h3 className="font-outfit font-black text-lg text-black">Filter Classes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-space font-black uppercase text-black mb-1">Class Status</label>
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
              <label className="block text-xs font-space font-black uppercase text-black mb-1">Standard / Grade</label>
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
            <div className="bg-white rounded-3xl p-12 text-center border-3 border-black shadow-[6px_6px_0px_#000]">
              <Video className="w-16 h-16 text-black/30 mx-auto mb-3" />
              <p className="font-outfit font-black text-xl text-black">No live classes found</p>
              <p className="text-sm font-jakarta font-medium text-black/60 mt-1">
                Schedule a class to start teaching in real-time with high quality video.
              </p>
            </div>
          ) : (
            liveClasses.map(liveClass => (
              <div 
                key={liveClass._id} 
                className="bg-[#f0fdf4] rounded-3xl p-6 border-3 border-black shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-2xl font-outfit font-black text-black">{liveClass.title}</h3>
                      {getStatusBadge(liveClass.status)}
                    </div>
                    {liveClass.description && (
                      <p className="text-black/75 font-jakarta font-medium text-sm mb-4">{liveClass.description}</p>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-2 rounded-xl shadow-[2px_2px_0px_#000]">
                        <Calendar className="w-4 h-4 text-black shrink-0" />
                        <span className="font-mono font-bold text-black text-xs">
                          {new Date(liveClass.scheduledDate).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-2 rounded-xl shadow-[2px_2px_0px_#000]">
                        <Clock className="w-4 h-4 text-black shrink-0" />
                        <span className="font-mono font-bold text-black text-xs">
                          {liveClass.startTime} - {liveClass.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-2 rounded-xl shadow-[2px_2px_0px_#000]">
                        <Users className="w-4 h-4 text-black shrink-0" />
                        <span className="font-jakarta font-bold text-black text-xs">
                          {liveClass.participants?.length || 0} enrolled
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#dcfce7] border-2 border-black px-3 py-2 rounded-xl shadow-[2px_2px_0px_#000]">
                        <span className="font-space font-black uppercase text-xs text-black truncate">
                          {liveClass.subject}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs font-mono font-bold text-black/70">
                      <span>Standard: <strong className="text-black">{liveClass.class}</strong></span>
                      <span>•</span>
                      <span>Duration: <strong className="text-black">{liveClass.duration} mins</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-end md:self-start">
                    {liveClass.status === 'Scheduled' && (
                      <>
                        <button
                          onClick={() => handleStartClass(liveClass.classId)}
                          className="inline-flex items-center gap-1.5 bg-[#86efac] text-black border-2 border-black px-3.5 py-2 rounded-xl font-outfit font-black text-sm shadow-[2px_2px_0px_#000] hover:bg-[#4ade80] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                          title="Start Live Class"
                        >
                          <Play className="w-4 h-4 fill-black" />
                          <span>Start</span>
                        </button>
                        <button
                          onClick={() => handleEdit(liveClass)}
                          className="inline-flex items-center justify-center p-2 bg-[#fef08a] text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:bg-[#fde047] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
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
                          className="inline-flex items-center gap-2 bg-[#86efac] text-black border-2 border-black px-4 py-2 rounded-xl font-outfit font-black text-sm shadow-[3px_3px_0px_#000] hover:bg-[#4ade80] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Classroom</span>
                        </button>
                        <button
                          onClick={() => handleEndClass(liveClass.classId)}
                          className="inline-flex items-center justify-center p-2 bg-rose-500 text-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:bg-rose-600 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                          title="End Class Now"
                        >
                          <Square className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(liveClass.classId)}
                      className="inline-flex items-center justify-center p-2 bg-rose-100 text-rose-700 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:bg-rose-200 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overscroll-contain">
            <div className="bg-[#f0fdf4] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain border-3 border-black shadow-[8px_8px_0px_#000]">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#86efac] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                      <Video className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-outfit font-black text-black">
                        {editingClassId ? 'Edit Live Class' : 'Schedule Live Class'}
                      </h2>
                      <p className="text-xs font-space font-bold text-black/60 uppercase">Configure schedule & meeting options</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center font-bold hover:bg-neutral-100 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
                      Class Title <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
                      placeholder="e.g. Physics Wave Optics Masterclass"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-space font-black uppercase text-black mb-1.5">Description / Agenda</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-jakarta font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
                      placeholder="Enter session summary, prerequisites, or topics to be covered..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
                        Subject <span className="text-rose-600">*</span>
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
                      <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
                        Target Standard <span className="text-rose-600">*</span>
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
                      <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
                        Date <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="date"
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
                        Start Time <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-space font-black uppercase text-black mb-1.5">
                        End Time <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
                        required
                      />
                    </div>
                  </div>

                  {Number(formData.duration) > 0 && (
                    <div className="bg-[#86efac] border-2 border-black p-3.5 rounded-xl shadow-[2px_2px_0px_#000]">
                      <p className="text-xs font-mono font-black text-black flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-black inline" />
                        <span>DURATION: {formData.duration} minutes ({Math.floor(Number(formData.duration) / 60)}h {Number(formData.duration) % 60}m)</span>
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-space font-black uppercase text-black mb-1.5">Max Participants</label>
                    <input
                      type="number"
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleInputChange}
                      min="1"
                      max="500"
                      className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl font-jakarta font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#86efac] shadow-[2px_2px_0px_#000]"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]">
                    <input
                      type="checkbox"
                      id="isRecordingEnabled"
                      name="isRecordingEnabled"
                      checked={formData.isRecordingEnabled}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-[#86efac] border-2 border-black rounded cursor-pointer"
                    />
                    <label htmlFor="isRecordingEnabled" className="text-sm font-jakarta font-bold text-black cursor-pointer">
                      Enable Cloud Recording (Optional)
                    </label>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="submit"
                      className="flex-1 bg-[#86efac] hover:bg-[#4ade80] text-black py-3 px-4 rounded-xl border-2 border-black font-outfit font-black text-base shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                    >
                      {editingClassId ? 'Update Class' : 'Schedule Live Class'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowModal(false); resetForm(); }}
                      className="bg-white hover:bg-neutral-100 text-black py-3 px-6 rounded-xl border-2 border-black font-outfit font-black text-base shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
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
