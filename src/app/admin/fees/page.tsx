'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  Filter,
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
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/Layout';
import CartoonDropdown from '@/components/ui/CartoonDropdown';

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
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200 border border-black text-xs font-black font-space uppercase mb-2 shadow-[1px_1px_0px_#000]">
              <CreditCard className="w-3.5 h-3.5 text-black" />
              <span>Accounts & Billing Desk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-outfit text-black tracking-tight">
              Monthly Fee Management
            </h1>
            <p className="text-sm font-bold text-neutral-600 font-jakarta mt-1">
              Track student monthly tuition collections, issue official receipts, and manage pending dues.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowBatchModal(true)}
              className="btn-cartoon px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-xs sm:text-sm rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Generate Monthly Class Dues</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-cartoon bg-[#f0fdf4] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <p className="text-xs font-black font-space uppercase text-neutral-600">Total Collected</p>
            <p className="text-3xl font-black font-mono text-emerald-900 mt-1">₹{metrics.totalCollected.toLocaleString('en-IN')}</p>
            <p className="text-xs font-bold text-emerald-700 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Official verified receipts
            </p>
          </div>

          <div className="card-cartoon bg-[#fef9c3] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <p className="text-xs font-black font-space uppercase text-neutral-600">Pending Dues</p>
            <p className="text-3xl font-black font-mono text-amber-900 mt-1">₹{metrics.totalPending.toLocaleString('en-IN')}</p>
            <p className="text-xs font-bold text-amber-800 mt-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Awaiting student payment
            </p>
          </div>

          <div className="card-cartoon bg-[#fee2e2] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <p className="text-xs font-black font-space uppercase text-neutral-600">Overdue Invoices</p>
            <p className="text-3xl font-black font-mono text-rose-900 mt-1">{metrics.overdueCount}</p>
            <p className="text-xs font-bold text-rose-800 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Past due date
            </p>
          </div>

          <div className="card-cartoon bg-[#dcfce7] rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]">
            <p className="text-xs font-black font-space uppercase text-neutral-600">Total Invoices</p>
            <p className="text-3xl font-black font-mono text-black mt-1">{metrics.totalRecords}</p>
            <p className="text-xs font-bold text-neutral-700 mt-2 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> Issued fee demands
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#f0fdf4] border-3 border-black rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student name, Reg ID, or Receipt #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border-2 border-black rounded-xl text-black font-bold font-jakarta text-xs sm:text-sm shadow-[1.5px_1.5px_0px_#000] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white font-black font-outfit text-xs rounded-xl border border-black"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-2">
            <div className="w-36">
              <CartoonDropdown
                size="sm"
                value={standardFilter}
                onChange={(e: any) => {
                  const val = typeof e === 'string' ? e : e?.target?.value;
                  setStandardFilter(val);
                }}
                options={[
                  { label: 'All Classes', value: 'All' },
                  ...['6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((std) => ({
                    label: `Class ${std}`,
                    value: std,
                  })),
                ]}
              />
            </div>

            <div className="w-40">
              <CartoonDropdown
                size="sm"
                value={statusFilter}
                onChange={(e: any) => {
                  const val = typeof e === 'string' ? e : e?.target?.value;
                  setStatusFilter(val);
                }}
                options={[
                  { label: 'All Statuses', value: 'All' },
                  { label: 'Paid Only', value: 'paid' },
                  { label: 'Pending Only', value: 'pending' },
                  { label: 'Overdue Only', value: 'overdue' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Fees Table */}
        <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl shadow-[6px_6px_0px_#000] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-3 border-black bg-[#dcfce7]">
                  <th className="p-4 font-black font-space uppercase text-xs">Student</th>
                  <th className="p-4 font-black font-space uppercase text-xs">Standard</th>
                  <th className="p-4 font-black font-space uppercase text-xs">Month</th>
                  <th className="p-4 font-black font-space uppercase text-xs">Amount</th>
                  <th className="p-4 font-black font-space uppercase text-xs">Due Date</th>
                  <th className="p-4 font-black font-space uppercase text-xs">Status</th>
                  <th className="p-4 font-black font-space uppercase text-xs">Receipt #</th>
                  <th className="p-4 font-black font-space uppercase text-xs text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black/15 font-jakarta">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-sm font-bold text-neutral-600">
                      Loading fee records...
                    </td>
                  </tr>
                ) : fees.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-sm font-bold text-neutral-600">
                      No fee records found. Click &quot;Generate Monthly Class Dues&quot; to issue new bills!
                    </td>
                  </tr>
                ) : (
                  fees.map((fee) => (
                    <tr key={fee._id} className="hover:bg-[#f0fdf4]/50 transition-colors">
                      <td className="p-4">
                        <p className="font-black text-black text-sm font-outfit">{fee.studentName}</p>
                        <p className="font-mono text-xs text-neutral-500 font-bold">{fee.registrationId}</p>
                      </td>
                      <td className="p-4 font-bold text-sm">Class {fee.standard}</td>
                      <td className="p-4 font-bold text-sm">{fee.month}</td>
                      <td className="p-4 font-black font-mono text-base text-black">₹{fee.totalAmount}</td>
                      <td className="p-4 font-bold text-xs text-neutral-600">
                        {new Date(fee.dueDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black font-space uppercase border ${
                          fee.status === 'paid'
                            ? 'bg-emerald-200 border-emerald-800 text-emerald-950'
                            : fee.status === 'overdue'
                            ? 'bg-rose-200 border-rose-800 text-rose-950'
                            : 'bg-amber-100 border-amber-800 text-amber-950'
                        }`}>
                          {fee.status === 'paid' && <Check className="w-3.5 h-3.5 text-emerald-950 stroke-[3]" />}
                          {fee.status === 'overdue' && <AlertCircle className="w-3.5 h-3.5 text-rose-950" />}
                          {fee.status === 'pending' && <Clock className="w-3.5 h-3.5 text-amber-950" />}
                          <span>{fee.status === 'paid' ? 'Paid' : fee.status === 'overdue' ? 'Overdue' : 'Pending'}</span>
                        </span>
                      </td>
                      <td className="p-4 font-mono text-xs font-bold text-neutral-700">
                        {fee.receiptNumber || '—'}
                      </td>
                      <td className="p-4 text-right">
                        {fee.status === 'paid' ? (
                          <button
                            onClick={() => setReceiptModalFee(fee)}
                            className="btn-cartoon px-3 py-1.5 bg-white hover:bg-emerald-200 border border-black rounded-xl text-xs font-bold text-black shadow-[1.5px_1.5px_0px_#000] inline-flex items-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Receipt</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedFee(fee);
                              setShowPayModal(true);
                            }}
                            className="btn-cartoon px-3 py-1.5 bg-emerald-400 hover:bg-emerald-300 border-2 border-black rounded-xl text-xs font-black text-black shadow-[2px_2px_0px_#000]"
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
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[8px_8px_0px_#000] cartoon-pop">
              <div className="flex items-center justify-between pb-4 border-b-2 border-black/15">
                <h3 className="text-xl font-black font-outfit text-black">Generate Class Monthly Dues</h3>
                <button
                  onClick={() => setShowBatchModal(false)}
                  className="p-1.5 rounded-xl border border-black hover:bg-rose-200"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              <form onSubmit={handleCreateBatchDues} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-black font-space uppercase text-black mb-1">Select Standard / Class</label>
                  <CartoonDropdown
                    value={batchForm.standard}
                    onChange={(e: any) => {
                      const val = typeof e === 'string' ? e : e?.target?.value;
                      setBatchForm({ ...batchForm, standard: val });
                    }}
                    options={['6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((std) => ({
                      label: `Class ${std}`,
                      value: std,
                    }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-black mb-1">Billing Month</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. May 2026"
                    value={batchForm.month}
                    onChange={(e) => setBatchForm({ ...batchForm, month: e.target.value })}
                    className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-black font-bold text-sm shadow-[1.5px_1.5px_0px_#000]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-black font-space uppercase text-black mb-1">Tuition Fee</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={batchForm.tuitionFee}
                      onChange={(e) => setBatchForm({ ...batchForm, tuitionFee: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-black font-bold text-sm shadow-[1.5px_1.5px_0px_#000]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black font-space uppercase text-black mb-1">Exam Fee</label>
                    <input
                      type="number"
                      min={0}
                      value={batchForm.examFee}
                      onChange={(e) => setBatchForm({ ...batchForm, examFee: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-black font-bold text-sm shadow-[1.5px_1.5px_0px_#000]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black font-space uppercase text-black mb-1">Lab / Misc</label>
                    <input
                      type="number"
                      min={0}
                      value={batchForm.labFee}
                      onChange={(e) => setBatchForm({ ...batchForm, labFee: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-black font-bold text-sm shadow-[1.5px_1.5px_0px_#000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-black mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={batchForm.dueDate}
                    onChange={(e) => setBatchForm({ ...batchForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-black font-bold text-sm shadow-[1.5px_1.5px_0px_#000]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowBatchModal(false)}
                    className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-black font-bold text-xs rounded-xl border-2 border-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creatingBatch}
                    className="flex-1 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
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
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white border-3 border-black rounded-3xl max-w-md w-full p-6 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-black font-outfit text-lg text-black">Collect Student Fee</h3>
                </div>
                <button
                  onClick={() => setShowPayModal(false)}
                  className="p-1.5 rounded-xl border border-black hover:bg-rose-200"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              <form onSubmit={handleRecordPayment} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-black font-space uppercase text-black mb-1">Payment Method</label>
                  <CartoonDropdown
                    value={paymentForm.paymentMode}
                    onChange={(e: any) => {
                      const val = typeof e === 'string' ? e : e?.target?.value;
                      setPaymentForm({ ...paymentForm, paymentMode: val as any });
                    }}
                    options={[
                      { label: 'Cash (Campus Desk)', value: 'Cash' },
                      { label: 'UPI (Google Pay / PhonePe)', value: 'UPI' },
                      { label: 'Debit / Credit Card', value: 'Card' },
                      { label: 'Net Banking', value: 'Online' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-black mb-1">Transaction ID / Reference (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. UPI-984920231 or Cash Slip #21"
                    value={paymentForm.transactionId}
                    onChange={(e) => setPaymentForm({ ...paymentForm, transactionId: e.target.value })}
                    className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-black font-bold text-sm shadow-[1.5px_1.5px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black font-space uppercase text-black mb-1">Remarks / Note</label>
                  <input
                    type="text"
                    value={paymentForm.remarks}
                    onChange={(e) => setPaymentForm({ ...paymentForm, remarks: e.target.value })}
                    className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-black font-bold text-sm shadow-[1.5px_1.5px_0px_#000]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPayModal(false)}
                    className="px-4 py-2.5 bg-white border-2 border-black text-black font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]"
                  >
                    Confirm & Generate Receipt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: OFFICIAL PRINTABLE CARTOON FEE RECEIPT */}
        {receiptModalFee && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#f0fdf4] border-4 border-black rounded-3xl p-6 sm:p-10 max-w-xl w-full shadow-[10px_10px_0px_#000] cartoon-pop relative">
              <button
                onClick={() => setReceiptModalFee(null)}
                className="absolute top-4 right-4 p-2 rounded-xl border-2 border-black bg-white hover:bg-rose-200 transition"
              >
                <X className="w-5 h-5 text-black" />
              </button>

              {/* Printable Receipt Content */}
              <div id="printable-receipt" className="space-y-6">
                {/* Receipt Header */}
                <div className="text-center pb-4 border-b-2 border-dashed border-black">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-2xl font-black font-outfit text-black">RAVEN TUTORIALS</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-300 border border-black text-[10px] font-black uppercase font-space">
                      Patna Campus
                    </span>
                  </div>
                  <p className="text-xs font-bold text-neutral-600 font-jakarta">
                    Boring Road, Patna, Bihar • info@raventutorials.com
                  </p>
                  <h4 className="text-sm font-black font-space uppercase tracking-widest text-black mt-2 bg-emerald-200 py-1 rounded-lg border border-black">
                    OFFICIAL TUITION FEE RECEIPT
                  </h4>
                </div>

                {/* Receipt Metadata */}
                <div className="grid grid-cols-2 gap-4 text-xs font-jakarta">
                  <div>
                    <p className="text-neutral-500 font-bold uppercase font-space text-[10px]">Receipt Number</p>
                    <p className="font-mono font-black text-black text-sm">{receiptModalFee.receiptNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-neutral-500 font-bold uppercase font-space text-[10px]">Payment Date</p>
                    <p className="font-mono font-black text-black">
                      {receiptModalFee.paidDate ? new Date(receiptModalFee.paidDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-500 font-bold uppercase font-space text-[10px]">Student Name</p>
                    <p className="font-black text-black text-sm">{receiptModalFee.studentName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-neutral-500 font-bold uppercase font-space text-[10px]">Registration ID</p>
                    <p className="font-mono font-bold text-black">{receiptModalFee.registrationId}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 font-bold uppercase font-space text-[10px]">Standard / Class</p>
                    <p className="font-bold text-black">{receiptModalFee.standard}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-neutral-500 font-bold uppercase font-space text-[10px]">Payment Mode</p>
                    <p className="font-bold text-emerald-800 inline-flex items-center gap-1 justify-end">
                      <span>{receiptModalFee.paymentMode || 'Cash'}</span>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </p>
                  </div>
                </div>

                {/* Fee Breakdown Table */}
                <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#dcfce7] border-b border-black font-black font-space uppercase">
                        <th className="p-2.5 text-left">Description</th>
                        <th className="p-2.5 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10 font-jakarta">
                      <tr>
                        <td className="p-2.5 font-medium">Monthly Tuition Fee ({receiptModalFee.month})</td>
                        <td className="p-2.5 text-right font-mono font-bold">₹{receiptModalFee.tuitionFee}</td>
                      </tr>
                      {receiptModalFee.labFee > 0 && (
                        <tr>
                          <td className="p-2.5 font-medium">Computer Lab & Study Material Fee</td>
                          <td className="p-2.5 text-right font-mono font-bold">₹{receiptModalFee.labFee}</td>
                        </tr>
                      )}
                      {receiptModalFee.examFee > 0 && (
                        <tr>
                          <td className="p-2.5 font-medium">Internal Mock Test & Examination Fee</td>
                          <td className="p-2.5 text-right font-mono font-bold">₹{receiptModalFee.examFee}</td>
                        </tr>
                      )}
                      <tr className="bg-[#f0fdf4] font-black border-t-2 border-black">
                        <td className="p-3 font-outfit text-sm">TOTAL AMOUNT PAID</td>
                        <td className="p-3 text-right font-mono text-base text-emerald-900">₹{receiptModalFee.totalAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Stamp & Verification */}
                <div className="flex items-center justify-between pt-2">
                  <div className="border-2 border-emerald-600 rounded-xl px-3 py-1 text-center bg-emerald-50 rotate-[-5deg]">
                    <p className="text-[10px] font-black uppercase text-emerald-800 font-space">VERIFIED & PAID</p>
                    <p className="text-[9px] font-mono text-emerald-700">RAVEN TUTORIALS</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-black font-outfit text-black">Accounts Office</p>
                    <p className="text-[10px] text-neutral-500 font-jakarta">Authorized Signatory</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3 pt-4 border-t-2 border-black/10">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-2"
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
  );
}
