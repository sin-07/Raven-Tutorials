'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';
import toast from 'react-hot-toast';
import { FileText, Plus, Edit2, Trash2, Send, Lock, Sparkles, X, Check, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { Loader } from '@/components';
import { STANDARDS } from '@/constants/classes';
import { CartoonDropdown } from '@/components/ui/CartoonDropdown';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

interface Question {
  questionText: string;
  questionType: 'MCQ' | 'Short Answer' | 'Long Answer' | 'True/False';
  options: string[];
  correctAnswer: string;
  marks: string | number;
}

interface TestData {
  _id: string;
  testId: string;
  title: string;
  description: string;
  standard: string;
  subject: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  questions: Question[];
  status: 'DRAFT' | 'PUBLISHED' | 'EXPIRED';
  publishedAt?: string;
}

interface FormData {
  title: string;
  description: string;
  standard: string;
  subject: string;
  startDate: string;
  endDate: string;
  duration: string;
  totalMarks: string;
  passingMarks: string;
  questions: Question[];
}

const AdminTests: React.FC = () => {
  const [tests, setTests] = useState<TestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Freeze background when modal is open
  useBodyScrollLock(showModal);
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    standard: '',
    subject: '',
    startDate: '',
    endDate: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    questionText: '',
    questionType: 'MCQ',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: ''
  });

  const classes = STANDARDS;

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await fetch('/api/admin/tests', { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setTests(data.data);
      }
    } catch (error) {
      toast.error('Error loading tests');
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.questionText || !currentQuestion.marks) {
      toast.error('Please fill question text and marks');
      return;
    }

    if (currentQuestion.questionType === 'MCQ') {
      const validOptions = currentQuestion.options.filter(opt => opt.trim() !== '');
      if (validOptions.length < 2) {
        toast.error('Please provide at least 2 options for MCQ');
        return;
      }
      if (!currentQuestion.correctAnswer) {
        toast.error('Please select the correct answer');
        return;
      }
    }

    setFormData({
      ...formData,
      questions: [...formData.questions, { ...currentQuestion }]
    });

    setCurrentQuestion({
      questionText: '',
      questionType: 'MCQ',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: ''
    });

    toast.success('Question added');
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    // Calculate total marks from questions
    const calculatedTotalMarks = formData.questions.reduce((sum, q) => sum + Number(q.marks), 0);

    try {
      const res = await fetch(
        editingTestId ? `/api/admin/tests/${editingTestId}` : '/api/admin/tests',
        {
          method: editingTestId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            ...formData,
            totalMarks: calculatedTotalMarks
          })
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success(editingTestId ? 'Test updated successfully' : 'Test created as Draft');
        setShowModal(false);
        setCurrentStep(1);
        setEditingTestId(null);
        setFormData({
          title: '', description: '', standard: '', subject: '',
          startDate: '', endDate: '', duration: '', totalMarks: '', passingMarks: '',
          questions: []
        });
        fetchTests();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(editingTestId ? 'Error updating test' : 'Error creating test');
    }
  };

  const handlePublish = async (id: string) => {
    setPublishingId(id);
    try {
      const res = await fetch(`/api/admin/tests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'publish' })
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Test published successfully! Students can now see it.');
        fetchTests();
      } else {
        toast.error(data.message || 'Failed to publish test');
      }
    } catch (error) {
      toast.error('Error publishing test');
    } finally {
      setPublishingId(null);
    }
  };

  const handleUnpublish = async (id: string) => {
    if (!window.confirm('Are you sure you want to unpublish this test? Students will no longer be able to see it.')) return;
    
    setPublishingId(id);
    try {
      const res = await fetch(`/api/admin/tests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'unpublish' })
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Test unpublished. Students can no longer see it.');
        fetchTests();
      } else {
        toast.error(data.message || 'Failed to unpublish test');
      }
    } catch (error) {
      toast.error('Error unpublishing test');
    } finally {
      setPublishingId(null);
    }
  };

  const handleEdit = async (test: TestData) => {
    if (test.status !== 'DRAFT') {
      toast.error('Only DRAFT tests can be edited. Unpublish first to edit.');
      return;
    }
    
    setEditingTestId(test._id);
    setFormData({
      title: test.title,
      description: test.description,
      standard: test.standard,
      subject: test.subject,
      startDate: new Date(test.startDate).toISOString().split('T')[0],
      endDate: new Date(test.endDate).toISOString().split('T')[0],
      duration: String(test.duration),
      totalMarks: String(test.totalMarks),
      passingMarks: String(test.passingMarks),
      questions: test.questions || []
    });
    setShowModal(true);
    setCurrentStep(1);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this test?')) return;

    try {
      const res = await fetch(`/api/admin/tests/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Test deleted successfully');
        fetchTests();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error deleting test');
    }
  };

  const calculateTotalMarks = () => {
    return formData.questions.reduce((sum, q) => sum + Number(q.marks), 0);
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingTestId(null);
    setCurrentStep(1);
    setFormData({
      title: '', description: '', standard: '', subject: '',
      startDate: '', endDate: '', duration: '', totalMarks: '', passingMarks: '',
      questions: []
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-[#86efac] text-black border border-black';
      case 'EXPIRED':
        return 'bg-rose-200 text-rose-950 border border-black';
      case 'DRAFT':
      default:
        return 'bg-amber-200 text-black border border-black';
    }
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    const end = new Date(endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    return `${start} - ${end}`;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_#000] text-center max-w-sm w-full cartoon-pop">
            <div className="animate-spin w-10 h-10 border-4 border-black border-t-emerald-500 rounded-full mx-auto mb-3"></div>
            <p className="text-black font-black font-outfit text-lg">Loading Assessments...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Cartoon Header Banner */}
        <div className="bg-[#86efac] border-3 border-black rounded-3xl shadow-[8px_8px_0px_#000] p-6 sm:p-8 text-black relative overflow-hidden cartoon-pop">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black text-black text-xs font-bold font-space uppercase mb-2 shadow-[1.5px_1.5px_0px_#000]">
                <FileText className="w-3.5 h-3.5 text-emerald-800" />
                <span>Examinations & Assessments</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit tracking-tight">
                Tests & Examinations
              </h1>
              <p className="text-neutral-900 font-bold font-jakarta text-xs sm:text-sm mt-1">
                Author quizzes, set MCQ & subjective papers, and publish tests by batch
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn-cartoon flex items-center gap-2 bg-white hover:bg-[#dcfce7] text-black font-black px-4 py-2.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] text-sm font-outfit"
            >
              <Plus size={18} className="text-black" />
              <span>Create New Test</span>
            </button>
          </div>
        </div>

        {/* Status Legend */}
        <div className="bg-[#f0fdf4] rounded-2xl p-4 border-2 border-black shadow-[4px_4px_0px_#000] flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-black uppercase font-space text-black">Status Guide:</span>
          <div className="flex flex-wrap gap-2 text-xs font-space font-bold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-200 border border-black text-black shadow-[1px_1px_0px_#000]">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              DRAFT (Hidden)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#86efac] border border-black text-black shadow-[1px_1px_0px_#000]">
              <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
              PUBLISHED (Live)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-200 border border-black text-rose-950 shadow-[1px_1px_0px_#000]">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              EXPIRED (Archived)
            </span>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#86efac] border-b-2 border-black font-space font-black uppercase text-black text-xs">
              <tr>
                <th className="px-5 py-3.5 text-left">Test ID</th>
                <th className="px-5 py-3.5 text-left">Title</th>
                <th className="px-5 py-3.5 text-left">Standard</th>
                <th className="px-5 py-3.5 text-left">Subject</th>
                <th className="px-5 py-3.5 text-left">Date Range</th>
                <th className="px-5 py-3.5 text-center">Questions</th>
                <th className="px-5 py-3.5 text-center">Marks</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 font-jakarta text-sm">
              {tests.map((test) => (
                <tr key={test._id} className="hover:bg-[#f0fdf4] transition-colors">
                  <td className="px-5 py-3.5 text-xs text-neutral-500 font-mono font-bold">{test.testId}</td>
                  <td className="px-5 py-3.5 font-bold text-black">{test.title}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#dcfce7] border border-black text-xs font-black font-space text-black">
                      Class {test.standard}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-neutral-800 font-medium">{test.subject}</td>
                  <td className="px-5 py-3.5 text-xs text-neutral-600 font-mono font-bold">
                    {formatDateRange(test.startDate, test.endDate)}
                  </td>
                  <td className="px-5 py-3.5 text-center font-mono font-bold">{test.questions?.length || 0}</td>
                  <td className="px-5 py-3.5 text-center font-mono font-bold">{test.totalMarks}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black font-space uppercase shadow-[1px_1px_0px_#000] ${getStatusBadge(test.status)}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {test.status === 'DRAFT' && (
                        <>
                          <button
                            onClick={() => handleEdit(test)}
                            className="btn-cartoon p-1.5 bg-white hover:bg-sky-100 text-black rounded-lg border border-black shadow-[1px_1px_0px_#000]"
                            title="Edit Assessment"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handlePublish(test._id)}
                            disabled={publishingId === test._id}
                            className="btn-cartoon px-2.5 py-1 bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs rounded-lg border border-black shadow-[1px_1px_0px_#000] flex items-center gap-1"
                            title="Publish Test"
                          >
                            <Send size={12} />
                            <span>Publish</span>
                          </button>
                        </>
                      )}
                      {test.status === 'PUBLISHED' && (
                        <button
                          onClick={() => handleUnpublish(test._id)}
                          disabled={publishingId === test._id}
                          className="btn-cartoon px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-black font-bold text-xs rounded-lg border border-black shadow-[1px_1px_0px_#000] flex items-center gap-1"
                          title="Unpublish to Draft"
                        >
                          <Lock size={12} />
                          <span>Unpublish</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(test._id)}
                        className="btn-cartoon p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-lg border border-black shadow-[1px_1px_0px_#000]"
                        title="Delete Assessment"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500 font-bold font-jakarta text-sm">No tests created yet. Click above to create your first assessment.</p>
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {tests.map((test) => (
            <div key={test._id} className="bg-[#f0fdf4] rounded-2xl p-4 border-2 border-black shadow-[4px_4px_0px_#000]">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[10px] text-neutral-500 font-mono font-bold mb-0.5">{test.testId}</p>
                  <h3 className="font-black text-black text-base font-outfit">{test.title}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black font-space uppercase shadow-[1px_1px_0px_#000] ${getStatusBadge(test.status)}`}>
                  {test.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs mb-3">
                <span className="px-2 py-0.5 rounded-md bg-white border border-black font-space font-bold">
                  Class {test.standard}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-black font-medium">
                  {test.subject}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-black font-mono font-bold">
                  {test.totalMarks} Marks
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/10">
                {test.status === 'DRAFT' && (
                  <>
                    <button
                      onClick={() => handleEdit(test)}
                      className="btn-cartoon px-3 py-1.5 bg-white text-black font-bold text-xs rounded-xl border border-black"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePublish(test._id)}
                      disabled={publishingId === test._id}
                      className="btn-cartoon px-3 py-1.5 bg-emerald-400 text-black font-bold text-xs rounded-xl border border-black"
                    >
                      Publish
                    </button>
                  </>
                )}
                {test.status === 'PUBLISHED' && (
                  <button
                    onClick={() => handleUnpublish(test._id)}
                    disabled={publishingId === test._id}
                    className="btn-cartoon px-3 py-1.5 bg-amber-200 text-black font-bold text-xs rounded-xl border border-black"
                  >
                    Unpublish
                  </button>
                )}
                <button
                  onClick={() => handleDelete(test._id)}
                  className="btn-cartoon px-3 py-1.5 bg-rose-100 text-rose-900 font-bold text-xs rounded-xl border border-black"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {tests.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center border-2 border-black">
              <p className="text-neutral-500 font-bold text-sm">No tests created yet.</p>
            </div>
          )}
        </div>

        {/* Cartoon Create / Edit Test Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto overscroll-contain">
            <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl shadow-[8px_8px_0px_#000] p-6 sm:p-8 max-w-3xl w-full my-6 max-h-[90vh] overflow-y-auto overscroll-contain">
              <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#86efac] rounded-xl border border-black shadow-[1px_1px_0px_#000]">
                    <FileText size={20} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black font-outfit text-black">
                      {editingTestId ? 'Edit Assessment' : 'Create New Assessment'}
                    </h3>
                    <p className="text-xs text-neutral-600 font-space font-bold uppercase">
                      {currentStep === 1 ? 'Step 1: Basic Specifications' : 'Step 2: Questions & Marks'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetModal}
                  className="btn-cartoon p-1.5 rounded-xl bg-white border border-black hover:bg-rose-100"
                >
                  <X size={18} className="text-black" />
                </button>
              </div>
              
              {!editingTestId && (
                <div className="bg-amber-100 border-2 border-black rounded-xl p-3 mb-4 shadow-[2px_2px_0px_#000]">
                  <p className="text-amber-950 text-xs font-bold font-jakarta flex items-center gap-1.5">
                    <Info className="w-4 h-4 inline shrink-0 text-amber-900" />
                    <span>New tests will initially be saved as <strong>DRAFT</strong>. Students will only see the assessment once you hit Publish.</span>
                  </p>
                </div>
              )}
              
              {currentStep === 1 ? (
                <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">Test Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                        placeholder="e.g. Unit Test 2 - Electrostatics"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">Standard / Class *</label>
                      <CartoonDropdown
                        value={formData.standard}
                        onChange={(val) => setFormData({ ...formData, standard: val })}
                        placeholder="Select Class"
                        options={[
                          { value: '', label: 'Select Class' },
                          ...classes.map(cls => ({ value: cls, label: cls }))
                        ]}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">Subject *</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                        placeholder="e.g. Physics"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">Start Date * (Visible From)</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl text-black font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">End Date * (Expiry Date)</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        min={formData.startDate}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl text-black font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">Duration (Minutes) *</label>
                      <input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                        placeholder="60"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">Passing Marks *</label>
                      <input
                        type="number"
                        value={formData.passingMarks}
                        onChange={(e) => setFormData({ ...formData, passingMarks: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                        placeholder="40"
                        required
                      />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">Description / Instructions</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000]"
                        rows={3}
                        placeholder="Instructions for students taking this test..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t-2 border-black/10">
                    <button
                      type="submit"
                      className="btn-cartoon flex-1 py-3 px-6 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] text-sm flex items-center justify-center gap-2"
                    >
                      <span>Next: Add Questions</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={resetModal}
                      className="btn-cartoon py-3 px-6 bg-white hover:bg-neutral-100 text-black font-bold font-outfit rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000] text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Added Questions List */}
                  {formData.questions.length > 0 && (
                    <div className="bg-white p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
                      <h4 className="font-outfit font-black text-black text-sm mb-3">
                        Added Questions ({formData.questions.length}) • Total Calculated Marks: {calculateTotalMarks()}
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {formData.questions.map((q, index) => (
                          <div key={index} className="flex justify-between items-center bg-[#f0fdf4] p-3 rounded-xl border border-black">
                            <div className="flex-1 text-black text-xs font-jakarta">
                              <span className="font-black">Q{index + 1}:</span> {q.questionText.substring(0, 60)}...
                              <span className="ml-2 font-space font-bold uppercase text-[10px] text-emerald-800">
                                ({q.questionType} • {q.marks} pts)
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveQuestion(index)}
                              className="btn-cartoon p-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg border border-black ml-2"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add New Question Form */}
                  <div className="bg-white p-5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] space-y-4">
                    <h4 className="font-outfit font-black text-black text-sm">Add New Question</h4>
                    
                    <div>
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">Question Format</label>
                      <CartoonDropdown
                        value={currentQuestion.questionType}
                        onChange={(val) => setCurrentQuestion({ ...currentQuestion, questionType: val as Question['questionType'] })}
                        options={[
                          { value: 'MCQ', label: 'Multiple Choice (MCQ)' },
                          { value: 'Short Answer', label: 'Short Answer' },
                          { value: 'Long Answer', label: 'Long Answer' },
                          { value: 'True/False', label: 'True/False' },
                        ]}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">Question Prompt *</label>
                      <textarea
                        value={currentQuestion.questionText}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border-2 border-black rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000] text-sm"
                        rows={3}
                        placeholder="Type question content here..."
                      />
                    </div>

                    {currentQuestion.questionType === 'MCQ' && (
                      <div>
                        <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Options (Mark correct answer) *</label>
                        {currentQuestion.options.map((option, idx) => (
                          <div key={idx} className="flex items-center gap-2 mb-2">
                            <span className="font-black font-space text-black text-xs w-5">{String.fromCharCode(65 + idx)}.</span>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...currentQuestion.options];
                                newOptions[idx] = e.target.value;
                                setCurrentQuestion({ ...currentQuestion, options: newOptions });
                              }}
                              className="flex-1 px-3.5 py-2 bg-white border-2 border-black rounded-xl text-black font-medium text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[1px_1px_0px_#000]"
                              placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                            />
                            <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-black bg-[#dcfce7] cursor-pointer">
                              <input
                                type="radio"
                                name="correctAnswer"
                                checked={currentQuestion.correctAnswer === option && option !== ''}
                                onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: option })}
                                className="accent-black"
                                disabled={option === ''}
                              />
                              <span className="text-[10px] font-black font-space uppercase text-black">Correct</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {currentQuestion.questionType === 'True/False' && (
                      <div>
                        <label className="block text-xs font-black uppercase font-space text-black mb-1.5">Correct Answer *</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-black cursor-pointer">
                            <input
                              type="radio"
                              name="trueFalse"
                              value="True"
                              checked={currentQuestion.correctAnswer === 'True'}
                              onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                              className="accent-black"
                            />
                            <span className="font-black font-outfit text-sm">True</span>
                          </label>
                          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-black cursor-pointer">
                            <input
                              type="radio"
                              name="trueFalse"
                              value="False"
                              checked={currentQuestion.correctAnswer === 'False'}
                              onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                              className="accent-black"
                            />
                            <span className="font-black font-outfit text-sm">False</span>
                          </label>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-black uppercase font-space text-black mb-1">Score Marks *</label>
                      <input
                        type="number"
                        value={currentQuestion.marks}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, marks: e.target.value })}
                        className="w-full px-4 py-2 bg-white border-2 border-black rounded-xl text-black font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-[2px_2px_0px_#000] text-sm"
                        placeholder="e.g. 5"
                        min="1"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="btn-cartoon w-full py-2.5 bg-[#86efac] hover:bg-[#4ade80] text-black font-black font-outfit rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] text-sm flex items-center justify-center gap-2"
                    >
                      <Plus size={16} />
                      <span>Add This Question</span>
                    </button>
                  </div>

                  {/* Modal Footer Controls */}
                  <div className="flex gap-3 pt-4 border-t-2 border-black/10">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="btn-cartoon py-3 px-5 bg-white hover:bg-neutral-100 text-black font-bold font-outfit rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000] text-sm flex items-center gap-1.5"
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Step 1</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={formData.questions.length === 0}
                      className="btn-cartoon flex-1 py-3 px-5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] text-sm disabled:opacity-50"
                    >
                      {editingTestId ? 'Update Test' : 'Save as Draft'} ({formData.questions.length} Questions, {calculateTotalMarks()} Marks)
                    </button>
                    <button
                      type="button"
                      onClick={resetModal}
                      className="btn-cartoon py-3 px-5 bg-rose-100 hover:bg-rose-200 text-rose-950 font-bold font-outfit rounded-2xl border-2 border-black shadow-[2px_2px_0px_#000] text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// Wrap with AdminProtectedRoute for security
const ProtectedAdminTests = () => (
  <AdminProtectedRoute>
    <AdminTests />
  </AdminProtectedRoute>
);

export default ProtectedAdminTests;

