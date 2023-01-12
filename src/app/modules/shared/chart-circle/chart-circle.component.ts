import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {animateValueUtil} from '../../../utils/animate-value.util';

@Component({
  selector: 'cv-chart-circle',
  templateUrl: './chart-circle.component.html',
  styleUrls: ['./chart-circle.component.scss']
})
export class ChartCircleComponent implements OnChanges {

  /**
   * Value to be displayed in the chart.
   */
  @Input() public value: number = 75;

  /**
   * Minimum value to be displayed in the chart.
   */
  @Input() public min: number = 0;

  /**
   * Maximum value to be displayed in the chart.
   */
  @Input() public max: number = 100;

  /**
   * Size of the chart.
   */
  @Input() public size: number = 200;

  /**
   * Weight of the chart.
   */
  @Input() public weight: number = 5;

  /**
   * Color
   */
  @Input() public color?: string;

  /**
   * Delay before the animation starts.
   */
  @Input() public animationDelay: number = 0;

  /**
   * Start degree of the chart.
   */
  @Input() public startDegree: number = 0;

  /**
   * Calculated value in degrees from the value, min and max.
   */
  public calculatedValue: number = 0;

  /**
   * @inheritDoc
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if ('min' in changes || 'max' in changes || 'value' in changes) {
      this._calculateValue(this.animationDelay);
    }
  }

  /**
   * Calculates the value into degrees to be displayed in the chart.
   * @param delay Delay before the animation starts.
   */
  private _calculateValue(delay: number = 0): void {
    setTimeout(_ => {
      this._animateCalculatedValue(360 * (this.value - this.min) / (this.max - this.min));
      this._animateValue();
    }, delay);
  }

  /**
   * Animate the Calculated value
   * @param value Value to be animated.
   */
  private _animateCalculatedValue(value: number): void {
    animateValueUtil((newValue: number) => {
      this.calculatedValue = newValue;
    }, this.calculatedValue, value, 1500);
  }

  /**
   * Animate the value
   */
  private _animateValue(): void {
    animateValueUtil((newValue: number) => {
      this.value = Math.round(newValue);
    }, this.min, this.value, 1500);
  }


}