import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipComponent} from './tooltip.component';
import {TooltipDirective} from './tooltip.directive';
import {OverlayModule} from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    TooltipComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    TooltipComponent,
    TooltipDirective
  ]
})
export class TooltipModule { }
