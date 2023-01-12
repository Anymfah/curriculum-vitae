import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartCircleComponent} from './chart-circle.component';
import {DrawCircleModule} from '../draw-circle/draw-circle.module';


@NgModule({
  declarations: [
    ChartCircleComponent
  ],
  imports: [
    CommonModule,
    DrawCircleModule
  ],
  exports: [
    ChartCircleComponent
  ]
})
export class ChartCircleModule { }
