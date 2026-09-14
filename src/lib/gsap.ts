/**
 * GSAP Directional Animation System (Left, Right, Up, Down)
 * Ultra-smooth, hardware-accelerated 60-120 FPS directional scroll animations.
 * Uses performant ScrollTrigger instances with `once: true` and automatic cleanup.
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

// Register plugins on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, Observer, Draggable, MotionPathPlugin);
}

export { gsap, ScrollTrigger, TextPlugin, Observer, Draggable, MotionPathPlugin };

// ─── 1. CORE DIRECTIONAL ENTRANCE ANIMATIONS ────────────────────────────────

export interface DirectionalAnimOptions {
  delay?: number;
  distance?: number;
  duration?: number;
}

const parseAnimParams = (
  optionsOrDelay: number | DirectionalAnimOptions = 0,
  defaultDistance = 50,
  defaultDuration = 0.75,
  posDistance?: number,
  posDuration?: number
) => {
  if (typeof optionsOrDelay === 'object' && optionsOrDelay !== null) {
    return {
      delay: optionsOrDelay.delay ?? 0,
      distance: optionsOrDelay.distance ?? defaultDistance,
      duration: optionsOrDelay.duration ?? defaultDuration,
    };
  }
  return {
    delay: typeof optionsOrDelay === 'number' ? optionsOrDelay : 0,
    distance: posDistance !== undefined && posDistance !== 50 && posDistance !== 45 ? posDistance : defaultDistance,
    duration: posDuration !== undefined && posDuration !== 0.75 ? posDuration : defaultDuration,
  };
};

/** Animate element smoothly in from the LEFT */
export const animateFromLeft = (
  el: Element | string | null,
  optionsOrDelay: number | DirectionalAnimOptions = 0,
  distance = 50,
  duration = 0.75
) => {
  if (!el || typeof window === 'undefined') return;
  const p = parseAnimParams(optionsOrDelay, 50, 0.75, distance, duration);
  return gsap.fromTo(
    el,
    { opacity: 0, x: -p.distance },
    { opacity: 1, x: 0, duration: p.duration, delay: p.delay, ease: 'power3.out', clearProps: 'transform,opacity' }
  );
};

/** Animate element smoothly in from the RIGHT */
export const animateFromRight = (
  el: Element | string | null,
  optionsOrDelay: number | DirectionalAnimOptions = 0,
  distance = 50,
  duration = 0.75
) => {
  if (!el || typeof window === 'undefined') return;
  const p = parseAnimParams(optionsOrDelay, 50, 0.75, distance, duration);
  return gsap.fromTo(
    el,
    { opacity: 0, x: p.distance },
    { opacity: 1, x: 0, duration: p.duration, delay: p.delay, ease: 'power3.out', clearProps: 'transform,opacity' }
  );
};

/** Animate element smoothly in from the TOP (UP -> DOWN) */
export const animateFromUp = (
  el: Element | string | null,
  optionsOrDelay: number | DirectionalAnimOptions = 0,
  distance = 45,
  duration = 0.75
) => {
  if (!el || typeof window === 'undefined') return;
  const p = parseAnimParams(optionsOrDelay, 45, 0.75, distance, duration);
  return gsap.fromTo(
    el,
    { opacity: 0, y: -p.distance },
    { opacity: 1, y: 0, duration: p.duration, delay: p.delay, ease: 'power3.out', clearProps: 'transform,opacity' }
  );
};

/** Animate element smoothly in from the BOTTOM (DOWN -> UP) */
export const animateFromDown = (
  el: Element | string | null,
  optionsOrDelay: number | DirectionalAnimOptions = 0,
  distance = 45,
  duration = 0.75
) => {
  if (!el || typeof window === 'undefined') return;
  const p = parseAnimParams(optionsOrDelay, 45, 0.75, distance, duration);
  return gsap.fromTo(
    el,
    { opacity: 0, y: p.distance },
    { opacity: 1, y: 0, duration: p.duration, delay: p.delay, ease: 'power3.out', clearProps: 'transform,opacity' }
  );
};

// Aliases for core animations
export const fadeUp = (el: Element | string | null, delay = 0, duration = 0.75) =>
  animateFromDown(el, delay, 40, duration);

