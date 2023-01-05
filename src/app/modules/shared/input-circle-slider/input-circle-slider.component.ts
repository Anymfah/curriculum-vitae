import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {animateValueUtil} from "../../../utils/animate-value.util";

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
   * @access ControlValueAccessor
   *        or ngModel directive
   *        or [(ngModel)]="value"
   *        or [ngModel]="value"
   *        or [value]="value"
   * @default Value is 0
   * Main value of the slider.
   */
  @Input() public value: number = 0;

  /**
   * Unit
   */
  @Input() public unit: string = '';

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
   * Allow drag.
   */
  @Input() public draggable: boolean = true;

  /**
   * Animate the value
   */
  @Input() public animate: boolean = true;

  /**
   * Animation time
   */
  @Input() public animationTime: number = 1000;

  /**
   * Animation curve
   */
  @Input() public animationCurve: [number, number, number, number] = [.43, .02, .04, 1];

  /**
   * Show value
   */
  @Input() public showValue: boolean = true;

  /**
   * Value digits after the decimal point.
   */
  @Input() public valueDigits = 0;

  /**
   * User started dragging the handle.
   */
  @Output() public triggerDragStart = new EventEmitter<number>();

  /**
   * User is dragging the handle.
   */
  @Output() public triggerDragging = new EventEmitter<number>;

  /**
   * Value as percentage.
   */
  public get valuePercentage(): number {
    return this.value * 100 / this.max;
  }

  /**
   * Formatted value.
   */
  public get formattedValue(): string {
    const digits = this.valueDigits > 0 ? this.valueDigits : 0;
    return this.value.toFixed(digits);
  }

  /**
   * Invoked method when the slider is dragged.
   */
  private _activeQuarters: {
    first: boolean,
    middle: boolean,
    last: boolean
  } = {
    first: false,
    middle: false,
    last: false,
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
   * Circle Rect
   */
  private _circleRect: DOMRect = new DOMRect();

  /**
   * @constructor
   */
  public constructor() {}

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this._updateQuarters();
    if (this.animate) {
      // Animate the value from 0 to the current value in 1 second.
      animateValueUtil((value) => {
        this.value = value;
      },0, this.value, this.animationTime, this.animationCurve);
    }
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
    if (this.draggable) {
      this.triggerDragStart.emit(this.value);
      this.isDragging = true;
      this._updateQuarters();
    }
  }

  /**
   * Calculate the active quarters from current value.
   * This is needed to constraint the handle to pass through all quarters of the circle.
   * @see allowCross
   *
   * When sliding, update activated quarters.
   */
  private _updateQuarters(): void {
    this._activeQuarters = {
      first: this.value >= this.max / 4,
      // Can also be middle: this.value >= this.max / 2;
      middle: this.value >= this.max / 4 && this.value <= (this.max / 4) * 3,
      last: this.value > (this.max / 4) * 3,
    }
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
      let value = this._calculateValueFromAngle(angle);

      /**
       * If the cross is not allowed, we need to prevent the handle to go over the min and max values.
       * Need to check where the handle comes from.
       * The value should never jump from min to max or max to min.
       */
      if (!this.allowCross) {
        this._updateQuarters();
        value = this._preventCross(value);
      }

      // Round the value to the nearest step
      value = Math.round(value / this.step) * this.step;

      this.writeValue(value);
      this.triggerDragging.emit(value);
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
    if (this._activeQuarters.last && value < (this.max / 4) * 3) {
      value = this.max;
    }

    // Can't pass from min to max
    else if (!this._activeQuarters.first && value > this.max / 4) {
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
  }

}
