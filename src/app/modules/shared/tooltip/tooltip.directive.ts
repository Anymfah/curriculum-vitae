import {Directive, ElementRef, HostListener, Input, NgModuleRef, OnDestroy, ViewContainerRef} from '@angular/core';
import {TooltipComponent} from './tooltip.component';
import {TOOLTIP_POSITION} from './tooltip.enum';
import {Point} from '@angular/cdk/drag-drop';

@Directive({
  selector: '[cvTooltip]',
})
export class TooltipDirective implements OnDestroy {

 @Input() public cvTooltip: string = '';

 @Input() public cvTooltipPosition: TOOLTIP_POSITION = TOOLTIP_POSITION.TOP;

  /**
   * If true, position of the tooltip is at mouse enter position.
   */
 @Input() public cvPositionAtOrigin = false;

  /**
   * Origin position
   */
 private _originPosition?: Point;

  /**
   * Currently active ? True = active, False = inactive.
   * Changed by the mouse events.
   */
 private _active = false;

  /**
   * Tooltip component.
   */
  private _tooltipComponent: TooltipComponent | null = null;

  /**
   * @constructor
   */
  public constructor(
    private readonly _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
  ) {
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
    this._destroyTooltip();
  }

  /**
   * @event mouseenter
   * Create tooltip component.
   */
  @HostListener('mouseenter', ['$event']) public onMouseEnter($event: MouseEvent): void {
    // Mouse position
    if (this._originPosition == null) {
      this._originPosition = {x: $event.clientX, y: $event.clientY};
    }
    this._active = true;
    this._createTooltip();
  }

  /**
   * @event mouseleave
   * Destroy tooltip component.
   */
  @HostListener('mouseleave') public onMouseLeave(): void {
    this._active = false;
    this._originPosition = undefined;
    this._destroyTooltip();
  }

  /**
   * Create tooltip component.
   */
  private _createTooltip(): void {
    this._tooltipComponent = this._viewContainerRef.createComponent(TooltipComponent, {
      injector: this._viewContainerRef.injector,
      ngModuleRef: this._viewContainerRef.injector.get(NgModuleRef),
    }).instance;
    this._tooltipComponent.cvTooltip = this.cvTooltip;
    this._tooltipComponent.overlayOrigin = this._elementRef;
    this._tooltipComponent.originPosition = this._originPosition;
    this._tooltipComponent.cvTooltipPosition = this.cvTooltipPosition;
  }

  /**
   * Destroy tooltip component.
   */
  private _destroyTooltip(): void {
    if (this._tooltipComponent != null) {
      this._tooltipComponent.destroy().then(_ => {
        if (!this._active) {
          this._viewContainerRef.clear();
          this._tooltipComponent = null;
        }
      });
    }
  }
}
