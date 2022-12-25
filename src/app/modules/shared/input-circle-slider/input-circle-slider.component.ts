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
  public value: number = 0;

  /**
   * Size of the circle.
   */
  @Input() public size: number = 200;

  /**
   * Weight of the circle line.
   */
  @Input() public weight: number = 10;

  /**
   * The transform value as number of the rotation for the handle.
   */
  private _handleTransformValue = 0;

  /**
   * The transform value as string of the rotation for the handle.
   */
  public handleTransform = 'rotate(0deg)';

  /**
   * User is currently dragging the handle.
   */
  public isDragging = false;

  /**
   * track bar mask for the circle.
   */
  public trackBarMask = `radial-gradient(circle at center, transparent 0, transparent 98px, black 98px)`;

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
      this._draw();
    }
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    this._draw();
  }

  /**
   * @event mousedown
   * Start dragging the handle.
   */
  public startDrag(): void {
    this.isDragging = true;
  }

  /**
   * @event mouseup
   * Stop dragging the handle.
   */
  public stopDrag(): void {
    this.isDragging = false;
  }

  /**
   * Invoked when the model has been changed
   */
  onChange: (_: any) => void = (_: any) => {};

  /**
   * Invoked method when value changes.
   */
  public updateChanges(): void {
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  /**
   * @event input
   * @param value
   */
  writeValue(value: number): void {
    this.value = value;
    this.updateChanges();
  }

  /**
   * Update the component internal values.
   */
  private _draw(): void {
    // Set Correct TrackBarMask
    this.trackBarMask = `radial-gradient(
      circle at center, transparent 0,
      transparent ${this.size / 2 - this.weight}px,
      black ${this.size / 2 - this.weight}px)`;
  }

}
