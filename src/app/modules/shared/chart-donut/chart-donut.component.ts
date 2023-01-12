import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ChartDonutPart, ChartDonutPartView} from './chart-donut.interface';
import {animateValueUtil} from '../../../utils/animate-value.util';
import {TOOLTIP_POSITION} from '../tooltip/tooltip.enum';

@Component({
  selector: 'cv-chart-donut',
  templateUrl: './chart-donut.component.html',
  styleUrls: ['./chart-donut.component.scss']
})
export class ChartDonutComponent implements OnChanges {

  /**
   * Size of the donut.
   */
  @Input() public size = 200;

  /**
   * Weight of the donut.
   */
  @Input() public weight: number = 5;

  /**
   * Values data for the chart.
   */
  @Input() public values: ChartDonutPart[] = [];

  /**
   * Gap between the parts.
   */
  @Input() public gap = 2;

  /**
   * Values to be displayed in the chart.
   */
  public chartValues: ChartDonutPartView[] = [];

  /**
   * @inheritDoc
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if ('values' in changes) {
      this._calculateValues();
    }
  }

  /**
   * Calculate the values.
   */
  private _calculateValues(): void {
    const total = this.values.reduce((acc, value) => acc + value.value, 0);
    let startAngle = 0;
    const chartValues = this.values.map(value => {
      const angle = 360 * value.value / total;
      const result: ChartDonutPartView = {
        ...value,
        startAngle,
        value: angle - this.gap,
        tooltipPosition: this._calculateTooltipPosition(startAngle + (angle - this.gap) / 2)
      };
      startAngle += angle;
      return result;
    });

    chartValues.forEach((cvalue, index) => {
      animateValueUtil(vals => {
        this.chartValues[index] = {
          ...cvalue,
          startAngle: vals[1],
          value: vals[0]
        };
      }, [0, cvalue.startAngle - 100], [cvalue.value, cvalue.startAngle], 2500);
    });
  }

  private _calculateTooltipPosition(angle: number): TOOLTIP_POSITION {
    switch (true) {
      case angle < 30 :
        return TOOLTIP_POSITION.TOP;
      case angle >= 30 && angle < 60 :
        return TOOLTIP_POSITION.TOP_RIGHT;
      case angle >= 60 && angle < 120 :
        return TOOLTIP_POSITION.RIGHT;
      case angle >= 120 && angle < 150 :
        return TOOLTIP_POSITION.BOTTOM_RIGHT;
      case angle >= 150 && angle < 210 :
        return TOOLTIP_POSITION.BOTTOM;
      case angle >= 210 && angle < 240 :
        return TOOLTIP_POSITION.BOTTOM_LEFT;
      case angle >= 240 && angle < 300 :
        return TOOLTIP_POSITION.LEFT;
      case angle >= 300 && angle < 330 :
        return TOOLTIP_POSITION.TOP_LEFT;
      default:
        return TOOLTIP_POSITION.TOP;
    }
  }
}
