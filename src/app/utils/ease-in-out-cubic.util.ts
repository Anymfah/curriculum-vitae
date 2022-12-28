
/**
 * Ease in out cubic function.
 * @param t Time
 * @param ease Cubic bezier easing
 * @returns {number} Value
 */
export const easeInOutCubicUtil = (t: number, ease: [number, number, number, number]): number => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
