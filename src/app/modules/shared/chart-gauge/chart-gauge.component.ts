import {Component, Input} from '@angular/core';

@Component({
  selector: 'cv-chart-gauge',
  templateUrl: './chart-gauge.component.html',
  styleUrls: ['./chart-gauge.component.scss']
})
export class ChartGaugeComponent {

  /**
   * Value of the gauge.
   */
  @Input() public value = 0;
}