export const fadeIn = (el: Element | string | null, delay = 0, duration = 0.6) => {
  if (!el || typeof window === 'undefined') return;
  return gsap.fromTo(
    el,
    { opacity: 0 },
    { opacity: 1, duration, delay, ease: 'power2.out', clearProps: 'opacity' }
  );
};

export const scaleIn = (el: Element | string | null, delay = 0, duration = 0.7) => {
  if (!el || typeof window === 'undefined') return;
  return gsap.fromTo(
    el,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.5)', clearProps: 'transform,opacity' }
  );
};

export const staggerFadeUp = (
  parent: Element | null,
  childSelector: string,
  stagger = 0.1,
  delay = 0
) => {
  if (!parent || typeof window === 'undefined') return;
  const children = parent.querySelectorAll(childSelector);
  if (!children.length) return;
  return gsap.fromTo(
    children,
    { opacity: 0, y: 35 },
    { opacity: 1, y: 0, duration: 0.7, stagger, delay, ease: 'power3.out', clearProps: 'transform,opacity' }
  );
};

export const animateSplitText = (el: Element | null, delay = 0, duration = 0.7) => {
  return animateFromUp(el, delay, 30, duration);
};

export const animateWavyText = (el: Element | null, _continuous = false) => {
  return animateFromDown(el, 0, 30, 0.7);
};

export const animateSplitWords = (el: Element | null, delay = 0, duration = 0.6) => {
  return animateFromDown(el, delay, 30, duration);
};

export const typewriterEffect = (el: Element | null, text: string, _delay = 0, _duration = 2) => {
  if (!el) return;
  el.textContent = text;
  return null;
};

// ─── 2. DIRECTIONAL SCROLLTRIGGER ANIMATIONS (ONCE: TRUE) ───────────────────

export interface DirectionalScrollOptions extends Partial<gsap.TweenVars> {
  distance?: number;
  start?: string;
  delay?: number;
  duration?: number;
}

/** Scroll triggered reveal from the LEFT */
export const scrollFromLeft = (el: Element | null, options: DirectionalScrollOptions = {}) => {
  if (!el || typeof window === 'undefined') return;
  const { distance = 55, start = 'top 88%', delay = 0, duration = 0.8, ...rest } = options;
  return gsap.fromTo(
    el,
    { opacity: 0, x: -distance },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
      ...rest,
    }
  );
};

/** Scroll triggered reveal from the RIGHT */
export const scrollFromRight = (el: Element | null, options: DirectionalScrollOptions = {}) => {
  if (!el || typeof window === 'undefined') return;
  const { distance = 55, start = 'top 88%', delay = 0, duration = 0.8, ...rest } = options;
  return gsap.fromTo(
    el,
    { opacity: 0, x: distance },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
      ...rest,
    }
  );
};

/** Scroll triggered reveal from the TOP (UP -> DOWN) */
export const scrollFromUp = (el: Element | null, options: DirectionalScrollOptions = {}) => {
  if (!el || typeof window === 'undefined') return;
  const { distance = 45, start = 'top 88%', delay = 0, duration = 0.8, ...rest } = options;
  return gsap.fromTo(
    el,
    { opacity: 0, y: -distance },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
      ...rest,
    }
  );
};

/** Scroll triggered reveal from the BOTTOM (DOWN -> UP) */
export const scrollFromDown = (el: Element | null, options: DirectionalScrollOptions = {}) => {
  if (!el || typeof window === 'undefined') return;
  const { distance = 45, start = 'top 88%', delay = 0, duration = 0.8, ...rest } = options;
  return gsap.fromTo(
    el,
    { opacity: 0, y: distance },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
      ...rest,
    }
  );
};

// Aliases for compatibility
export const scrollFadeUp = (el: Element | null, options: DirectionalScrollOptions = {}) =>
  scrollFromDown(el, options);

