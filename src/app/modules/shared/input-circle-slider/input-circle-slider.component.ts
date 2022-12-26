import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

/**
 * Input Circle Slider Component
 * Works with the ngModel directive
 * Uses the controlValueAccessor interface to work with the ngModel directive
 * @example
 * <input-circle-slider [(ngModel)]="value"></input-circle-slider>
 * @example
 * <input-circle-slider [(ngModel)]="value" [min]="0" [max]="100" [step]="1"></input-circle-slider>
 */
@Component({
  selector: 'cv-input-circle-slider',
  templateUrl: './input-circle-slider.component.html',
  styleUrls: ['./input-circle-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCircleSliderComponent),
      multi: true
    }
  ]
})
export class InputCircleSliderComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {

  /**
   * Main value of the slider.
   */
  public value: number = 25;

  /**
   * Circle Dom element.
   */
  @ViewChild('circle') circle: ElementRef | undefined;

  /**
   * Size of the circle.
   */
  @Input() public size: number = 200;

  /**
   * Weight of the circle line.
   */
  @Input() public weight: number = 10;

  /**
   * Minimum value of the slider.
   */
  @Input() public min: number = 0;

  /**
   * Maximum value of the slider.
   */
  @Input() public max: number = 100;

  /**
   * Step value.
   */
  @Input() public step: number = 0.1;

  /**
   * Allow to drag the handle through the min and max values.
   */
  @Input() public allowCross: boolean = false;

  /**
   * Value as percentage.
   */
  public get valuePercentage(): number {
    return this.value * 100 / this.max;
  }

  /**
   * Invoked method when the slider is dragged.
   */
  private _activeQuarters = {
    0: false,
    1: false,
    2: false,
  }

  /**
   * The transform value as string of the rotation for the handle.
   */

  public get handleTransform(): string {
    return `rotate(${this.valuePercentage * 3.6}deg)`;
  }
  /**
   * User is currently dragging the handle.
   */
  public isDragging = false;

  /**
   * track bar mask for the circle.
   */
  public trackBarMask = `radial-gradient(circle at center, transparent 0, transparent 98px, black 98px)`;

  /**
   * Circle Rect
   */
  private _circleRect: DOMRect = new DOMRect();

  /**
   * Temporary variable to store last changed value
   * used only with allowCross at false to prevent jumps from max to min and vice versa
   * @see allowCross
   */
  private _lastValue?: number;

  /**
   * @constructor
   */
  public constructor() {}

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
  }

  /**
   * @inheritDoc
   */
  public ngOnChanges(changes: SimpleChanges) {
    if ('size' in changes || 'weight' in changes) {
    }
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
  }

  /**
   * @event mousedown
   * Start dragging the handle.
   */
  public startDrag(): void {
    this.isDragging = true;
    this._updateQuarters();
  }

  /**
   * Calculate the active quarters from current value.
   * This is needed to constraint the handle to pass through all quarters of the circle.
   * @see allowCross
   *
   * When sliding, update activated quarters.
   */
  private _updateQuarters(): void {
    this._activeQuarters[0] = this.value >= this.max / 4;
    this._activeQuarters[1] = this.value > this.max / 2;
    this._activeQuarters[2] = this.value > this.max * 3 / 4;
  }

  /**
   * @event mouseup
   * Stop dragging the handle.
   */
  public stopDrag(): void {
    this.isDragging = false;
  }

  /**
   * @event mousemove
   * Moving the handle.
   */
  public drag(event: MouseEvent): void {
    if (this.isDragging && this.circle != null) {
      const circle = this.circle.nativeElement;
      this._circleRect = circle.getBoundingClientRect();

      const x = event.clientX - this._circleRect.left;
      const y = event.clientY - this._circleRect.top;
      const angle = this._calculateAngle(x, y);
      this._updateQuarters();
      let value = this._calculateValueFromAngle(angle);

      /**
       * If the cross is not allowed, we need to prevent the handle to go over the min and max values.
       * Need to check where the handle comes from.
       * The value should never jump from min to max or max to min.
       * Offset of 30 is added to prevent the handle to go over the min and max values.
       */
      if (!this.allowCross) {
        value = this._preventCross(value);
      }

      // Round the value to the nearest step
      value = Math.round(value / this.step) * this.step;

      this.writeValue(value);
      this.updateChanges();
    }
  }

  /**
   * Prevent the handle to go over the min and max values.
   * Listen to the activated quarters to know where the handle comes from.
   * @param value
   */
  private _preventCross(value: number): number {

    // Can't pass from max to min
    if (this._activeQuarters[2] && value < (this.max / 4) * 3) {
      value = this.max;
    }

    // Can't pass from min to max
    else if (!this._activeQuarters[0] && value > this.max / 4) {
      value = this.min;
    }
    return  value;
  }

  /**
   * Calculate the angle of the handle.
   */
  private _calculateAngle(x: number, y: number): number {
    let angle = Math.atan2(y - this.size / 2, x - this.size / 2) * 180 / Math.PI + 90;
    // Prevent the handle to go over the 0°
    if (angle < 0) {
      angle = 360 + angle;
    }

    return angle;
  }

  /**
   * Calculate value from angle.
   */
  private _calculateValueFromAngle(angle: number): number {
    return angle * (this.max - this.min) / 360 + this.min;
  }

  /**
   * Invoked when the model has been changed
   */
  public onChange: (_: any) => void = (_: any) => {};

  /**
   * Invoked method when value changes.
   */
  public updateChanges(): void {
    if (typeof this.onChange === 'function') {
      this.onChange(this.value);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  /**
   * @event input
   * @param value
   */
  public writeValue(value: number): void {
    this.value = value;
    console.log('writeValue', value);
  }

}
