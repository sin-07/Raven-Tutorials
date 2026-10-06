'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  Printer,
  Calendar,
  DollarSign,
  Download,
  Users,
  X,
  FileText,
  ShieldCheck,
  Check,
  Receipt,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
import AdminProtectedRoute from '@/components/admin/ProtectedRoute';

interface FeeRecord {
  _id: string;
  studentId: string;
  registrationId: string;
  studentName: string;
  standard: string;
  month: string;
  tuitionFee: number;
  examFee: number;
  labFee: number;
  totalAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  receiptNumber?: string;
  paymentMode?: 'UPI' | 'Card' | 'Cash' | 'Online';
  transactionId?: string;
  remarks?: string;
}

interface Metrics {
  totalCollected: number;
  totalPending: number;
  overdueCount: number;
  totalRecords: number;
}

export default function AdminFeesPage() {
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    totalCollected: 0,
    totalPending: 0,
    overdueCount: 0,
    totalRecords: 0,
  });
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [standardFilter, setStandardFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [creatingBatch, setCreatingBatch] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null);
  const [receiptModalFee, setReceiptModalFee] = useState<FeeRecord | null>(null);

  // Batch Form
  const [batchForm, setBatchForm] = useState({
    standard: '10th',
    month: 'April 2026',
    tuitionFee: 2500,
    examFee: 300,
    labFee: 200,
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    remarks: 'Monthly Academic Tuition Fee',
  });

  // Payment Form
  const [paymentForm, setPaymentForm] = useState({
    paymentMode: 'Cash' as 'UPI' | 'Card' | 'Cash' | 'Online',
    transactionId: '',
    remarks: 'Received at Patna Campus Desk',
  });

  const fetchFees = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (standardFilter !== 'All') params.append('standard', standardFilter);
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`/api/fees?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setFees(data.fees);
        setMetrics(data.metrics);
      } else {
        toast.error(data.message || 'Failed to fetch fees');
      }
    } catch {
      toast.error('Network error fetching fee records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, [standardFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFees();
  };

  const handleCreateBatchDues = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingBatch(true);
    try {
      const res = await fetch('/api/fees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'batch',
          ...batchForm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setShowBatchModal(false);
        fetchFees();
      } else {
        toast.error(data.message || 'Failed to generate dues');
      }
    } catch {
      toast.error('Server error creating batch dues');
    } finally {
      setCreatingBatch(false);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFee) return;

    try {
      const res = await fetch(`/api/fees/${selectedFee._id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentForm),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Payment recorded & receipt issued!');
        setShowPayModal(false);
        setReceiptModalFee(data.fee);
        fetchFees();
      } else {
        toast.error(data.message || 'Payment update failed');
      }
    } catch {
      toast.error('Server error updating payment');
    }
  };

  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <div className="space-y-8 max-w-7xl mx-auto">
          {/* Executive Header Banner */}
          <div className="relative bg-gradient-to-r from-[#12162a] via-[#0d101e] to-[#070914] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff7a45]/50 to-transparent" />
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 bg-[#e8602e]" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff7a45]/10 border border-[#ff7a45]/30 text-[#ffaa40] text-xs font-bold font-space uppercase mb-2 shadow-sm">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Accounts & Billing Desk</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white tracking-tight">
                  Monthly Fee Management
                </h1>
                <p className="text-zinc-400 font-jakarta font-medium text-xs sm:text-sm mt-1">
                  Track student monthly tuition collections, issue official receipts, and manage pending dues.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowBatchModal(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ffa066] text-white font-bold font-outfit text-xs sm:text-sm rounded-xl border border-white/10 shadow-[0_8px_20px_rgba(232,96,46,0.35)] flex items-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Monthly Class Dues</span>
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold font-space uppercase text-zinc-400">Total Collected</p>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-2">
                ₹{metrics.totalCollected.toLocaleString('en-IN')}
              </p>
              <p className="text-xs font-semibold text-zinc-500 mt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Official verified receipts
              </p>
            </div>

            <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold font-space uppercase text-zinc-400">Pending Dues</p>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black font-mono text-amber-400 mt-2">
                ₹{metrics.totalPending.toLocaleString('en-IN')}
              </p>
              <p className="text-xs font-semibold text-zinc-500 mt-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Awaiting student payment
              </p>
            </div>

            <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-rose-500/40 transition-all">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold font-space uppercase text-zinc-400">Overdue Invoices</p>
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black font-mono text-rose-400 mt-2">
                {metrics.overdueCount}
              </p>
              <p className="text-xs font-semibold text-zinc-500 mt-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> Past due date
              </p>
            </div>

            <div className="bg-[#0b0e1a]/90 rounded-2xl p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-[#ff7a45]/40 transition-all">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold font-space uppercase text-zinc-400">Total Invoices</p>
                <div className="w-8 h-8 rounded-lg bg-[#ff7a45]/10 border border-[#ff7a45]/20 flex items-center justify-center text-[#ffaa40]">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black font-mono text-white mt-2">
                {metrics.totalRecords}
              </p>
              <p className="text-xs font-semibold text-zinc-500 mt-2 flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-[#ff7a45]" /> Issued fee demands
              </p>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-[#0b0e1a]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by student name, Reg ID, or Receipt #..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 font-medium font-jakarta text-xs sm:text-sm focus:outline-none focus:border-[#ff7a45] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ffa066] text-white font-bold font-outfit text-xs rounded-xl border border-white/10 shadow-[0_4px_12px_rgba(232,96,46,0.35)] cursor-pointer transition-all"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-3">
              <div className="w-40">
                <select
                  value={standardFilter}
                  onChange={(e) => setStandardFilter(e.target.value)}
                  className="w-full bg-[#070914] border border-white/10 rounded-xl text-white px-3.5 py-2.5 text-xs sm:text-sm font-jakarta focus:outline-none focus:border-[#ff7a45] cursor-pointer"
                >
                  <option value="All">All Classes</option>
                  {['6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((std) => (
                    <option key={std} value={std}>
                      Class {std}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-40">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-[#070914] border border-white/10 rounded-xl text-white px-3.5 py-2.5 text-xs sm:text-sm font-jakarta focus:outline-none focus:border-[#ff7a45] cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="paid">Paid Only</option>
                  <option value="pending">Pending Only</option>
                  <option value="overdue">Overdue Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fees Table */}
          <div className="bg-[#0b0e1a]/90 border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0f1222] font-space font-bold uppercase text-zinc-400 text-xs">
                    <th className="p-4">Student</th>
                    <th className="p-4">Standard</th>
                    <th className="p-4">Month</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Receipt #</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-jakarta">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-sm font-medium text-zinc-400">
                        Loading fee records...
                      </td>
                    </tr>
                  ) : fees.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-sm font-medium text-zinc-400">
                        No fee records found. Click &quot;Generate Monthly Class Dues&quot; to issue new bills!
                      </td>
                    </tr>
                  ) : (
                    fees.map((fee) => (
                      <tr key={fee._id} className="hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-white text-sm font-outfit">{fee.studentName}</p>
                          <p className="font-mono text-xs text-zinc-500">{fee.registrationId}</p>
                        </td>
                        <td className="p-4 font-medium text-sm text-zinc-300">Class {fee.standard}</td>
                        <td className="p-4 font-medium text-sm text-zinc-300">{fee.month}</td>
                        <td className="p-4 font-bold font-mono text-base text-[#ffaa40]">₹{fee.totalAmount}</td>
                        <td className="p-4 font-medium text-xs text-zinc-400">
                          {new Date(fee.dueDate).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-space uppercase border ${
                              fee.status === 'paid'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : fee.status === 'overdue'
                                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            }`}
                          >
                            {fee.status === 'paid' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                            {fee.status === 'overdue' && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
                            {fee.status === 'pending' && <Clock className="w-3.5 h-3.5 text-amber-400" />}
                            <span>{fee.status === 'paid' ? 'Paid' : fee.status === 'overdue' ? 'Overdue' : 'Pending'}</span>
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs font-semibold text-zinc-400">
                          {fee.receiptNumber || '—'}
                        </td>
                        <td className="p-4 text-right">
                          {fee.status === 'paid' ? (
                            <button
                              onClick={() => setReceiptModalFee(fee)}
                              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white shadow-sm inline-flex items-center gap-1.5 cursor-pointer transition-all"
                            >
                              <Printer className="w-3.5 h-3.5 text-[#ff7a45]" />
                              <span>Receipt</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedFee(fee);
                                setShowPayModal(true);
                              }}
                              className="px-3.5 py-1.5 bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ffa066] text-white font-bold font-outfit text-xs rounded-xl border border-white/10 shadow-[0_4px_12px_rgba(232,96,46,0.35)] cursor-pointer transition-all"
                            >
                              Record Pay
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* MODAL 1: BATCH GENERATE CLASS DUES */}
          {showBatchModal && (
            <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-[#0c0f1c] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_25px_60px_rgba(0,0,0,0.9)] my-auto text-white">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#ff7a45]" />
                    <h3 className="text-xl font-bold font-outfit text-white">Generate Class Monthly Dues</h3>
                  </div>
                  <button
                    onClick={() => setShowBatchModal(false)}
                    className="p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateBatchDues} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold font-space uppercase text-zinc-300 mb-1.5">
                      Select Standard / Class
                    </label>
                    <select
                      value={batchForm.standard}
                      onChange={(e) => setBatchForm({ ...batchForm, standard: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-jakarta text-sm focus:outline-none focus:border-[#ff7a45]"
                    >
                      {['6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((std) => (
                        <option key={std} value={std}>
                          Class {std}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-space uppercase text-zinc-300 mb-1.5">
                      Billing Month
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. May 2026"
                      value={batchForm.month}
                      onChange={(e) => setBatchForm({ ...batchForm, month: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-jakarta text-sm focus:outline-none focus:border-[#ff7a45]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold font-space uppercase text-zinc-300 mb-1.5">
                        Tuition Fee
                      </label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={batchForm.tuitionFee}
                        onChange={(e) => setBatchForm({ ...batchForm, tuitionFee: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-jakarta text-sm focus:outline-none focus:border-[#ff7a45]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold font-space uppercase text-zinc-300 mb-1.5">
                        Exam Fee
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={batchForm.examFee}
                        onChange={(e) => setBatchForm({ ...batchForm, examFee: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-jakarta text-sm focus:outline-none focus:border-[#ff7a45]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold font-space uppercase text-zinc-300 mb-1.5">
                        Lab / Misc
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={batchForm.labFee}
                        onChange={(e) => setBatchForm({ ...batchForm, labFee: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-jakarta text-sm focus:outline-none focus:border-[#ff7a45]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-space uppercase text-zinc-300 mb-1.5">
                      Due Date
                    </label>
                    <input
                      type="date"
                      required
                      value={batchForm.dueDate}
                      onChange={(e) => setBatchForm({ ...batchForm, dueDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-jakarta text-sm focus:outline-none focus:border-[#ff7a45]"
                    />
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowBatchModal(false)}
                      className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 font-bold text-xs rounded-xl border border-white/10 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creatingBatch}
                      className="flex-1 py-2.5 bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ffa066] text-white font-bold font-outfit text-xs uppercase tracking-wider rounded-xl border border-white/10 shadow-[0_6px_20px_rgba(232,96,46,0.4)] cursor-pointer"
                    >
                      {creatingBatch ? 'Generating...' : 'Generate Invoices'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Record Payment Modal */}
          {showPayModal && (
            <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-[#0c0f1c] border border-white/15 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] my-auto text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#ff7a45]" />
                    <h3 className="font-bold font-outfit text-lg text-white">Collect Student Fee</h3>
                  </div>
                  <button
                    onClick={() => setShowPayModal(false)}
                    className="p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleRecordPayment} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold font-space uppercase text-zinc-300 mb-1.5">
                      Payment Method
                    </label>
                    <select
                      value={paymentForm.paymentMode}
                      onChange={(e) => setPaymentForm({ ...paymentForm, paymentMode: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-jakarta text-sm focus:outline-none focus:border-[#ff7a45]"
                    >
                      <option value="Cash">Cash (Campus Desk)</option>
                      <option value="UPI">UPI (Google Pay / PhonePe)</option>
                      <option value="Card">Debit / Credit Card</option>
                      <option value="Online">Net Banking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-space uppercase text-zinc-300 mb-1.5">
                      Transaction ID / Reference (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UPI-984920231 or Cash Slip #21"
                      value={paymentForm.transactionId}
                      onChange={(e) => setPaymentForm({ ...paymentForm, transactionId: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white placeholder-zinc-500 font-jakarta text-sm focus:outline-none focus:border-[#ff7a45]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-space uppercase text-zinc-300 mb-1.5">
                      Remarks / Note
                    </label>
                    <input
                      type="text"
                      value={paymentForm.remarks}
                      onChange={(e) => setPaymentForm({ ...paymentForm, remarks: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#070914] border border-white/10 rounded-xl text-white font-jakarta text-sm focus:outline-none focus:border-[#ff7a45]"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowPayModal(false)}
                      className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ffa066] text-white font-bold font-outfit text-xs uppercase tracking-wider rounded-xl border border-white/10 shadow-[0_6px_20px_rgba(232,96,46,0.4)] cursor-pointer"
                    >
                      Confirm & Generate Receipt
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL 3: OFFICIAL PRINTABLE FEE RECEIPT */}
          {receiptModalFee && (
            <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-[#0c0f1c] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative my-auto text-white">
                <button
                  onClick={() => setReceiptModalFee(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Printable Receipt Content */}
                <div id="printable-receipt" className="space-y-6">
                  {/* Receipt Header */}
                  <div className="text-center pb-4 border-b border-dashed border-white/20">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-2xl font-black font-outfit text-white tracking-wide">RAVEN TUTORIALS</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#ff7a45]/20 border border-[#ff7a45]/40 text-[#ffaa40] text-[10px] font-bold uppercase font-space">
                        Patna Campus
                      </span>
                    </div>
                    <p className="text-xs font-medium text-zinc-400 font-jakarta">
                      Boring Road, Patna, Bihar • info@raventutorials.com
                    </p>
                    <div className="mt-3 inline-block px-4 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-space uppercase tracking-wider">
                      OFFICIAL TUITION FEE RECEIPT
                    </div>
                  </div>

                  {/* Receipt Metadata */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-jakarta bg-[#070914] p-4 rounded-2xl border border-white/10">
                    <div>
                      <p className="text-zinc-500 font-bold uppercase font-space text-[10px]">Receipt Number</p>
                      <p className="font-mono font-bold text-[#ffaa40] text-sm">{receiptModalFee.receiptNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-500 font-bold uppercase font-space text-[10px]">Payment Date</p>
                      <p className="font-mono font-medium text-zinc-300">
                        {receiptModalFee.paidDate ? new Date(receiptModalFee.paidDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}
                      </p>
                    </div>
                    <div>
                      <p className="text-zinc-500 font-bold uppercase font-space text-[10px]">Student Name</p>
                      <p className="font-bold text-white text-sm">{receiptModalFee.studentName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-500 font-bold uppercase font-space text-[10px]">Registration ID</p>
                      <p className="font-mono font-medium text-zinc-300">{receiptModalFee.registrationId}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 font-bold uppercase font-space text-[10px]">Standard / Class</p>
                      <p className="font-medium text-zinc-300">Class {receiptModalFee.standard}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-500 font-bold uppercase font-space text-[10px]">Payment Mode</p>
                      <p className="font-bold text-emerald-400 inline-flex items-center gap-1 justify-end">
                        <span>{receiptModalFee.paymentMode || 'Cash'}</span>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </p>
                    </div>
                  </div>

                  {/* Fee Breakdown Table */}
                  <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#070914]">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-[#0f1222] border-b border-white/10 font-bold font-space uppercase text-zinc-400">
                          <th className="p-3 text-left">Description</th>
                          <th className="p-3 text-right">Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-jakarta">
                        <tr>
                          <td className="p-3 text-zinc-300">Monthly Tuition Fee ({receiptModalFee.month})</td>
                          <td className="p-3 text-right font-mono font-bold text-white">₹{receiptModalFee.tuitionFee}</td>
                        </tr>
                        {receiptModalFee.labFee > 0 && (
                          <tr>
                            <td className="p-3 text-zinc-300">Computer Lab & Study Material Fee</td>
                            <td className="p-3 text-right font-mono font-bold text-white">₹{receiptModalFee.labFee}</td>
                          </tr>
                        )}
                        {receiptModalFee.examFee > 0 && (
                          <tr>
                            <td className="p-3 text-zinc-300">Internal Mock Test & Examination Fee</td>
                            <td className="p-3 text-right font-mono font-bold text-white">₹{receiptModalFee.examFee}</td>
                          </tr>
                        )}
                        <tr className="bg-white/[0.02] border-t border-white/10 font-bold">
                          <td className="p-3.5 font-outfit text-sm text-white">TOTAL AMOUNT PAID</td>
                          <td className="p-3.5 text-right font-mono text-base text-[#ffaa40]">₹{receiptModalFee.totalAmount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Stamp & Verification */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="border border-emerald-500/40 rounded-xl px-3.5 py-1.5 text-center bg-emerald-500/10 rotate-[-3deg]">
                      <p className="text-[10px] font-black uppercase text-emerald-400 font-space tracking-wider">VERIFIED & PAID</p>
                      <p className="text-[9px] font-mono text-emerald-300">RAVEN TUTORIALS</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-bold font-outfit text-white">Accounts Office</p>
                      <p className="text-[10px] text-zinc-500 font-jakarta">Authorized Signatory</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ffa066] text-white font-bold font-outfit text-xs uppercase tracking-wider rounded-xl border border-white/10 shadow-[0_6px_20px_rgba(232,96,46,0.35)] flex items-center gap-2 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Official Receipt</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
