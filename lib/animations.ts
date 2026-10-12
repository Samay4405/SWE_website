import type { Variants } from "framer-motion";

/**
 * Fade in from below — default scroll-reveal animation
 * Usage: <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Fade in from left
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Fade in from right
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Simple fade in (no translate)
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Container that staggers its children's animations
 * Usage: <motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
 *          <motion.div variants={fadeInUp}>Child 1</motion.div>
 *          <motion.div variants={fadeInUp}>Child 2</motion.div>
 *        </motion.div>
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Slower stagger for larger grids
 */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/**
 * Scale up on hover — for interactive cards/buttons
 * Usage: <motion.div whileHover="hover" variants={scaleOnHover}>
 */
export const scaleOnHover: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

/**
 * Line draw animation for SVG paths
 * Usage: <motion.path variants={drawLine} initial="hidden" whileInView="visible" />
 */
export const drawLine: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
};
