import {TOOLTIP_POSITION} from '../tooltip/tooltip.enum';

/**
 * Interface for the chart donut data
 */
export interface ChartDonutPart {
  /**
   * Name of the part.
   */
  name: string;

  /**
   * Value of the part.
   */
  value: number;

  /**
   * Color of the part.
   */
  color?: string;
}

/**
 * Interface for the chart donut view
 */
export interface ChartDonutPartView {
  /**
   * Name of the part.
   */
  name: string;

  /**
   * Value of the part. (in degrees)
   */
  value: number;

  /**
   * Color of the part.
   */
  color?: string;

  /**
   * Start angle of the part. (in degrees)
   */
  startAngle: number;

  /**
   * Position of the tooltip
   */
  tooltipPosition: TOOLTIP_POSITION;
}
