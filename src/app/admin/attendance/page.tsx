'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import toast from 'react-hot-toast';
import { CheckSquare, Users, Calendar, Sparkles, CheckCircle2, XCircle, Check, X } from 'lucide-react';
import { STANDARDS, STANDARD_LABELS } from '@/constants/classes';
import { CartoonDropdown } from '@/components/ui/CartoonDropdown';

interface StudentData {
  _id: string;
  studentName: string;
  registrationId: string;
}

// Separate component for attendance buttons to prevent closure issues
const AttendanceButtons = memo(({ 
  studentId, 
  currentStatus, 
  onStatusChange 
}: { 
  studentId: string; 
  currentStatus: string | undefined; 
  onStatusChange: (id: string, status: string) => void;
}) => {
  return (
    <div className="flex justify-center gap-2">
      <button
        type="button"
        onClick={() => onStatusChange(studentId, 'Present')}
        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-space uppercase transition-all cursor-pointer ${
          currentStatus === 'Present'
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
            : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
        }`}
      >
        Present
      </button>
      <button
        type="button"
        onClick={() => onStatusChange(studentId, 'Absent')}
        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-space uppercase transition-all cursor-pointer ${
          currentStatus === 'Absent'
            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm'
            : 'bg-white/5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/10'
        }`}
      >
        Absent
      </button>
    </div>
  );
});
AttendanceButtons.displayName = 'AttendanceButtons';

