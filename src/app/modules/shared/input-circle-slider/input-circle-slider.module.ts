import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCircleSliderComponent } from './input-circle-slider.component';
import { OverlayModule } from '@angular/cdk/overlay';

/**
 * Module for the InputCircleSliderComponent.
 */
@NgModule({
  declarations: [
    InputCircleSliderComponent
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    InputCircleSliderComponent
  ],
})
export class InputCircleSliderModule { }
