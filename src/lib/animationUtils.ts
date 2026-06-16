export const transitions = {
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  springGentle: { type: 'spring', stiffness: 120, damping: 14 }
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
};
