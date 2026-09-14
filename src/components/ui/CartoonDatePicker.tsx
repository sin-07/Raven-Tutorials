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
  const isClosingRef = useRef(false);

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
    if (disabled || isOpen) return;
    setMode('days');
    setIsOpen(true);
    isClosingRef.current = false;
  }, [disabled, isOpen]);

  // Close calendar with GSAP animation
  const closeCalendar = useCallback(() => {
    if (!popupRef.current || !isOpen || isClosingRef.current) {
      setIsOpen(false);
      return;
    }
    isClosingRef.current = true;

    gsap.to(popupRef.current, {
      opacity: 0,
      scale: 0.94,
      y: -6,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setIsOpen(false);
        isClosingRef.current = false;
      },
    });
  }, [isOpen]);

  // Animate popup on open
  useEffect(() => {
    if (isOpen && popupRef.current) {
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
          duration: 0.25,
          ease: 'back.out(2)',
        }
      );

      if (gridRef.current) {
        const days = gridRef.current.children;
        if (days.length > 0) {
          gsap.fromTo(
            days,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              stagger: 0.01,
              duration: 0.2,
              ease: 'power1.out',
            }
          );
        }
      }
    }
  }, [isOpen]);

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

  // Navigation handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
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
        onClick={() => (isOpen ? closeCalendar() : openCalendar())}
        className={`w-full px-4 py-3 bg-white border-2 text-left rounded-xl font-jakarta font-medium text-sm sm:text-base flex items-center justify-between shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-black transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
        } ${
          error
            ? 'border-rose-500 bg-rose-50/70 text-rose-950'
            : 'border-black text-black'
        }`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 truncate">
          <div className="p-1 rounded-md bg-emerald-200 border border-black flex items-center justify-center flex-shrink-0">
            <CalendarIcon className="w-4 h-4 text-black" />
          </div>
          <span className={value ? 'text-black font-black font-outfit' : 'text-neutral-400 font-medium'}>
            {getDisplayText() || placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
          {value && !disabled && (
            <span
              onClick={handleClear}
              className="p-1 rounded-md hover:bg-rose-200 border border-transparent hover:border-black transition-colors"
              title="Clear date"
            >
              <X className="w-3.5 h-3.5 text-neutral-600 hover:text-black" />
            </span>
          )}
          <span className="text-[10px] font-space font-black px-1.5 py-0.5 rounded bg-[#dcfce7] border border-black text-black">
            DATE
          </span>
        </div>
      </button>

      {/* GSAP Animated Cartoon Calendar Popup */}
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute left-0 right-0 sm:right-auto sm:w-80 top-full mt-2 z-[9999] bg-[#f0fdf4] border-3 border-black rounded-3xl shadow-[8px_8px_0px_#000] p-4 text-black"
        >
          {/* Header Navigation */}
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b-2 border-black/15">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-xl bg-white hover:bg-[#dcfce7] border-2 border-black shadow-[1.5px_1.5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4 text-black" />
            </button>

            {/* Month & Year Selectors */}
            <div className="flex items-center gap-1.5 font-outfit font-black text-sm">
              <button
                type="button"
                onClick={() => setMode(mode === 'months' ? 'days' : 'months')}
                className={`px-2.5 py-1 rounded-lg border border-black shadow-[1px_1px_0px_#000] transition active:translate-x-0.5 ${
                  mode === 'months' ? 'bg-emerald-400 text-black' : 'bg-white hover:bg-[#dcfce7]'
                }`}
              >
                {MONTH_NAMES[viewMonth]}
              </button>

              <button
                type="button"
                onClick={() => setMode(mode === 'years' ? 'days' : 'years')}
                className={`px-2.5 py-1 rounded-lg border border-black shadow-[1px_1px_0px_#000] transition active:translate-x-0.5 ${
                  mode === 'years' ? 'bg-emerald-400 text-black' : 'bg-white hover:bg-[#dcfce7]'
                }`}
              >
                {viewYear}
              </button>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-xl bg-white hover:bg-[#dcfce7] border-2 border-black shadow-[1.5px_1.5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4 text-black" />
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
                  className={`py-2 px-1 rounded-xl text-xs font-bold font-outfit border-2 border-black transition shadow-[1.5px_1.5px_0px_#000] active:translate-x-0.5 ${
                    viewMonth === idx
                      ? 'bg-emerald-400 text-black'
                      : 'bg-white text-black hover:bg-[#dcfce7]'
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
                  className={`py-1.5 px-1 rounded-xl text-xs font-bold font-space border border-black transition shadow-[1px_1px_0px_#000] active:translate-x-0.5 ${
                    viewYear === yr
                      ? 'bg-emerald-400 text-black font-black'
                      : 'bg-white text-black hover:bg-[#dcfce7]'
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
                    className="text-[11px] font-black font-space text-neutral-600 uppercase py-0.5"
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
                      className={`h-8 rounded-xl font-outfit text-xs font-bold flex items-center justify-center border transition-all active:translate-x-0.5 active:translate-y-0.5 ${
                        isSelected
                          ? 'bg-emerald-400 text-black border-2 border-black shadow-[2px_2px_0px_#000] font-black scale-105 z-10'
                          : 'bg-white text-black border-black/30 hover:border-black hover:bg-[#dcfce7] hover:shadow-[1.5px_1.5px_0px_#000]'
                      }`}
                    >
                      {dayNumber}
                    </button>
                  );
                })}
              </div>

              {/* Footer Quick Actions */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t-2 border-black/15 text-xs font-bold font-outfit">
                <button
                  type="button"
                  onClick={handleSetToday}
                  className="px-3 py-1 bg-white hover:bg-[#dcfce7] rounded-lg border border-black shadow-[1px_1px_0px_#000] active:translate-x-0.5"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={closeCalendar}
                  className="px-3 py-1 bg-emerald-300 hover:bg-emerald-400 text-black rounded-lg border border-black shadow-[1px_1px_0px_#000] active:translate-x-0.5"
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
