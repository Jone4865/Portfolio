export const heroSpringSoft = { type: 'spring' as const, stiffness: 280, damping: 30 };

export const heroHoverSpring = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 28,
};

export const heroKenBurnsTransition = {
  duration: 20,
  repeat: Infinity,
  ease: 'easeInOut' as const,
};

export const heroScrimTransition = {
  delay: 0.2,
  duration: 0.65,
  ease: 'easeOut' as const,
};

export const heroTypingTransition = {
  delay: 0.32,
  duration: 0.68,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const heroAccentTransition = {
  delay: 0.72,
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const scrollHintChevronTransition = {
  duration: 1.45,
  repeat: Infinity,
  ease: 'easeInOut' as const,
};
