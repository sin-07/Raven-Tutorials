/**
 * GSAP Setup & Utilities
 * Covers all 5 GSAP categories: Core, Scroll, SVG, UI, Text
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
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

// ─── CORE ───────────────────────────────────────────────────────────────────

/** Fade up from below */
export const fadeUp = (
  el: Element | string | null,
  delay = 0,
  duration = 0.8
) => {
  if (!el) return;
  return gsap.fromTo(el,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration, delay, ease: 'power3.out', clearProps: 'all' }
  );
};

/** Fade in */
export const fadeIn = (
  el: Element | string | null,
  delay = 0,
  duration = 0.6
) => {
  if (!el) return;
  return gsap.fromTo(el,
    { opacity: 0 },
    { opacity: 1, duration, delay, ease: 'power2.out', clearProps: 'all' }
  );
};

/** Scale + fade in (bounce) */
export const scaleIn = (
  el: Element | string | null,
  delay = 0,
  duration = 0.7
) => {
  if (!el) return;
  return gsap.fromTo(el,
    { opacity: 0, scale: 0.7 },
    { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)', clearProps: 'all' }
  );
};

/** Stagger children fade-up */
export const staggerFadeUp = (
  parent: Element | null,
  childSelector: string,
  stagger = 0.12,
  delay = 0
) => {
  if (!parent) return;
  const children = parent.querySelectorAll(childSelector);
  if (!children.length) return;
  return gsap.fromTo(children,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, stagger, delay, ease: 'power3.out', clearProps: 'all' }
  );
};

// ─── TEXT ───────────────────────────────────────────────────────────────────

/** Split element text into per‑character spans, then animate them */
export const animateSplitText = (
  el: Element | null,
  delay = 0,
  duration = 0.6
) => {
  if (!el || typeof window === 'undefined') return;
  const allSpans: HTMLSpanElement[] = [];

  // Recursively walk text nodes only — preserves nested element structure
  // (colored spans, block spans, etc. are kept intact)
  const processNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      if (!text) return;
      const frag = document.createDocumentFragment();
      text.split('').forEach((ch) => {
        const s = document.createElement('span');
        s.textContent = ch === ' ' ? '\u00A0' : ch;
        s.style.cssText = 'display:inline-block;will-change:transform,opacity';
        allSpans.push(s);
        frag.appendChild(s);
      });
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Snapshot children before iterating so DOM mutations don't skip nodes
      Array.from(node.childNodes).forEach(processNode);
    }
  };

  Array.from(el.childNodes).forEach(processNode);
  if (!allSpans.length) return;

  return gsap.fromTo(allSpans,
    { opacity: 0, y: 60, rotationX: -90 },
    {
      opacity: 1, y: 0, rotationX: 0,
      transformOrigin: '0% 50% -50px',
      duration, stagger: 0.025, delay,
      ease: 'back.out(1.7)', clearProps: 'all',
    }
  );
};

/** Word-by-word reveal */
export const animateSplitWords = (
  el: Element | null,
  delay = 0,
  duration = 0.6
) => {
  if (!el || typeof window === 'undefined') return;
  const words = (el.textContent || '').split(' ');
  const spans: HTMLSpanElement[] = words.map((w, i) => {
    const span = document.createElement('span');
    span.textContent = w + (i < words.length - 1 ? '\u00A0' : '');
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    return span;
  });
  el.textContent = '';
  spans.forEach((s) => el.appendChild(s));

  return gsap.fromTo(spans,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration, stagger: 0.07, delay, ease: 'power3.out', clearProps: 'all' }
  );
};

/** Typewriter via TextPlugin */
export const typewriterEffect = (
  el: Element | null,
  text: string,
  delay = 0,
  duration = 2
) => {
  if (!el || typeof window === 'undefined') return;
  return gsap.to(el, {
    duration,
    delay,
    text: { value: text, delimiter: '' },
    ease: 'none',
  });
};

// ─── SCROLL ─────────────────────────────────────────────────────────────────

/** Scroll-triggered fade-up for a single element */
export const scrollFadeUp = (
  el: Element | null,
  options: Partial<gsap.TweenVars & { start?: string }> = {}
) => {
  if (!el) return;
  const { start = 'top 85%', ...rest } = options;
  return gsap.fromTo(el,
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'all',
      scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
      ...rest,
    }
  );
};

