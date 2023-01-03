import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
/**
 * @author Soheil Saheb-Jamii
 * @since 2022-12-25
 * Circle Component
 * @description This component is used to display a circle.
 * The circle can be displayed in different sizes, also it can be filled with a percentage.
 *
 * @exception
 *    - You can change color of the track circle from css by
 *      overriding the --track-bar-color variable.
 *    - You can change color of the track bar from css by
 *      overriding the --track-bar-bg-color variable.
 * @example
 * <cv-circle [size]="200" [weight]="10"></cv-circle>
 */
@Component({
  selector: 'cv-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnChanges, OnInit {

  /**
   * Size of the circle.
   */
  @Input() public size: number = 200;

  /**
   * Base Weight of the circle line.
   */
  @Input() public baseWeight: number = 10;

  /**
   * Size render of the circle
   */
  public get sizeRender(): number {
    return this.weightDirection === 'out' ? this.size + this.weight : this.size;
  }

  /**
   * Size render of the container of the circle.
   */
  public get containerSizeRender(): number {
    return this.weightDirection === 'out' ? this.size + this.baseWeight : this.size;
  }

  /**
   * Weight of the circle line (can be animated).
   */
  @Input() public weight: number = 10;

  /**
   * Weight direction.
   */
  @Input() public weightDirection: 'in' | 'out' = 'in';

  /**
   * Fill percentage of the track bar.
   * @description 0% is the top of the circle.
   * You can change the start point with the [startAt] input.
   * You can reverse the direction with the [reverse] input.
   */
  @Input() public fillPercentage: number = 100;

  /**
   * Start point of the track bar as percentage.
   * @description 0% is the top of the circle and 50% the bottom.
   */
  @Input() public startAt?: number;

  /**
   * Start point of the track bar as degree.
   * @description 0deg is the top of the circle and 180deg the bottom.
   */
  @Input() public startAtDegree: number = 0;

  /**
   * Get start point of the track bar as degree.
   */
  private get _startAtDegree(): number {
    if (this.startAt != null) {
      return this.startAt * 3.6;
    } else {
      return this.startAtDegree;
    }
  }

  /**
   * Reversed direction of the track bar.
   */
  @Input() public reverse = false;

  /**
   * track bar mask for the circle.
   * @see _drawSize()
   */
  public trackBarMask = `radial-gradient(circle at center, transparent 0, transparent 98px, black 98px)`;

  /**
   * track bar fill for the circle.
   * @see _drawTrackCircle()
   */
  public trackBarMaskInner = '';

  /**
   * @inheritDoc
   */
  public ngOnChanges(changes: SimpleChanges) {
    if ('fillPercentage' in changes
      || 'startAt' in changes
      || 'startAtDegree' in changes
      || 'reverse' in changes) {
      this._drawTrackCircle();
    }

    if ('size' in changes
      || 'weight' in changes
      || 'weightDirection' in changes) {
      this._drawSize();
    }
  }

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this._drawSize();
    this._drawTrackCircle();
  }

  /**
   * @event ngOnChanges
   * @event ngOnInit
   * Draw the inner track bar.
   */
  private _drawTrackCircle() {
    if (!this.reverse) {
      this.trackBarMaskInner = `conic-gradient(
        from ${this._startAtDegree}deg,
        black ${this.fillPercentage}%,
        transparent ${this.fillPercentage}%
        )`;
    } else {
      // Reverse the direction (will start with empty to filled)
      const emptyPercentage = 100 - this.fillPercentage;
      this.trackBarMaskInner = `conic-gradient(
        from ${360 - this._startAtDegree}deg,
        transparent ${emptyPercentage}%,
        black ${emptyPercentage}%
        )`;
    }
  }

  /**
   * @event ngOnChanges
   * @event ngOnInit
   * Draw the size of the circle.
   */
  private _drawSize() {
    const radius = this.size / 2;
    const weight = this.weightDirection === 'in' ? this.weight : 0;
    this.trackBarMask = `radial-gradient(circle at center, transparent 0, transparent ${radius - weight}px, black ${radius - this.weight}px)`;
  }

}
