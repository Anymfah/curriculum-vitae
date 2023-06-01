import {Component, Input} from '@angular/core';

@Component({
  selector: 'cv-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  /**
   * Value to be displayed in the chart.
   */
  @Input() public value: number = 0;

  /**
   * Minimum value to be displayed in the chart.
   */
  @Input() public min: number = 0;

  /**
   * Maximum value to be displayed in the chart.
   */
  @Input() public max: number = 100;
}