/** Scroll-triggered stagger for a group of elements */
export const scrollStagger = (
  els: NodeListOf<Element> | Element[],
  stagger = 0.1,
  options: Partial<gsap.TweenVars & { start?: string }> = {}
) => {
  if (!els || !els.length) return;
  const { start = 'top 85%', ...rest } = options;
  const arr = Array.from(els);
  return gsap.fromTo(arr,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 0.7, stagger, ease: 'power3.out', clearProps: 'all',
      scrollTrigger: { trigger: arr[0], start, toggleActions: 'play none none none' },
      ...rest,
    }
  );
};

/** Animated number counter triggered on scroll */
export const animateCounter = (
  el: Element | null,
  endValue: number,
  suffix = ''
) => {
  if (!el) return;
  const obj = { count: 0 };
  return gsap.to(obj, {
    count: endValue,
    duration: 2.5,
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

/** Parallax for a single element */
export const parallax = (el: Element | null, yPercent = 30) => {
  if (!el) return;
  return gsap.to(el, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// ─── SVG ────────────────────────────────────────────────────────────────────

/** Animate SVG path "drawing" via stroke-dashoffset */
export const drawSVGPath = (pathEl: SVGPathElement | null, delay = 0) => {
  if (!pathEl) return;
  let length: number;
  try {
    length = pathEl.getTotalLength();
  } catch {
    length = 1000;
  }
  gsap.set(pathEl, { strokeDasharray: length, strokeDashoffset: length });
  return gsap.to(pathEl, {
    strokeDashoffset: 0,
    duration: 2.5,
    delay,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: pathEl,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
};

/** Floating pulse on SVG circles / decorative shapes */
export const floatLoop = (el: Element | null, amplitude = 15, duration = 3) => {
  if (!el) return;
  return gsap.to(el, {
    y: amplitude,
    duration,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });
};

/** SVG dash-border draw animation */
export const drawBorder = (el: Element | null, delay = 0) => {
  if (!el) return;
  gsap.set(el, { opacity: 0 });
  return gsap.to(el, {
    opacity: 1,
    strokeDashoffset: 0,
    duration: 1.5,
    delay,
    ease: 'power2.inOut',
  });
};

// ─── UI ─────────────────────────────────────────────────────────────────────

/** Magnetic hover effect (mousemove on container, animates inner) */
export const magneticHover = (
  containerEl: HTMLElement | null,
  innerEl: HTMLElement | null,
  strength = 0.3
) => {
  if (!containerEl || !innerEl) return;

  const handleMove = (e: MouseEvent) => {
    const rect = containerEl.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(innerEl, { x, y, duration: 0.4, ease: 'power2.out' });
  };
  const handleLeave = () => {
    gsap.to(innerEl, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
  };

  containerEl.addEventListener('mousemove', handleMove);
  containerEl.addEventListener('mouseleave', handleLeave);

  return () => {
    containerEl.removeEventListener('mousemove', handleMove);
    containerEl.removeEventListener('mouseleave', handleLeave);
  };
};

/** Card tilt on hover */
export const cardTilt = (el: HTMLElement | null) => {
  if (!el) return;

  const handleMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotationY: x * 10,
      rotationX: -y * 10,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });
  };
  const handleLeave = () => {
    gsap.to(el, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  el.addEventListener('mousemove', handleMove);
  el.addEventListener('mouseleave', handleLeave);
  return () => {
    el.removeEventListener('mousemove', handleMove);
    el.removeEventListener('mouseleave', handleLeave);
  };
};

/** Reveal nav on scroll using ScrollTrigger + Observer */
export const revealNavOnScroll = (navEl: HTMLElement | null) => {
  if (!navEl) return;
  let lastY = 0;

  return Observer.create({
    type: 'scroll',
    onChange(_self: unknown) {
      // 'self.deltaY' is not available on Observer; use scrollY diff
      const currentY = window.scrollY;
      if (currentY < 80) {
        gsap.to(navEl, { y: 0, duration: 0.3, ease: 'power2.out' });
      } else if (currentY > lastY) {
        gsap.to(navEl, { y: '-100%', duration: 0.4, ease: 'power2.inOut' });
      } else {
        gsap.to(navEl, { y: 0, duration: 0.3, ease: 'power2.out' });
      }
      lastY = currentY;
    },
  });
};

/** Make an element draggable (Draggable UI plugin) */
export const makeDraggable = (
  el: string | Element,
  type: 'x' | 'y' = 'x',
  bounds?: Element | string
) => {
  return Draggable.create(el, {
    type,
    bounds,
    inertia: true,
    edgeResistance: 0.65,
  });
};
