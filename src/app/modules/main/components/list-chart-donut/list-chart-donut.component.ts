import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../list/list.component';
import {ChartDonutPart} from '../../../shared/chart-donut/chart-donut.interface';
import {EntityType} from '../../../../types/entity.type';

@Component({
  selector: 'cv-list-chart-donut',
  templateUrl: './list-chart-donut.component.html',
  styleUrls: ['./list-chart-donut.component.scss']
})
export class ListChartDonutComponent extends ListComponent implements OnInit {

  /**
   * Values data for the chart.
   */
  public chartValues: ChartDonutPart[] = [];

  /**
   * @inheritDoc
   */
  override ngOnInit() {
    super.ngOnInit();
    this._entitiesReady.subscribe((items: EntityType[]) => {
      this.chartValues = this._itemsToChartDonut(items);
    });
  }

  /**
   * Items to chart donut
   * @param items
   */
  private _itemsToChartDonut(items: EntityType[]): ChartDonutPart[] {
    return items.map((item: EntityType) => {
      return {
        value: this._getValueFromEntity(item) ?? 0,
        name: item.name,
        color: item.color
      };
    });
  }
}
