import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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

  public viewBoxSize: number = this.size + 10;

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
    if ('size' in changes || 'arcDegree' in changes) {
      if (this.arcDegree >= 360) {
        this.arcDegree = 359.999;
      }
      this.viewBoxSize = 120;
      this._draw();
    }
  }

  /**
   * Draw or update the arc.
   */
  private _draw() {
    //const center = this.size / 2;
    const center = 60;
    const radius = 50;
    const arcSize = ((100 - this.arcPercentage) / 100) * 180;
    const startAngle = -arcSize - 90;
    const endAngle = arcSize - 90;

    /*const startAngle = this.arcDegree - 90;
    const endAngle = 270 - this.arcDegree;*/
    console.log('startAngle', startAngle, 'endAngle', endAngle);

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
