
/**
 * Ease in out cubic function.
 * @param t Time
 * @param ease Cubic bezier easing
 * @returns {number} Value
 */
export const easeInOutCubicUtil = (t: number, ease: [number, number, number, number]): number => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export const easeOutCubicUtil = (t: number, ease: [number, number, number, number]): number => {
  return (--t) * t * t + 1;
}

export const easeInCubicUtil = (t: number, ease: [number, number, number, number]): number => {
  return t * t * t;
}
/**
 * Ease cubic bezier function.
 */
export const easeCubicBezierUtil = (t: number, ease: [number, number, number, number]): number => {
  const [x1, y1, x2, y2] = ease;
  // Calculate the polynomial coefficients,
  // implicit first and last control points are (0,0) and (1,1).
  const cx = 3.0 * x1;
  const bx = 3.0 * (x2 - x1) - cx;
  const ax = 1.0 - cx - bx;
  const cy = 3.0 * y1;
  const by = 3.0 * (y2 - y1) - cy;
  const ay = 1.0 - cy - by;

  function sampleCurveX(t: number): number {
    // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY(t: number): number {
    return ((ay * t + by) * t + cy) * t;
  }

  function sampleCurveDerivativeX(t: number): number {
    return (3.0 * ax * t + 2.0 * bx) * t + cx;
  }

  // Given an x value, find a parametric value it came from.
  function solveCurveX(x: number, epsilon: number): number {
    let t0;
    let t1;
    let t2;
    let x2;
    let d2;
    let i;

    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 8; i++) {
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) {
        return t2;
      }
      d2 = sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < 1e-6) {
        break;
      }
      t2 = t2 - x2 / d2;
    }

    // Fall back to the bisection method for reliability.
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;

    if (t2 < t0) {
      return t0;
    }
    if (t2 > t1) {
      return t1;
    }

    while (t0 < t1) {
      x2 = sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) {
        return t2;
      }
      if (x > x2) {
        t0 = t2;
      } else {
        t1 = t2;
      }
      t2 = (t1 - t0) * 0.5 + t0;
    }

    // Failure.
    return t2;
  }

  return sampleCurveY(solveCurveX(t, 1 / 200));
}