const AdminAttendance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [attendance, setAttendance] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const [existingAttendanceId, setExistingAttendanceId] = useState<string | null>(null);

  const subjects = ['Mathematics', 'Social Science', 'Biology', 'Chemistry', 'Physics', 'English'];

  useEffect(() => {
    if (selectedClass) {
      fetchStudentsByClass();
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedSubject && selectedDate) {
      checkExistingAttendance();
    }
  }, [selectedClass, selectedSubject, selectedDate]);

  const checkExistingAttendance = async () => {
    try {
      const res = await fetch(
        `/api/admin/attendance?class=${selectedClass}&subject=${selectedSubject}&date=${selectedDate}`,
        { credentials: 'include' }
      );
      const data = await res.json();
      
      if (data.success && data.data.length > 0) {
        const existingRecord = data.data[0];
        setIsMarked(true);
        setExistingAttendanceId(existingRecord._id);
        
        const attendanceMap: { [key: string]: string } = {};
        existingRecord.students.forEach((student: { studentId: { _id: string } | string; status: string }) => {
          const studentId = typeof student.studentId === 'object' ? student.studentId._id : student.studentId;
          attendanceMap[studentId] = student.status;
        });
        setAttendance(attendanceMap);
      } else {
        setIsMarked(false);
        setExistingAttendanceId(null);
        setAttendance({});
      }
    } catch (error) {
      console.error('Error checking attendance:', error);
    }
  };

  const fetchStudentsByClass = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/students?class=${encodeURIComponent(selectedClass)}`, {
        credentials: 'include'
      });
      const data = await res.json();
      
      if (data.success) {
        if (data.data.length === 0) {
          toast('No students enrolled in this class yet', {
            style: {
              background: '#1e293b',
              color: '#94a3b8',
              border: '1px solid #475569'
            }
          });
        }
        console.log('Fetched students:', data.data.map((s: StudentData) => ({ _id: s._id, name: s.studentName })));
        setStudents(data.data);
      } else {
        toast.error(data.message || 'Error loading students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Error loading students');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = useCallback((studentId: string, status: string) => {
    console.log('=== handleStatusChange ===');
    console.log('Student ID:', studentId);
    console.log('Status:', status);
    
    setAttendance(prev => {
      const newState = { ...prev, [studentId]: status };
      console.log('Previous state:', prev);
      console.log('New state:', newState);
      return newState;
    });
  }, []);

  const markAllPresent = () => {
    const newAttendance: { [key: string]: string } = {};
    students.forEach(student => {
      newAttendance[student._id] = 'Present';
    });
    setAttendance(newAttendance);
    toast.success('All students marked as present');
  };

  const handleSubmit = async () => {
    if (!selectedClass || !selectedSubject || students.length === 0) {
      toast.error('Please select a class, subject, and ensure students are loaded');
      return;
    }

    // Check if all students have been marked
    const unmarkedStudents = students.filter(student => !attendance[student._id]);
    if (unmarkedStudents.length > 0) {
      toast.error(`Please mark attendance for all students. ${unmarkedStudents.length} student(s) not marked.`, {
        duration: 4000
      });
      return;
    }

    const attendanceData = students.map(student => ({
      studentId: student._id,
      status: attendance[student._id]
    }));

    setLoading(true);

    try {
      const res = await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          class: selectedClass,
          subject: selectedSubject,
          date: selectedDate,
          students: attendanceData
        })
      });

      const data = await res.json();

      if (data.statusCode === 409 || (data.message && data.message.includes('already marked'))) {
        toast.error('Attendance already marked for this class and subject on this date', { duration: 3000 });
        await checkExistingAttendance();
        return;
      }

      if (data.statusCode === 403 || (data.message && data.message.includes('lock'))) {
        toast.error(data.message, {
          duration: 5000,
          style: {
            background: '#FEE2E2',
            color: '#991B1B',
            fontWeight: 'bold',
          }
        });
      } else if (data.success) {
        toast.success(isMarked ? 'Attendance updated successfully!' : 'Attendance saved successfully!');
        await checkExistingAttendance();
      } else {
        toast.error(data.message || 'Failed to save attendance');
      }
    } catch (error: any) {
      console.error('Attendance request error:', error);
      toast.error('Error saving attendance: ' + error.message);
    } finally {
      setLoading(false);
    }
  };  const presentCount = Object.values(attendance).filter(v => v === 'Present').length;
  const absentCount = Object.values(attendance).filter(v => v === 'Absent').length;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Executive Header Banner */}
        <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34d399]/50 to-transparent" />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#10b981]" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-[#6ee7b7] text-xs font-bold font-space uppercase mb-2 shadow-sm">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Attendance Registry</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
                Daily Attendance Roll Call
              </h1>
              <p className="text-zinc-400 font-jakarta font-medium text-xs sm:text-sm mt-1">
                Record classroom attendance, track absent students, and update session records
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 font-mono font-bold text-sm shadow-sm">
                {new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Controls & Filters Panel */}
        <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 sm:p-6 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                Standard / Class *
              </label>
              <CartoonDropdown
                value={selectedClass}
                onChange={(val) => setSelectedClass(val)}
                placeholder="-- Select Class --"
                options={[
                  { value: '', label: '-- Select Class --' },
                  ...STANDARDS.map(standard => ({
                    value: standard,
                    label: STANDARD_LABELS[standard] || standard
                  }))
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                Subject Session *
              </label>
              <CartoonDropdown
                value={selectedSubject}
                onChange={(val) => setSelectedSubject(val)}
                placeholder="-- Select Subject --"
                disabled={!selectedClass}
                options={[
                  { value: '', label: '-- Select Subject --' },
                  ...subjects.map(subject => ({
                    value: subject,
                    label: subject
                  }))
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase font-space text-zinc-300 mb-1.5">
                Attendance Date *
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-[#34d399] text-sm"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={markAllPresent}
                disabled={!selectedClass || !selectedSubject || students.length === 0}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(16,185,129,0.35)] text-sm flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <Check size={16} />
                <span>Mark All Present</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Notification Banner */}
        {selectedClass && selectedSubject && isMarked && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-outfit font-bold text-white text-sm">
                  Attendance Already Recorded
                </p>
                <p className="text-zinc-300 text-xs font-jakarta font-medium">
                  Attendance for Class {selectedClass} • {selectedSubject} on {new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} is saved. You can adjust statuses and re-save.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-space uppercase shadow-sm">
              Status: Logged
            </span>
          </div>
        )}

        {/* Attendance Table */}
        {selectedClass && selectedSubject && students.length > 0 && (
          <div className="bg-[#0b0e1a]/90 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden text-white">
            {/* Table Header / Stats Bar */}
            <div className="p-5 bg-[#0f1222] border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-outfit text-white">
                  {isMarked ? 'Update Attendance Record' : 'Take Attendance'}
                </h3>
                <p className="text-xs font-medium font-jakarta text-zinc-400">
                  Class {selectedClass} • {selectedSubject} • {students.length} Total Enrolled
                </p>
              </div>

              {/* Attendance Mini Counter */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold font-space text-emerald-300 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {presentCount} Present
                </span>
                <span className="px-3 py-1 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-bold font-space text-rose-300 flex items-center gap-1">
                  <X className="w-3.5 h-3.5" />
                  {absentCount} Absent
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/5">
                <thead className="bg-[#0a0d18] border-b border-white/10 font-space font-bold uppercase text-zinc-400 text-xs">
                  <tr>
                    <th className="px-5 py-3.5 text-left">#</th>
                    <th className="px-5 py-3.5 text-left">Student Name</th>
                    <th className="px-5 py-3.5 text-left hidden md:table-cell">Registration ID</th>
                    <th className="px-5 py-3.5 text-center">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-jakarta text-sm">
                  {students.map((student, index) => (
                    <tr key={`student-row-${student._id}-${index}`} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs font-bold text-zinc-500">
                        {index + 1}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-white block">{student.studentName}</span>
                        <span className="text-[11px] text-zinc-500 font-mono sm:hidden">{student.registrationId}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#34d399]/15 border border-[#34d399]/30 font-mono font-bold text-xs text-[#6ee7b7]">
                          {student.registrationId}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <AttendanceButtons
                          studentId={student._id}
                          currentStatus={attendance[student._id]}
                          onStatusChange={handleStatusChange}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Save Action Bar */}
            <div className="p-5 bg-[#070914] border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-xs font-jakarta font-medium text-zinc-400">
                Ensure all students are marked before submitting. Absentees will be logged in the academic history.
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-[#10b981] to-[#34d399] hover:from-[#34d399] hover:to-[#ffa066] text-white font-bold font-outfit rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(16,185,129,0.35)] text-sm sm:text-base disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckSquare size={18} />
                <span>{loading ? 'Saving...' : isMarked ? 'Update Attendance' : 'Save Attendance'}</span>
              </button>
            </div>
          </div>
        )}

        {selectedClass && selectedSubject && students.length === 0 && (
          <div className="text-center py-16 bg-[#0b0e1a]/90 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] p-8">
            <Users className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
            <p className="text-white font-bold text-lg font-outfit">No Enrolled Students</p>
            <p className="text-zinc-400 text-xs font-jakarta mt-1">No students are currently enrolled in Class {selectedClass}</p>
          </div>
        )}

        {(!selectedClass || !selectedSubject) && (
          <div className="text-center py-16 bg-[#0b0e1a]/90 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] p-8">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-[#6ee7b7]">
              <Calendar className="w-8 h-8" />
            </div>
            <p className="text-white font-bold text-lg font-outfit">Select Class & Subject</p>
            <p className="text-zinc-400 text-xs font-jakarta mt-1">Choose a standard and subject above to load student roll call</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// Wrap with AdminProtectedRoute for security
const ProtectedAdminAttendance = () => (
  <AdminProtectedRoute>
    <AdminAttendance />
  </AdminProtectedRoute>
);

export default ProtectedAdminAttendance;

