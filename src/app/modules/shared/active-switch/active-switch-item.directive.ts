import {Directive, ElementRef, HostListener, OnInit, ViewContainerRef} from '@angular/core';
import {ActiveSwitchDirective} from './active-switch.directive';

@Directive({
  selector: '[cvActiveSwitchItem]'
})
export class ActiveSwitchItemDirective implements OnInit {

  /**
   * @event click
   * Click event on component.
   * Set active item.
   */
  @HostListener('click') public onClick(): void {
    // Set active item
      this._parentDirective.setActiveItem(this._elementRef.nativeElement);
  }

  /**
   * @constructor
   * @param _elementRef Element reference
   * @param _viewContainerRef View container reference
   * @param _parentDirective Parent directive
   */
  public constructor(
    private readonly _elementRef: ElementRef,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _parentDirective: ActiveSwitchDirective,
  ) {}

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this._elementRef.nativeElement.classList.add('active-switch-item');
    console.log('parent:', this);
  }

}
