/**
 * Animation constants for the project cards
 */
export const ANIMATION_SPRING = {
  open: { type: "spring" as const, stiffness: 200, damping: 30 },
  close: { type: "spring" as const, stiffness: 300, damping: 35 },
};

/**
 * Card UI constants
 */
export const CARD_UI = {
  borderRadius: 'rounded-3xl',
  backgroundColor: {
    light: 'bg-white',
    dark: 'dark:bg-[#1c1c1e]'
  },
  closeButton: {
    position: 'top-4 right-4',
    padding: 'p-1',
    light: 'bg-white text-black',
    dark: 'bg-black/50 text-white'
  }
};
