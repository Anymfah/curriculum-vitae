import {Component, Input, SimpleChanges} from '@angular/core';
import {animateValueUtil} from '../../../utils/animate-value.util';

@Component({
  selector: 'cv-chart-timeline-item',
  templateUrl: './chart-timeline-item.component.html',
  styleUrls: ['./chart-timeline-item.component.scss']
})
export class ChartTimelineItemComponent {
  /**
   * Value of the gauge.
   * @todo put in abstract class
   */
  @Input() public value: number = 0;

  /**
   * Minimum value to be displayed in the chart.
   * @todo put in abstract class
   */
  @Input() public min: number = 0;

  /**
   * Maximum value to be displayed in the chart.
   * @todo put in abstract class
   */
  @Input() public max: number = 100;

  /**
   * Color
   * @todo put in abstract class
   */
  @Input() public color?: string;

  /**
   * Delay before the animation starts.
   * @todo put in abstract class
   */
  @Input() public animationDelay: number = 0;

  /**
   * Calculated value in % from the value, min and max.
   * @todo put in abstract class
   */
  public calculatedValue: number = 0;

  /**
   * Shown value.
   * @todo put in abstract class
   */
  public shownValue = 0;

  /**
   * @inheritDoc
   * @todo put in abstract class
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if ('min' in changes || 'max' in changes || 'value' in changes) {
      this._calculateValue(this.animationDelay);
    }
  }

  /**
   * Calculate the value.
   */
  private _calculateValue(delay: number): void {
    setTimeout(() => {
      if (this.value != null) {
        this._animateCalculatedValue(
          Math.round((this.value - this.min)
            / (this.max - this.min) * 100));
        this._animateValue();
      }
    }, delay);
  }

  /**
   * Animate the Calculated value
   * @param value Value to be animated.
   * @todo put in abstract class
   */
  private _animateCalculatedValue(value: number): void {
    animateValueUtil((newValue: number) => {
      this.calculatedValue = newValue;
    }, this.calculatedValue, value, 1500);
  }

  /**
   * Animate the value
   * @todo put in abstract class
   */
  private _animateValue(): void {
    animateValueUtil((newValue: number) => {
      this.shownValue = Math.round(newValue);
    }, this.min, this.value, 1500);
  }
}
