import {AfterViewInit, Directive, ElementRef, OnInit, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[cvActiveSwitch]'
})
export class ActiveSwitchDirective implements OnInit, AfterViewInit {

  /**
   * Items with cvActiveSwitchItem directive.
   * Children of the element with cvActiveSwitch directive.
   */
  private _items?: NodeListOf<HTMLElement>;

  /**
   * Active item
   */
  public activeItem?: HTMLElement;

  /**
   * @constructor
   * @param _elementRef Element reference
   * @param _viewContainerRef View container reference
   */
  public constructor(
    private readonly _elementRef: ElementRef,
    private readonly _viewContainerRef: ViewContainerRef,
  ) {}

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this._elementRef.nativeElement.classList.add('active-switch');
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    // Query selector
    this._items = this._elementRef.nativeElement.querySelectorAll('[cvActiveSwitchItem]');
  }

  public setActiveItem(item: HTMLElement): void {
    // Set active item
    this.activeItem = item;
    // Set active class
    this._items?.forEach((element: HTMLElement) => {
      if (element === item) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

}
