export const cardRevealVariants = {
  off: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  on: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0 },
  },
};

export const stackParentVariants = {
  off: {},
  on: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

export const stackChipVariants = {
  off: { opacity: 1, y: 0, scale: 1 },
  on: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0 },
  },
};
