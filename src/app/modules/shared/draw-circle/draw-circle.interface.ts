export interface DrawCircleCoordinates {
  x: number;
  y: number;
}

/**
 * @Inputs Interface for the DrawCircleComponent.
 */
export interface iDrawCircle {
  size?: number;
  arcDegree?: number;
  weight?: number;
  circleWeight?: number;
  positionDegree?: number;
  anchorPoint?: 'start' | 'middle' | 'end';
  showRefCircle?: boolean;
}
