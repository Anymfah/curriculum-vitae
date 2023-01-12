import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartDonutComponent} from './chart-donut.component';
import {DrawCircleModule} from '../draw-circle/draw-circle.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TooltipModule} from '../tooltip/tooltip.module';


@NgModule({
  declarations: [
    ChartDonutComponent
  ],
    imports: [
        CommonModule,
        DrawCircleModule,
        MatTooltipModule,
        TooltipModule
    ],
  exports: [
    ChartDonutComponent
  ]
})
export class ChartDonutModule { }
