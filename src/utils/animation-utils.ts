/**
 * Helper function for transforming elements with scale and translate
 */
export const scaleTranslate = ({
  x,
  y,
  scaleX,
  scaleY,
}: {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}) => `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;

/**
 * Manages document body scrolling
 */
export const scrollManager = {
  preventScroll: (): void => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = "hidden";
    }
  },
  
  enableScroll: (): void => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = "auto";
    }
  }
};
