import {easeCubicBezierUtil} from "./ease-in-out-cubic.util";

/**
 * Types to allow the animation function to be used with numbers or arrays of numbers.
 */
type ArrayOrNumber = number | number[];
type ArrayOrNumberFromOption<T> = T extends number ? number : T extends number[] ? number[] : never;

/**
 * Animate number value.
 * @param cb
 * @param start Start value
 * @param end End value
 * @param duration Duration in ms
 * @param ease Cubic bezier easing
 */
export const animateValueUtil: <T extends ArrayOrNumber>(
  cb: (value: ArrayOrNumberFromOption<T>) => void,
  start: T,
  end: T,
  duration?: number,
  ease?: [number, number, number, number]
) => void
  = (
  cb,
  start,
  end,
  duration = 1000,
  ease = [.43, .02, .04, 1]
) => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    if (Array.isArray(start) && Array.isArray(end)) {
      cb(start.map(
        (s, index) => s
          + easeCubicBezierUtil(progress, ease) * (end[index] - s)) as
        ArrayOrNumberFromOption<typeof start>);
    } else if (typeof start === 'number' && typeof end === 'number') {
      cb(start + easeCubicBezierUtil(progress, ease) * (end - start) as
        ArrayOrNumberFromOption<typeof start>);
    }
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