/** Scroll-triggered stagger with directional control */
export const scrollStaggerDirectional = (
  els: NodeListOf<Element> | HTMLCollection | HTMLCollectionOf<Element> | Element[],
  direction: 'left' | 'right' | 'up' | 'down' | 'alternating' | 'cross' = 'down',
  stagger = 0.1,
  options: DirectionalScrollOptions = {}
) => {
  if (!els || !els.length || typeof window === 'undefined') return;
  const arr = Array.from(els as ArrayLike<Element>);
  const trigger = arr[0];
  const { start = 'top 88%', delay = 0, duration = 0.75, distance = 45, ...rest } = options;

  if (direction === 'alternating') {
    // Odd from left, Even from right
    arr.forEach((el, i) => {
      const fromLeft = i % 2 === 0;
      gsap.fromTo(
        el,
        { opacity: 0, x: fromLeft ? -distance : distance },
        {
          opacity: 1,
          x: 0,
          duration,
          delay: delay + i * stagger,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger, start, once: true },
          ...rest,
        }
      );
    });
    return;
  }

  if (direction === 'cross') {
    // 0: Left, 1: Up, 2: Down, 3: Right
    const dirs = [
      { x: -distance, y: 0 },
      { x: 0, y: -distance },
      { x: 0, y: distance },
      { x: distance, y: 0 },
    ];
    arr.forEach((el, i) => {
      const d = dirs[i % 4];
      gsap.fromTo(
        el,
        { opacity: 0, x: d.x, y: d.y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay: delay + i * stagger,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger, start, once: true },
          ...rest,
        }
      );
    });
    return;
  }

  const initialProps: Record<string, number> = { opacity: 0 };
  if (direction === 'left') initialProps.x = -distance;
  if (direction === 'right') initialProps.x = distance;
  if (direction === 'up') initialProps.y = -distance;
  if (direction === 'down') initialProps.y = distance;

  return gsap.fromTo(
    arr,
    initialProps,
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger, start, once: true },
      ...rest,
    }
  );
};

export const scrollStagger = (
  els: NodeListOf<Element> | HTMLCollection | HTMLCollectionOf<Element> | Element[],
  stagger = 0.08,
  options: DirectionalScrollOptions = {}
) => {
  return scrollStaggerDirectional(els, 'down', stagger, options);
};

// ─── 3. UNIVERSAL DECLARATIVE DIRECTIONAL ANIMATOR ──────────────────────────

/**
 * Automatically initializes directional GSAP animations on any container based on
 * data attributes or classes:
 * - data-gsap="left"  / .gsap-left   -> animate from Left
 * - data-gsap="right" / .gsap-right  -> animate from Right
 * - data-gsap="up"    / .gsap-up     -> animate from Top (Up)
 * - data-gsap="down"  / .gsap-down   -> animate from Bottom (Down)
 * - data-gsap="alternate" / .gsap-alternate -> alternating children
 * - data-gsap="cross" / .gsap-cross -> Left, Up, Down, Right pattern
 */
export const initDirectionalAnimations = (scope?: HTMLElement | null) => {
  if (typeof window === 'undefined') return;
  const root = scope || document;

  // Left
  root.querySelectorAll('[data-gsap="left"], .gsap-left').forEach((el) => {
    scrollFromLeft(el);
  });

  // Right
  root.querySelectorAll('[data-gsap="right"], .gsap-right').forEach((el) => {
    scrollFromRight(el);
  });

  // Up (from top)
  root.querySelectorAll('[data-gsap="up"], .gsap-up').forEach((el) => {
    scrollFromUp(el);
  });

  // Down (from bottom)
  root.querySelectorAll('[data-gsap="down"], .gsap-down').forEach((el) => {
    scrollFromDown(el);
  });

  // Alternating children (Left & Right)
  root.querySelectorAll('[data-gsap="alternate"], .gsap-alternate').forEach((container) => {
    const children = Array.from(container.children);
    if (children.length) {
      scrollStaggerDirectional(children, 'alternating', 0.1);
    }
  });

  // Cross pattern (Left, Up, Down, Right)
  root.querySelectorAll('[data-gsap="cross"], .gsap-cross').forEach((container) => {
    const children = Array.from(container.children);
    if (children.length) {
      scrollStaggerDirectional(children, 'cross', 0.12);
    }
  });
};

export const animateCounter = (el: Element | null, endValue: number, suffix = '') => {
  if (!el || typeof window === 'undefined') return;
  const obj = { count: 0 };
  return gsap.to(obj, {
    count: endValue,
    duration: 1.8,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = Math.round(obj.count) + suffix;
    },
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
  });
};

export const parallax = (_el: Element | null, _yPercent = 30) => {
  return null;
};

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
