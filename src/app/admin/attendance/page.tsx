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
        className={`btn-cartoon px-3.5 py-1.5 rounded-xl text-xs font-black font-space uppercase transition-all ${
          currentStatus === 'Present'
            ? 'bg-[#86efac] text-black border-2 border-black shadow-[2px_2px_0px_#000] translate-x-0.5'
            : 'bg-white text-neutral-500 hover:text-black hover:bg-neutral-100 border-2 border-black/30 shadow-none'
        }`}
      >
        Present
      </button>
      <button
        type="button"
        onClick={() => onStatusChange(studentId, 'Absent')}
        className={`btn-cartoon px-3.5 py-1.5 rounded-xl text-xs font-black font-space uppercase transition-all ${
          currentStatus === 'Absent'
            ? 'bg-rose-200 text-rose-950 border-2 border-black shadow-[2px_2px_0px_#000] translate-x-0.5'
            : 'bg-white text-neutral-500 hover:text-rose-900 hover:bg-rose-50 border-2 border-black/30 shadow-none'
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
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl shadow-[8px_8px_0px_#000] p-6 sm:p-8 text-black relative overflow-hidden cartoon-pop">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black text-black text-xs font-bold font-space uppercase mb-2 shadow-[1.5px_1.5px_0px_#000]">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-800" />
                <span>Attendance Registry</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit tracking-tight">
                Daily Attendance Roll Call
              </h1>
              <p className="text-neutral-900 font-bold font-jakarta text-xs sm:text-sm mt-1">
                Record classroom attendance, track absent students, and update session records
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-2xl bg-white border-2 border-black font-mono font-black text-sm shadow-[2px_2px_0px_#000]">
                {new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Cartoon Controls & Filters Panel */}
        <div className="bg-[#f0fdf4] rounded-3xl p-5 sm:p-6 border-3 border-black shadow-[6px_6px_0px_#000]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-black uppercase font-space text-black mb-1.5">
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
              <label className="block text-xs font-black uppercase font-space text-black mb-1.5">
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
              <label className="block text-xs font-black uppercase font-space text-black mb-1.5">
                Attendance Date *
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl text-black font-bold font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000] text-sm"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={markAllPresent}
                disabled={!selectedClass || !selectedSubject || students.length === 0}
                className="btn-cartoon w-full py-2.5 px-4 bg-[#86efac] hover:bg-[#4ade80] text-black font-black font-outfit rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] text-sm flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Check size={16} />
                <span>Mark All Present</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Notification Banner */}
        {selectedClass && selectedSubject && isMarked && (
          <div className="bg-[#dcfce7] border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0px_#000] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-400 rounded-xl border border-black shadow-[1px_1px_0px_#000]">
                <CheckCircle2 className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-outfit font-black text-black text-sm">
                  Attendance Already Recorded
                </p>
                <p className="text-neutral-700 text-xs font-jakarta font-medium">
                  Attendance for Class {selectedClass} • {selectedSubject} on {new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} is saved. You can adjust statuses and re-save.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-white border border-black text-xs font-black font-space uppercase shadow-[1px_1px_0px_#000]">
              Status: Logged
            </span>
          </div>
        )}

        {/* Attendance Table */}
        {selectedClass && selectedSubject && students.length > 0 && (
          <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
            {/* Table Header / Stats Bar */}
            <div className="p-5 bg-[#86efac] border-b-2 border-black flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-xl font-black font-outfit text-black">
                  {isMarked ? 'Update Attendance Record' : 'Take Attendance'}
                </h3>
                <p className="text-xs font-bold font-jakarta text-neutral-800">
                  Class {selectedClass} • {selectedSubject} • {students.length} Total Enrolled
                </p>
              </div>

              {/* Attendance Mini Counter */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-white border border-black text-xs font-black font-space shadow-[1px_1px_0px_#000] text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  {presentCount} Present
                </span>
                <span className="px-3 py-1 rounded-xl bg-white border border-black text-xs font-black font-space shadow-[1px_1px_0px_#000] text-rose-700 flex items-center gap-1">
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                  {absentCount} Absent
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-black">
                <thead className="bg-[#dcfce7] border-b-2 border-black font-space font-black uppercase text-black text-xs">
                  <tr>
                    <th className="px-5 py-3.5 text-left">#</th>
                    <th className="px-5 py-3.5 text-left">Student Name</th>
                    <th className="px-5 py-3.5 text-left hidden md:table-cell">Registration ID</th>
                    <th className="px-5 py-3.5 text-center">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-jakarta text-sm">
                  {students.map((student, index) => (
                    <tr key={`student-row-${student._id}-${index}`} className="hover:bg-[#f0fdf4] transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs font-bold text-neutral-500">
                        {index + 1}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-black block">{student.studentName}</span>
                        <span className="text-[11px] text-neutral-500 font-mono sm:hidden">{student.registrationId}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#dcfce7] border border-black font-mono font-bold text-xs text-black shadow-[1px_1px_0px_#000]">
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
            <div className="p-5 bg-[#f0fdf4] border-t-2 border-black flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-xs font-jakarta font-medium text-neutral-600">
                Ensure all students are marked before submitting. Absentees will be logged in the academic history.
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-cartoon px-8 py-3 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] text-sm sm:text-base disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <CheckSquare size={18} />
                <span>{loading ? 'Saving...' : isMarked ? 'Update Attendance' : 'Save Attendance'}</span>
              </button>
            </div>
          </div>
        )}

        {selectedClass && selectedSubject && students.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] p-8">
            <Users className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
            <p className="text-black font-black text-lg font-outfit">No Enrolled Students</p>
            <p className="text-neutral-500 text-xs font-jakarta mt-1">No students are currently enrolled in Class {selectedClass}</p>
          </div>
        )}

        {(!selectedClass || !selectedSubject) && (
          <div className="text-center py-16 bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] p-8">
            <div className="w-16 h-16 rounded-2xl bg-[#f0fdf4] border-2 border-black flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#000]">
              <Calendar className="w-8 h-8 text-black" />
            </div>
            <p className="text-black font-black text-lg font-outfit">Select Class & Subject</p>
            <p className="text-neutral-500 text-xs font-jakarta mt-1">Choose a standard and subject above to load student roll call</p>
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

