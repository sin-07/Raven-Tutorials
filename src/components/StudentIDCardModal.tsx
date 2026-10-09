'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Printer, X, Download, ShieldCheck, Sparkles,
  Phone, Mail, MapPin, RotateCw, CheckCircle, Award
} from 'lucide-react';
import toast from 'react-hot-toast';
import QRCode from 'qrcode';

export interface StudentCardData {
  _id?: string;
  studentName: string;
  fatherName?: string;
  motherName?: string;
  gender?: string;
  bloodGroup?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  standard: string;
  registrationId: string;
  photo?: string;
}

interface StudentIDCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentCardData;
}

// Realistic Vector Barcode Generator
const BarcodeSVG: React.FC<{ value: string }> = ({ value }) => {
  const bars: { width: number; space: number }[] = [];
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    bars.push({
      width: (code % 3) + 1.4,
      space: ((code * 3) % 2) + 1.2,
    });
  }

  return (
    <div className="flex flex-col items-center">
      <svg className="w-full h-8" viewBox="0 0 160 30" preserveAspectRatio="none">
        <rect width="160" height="30" fill="white" />
        <rect x="6" y="2" width="2" height="26" fill="#111827" />
        <rect x="10" y="2" width="1.5" height="26" fill="#111827" />
        {bars.map((b, idx) => {
          const xPos = 16 + idx * 11;
          return (
            <React.Fragment key={idx}>
              <rect x={xPos} y="2" width={b.width} height="26" fill="#111827" />
              <rect
                x={xPos + b.width + b.space}
                y="2"
                width={Math.max(1, 3.8 - b.width)}
                height="26"
                fill="#111827"
              />
            </React.Fragment>
          );
        })}
        <rect x="148" y="2" width="1.5" height="26" fill="#111827" />
        <rect x="152" y="2" width="2" height="26" fill="#111827" />
      </svg>
      <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-700 font-bold -mt-0.5">
        *{value}*
      </span>
    </div>
  );
};

