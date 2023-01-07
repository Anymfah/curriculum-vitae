import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartGaugeComponent} from './chart-gauge.component';


@NgModule({
  declarations: [
    ChartGaugeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChartGaugeComponent
  ]
})
export class ChartGaugeModule { }
