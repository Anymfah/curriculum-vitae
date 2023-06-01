/**
 * Value item of the chart line.
 */
export interface ChartLineValue {
  /**
   * Value to be displayed in the chart.
   */
  x: number;
  y: number;
}

export interface ChartLineCollection {
  /**
   * Name of the collection.
   */
  name: string;

  /**
   * Values of the collection.
   */
  values: ChartLineValue[];
}

/**
 * Point of the chart line.
 */
export interface ChartPoint {
  x: number;
  y: number;
  yc1: number;
  yc2: number;
  xc1: number;
  xc2: number;
}
