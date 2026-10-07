'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gsap } from 'gsap';

export interface CartoonDatePickerProps {
  name?: string;
  value?: string; // Format: 'YYYY-MM-DD'
  onChange?: (e: any) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  required?: boolean;
  minYear?: number;
  maxYear?: number;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const CartoonDatePicker: React.FC<CartoonDatePickerProps> = ({
  name = '',
  value = '',
  onChange,
  placeholder = 'Select Date of Birth (YYYY-MM-DD)',
  error = false,
  disabled = false,
  className = '',
  id,
  required = false,
  minYear = 1990,
  maxYear = new Date().getFullYear(),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isClosingRef = useRef(false);

  // Cleanup tweens on unmount
  useEffect(() => {
    return () => {
      if (popupRef.current) gsap.killTweensOf(popupRef.current);
    };
  }, []);

  // Parse current value or default to a sensible birthdate (~15 years ago)
  const initialDate = value ? new Date(value) : new Date(new Date().getFullYear() - 15, 0, 1);
  const [viewYear, setViewYear] = useState<number>(
    isNaN(initialDate.getFullYear()) ? new Date().getFullYear() - 15 : initialDate.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState<number>(
    isNaN(initialDate.getMonth()) ? 0 : initialDate.getMonth()
  );

  const [mode, setMode] = useState<'days' | 'months' | 'years'>('days');

  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // When value changes externally, update view
  useEffect(() => {
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        if (!isNaN(y) && !isNaN(m)) {
          setViewYear(y);
          setViewMonth(m);
        }
      }
    }
  }, [value]);

  // Open calendar with GSAP animation
  const openCalendar = useCallback(() => {
    if (disabled) return;
    setMode('days');
    isClosingRef.current = false;
    setIsMounted(true);
    setIsOpen(true);
  }, [disabled]);

  // Close calendar with GSAP animation
  const closeCalendar = useCallback(() => {
    if (!popupRef.current || !isOpen || isClosingRef.current) {
      setIsOpen(false);
      setIsMounted(false);
      return;
    }
    isClosingRef.current = true;

    gsap.killTweensOf(popupRef.current);
    gsap.to(popupRef.current, {
      opacity: 0,
      scale: 0.93,
      y: -8,
      duration: 0.18,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: () => {
        setIsOpen(false);
        setIsMounted(false);
        isClosingRef.current = false;
      },
    });
  }, [isOpen]);

  // Animate popup on open
  useEffect(() => {
    if (isOpen && isMounted && popupRef.current) {
      gsap.killTweensOf(popupRef.current);
      gsap.fromTo(
        popupRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: -10,
          transformOrigin: 'top center',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.28,
          ease: 'back.out(1.8)',
          overwrite: 'auto',
          clearProps: 'willChange',
        }
      );

      if (gridRef.current) {
        const days = gridRef.current.children;
        if (days.length > 0) {
          gsap.killTweensOf(days);
          gsap.fromTo(
            days,
            { opacity: 0, scale: 0.85, y: -4 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.008,
              duration: 0.2,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              overwrite: 'auto',
            }
          );
        }
      }
    }
  }, [isOpen, isMounted]);

  // Animate grid when viewMonth or viewYear changes
  useEffect(() => {
    if (isOpen && gridRef.current && mode === 'days') {
      const days = gridRef.current.children;
      if (days.length > 0) {
        gsap.fromTo(
          days,
          { opacity: 0, scale: 0.88 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.008,
            duration: 0.18,
            ease: 'power1.out',
          }
        );
      }
    }
  }, [viewMonth, viewYear, mode, isOpen]);