const StudentIDCardModal: React.FC<StudentIDCardModalProps> = ({
  isOpen,
  onClose,
  student
}) => {
  const [viewSide, setViewSide] = useState<'both' | 'front' | 'back'>('both');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (!student) return;
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://raventutorials.com';
      const qrData = `${baseUrl}/verify/student?regId=${encodeURIComponent(student.registrationId)}&name=${encodeURIComponent(student.studentName)}&class=${encodeURIComponent(student.standard)}`;

      QRCode.toDataURL(qrData, {
        width: 300,
        margin: 1,
        color: {
          dark: '#0a0d18',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error('Failed to generate real QR code:', err));
    } catch (e) {
      console.error('QR code error:', e);
    }
  }, [student]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !student) return null;

  const handlePrint = () => {
    // Print triggers isolated media print rules
    window.print();
  };

  return (
    <>
      {/* ── PRINT MEDIA STYLESHEET (CRITICAL: ISOLATES ID CARD FROM DASHBOARD PAGE) ── */}
      <style jsx global>{`
        @media print {
          /* Hide EVERYTHING on the entire webpage */
          body * {
            visibility: hidden !important;
          }

          /* Force background graphics to print in vibrant color */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Show ONLY the designated printable ID card container */
          #printable-student-id-card,
          #printable-student-id-card * {
            visibility: visible !important;
          }

          /* Position ID card centered on physical paper */
          #printable-student-id-card {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            right: 0 !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: flex-start !important;
            gap: 20px !important;
            padding: 15mm 0 !important;
            margin: 0 auto !important;
            background: #ffffff !important;
            box-shadow: none !important;
          }

          .no-print,
          .no-print * {
            display: none !important;
            visibility: hidden !important;
          }

          @page {
            size: A4 portrait;
            margin: 8mm;
          }
        }
      `}</style>

      {/* Modal Backdrop (Screen only) */}
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 no-print animate-fade-in">
        <div
          className="relative w-full max-w-4xl bg-[#090b14] border border-white/15 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(16,185,129,0.15)] overflow-hidden text-white my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header Bar */}
          <div className="px-5 sm:px-7 py-4 border-b border-white/10 flex items-center justify-between bg-[#0e1220]/90 backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-[#059669] to-[#10b981] text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black font-outfit text-white tracking-tight flex items-center gap-2">
                  <span>Official Student ID Card</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-space font-bold uppercase">
                    Verified
                  </span>
                </h2>
                <p className="text-xs text-zinc-400 font-jakarta">
                  High-DPI PVC format for Raven Tutorials Patna Campus
                </p>
              </div>
            </div>

            {/* Actions: View Switcher & Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* View side pills */}
              <div className="hidden sm:inline-flex p-1 bg-[#141829] border border-white/10 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setViewSide('both')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewSide === 'both' ? 'bg-[#10b981] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Both Sides
                </button>
                <button
                  onClick={() => setViewSide('front')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewSide === 'front' ? 'bg-[#10b981] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setViewSide('back')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewSide === 'back' ? 'bg-[#10b981] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Back
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer border border-white/10"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Preview Body */}
          <div className="p-5 sm:p-8 overflow-y-auto max-h-[75vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#090b14] via-[#0d101c] to-[#070810]">
            
            {/* Instructional banner */}
            <div className="w-full max-w-2xl mb-6 p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs text-zinc-300 font-jakarta no-print">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6ee7b7] flex-shrink-0" />
                <span>Ready for PVC Print or laminated badge output (300 DPI Standard CR80 Size).</span>
              </span>
              <span className="font-mono text-zinc-400 hidden md:inline">ID: {student.registrationId}</span>
            </div>

            {/* ── THE PRINTABLE CONTAINER (Rendered both on screen and in print) ── */}
            <div
              id="printable-student-id-card"
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
            >
              {/* ──────────────── FRONT SIDE OF THE CARD ──────────────── */}
              {(viewSide === 'both' || viewSide === 'front') && (
                <div className="w-[320px] sm:w-[340px] h-[520px] rounded-2xl bg-white text-zinc-900 shadow-[0_20px_45px_rgba(0,0,0,0.6)] border-2 border-zinc-200 overflow-hidden flex flex-col relative flex-shrink-0 transition-transform duration-300">
                  
                  {/* Top Lanyard Clip Hole */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                    <div className="w-12 h-3.5 rounded-full bg-zinc-800 border-2 border-zinc-300 shadow-inner flex items-center justify-center">
                      <div className="w-8 h-1 rounded-full bg-zinc-950" />
                    </div>
                  </div>

                  {/* Top Institute Header Banner */}
                  <div className="pt-6 pb-3 px-4 bg-gradient-to-r from-[#111625] via-[#1a2035] to-[#111625] text-white text-center relative border-b-2 border-[#10b981]">
                    {/* Glowing highlight line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#059669] via-[#f59e0b] to-[#10b981]" />
                    
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="p-1 rounded-lg bg-white/10 border border-white/20">
                        <Image
                          src="/logo.png"
                          alt="Raven Logo"
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="font-black font-outfit text-base tracking-wider text-white uppercase leading-none">
                          RAVEN <span className="text-[#34d399]">TUTORIALS</span>
                        </h3>
                        <p className="text-[9px] font-space text-zinc-300 tracking-wider uppercase font-bold">
                          Patna Campus • Academy of Sciences
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 py-0.5 px-3 rounded-full bg-[#10b981] text-white inline-block shadow-sm">
                      <span className="font-extrabold font-space uppercase text-[10px] tracking-widest">
                        STUDENT IDENTITY CARD
                      </span>
                    </div>
                  </div>

                  {/* Body: Photo & Name */}
                  <div className="p-4 flex-1 flex flex-col items-center bg-gradient-to-b from-white via-zinc-50 to-zinc-100">
                    
                    {/* Student Photo */}
                    <div className="relative mt-1 mb-2">
                      <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl border-2 border-[#10b981] p-1 bg-white shadow-md overflow-hidden flex items-center justify-center">
                        {student.photo ? (
                          <img
                            src={student.photo}
                            alt={student.studentName}
                            className="w-full h-full object-cover object-top rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-[#6ee7b7] font-black text-3xl font-outfit rounded-lg">
                            <span>{student.studentName.charAt(0)}</span>
                          </div>
                        )}
                      </div>

                      {/* Verified Badge Tag */}
                      <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-emerald-600 border border-white text-white text-[9px] font-bold font-space uppercase shadow-sm flex items-center gap-0.5">
                        <CheckCircle className="w-2.5 h-2.5 stroke-[3]" />
                        <span>ACTIVE</span>
                      </div>
                    </div>

                    {/* Student Name */}
                    <div className="text-center mt-1 mb-3">
                      <h4 className="font-black font-outfit text-base sm:text-lg text-zinc-900 uppercase tracking-tight leading-tight">
                        {student.studentName}
                      </h4>
                      <div className="inline-block px-3 py-0.5 rounded-md bg-[#111625] text-[#6ee7b7] font-mono text-[11px] font-extrabold mt-1">
                        CLASS {student.standard} • REG: {student.registrationId}
                      </div>
                    </div>

                    {/* Details Table */}
                    <div className="w-full bg-white rounded-xl border border-zinc-200 p-2.5 shadow-sm space-y-1 text-xs">
                      <div className="flex justify-between items-center py-0.5 border-b border-zinc-100 text-[11px]">
                        <span className="text-zinc-500 font-semibold uppercase text-[10px] font-space">Father&apos;s Name</span>
                        <span className="font-bold text-zinc-900 truncate max-w-[170px] text-right">
                          {student.fatherName || 'Guardian'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-0.5 border-b border-zinc-100 text-[11px]">
                        <span className="text-zinc-500 font-semibold uppercase text-[10px] font-space">Blood Group</span>
                        <span className="font-bold text-rose-600 font-mono">
                          {student.bloodGroup || 'O+'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-0.5 border-b border-zinc-100 text-[11px]">
                        <span className="text-zinc-500 font-semibold uppercase text-[10px] font-space">Contact</span>
                        <span className="font-bold text-zinc-900 font-mono">
                          {student.phoneNumber || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-0.5 text-[11px]">
                        <span className="text-zinc-500 font-semibold uppercase text-[10px] font-space">Valid Session</span>
                        <span className="font-extrabold text-emerald-700 font-mono">
                          2026 - 2027
                        </span>
                      </div>
                    </div>

                    {/* Barcode, Real Mini QR & Signature Footer */}
                    <div className="w-full mt-auto pt-2 flex items-center justify-between border-t border-zinc-200 gap-1.5">
                      <div className="w-[140px]">
                        <BarcodeSVG value={student.registrationId} />
                      </div>

                      {/* Original Real Scannable QR Code on Front */}
                      {qrCodeUrl && (
                        <div className="flex flex-col items-center flex-shrink-0" title="Original Scannable QR Code">
                          <img
                            src={qrCodeUrl}
                            alt="Original Student QR"
                            className="w-10 h-10 object-contain rounded border border-zinc-300 bg-white p-0.5 shadow-sm"
                          />
                          <span className="text-[6px] font-mono font-bold text-emerald-700 tracking-tighter mt-0.5">
                            VERIFY
                          </span>
                        </div>
                      )}

                      {/* Official Signature */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="h-6 flex items-end">
                          <span className="font-serif italic text-xs font-black text-indigo-900 tracking-wider transform -rotate-3 select-none">
                            A.K. Sharma
                          </span>
                        </div>
                        <span className="text-[7px] font-space font-bold uppercase text-zinc-500 border-t border-zinc-400 pt-0.5">
                          Registrar
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Card Bottom Strip */}
                  <div className="py-1 px-3 bg-[#111625] text-white text-[8px] font-space uppercase font-bold text-center tracking-wider">
                    Boring Road Crossing, Patna, Bihar • +91 98765 43210
                  </div>
                </div>
              )}

              {/* ──────────────── BACK SIDE OF THE CARD ──────────────── */}
              {(viewSide === 'both' || viewSide === 'back') && (
                <div className="w-[320px] sm:w-[340px] h-[520px] rounded-2xl bg-white text-zinc-900 shadow-[0_20px_45px_rgba(0,0,0,0.6)] border-2 border-zinc-200 overflow-hidden flex flex-col relative flex-shrink-0 transition-transform duration-300">
                  
                  {/* Top Lanyard Clip Hole */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                    <div className="w-12 h-3.5 rounded-full bg-zinc-800 border-2 border-zinc-300 shadow-inner flex items-center justify-center">
                      <div className="w-8 h-1 rounded-full bg-zinc-950" />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="pt-6 pb-2 px-4 bg-[#111625] text-white text-center border-b-2 border-[#10b981]">
                    <h4 className="font-black font-outfit text-sm tracking-wider uppercase text-white">
                      STUDENT CARD REGULATIONS
                    </h4>
                    <p className="text-[9px] font-space text-zinc-300 uppercase">
                      Terms of Campus Access & Security
                    </p>
                  </div>

                  {/* Terms & Conditions Body */}
                  <div className="p-4 flex-1 flex flex-col bg-gradient-to-b from-white via-zinc-50 to-zinc-100 text-zinc-700 text-[10px] leading-relaxed">
                    
                    <div className="space-y-1.5 font-jakarta">
                      <div className="flex gap-2 items-start">
                        <span className="font-black text-[#10b981]">1.</span>
                        <span>This card is the property of <strong>Raven Tutorials</strong> and must be worn or produced upon request within campus premises.</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="font-black text-[#10b981]">2.</span>
                        <span>Mandatory for entering lecture halls, library, computer centers, and competitive mock test series.</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="font-black text-[#10b981]">3.</span>
                        <span>This identity card is <strong>strictly non-transferable</strong>. Misuse will lead to immediate disciplinary action.</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="font-black text-[#10b981]">4.</span>
                        <span>In case of damage or loss, notify the campus office immediately. Duplicate card issuance charge is ₹150.</span>
                      </div>
                    </div>

                    {/* Student Residence & Emergency Contact Block */}
                    <div className="mt-3 p-2.5 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-1">
                      <p className="text-[9px] font-space font-bold uppercase text-zinc-400">
                        Residential Address & Contact
                      </p>
                      <p className="font-bold text-zinc-800 text-[11px] leading-snug">
                        {student.address ? `${student.address}, ${student.city || 'Patna'}` : 'Patna Campus, Bihar - 800001'}
                      </p>
                      <p className="text-[10px] text-zinc-600 font-mono pt-0.5">
                        Emergency Contact: <span className="font-bold text-zinc-900">{student.phoneNumber}</span>
                      </p>
                    </div>

                    {/* QR Code & Official Stamp Section */}
                    <div className="mt-auto pt-3 flex items-center justify-between border-t border-zinc-200">
                      <div className="flex flex-col items-center">
                        {qrCodeUrl ? (
                          <img
                            src={qrCodeUrl}
                            alt="Original Scannable Student QR Code"
                            className="w-[74px] h-[74px] object-contain rounded-md border border-zinc-300 bg-white p-1 shadow-sm"
                          />
                        ) : (
                          <div className="w-[74px] h-[74px] bg-zinc-100 rounded-md animate-pulse flex items-center justify-center text-[8px] text-zinc-400 font-mono">
                            Generating...
                          </div>
                        )}
                        <span className="text-[8px] font-mono text-emerald-700 font-extrabold block text-center mt-1 tracking-wider">
                          SCAN TO VERIFY
                        </span>
                      </div>

                      {/* Official Round Institutional Stamp */}
                      <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-indigo-900/70 p-1 flex flex-col items-center justify-center text-center rotate-[-8deg] opacity-90 shadow-sm">
                        <span className="text-[7px] font-black uppercase text-indigo-900 font-outfit tracking-tighter">
                          RAVEN TUTORIALS
                        </span>
                        <div className="my-0.5 px-1 bg-indigo-900 text-white rounded text-[6px] font-black tracking-widest uppercase">
                          VERIFIED
                        </div>
                        <span className="text-[6px] font-bold text-indigo-950 font-space tracking-tight uppercase">
                          PATNA CAMPUS
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Back Bottom Disclaimer */}
                  <div className="py-1 px-3 bg-[#111625] text-white text-[8px] font-space uppercase font-bold text-center tracking-wider">
                    If found, please return to Raven Tutorials, Boring Road, Patna
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Modal Footer Controls */}
          <div className="px-5 sm:px-7 py-4 border-t border-white/10 bg-[#0e1220] flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="text-xs text-zinc-400 font-jakarta flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Printer Format: Auto-detects color & PVC badge margins</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl border border-white/10 font-bold font-outfit text-xs transition cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={handlePrint}
                className="px-6 py-2.5 bg-gradient-to-r from-[#059669] to-[#10b981] hover:from-[#ff7a4f] hover:to-[#059669] text-white font-black font-outfit text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer border border-white/20"
              >
                <Printer className="w-4 h-4" />
                <span>Print Student ID Card</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentIDCardModal;
