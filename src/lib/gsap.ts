/**
 * GSAP Setup & Utilities (Zero-Lag Performance Mode)
 * All heavy scroll observers, continuous loops, mousemove tilt listeners,
 * and delayed layout animations are neutralized for instantaneous 120 FPS rendering.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Observer and Draggable use ts-ignore due to known GSAP Windows casing issue
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Observer } from 'gsap/Observer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Draggable } from 'gsap/Draggable';

// Register all plugins (client-side only)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, Observer, Draggable, MotionPathPlugin);
}

export { gsap, ScrollTrigger, TextPlugin, Observer, Draggable, MotionPathPlugin };

// ─── CORE (Instant Visibility, 0 Delay) ──────────────────────────────────────

export const fadeUp = (el: Element | string | null, _delay = 0, _duration = 0.8) => {
  if (!el) return;
  return gsap.set(el, { opacity: 1, y: 0, clearProps: 'all' });
};

export const fadeIn = (el: Element | string | null, _delay = 0, _duration = 0.6) => {
  if (!el) return;
  return gsap.set(el, { opacity: 1, clearProps: 'all' });
};

export const scaleIn = (el: Element | string | null, _delay = 0, _duration = 0.7) => {
  if (!el) return;
  return gsap.set(el, { opacity: 1, scale: 1, clearProps: 'all' });
};

export const staggerFadeUp = (parent: Element | null, childSelector: string, _stagger = 0.12, _delay = 0) => {
  if (!parent) return;
  const children = parent.querySelectorAll(childSelector);
  if (!children.length) return;
  return gsap.set(children, { opacity: 1, y: 0, clearProps: 'all' });
};

export const animateSplitText = (el: Element | null, _delay = 0, _duration = 0.7) => {
  if (!el) return;
  return gsap.set(el, { opacity: 1, y: 0, clearProps: 'all' });
};

export const animateWavyText = (el: Element | null, _continuous = true) => {
  if (!el) return;
  const chars = el.querySelectorAll('.wavy-char');
  if (chars.length) {
    return gsap.set(chars, { opacity: 1, y: 0, rotateZ: 0, clearProps: 'all' });
  }
  return gsap.set(el, { opacity: 1, y: 0, clearProps: 'all' });
};

export const animateSplitWords = (el: Element | null, _delay = 0, _duration = 0.6) => {
  if (!el) return;
  return gsap.set(el, { opacity: 1, y: 0, clearProps: 'all' });
};

export const typewriterEffect = (el: Element | null, text: string, _delay = 0, _duration = 2) => {
  if (!el) return;
  el.textContent = text;
  return null;
};

// ─── SCROLL (No ScrollTriggers Registered for Instant Scroll) ─────────────────

export const scrollFadeUp = (
  el: Element | null,
  _options: Partial<gsap.TweenVars & { start?: string }> = {}
) => {
  if (!el) return;
  return gsap.set(el, { opacity: 1, y: 0, clearProps: 'all' });
};

export const scrollStagger = (
  els: NodeListOf<Element> | Element[],
  _stagger = 0.1,
  _options: Partial<gsap.TweenVars & { start?: string }> = {}
) => {
  if (!els || !els.length) return;
  const arr = Array.from(els);
  return gsap.set(arr, { opacity: 1, y: 0, clearProps: 'all' });
};

export const animateCounter = (el: Element | null, endValue: number, suffix = '') => {
  if (!el) return;
  el.textContent = endValue + suffix;
  return null;
};

export const parallax = (_el: Element | null, _yPercent = 30) => {
  return null;
};

// ─── SVG ────────────────────────────────────────────────────────────────────

export const drawSVGPath = (pathEl: SVGPathElement | null, _delay = 0) => {
  if (!pathEl) return;
  return gsap.set(pathEl, { strokeDashoffset: 0, clearProps: 'all' });
};

export const floatLoop = (el: Element | null, _amplitude = 15, _duration = 3) => {
  if (!el) return;
  return gsap.set(el, { y: 0, clearProps: 'all' });
};

export const drawBorder = (el: Element | null, _delay = 0) => {
  if (!el) return;
  return gsap.set(el, { opacity: 1, strokeDashoffset: 0, clearProps: 'all' });
};

// ─── UI (No MouseMove Listeners for 0 Input Lag) ─────────────────────────────

export const magneticHover = (
  _containerEl: HTMLElement | null,
  _innerEl: HTMLElement | null,
  _strength = 0.3
) => {
  return () => {};
};

export const cardTilt = (_el: HTMLElement | null) => {
  return () => {};
};

export const revealNavOnScroll = (navEl: HTMLElement | null) => {
  if (!navEl) return;
  gsap.set(navEl, { y: 0, clearProps: 'all' });
  return null;
};

export const makeDraggable = (
  el: string | Element,
  type: 'x' | 'y' = 'x',
  bounds?: Element | string
) => {
  return Draggable.create(el, {
    type,
    bounds,
    inertia: false,
  });
};
