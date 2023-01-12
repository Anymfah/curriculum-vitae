import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DrawCircleCoordinates} from "./draw-circle.interface";

@Component({
  selector: 'cv-draw-circle',
  templateUrl: './draw-circle.component.html',
  styleUrls: ['./draw-circle.component.scss']
})
export class DrawCircleComponent implements OnChanges {

  /**
   * Degree of the circle.
   * 360 is a full circle.
   */
  @Input() public arcDegree: number = 120;

  /**
   * Size of the circle.
   */
  @Input() public size: number = 300;

  /**
   * Weight of the arc.
   */
  @Input() public weight: number = 10;

  /**
   * Weight of the circle
   */
  @Input() public circleWeight: number = 1;

  /**
   * Position of the center the arc.
   * 0 = top, 90 = right, 180 = bottom, 270 = left.
   */
  @Input() public positionDegree: number = 0;

  /**
   * Position of anchor point of the arc.
   */
  @Input() public anchorPoint: 'start' | 'middle' | 'end' = 'middle';

  /**
   * Show full circle.
   */
  @Input() public showRefCircle: boolean = false;

  /**
   * Reverse the position degree calculation.
   */
  @Input() public reverse: boolean = false;

  /**
   * Color of the arc.
   */
  @Input() public color?: string;

  /**
   * View box of the SVG.
   */
  @Input() public viewBoxSize = 120;

  /**
   * Adjust the view box alignment of the SVG.
   */
  @Input() public viewBoxAlign = false;

  /**
   * Adjust the viewBox X of the SVG when viewBoxAlign is at true
   */
  public viewBoxX = 0;

  /**
   * Adjust the viewBox Y of the SVG when viewBoxAlign is at true
   */
  public viewBoxY = 0;

  /**
   * Percentage of the circle.
   * 100 is a full circle.
   */
  public get arcPercentage(): number {
    return this.arcDegree / 360 * 100;
  }

  public leftArc: DrawCircleCoordinates = {x: 0, y: 0};

  public rightArc: DrawCircleCoordinates = {x: 0, y: 0};

  /**
   * @inheritDoc
   */
  public ngOnChanges(changes: SimpleChanges) {
    if ('size' in changes
      || 'reverse' in changes
      || 'arcDegree' in changes
      || 'positionDegree' in changes
      || 'anchorPoint' in changes) {
      this._draw();
    }

    if ('weight' in changes && this.viewBoxAlign) {
      this.viewBoxY = -this.weight / 2;
      this.viewBoxX = -this.weight / 2;
      this.viewBoxSize = 120 + this.weight;
    }
  }

  /**
   * Draw or update the arc.
   */
  private _draw() {
    if (this.arcDegree >= 360) {
      this.arcDegree = 359.999;
    }
    let center = 60;
    let radius = 50;
    const arcSize = ((100 - this.arcPercentage) / 100) * 180;
    // Calculate the position of the arc.
    let position = this.positionDegree;
    if (this.anchorPoint === 'middle') {
      position += 90;
    } else if (this.anchorPoint === 'start') {
      position -= 90 + arcSize;
    } else if (this.anchorPoint === 'end') {
      position -= 90 - arcSize;
    }

    if (this.reverse) {
      position = 180 - position;
    }

    const startAngle = -arcSize + position;
    const endAngle = arcSize + position;


    this.leftArc = this._polarToCartesian(center, center, radius, startAngle);
    this.rightArc = this._polarToCartesian(center, center, radius, endAngle);
  }

  /**
   * Calculate the Cartesian coordinates of the point on the circle
   * with the given angle and radius from the center.
   * @param centerX X coordinate of the center of the circle.
   * @param centerY Y coordinate of the center of the circle.
   * @param radius Radius of the circle.
   * @param angleInDegrees Angle in degrees.
   */
  private _polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): DrawCircleCoordinates {
    const angleInRadians = angleInDegrees * Math.PI / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }
}
