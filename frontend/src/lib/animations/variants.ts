import type { Variants, Transition } from 'framer-motion';

// ─── Default Transitions ──────────────────────────────────────────────────────
export const defaultTransition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const smoothTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.4,
};

export const slowTransition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.6,
};

// ─── Fade Variants ────────────────────────────────────────────────────────────
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// ─── Fade Up Variants ─────────────────────────────────────────────────────────
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// ─── Fade Down Variants ───────────────────────────────────────────────────────
export const fadeDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

// ─── Fade Left Variants ───────────────────────────────────────────────────────
export const fadeLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

// ─── Fade Right Variants ──────────────────────────────────────────────────────
export const fadeRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
};

// ─── Scale Variants ───────────────────────────────────────────────────────────
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// ─── Scale Up Variants ────────────────────────────────────────────────────────
export const scaleUpVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

// ─── Slide Up Variants ────────────────────────────────────────────────────────
export const slideUpVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ─── Slide Down Variants ──────────────────────────────────────────────────────
export const slideDownVariants: Variants = {
  hidden: {
    y: '-100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ─── Slide Left Variants ──────────────────────────────────────────────────────
export const slideLeftVariants: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ─── Slide Right Variants ─────────────────────────────────────────────────────
export const slideRightVariants: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ─── Container Stagger Variants ───────────────────────────────────────────────
export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// ─── Item Variants (used inside container) ────────────────────────────────────
export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// ─── Card Hover Variants ──────────────────────────────────────────────────────
export const cardHoverVariants: Variants = {
  initial: {
    y: 0,
    boxShadow: 'var(--shadow-card)',
  },
  hover: {
    y: -4,
    boxShadow: 'var(--shadow-card-hover)',
    transition: springTransition,
  },
  tap: {
    y: -2,
    scale: 0.99,
    transition: { duration: 0.1 },
  },
};

// ─── Button Variants ──────────────────────────────────────────────────────────
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// ─── Modal Backdrop Variants ──────────────────────────────────────────────────
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(4px)',
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.2 },
  },
};

// ─── Modal Content Variants ───────────────────────────────────────────────────
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 },
  },
};

// ─── Drawer Variants ──────────────────────────────────────────────────────────
export const drawerVariants: Variants = {
  hidden: {
    x: '100%',
  },
  visible: {
    x: 0,
    transition: smoothTransition,
  },
  exit: {
    x: '100%',
    transition: { duration: 0.3 },
  },
};

// ─── Drawer Left Variants ─────────────────────────────────────────────────────
export const drawerLeftVariants: Variants = {
  hidden: {
    x: '-100%',
  },
  visible: {
    x: 0,
    transition: smoothTransition,
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.3 },
  },
};

// ─── Toast Variants ───────────────────────────────────────────────────────────
export const toastVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// ─── Page Transition Variants ─────────────────────────────────────────────────
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

// ─── Floating Animation Variants ──────────────────────────────────────────────
export const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ─── Pulse Glow Variants ──────────────────────────────────────────────────────
export const pulseGlowVariants: Variants = {
  initial: {
    boxShadow: '0 0 0 0 rgba(232, 93, 4, 0)',
  },
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(232, 93, 4, 0)',
      '0 0 20px 10px rgba(232, 93, 4, 0.3)',
      '0 0 0 0 rgba(232, 93, 4, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ─── Rotate Variants ──────────────────────────────────────────────────────────
export const rotateVariants: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ─── Number Count Variants ────────────────────────────────────────────────────
export const countVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

// ─── List Item Variants ───────────────────────────────────────────────────────
export const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      ...smoothTransition,
    },
  }),
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

// ─── Hero Text Variants ───────────────────────────────────────────────────────
export const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// ─── Accordion Variants ───────────────────────────────────────────────────────
export const accordionVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: 'easeOut' },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: 'easeIn' },
      opacity: { duration: 0.2 },
    },
  },
};

// ─── Notification Badge Variants ──────────────────────────────────────────────
export const badgePulseVariants: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.5,
      repeat: 3,
      ease: 'easeInOut',
    },
  },
};
