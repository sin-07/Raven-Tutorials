'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { gsap } from 'gsap';

export interface DropdownOption {
  label: string;
  value: string;
  badge?: string;
}

export interface CartoonDropdownProps {
  name?: string;
  value?: string;
  onChange?: (e: any) => void;
  options: readonly (DropdownOption | string)[];
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  size?: 'sm' | 'md';
  id?: string;
  required?: boolean;
}

export const CartoonDropdown: React.FC<CartoonDropdownProps> = ({
  name = '',
  value = '',
  onChange,
  options = [],
  placeholder = 'Select an option',
  error = false,
  disabled = false,
  className = '',
  buttonClassName = '',
  size = 'md',
  id,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  // Normalize options into DropdownOption format
  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Cleanup tweens on unmount
  useEffect(() => {
    return () => {
      if (menuRef.current) gsap.killTweensOf(menuRef.current);
      if (chevronRef.current) gsap.killTweensOf(chevronRef.current);
    };
  }, []);

  // Trigger GSAP open animation
  const openDropdown = useCallback(() => {
    if (disabled) return;
    isClosingRef.current = false;
    setIsMounted(true);
    setIsOpen(true);
  }, [disabled]);

  // Trigger GSAP close animation
  const closeDropdown = useCallback(() => {
    if (!menuRef.current || !isOpen || isClosingRef.current) {
      setIsOpen(false);
      setIsMounted(false);
      return;
    }
    isClosingRef.current = true;

    // Smooth chevron rotation back to 0
    if (chevronRef.current) {
      gsap.killTweensOf(chevronRef.current);
      gsap.to(chevronRef.current, {
        rotation: 0,
        duration: 0.22,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Smooth menu panel exit
    gsap.killTweensOf(menuRef.current);
    gsap.to(menuRef.current, {
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

  // Animate on open state change
  useEffect(() => {
    if (isOpen && isMounted && menuRef.current) {
      // Animate chevron with playful overshoot
      if (chevronRef.current) {
        gsap.killTweensOf(chevronRef.current);
        gsap.to(chevronRef.current, {
          rotation: 180,
          duration: 0.28,
          ease: 'back.out(2.2)',
          overwrite: 'auto',
        });
      }

      // Animate dropdown panel with silky cartoon spring pop
      gsap.killTweensOf(menuRef.current);
      gsap.fromTo(
        menuRef.current,
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

      // Stagger animate options with subtle slide & cascade
      if (listRef.current) {
        const optionEls = listRef.current.children;
        if (optionEls.length > 0) {
          gsap.killTweensOf(optionEls);
          gsap.fromTo(
            optionEls,
            { opacity: 0, x: -8, scale: 0.96 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              stagger: 0.018,
              duration: 0.22,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              overwrite: 'auto',
            }
          );
        }
      }
    }
  }, [isOpen, isMounted]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeDropdown]);

  const handleSelect = (optValue: string) => {
    if (typeof onChange === 'function') {
      onChange({ target: { name, value: optValue } } as any);
    }
    closeDropdown();
  };

  const toggleDropdown = () => {
    if (disabled) return;
    if (isOpen && !isClosingRef.current) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full select-none ${className}`}
    >
      {/* Hidden native input for form submissions */}
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
        onClick={toggleDropdown}
        className={`w-full ${
          size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm sm:text-base'
        } bg-white border-2 text-left rounded-xl font-jakarta font-bold flex items-center justify-between shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-black transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:translate-x-0.5 active:translate-y-0.5'
        } ${
          error
            ? 'border-rose-500 bg-rose-50/70 text-rose-950'
            : 'border-black text-black'
        } ${buttonClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`truncate ${selectedOption ? 'text-black font-semibold' : 'text-neutral-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Chevron Icon - rotated purely via GSAP for buttery 60fps response */}
        <ChevronDown
          ref={chevronRef}
          className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} text-black flex-shrink-0 ml-2`}
        />
      </button>

      {/* Dropdown Menu Panel (GSAP Animated with initial zero-flash styling) */}
      {(isOpen || isMounted) && (
        <div
          ref={menuRef}
          style={{
            opacity: 0,
            transform: 'scale(0.9) translateY(-10px)',
            transformOrigin: 'top center',
            willChange: 'transform, opacity',
          }}
          className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#f0fdf4] border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000] overflow-hidden p-2"
        >
          <div
            ref={listRef}
            role="listbox"
            className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar"
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-outfit font-bold flex items-center justify-between cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-emerald-300 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-white text-black border-transparent hover:bg-[#dcfce7] hover:border-black hover:shadow-[1.5px_1.5px_0px_#000] hover:translate-x-0.5'
                  } active:translate-x-1 active:translate-y-0.5`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-md bg-emerald-400 border border-black flex items-center justify-center flex-shrink-0 ml-2">
                      <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartoonDropdown;