  // Close on outside click or Escape
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeCalendar();
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCalendar();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutside);
      document.addEventListener('keydown', handleKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, closeCalendar]);

  // Navigation handlers with smooth directional slide
  const handlePrevMonth = () => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current, { x: 10, opacity: 0.7 }, { x: 0, opacity: 1, duration: 0.22, ease: 'power2.out' });
    }
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current, { x: -10, opacity: 0.7 }, { x: 0, opacity: 1, duration: 0.22, ease: 'power2.out' });
    }
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDaySelect = (day: number) => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const formatted = `${viewYear}-${mm}-${dd}`;

    if (typeof onChange === 'function') {
      onChange({ target: { name, value: formatted } });
    }
    closeCalendar();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof onChange === 'function') {
      onChange({ target: { name, value: '' } });
    }
  };

  const handleSetToday = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    setViewYear(y);
    setViewMonth(m);
    handleDaySelect(d);
  };

  // Calendar math
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  // Selected date parts
  let selectedYear: number | null = null;
  let selectedMonth: number | null = null;
  let selectedDay: number | null = null;

  if (value) {
    const parts = value.split('-');
    if (parts.length === 3) {
      selectedYear = parseInt(parts[0], 10);
      selectedMonth = parseInt(parts[1], 10) - 1;
      selectedDay = parseInt(parts[2], 10);
    }
  }

  // Display text formatted nicely (e.g. "18 Dec 2007")
  const getDisplayText = () => {
    if (!value || selectedDay === null || selectedMonth === null || selectedYear === null) {
      return '';
    }
    return `${selectedDay} ${MONTH_NAMES[selectedMonth].slice(0, 3)} ${selectedYear}`;
  };

  // Generate list of years for quick picking
  const yearsList = [];
  for (let y = maxYear; y >= minYear; y--) {
    yearsList.push(y);
  }

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full select-none ${className}`}
    >
      {/* Hidden input for standard form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
        />
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          if (isOpen && !isClosingRef.current) {
            closeCalendar();
          } else {
            openCalendar();
          }
        }}
        className={`w-full px-4 py-3 bg-[#121522] border border-white/15 text-left rounded-xl font-jakarta font-medium text-sm sm:text-base flex items-center justify-between hover:border-[#10b981]/60 focus:outline-none focus:ring-2 focus:ring-[#10b981] transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${
          error
            ? 'border-rose-500/80 bg-rose-950/20 text-rose-300'
            : 'text-white'
        }`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 truncate">
          <div className="p-1 rounded-md bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center flex-shrink-0 text-[#34d399]">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <span className={value ? 'text-white font-medium font-outfit' : 'text-zinc-500 font-medium'}>
            {getDisplayText() || placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
          {value && !disabled && (
            <span
              onClick={handleClear}
              className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Clear date"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <span className="text-[10px] font-space font-black px-1.5 py-0.5 rounded bg-[#10b981]/15 border border-[#10b981]/30 text-[#34d399]">
            DATE
          </span>
        </div>
      </button>

      {/* GSAP Animated Cartoon Calendar Popup with initial zero-flash styling */}
      {(isOpen || isMounted) && (
        <div
          ref={popupRef}
          style={{
            opacity: 0,
            transform: 'scale(0.9) translateY(-10px)',
            transformOrigin: 'top center',
            willChange: 'transform, opacity',
          }}
          className="absolute left-0 right-0 sm:right-auto sm:w-80 top-full mt-2 z-[9999] bg-[#0c0e17] border border-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.15)] p-4 text-white backdrop-blur-xl"
        >
          {/* Header Navigation */}
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-xl bg-[#121522] hover:bg-white/10 border border-white/15 text-white transition cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Month & Year Selectors */}
            <div className="flex items-center gap-1.5 font-outfit font-bold text-sm">
              <button
                type="button"
                onClick={() => setMode(mode === 'months' ? 'days' : 'months')}
                className={`px-2.5 py-1 rounded-lg border border-white/15 transition cursor-pointer ${
                  mode === 'months' ? 'bg-[#10b981] text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-[#121522] hover:bg-white/10 text-white'
                }`}
              >
                {MONTH_NAMES[viewMonth]}
              </button>

              <button
                type="button"
                onClick={() => setMode(mode === 'years' ? 'days' : 'years')}
                className={`px-2.5 py-1 rounded-lg border border-white/15 transition cursor-pointer ${
                  mode === 'years' ? 'bg-[#10b981] text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-[#121522] hover:bg-white/10 text-white'
                }`}
              >
                {viewYear}
              </button>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-xl bg-[#121522] hover:bg-white/10 border border-white/15 text-white transition cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Month Quick Picker Mode */}
          {mode === 'months' && (
            <div className="grid grid-cols-3 gap-2 py-2 max-h-56 overflow-y-auto">
              {MONTH_NAMES.map((mName, idx) => (
                <button
                  key={mName}
                  type="button"
                  onClick={() => {
                    setViewMonth(idx);
                    setMode('days');
                  }}
                  className={`py-2 px-1 rounded-xl text-xs font-bold font-outfit border border-white/10 transition cursor-pointer ${
                    viewMonth === idx
                      ? 'bg-[#10b981] text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                      : 'bg-[#121522] text-zinc-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {mName.slice(0, 3)}
                </button>
              ))}
            </div>
          )}

          {/* Year Quick Picker Mode */}
          {mode === 'years' && (
            <div className="grid grid-cols-4 gap-1.5 py-2 max-h-56 overflow-y-auto pr-1">
              {yearsList.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => {
                    setViewYear(yr);
                    setMode('days');
                  }}
                  className={`py-1.5 px-1 rounded-xl text-xs font-bold font-space border border-white/10 transition cursor-pointer ${
                    viewYear === yr
                      ? 'bg-[#10b981] text-white font-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                      : 'bg-[#121522] text-zinc-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          )}

          {/* Days Calendar Mode */}
          {mode === 'days' && (
            <>
              {/* Day names header */}
              <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                {DAYS_OF_WEEK.map((d) => (
                  <span
                    key={d}
                    className="text-[11px] font-bold font-space text-zinc-500 uppercase py-0.5"
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div ref={gridRef} className="grid grid-cols-7 gap-1">
                {/* Empty leading cells */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-8" />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNumber = i + 1;
                  const isSelected =
                    selectedYear === viewYear &&
                    selectedMonth === viewMonth &&
                    selectedDay === dayNumber;

                  return (
                    <button
                      key={dayNumber}
                      type="button"
                      onClick={() => handleDaySelect(dayNumber)}
                      className={`h-8 rounded-xl font-outfit text-xs font-semibold flex items-center justify-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#10b981] text-white border-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)] font-bold scale-105 z-10'
                          : 'bg-transparent text-zinc-300 border-transparent hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {dayNumber}
                    </button>
                  );
                })}
              </div>

              {/* Footer Quick Actions */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-xs font-bold font-outfit">
                <button
                  type="button"
                  onClick={handleSetToday}
                  className="px-3 py-1 bg-[#121522] hover:bg-white/10 text-zinc-300 rounded-lg border border-white/15 transition cursor-pointer"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={closeCalendar}
                  className="btn-sheryians px-3 py-1 text-white rounded-lg transition cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartoonDatePicker;
