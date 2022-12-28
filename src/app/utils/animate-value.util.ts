import {easeInOutCubicUtil} from "./ease-in-out-cubic.util";

/**
 * Animate number value.
 * @param cb
 * @param start Start value
 * @param end End value
 * @param duration Duration in ms
 * @param ease Cubic bezier easing
 */
export const animateValueUtil = (
  cb: (value: number) => void,
  start: number,
  end: number,
  duration: number = 1000,
  ease: [number, number, number, number] = [.43, .02, .04, 1]
): void => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    //this.value = start + progress * (end - start);

    const value = start + easeInOutCubicUtil(progress, ease) * (end - start);
    cb(value);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
